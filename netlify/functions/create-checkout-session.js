// netlify/functions/create-checkout-session.js

import Stripe from "stripe";

export const handler = async (event) => {
  // Debug GET: ti dice se la env var esiste (NON espone la chiave)
  if (event.httpMethod === "GET") {
    const key = process.env.STRIPE_SECRET_KEY || "";
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ok: true,
        method: "GET",
        hasStripeSecretKey: Boolean(key),
        keyLength: key.length,
      }),
    };
  }

  // Solo POST per creare la Checkout Session
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return {
        statusCode: 500,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ error: "Missing STRIPE_SECRET_KEY in environment variables." }),
      };
    }

    const stripe = new Stripe(secretKey, { apiVersion: "2024-06-20" });

    const data = JSON.parse(event.body || "{}");

    const {
      amount,        // £ (string/number)
      serviceName,
      date,
      timeSlot,
      customerEmail,
    } = data;

    if (!amount || !serviceName || !date || !timeSlot) {
      return {
        statusCode: 400,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          error: "Missing required booking data (amount, serviceName, date, timeSlot).",
        }),
      };
    }

    const siteUrl =
      process.env.URL || "https://fastandcleanltd.netlify.app"; // fallback

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: customerEmail || undefined,
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: serviceName,
              description: `Date: ${date} | Time: ${timeSlot}`,
            },
            unit_amount: Math.round(Number(amount) * 100), // £ -> pence
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/success`,
      cancel_url: `${siteUrl}/book`,
    });

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        error: "Stripe error",
        message: err?.message || String(err),
      }),
    };
  }
};