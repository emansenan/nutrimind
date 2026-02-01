import { useEffect, useState } from 'react';
import { MMCard } from '@sdk';
import { TrendingUp, Users, FileText, Activity } from 'lucide-react';

function HomePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const kpis = [
        {
            label: 'Total Users',
            value: '1,234',
            icon: Users,
            trend: '+12%',
            color: 'var(--primary)'
        },
        {
            label: 'Active Sessions',
            value: '89',
            icon: Activity,
            trend: '+5%',
            color: 'var(--success)'
        },
        {
            label: 'Documents',
            value: '456',
            icon: FileText,
            trend: '+23%',
            color: 'var(--info)'
        },
        {
            label: 'System Health',
            value: '98%',
            icon: TrendingUp,
            trend: 'Stable',
            color: 'var(--primary)'
        }
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    Welcome{user ? `, ${user.displayName || user.name}` : ''}
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                    Here's what's happening with your application today.
                </p>
            </div>

            {/* KPI Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                {kpis.map((kpi, index) => {
                    const Icon = kpi.icon;
                    return (
                        <MMCard key={index} className="kpi-card">
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                                        {kpi.label}
                                    </div>
                                    <div style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                                        {kpi.value}
                                    </div>
                                    <div style={{ fontSize: '0.875rem', color: kpi.color }}>
                                        {kpi.trend}
                                    </div>
                                </div>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: `${kpi.color}15`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Icon size={24} style={{ color: kpi.color }} />
                                </div>
                            </div>
                        </MMCard>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <MMCard style={{ marginTop: '2rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                    Quick Actions
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <button className="quick-action-btn">
                        📊 View Dashboards
                    </button>
                    <button className="quick-action-btn">
                        📄 Upload Document
                    </button>
                    <button className="quick-action-btn">
                        🤖 Ask Co-Pilot
                    </button>
                    <button className="quick-action-btn">
                        📈 Generate Report
                    </button>
                </div>
            </MMCard>

            <style>{`
        .kpi-card {
          transition: transform 0.2s ease;
        }
        .kpi-card:hover {
          transform: translateY(-2px);
        }
        .quick-action-btn {
          padding: 1rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          color: var(--text-primary);
          font-size: 0.9375rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .quick-action-btn:hover {
          background: var(--bg-hover);
          border-color: var(--primary);
          transform: translateY(-2px);
        }
      `}</style>
        </div>
    );
}

export default HomePage;
