/**
 * Import Service - CSV/Excel Data Import
 * 
 * Handles parsing, validation, and bulk import of CSV and Excel files.
 * 
 * @module sdk/services/importService
 */

const XLSX = require('xlsx');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Parse CSV file
 * @param {Buffer} fileBuffer - CSV file buffer
 * @param {Object} options - Parse options
 * @returns {Object} { data, headers, rowCount }
 */
function parseCSV(fileBuffer, options = {}) {
    const {
        delimiter = ',',
        skipRows = 0,
        hasHeaders = true,
        encoding = 'utf-8'
    } = options;

    const csvText = fileBuffer.toString(encoding);
    const lines = csvText.split('\n').filter(line => line.trim());

    // Skip rows if specified
    const dataLines = lines.slice(skipRows);

    // Extract headers
    const headers = hasHeaders
        ? dataLines[0].split(delimiter).map(h => h.trim().replace(/"/g, ''))
        : null;

    // Parse data rows
    const dataRows = hasHeaders ? dataLines.slice(1) : dataLines;
    const data = dataRows.map(line => {
        const values = parseCSVLine(line, delimiter);

        if (headers) {
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index] || null;
            });
            return row;
        }

        return values;
    });

    return {
        data,
        headers,
        rowCount: data.length
    };
}

/**
 * Parse Excel file
 * @param {Buffer} fileBuffer - Excel file buffer
 * @param {Object} options - Parse options
 * @returns {Object} { sheets }
 */
function parseExcel(fileBuffer, options = {}) {
    const { sheetName = null } = options;

    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const sheets = [];

    const sheetNames = sheetName
        ? [sheetName]
        : workbook.SheetNames;

    sheetNames.forEach(name => {
        const worksheet = workbook.Sheets[name];
        const data = XLSX.utils.sheet_to_json(worksheet, { defval: null });
        const headers = data.length > 0 ? Object.keys(data[0]) : [];

        sheets.push({
            name,
            data,
            headers,
            rowCount: data.length
        });
    });

    return { sheets };
}

/**
 * Validate imported data against schema
 * @param {Array} data - Array of data objects
 * @param {Object} schema - Validation schema
 * @returns {Object} { valid, invalid, summary }
 */
function validateImport(data, schema) {
    const valid = [];
    const invalid = [];

    data.forEach((row, index) => {
        const errors = [];

        for (const [field, rules] of Object.entries(schema)) {
            const value = row[field];

            // Required check
            if (rules.required && (value === null || value === undefined || value === '')) {
                errors.push(`${field} is required`);
                continue;
            }

            // Skip further validation if optional and empty
            if (!rules.required && (value === null || value === undefined || value === '')) {
                continue;
            }

            // Type validation
            if (rules.type) {
                const typeCheck = validateFieldType(value, rules.type);
                if (!typeCheck.valid) {
                    errors.push(`${field}: ${typeCheck.error}`);
                }
            }

            // Custom validator
            if (rules.custom && typeof rules.custom === 'function') {
                const customCheck = rules.custom(value);
                if (!customCheck.valid) {
                    errors.push(`${field}: ${customCheck.error}`);
                }
            }
        }

        if (errors.length === 0) {
            valid.push(row);
        } else {
            invalid.push({
                row: index + 1,
                data: row,
                errors
            });
        }
    });

    return {
        valid,
        invalid,
        summary: {
            validCount: valid.length,
            invalidCount: invalid.length,
            totalCount: data.length
        }
    };
}

/**
 * Bulk insert with transaction
 * @param {string} model - Prisma model name
 * @param {Array} validData - Array of valid data objects
 * @param {string} organizationId - Organization ID
 * @param {Object} options - Insert options
 * @returns {Promise<Object>} { inserted, failed, errors }
 */
async function bulkInsert(model, validData, organizationId, options = {}) {
    const { batchSize = 1000, skipDuplicates = false } = options;

    let inserted = 0;
    let failed = 0;
    const errors = [];

    try {
        // Process in batches
        for (let i = 0; i < validData.length; i += batchSize) {
            const batch = validData.slice(i, i + batchSize);

            await prisma.$transaction(async (tx) => {
                for (const record of batch) {
                    try {
                        await tx[model].create({
                            data: {
                                ...record,
                                organizationId
                            }
                        });
                        inserted++;
                    } catch (error) {
                        if (skipDuplicates && error.code === 'P2002') {
                            // Skip duplicate - don't count as failure
                            continue;
                        }
                        failed++;
                        errors.push({
                            record,
                            error: error.message
                        });
                    }
                }
            });
        }

        return { inserted, failed, errors };
    } catch (error) {
        console.error('[Import Service] Bulk insert error:', error);
        throw error;
    }
}

/**
 * Preview import (first N rows)
 * @param {Buffer} fileBuffer - File buffer
 * @param {number} rows - Number of rows to preview
 * @returns {Object} { preview, totalRows, headers, fileType }
 */
function previewImport(fileBuffer, rows = 10) {
    // Try to detect file type
    const isExcel = fileBuffer[0] === 0x50 && fileBuffer[1] === 0x4B; // PK (ZIP header)

    if (isExcel) {
        const { sheets } = parseExcel(fileBuffer);
        const firstSheet = sheets[0];

        return {
            preview: firstSheet.data.slice(0, rows),
            totalRows: firstSheet.rowCount,
            headers: firstSheet.headers,
            fileType: 'excel'
        };
    } else {
        const { data, headers, rowCount } = parseCSV(fileBuffer);

        return {
            preview: data.slice(0, rows),
            totalRows: rowCount,
            headers,
            fileType: 'csv'
        };
    }
}

/**
 * Detect duplicates
 * @param {Array} data - Data array
 * @param {Array} uniqueFields - Fields to check for duplicates
 * @returns {Object} { duplicates, unique }
 */
function detectDuplicates(data, uniqueFields) {
    const seen = new Set();
    const duplicates = [];
    const unique = [];

    data.forEach(row => {
        const key = uniqueFields.map(field => row[field]).join('|');

        if (seen.has(key)) {
            duplicates.push(row);
        } else {
            seen.add(key);
            unique.push(row);
        }
    });

    return { duplicates, unique };
}

/**
 * Parse CSV line (handles quoted fields)
 */
function parseCSVLine(line, delimiter) {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === delimiter && !inQuotes) {
            values.push(current.trim().replace(/^"|"$/g, ''));
            current = '';
        } else {
            current += char;
        }
    }

    values.push(current.trim().replace(/^"|"$/g, ''));
    return values;
}

/**
 * Validate field type
 */
function validateFieldType(value, type) {
    switch (type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return {
                valid: emailRegex.test(value),
                error: 'Invalid email format'
            };

        case 'number':
            return {
                valid: !isNaN(Number(value)),
                error: 'Must be a number'
            };

        case 'date':
            const date = new Date(value);
            return {
                valid: !isNaN(date.getTime()),
                error: 'Invalid date format'
            };

        default:
            return { valid: true };
    }
}

module.exports = {
    parseCSV,
    parseExcel,
    validateImport,
    bulkInsert,
    previewImport,
    detectDuplicates
};
