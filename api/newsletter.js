const { sendFormEmails, escapeHtml, readJsonBody, setCorsHeaders } = require('./_lib/mailer');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async function handler(req, res) {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return res.status(400).json({ success: false, error: 'Invalid request body' });
  }

  const email = String(body.email || '').trim();

  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
  }

  const notification = {
    replyTo: email,
    subject: 'New Newsletter Subscription — Sibeve Group',
    text: `New newsletter subscriber: ${email}`,
    html: `<p>New newsletter subscriber: <strong>${escapeHtml(email)}</strong></p>`,
  };

  const autoReply = {
    to: email,
    subject: "You're subscribed — Sibeve Group",
    text: [
      "Thanks for subscribing to the Sibeve Group newsletter!",
      "You'll now receive occasional updates on our latest work, promotions, and branding inspiration.",
      '',
      '— Sibeve Group, Promotional & Branding Solutions',
    ].join('\n'),
    html: `
      <p>Thanks for subscribing to the <strong>Sibeve Group</strong> newsletter!</p>
      <p>You'll now receive occasional updates on our latest work, promotions, and branding inspiration.</p>
      <p>— <strong>Sibeve Group</strong><br>Promotional &amp; Branding Solutions</p>
    `,
  };

  try {
    const result = await sendFormEmails({ notification, autoReply });
    return res.status(200).json({ success: true, ...result });
  } catch (err) {
    console.error('newsletter.js send error:', err);
    return res.status(500).json({ success: false, error: 'Failed to subscribe. Please try again shortly.' });
  }
};