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
  const service = String(body.service || '').trim();
  const description = String(body.description || '').trim();

  if (String(body.company || '').trim()) {
    return res.status(200).json({ success: true });
  }

  if (!name || !email || !service || !description) {
    return res
      .status(400)
      .json({ success: false, error: 'Name, email, service, and description are required.' });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
  }

  const notification = {
    replyTo: email,
    subject: `New Quote Request — ${service} — Sibeve Group`,
    text: [
      'New quote request from the website:',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || 'N/A'}`,
      `Service Needed: ${service}`,
      '',
      'Project Description:',
      description,
    ].join('\n'),
    html: `
      <h2>New Quote Request</h2>
      <table cellpadding="6" style="border-collapse:collapse;">
        <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${escapeHtml(phone || 'N/A')}</td></tr>
        <tr><td><strong>Service Needed</strong></td><td>${escapeHtml(service)}</td></tr>
      </table>
      <p><strong>Project Description:</strong></p>
      <p>${escapeHtml(description).replace(/\n/g, '<br>')}</p>
    `,
  };

  const autoReply = {
    to: email,
    subject: 'We received your quote request — Sibeve Group',
    text: [
      `Hi ${name},`,
      '',
      'Thank you for requesting a quote from Sibeve Group!',
      'We have received your request and a member of our team will get back to you within 24 hours with a customized quote.',
      '',
      'Here is a copy of your request:',
      `Service Needed: ${service}`,
      `Project Description: ${description}`,
      '',
      'What happens next?',
      '1. Our team will review your requirements',
      '2. We will prepare a customized quote for you',
      '3. You will receive your quote within 24 hours',
      '',
      'Need immediate assistance? Call us at +268 7654 9020.',
      '',
      '— Sibeve Group, Promotional & Branding Solutions',
      'Eswatini\'s Premier Branding Partner',
    ].join('\n'),
    html: `
      <p>Hi ${escapeHtml(name)},</p>
      <p>Thank you for requesting a quote from <strong>Sibeve Group</strong>! We have received your request and a member of our team will get back to you within 24 hours with a customized quote.</p>
      <p><strong>Here is a copy of your request:</strong></p>
      <table cellpadding="6" style="border-collapse:collapse;">
        <tr><td><strong>Service Needed</strong></td><td>${escapeHtml(service)}</td></tr>
        <tr><td><strong>Project Description</strong></td><td>${escapeHtml(description).replace(/\n/g, '<br>')}</td></tr>
      </table>
      <p><strong>What happens next?</strong></p>
      <ol>
        <li>Our team will review your requirements</li>
        <li>We will prepare a customized quote for you</li>
        <li>You will receive your quote within 24 hours</li>
      </ol>
      <p>Need immediate assistance? Call us at <a href="tel:+26876549020">+268 7654 9020</a>.</p>
      <p>— <strong>Sibeve Group</strong><br>Promotional &amp; Branding Solutions<br>Eswatini's Premier Branding Partner</p>
    `,
  };

  try {
    const result = await sendFormEmails({ notification, autoReply });
    return res.status(200).json({ success: true, ...result });
  } catch (err) {
    console.error('quote.js send error:', err);
    return res
      .status(500)
      .json({ success: false, error: 'Failed to send your request. Please try again shortly.' });
  }
};