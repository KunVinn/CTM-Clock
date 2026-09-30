/**
 * Proxy the hosted patient question request to the Python knowledge service.
 * Set TCM_ASK_API_URL in Netlify to a public HTTPS deployment of web_server.py.
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json; charset=utf-8'
};

function reply(statusCode, body) {
  return { statusCode, headers: corsHeaders, body: JSON.stringify(body) };
}

exports.handler = async event => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: corsHeaders, body: '' };
  if (event.httpMethod !== 'POST') return reply(405, { error: 'Method not allowed.' });

  const target = String(process.env.TCM_ASK_API_URL || '').trim().replace(/\/$/, '');
  if (!target) {
    return reply(503, {
      error: 'Hosted question service is not configured. Use the local MCP bridge or configure TCM_ASK_API_URL in Netlify.'
    });
  }

  if (!event.body || event.body.length > 32_000) return reply(413, { error: 'Question payload is too large.' });

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch {
    return reply(400, { error: 'Invalid JSON.' });
  }
  if (!payload || typeof payload.question !== 'string' || !payload.question.trim()) {
    return reply(400, { error: 'Please enter a question.' });
  }

  try {
    const response = await fetch(`${target}/api/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    });
    const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch {
      return reply(502, { error: 'The configured question service returned a non-JSON response.' });
    }
    return reply(response.status, result);
  } catch (error) {
    console.error('Question proxy failed:', error);
    return reply(502, { error: 'The configured question service could not be reached.' });
  }
};
