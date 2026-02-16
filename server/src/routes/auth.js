/**
 * Authentication Routes
 * 
 * Concrete implementation of auth endpoints using Prisma + bcrypt + JWT.
 * Extends the SDK AuthController pattern with direct route handlers.
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * POST /api/auth/login
 * 
 * Accepts { username, password } where username is the email address.
 * Returns { token, user } on success.
 */
router.post('/login', async (req, res) => {
    try {
        // Frontend sends 'username' which is actually the email
        const { username, password, email: bodyEmail } = req.body;
        const email = bodyEmail || username;

        if (!email || !password) {
            return res.status(400).json({
                error: 'Validation failed',
                message: 'Email and password are required'
            });
        }

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                memberships: {
                    include: {
                        organization: true
                    }
                }
            }
        });

        if (!user) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Invalid credentials'
            });
        }

        // Check if user is active
        if (!user.active) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Account is deactivated'
            });
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, user.passwordHash);
        if (!validPassword) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Invalid credentials'
            });
        }

        // Get primary organization
        const primaryOrg = user.memberships.length > 0
            ? user.memberships[0].organization
            : null;

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
                displayName: user.displayName,
                organizationId: primaryOrg?.id || null
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        // Return success
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.displayName,
                displayName: user.displayName,
                role: user.role,
                organizationId: primaryOrg?.id || null,
                organizationName: primaryOrg?.name || null
            }
        });

    } catch (error) {
        console.error('[Auth] Login error:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'Login failed'
        });
    }
});

/**
 * POST /api/auth/logout
 */
router.post('/logout', (req, res) => {
    res.json({ message: 'Logout successful' });
});

/**
 * GET /api/auth/me
 * Returns current user from JWT token
 */
router.get('/me', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                email: true,
                displayName: true,
                role: true,
                active: true,
                currentOrganizationId: true
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json({
            id: user.id,
            email: user.email,
            name: user.displayName,
            displayName: user.displayName,
            role: user.role,
            organizationId: user.currentOrganizationId
        });

    } catch (error) {
        console.error('[Auth] Me error:', error);
        return res.status(401).json({ error: 'Invalid token' });
    }
});

module.exports = router;
