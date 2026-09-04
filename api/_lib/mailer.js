const nodemailer = require('nodemailer');

let cachedTransporter = null;

/**
 * Builds (and caches) a Nodemailer transporter from environment variables.
 * Required env vars (set these in Vercel → Project → Settings → Environment Variables):
 *   SMTP_HOST      e.g. smtp.gmail.com
 *   SMTP_PORT      465 (SSL, recommended) or 587 (STARTTLS)
 *   SMTP_SECURE    "true" for port 465, "false" for port 587
 *   SMTP_USER      the mailbox that sends the mail, e.g. sibevep@gmail.com
 *   SMTP_PASS      a 16-character Gmail "App Password"
 *   MAIL_FROM      optional, e.g. "Sibeve Group <sibevep@gmail.com>" (defaults to SMTP_USER)
 *   CONTACT_RECEIVER  the inbox that should receive form notifications
 */
function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      'Email is not configured. Missing one of SMTP_HOST, SMTP_USER, SMTP_PASS environment variables.'
    );
  }

  const port = Number(SMTP_PORT) || 465;
  const secure = SMTP_SECURE === 'true' || (SMTP_SECURE === undefined && port === 465);

  cachedTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    authMethod: 'LOGIN',
    // Connection pooling: reuse the SMTP connection across sends instead of
    // opening a brand-new TLS connection for every single email.
    pool: true,
    maxConnections: 2,
    maxMessages: 50,
    rateDelta: 1000,
    rateLimit: 10,
    connectionTimeout: 30 * 1000,
    greetingTimeout: 20 * 1000,
    socketTimeout: 60 * 1000,
    tls: { minVersion: 'TLSv1.2' },
  });

  return cachedTransporter;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/** Sends one email with up to 3 retry attempts on transient failures. */
async function sendMailSafe(transporter, opts, label) {
  const attempts = 3;
  for (let i = 1; i <= attempts; i++) {
    try {
      const info = await transporter.sendMail(opts);
      console.log(`[${label}] sent -> ${opts.to} (${info.messageId || 'no id'})`);
      return true;
    } catch (err) {
      const isAuth = err.code === 'EAUTH' || /Invalid login/i.test(err.message || '');
      console.error(`[${label}] attempt ${i}/${attempts} failed: ${err.code || 'ERR'} ${err.message}`);
      if (isAuth) return false; // no point retrying bad credentials
      if (i < attempts) await new Promise((r) => setTimeout(r, 800 * i));
    }
  }
  return false;
}

/**
 * Sends the internal notification email (to the business) and the
 * auto-reply email (to the client) for a form submission.
 */
async function sendFormEmails({ notification, autoReply }) {
  const transporter = getTransporter();
  const fromAddress = process.env.MAIL_FROM || process.env.SMTP_USER;
  const receiver = process.env.CONTACT_RECEIVER || process.env.SMTP_USER;

  const notificationSent = await sendMailSafe(
    transporter,
    {
      from: fromAddress,
      to: receiver,
      replyTo: notification.replyTo,
      subject: notification.subject,
      text: notification.text,
      html: notification.html,
    },
    'notification'
  );

  if (!notificationSent) {
    throw new Error('Failed to send the notification email after retries.');
  }

  const autoReplySent = await sendMailSafe(
    transporter,
    {
      from: fromAddress,
      to: autoReply.to,
      subject: autoReply.subject,
      text: autoReply.text,
      html: autoReply.html,
    },
    'auto-reply'
  );

  return {
    notificationSent,
    autoReplySent,
    autoReplyError: autoReplySent ? null : 'Auto-reply failed after retries.',
  };
}

/** Reads and normalizes the JSON body for both Node & Edge-style req objects. */
async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string' && req.body.length) {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return await new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

function setCorsHeaders(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = { getTransporter, sendFormEmails, escapeHtml, readJsonBody, setCorsHeaders };