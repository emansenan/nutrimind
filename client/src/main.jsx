import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Placeholder App component - will be replaced in Phase 2
function App() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                    MicroMind Base Template
                </h1>
                <p style={{ fontSize: '1.25rem', opacity: 0.8 }}>
                    Phase 1: Foundation Setup Complete ✅
                </p>
                <p style={{ fontSize: '1rem', marginTop: '1rem', opacity: 0.6 }}>
                    V4 SDK Initialized • Theme Configured • Ready for Phase 2
                </p>
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
