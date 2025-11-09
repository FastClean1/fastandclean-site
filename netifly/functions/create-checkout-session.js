// netlify/functions/create-checkout-session.js

const Stripe = require("stripe");

// Usa la chiave segreta che hai messo su Netlify come STRIPE_SECRET_KEY
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // Consente solo richieste POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body || "{}");

    const {
      service,     // es: "Office Cleaning - £120"
      price,       // es: 120
      fullName,
      email,
      phone,
      date,
      timeSlot,
      address,
      notes,
    } = data;

    // Controlli minimi
    if (!service || !price) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing service or price" }),
      };
    }

    // Crea la sessione di pagamento Stripe
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: service,
              description:
                "Fast & Clean Ltd - Online booking. Includes selected service details.",
            },
            unit_amount: Math.round(Number(price) * 100), // £ -> pence
          },
          quantity: 1,
        },
      ],
      // URL del tuo sito su Netlify
      success_url: `${
        process.env.URL || "https://fastandcleanltd.netlify.app"
      }/?booking=success`,
      cancel_url: `${
        process.env.URL || "https://fastandcleanltd.netlify.app"
      }/book`,
      metadata: {
        fullName: fullName || "",
        email: email || "",
        phone: phone || "",
        date: date || "",
        timeSlot: timeSlot || "",
        address: address || "",
        notes: notes || "",
      },
    });

    // Ritorna l'URL dove mandare il cliente
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    console.error("Stripe error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Unable to create checkout session",
      }),
    };
  }
};
