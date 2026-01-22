const Stripe = require("stripe");

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
    },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(200, { ok: true });
  if (event.httpMethod !== "POST") return json(405, { error: "Method Not Allowed" });

  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) return json(500, { error: "Missing STRIPE_SECRET_KEY in environment variables." });

    const stripe = new Stripe(key);

    const payload = JSON.parse(event.body || "{}");
    const booking = payload.booking;

    if (!booking) return json(400, { error: "Missing booking payload." });

    const amount = Math.round(Number(booking.price || 0) * 100);
    if (!amount || amount < 50) {
      return json(400, { error: "Invalid price. Must be at least £0.50." });
    }

    // base URL del sito
    const origin =
      event.headers.origin ||
      `https://${event.headers.host}` ||
      "https://fastandcleanltd.netlify.app";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: booking.email || undefined,

      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: booking.serviceName || "Service",
              description: `${booking.date || ""} | ${booking.timeSlot || ""}`.trim(),
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],

      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,

      // Metadati utili (non mandano email, ma ti aiutano a vedere info dentro Stripe)
      metadata: {
        serviceKey: booking.serviceKey || "",
        serviceName: booking.serviceName || "",
        date: booking.date || "",
        timeSlot: booking.timeSlot || "",
        customerName: booking.fullName || "",
        phone: booking.phone || "",
      },
    });

    return json(200, { url: session.url });
  } catch (err) {
    return json(500, { error: err.message || String(err) });
  }
};