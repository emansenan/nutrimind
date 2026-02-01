import React from 'react';
import { AlertCircle } from 'lucide-react';
import './MMTextarea.css';

/**
 * MMTextarea - Executive Gold Multi-line Text Input
 * 
 * @param {string} value - Controlled textarea value
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 * @param {string} label - Textarea label
 * @param {string} error - Error message
 * @param {boolean} disabled - Disabled state
 * @param {boolean} required - Required field indicator
 * @param {number} rows - Number of rows (default: 4)
 */
const MMTextarea = ({
    value,
    onChange,
    placeholder,
    label,
    error,
    disabled = false,
    required = false,
    rows = 4,
    className = '',
    ...rest
}) => {
    return (
        <div className={`mm-textarea-wrapper ${className}`}>
            {label && (
                <label className="mm-textarea-label">
                    {label}
                    {required && <span className="mm-textarea-required">*</span>}
                </label>
            )}
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                rows={rows}
                className={`mm-textarea ${error ? 'has-error' : ''}`}
                {...rest}
            />
            {error && (
                <div className="mm-textarea-error">
                    <AlertCircle size={14} />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

export default MMTextarea;
