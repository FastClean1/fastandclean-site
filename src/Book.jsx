import React, { useEffect, useMemo, useState } from "react";
import "./book.css"; // Assicurati che esista (anche vuoto va bene per ora)

/**
 * CONFIG
 * ------------------------------------------------------------------
 */

// EmailJS
const EMAILJS_SERVICE_ID = "service_fastandclean"; // <<<<<< SOSTITUISCI con il tuo Service ID
const EMAILJS_TEMPLATE_ID = "template_1528593"; // (già fornito)
const COMPANY_EMAIL = "fastandcleanoffice@gmail.com"; // dove vuoi ricevere le notifiche

// Servizi & Link Stripe (come mi hai passato)
const SERVICES = [
  {
    name: "Trial Cleaning",
    priceFrom: 1, // £1
    duration: "1h service",
    stripeLink: "https://buy.stripe.com/3cI3cwb4qaozez5akE7N606",
  },
  {
    name: "House Cleaning",
    priceFrom: 95,
    duration: "3h service",
    stripeLink: "https://buy.stripe.com/eVq14o6Oa9kv8aH2Sc7N604",
  },
  {
    name: "Office Cleaning",
    priceFrom: 120,
    duration: "2h service",
    stripeLink: "https://buy.stripe.com/14A7sM6Oa1S38aHdwQ7N603",
  },
  {
    name: "Garden Maintenance",
    priceFrom: 65,
    duration: "2h service",
    stripeLink: "https://buy.stripe.com/6oU4gAgoK9kvaiP8cw7N602",
  },
  {
    name: "Landscaping",
    priceFrom: 160,
    duration: "4h service",
    stripeLink: "https://buy.stripe.com/eVqcN6dcy7cnaiPgJ27N601",
  },
  {
    name: "Handyman Repairs",
    priceFrom: 80,
    duration: "2h service",
    stripeLink: "https://buy.stripe.com/3cIfZib4qdALbmTfEY7N600",
  },
];

// Fasce orarie fisse
const TIME_SLOTS = [
  { id: "morning", label: "Morning: 9:00 AM – 2:00 PM" },
  { id: "afternoon", label: "Afternoon: 3:00 PM – 7:00 PM" },
];

/**
 * COMPONENT
 * ------------------------------------------------------------------
 */

export default function Book() {
  // Prefill da query (?service=...&price=...)
  const query = useMemo(() => new URLSearchParams(window.location.search), []);
  const qService = query.get("service");
  const qPrice = query.get("price");

  // Stato form
  const [selectedService, setSelectedService] = useState(qService || SERVICES[0].name);
  const [selectedPrice, setSelectedPrice] = useState(
    qPrice ? Number(qPrice) : SERVICES.find(s => s.name === (qService || SERVICES[0].name))?.priceFrom || 0
  );
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Quando cambia il servizio, aggiorno il prezzo al “from”
  useEffect(() => {
    const svc = SERVICES.find(s => s.name === selectedService);
    if (svc) setSelectedPrice(svc.priceFrom);
  }, [selectedService]);

  // Validazione basilare
  const validate = () => {
    if (!selectedService) return "Please select a service.";
    if (!date) return "Please pick a preferred date.";
    if (!timeSlot) return "Please select a time slot.";
    if (!fullName.trim()) return "Please enter your full name.";
    if (!email.trim()) return "Please enter your email address.";
    if (!address.trim()) return "Please enter the service address.";
    const svc = SERVICES.find(s => s.name === selectedService);
    if (!svc?.stripeLink) return "Payment link not configured for this service.";
    return "";
  };

  // Invio email + redirect a Stripe
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    const msg = validate();
    if (msg) {
      setErr(msg);
      return;
    }

    // Preparo parametri condivisi (per EmailJS)
    const params = {
      service: selectedService,
      price: `£${selectedPrice}`,
      fullName,
      phone,
      email,        // email del cliente
      address,
      date,
      timeSlot,
      notes: notes || "-",
      company_email: COMPANY_EMAIL, // utile se vuoi visualizzarlo nel template
    };

    setLoading(true);
    try {
      // 1) Email al cliente (il tuo template deve usare {{email}} come destinatario — To Email: {{email}})
      if (window.emailjs) {
        await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
      }

      // 2) Email a te (inviando lo stesso template ma con to_email = COMPANY_EMAIL)
      if (window.emailjs) {
        await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          ...params,
          email: COMPANY_EMAIL, // sovrascrivo il destinatario
        });
      }

      // 3) Redirect al link Stripe del servizio scelto
      const svc = SERVICES.find(s => s.name === selectedService);
      if (svc?.stripeLink) {
        window.location.href = svc.stripeLink;
      } else {
        setErr("Payment link not configured for this service.");
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      setErr("There was a problem sending emails. Please try again.");
      setLoading(false);
    }
  };

  const selectedSvc = SERVICES.find(s => s.name === selectedService);

  return (
    <div className="book container">
      <h1>Book Your Service</h1>
      <p className="book-intro">
        Choose your preferred service, date and time slot. You’ll be redirected to our secure Stripe checkout to complete your booking.
      </p>

      <form className="book-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Service */}
          <div className="form-group">
            <label htmlFor="service">Select Service *</label>
            <select
              id="service"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              {SERVICES.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
            <small className="hint">Match this with your chosen package.</small>
          </div>

          {/* Price (mostro, ma lascio modificabile volendo) */}
          <div className="form-group">
            <label htmlFor="price">Price (£)</label>
            <input
              id="price"
              type="number"
              min="0"
              step="1"
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(Number(e.target.value))}
            />
          </div>

          {/* Date */}
          <div className="form-group">
            <label htmlFor="date">Preferred Date *</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Time Slot */}
          <div className="form-group">
            <label htmlFor="slot">Preferred Time Slot *</label>
            <select
              id="slot"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
            >
              <option value="">Select a time slot</option>
              {TIME_SLOTS.map((t) => (
                <option key={t.id} value={t.label}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Full name */}
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Address */}
          <div className="form-group full">
            <label htmlFor="addr">Service Address *</label>
            <input
              id="addr"
              type="text"
              placeholder="Enter the address where service is needed"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Notes */}
          <div className="form-group full">
            <label htmlFor="notes">Additional Notes (Optional)</label>
            <textarea
              id="notes"
              placeholder="Any special instructions or requirements..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Riepilogo */}
        <div className="summary">
          <h3>Booking Summary</h3>
          <p><strong>Service:</strong> {selectedService} — £{selectedPrice}</p>
          <p><strong>Date:</strong> {date || "Select a date"}</p>
          <p><strong>Time Slot:</strong> {timeSlot || "Select a time slot"}</p>
          {selectedSvc?.duration && (
            <p><strong>Duration:</strong> {selectedSvc.duration}</p>
          )}
        </div>

        {/* Errori */}
        {err && <div className="error">{err}</div>}

        {/* Submit */}
        <button className="btn-primary big" type="submit" disabled={loading}>
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </form>
    </div>
  );
}