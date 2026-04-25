/**
 * netlify/functions/send-report.js
 *
 * A Netlify serverless function that relays a tongue self-check report
 * to a TCM practitioner via Resend. Stateless — nothing is stored.
 *
 * Required environment variables (set in Netlify dashboard → Site settings
 * → Environment variables):
 *
 *   RESEND_API_KEY    — your Resend API key (starts with `re_…`)
 *   FROM_ADDRESS      — verified sender, e.g. `report@yourdomain.com`
 *
 * The function expects a POST body of JSON with:
 *   - userName            (string, required)
 *   - userEmail           (string, required, valid email)
 *   - practitionerEmail   (string, required, valid email)
 *   - userNote            (string, optional — e.g., "main concern: insomnia")
 *   - reportHtml          (string, required — the standalone HTML report)
 *   - photoDataUrl        (string, optional — base64 data URL of the photo)
 *   - subject             (string, optional)
 *
 * Replies with JSON { ok: true } on success or { ok: false, error: '...' }.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

function isValidEmail(s) {
  return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim()) && s.length < 250;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

exports.handler = async (event) => {
  const cors = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type':                 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: cors, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: cors, body: JSON.stringify({ ok: false, error: 'Method not allowed' }) };
  }

  // Validate environment is configured
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.FROM_ADDRESS;
  if (!apiKey || !fromAddress) {
    return {
      statusCode: 500, headers: cors,
      body: JSON.stringify({ ok: false, error: 'Email service is not configured. Site administrator: please set RESEND_API_KEY and FROM_ADDRESS in Netlify environment variables.' })
    };
  }

  // Parse body
  let payload;
  try { payload = JSON.parse(event.body || '{}'); }
  catch (e) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ ok: false, error: 'Invalid JSON' }) };
  }

  const { userName, userEmail, practitionerEmail, userNote, reportHtml, photoDataUrl, subject } = payload;

  // Validate required fields
  if (!userName || typeof userName !== 'string' || userName.trim().length < 1) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ ok: false, error: 'Your name is required.' }) };
  }
  if (!isValidEmail(userEmail)) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ ok: false, error: 'Your email looks invalid.' }) };
  }
  if (!isValidEmail(practitionerEmail)) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ ok: false, error: "Practitioner's email looks invalid." }) };
  }
  if (!reportHtml || typeof reportHtml !== 'string' || reportHtml.length < 100) {
    return { statusCode: 400, headers: cors, body: JSON.stringify({ ok: false, error: 'Report content is missing or too short.' }) };
  }

  // Cap sizes — prevent abuse
  if (reportHtml.length > 500_000) {
    return { statusCode: 413, headers: cors, body: JSON.stringify({ ok: false, error: 'Report too large.' }) };
  }
  if (photoDataUrl && photoDataUrl.length > 2_000_000) {
    return { statusCode: 413, headers: cors, body: JSON.stringify({ ok: false, error: 'Photo too large (max ~1.5 MB after encoding).' }) };
  }

  // Build the email body. Wrap the report HTML in a brief intro that
  // identifies the sender and contains the user-typed note.
  const safeName  = escapeHtml(userName.trim());
  const safeEmail = escapeHtml(userEmail.trim());
  const safeNote  = userNote ? escapeHtml(userNote.trim()) : '';

  const introHtml = `
    <div style="font-family: Iowan Old Style, Baskerville, serif; max-width: 760px; margin: 0 auto; padding: 1rem; color: #222;">
      <div style="border-bottom: 2px solid #b8362a; padding-bottom: 0.6rem; margin-bottom: 1rem;">
        <p style="margin:0; font-size: 0.85rem; color: #666; letter-spacing: 0.15em; text-transform: uppercase;">Tongue Self-Check Report</p>
        <p style="margin:0.3rem 0 0; font-size: 0.95rem;">
          From: <strong>${safeName}</strong> &lt;<a href="mailto:${safeEmail}" style="color:#b8362a">${safeEmail}</a>&gt;
        </p>
      </div>
      ${safeNote ? `
        <div style="background:#fef0ee; border-left:3px solid #b8362a; padding:0.6rem 0.9rem; margin-bottom:1rem; font-size:0.9rem; color:#444;">
          <strong style="color:#b8362a">Note from sender:</strong> ${safeNote}
        </div>` : ''}
    </div>
  `;

  // Strip outer <html><body> wrappers from the report HTML if present, so we
  // can splice the body content into our own envelope.
  let bodyHtml = reportHtml;
  const bodyMatch = bodyHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) bodyHtml = bodyMatch[1];

  const fullHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>${introHtml}${bodyHtml}</body></html>`;

  // Build attachments — the photo, if provided, as a real attachment so the
  // practitioner sees it as a normal image file (not an inline data URL).
  const attachments = [];
  if (photoDataUrl && photoDataUrl.startsWith('data:image/')) {
    const m = photoDataUrl.match(/^data:image\/(\w+);base64,(.+)$/);
    if (m) {
      const ext = m[1] === 'jpeg' ? 'jpg' : m[1];
      attachments.push({
        filename: `tongue-photo.${ext}`,
        content:  m[2]   // Resend accepts base64 directly
      });
    }
  }

  // Send via Resend. Send to BOTH the practitioner and the user (so the user
  // has a copy of what was sent on their side).
  try {
    const resendBody = {
      from: fromAddress,
      to:   [practitionerEmail.trim()],
      cc:   [userEmail.trim()],
      reply_to: userEmail.trim(),
      subject: subject || `Tongue self-check report from ${userName}`,
      html: fullHtml,
      attachments
    };

    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type':  'application/json'
      },
      body: JSON.stringify(resendBody)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Resend error:', res.status, errText);
      return {
        statusCode: 502, headers: cors,
        body: JSON.stringify({ ok: false, error: `Email service rejected the request (${res.status}).` })
      };
    }

    return { statusCode: 200, headers: cors, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('Send failed:', err);
    return {
      statusCode: 500, headers: cors,
      body: JSON.stringify({ ok: false, error: 'Could not send the email. Please try again later.' })
    };
  }
};
