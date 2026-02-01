import React from 'react';
import './MMBadge.css';

/**
 * MMBadge - Status Indicator
 * 
 * @param {string} variant - 'success' | 'warning' | 'error' | 'info' | 'gold' | 'outline'
 * @param {string} size - 'sm' | 'md'
 * @param {boolean} pulse - Adds a live pulse animation
 */
const MMBadge = ({
    children,
    variant = 'info',
    size = 'md',
    pulse = false,
    className = ''
}) => {
    return (
        <span className={`mm-badge mm-badge--${variant} mm-badge--${size} ${className}`}>
            {pulse && <span className="mm-badge__dot" />}
            {children}
        </span>
    );
};

export default MMBadge;
