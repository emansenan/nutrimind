import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ConfirmationModal from './common/ConfirmationModal';

const OfflineBanner = () => {
    const { t } = useTranslation();
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [syncStatus, setSyncStatus] = useState('idle'); // idle, syncing, completed, error
    const [pendingCount, setPendingCount] = useState(0);
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => { },
        type: 'danger',
        confirmText: 'Discard'
    });

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            // Re-check pending count when back online (Service will trigger sync)
        };
        const handleOffline = () => setIsOnline(false);

        const handleSyncStatus = (event) => {
            const { status, count } = event.detail;
            setSyncStatus(status);
            setPendingCount(count);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        window.addEventListener('sync-status', handleSyncStatus);

        // Initial check
        import('../services/offlineSyncService').then(m => {
            m.default.getPendingCount().then(count => {
                setPendingCount(count);
            });
        }).catch(err => console.warn('Failed to load sync service', err));

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('sync-status', handleSyncStatus);
        };
    }, []);

    const handleRetry = () => {
        window.dispatchEvent(new CustomEvent('trigger-sync'));
    };

    const handleDiscard = () => {
        setConfirmModal({
            isOpen: true,
            title: t('common.offline.discard'),
            message: t('common.offline.confirmDiscard'),
            type: 'danger',
            confirmText: t('common.offline.discard'),
            cancelText: t('common.cancel'),
            onConfirm: async () => {
                try {
                    const service = await import('../services/offlineSyncService');
                    await service.default.clearAllPending();
                    setPendingCount(0);
                    setSyncStatus('idle');
                } catch (e) {
                    console.error('Failed to clear pending', e);
                }
            }
        });
    };

    if (isOnline && pendingCount === 0 && syncStatus === 'idle') return null;

    const renderContent = () => {
        if (!isOnline) {
            return (
                <div style={{
                    backgroundColor: '#d32f2f',
                    color: 'white',
                    textAlign: 'center',
                    padding: '0.5rem',
                    position: 'sticky',
                    top: 0,
                    zIndex: 9999,
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                }}>
                    <span>{t('common.offline.noConnection')}</span>
                    {pendingCount > 0 && <span style={{ opacity: 0.9, fontSize: '0.8rem' }}>{t('common.offline.pendingItems', { count: pendingCount })}</span>}
                </div>
            );
        }

        if (pendingCount > 0) {
            const isError = syncStatus === 'error';
            return (
                <div style={{
                    backgroundColor: isError ? '#d32f2f' : '#f57c00', // Red for error, Orange for pending
                    color: 'white',
                    textAlign: 'center',
                    padding: '0.5rem',
                    position: 'sticky',
                    top: 0,
                    zIndex: 9999,
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap'
                }}>
                    <span>
                        {syncStatus === 'syncing' ? t('common.offline.syncing') : (isError ? t('common.offline.syncFailed') : t('common.offline.pendingUploads'))} ({pendingCount} items)
                    </span>

                    {syncStatus !== 'syncing' && (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={handleRetry}
                                style={{
                                    backgroundColor: 'white', color: isError ? '#d32f2f' : '#f57c00',
                                    border: 'none', borderRadius: '4px', padding: '0.25rem 0.75rem',
                                    fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer'
                                }}
                            >
                                {isError ? t('common.offline.retry') : t('common.offline.syncNow')}
                            </button>
                            <button
                                onClick={handleDiscard}
                                style={{
                                    backgroundColor: 'rgba(0,0,0,0.2)', color: 'white',
                                    border: '1px solid rgba(255,255,255,0.4)', borderRadius: '4px', padding: '0.25rem 0.75rem',
                                    fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer'
                                }}
                            >
                                {t('common.offline.discard')}
                            </button>
                        </div>
                    )}
                </div>
            );
        }

        if (syncStatus === 'completed') {
            return (
                <div style={{
                    backgroundColor: '#388e3c', // Green
                    color: 'white',
                    textAlign: 'center',
                    padding: '0.5rem',
                    position: 'sticky',
                    top: 0,
                    zIndex: 9999,
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                }}>
                    {t('common.offline.syncComplete')}
                </div>
            );
        }

        return null;
    };

    return (
        <>
            {renderContent()}
            <ConfirmationModal
                isOpen={confirmModal.isOpen}
                title={confirmModal.title}
                message={confirmModal.message}
                confirmText={confirmModal.confirmText}
                cancelText={confirmModal.cancelText}
                type={confirmModal.type}
                onConfirm={confirmModal.onConfirm}
                onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
            />
        </>
    );
};

export default OfflineBanner;
