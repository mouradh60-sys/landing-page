// netlify/functions/order.js
// Simple proxy that forwards POST body to Google Apps Script Web App
exports.handler = async function(event, context) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "error", message: "Method Not Allowed" })
      };
    }

    const body = event.body ? JSON.parse(event.body) : {};

    // Forward to Google Apps Script Web App
    const GAS_URL = "https://script.google.com/macros/s/AKfycbxZJo3Poxk0zFHCbjgQq7HKrYMo5KDqNvhJBPYl4Xyaqve0bcJ22-1UYNZORk1gmo4/exec";

    const resp = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await resp.text();

    // Return GAS response back to browser
    return {
      statusCode: resp.status,
      headers: {
        "Content-Type": resp.headers.get("content-type") || "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: text
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ status: "error", message: err.message })
    };
  }
};
