import React from 'react';
import { Search } from 'lucide-react';
import './MMSearch.css';

/**
 * MMSearch - Standard Search Input
 * 
 * @param {string} value - controlled input value
 * @param {function} onChange - change handler
 * @param {string} placeholder - placeholder text
 * @param {string} className - extra classes
 */
const MMSearch = ({
    value,
    onChange,
    placeholder = 'Search...',
    className = ''
}) => {
    return (
        <div className={`mm-search ${className}`}>
            <Search className="mm-search__icon" size={18} />
            <input
                type="text"
                className="mm-search__input"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default MMSearch;
