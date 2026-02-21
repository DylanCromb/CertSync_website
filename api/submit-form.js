// ── FORM SUBMISSION HANDLER ──────────────────────────────────────────────────
// Vercel Serverless Function that receives form submissions and sends email
// via Resend (https://resend.com).
//
// RECIPIENT CONFIG — update these to change where form submissions go:
const RECIPIENTS = {
  'custom-plan': ['dev@kaylos.com.au'],
  'contact': ['support@certsync.com.au'],
  // To add CC: just append more emails to the array above
};

const FROM_ADDRESS = 'CertSync <noreply@certsync.com.au>';
// ─────────────────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const body = req.body;

    // Honeypot check
    if (body['bot-field']) {
      // Silently accept but don't send email
      return res.status(200).json({ success: true });
    }

    const formName = body['form-name'];
    const recipients = RECIPIENTS[formName];

    if (!recipients) {
      return res.status(400).json({ error: 'Unknown form' });
    }

    // Build email content based on form type
    let subject, htmlBody;

    if (formName === 'custom-plan') {
      subject = `Custom Plan Request from ${body.organisation || 'Unknown'}`;
      htmlBody = buildCustomPlanEmail(body);
    } else if (formName === 'contact') {
      subject = `Contact: ${body.subject || 'General enquiry'} from ${body.name || 'Unknown'}`;
      htmlBody = buildContactEmail(body);
    } else {
      subject = `Form submission: ${formName}`;
      htmlBody = buildGenericEmail(body);
    }

    // Send via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: recipients,
        subject: subject,
        html: htmlBody,
        reply_to: body.email || undefined,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Resend API error:', response.status, errorData);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Form submission error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// ── Email templates ─────────────────────────────────────────────────────────

function buildCustomPlanEmail(data) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #2B7FE0 0%, #764ba2 100%); padding: 24px 32px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #fff; margin: 0; font-size: 20px;">Custom Plan Request</h1>
      </div>
      <div style="padding: 24px 32px; background: #f9fafb; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          ${row('Organisation', data.organisation)}
          ${row('Contact Name', data.contact_name)}
          ${row('Email', data.email)}
          ${row('Phone', data.phone)}
          ${row('Employees', data.employees)}
          ${row('Notes', data.notes || '—')}
        </table>
        <p style="color: #6b7280; font-size: 13px; margin-top: 24px;">Submitted from certsync.com.au/custom-plan</p>
      </div>
    </div>`;
}

function buildContactEmail(data) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #2B7FE0 0%, #764ba2 100%); padding: 24px 32px; border-radius: 8px 8px 0 0;">
        <h1 style="color: #fff; margin: 0; font-size: 20px;">New Contact Message</h1>
      </div>
      <div style="padding: 24px 32px; background: #f9fafb; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          ${row('Name', data.name)}
          ${row('Email', data.email)}
          ${row('Subject', data.subject)}
          ${row('Message', data.message)}
        </table>
        <p style="color: #6b7280; font-size: 13px; margin-top: 24px;">Submitted from certsync.com.au/contact</p>
      </div>
    </div>`;
}

function buildGenericEmail(data) {
  const rows = Object.entries(data)
    .filter(([key]) => key !== 'bot-field' && key !== 'form-name')
    .map(([key, val]) => row(key, val))
    .join('');

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="padding: 24px 32px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="margin-top: 0;">Form Submission: ${data['form-name'] || 'unknown'}</h2>
        <table style="width: 100%; border-collapse: collapse;">${rows}</table>
      </div>
    </div>`;
}

function row(label, value) {
  return `
    <tr>
      <td style="padding: 8px 0; color: #6b7280; font-size: 14px; vertical-align: top; width: 140px; font-weight: 600;">${label}</td>
      <td style="padding: 8px 0; color: #111827; font-size: 14px; vertical-align: top;">${escapeHtml(String(value || ''))}</td>
    </tr>`;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
