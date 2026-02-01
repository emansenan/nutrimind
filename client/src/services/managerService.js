import api from './api';

const getDashboardStats = async (startDate, endDate, collectorId, city) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (collectorId && collectorId !== 'all') params.append('collectorId', collectorId);
    if (city && city !== 'all') params.append('city', city);

    const response = await api.get(`/manager/dashboard-stats?${params.toString()}`);
    return response.data;
};

const getTeamStatus = async () => {
    const response = await api.get('/manager/team-status');
    return response.data;
};

const getSchedules = async (params = {}) => {
    const response = await api.get('/manager/schedules', { params });
    return response.data;
};

const approveSchedules = async (taskIds, action) => {
    const response = await api.post('/manager/schedules/approve', { taskIds, action });
    return response.data;
};

const saveDraft = async (tasks) => {
    const response = await api.post('/manager/schedules/save-draft', { tasks });
    return response.data;
};

const createManualTask = async (taskData) => {
    const response = await api.post('/manager/tasks', taskData);
    return response.data;
};

const getTeamPerformance = async (filters) => {
    const response = await api.get('/manager/performance', { params: filters });
    return response.data;
};

const getHighRiskCustomers = async () => {
    const response = await api.get('/manager/high-risk-customers');
    return response.data;
};

const updateCustomerAction = async (customerId, actionData) => {
    const response = await api.post(`/manager/customers/${customerId}/action`, actionData);
    return response.data;
};

const getHighRiskSummary = async () => {
    const response = await api.get('/manager/high-risk-summary');
    return response.data;
};

const searchCustomers = async (query) => {
    const response = await api.get('/manager/customers/search', { params: { q: query } });
    return response.data;
};

const getCollectionTrends = async (days = 7, collectorId, city) => {
    const params = { days };
    if (collectorId && collectorId !== 'all') params.collectorId = collectorId;
    if (city && city !== 'all') params.city = city;

    const response = await api.get('/manager/dashboard/trends', { params });
    return response.data;
};

const getScheduleSummary = async (collectorId, status) => {
    const params = {};
    if (collectorId) params.collectorId = collectorId;
    if (status) params.status = status;
    const response = await api.get('/manager/schedules/summary', { params });
    return response.data;
};

// Report service methods
const getVisitsSummaryReport = async (params) => {
    const response = await api.get('/manager/reports/visits-summary', { params });
    return response.data;
};

const getSuccessfulCollectionsReport = async (params) => {
    const response = await api.get('/manager/reports/successful-collections', { params });
    return response.data;
};

const getCollectionValuesReport = async (params) => {
    const response = await api.get('/manager/reports/collection-values', { params });
    return response.data;
};

const getCustomerOnboardingReport = async (params) => {
    const response = await api.get('/manager/reports/customer-onboarding', { params });
    return response.data;
};

const resetWeekSchedule = async (data) => {
    const response = await api.post('/manager/schedules/reset', data);
    return response.data;
};

const getReconciliationsReport = async (params) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/manager/reports/reconciliations?${queryString}`);
    return response.data;
};

const getNonReconcilingBalancesReport = async (params) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/manager/reports/non-reconciling-balances?${queryString}`);
    return response.data;
};

