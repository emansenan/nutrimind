import api from './api';

/**
 * Dashboard Service
 * 
 * Handles CRUD operations for SQL dashboards.
 * Tenant-scoped via JWT token.
 */

const getDashboards = async () => {
    const response = await api.get('/dashboards');
    return response.data;
};

const getDashboard = async (id) => {
    const response = await api.get(`/dashboards/${id}`);
    return response.data;
};

const createDashboard = async (data) => {
    const response = await api.post('/dashboards', data);
    return response.data;
};

const updateDashboard = async (id, data) => {
    const response = await api.put(`/dashboards/${id}`, data);
    return response.data;
};

const deleteDashboard = async (id) => {
    const response = await api.delete(`/dashboards/${id}`);
    return response.data;
};

const executeSql = async (id) => {
    const response = await api.post(`/dashboards/${id}/execute`);
    return response.data;
};

export default {
    getDashboards,
    getMyDashboards: getDashboards,
    getDashboard,
    createDashboard,
    updateDashboard,
    deleteDashboard,
    executeSql,
};
