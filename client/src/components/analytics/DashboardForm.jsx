import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, X, Sparkles, Settings2 } from 'lucide-react';
import './DashboardForm.css';

/**
 * DashboardForm - "New Intelligence Layer" creation modal
 * Matches Credit Control's full-featured dashboard creation form.
 * Props: onSave(formData), onClose(), dashboard (optional for edit mode)
 */
const DashboardForm = ({ dashboard, onSave, onClose }) => {
    const { t } = useTranslation();
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        title: dashboard?.title || '',
        description: dashboard?.description || '',
        generateQueryUrl: dashboard?.generateQueryUrl || '',
        executeQueryUrl: dashboard?.executeQueryUrl || '',
        isPublic: dashboard?.isPublic || false,
        refreshInterval: dashboard?.refreshInterval || '',
    });

    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(dashboard?.coverImage || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setPhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => setPhotoPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const removePhoto = () => {
        setPhoto(null);
        setPhotoPreview('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    };

    const handleDragLeave = (e) => {
        e.currentTarget.classList.remove('drag-over');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setPhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => setPhotoPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.title.trim()) {
            setError(t('dashboardsPage.form.errors.titleRequired', 'Title is required'));
            return;
        }

        try {
            setLoading(true);
            await onSave?.({ ...formData, photo });
        } catch (err) {
            setError(err.message || t('dashboardsPage.form.errors.createFailed', 'Failed to create dashboard'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="df-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="df-modal">
                {/* Header */}
                <div className="df-header">
                    <div>
                        <div className="df-badge">
                            <Sparkles size={12} />
                            <span>{t('dashboardsPage.form.badge', 'System Component')}</span>
                        </div>
                        <h2 className="df-title">
                            {dashboard
                                ? t('dashboardsPage.form.editTitle', 'Edit Intelligence Layer')
                                : t('dashboardsPage.form.createTitle', 'New Intelligence Layer')
                            }
                        </h2>
                    </div>
                    <button className="df-close-btn" onClick={onClose}>
                        <X size={22} />
                    </button>
                </div>

                {error && (
                    <div className="df-error">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="df-form">
                    {/* Top Section: Title/Description + Cover Image */}
                    <div className="df-top-section">
                        {/* Left column */}
                        <div className="df-left-col">
                            <div className="df-field">
                                <label className="df-label">
                                    {t('dashboardsPage.form.dashboardTitle', 'Dashboard Title')}
                                </label>
                                <input
                                    type="text"
                                    className="df-input"
                                    value={formData.title}
                                    onChange={(e) => handleChange('title', e.target.value)}
                                    placeholder={t('dashboardsPage.form.titlePlaceholder', 'e.g. Strategic Sales Portfolio')}
                                    maxLength={100}
                                />
                            </div>

                            <div className="df-field">
                                <label className="df-label">
                                    {t('dashboardsPage.form.executiveDescription', 'Executive Description')}
                                </label>
                                <textarea
                                    className="df-textarea"
                                    value={formData.description}
                                    onChange={(e) => handleChange('description', e.target.value)}
                                    placeholder={t('dashboardsPage.form.descriptionPlaceholder', 'Describe the analytical objective for the management team...')}
                                    rows={4}
                                />
                            </div>
                        </div>

                        {/* Right column: Cover Image */}
                        <div className="df-right-col">
                            <label className="df-label">
                                {t('dashboardsPage.form.visualBranding', 'Visual Branding (Cover)')}
                            </label>
                            <div className="df-photo-upload">
                                {photoPreview ? (
                                    <div className="df-photo-preview">
                                        <img src={photoPreview} alt="Preview" className="df-preview-image" />
                                        <button
                                            type="button"
                                            className="df-remove-photo"
                                            onClick={removePhoto}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        className="df-upload-zone"
                                        onClick={() => fileInputRef.current?.click()}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                    >
                                        <Upload size={28} />
                                        <span>
                                            <strong className="df-upload-link">
                                                {t('dashboardsPage.form.selectMedia', 'Select media')}
                                            </strong>
                                            {' '}{t('dashboardsPage.form.orDragDrop', 'or drag & drop')}
                                        </span>
                                        <span className="df-upload-hint">
                                            {t('dashboardsPage.form.uploadHint', 'SUPPORT: PNG, JPG • MAX 5MB')}
                                        </span>
                                    </div>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className="df-file-input"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Visibility Checkbox */}
                    <div className="df-checkbox-group">
                        <label className="df-checkbox-label">
                            <input
                                type="checkbox"
                                className="df-checkbox"
                                checked={formData.isPublic}
                                onChange={(e) => handleChange('isPublic', e.target.checked)}
                            />
                            <span>{t('dashboardsPage.form.enterpriseVisibility', 'Enterprise Visibility (Public)')}</span>
                        </label>
                    </div>

                    {/* AI Intelligence Endpoint Configuration */}
                    <div className="df-ai-section">
                        <div className="df-ai-header">
                            <Settings2 size={16} />
                            <span>{t('dashboardsPage.form.aiConfig', 'AI Intelligence Endpoint Configuration')}</span>
                        </div>

                        <div className="df-ai-fields">
                            <div className="df-ai-row">
                                <div className="df-field">
                                    <label className="df-label">
                                        {t('dashboardsPage.form.queryGenerator', 'Query Generator (Path)')}
                                    </label>
                                    <input
                                        type="text"
                                        className="df-input"
                                        value={formData.generateQueryUrl}
                                        onChange={(e) => handleChange('generateQueryUrl', e.target.value)}
                                        placeholder="https://workflow.engine/..."
                                    />
                                </div>
                                <div className="df-field">
                                    <label className="df-label">
                                        {t('dashboardsPage.form.executionEngine', 'Execution Engine (API)')}
                                    </label>
                                    <input
                                        type="text"
                                        className="df-input"
                                        value={formData.executeQueryUrl}
                                        onChange={(e) => handleChange('executeQueryUrl', e.target.value)}
                                        placeholder="https://gateway.api/..."
                                    />
                                </div>
                            </div>
                            <div className="df-field" style={{ maxWidth: '50%' }}>
                                <label className="df-label">
                                    {t('dashboardsPage.form.autoSync', 'Auto-Sync Frequency (Mins)')}
                                </label>
                                <input
                                    type="text"
                                    className="df-input"
                                    value={formData.refreshInterval}
                                    onChange={(e) => handleChange('refreshInterval', e.target.value)}
                                    placeholder={t('dashboardsPage.form.realtime', 'Real-time (Default)')}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="df-actions">
                        <button
                            type="button"
                            className="df-cancel-btn"
                            onClick={onClose}
                            disabled={loading}
                        >
                            {t('dashboardsPage.form.backToCockpit', 'Back to Cockpit')}
                        </button>
                        <button
                            type="submit"
                            className="df-submit-btn"
                            disabled={loading}
                        >
                            {loading
                                ? t('dashboardsPage.form.deploying', 'Deploying...')
                                : t('dashboardsPage.form.deploy', 'Deploy Intel Layer')
                            }
                            {!loading && <Sparkles size={16} />}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DashboardForm;
