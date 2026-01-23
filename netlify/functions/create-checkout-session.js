import Stripe from "stripe";

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing STRIPE_SECRET_KEY" }),
      };
    }

    const stripe = new Stripe(stripeSecretKey);

    let payload = {};
    try {
      payload = JSON.parse(event.body || "{}");
    } catch {
      payload = {};
    }

    const booking = payload.booking;
    if (!booking) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing booking payload." }),
      };
    }

    const price = Number(booking.price || 0);
    if (!price || Number.isNaN(price) || price <= 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid price." }),
      };
    }

    const siteUrl =
      process.env.URL ||
      process.env.DEPLOY_PRIME_URL ||
      "http://localhost:5173";

    const successUrl = `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${siteUrl}/cancel`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: booking.serviceName || "Service",
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,

      // utile per riconciliazione
      metadata: {
        serviceKey: String(booking.serviceKey || ""),
        serviceName: String(booking.serviceName || ""),
        customerEmail: String(booking.email || ""),
        customerName: String(booking.fullName || ""),
        date: String(booking.date || ""),
        timeSlot: String(booking.timeSlot || ""),
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err?.message || "Server error",
      }),
    };
  }
}