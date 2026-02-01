import React from 'react';
import './MMButton.css';

/**
 * MMButton - Standard Interactive Element
 * 
 * @param {string} variant - 'gold' | 'glass' | 'danger' | 'ghost'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} isLoading - Shows spinner
 * @param {ReactNode} icon - Leading icon
 */
const MMButton = ({
    children,
    onClick,
    variant = 'gold',
    size = 'md',
    isLoading = false,
    disabled = false,
    icon = null,
    className = '',
    type = 'button'
}) => {
    return (
        <button
            type={type}
            className={`mm-btn mm-btn--${variant} mm-btn--${size} ${className}`}
            onClick={onClick}
            disabled={disabled || isLoading}
        >
            {isLoading && <div className="mm-btn__loader" />}
            {!isLoading && icon && <span className="mm-btn__icon">{icon}</span>}
            <span className="mm-btn__text">{children}</span>
        </button>
    );
};

export default MMButton;
