import React from 'react';
import './MMCard.css';

/**
 * MMCard - MicroMind V4 Standard Card
 * The fundamental container for the Executive Gold UI.
 * 
 * @param {string} title - The card header title
 * @param {ReactNode} action - Optional action button in the header (e.g. Edit icon)
 * @param {string} variant - 'default' | 'glass' | 'solid'
 * @param {string} className - Additional CSS classes
 */
const MMCard = ({
    children,
    title,
    action,
    variant = 'default',
    className = ''
}) => {
    return (
        <div className={`mm-card mm-card--${variant} ${className}`}>
            {(title || action) && (
                <div className="mm-card__header">
                    {title && <h3 className="mm-card__title">{title}</h3>}
                    {action && <div className="mm-card__action">{action}</div>}
                </div>
            )}
            <div className="mm-card__body">
                {children}
            </div>
        </div>
    );
};

export default MMCard;
