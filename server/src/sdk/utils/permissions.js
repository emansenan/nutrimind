/**
 * Permissions Utilities
 * 
 * Helper functions for checking user permissions.
 * 
 * @module sdk/utils/permissions
 */

/**
 * Check if user has permission
 * @param {Object} user - User object
 * @param {string} permission - Permission to check
 * @returns {boolean} Has permission
 */
function hasPermission(user, permission) {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
}

/**
 * Check if user has any of the permissions
 * @param {Object} user - User object
 * @param {Array<string>} permissions - Permissions to check
 * @returns {boolean} Has any permission
 */
function hasAnyPermission(user, permissions) {
    if (!user || !user.permissions) return false;
    return permissions.some(p => user.permissions.includes(p));
}

/**
 * Check if user has all permissions
 * @param {Object} user - User object
 * @param {Array<string>} permissions - Permissions to check
 * @returns {boolean} Has all permissions
 */
function hasAllPermissions(user, permissions) {
    if (!user || !user.permissions) return false;
    return permissions.every(p => user.permissions.includes(p));
}

/**
 * Check if user has organization role
 * @param {Object} user - User object
 * @param {string} organizationId - Organization ID
 * @param {Array<string>} roles - Allowed roles
 * @returns {boolean} Has role
 */
function hasOrganizationRole(user, organizationId, roles) {
    if (!user || !user.organizationRoles) return false;

    const orgRole = user.organizationRoles.find(
        r => r.organizationId === organizationId
    );

    return orgRole && roles.includes(orgRole.role);
}

/**
 * Check if user is organization owner
 * @param {Object} user - User object
 * @param {string} organizationId - Organization ID
 * @returns {boolean} Is owner
 */
function isOrganizationOwner(user, organizationId) {
    return hasOrganizationRole(user, organizationId, ['OWNER']);
}

/**
 * Check if user is organization admin
 * @param {Object} user - User object
 * @param {string} organizationId - Organization ID
 * @returns {boolean} Is admin or owner
 */
function isOrganizationAdmin(user, organizationId) {
    return hasOrganizationRole(user, organizationId, ['OWNER', 'ADMIN']);
}

module.exports = {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasOrganizationRole,
    isOrganizationOwner,
    isOrganizationAdmin
};
