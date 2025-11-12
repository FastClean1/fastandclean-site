import React, { useMemo, useState } from "react";
import "./book.css";

export default function Book() {
  // ---- CONFIGURA QUI (EmailJS + tuoi dati) --------------------
  const EMAILJS_SERVICE_ID        = "YOUR_SERVICE_ID";          // es. "service_abc123"
  const EMAILJS_TEMPLATE_OWNER_ID = "YOUR_TEMPLATE_OWNER_ID";   // template per l'email che ricevi tu
  const EMAILJS_TEMPLATE_USER_ID  = "YOUR_TEMPLATE_USER_ID";    // template per l'email al cliente
  const BUSINESS_EMAIL            = "fastandcleanoffice@gmail.com"; // fallback se serve
  // -------------------------------------------------------------

  // Payment Links (forniti da te)
  const links = useMemo(() => ({
    "Trial Cleaning":     "https://buy.stripe.com/3cI3cwb4qaozez5akE7N606",  // £1
    "House Cleaning":     "https://buy.stripe.com/eVq14o6Oa9kv8aH2Sc7N604",
    "Office Cleaning":    "https://buy.stripe.com/14A7sM6Oa1S38aHdwQ7N603",
    "Garden Maintenance": "https://buy.stripe.com/6oU4gAgoK9kvaiP8cw7N602",
    "Landscaping":        "https://buy.stripe.com/eVqcN6dcy7cnaiPgJ27N601",
    "Handyman Repairs":   "https://buy.stripe.com/3cIfZib4qdALbmTfEY7N600",
  }), []);

  // Opzioni form
  const services = Object.keys(links);
  const timeSlots = [
    "Morning: 9:00 AM – 2:00 PM",
    "Afternoon: 3:00 PM – 7:00 PM",
  ];

  // Stato form
  const [selectedService, setSelectedService] = useState(services[0]);
  const [price, setPrice]                 = useState(""); // visivo, non usato da Stripe Link
  const [date, setDate]                   = useState("");
  const [timeSlot, setTimeSlot]           = useState(timeSlots[0]);
  const [fullName, setFullName]           = useState("");
  const [email, setEmail]                 = useState("");
  const [phone, setPhone]                 = useState("");
  const [address, setAddress]             = useState("");
  const [notes, setNotes]                 = useState("");
  const [sending, setSending]             = useState(false);
  const [error, setError]                 = useState("");

  const payLink = links[selectedService];

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!selectedService || !date || !timeSlot || !fullName || !email || !phone || !address) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!payLink) {
      setError("Payment link not configured for this service.");
      return;
    }

    setSending(true);

    // Dati booking usati nelle email
    const payload = {
      service: selectedService,
      price: price || "—",
      date,
      timeSlot,
      fullName,
      email,
      phone,
      address,
      notes: notes || "—",
    };

    try {
      // 1) Email a TE (owner)
      await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_OWNER_ID,
        {
          // variabili da mappare nel template EmailJS
          to_email: BUSINESS_EMAIL, // oppure fisso nel template
          ...payload,
        }
      );

      // 2) Email al CLIENTE (conferma)
      await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_USER_ID,
        {
          to_email: email, // il destinatario è il cliente
          ...payload,
        }
      );

      // 3) Vai al pagamento Stripe (Payment Link)
      window.location.href = payLink;
    } catch (err) {
      console.error(err);
      setError("Email error. Please try again.");
      setSending(false);
    }
  }

  return (
    <div className="book-wrap">
      <h1>Book Your Service</h1>
      <p className="book-sub">
        Choose your preferred date and time slot. You’ll be redirected to our secure Stripe checkout to complete your booking.
      </p>

      <form className="book-form" onSubmit={handleSubmit}>

        <div className="field">
          <label>Select Service *</label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            {services.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Price (£)</label>
          <input
            type="number"
            placeholder="Match this with your chosen package."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="1"
          />
        </div>

        <div className="field">
          <label>Preferred Date *</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label>Preferred Time Slot *</label>
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
          >
            {timeSlots.map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>

        <div className="grid-2">
          <div className="field">
            <label>Full Name *</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>Phone Number *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid-2">
          <div className="field">
            <label>Email Address *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label>Service Address *</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="field">
          <label>Additional Notes (Optional)</label>
          <textarea
            rows="4"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Access details, parking info, special requests..."
          />
        </div>

        <div className="summary">
          <h3>Booking Summary</h3>
          <p><strong>Service:</strong> {selectedService}{price ? ` – £${price}` : ""}</p>
          <p><strong>Date:</strong> {date || "—"}</p>
          <p><strong>Time Slot:</strong> {timeSlot || "—"}</p>
          {!payLink && (
            <p className="warn">Payment link not configured for this service.</p>
          )}
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn-primary" disabled={sending || !payLink}>
          {sending ? "Sending..." : "Proceed to Payment"}
        </button>
      </form>
    </div>
  );
}