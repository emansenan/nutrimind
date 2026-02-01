import React from 'react';
import { Check } from 'lucide-react';
import './MMCheckbox.css';

/**
 * MMCheckbox - Executive Gold Checkbox
 * 
 * @param {boolean} checked - Controlled checked state
 * @param {function} onChange - Change handler
 * @param {string} label - Checkbox label
 * @param {boolean} disabled - Disabled state
 */
const MMCheckbox = ({
    checked = false,
    onChange,
    label,
    disabled = false,
    className = '',
    ...rest
}) => {
    return (
        <label className={`mm-checkbox-wrapper ${disabled ? 'disabled' : ''} ${className}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="mm-checkbox-input"
                {...rest}
            />
            <span className="mm-checkbox-box">
                {checked && <Check size={16} strokeWidth={3} />}
            </span>
            {label && <span className="mm-checkbox-label">{label}</span>}
        </label>
    );
};

export default MMCheckbox;