const getVisitsWithSubtasksReport = async (params) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/manager/reports/visits-with-subtasks?${queryString}`);
    return response.data;
};

// Visit Audit & Review
const getAuditVisits = async (filters) => {
    const params = {};
    if (filters.collectorId && filters.collectorId !== 'all') params.collectorId = filters.collectorId;
    if (filters.date) params.date = filters.date;
    // Fix: Send date range to API
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;

    if (filters.outcomeFilter && filters.outcomeFilter !== 'all') params.outcomeFilter = filters.outcomeFilter;

    const response = await api.get('/manager/audit/visits', { params });
    return response.data;
};

const submitVisitAuditFeedback = async (logId, feedbackData) => {
    const response = await api.post(`/manager/audit/visits/${logId}/feedback`, feedbackData);
    return response.data;
};

// Refresh presigned URLs for a visit's media
const refreshVisitMedia = async (visitId) => {
    const response = await api.get(`/manager/audit/visits/${visitId}/refresh-media`);
    return response.data;
};

const updateTask = async (taskId, updates) => {
    const response = await api.put(`/manager/tasks/${taskId}`, updates);
    return response.data;
};

const deleteTask = async (taskId) => {
    const response = await api.delete(`/manager/tasks/${taskId}`);
    return response.data;
};

const publishWeekSchedules = async (publishData) => {
    const response = await api.post('/manager/schedules/publish', publishData);
    return response.data;
};

const getCustomerContext360 = async (customerId) => {
    const response = await api.get(`/manager/customers/${customerId}/context`);
    return response.data;
};

const optimizeRouteForDay = async (taskIds, date) => {
    const response = await api.post('/manager/schedules/optimize-route', { taskIds, date });
    return response.data;
};

const autoFillSchedule = async (data) => {
    // data: { weekStart, collectorId, radius, dailyLimit }
    const response = await api.post('/manager/schedules/auto-fill', data);
    return response.data;
};

const getAIQueue = async (params) => {
    // params: { weekStart, weekEnd, minScore }
    const response = await api.get('/manager/ai-queue', { params });
    return response.data;
};

const getActiveCities = async () => {
    const response = await api.get('/manager/filters/cities');
    return response.data;
};

const getUnassignedCities = async () => {
    const response = await api.get('/manager/filters/cities-unassigned');
    return response.data;
};

const updateCustomerGPS = async (customerId, gpsData) => {
    const response = await api.put(`/manager/customers/${customerId}/gps`, gpsData);
    return response.data;
};

// Visit Feedback & Flags
const flagVisitForReview = async (visitId, data) => {
    const response = await api.post(`/manager/visits/${visitId}/flag-review`, data);
    return response.data;
};

const addVisitFeedback = async (visitId, data) => {
    const response = await api.post(`/manager/visits/${visitId}/feedback`, data);
    return response.data;
};

const flagCustomerToSales = async (visitId, data) => {
    const response = await api.post(`/manager/visits/${visitId}/flag-sales`, data);
    return response.data;
};

const flagCustomerToLegal = async (visitId, data) => {
    const response = await api.post(`/manager/visits/${visitId}/flag-legal`, data);
    return response.data;
};

// Flagged Reviews Management
const getFlaggedReviews = async (filters) => {
    const params = {};
    if (filters.feedbackType && filters.feedbackType !== 'all') params.feedbackType = filters.feedbackType;
    if (filters.status && filters.status !== 'all') params.status = filters.status;
    if (filters.collectorId && filters.collectorId !== 'all') params.collectorId = filters.collectorId;
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;

    const response = await api.get('/manager/flagged-reviews', { params });
    return response.data;
};

const updateFlaggedReviewStatus = async (id, statusData) => {
    const response = await api.put(`/manager/flagged-reviews/${id}/status`, statusData);
    return response.data;
};

// Visit Subtasks Management
const getVisitSubtasks = async (filters = {}) => {
    const params = {};
    if (filters.subtaskType && filters.subtaskType !== 'all') params.subtaskType = filters.subtaskType;
    if (filters.status && filters.status !== 'all') params.status = filters.status;
    if (filters.priority && filters.priority !== 'all') params.priority = filters.priority;
    if (filters.collectorId && filters.collectorId !== 'all') params.collectorId = filters.collectorId;
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;

    const response = await api.get('/manager/visit-subtasks', { params });
    return response.data;
};

const createSubtask = async (subtaskData) => {
    const response = await api.post('/manager/visit-subtasks', subtaskData);
    return response.data;
};

const updateSubtask = async (id, updates) => {
    const response = await api.put(`/manager/visit-subtasks/${id}`, updates);
    return response.data;
};

const deleteSubtask = async (id) => {
    const response = await api.delete(`/manager/visit-subtasks/${id}`);
    return response.data;
};

const updateSubtaskStatus = async (id, statusData) => {
    const response = await api.put(`/manager/visit-subtasks/${id}/status`, statusData);
    return response.data;
};

const assignSubtaskCollector = async (id, collectorId) => {
    const response = await api.put(`/manager/visit-subtasks/${id}/assign`, { collectorId });
    return response.data;
};

const bulkAssignSubtasks = async (subtaskIds, collectorId) => {
    const response = await api.put('/manager/visit-subtasks/bulk-assign', { subtaskIds, collectorId });
    return response.data;
};

const getSubtasksByVisit = async (visitLogId) => {
    const response = await api.get(`/manager/visit-subtasks/visit/${visitLogId}`);
    return response.data;
};

const getVisitsWithSubtasks = async (filters = {}) => {
    const params = {};
    if (filters.collectorId && filters.collectorId !== 'all') params.collectorId = filters.collectorId;
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;
    if (filters.hasSubtasks) params.hasSubtasks = 'true';

    const response = await api.get('/manager/visits-with-subtasks', { params });
    return response.data;
};


// Email Template Generators
const generateSalesEmailTemplate = (flaggedReview) => {
    const { customer, visitLog, comment } = flaggedReview;
    return `Subject: Sales Opportunity - ${customer.name}

