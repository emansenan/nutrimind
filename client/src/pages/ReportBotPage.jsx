import React from 'react';
import ReportBotChat from './manager/ReportBotChat';
import { useTranslation } from 'react-i18next';

const ReportBotPage = () => {
    const { t } = useTranslation();
    return (
        <div className="dashboard-container" style={{ paddingBottom: '2rem' }}>
            <div style={{ padding: '0 2rem 2rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
                {/* Page Header */}
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--text-primary)', fontWeight: '700' }}>
                        {t('reportBot.title')}
                    </h1>
                    <p style={{
                        margin: '0.5rem 0 0 0',
                        color: 'var(--text-muted)',
                        fontSize: '0.95rem'
                    }}>
                        {t('reportBot.subtitle')}
                    </p>
                </div>

                {/* Report Bot Chat Component */}
                <div>
                    <ReportBotChat />
                </div>
            </div>
        </div>
    );
};

export default ReportBotPage;
