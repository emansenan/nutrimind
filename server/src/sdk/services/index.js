/**
 * Services - Main Export
 * 
 * @module sdk/services
 */

const emailService = require('./emailService');
const fileService = require('./fileService');
const pdfService = require('./pdfService');
const excelService = require('./excelService');

module.exports = {
    email: emailService,
    file: fileService,
    pdf: pdfService,
    excel: excelService
};
