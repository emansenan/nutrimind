import React from 'react';
import AIAgentChat from '../components/AIAgentChat';
import { useTranslation } from 'react-i18next';

const CoPilotsPage = () => {
    const { t } = useTranslation();
    return (
        <div className="dashboard-container" style={{ paddingBottom: '2rem' }}>
            <div style={{ padding: '0 2rem 2rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
                {/* Page Header */}
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--text-primary)', fontWeight: '700' }}>
                        {t('copilots.title')}
                    </h1>
                    <p style={{
                        margin: '0.5rem 0 0 0',
                        color: 'var(--text-muted)',
                        fontSize: '0.95rem'
                    }}>
                        {t('copilots.subtitle')}
                    </p>
                </div>

                {/* AI Agent Chat Component */}
                <div>
                    <AIAgentChat />
                </div>
            </div>
        </div>
    );
};

export default CoPilotsPage;
