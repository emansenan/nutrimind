/**
 * Dashboards Routes (Stub)
 * Returns empty data so the frontend renders without errors.
 */
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const authCheck = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }
        req.user = jwt.verify(token = authHeader.substring(7), process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

router.use(authCheck);

router.get('/', (req, res) => res.json([]));
router.get('/:id', (req, res) => res.json({ id: req.params.id, title: 'Dashboard', widgets: [] }));
router.post('/', (req, res) => res.json({ id: 'new', ...req.body }));
router.put('/:id', (req, res) => res.json({ id: req.params.id, ...req.body }));
router.delete('/:id', (req, res) => res.json({ message: 'Deleted' }));
router.post('/:id/execute', (req, res) => res.json({ data: [], columns: [] }));

module.exports = router;
