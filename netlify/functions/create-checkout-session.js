// netlify/functions/create-checkout-session.js
const Stripe = require("stripe");

exports.handler = async (event) => {
  // ✅ DEBUG via browser (GET)
  if (event.httpMethod === "GET") {
    const key = process.env.STRIPE_SECRET_KEY || "";
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ok: true,
        method: "GET",
        hasStripeSecretKey: !!key,
        keyLength: key.length,
      }),
    };
  }

  // ✅ Stripe checkout must be POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  // ✅ READ SECRET KEY
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        error: "Missing STRIPE_SECRET_KEY in environment variables.",
      }),
    };
  }

  // Stripe init
  const stripe = new Stripe(stripeSecret, { apiVersion: "2024-06-20" });

  try {
    const data = JSON.parse(event.body || "{}");

    // TODO: qui metteremo amount, serviceName, date, time, customer ecc.
    // Per ora rispondiamo solo "ok" per confermare che la key è letta.
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ok: true,
        method: "POST",
        message: "Stripe key loaded, function ready.",
      }),
    };
  } catch (err) {
    return {
      statusCode: 400,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ error: String(err?.message || err) }),
    };
  }
};