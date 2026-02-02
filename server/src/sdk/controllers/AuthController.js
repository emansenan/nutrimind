/**
 * Authentication Controller
 * 
 * Provides base authentication patterns for login, register, logout.
 * 
 * @module sdk/controllers/AuthController
 */

const { success, created, unauthorized, badRequest } = require('../responses');
const { validateLoginCredentials, validateRegistrationData } = require('../validators/auth');

/**
 * Base authentication controller
 * Extend this for your specific auth implementation
 * 
 * Example:
 * ```javascript
 * class MyAuthController extends AuthController {
 *   async hashPassword(password) {
 *     return bcrypt.hash(password, 10);
 *   }
 *   
 *   async comparePassword(password, hash) {
 *     return bcrypt.compare(password, hash);
 *   }
 * }
 * ```
 */
class AuthController {
    /**
     * Hash password (override in subclass)
     */
    async hashPassword(password) {
        throw new Error('hashPassword not implemented');
    }

    /**
     * Compare password with hash (override in subclass)
     */
    async comparePassword(password, hash) {
        throw new Error('comparePassword not implemented');
    }

    /**
     * Generate JWT token (override in subclass)
     */
    generateToken(user) {
        throw new Error('generateToken not implemented');
    }

    /**
     * Find user by email (override in subclass)
     */
    async findUserByEmail(email) {
        throw new Error('findUserByEmail not implemented');
    }

    /**
     * Create user (override in subclass)
     */
    async createUser(data) {
        throw new Error('createUser not implemented');
    }

    /**
     * Login handler
     */
    async login(req, res) {
        try {
            const validation = validateLoginCredentials(req.body);
            if (!validation.valid) {
                return badRequest(res, 'Validation failed', validation.errors);
            }

            const { email, password } = req.body;

            // Find user
            const user = await this.findUserByEmail(email);
            if (!user) {
                return unauthorized(res, 'Invalid credentials');
            }

            // Verify password
            const validPassword = await this.comparePassword(password, user.password);
            if (!validPassword) {
                return unauthorized(res, 'Invalid credentials');
            }

            // Generate token
            const token = this.generateToken(user);

            return success(res, {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            }, 'Login successful');
        } catch (error) {
            console.error('[Auth] Login error:', error);
            return badRequest(res, 'Login failed');
        }
    }

    /**
     * Register handler
     */
    async register(req, res) {
        try {
            const validation = validateRegistrationData(req.body);
            if (!validation.valid) {
                return badRequest(res, 'Validation failed', validation.errors);
            }

            const { email, password, name } = req.body;

            // Check if user exists
            const existing = await this.findUserByEmail(email);
            if (existing) {
                return badRequest(res, 'User already exists');
            }

            // Hash password
            const hashedPassword = await this.hashPassword(password);

            // Create user
            const user = await this.createUser({
                email,
                password: hashedPassword,
                name
            });

            // Generate token
            const token = this.generateToken(user);

            return created(res, {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            }, 'Registration successful');
        } catch (error) {
            console.error('[Auth] Registration error:', error);
            return badRequest(res, 'Registration failed');
        }
    }

    /**
     * Logout handler (client-side token deletion)
     */
    async logout(req, res) {
        // In JWT, logout is typically handled client-side
        // Optionally, implement token blacklist here
        return success(res, null, 'Logout successful');
    }

    /**
     * Get current user
     */
    async me(req, res) {
        try {
            const user = await this.findUserByEmail(req.user.email);
            if (!user) {
                return unauthorized(res, 'User not found');
            }

            return success(res, {
                id: user.id,
                email: user.email,
                name: user.name
            });
        } catch (error) {
            console.error('[Auth] Me error:', error);
            return badRequest(res, 'Failed to fetch user');
        }
    }
}

module.exports = AuthController;
