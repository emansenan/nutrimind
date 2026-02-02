/**
 * Email Service
 * 
 * Handles sending transactional emails with templates.
 * Supports SendGrid, AWS SES, or SMTP.
 * 
 * @module sdk/services/emailService
 */

// Configure your email provider (SendGrid example)
const sgMail = process.env.EMAIL_PROVIDER === 'sendgrid' ? require('@sendgrid/mail') : null;

if (sgMail && process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

/**
 * Send email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML content
 * @param {string} options.text - Plain text content
 * @param {string} options.from - Sender email (optional)
 * @returns {Promise<Object>} { messageId, success }
 */
async function sendEmail({ to, subject, html, text, from }) {
    try {
        const fromEmail = from || process.env.EMAIL_FROM || 'noreply@example.com';

        if (process.env.EMAIL_PROVIDER === 'sendgrid' && sgMail) {
            const msg = {
                to,
                from: fromEmail,
                subject,
                text,
                html
            };

            const result = await sgMail.send(msg);
            return {
                messageId: result[0].headers['x-message-id'],
                success: true
            };
        }

        // Fallback: log to console in development
        if (process.env.NODE_ENV === '

development') {
        console.log('[Email] Would send:', { to, subject, from: fromEmail });
        return { messageId: 'dev-' + Date.now(), success: true };
    }

        throw new Error('Email provider not configured');
} catch (error) {
    console.error('[Email Service] Error:', error);
    throw error;
}
}

/**
 * Send invitation email
 * @param {string} email - Recipient email
 * @param {Object} organization - Organization object
 * @param {Object} inviter - Inviter user object
 * @param {string} token - Invitation token
 * @returns {Promise<Object>} Send result
 */
async function sendInvitation(email, organization, inviter, token) {
    const inviteUrl = `${process.env.APP_URL}/invite/${token}`;

    const html = `
        <h2>You've been invited to join ${organization.name}</h2>
        <p>${inviter.name} (${inviter.email}) has invited you to join their organization on MicroMind SAAS.</p>
        <p>
            <a href="${inviteUrl}" style="display:inline-block;padding:12px 24px;background:#d4af37;color:#000;text-decoration:none;border-radius:4px;">
                Accept Invitation
            </a>
        </p>
        <p>This invitation will expire in 7 days.</p>
    `;

    const text = `You've been invited to join ${organization.name} by ${inviter.name}. Visit: ${inviteUrl}`;

    return sendEmail({
        to: email,
        subject: `Invitation to join ${organization.name}`,
        html,
        text
    });
}

/**
 * Send welcome email
 * @param {string} email - User email
 * @param {Object} user - User object
 * @param {Object} organization - Organization object
 * @returns {Promise<Object>} Send result
 */
async function sendWelcome(email, user, organization) {
    const dashboardUrl = `${process.env.APP_URL}/dashboard`;

    const html = `
        <h2>Welcome to ${organization.name}!</h2>
        <p>Hi ${user.name},</p>
        <p>Your account has been successfully created. You can now access your dashboard and start using MicroMind SAAS.</p>
        <p>
            <a href="${dashboardUrl}" style="display:inline-block;padding:12px 24px;background:#d4af37;color:#000;text-decoration:none;border-radius:4px;">
                Go to Dashboard
            </a>
        </p>
    `;

    const text = `Welcome to ${organization.name}! Visit your dashboard: ${dashboardUrl}`;

    return sendEmail({
        to: email,
        subject: `Welcome to ${organization.name}`,
        html,
        text
    });
}

/**
 * Send password reset email
 * @param {string} email - User email
 * @param {string} token - Reset token
 * @param {Date} expiresAt - Token expiration
 * @returns {Promise<Object>} Send result
 */
async function sendPasswordReset(email, token, expiresAt) {
    const resetUrl = `${process.env.APP_URL}/reset-password/${token}`;

    const html = `
        <h2>Password Reset Request</h2>
        <p>You requested to reset your password. Click the button below to proceed:</p>
        <p>
            <a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#d4af37;color:#000;text-decoration:none;border-radius:4px;">
                Reset Password
            </a>
        </p>
        <p>This link will expire at ${new Date(expiresAt).toLocaleString()}.</p>
        <p>If you didn't request this, please ignore this email.</p>
    `;

    const text = `Reset your password: ${resetUrl}. Link expires at ${new Date(expiresAt).toLocaleString()}`;

    return sendEmail({
        to: email,
        subject: 'Password Reset Request',
        html,
        text
    });
}

/**
 * Send notification email
 * @param {string} email - Recipient email
 * @param {string} subject - Email subject
 * @param {string} content - Email content
 * @param {string} type - Notification type ('info', 'warning', 'success')
 * @returns {Promise<Object>} Send result
 */
async function sendNotification(email, subject, content, type = 'info') {
    const colors = {
        info: '#3b82f6',
        warning: '#f59e0b',
        success: '#10b981'
    };

    const html = `
        <div style="border-left:4px solid ${colors[type]};padding-left:16px;">
            <h3>${subject}</h3>
            <p>${content}</p>
        </div>
    `;

    return sendEmail({
        to: email,
        subject,
        html,
        text: content
    });
}

module.exports = {
    sendEmail,
    sendInvitation,
    sendWelcome,
    sendPasswordReset,
    sendNotification
};
