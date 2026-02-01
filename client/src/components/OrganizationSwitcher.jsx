import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

function OrganizationSwitcher({ currentOrg, organizations, onSwitch }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSwitch = async (orgId) => {
        setIsOpen(false);
        if (onSwitch) {
            await onSwitch(orgId);
        }
    };

    return (
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {currentOrg?.logo && (
                        <img
                            src={currentOrg.logo}
                            alt={currentOrg.name}
                            style={{ width: '24px', height: '24px', borderRadius: '4px' }}
                        />
                    )}
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                            {currentOrg?.name || 'Select Organization'}
                        </div>
                        {currentOrg?.slug && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                {currentOrg.slug}
                            </div>
                        )}
                    </div>
                </div>
                <ChevronsUpDown size={16} color="var(--text-secondary)" />
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={() => setIsOpen(false)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 999
                        }}
                    />

                    {/* Dropdown */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 'calc(100% + 0.5rem)',
                            left: 0,
                            right: 0,
                            backgroundColor: 'var(--bg-surface)',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
                            zIndex: 1000,
                            maxHeight: '300px',
                            overflowY: 'auto'
                        }}
                    >
                        <div style={{ padding: '0.5rem' }}>
                            <div style={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: 'var(--text-secondary)',
                                padding: '0.5rem',
                                textTransform: 'uppercase'
                            }}>
                                Switch Organization
                            </div>

                            {organizations && organizations.map((org) => (
                                <button
                                    key={org.id}
                                    onClick={() => handleSwitch(org.id)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '0.75rem',
                                        borderRadius: '6px',
                                        border: 'none',
                                        backgroundColor: currentOrg?.id === org.id ? 'var(--bg-hover)' : 'transparent',
                                        color: 'var(--text-primary)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        textAlign: 'left'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (currentOrg?.id !== org.id) {
                                            e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (currentOrg?.id !== org.id) {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        {org.logo && (
                                            <img
                                                src={org.logo}
                                                alt={org.name}
                                                style={{ width: '24px', height: '24px', borderRadius: '4px' }}
                                            />
                                        )}
                                        <div>
                                            <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                                                {org.name}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                                {org.slug}
                                            </div>
                                        </div>
                                    </div>
                                    {currentOrg?.id === org.id && (
                                        <Check size={16} color="var(--primary)" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div style={{
                            borderTop: '1px solid var(--border)',
                            padding: '0.5rem'
                        }}>
                            <button
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '6px',
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                    color: 'var(--primary)',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    transition: 'all 0.2s'
                                }}
                                onClick={() => {
                                    setIsOpen(false);
                                    window.location.href = '/onboarding/create-organization';
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                + Create New Organization
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default OrganizationSwitcher;
