const Stripe = require("stripe");

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing STRIPE_SECRET_KEY in environment variables." }),
      };
    }

    const stripe = Stripe(secret);

    const body = JSON.parse(event.body || "{}");

    const amount = Number(body?.amount);
    const currency = (body?.currency || "gbp").toLowerCase();

    if (!Number.isFinite(amount) || amount < 100) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid amount." }),
      };
    }

    const serviceName = body?.service?.serviceName || "Service";
    const bookingDate = body?.schedule?.bookingDate || "";
    const timeSlotLabel =
      body?.schedule?.timeSlotLabel ||
      (body?.schedule?.timeStart && body?.schedule?.timeEnd
        ? `${body.schedule.timeStart}-${body.schedule.timeEnd}`
        : body?.schedule?.timeSlot || "");

    const customerEmail = body?.customer?.email || undefined;

    const siteUrl =
      process.env.URL || "https://fastandcleanltd.netlify.app"; // Netlify provides URL in prod

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail,

      line_items: [
        {
          price_data: {
            currency,
            unit_amount: amount,
            product_data: {
              name: `${serviceName}`,
              description: bookingDate && timeSlotLabel ? `${bookingDate} • ${timeSlotLabel}` : undefined,
            },
          },
          quantity: 1,
        },
      ],

      // IMPORTANT: queste pagine devi crearle nel frontend (anche semplici)
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/book?cancelled=1`,

      metadata: {
        serviceKey: String(body?.service?.serviceKey || ""),
        serviceName: String(serviceName || ""),
        bookingDate: String(bookingDate || ""),
        timeSlot: String(body?.schedule?.timeSlot || ""),
        timeSlotLabel: String(timeSlotLabel || ""),

        fullName: String(body?.customer?.fullName || ""),
        phone: String(body?.customer?.phone || ""),
        email: String(body?.customer?.email || ""),
        address: String(body?.customer?.address || ""),
        notes: String(body?.customer?.notes || ""),

        // Dettagli extra (comodi per te)
        propertyType: String(body?.service?.propertyType || ""),
        bedrooms: String(body?.service?.bedrooms || ""),
        bathrooms: String(body?.service?.bathrooms || ""),
        extraLivingRooms: String(body?.service?.extraLivingRooms || ""),
        additionalRooms: String(body?.service?.additionalRooms || ""),
        basePrice: String(body?.service?.basePrice || ""),
        additionalCost: String(body?.service?.additionalCost || ""),
        hours: String(body?.service?.hours || ""),
        rate: String(body?.service?.rate || ""),
        ovenType: String(body?.service?.ovenType || ""),
        ovenLabel: String(body?.service?.ovenLabel || ""),
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id, url: session.url }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err?.message || "Server error" }),
    };
  }
};