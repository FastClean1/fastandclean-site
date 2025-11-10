const Stripe = require("stripe");

exports.handler = async (event) => {
  try {
    // Solo POST
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: "Method not allowed",
      };
    }

    // Controllo chiave Stripe
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      console.error("Missing STRIPE_SECRET_KEY");
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: true,
          message: "Stripe key missing on server",
        }),
      };
    }

    const stripe = Stripe(secretKey);

    // Dati dal frontend
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
        body: JSON.stringify({
          error: true,
          message: "Missing required booking fields",
        }),
      };
    }

    // Crea sessione Checkout
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: service,
            },
            unit_amount: Math.round(Number(price) * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        fullName,
        email,
        phone,
        date,
        timeSlot,
        address,
        notes: notes || "",
      },
      success_url: "https://fastandcleanltd.netlify.app/?success=true",
      cancel_url: "https://fastandcleanltd.netlify.app/book?canceled=true",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error("Stripe error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: true,
        message: err.message || "Internal server error",
      }),
    };
  }
};