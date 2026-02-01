import { MMCard } from '@sdk';

function CoPilotsPage() {
    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Co-Pilots
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                AI-powered assistants to help you work smarter.
            </p>

            <MMCard>
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        🤖 Co-Pilots Coming Soon
                    </h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Phase 3 will integrate AI Chat components here.
                    </p>
                </div>
            </MMCard>
        </div>
    );
}

export default CoPilotsPage;
