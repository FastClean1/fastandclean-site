const Stripe = require("stripe");

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const body = JSON.parse(event.body || "{}");

    const serviceName = String(body.serviceName || "").trim();
    const amountGBP = Number(body.amountGBP);
    const bookingDate = String(body.bookingDate || "").trim();
    const timeSlot = String(body.timeSlot || "").trim();

    const customer = body.customer || {};
    const fullName = String(customer.fullName || "").trim();
    const phone = String(customer.phone || "").trim();
    const email = String(customer.email || "").trim();
    const address = String(customer.address || "").trim();
    const notes = String(customer.notes || "").trim();

    const details = body.details || {};

    if (!serviceName || !Number.isFinite(amountGBP) || amountGBP <= 0) {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid service name or amount" }) };
    }

    if (!bookingDate || !timeSlot || !fullName || !phone || !email || !address) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing booking/customer fields" }) };
    }

    const siteUrl = process.env.SITE_URL || "";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: serviceName,
              description: `Booking: ${bookingDate} | ${timeSlot}`,
            },
            unit_amount: Math.round(amountGBP * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        serviceName,
        bookingDate,
        timeSlot,
        fullName,
        phone,
        address,
        notes,
        details: JSON.stringify(details),
      },
      success_url: `${siteUrl}/success`,
      cancel_url: `${siteUrl}/book?canceled=1`,
    });

    return { statusCode: 200, body: JSON.stringify({ url: session.url }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message || "Stripe error" }) };
  }
};
