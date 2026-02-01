import React from 'react';
import './MMTable.css';

/**
 * MMTable - Executive High-Density Data Grid
 * 
 * @param {Array} columns - [{ header: 'Name', accessor: 'name', width: '20%' }]
 * @param {Array} data - Array of objects
 * @param {Function} renderRow - Optional custom row renderer if simple accessor isn't enough
 * @param {boolean} isLoading - Show loading state
 */
const MMTable = ({
    columns = [],
    data = [],
    renderRow,
    isLoading = false,
    emptyMessage = "No data available",
    className = ''
}) => {

    if (isLoading) {
        return <div className="mm-table-loading">Loading Data...</div>;
    }

    if (!data || data.length === 0) {
        return <div className="mm-table-empty">{emptyMessage}</div>;
    }

    return (
        <div className={`mm-table-container ${className}`}>
            <table className="mm-table">
                <thead>
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx} style={{ width: col.width }}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIdx) => (
                        <tr key={row.id || rowIdx}>
                            {renderRow ? renderRow(row) : (
                                columns.map((col, colIdx) => (
                                    <td key={colIdx}>
                                        {row[col.accessor]}
                                    </td>
                                ))
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MMTable;
