/**
 * Base Tenant Controller
 * 
 * Provides common CRUD operations with automatic tenant scoping.
 * Extend this class for tenant-scoped resources.
 * 
 * @module sdk/controllers/TenantController
 */

const { success, created, updated, deleted, notFound, serverError } = require('../responses');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Base controller for tenant-scoped resources
 * 
 * Usage:
 * ```javascript
 * class DashboardController extends TenantController {
 *   model = 'dashboard';
 *   quotaResource = 'dashboards';
 * }
 * ```
 */
class TenantController {
    /**
     * Prisma model name (must be set in subclass)
     * @type {string}
     */
    model = null;

    /**
     * Quota resource name (optional, for quota checking)
     * @type {string}
     */
    quotaResource = null;

    /**
     * Get all records for organization
     */
    async index(req, res) {
        try {
            if (!this.model) {
                throw new Error('Model not defined in controller');
            }

            const { organizationId } = req;
            const { page = 1, limit = 10 } = req.query;

            const skip = (parseInt(page) - 1) * parseInt(limit);
            const take = parseInt(limit);

            const [items, total] = await Promise.all([
                prisma[this.model].findMany({
                    where: { organizationId },
                    skip,
                    take,
                    orderBy: { createdAt: 'desc' }
                }),
                prisma[this.model].count({
                    where: { organizationId }
                })
            ]);

            return success(res, {
                items,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    totalPages: Math.ceil(total / parseInt(limit))
                }
            });
        } catch (error) {
            console.error(`[${this.model}] Index error:`, error);
            return serverError(res, 'Failed to fetch records', error);
        }
    }

    /**
     * Get single record by ID
     */
    async show(req, res) {
        try {
            if (!this.model) {
                throw new Error('Model not defined in controller');
            }

            const { id } = req.params;
            const { organizationId } = req;

            const record = await prisma[this.model].findFirst({
                where: {
                    id,
                    organizationId
                }
            });

            if (!record) {
                return notFound(res, 'Record not found');
            }

            return success(res, record);
        } catch (error) {
            console.error(`[${this.model}] Show error:`, error);
            return serverError(res, 'Failed to fetch record', error);
        }
    }

    /**
     * Create new record
     */
    async create(req, res) {
        try {
            if (!this.model) {
                throw new Error('Model not defined in controller');
            }

            const { organizationId } = req;
            const data = { ...req.body, organizationId };

            const record = await prisma[this.model].create({
                data
            });

            return created(res, record, 'Record created successfully');
        } catch (error) {
            console.error(`[${this.model}] Create error:`, error);
            return serverError(res, 'Failed to create record', error);
        }
    }

    /**
     * Update existing record
     */
    async update(req, res) {
        try {
            if (!this.model) {
                throw new Error('Model not defined in controller');
            }

            const { id } = req.params;
            const { organizationId } = req;

            // Check if record exists and belongs to organization
            const existing = await prisma[this.model].findFirst({
                where: { id, organizationId }
            });

            if (!existing) {
                return notFound(res, 'Record not found');
            }

            const record = await prisma[this.model].update({
                where: { id },
                data: req.body
            });

            return updated(res, record, 'Record updated successfully');
        } catch (error) {
            console.error(`[${this.model}] Update error:`, error);
            return serverError(res, 'Failed to update record', error);
        }
    }

    /**
     * Delete record
     */
    async delete(req, res) {
        try {
            if (!this.model) {
                throw new Error('Model not defined in controller');
            }

            const { id } = req.params;
            const { organizationId } = req;

            // Check if record exists and belongs to organization
            const existing = await prisma[this.model].findFirst({
                where: { id, organizationId }
            });

            if (!existing) {
                return notFound(res, 'Record not found');
            }

            await prisma[this.model].delete({
                where: { id }
            });

            return deleted(res, 'Record deleted successfully');
        } catch (error) {
            console.error(`[${this.model}] Delete error:`, error);
            return serverError(res, 'Failed to delete record', error);
        }
    }
}

module.exports = TenantController;
