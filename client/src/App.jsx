import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import ManagerLayout from './components/ManagerLayout';
import LoginScreen from './pages/LoginScreen';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const CoPilotsPage = lazy(() => import('./pages/CoPilotsPage'));
const DocumentsLibrary = lazy(() => import('./pages/DocumentsLibrary'));
const DashboardsPage = lazy(() => import('./pages/DashboardsPage'));
const ReportBotPage = lazy(() => import('./pages/ReportBotPage'));
const ReportsPage = lazy(() => import('./pages/ReportsPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));

// Loading fallback
const LoadingFallback = () => (
    <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)'
    }}>
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>Loading...</div>
        </div>
    </div>
);

function App() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginScreen />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<ManagerLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/copilots" element={<CoPilotsPage />} />
                        <Route path="/documents" element={<DocumentsLibrary />} />
                        <Route path "/analytics/dashboards" element={<DashboardsPage />} />
                        <Route path="/report-bot" element={<ReportBotPage />} />
                        <Route path="/reports" element={<ReportsPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                    </Route>
                </Route>

                {/* Fallback redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    );
}

export default App;
