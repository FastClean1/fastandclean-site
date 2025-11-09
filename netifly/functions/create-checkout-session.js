import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {
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
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    const origin =
      event.headers.origin ||
      `https://${event.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            unit_amount: Math.round(Number(price) * 100),
            product_data: {
              name: service,
              description: `Booking for ${fullName}${
                date ? ` on ${date}` : ""
              }${timeSlot ? ` at ${timeSlot}` : ""}`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/?payment=success`,
      cancel_url: `${origin}/book?payment=cancelled`,
      metadata: {
        service,
        price,
        fullName,
        email,
        phone,
        date,
        timeSlot,
        address,
        notes,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    console.error("Stripe error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Stripe session error" }),
    };
  }
}