Dear Sales Team,

A potential sales opportunity has been identified during a recent field visit:

Customer Details:
- Name: ${customer.name}
- Current Outstanding Debt: $${customer.totalDebt?.toLocaleString() || '0'}
- Location: ${customer.city || 'N/A'}

Visit Information:
- Visit Date: ${new Date(visitLog.logTimestamp).toLocaleDateString()}
- Outcome: ${visitLog.outcomeStatus}
- Collector Notes: ${visitLog.visitNotes || 'N/A'}

Manager Notes:
${comment}

Please follow up with this customer to explore potential sales opportunities.

Best regards,
Credit Control Team`;
};

const generateLegalEmailTemplate = (flaggedReview) => {
    const { customer, visitLog, comment } = flaggedReview;
    return `Subject: Legal Escalation Required - ${customer.name}

Dear Legal Team,

A customer account requires legal attention based on recent field activity:

Customer Details:
- Name: ${customer.name}
- Total Outstanding Debt: $${customer.totalDebt?.toLocaleString() || '0'}
- Location: ${customer.city || 'N/A'}

Visit Information:
- Visit Date: ${new Date(visitLog.logTimestamp).toLocaleDateString()}
- Outcome: ${visitLog.outcomeStatus}
- Collection Attempts: Multiple visits with no resolution

Escalation Reason:
${comment}

Please review this account for potential legal action.

Best regards,
Credit Control Team`;
};

// Weekly Capacity & City Assignment (NEW)
const getWeeklyCapacity = async (collectorId) => {
    const response = await api.get('/manager/weekly-capacity', { params: { collectorId } });
    return response.data;
};

const updateWeeklyCapacity = async (collectorId, weekDays) => {
    const response = await api.put('/manager/weekly-capacity', { collectorId, weekDays });
    return response.data;
};

const getCollectorCities = async (collectorId) => {
    const response = await api.get('/manager/collector-cities', { params: { collectorId } });
    return response.data;
};

export default {
    getDashboardStats,
    getTeamStatus,
    getSchedules,
    approveSchedules,
    saveDraft,
    createManualTask,
    updateTask,
    deleteTask,
    publishWeekSchedules,
    optimizeRouteForDay,
    autoFillSchedule,
    resetWeekSchedule, // NEW: Export reset function
    getAIQueue,
    getCustomerContext360,
    getTeamPerformance,
    getHighRiskCustomers,
    updateCustomerAction,
    getHighRiskSummary,
    searchCustomers,
    getCollectionTrends,
    getScheduleSummary,
    getVisitsSummaryReport,
    getSuccessfulCollectionsReport,
    getCollectionValuesReport,
    getCustomerOnboardingReport,
    getReconciliationsReport,
    getNonReconcilingBalancesReport,
    getVisitsWithSubtasksReport,
    getAuditVisits,
    submitVisitAuditFeedback,
    refreshVisitMedia,
    updateCustomerGPS,
    flagVisitForReview,
    addVisitFeedback,
    flagCustomerToSales,
    flagCustomerToLegal,
    getActiveCities,
    getUnassignedCities,
    getFlaggedReviews,
    updateFlaggedReviewStatus,
    getVisitSubtasks,
    createSubtask,
    updateSubtask,
    deleteSubtask,
    updateSubtaskStatus,
    assignSubtaskCollector,
    bulkAssignSubtasks,
    getSubtasksByVisit,
    getVisitsWithSubtasks,
    generateSalesEmailTemplate,
    generateLegalEmailTemplate,
    getWeeklyCapacity,        // NEW
    updateWeeklyCapacity,     // NEW
    getCollectorCities        // NEW
};
