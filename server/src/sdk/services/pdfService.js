/**
 * PDF Generation Service
 * 
 * Generates PDF documents from HTML or templates.
 * Uses Puppeteer for HTML-to-PDF conversion.
 * 
 * @module sdk/services/pdfService
 */

const puppeteer = require('puppeteer');

/**
 * Generate PDF from HTML string
 * @param {string} html - HTML content
 * @param {Object} options - PDF options
 * @returns {Promise<Buffer>} PDF buffer
 */
async function generatePDF(html, options = {}) {
    const {
        format = 'A4',
        orientation = 'portrait',
        margin = { top: 20, right: 20, bottom: 20, left: 20 },
        displayHeaderFooter = false,
        headerTemplate = '',
        footerTemplate = ''
    } = options;

    let browser;

    try {
        browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });

        const pdf = await page.pdf({
            format,
            landscape: orientation === 'landscape',
            printBackground: true,
            margin,
            displayHeaderFooter,
            headerTemplate,
            footerTemplate
        });

        return pdf;
    } catch (error) {
        console.error('[PDF Service] Generation error:', error);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

/**
 * Generate report PDF
 * @param {Object} data - Report data
 * @param {string} template - Template type
 * @param {string} organizationId - Organization ID
 * @returns {Promise<Buffer>} PDF buffer
 */
async function generateReport(data, template, organizationId) {
    // Build HTML from template
    const html = buildReportHTML(data, template);

    return generatePDF(html, {
        displayHeaderFooter: true,
        headerTemplate: '<div style="font-size:10px;text-align:center;width:100%;">Report</div>',
        footerTemplate: '<div style="font-size:10px;text-align:center;width:100%;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
    });
}

/**
 * Generate invoice PDF
 * @param {Object} subscription - Subscription object
 * @param {Object} organization - Organization object
 * @returns {Promise<Buffer>} PDF buffer
 */
async function generateInvoice(subscription, organization) {
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; padding: 40px; }
                .header { text-align: center; margin-bottom: 40px; }
                .invoice-details { margin-bottom: 30px; }
                table { width: 100%; border-collapse: collapse; }
                th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
                .total { font-size: 20px; font-weight: bold; text-align: right; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>INVOICE</h1>
                <p>${organization.name}</p>
            </div>
            
            <div class="invoice-details">
                <p><strong>Invoice Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>Plan:</strong> ${subscription.plan}</p>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${subscription.plan} Plan (Monthly)</td>
                        <td>$${subscription.amount || 0}</td>
                    </tr>
                </tbody>
            </table>

            <div class="total">
                Total: $${subscription.amount || 0}
            </div>
        </body>
        </html>
    `;

    return generatePDF(html);
}

/**
 * Build report HTML (helper)
 */
function buildReportHTML(data, template) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; padding: 40px; }
                h1 { color: #d4af37; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
            </style>
        </head>
        <body>
            <h1>${template} Report</h1>
            <p>Generated on: ${new Date().toLocaleString()}</p>
            <pre>${JSON.stringify(data, null, 2)}</pre>
        </body>
        </html>
    `;
}

module.exports = {
    generatePDF,
    generateReport,
    generateInvoice
};
