import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import './MMPagination.css';

/**
 * MMPagination - Executive Gold Pagination Control
 * 
 * @param {number} currentPage - Current active page (1-indexed)
 * @param {number} totalPages - Total number of pages
 * @param {function} onPageChange - Callback when page changes
 * @param {number} itemsPerPage - Items per page (optional, for display)
 * @param {number} totalItems - Total items count (optional, for display)
 * @param {boolean} showItemsPerPage - Show items per page selector
 * @param {function} onItemsPerPageChange - Callback for items per page change
 * @param {array} itemsPerPageOptions - Options for items per page (default: [10, 20, 50, 100])
 */
const MMPagination = ({
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    itemsPerPage = 20,
    totalItems,
    showItemsPerPage = false,
    onItemsPerPageChange,
    itemsPerPageOptions = [10, 20, 50, 100],
    className = ''
}) => {
    if (totalPages <= 1) return null; // Don't show if only 1 page

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages || page === currentPage) return;
        onPageChange?.(page);
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 7; // Max page buttons to show

        if (totalPages <= maxVisible) {
            // Show all pages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show first, last, and pages around current
            if (currentPage <= 3) {
                // Near start
                for (let i = 1; i <= 5; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Near end
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
            } else {
                // Middle
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <div className={`mm-pagination ${className}`}>
            {/* Items Per Page Selector */}
            {showItemsPerPage && (
                <div className="mm-pagination-items-per-page">
                    <span>Show:</span>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => onItemsPerPageChange?.(Number(e.target.value))}
                        className="mm-pagination-select"
                    >
                        {itemsPerPageOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    <span>per page</span>
                </div>
            )}

            {/* Page Info */}
            {totalItems && (
                <div className="mm-pagination-info">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
                </div>
            )}

            {/* Pagination Controls */}
            <div className="mm-pagination-controls">
                {/* First Page */}
                <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="mm-pagination-btn mm-pagination-nav"
                    title="First page"
                >
                    <ChevronsLeft size={16} />
                </button>

                {/* Previous Page */}
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="mm-pagination-btn mm-pagination-nav"
                    title="Previous page"
                >
                    <ChevronLeft size={16} />
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page, idx) => (
                    page === '...' ? (
                        <span key={`ellipsis-${idx}`} className="mm-pagination-ellipsis">...</span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`mm-pagination-btn mm-pagination-number ${currentPage === page ? 'active' : ''}`}
                        >
                            {page}
                        </button>
                    )
                ))}

                {/* Next Page */}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="mm-pagination-btn mm-pagination-nav"
                    title="Next page"
                >
                    <ChevronRight size={16} />
                </button>

                {/* Last Page */}
                <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="mm-pagination-btn mm-pagination-nav"
                    title="Last page"
                >
                    <ChevronsRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default MMPagination;
