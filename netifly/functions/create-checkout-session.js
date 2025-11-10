const Stripe = require("stripe");

// Usa la chiave segreta presa da Netlify (STRIPE_SECRET_KEY)
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // Solo POST
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

    if (!service || !price || !fullName || !email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required booking data" }),
      };
    }

    const description = `
Service: ${service}
Name: ${fullName}
Email: ${email}
Phone: ${phone || "-"}
Date: ${date || "-"}
Time: ${timeSlot || "-"}
Address: ${address || "-"}
Notes: ${notes || "-"}
    `.trim();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: service,
              description,
            },
            unit_amount: Math.round(Number(price) * 100),
          },
          quantity: 1,
        },
      ],
      success_url:
        "https://fastandcleanltd.netlify.app/?payment=success",
      cancel_url:
        "https://fastandcleanltd.netlify.app/book?payment=cancelled",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error("Stripe error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Stripe session error" }),
    };
  }
};