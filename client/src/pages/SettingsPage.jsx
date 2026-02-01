import { useState, useEffect } from 'react';
import { MMCard, MMButton } from '@sdk';
import { User, Mail, Globe, Moon, Sun, Bell, Shield, Key } from 'lucide-react';

function SettingsPage() {
    const [settings, setSettings] = useState({
        displayName: '',
        email: '',
        language: 'en',
        theme: 'dark',
        notifications: true,
        twoFactor: false
    });

    useEffect(() => {
        // Load user settings
        const user = localStorage.getItem('user');
        const theme = localStorage.getItem('theme') || 'dark';
        const language = localStorage.getItem('language') || 'en';

        if (user) {
            const userData = JSON.parse(user);
            setSettings(prev => ({
                ...prev,
                displayName: userData.displayName || userData.name || '',
                email: userData.email || '',
                theme,
                language
            }));
        }
    }, []);

    const handleSave = () => {
        // Save settings logic here
        localStorage.setItem('theme', settings.theme);
        localStorage.setItem('language', settings.language);

        // Apply theme
        document.documentElement.setAttribute('data-theme', settings.theme);

        alert('Settings saved successfully!');
    };

    const handleThemeToggle = () => {
        const newTheme = settings.theme === 'dark' ? 'light' : 'dark';
        setSettings(prev => ({ ...prev, theme: newTheme }));
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '900px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Settings
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Manage your account settings and preferences
            </p>

            {/* Profile Section */}
            <MMCard style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={20} />
                    Profile Information
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                            Display Name
                        </label>
                        <input
                            type="text"
                            value={settings.displayName}
                            onChange={(e) => setSettings(prev => ({ ...prev, displayName: e.target.value }))}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid var(--border)',
                                backgroundColor: 'var(--bg-surface)',
                                color: 'var(--text-primary)',
                                fontSize: '0.9375rem'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                            <Mail size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                            Email
                        </label>
                        <input
                            type="email"
                            value={settings.email}
                            onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid var(--border)',
                                backgroundColor: 'var(--bg-surface)',
                                color: 'var(--text-primary)',
                                fontSize: '0.9375rem'
                            }}
                        />
                    </div>
                </div>
            </MMCard>

            {/* Appearance Section */}
            <MMCard style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {settings.theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                    Appearance
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                                Theme
                            </div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                Choose your preferred color scheme
                            </div>
                        </div>
                        <button
                            onClick={handleThemeToggle}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                border: '1px solid var(--primary)',
                                backgroundColor: 'transparent',
                                color: 'var(--primary)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontWeight: 600
                            }}
                        >
                            {settings.theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                            {settings.theme === 'dark' ? 'Light' : 'Dark'}
                        </button>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                            <Globe size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                            Language
                        </label>
                        <select
                            value={settings.language}
                            onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid var(--border)',
                                backgroundColor: 'var(--bg-surface)',
                                color: 'var(--text-primary)',
                                fontSize: '0.9375rem'
                            }}
                        >
                            <option value="en">English</option>
                            <option value="ar">العربية (Arabic)</option>
                            <option value="fr">Français (French)</option>
                            <option value="de">Deutsch (German)</option>
                            <option value="sw">Kiswahili (Swahili)</option>
                        </select>
                    </div>
                </div>
            </MMCard>

            {/* Notifications Section */}
            <MMCard style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Bell size={20} />
                    Notifications
                </h2>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                            Push Notifications
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            Receive notifications about important updates
                        </div>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
                        <input
                            type="checkbox"
                            checked={settings.notifications}
                            onChange={(e) => setSettings(prev => ({ ...prev, notifications: e.target.checked }))}
                            style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span style={{
                            position: 'absolute',
                            cursor: 'pointer',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: settings.notifications ? 'var(--primary)' : 'var(--border)',
                            transition: '0.4s',
                            borderRadius: '24px'
                        }}>
                            <span style={{
                                position: 'absolute',
                                content: '',
                                height: '18px',
                                width: '18px',
                                left: settings.notifications ? '26px' : '3px',
                                bottom: '3px',
                                backgroundColor: 'white',
                                transition: '0.4s',
                                borderRadius: '50%'
                            }} />
                        </span>
                    </label>
                </div>
            </MMCard>

            {/* Security Section */}
            <MMCard style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Shield size={20} />
                    Security
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                                Two-Factor Authentication
                            </div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                Add an extra layer of security to your account
                            </div>
                        </div>
                        <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
                            <input
                                type="checkbox"
                                checked={settings.twoFactor}
                                onChange={(e) => setSettings(prev => ({ ...prev, twoFactor: e.target.checked }))}
                                style={{ opacity: 0, width: 0, height: 0 }}
                            />
                            <span style={{
                                position: 'absolute',
                                cursor: 'pointer',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: settings.twoFactor ? 'var(--primary)' : 'var(--border)',
                                transition: '0.4s',
                                borderRadius: '24px'
                            }}>
                                <span style={{
                                    position: 'absolute',
                                    content: '',
                                    height: '18px',
                                    width: '18px',
                                    left: settings.twoFactor ? '26px' : '3px',
                                    bottom: '3px',
                                    backgroundColor: 'white',
                                    transition: '0.4s',
                                    borderRadius: '50%'
                                }} />
                            </span>
                        </label>
                    </div>

                    <button
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            border: '1px solid var(--border)',
                            backgroundColor: 'var(--bg-surface)',
                            color: 'var(--text-primary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontWeight: 600,
                            width: 'fit-content'
                        }}
                    >
                        <Key size={16} />
                        Change Password
                    </button>
                </div>
            </MMCard>

            {/* Save Button */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <MMButton variant="secondary">
                    Cancel
                </MMButton>
                <MMButton onClick={handleSave}>
                    Save Changes
                </MMButton>
            </div>
        </div>
    );
}

export default SettingsPage;
