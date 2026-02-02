/**
 * Date Helper Utilities
 * 
 * Common date formatting and manipulation functions.
 * 
 * @module sdk/utils/dateHelpers
 */

/**
 * Format date to ISO string
 * @param {Date|string} date - Date to format
 * @returns {string} ISO formatted date
 */
function toISO(date) {
    return new Date(date).toISOString();
}

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {string} format - Format type ('short', 'long', 'time')
 * @returns {string} Formatted date
 */
function formatDate(date, format = 'long') {
    const d = new Date(date);

    const options = {
        short: { year: 'numeric', month: '2-digit', day: '2-digit' },
        long: { year: 'numeric', month: 'long', day: 'numeric' },
        time: { hour: '2-digit', minute: '2-digit' },
        datetime: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }
    };

    return d.toLocaleString('en-US', options[format] || options.long);
}

/**
 * Get relative time string (e.g., "2 hours ago")
 * @param {Date|string} date - Date to compare
 * @returns {string} Relative time string
 */
function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
}

/**
 * Add days to date
 * @param {Date|string} date - Starting date
 * @param {number} days - Number of days to add
 * @returns {Date} New date
 */
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/**
 * Add hours to date
 * @param {Date|string} date - Starting date
 * @param {number} hours - Number of hours to add
 * @returns {Date} New date
 */
function addHours(date, hours) {
    const result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
}

/**
 * Check if date is in past
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if in past
 */
function isPast(date) {
    return new Date(date) < new Date();
}

/**
 * Check if date is in future
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if in future
 */
function isFuture(date) {
    return new Date(date) > new Date();
}

/**
 * Get date range for period
 * @param {string} period - Period type ('today', 'yesterday', 'last7days', 'last30days', 'thisMonth')
 * @returns {Object} { startDate, endDate }
 */
function getDateRange(period) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (period) {
        case 'today':
            return {
                startDate: today,
                endDate: now
            };

        case 'yesterday':
            const yesterday = addDays(today, -1);
            return {
                startDate: yesterday,
                endDate: today
            };

        case 'last7days':
            return {
                startDate: addDays(today, -7),
                endDate: now
            };

        case 'last30days':
            return {
                startDate: addDays(today, -30),
                endDate: now
            };

        case 'thisMonth':
            const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            return {
                startDate: firstDayOfMonth,
                endDate: now
            };

        default:
            return {
                startDate: today,
                endDate: now
            };
    }
}

/**
 * Calculate difference between dates
 * @param {Date|string} date1 - First date
 * @param {Date|string} date2 - Second date
 * @param {string} unit - Unit to return ('days', 'hours', 'minutes', 'seconds')
 * @returns {number} Difference in specified unit
 */
function dateDiff(date1, date2, unit = 'days') {
    const diff = Math.abs(new Date(date1) - new Date(date2));

    const units = {
        seconds: 1000,
        minutes: 1000 * 60,
        hours: 1000 * 60 * 60,
        days: 1000 * 60 * 60 * 24
    };

    return Math.floor(diff / (units[unit] || units.days));
}

module.exports = {
    toISO,
    formatDate,
    timeAgo,
    addDays,
    addHours,
    isPast,
    isFuture,
    getDateRange,
    dateDiff
};
