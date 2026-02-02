/**
 * Database Transaction Helpers
 * 
 * Utilities for managing Prisma transactions.
 * 
 * @module sdk/database/transactions
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Execute operations in transaction
 * @param {Function} callback - Transaction callback
 * @returns {Promise<any>} Transaction result
 */
async function withTransaction(callback) {
    return prisma.$transaction(callback);
}

/**
 * Retry transaction on conflict
 * @param {Function} callback - Transaction callback
 * @param {number} maxRetries - Maximum retry attempts
 * @returns {Promise<any>} Transaction result
 */
async function retryTransaction(callback, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await prisma.$transaction(callback);
        } catch (error) {
            if (attempt === maxRetries || error.code !== 'P2034') {
                throw error;
            }

            // Wait before retry (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, 100 * Math.pow(2, attempt)));
        }
    }
}

module.exports = {
    withTransaction,
    retryTransaction
};
