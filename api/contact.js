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

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const phone = String(body.phone || '').trim();
  const subject = String(body.subject || '').trim();
  const message = String(body.message || '').trim();

  if (String(body.company || '').trim()) {
    return res.status(200).json({ success: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
  }

  const notification = {
    replyTo: email,
    subject: `New Contact Form Message${subject ? ` — ${subject}` : ''} — Sibeve Group`,
    text: [
      'New message from the website contact form:',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || 'N/A'}`,
      `Subject: ${subject || 'N/A'}`,
      '',
      'Message:',
      message,
    ].join('\n'),
    html: `
      <h2>New Contact Form Message</h2>
      <table cellpadding="6" style="border-collapse:collapse;">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${escapeHtml(phone || 'N/A')}</td></tr>
        <tr><td><strong>Subject</strong></td><td>${escapeHtml(subject || 'N/A')}</td></tr>
      </table>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    `,
  };

  const autoReply = {
    to: email,
    subject: 'We received your message — Sibeve Group',
    text: [
      `Hi ${name},`,
      '',
      'Thank you for contacting Sibeve Group! We have received your message and will get back to you within 24 hours.',
      '',
      'Here is a copy of what you sent us:',
      `Subject: ${subject || 'N/A'}`,
      `Message: ${message}`,
      '',
      'Need immediate assistance? Call us at +268 7654 9020.',
      '',
      '— Sibeve Group, Promotional & Branding Solutions',
      'Eswatini\'s Premier Branding Partner',
    ].join('\n'),
    html: `
      <p>Hi ${escapeHtml(name)},</p>
      <p>Thank you for contacting <strong>Sibeve Group</strong>! We have received your message and will get back to you within 24 hours.</p>
      <p><strong>Here is a copy of what you sent us:</strong></p>
      <table cellpadding="6" style="border-collapse:collapse;">
        <tr><td><strong>Subject</strong></td><td>${escapeHtml(subject || 'N/A')}</td></tr>
        <tr><td><strong>Message</strong></td><td>${escapeHtml(message).replace(/\n/g, '<br>')}</td></tr>
      </table>
      <p>Need immediate assistance? Call us at <a href="tel:+26876549020">+268 7654 9020</a>.</p>
      <p>— <strong>Sibeve Group</strong><br>Promotional &amp; Branding Solutions<br>Eswatini's Premier Branding Partner</p>
    `,
  };

  try {
    const result = await sendFormEmails({ notification, autoReply });
    return res.status(200).json({ success: true, ...result });
  } catch (err) {
    console.error('contact.js send error:', err);
    return res.status(500).json({ success: false, error: 'Failed to send your message. Please try again shortly.' });
  }
};