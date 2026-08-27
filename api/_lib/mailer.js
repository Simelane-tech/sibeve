const nodemailer = require('nodemailer');

let cachedTransporter = null;

/**
 * Builds (and caches) a Nodemailer transporter from environment variables.
 * Required env vars (set these in Vercel → Project → Settings → Environment Variables):
 *   SMTP_HOST      e.g. smtp.gmail.com
 *   SMTP_PORT      e.g. 587 (STARTTLS) or 465 (SSL)
 *   SMTP_SECURE    "true" if using port 465, otherwise "false"/omit
 *   SMTP_USER      the mailbox that sends the mail, e.g. sibevep@gmail.com
 *   SMTP_PASS      a 16-character Gmail "App Password" (NOT the normal account password)
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

  cachedTransporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: SMTP_SECURE === 'true' || Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
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

/**
 * Sends the internal notification email (to the business) and the
 * auto-reply email (to the client) for a form submission.
 */
async function sendFormEmails({ notification, autoReply }) {
  const transporter = getTransporter();
  const fromAddress = process.env.MAIL_FROM || process.env.SMTP_USER;
  const receiver = process.env.CONTACT_RECEIVER || process.env.SMTP_USER;

  const results = await Promise.allSettled([
    transporter.sendMail({
      from: fromAddress,
      to: receiver,
      replyTo: notification.replyTo,
      subject: notification.subject,
      text: notification.text,
      html: notification.html,
    }),
    transporter.sendMail({
      from: fromAddress,
      to: autoReply.to,
      subject: autoReply.subject,
      text: autoReply.text,
      html: autoReply.html,
    }),
  ]);

  const [notificationResult, autoReplyResult] = results;

  if (notificationResult.status === 'rejected') {
    throw notificationResult.reason;
  }

  return {
    notificationSent: notificationResult.status === 'fulfilled',
    autoReplySent: autoReplyResult.status === 'fulfilled',
    autoReplyError:
      autoReplyResult.status === 'rejected' ? String(autoReplyResult.reason?.message || autoReplyResult.reason) : null,
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