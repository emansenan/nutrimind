/**
 * Services - Main Export
 * 
 * @module sdk/services
 */

const emailService = require('./emailService');
const fileService = require('./fileService');
const pdfService = require('./pdfService');
const excelService = require('./excelService');
const aiService = require('./aiService');
const importService = require('./importService');
const sqlService = require('./sqlService');
const auditService = require('./auditService');
const cacheService = require('./cacheService');

module.exports = {
    email: emailService,
    file: fileService,
    pdf: pdfService,
    excel: excelService,
    ai: aiService,
    import: importService,
    sql: sqlService,
    audit: auditService,
    cache: cacheService
};
