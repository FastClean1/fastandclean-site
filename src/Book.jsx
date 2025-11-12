import React, { useEffect, useMemo, useState } from "react";
import "./book.css";

// Mappa servizi → Stripe Payment Links
const paymentLinks = {
  "Trial Cleaning": "https://buy.stripe.com/3cI3cwb4qaozez5akE7N606",
  "House Cleaning": "https://buy.stripe.com/eVq14o6Oa9kv8aH2Sc7N604",
  "Office Cleaning": "https://buy.stripe.com/14A7sM6Oa1S38aHdwQ7N603",
  "Garden Maintenance": "https://buy.stripe.com/6oU4gAgoK9kvaiP8cw7N602",
  Landscaping: "https://buy.stripe.com/eVqcN6dcy7cnaiPgJ27N601",
  "Handyman Repairs": "https://buy.stripe.com/3cIfZib4qdALbmTfEY7N600",
};

// Opzioni orari
const TIME_SLOTS = ["Morning: 9:00 AM – 2:00 PM", "Afternoon: 3:00 PM – 7:00 PM"];

// Servizi con prezzi/descrizioni (solo per form e riepilogo)
const SERVICE_META = [
  { name: "Trial Cleaning", defaultPrice: 1 },
  { name: "House Cleaning", defaultPrice: 95 },
  { name: "Office Cleaning", defaultPrice: 120 },
  { name: "Garden Maintenance", defaultPrice: 65 },
  { name: "Landscaping", defaultPrice: 160 },
  { name: "Handyman Repairs", defaultPrice: 80 },
];

export default function Book() {
  // Pre-compila da query string
  const qs = useMemo(() => new URLSearchParams(window.location.search), []);
  const qsService = qs.get("service") || "";
  const qsPrice = qs.get("price");

  const [selectedService, setSelectedService] = useState(qsService && paymentLinks[qsService] ? qsService : "Trial Cleaning");
  const [price, setPrice] = useState(
    qsPrice ? Number(qsPrice) : SERVICE_META.find(s => s.name === (qsService || "Trial Cleaning"))?.defaultPrice || 1
  );
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  // Aggiorna prezzo quando cambia servizio (se l’utente non lo ha digitato a mano via query)
  useEffect(() => {
    const meta = SERVICE_META.find(s => s.name === selectedService);
    if (meta && !qsPrice) setPrice(meta.defaultPrice);
  }, [selectedService, qsPrice]);

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validazioni minime
    if (!selectedService || !paymentLinks[selectedService]) {
      setError("Select a valid service.");
      return;
    }
    if (!date) {
      setError("Select a preferred date.");
      return;
    }
    if (!fullName || !email || !phone || !address) {
      setError("Please fill all required fields.");
      return;
    }

    // Redireziona al Payment Link corrispondente (il prezzo visualizzato è informativo)
    window.location.href = paymentLinks[selectedService];
  };

  return (
    <div className="book-wrap">
      <div className="book-container">
        <h1 className="book-title">Book Your Service</h1>
        <p className="book-subtitle">
          Choose your preferred service, date and time slot. You'll be redirected to our secure Stripe checkout to complete your booking.
        </p>

        <form className="book-grid" onSubmit={onSubmit}>
          <div className="book-card">
            <label className="book-label">Select Service *</label>
            <select
              className="book-input"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              {SERVICE_META.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>

            <label className="book-label">Price (£)</label>
            <input
              className="book-input"
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />

            <label className="book-label">Preferred Date *</label>
            <input
              className="book-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label className="book-label">Preferred Time Slot *</label>
            <select
              className="book-input"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
            >
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <div className="book-row-2">
              <div>
                <label className="book-label">Full Name *</label>
                <input
                  className="book-input"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <label className="book-label">Phone Number *</label>
                <input
                  className="book-input"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <label className="book-label">Email Address *</label>
            <input
              className="book-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="book-label">Service Address *</label>
            <input
              className="book-input"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <label className="book-label">Additional Notes (Optional)</label>
            <textarea
              className="book-input"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            {error && <div className="book-error">{error}</div>}

            <button type="submit" className="book-button">
              Proceed to Payment
            </button>
          </div>

          <aside className="book-summary">
            <div className="book-summary-card">
              <h3 className="book-summary-title">Booking Summary</h3>
              <div className="book-summary-row">
                <strong>Service:</strong>&nbsp;
                <span>
                  {selectedService} – £{Number(price).toFixed(0)}
                </span>
              </div>
              <div className="book-summary-row">
                <strong>Date:</strong>&nbsp;<span>{date || "Select a date"}</span>
              </div>
              <div className="book-summary-row">
                <strong>Time Slot:</strong>&nbsp;<span>{timeSlot}</span>
              </div>
              {!paymentLinks[selectedService] && (
                <div className="book-hint">
                  Payment link not configured for this service.
                </div>
              )}
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}