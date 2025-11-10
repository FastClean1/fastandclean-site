// netlify/functions/create-checkout-session.js

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Netlify Function: create-checkout-session
 * Called from /book page to create a Stripe Checkout Session
 */
exports.handler = async (event) => {
  // Allow only POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body || "{}");

    const {
      service,
      price,
      fullName,
      email,
      phone,
      date,
      timeSlot,
      address,
      notes,
    } = data;

    if (!service || !price || !fullName || !email || !phone || !date || !timeSlot || !address) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    const amount = Math.round(Number(price) * 100); // £ → pence

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            unit_amount: amount,
            product_data: {
              name: service,
              description: `Date: ${date}, Time: ${timeSlot}`,
            },
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: {
        fullName,
        phone,
        date,
        timeSlot,
        address,
        notes: notes || "",
      },
      success_url: `${process.env.URL || "https://fastandcleanltd.netlify.app"}/?payment=success`,
      cancel_url: `${process.env.URL || "https://fastandcleanltd.netlify.app"}/book?payment=cancel`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    console.error("Stripe error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Unable to create checkout session",
        details: error.message,
      }),
    };
  }
};