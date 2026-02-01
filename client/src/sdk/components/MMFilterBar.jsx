import React from 'react';
import './MMFilterBar.css';

/**
 * MMFilterBar - Standard Layout Container
 * Aligns Search on the left, Filters/Actions on the right.
 */
const MMFilterBar = ({ children, className = '' }) => {
    return (
        <div className={`mm-filter-bar ${className}`}>
            {children}
        </div>
    );
};

export default MMFilterBar;
