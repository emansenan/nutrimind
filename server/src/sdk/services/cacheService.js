/**
 * Cache Service - Redis/Memory Caching
 * 
 * Provides caching layer with Redis or in memory fallback.
 * 
 * @module sdk/services/cacheService
 */

// Try to load Redis, fallback to memory cache
let redis = null;
try {
    const Redis = require('ioredis');
    redis = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD,
        retryStrategy: () => null // Disable retry to fallback to memory
    });

    redis.on('error', () => {
        console.warn('[Cache] Redis unavailable, using memory cache');
        redis = null;
    });
} catch (error) {
    console.warn('[Cache] Redis not installed, using memory cache');
}

// In-memory cache fallback
const memoryCache = new Map();

/**
 * Get value from cache
 * @param {string} key - Cache key
 * @returns {Promise<any>} Cached value or null
 */
async function get(key) {
    try {
        if (redis) {
            const value = await redis.get(key);
            return value ? JSON.parse(value) : null;
        }

        const cached = memoryCache.get(key);
        if (!cached) return null;

        // Check expiration
        if (cached.expiresAt && Date.now() > cached.expiresAt) {
            memoryCache.delete(key);
            return null;
        }

        return cached.value;
    } catch (error) {
        console.error('[Cache] Get error:', error);
        return null;
    }
}

/**
 * Set value in cache
 * @param {string} key - Cache key
 * @param {any} value - Value to cache
 * @param {number} ttl - Time to live in seconds
 * @returns {Promise<boolean>} Success
 */
async function set(key, value, ttl = 3600) {
    try {
        if (redis) {
            await redis.set(key, JSON.stringify(value), 'EX', ttl);
            return true;
        }

        memoryCache.set(key, {
            value,
            expiresAt: Date.now() + (ttl * 1000)
        });
        return true;
    } catch (error) {
        console.error('[Cache] Set error:', error);
        return false;
    }
}

/**
 * Delete value from cache
 * @param {string} key - Cache key
 * @returns {Promise<boolean>} Success
 */
async function del(key) {
    try {
        if (redis) {
            await redis.del(key);
            return true;
        }

        memoryCache.delete(key);
        return true;
    } catch (error) {
        console.error('[Cache] Delete error:', error);
        return false;
    }
}

/**
 * Clear all cache (or by pattern)
 * @param {string} pattern - Key pattern (Redis only, e.g., 'user:*')
 * @returns {Promise<boolean>} Success
 */
async function clear(pattern = null) {
    try {
        if (redis && pattern) {
            const keys = await redis.keys(pattern);
            if (keys.length > 0) {
                await redis.del(...keys);
            }
            return true;
        }

        if (redis && !pattern) {
            await redis.flushdb();
            return true;
        }

        memoryCache.clear();
        return true;
    } catch (error) {
        console.error('[Cache] Clear error:', error);
        return false;
    }
}

/**
 * Get or set pattern (cache-aside)
 * @param {string} key - Cache key
 * @param {Function} fetcher - Function to fetch data if not cached
 * @param {number} ttl - Time to live in seconds
 * @returns {Promise<any>} Cached or fetched value
 */
async function getOrSet(key, fetcher, ttl = 3600) {
    // Try to get from cache
    const cached = await get(key);
    if (cached !== null) {
        return cached;
    }

    // Fetch and cache
    const value = await fetcher();
    await set(key, value, ttl);

    return value;
}

/**
 * Invalidate cache for organization
 * @param {string} organizationId - Organization ID
 * @param {string} resource - Resource type (optional)
 * @returns {Promise<boolean>} Success
 */
async function invalidateOrganization(organizationId, resource = null) {
    const pattern = resource
        ? `org:${organizationId}:${resource}:*`
        : `org:${organizationId}:*`;

    return clear(pattern);
}

/**
 * Cache key builder
 * @param {string} organizationId - Organization ID
 * @param {string} resource - Resource type
 * @param {string} identifier - Resource identifier
 * @returns {string} Cache key
 */
function buildKey(organizationId, resource, identifier = null) {
    const parts = ['org', organizationId, resource];
    if (identifier) parts.push(identifier);

    return parts.join(':');
}

/**
 * Get cache stats
 * @returns {Promise<Object>} Cache statistics
 */
async function getStats() {
    try {
        if (redis) {
            const info = await redis.info('stats');
            const keys = await redis.dbsize();

            return {
                type: 'redis',
                keys,
                info
            };
        }

        return {
            type: 'memory',
            keys: memoryCache.size,
            entries: Array.from(memoryCache.keys())
        };
    } catch (error) {
        console.error('[Cache] Stats error:', error);
        return { type: 'unknown', error: error.message };
    }
}

/**
 * Health check
 * @returns {Promise<Object>} { healthy, type, latency }
 */
async function healthCheck() {
    const start = Date.now();

    try {
        if (redis) {
            await redis.ping();
            return {
                healthy: true,
                type: 'redis',
                latency: Date.now() - start
            };
        }

        return {
            healthy: true,
            type: 'memory',
            latency: Date.now() - start
        };
    } catch (error) {
        return {
            healthy: false,
            type: redis ? 'redis' : 'memory',
            error: error.message
        };
    }
}

// Cleanup expired entries from memory cache periodically
if (!redis) {
    setInterval(() => {
        const now = Date.now();
        for (const [key, cached] of memoryCache.entries()) {
            if (cached.expiresAt && now > cached.expiresAt) {
                memoryCache.delete(key);
            }
        }
    }, 60000); // Clean every minute
}

module.exports = {
    get,
    set,
    del,
    clear,
    getOrSet,
    invalidateOrganization,
    buildKey,
    getStats,
    healthCheck
};
