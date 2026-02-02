/**
 * Excel/CSV Export Service
 * 
 * Export data to Excel (.xlsx) and CSV formats.
 * Uses exceljs for Excel generation.
 * 
 * @module sdk/services/excelService
 */

const ExcelJS = require('exceljs');

/**
 * Export data to Excel
 * @param {Array} data - Array of data objects
 * @param {Object} options - Export options
 * @returns {Promise<Buffer>} Excel file buffer
 */
async function exportToExcel(data, options = {}) {
    const {
        filename = 'export.xlsx',
        sheetName = 'Data',
        columns = null,
        formatting = {}
    } = options;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    // Auto-generate columns if not provided
    const cols = columns || (data.length > 0 ? Object.keys(data[0]).map(key => ({
        header: key.toUpperCase(),
        key,
        width: 15
    })) : []);

    worksheet.columns = cols;

    // Add data
    data.forEach(row => {
        worksheet.addRow(row);
    });

    // Apply formatting
    if (formatting.boldHeaders !== false) {
        worksheet.getRow(1).font = { bold: true };
    }

    if (formatting.autoFilter !== false) {
        worksheet.autoFilter = {
            from: 'A1',
            to: String.fromCharCode(64 + cols.length) + '1'
        };
    }

    // Generate buffer
    return await workbook.xlsx.writeBuffer();
}

/**
 * Export data to CSV
 * @param {Array} data - Array of data objects
 * @param {Object} options - Export options
 * @returns {string} CSV content
 */
function exportToCSV(data, options = {}) {
    const {
        delimiter = ',',
        headers = true,
        columns = null,
        encoding = 'utf-8'
    } = options;

    if (!data || data.length === 0) {
        return '';
    }

    const cols = columns || Object.keys(data[0]);
    const rows = [];

    // Add headers
    if (headers) {
        rows.push(cols.join(delimiter));
    }

    // Add data rows
    data.forEach(row => {
        const values = cols.map(col => {
            const value = row[col];

            // Handle null/undefined
            if (value === null || value === undefined) {
                return '';
            }

            // Escape and quote if contains delimiter or quotes
            const strValue = String(value);
            if (strValue.includes(delimiter) || strValue.includes('"') || strValue.includes('\n')) {
                return `"${strValue.replace(/"/g, '""')}"`;
            }

            return strValue;
        });

        rows.push(values.join(delimiter));
    });

    return rows.join('\n');
}

/**
 * Export multi-sheet Excel workbook
 * @param {Array} sheets - Array of sheet objects
 * @returns {Promise<Buffer>} Excel file buffer
 */
async function exportMultiSheet(sheets) {
    const workbook = new ExcelJS.Workbook();

    for (const sheetConfig of sheets) {
        const { name, data, columns } = sheetConfig;

        const worksheet = workbook.addWorksheet(name);

        const cols = columns || (data.length > 0 ? Object.keys(data[0]).map(key => ({
            header: key.toUpperCase(),
            key,
            width: 15
        })) : []);

        worksheet.columns = cols;

        data.forEach(row => {
            worksheet.addRow(row);
        });

        // Bold headers
        worksheet.getRow(1).font = { bold: true };
    }

    return await workbook.xlsx.writeBuffer();
}

/**
 * Format data for export
 * @param {Array} data - Raw data
 * @param {Array} columns - Column configuration
 * @returns {Array} Formatted data
 */
function formatExportData(data, columns) {
    return data.map(row => {
        const

            formatted = {};

        columns.forEach(col => {
            const value = row[col.key];

            // Apply formatters if specified
            if (col.format && typeof col.format === 'function') {
                formatted[col.key] = col.format(value);
            } else {
                formatted[col.key] = value;
            }
        });

        return formatted;
    });
}

module.exports = {
    exportToExcel,
    exportToCSV,
    exportMultiSheet,
    formatExportData
};
