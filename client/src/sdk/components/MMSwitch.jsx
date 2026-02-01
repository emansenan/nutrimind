import React from 'react';
import './MMSwitch.css';

/**
 * MMSwitch - Executive Gold Toggle Switch
 * 
 * @param {boolean} checked - Controlled checked state
 * @param {function} onChange - Change handler
 * @param {string} label - Switch label
 * @param {boolean} disabled - Disabled state
 */
const MMSwitch = ({
    checked = false,
    onChange,
    label,
    disabled = false,
    className = '',
    ...rest
}) => {
    return (
        <label className={`mm-switch-wrapper ${disabled ? 'disabled' : ''} ${className}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                className="mm-switch-input"
                {...rest}
            />
            <span className="mm-switch-slider"></span>
            {label && <span className="mm-switch-label">{label}</span>}
        </label>
    );
};

export default MMSwitch;
