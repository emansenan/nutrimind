import React, { useState, useEffect } from 'react';
import { Plus, Search, LayoutDashboard, Loader2, Sparkles } from 'lucide-react';
import dashboardService from '../../services/dashboardService';
import DashboardCard from '../../components/analytics/DashboardCard';
import DashboardForm from '../../components/analytics/DashboardForm';
import './DashboardsPage.css';

const DashboardsPage = () => {
    const [dashboards, setDashboards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [managerName, setManagerName] = useState('Manager');

    useEffect(() => {
        fetchDashboards();

        // Load manager name from local storage
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                if (user.displayName || user.name) {
                    setManagerName(user.displayName || user.name);
                }
            } catch (e) {
                console.error('Failed to parse user data');
            }
        }
    }, []);

    const fetchDashboards = async () => {
        try {
            setLoading(true);
            const data = await dashboardService.getMyDashboards();
            setDashboards(data);
        } catch (error) {
            console.error('Error fetching dashboards:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateDashboard = async (formData) => {
        try {
            await dashboardService.createDashboard(formData);
            fetchDashboards();
            setShowCreateModal(false);
        } catch (error) {
            throw error;
        }
    };

    const handleDeleteDashboard = async (id) => {
        if (window.confirm('Are you sure you want to delete this dashboard?')) {
            try {
                await dashboardService.deleteDashboard(id);
                fetchDashboards();
            } catch (error) {
                console.error('Error deleting dashboard:', error);
            }
        }
    };

    const filteredDashboards = dashboards.filter(dash =>
        dash.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (dash.description && dash.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="dashboards-container">
            {/* Executive Header */}
            <div className="dashboards-header">
                <div className="header-title-area">
                    <div className="flex items-center gap-2 mb-1 text-[var(--primary)] text-xs font-bold uppercase tracking-[0.2em]">
                        <Sparkles size={14} />
                        <span>Intelligence Cockpit</span>
                    </div>
                    <h1>Analytics Dashboards</h1>
                    <p>Welcome back, {managerName}. Here are your custom analytical views.</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="create-btn"
                >
                    <Plus size={20} />
                    <span>Create Dashboard</span>
                </button>
            </div>

            {/* Search Section */}
            <div className="search-section">
                <div className="search-input-wrapper">
                    <Search className="search-icon-pos" size={18} />
                    <input
                        type="text"
                        placeholder="Search Intelligence Layers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="dash-search-input"
                    />
                </div>
            </div>

            {/* Content Area */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4 text-[var(--text-muted)]">
                    <Loader2 className="animate-spin text-[var(--primary)]" size={40} />
                    <p className="font-medium animate-pulse">Synchronizing Intelligence Layers...</p>
                </div>
            ) : filteredDashboards.length > 0 ? (
                <div className="dashboards-grid">
                    {filteredDashboards.map(dashboard => (
                        <DashboardCard
                            key={dashboard.id}
                            dashboard={dashboard}
                            onDelete={() => handleDeleteDashboard(dashboard.id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="empty-dashboards-container">
                    <div className="empty-icon-wrapper">
                        <LayoutDashboard size={48} opacity={0.5} />
                    </div>
                    <div>
                        <h3>No Dashboards Found</h3>
                        <p>It looks like you haven't created any AI-powered analytical views yet.</p>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="empty-create-btn"
                    >
                        <Plus size={20} />
                        <span>Deploy Your First Layer</span>
                    </button>
                </div>
            )}

            {showCreateModal && (
                <DashboardForm
                    onSuccess={handleCreateDashboard}
                    onCancel={() => setShowCreateModal(false)}
                />
            )}
        </div>
    );
};

export default DashboardsPage;
