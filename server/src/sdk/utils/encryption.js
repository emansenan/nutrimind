/**
 * Encryption Utilities
 * 
 * JWT, bcrypt, and crypto utilities for authentication and security.
 * 
 * @module sdk/utils/encryption
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

/**
 * Generate JWT token
 * @param {Object} payload - Token payload
 * @param {string} expiresIn - Expiration time (e.g., '7d', '24h')
 * @returns {string} JWT token
 */
function generateToken(payload, expiresIn = '7d') {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

/**
 * Verify JWT token
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded payload or null
 */
function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}

/**
 * Hash password with bcrypt
 * @param {string} password - Plain text password
 * @param {number} rounds - Salt rounds (default: 10)
 * @returns {Promise<string>} Hashed password
 */
async function hashPassword(password, rounds = 10) {
    return bcrypt.hash(password, rounds);
}

/**
 * Compare password with hash
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password
 * @returns {Promise<boolean>} True if match
 */
async function comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
}

/**
 * Generate random token
 * @param {number} length - Token length in bytes
 * @returns {string} Random hex token
 */
function generateRandomToken(length = 32) {
    return crypto.randomBytes(length).toString('hex');
}

/**
 * Hash string with SHA256
 * @param {string} str - String to hash
 * @returns {string} Hashed string
 */
function hashString(str) {
    return crypto.createHash('sha256').update(str).digest('hex');
}

/**
 * Encrypt data with AES-256
 * @param {string} text - Text to encrypt
 * @param {string} key - Encryption key (32 bytes)
 * @returns {string} Encrypted text (base64)
 */
function encrypt(text, key = process.env.ENCRYPTION_KEY) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key.substring(0, 32)), iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return iv.toString('hex') + ':' + encrypted;
}

/**
 * Decrypt data with AES-256
 * @param {string} encryptedText - Encrypted text (base64)
 * @param {string} key - Decryption key (32 bytes)
 * @returns {string} Decrypted text
 */
function decrypt(encryptedText, key = process.env.ENCRYPTION_KEY) {
    const parts = encryptedText.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts[1];

    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key.substring(0, 32)), iv);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

module.exports = {
    generateToken,
    verifyToken,
    hashPassword,
    comparePassword,
    generateRandomToken,
    hashString,
    encrypt,
    decrypt
};
