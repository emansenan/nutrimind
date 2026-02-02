/**
 * Base Controller
 * 
 * Generic CRUD controller for any model.
 * 
 * @module sdk/controllers/BaseController
 */

const { success, created, updated, deleted, notFound } = require('../responses');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Base controller with generic CRUD operations
 * Can be used standalone or extended
 * 
 * Usage:
 * ```javascript
 * const usersController = new BaseController('user');
 * router.get('/users', usersController.list);
 * ```
 */
class BaseController {
    constructor(model) {
        this.model = model;
    }

    /**
     * List all records (with pagination)
     */
    list = async (req, res) => {
        const { page = 1, limit = 10, orderBy = 'createdAt', order = 'desc' } = req.query;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);

        const [items, total] = await Promise.all([
            prisma[this.model].findMany({
                skip,
                take,
                orderBy: { [orderBy]: order }
            }),
            prisma[this.model].count()
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
    };

    /**
     * Get single record
     */
    get = async (req, res) => {
        const { id } = req.params;

        const record = await prisma[this.model].findUnique({
            where: { id }
        });

        if (!record) {
            return notFound(res, 'Record not found');
        }

        return success(res, record);
    };

    /**
     * Create record
     */
    create = async (req, res) => {
        const record = await prisma[this.model].create({
            data: req.body
        });

        return created(res, record);
    };

    /**
     * Update record
     */
    update = async (req, res) => {
        const { id } = req.params;

        const record = await prisma[this.model].update({
            where: { id },
            data: req.body
        });

        return updated(res, record);
    };

    /**
     * Delete record
     */
    delete = async (req, res) => {
        const { id } = req.params;

        await prisma[this.model].delete({
            where: { id }
        });

        return deleted(res);
    };
}

module.exports = BaseController;
