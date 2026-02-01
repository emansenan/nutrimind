import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface MMDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    width?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    // Navigation controls (for multi-item drawers)
    navigation?: {
        onNext?: () => void;
        onPrevious?: () => void;
        currentIndex?: number;
        totalCount?: number;
        disableNext?: boolean;
        disablePrevious?: boolean;
    };
}


/**
 * MMDrawer - MicroMind Design Kit Slide-Over Drawer
 * 
 * V4 Executive Gold Drawer Panel
 * 
 * Purpose:
 * - Right-aligned slide-over panel
 * - Maintains table/list context in background
 * - Lighter than a modal (doesn't fully block)
 * - Perfect for detail views without losing context
 * 
 * Example Use Cases:
 * - High Risk Account Details (Credit Control)
 * - Order Details (PO Converter)
 * - User Profile Editor
 * - Settings Panel
 * 
 * Features:
 * - Carbon background with gold left border
 * - Backdrop blur effect
 * - Escape key to close
 * - Click backdrop to close
 * - Body scroll lock when open
 */
export default function MMDrawer({
    isOpen,
    onClose,
    title,
    children,
    footer,
    width = 'lg',
    className = '',
    navigation,
}: MMDrawerProps) {
    const widthMap = {
        sm: 'w-80',       // 320px
        md: 'w-96',       // 384px
        lg: 'w-[32rem]',  // 512px
        xl: 'w-[48rem]',  // 768px
    };

    // Lock body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop with blur */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer Panel */}
            <div
                className={`fixed top-0 right-0 h-full ${widthMap[width]} bg-bg-surface border-l-2 border-brand-primary shadow-2xl z-50 flex flex-col transform transition-transform ${className}`.trim()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="drawer-title"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border-subtle flex-shrink-0">
                    {/* Navigation Controls (Left Side) */}
                    {navigation && (
                        <div className="flex items-center gap-2 mr-4">
                            <button
                                onClick={navigation.onPrevious}
                                disabled={navigation.disablePrevious || !navigation.onPrevious}
                                className="px-3 py-1 text-sm text-text-muted hover:text-brand-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                aria-label="Previous"
                            >
                                ← previous
                            </button>
                            {navigation.currentIndex !== undefined && navigation.totalCount !== undefined && (
                                <span className="text-sm text-text-muted px-2">
                                    {navigation.currentIndex} of {navigation.totalCount}
                                </span>
                            )}
                            <button
                                onClick={navigation.onNext}
                                disabled={navigation.disableNext || !navigation.onNext}
                                className="px-3 py-1 text-sm text-text-muted hover:text-brand-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                aria-label="Next"
                            >
                                next →
                            </button>
                        </div>
                    )}

                    {/* Title */}
                    <h2
                        id="drawer-title"
                        className={`text-lg font-semibold text-text-main ${navigation ? '' : 'flex-1'}`}
                    >
                        {title}
                    </h2>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="text-text-muted hover:text-brand-primary transition-colors p-1 rounded hover:bg-bg-hover ml-auto"
                        aria-label="Close drawer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-6">
                    {children}
                </div>

                {/* Footer (Optional) */}
                {footer && (
                    <div className="border-t border-border-subtle px-6 pt-4 pb-8 flex gap-3 justify-end flex-shrink-0 bg-bg-page">
                        {footer}
                    </div>
                )}
            </div>
        </>
    );
}
