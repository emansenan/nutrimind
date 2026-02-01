import React from 'react';
import { AlertCircle } from 'lucide-react';
import './MMInput.css';

/**
 * MMInput - Executive Gold Text Input
 * 
 * @param {string} type - Input type (text, email, password, number, etc.)
 * @param {string} value - Controlled input value
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 * @param {string} label - Input label
 * @param {string} error - Error message
 * @param {boolean} disabled - Disabled state
 * @param {boolean} required - Required field indicator
 * @param {object} icon - Lucide icon component (optional)
 */
const MMInput = ({
    type = 'text',
    value,
    onChange,
    placeholder,
    label,
    error,
    disabled = false,
    required = false,
    icon: Icon,
    className = '',
    ...rest
}) => {
    return (
        <div className={`mm-input-wrapper ${className}`}>
            {label && (
                <label className="mm-input-label">
                    {label}
                    {required && <span className="mm-input-required">*</span>}
                </label>
            )}
            <div className={`mm-input-container ${error ? 'has-error' : ''} ${Icon ? 'has-icon' : ''}`}>
                {Icon && (
                    <div className="mm-input-icon">
                        <Icon size={18} />
                    </div>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="mm-input"
                    {...rest}
                />
            </div>
            {error && (
                <div className="mm-input-error">
                    <AlertCircle size={14} />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

export default MMInput;
