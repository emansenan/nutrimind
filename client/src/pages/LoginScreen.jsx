import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { User, Lock, ArrowRight } from 'lucide-react';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await authService.login(username, password);
            const user = authService.getCurrentUser();

            if (user.role === 'MANAGER') {
                navigate('/');
            } else {
                navigate('/collector/tasks');
            }
        } catch {
            setError('Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--bg-page)',
            padding: '2rem'
        }}>
            {/* Login Card */}
            <div style={{
                width: '100%',
                maxWidth: '440px',
                backgroundColor: 'var(--bg-surface)',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                {/* Header */}
                <div style={{
                    padding: '2.5rem 2rem 2rem 2rem',
                    textAlign: 'center',
                    borderBottom: '1px solid var(--border)'
                }}>
                    {/* Logo */}
                    <div style={{
                        width: '64px',
                        height: '64px',
                        margin: '0 auto 1.5rem auto',
                        background: 'linear-gradient(135deg, #E0AA3E 0%, #F5C451 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '28px',
                        fontWeight: '700',
                        color: '#000000',
                        letterSpacing: '1px'
                    }}>
                        YCC
                    </div>

                    {/* Title */}
                    <h1 style={{
                        margin: '0 0 0.5rem 0',
                        fontSize: '1.75rem',
                        fontWeight: '700',
                        color: 'var(--text-primary)'
                    }}>
                        Yasra
                    </h1>
                    <p style={{
                        margin: 0,
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#E0AA3E',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        Credit Control
                    </p>
                </div>

                {/* Form Section */}
                <div style={{
                    padding: '2rem'
                }}>
                    <h2 style={{
                        margin: '0 0 1.5rem 0',
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: 'var(--text-primary)'
                    }}>
                        Welcome Back
                    </h2>

                    <form onSubmit={handleLogin}>
                        {/* Username Field */}
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                color: 'var(--text-muted)'
                            }}>
                                Username
                            </label>
                            <div style={{ position: 'relative' }}>
                                <User
                                    size={18}
                                    color="var(--text-muted)"
                                    style={{
                                        position: 'absolute',
                                        left: '14px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        pointerEvents: 'none'
                                    }}
                                />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter your username"
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px 12px 44px',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border)',
                                        backgroundColor: 'var(--bg-input)',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        transition: 'border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#E0AA3E'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                color: 'var(--text-muted)'
                            }}>
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Lock
                                    size={18}
                                    color="var(--text-muted)"
                                    style={{
                                        position: 'absolute',
                                        left: '14px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        pointerEvents: 'none'
                                    }}
                                />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    style={{
                                        width: '100%',
                                        padding: '12px 14px 12px 44px',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border)',
                                        backgroundColor: 'var(--bg-input)',
                                        color: 'var(--text-primary)',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        transition: 'border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#E0AA3E'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                                    required
                                />
                            </div>
                        </div>

                        {/* Forgot Password Link */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginBottom: '1.5rem'
                        }}>
                            <a
                                href="#"
                                style={{
                                    color: '#E0AA3E',
                                    fontSize: '0.85rem',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    transition: 'color 150ms'
                                }}
                                onMouseEnter={(e) => e.target.style.color = '#F5C451'}
                                onMouseLeave={(e) => e.target.style.color = '#E0AA3E'}
                            >
                                Forgot username or password?
                            </a>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div style={{
                                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                                border: '1px solid rgba(220, 38, 38, 0.3)',
                                color: '#fca5a5',
                                padding: '12px 14px',
                                borderRadius: '8px',
                                marginBottom: '1.5rem',
                                fontSize: '0.9rem',
                                fontWeight: '500'
                            }}>
                                {error}
                            </div>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '14px 24px',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: loading ? '#ccaa44' : '#E0AA3E',
                                color: '#000000',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)',
                                opacity: loading ? 0.7 : 1
                            }}
                            onMouseEnter={(e) => {
                                if (!loading) e.target.style.backgroundColor = '#F5C451';
                            }}
                            onMouseLeave={(e) => {
                                if (!loading) e.target.style.backgroundColor = '#E0AA3E';
                            }}
                        >
                            {loading ? (
                                <>
                                    <div className="spinner" style={{
                                        width: '16px',
                                        height: '16px',
                                        border: '2px solid rgba(0, 0, 0, 0.3)',
                                        borderTopColor: '#000000',
                                        borderRadius: '50%'
                                    }}></div>
                                    Logging in...
                                </>
                            ) : (
                                <>
                                    Log In
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <div style={{
                    padding: '1.5rem 2rem',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    borderTop: '1px solid var(--border)'
                }}>
                    <p style={{ margin: '0 0 0.25rem 0' }}>Version 1.0.0</p>
                    <p style={{ margin: 0 }}>Contact IT Support for access issues.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
