import React from 'react';
import ReportsExplorer from '../components/ReportsExplorer';

const ReportsPage = () => {
    return (
        <div className="dashboard-container" style={{ paddingBottom: '2rem' }}>
            <div style={{ padding: '0 2rem 2rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
                {/* Reports Explorer Component */}
                <div>
                    <ReportsExplorer />
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;
