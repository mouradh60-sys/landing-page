// netlify/functions/order.js
exports.handler = async function(event, context) {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'error', message: 'Method Not Allowed' })
      };
    }
    const body = event.body ? JSON.parse(event.body) : {};
    const GAS_URL = "https://script.google.com/macros/s/AKfycbyHsPSQI2U46lbSyztLAt5rMhxHqXOTZDinDl8cN6GkaZA4qYWXOWkXDALyxbYXsULm/exec";
    const resp = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const text = await resp.text();
    return {
      statusCode: resp.status,
      headers: {
        'Content-Type': resp.headers.get('content-type') || 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: text
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ status: 'error', message: err.message })
    };
  }
};
