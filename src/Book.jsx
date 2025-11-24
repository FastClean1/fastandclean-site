import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Book.jsx
 * - Raccoglie dati cliente + appuntamento
 * - Manda 2 email con EmailJS (azienda + cliente)
 * - Poi redirect su Stripe Payment Link del servizio scelto
 */

export default function Book() {
  const location = useLocation();

  // ---- 1) Servizi + Stripe links + prezzi
  const services = useMemo(
    () => [
      {
        name: "Trial Cleaning",
        duration: "1h service",
        priceFrom: 1,
        stripeLink: "https://buy.stripe.com/3cI3cwb4qaozez5akE7N606",
        description:
          "1-hour trial clean to experience our professional quality. Perfect for first-time customers.",
      },
      {
        name: "House Cleaning",
        duration: "3h service",
        priceFrom: 95,
        stripeLink: "https://buy.stripe.com/eVq14o6Oa9kv8aH2Sc7N604",
        description:
          "Regular or deep cleaning for flats and houses, including kitchens, bathrooms and living areas.",
      },
      {
        name: "Office Cleaning",
        duration: "2h service",
        priceFrom: 120,
        stripeLink: "https://buy.stripe.com/14A7sM6Oa1S38aHdwQ7N603",
        description:
          "Professional cleaning for offices, clinics and retail spaces with flexible schedules.",
      },
      {
        name: "Garden Maintenance",
        duration: "2h service",
        priceFrom: 65,
        stripeLink: "https://buy.stripe.com/6oU4gAgoK9kvaiP8cw7N602",
        description:
          "Lawn mowing, hedge trimming, weeding and tidy-ups to keep your garden sharp all year.",
      },
      {
        name: "Landscaping",
        duration: "4h service",
        priceFrom: 160,
        stripeLink: "https://buy.stripe.com/eVqcN6dcy7cnaiPgJ27N601",
        description:
          "Planting, design and outdoor improvements to refresh and upgrade your property.",
      },
      {
        name: "Handyman Repairs",
        duration: "2h service",
        priceFrom: 80,
        stripeLink: "https://buy.stripe.com/3cIfZib4qdALbmTfEY7N600",
        description:
          "Minor repairs, furniture assembly, painting and general home & office fixes.",
      },
    ],
    []
  );

  const defaultServiceName = services[0].name;

  // ---- 2) Stato form
  const [selectedService, setSelectedService] = useState(defaultServiceName);
  const [selectedPrice, setSelectedPrice] = useState(
    services.find((s) => s.name === defaultServiceName)?.priceFrom || 0
  );

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning: 9:00 AM – 2:00 PM");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---- 3) Pre-selezione servizio se arrivi da Home con state
  useEffect(() => {
    const preselected = location.state?.serviceName;
    if (preselected && services.some((s) => s.name === preselected)) {
      setSelectedService(preselected);
      const srv = services.find((s) => s.name === preselected);
      setSelectedPrice(srv.priceFrom);
    }
  }, [location.state, services]);

  // ---- 4) Quando cambio servizio → aggiorno prezzo di default
  useEffect(() => {
    const srv = services.find((s) => s.name === selectedService);
    if (srv) setSelectedPrice(srv.priceFrom);
  }, [selectedService, services]);

  const currentService = services.find((s) => s.name === selectedService);

  // ---- 5) EmailJS helpers
  const EMAILJS_SERVICE_ID = "service_fastandclean";
  const EMAILJS_TEMPLATE_ID = "template_1528593";
  const EMAILJS_PUBLIC_KEY = "5_Cvw67jXHmkH-d_u"; // tua public key

  const sendEmails = async () => {
    if (!window.emailjs) {
      throw new Error("EmailJS non è caricato (manca CDN in index.html).");
    }

    const templateParams = {
      service: selectedService,
      price: `£${selectedPrice}`,
      booking_date: date,
      booking_time: timeSlot,
      address,
      full_name: fullName,
      phone,
      email, // IMPORTANT: questo è l'email cliente
      notes,
    };

    // 1) email al CLIENTE
    await window.emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        ...templateParams,
        to_email: email, // alcuni template leggono {{to_email}}
      },
      EMAILJS_PUBLIC_KEY
    );

    // 2) email all’AZIENDA
    await window.emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        ...templateParams,
        to_email: "fastandcleanoffice@gmail.com",
      },
      EMAILJS_PUBLIC_KEY
    );
  };

  // ---- 6) Submit → manda email → redirect Stripe
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !fullName ||
      !email ||
      !phone ||
      !date ||
      !timeSlot ||
      !address ||
      !selectedService
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (!currentService?.stripeLink) {
      setError("Payment link not configured for this service.");
      return;
    }

    try {
      setLoading(true);

      await sendEmails();

      // Redirect su Stripe Payment Link
      window.location.href = currentService.stripeLink;
    } catch (err) {
      console.error(err);
      setError("There was a problem sending emails. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <section className="container book-wrap">
        <h1 className="page-title">Book Your Service</h1>
        <p className="page-subtitle">
          Choose your preferred service, date and time slot. You’ll be redirected
          to Stripe to complete payment.
        </p>

        <form className="book-form" onSubmit={handleSubmit}>
          {/* Service */}
          <label className="field">
            <span>Select Service *</span>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              {services.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>

          {/* Price */}
          <label className="field">
            <span>Price (£) *</span>
            <input
              type="number"
              min="1"
              step="1"
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(Number(e.target.value))}
            />
            <small>Match this with your chosen package.</small>
          </label>

          {/* Date */}
          <label className="field">
            <span>Preferred Date *</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          {/* Time slot */}
          <label className="field">
            <span>Preferred Time Slot *</span>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
            >
              <option>Morning: 9:00 AM – 2:00 PM</option>
              <option>Afternoon: 3:00 PM – 7:00 PM</option>
            </select>
          </label>

          {/* Name / phone */}
          <div className="grid-2">
            <label className="field">
              <span>Full Name *</span>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name"
              />
            </label>
            <label className="field">
              <span>Phone Number *</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="07..."
              />
            </label>
          </div>

          {/* Email */}
          <label className="field">
            <span>Email Address *</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
            />
          </label>

          {/* Address */}
          <label className="field">
            <span>Service Address *</span>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street, city, postcode"
            />
          </label>

          {/* Notes */}
          <label className="field">
            <span>Additional Notes (Optional)</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special instructions..."
              rows={3}
            />
          </label>

          {/* Booking summary */}
          <div className="summary-card">
            <h3>Booking Summary</h3>
            <p>
              <strong>Service:</strong> {selectedService} — £{selectedPrice}
            </p>
            <p>
              <strong>Date:</strong> {date || "—"}
            </p>
            <p>
              <strong>Time Slot:</strong> {timeSlot || "—"}
            </p>
            <p>
              <strong>Duration:</strong> {currentService?.duration || "—"}
            </p>
          </div>

          {error && <div className="error">{error}</div>}

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </form>
      </section>
    </div>
  );
}