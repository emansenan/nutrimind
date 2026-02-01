import React from 'react';
import AppLayout from './AppLayout';

/**
 * ManagerLayout - Desktop-optimized layout for managers and admins
 * 
 * This layout wraps the existing AppLayout component which includes:
 * - 240px fixed sidebar with navigation
 * - Executive Gold theme
 * - Multi-level menu structure
 * - Search functionality
 * 
 * Used for routes: /, /manager/*, /copilots, /reports, /settings
 */
const ManagerLayout = () => {
    return <AppLayout />;
};

export default ManagerLayout;
