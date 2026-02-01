import React, { useState, useCallback } from 'react';
import { Upload, XCircle, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import './MMFileImport.css';

/**
 * MMFileImport - Generic File Upload Wizard
 * 
 * @param {Array} allowedExtensions - ['xlsx', 'csv']
 * @param {function} onUpload - (file) => Promise<void>
 * @param {string} title - Card Title
 * @param {string} subtitle - Card Subtitle
 */
const MMFileImport = ({
    allowedExtensions = ['xlsx', 'xls', 'csv'],
    onUpload,
    title = 'Upload File',
    subtitle = 'Drag and drop your file here',
    className = ''
}) => {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, uploading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        validateAndSetFile(droppedFile);
    };

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        validateAndSetFile(selectedFile);
    };

    const validateAndSetFile = (fileToCheck) => {
        if (!fileToCheck) return;

        const ext = fileToCheck.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(ext)) {
            setStatus('error');
            setErrorMessage(`Invalid file type. Allowed: ${allowedExtensions.join(', ')}`);
            return;
        }

        setFile(fileToCheck);
        setStatus('idle');
        setErrorMessage('');
    };

    const handleUpload = async () => {
        if (!file || !onUpload) return;

        try {
            setStatus('uploading');
            await onUpload(file);
            setStatus('success');
            // Reset after success
            setTimeout(() => {
                setFile(null);
                setStatus('idle');
            }, 3000);
        } catch (err) {
            setStatus('error');
            setErrorMessage(err.message || 'Upload failed');
        }
    };

    return (
        <div className={`mm-file-import ${className}`}>
            <div className="mm-import-header">
                <h3>{title}</h3>
                <p>{subtitle}</p>
            </div>

            {/* Dropzone */}
            <div
                className={`mm-import-dropzone ${isDragging ? 'dragging' : ''} ${file ? 'has-file' : ''} ${status}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    id="mm-file-upload"
                    className="mm-hidden-input"
                    accept={allowedExtensions.map(e => `.${e}`).join(',')}
                    onChange={handleFileSelect}
                    disabled={status === 'uploading'}
                />

                {!file ? (
                    <label htmlFor="mm-file-upload" className="mm-dropzone-label">
                        <Upload size={40} className="mm-upload-icon" />
                        <span>Browse or Drag File</span>
                    </label>
                ) : (
                    <div className="mm-file-preview">
                        <FileText size={32} className="mm-file-icon" />
                        <div className="mm-file-info">
                            <span className="mm-file-name">{file.name}</span>
                            <span className="mm-file-size">{(file.size / 1024).toFixed(1)} KB</span>
                        </div>
                        {status === 'idle' && (
                            <button
                                className="mm-remove-file"
                                onClick={() => setFile(null)}
                            >
                                <XCircle size={20} />
                            </button>
                        )}
                    </div>
                )}

                {/* Status Overlays */}
                {status === 'uploading' && (
                    <div className="mm-import-overlay">
                        <div className="mm-spinner"></div>
                        <span>Uploading...</span>
                    </div>
                )}

                {status === 'success' && (
                    <div className="mm-import-overlay success">
                        <CheckCircle size={32} />
                        <span>Upload Complete!</span>
                    </div>
                )}
            </div>

            {/* Error Message */}
            {status === 'error' && errorMessage && (
                <div className="mm-import-error">
                    <AlertCircle size={16} />
                    {errorMessage}
                </div>
            )}

            {/* Action Bar */}
            <div className="mm-import-actions">
                <button
                    className="mm-btn-primary"
                    disabled={!file || status === 'uploading' || status === 'success'}
                    onClick={handleUpload}
                >
                    Upload File
                </button>
            </div>
        </div>
    );
};

export default MMFileImport;
