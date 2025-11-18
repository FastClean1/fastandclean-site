import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./book.css";

const SERVICE_CONFIG = [
  {
    name: "Trial Cleaning",
    duration: "1h service",
    defaultPrice: 1,
    stripeLink: "https://buy.stripe.com/3cI3cwb4qaozez5akE7N606",
  },
  {
    name: "House Cleaning",
    duration: "3h service",
    defaultPrice: 95,
    stripeLink: "https://buy.stripe.com/eVq14o6Oa9kv8aH2Sc7N604",
  },
  {
    name: "Office Cleaning",
    duration: "2h service",
    defaultPrice: 120,
    stripeLink: "https://buy.stripe.com/14A7sM6Oa1S38aHdwQ7N603",
  },
  {
    name: "Garden Maintenance",
    duration: "2h service",
    defaultPrice: 65,
    stripeLink: "https://buy.stripe.com/6oU4gAgoK9kvaiP8cw7N602",
  },
  {
    name: "Landscaping",
    duration: "4h service",
    defaultPrice: 160,
    stripeLink: "https://buy.stripe.com/eVqcN6dcy7cnaiPgJ27N601",
  },
  {
    name: "Handyman Repairs",
    duration: "2h service",
    defaultPrice: 80,
    stripeLink: "https://buy.stripe.com/3cIfZib4qdALbmTfEY7N600",
  },
];

export default function Book() {
  const location = useLocation();

  const [selectedService, setSelectedService] = useState(
    SERVICE_CONFIG[0].name
  );
  const [duration, setDuration] = useState(SERVICE_CONFIG[0].duration);
  const [price, setPrice] = useState(SERVICE_CONFIG[0].defaultPrice);

  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState("");

  // --- 1. Leggi service / price dall’URL quando arrivi da "Book This Service" ---
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceFromUrl = params.get("service");
    const priceFromUrl = params.get("price");

    if (serviceFromUrl) {
      const found = SERVICE_CONFIG.find(
        (s) => s.name.toLowerCase() === serviceFromUrl.toLowerCase()
      );
      if (found) {
        setSelectedService(found.name);
        setDuration(found.duration);
        setPrice(
          priceFromUrl ? Number(priceFromUrl) || found.defaultPrice : found.defaultPrice
        );
      }
    } else {
      // se entri da menu /book senza query, usa il primo servizio
      const first = SERVICE_CONFIG[0];
      setSelectedService(first.name);
      setDuration(first.duration);
      setPrice(first.defaultPrice);
    }
  }, [location.search]);

  // --- 2. Min date (oggi) per l’input data ---
  const todayStr = new Date().toISOString().split("T")[0];

  function handleServiceChange(e) {
    const name = e.target.value;
    setSelectedService(name);
    const found = SERVICE_CONFIG.find((s) => s.name === name);
    if (found) {
      setDuration(found.duration);
      setPrice(found.defaultPrice);
    }
  }

  function handlePriceChange(e) {
    const value = e.target.value;
    if (value === "") {
      setPrice("");
      return;
    }
    const num = Number(value);
    if (!Number.isNaN(num)) {
      setPrice(num);
    }
  }

  // --- 3. Click su "Proceed to Payment" ---
  async function handleProceedToPayment(e) {
    e.preventDefault();
    setError("");

    // validazione base
    if (!selectedService || !date || !timeSlot || !fullName || !phone || !email || !address) {
      setError("Please fill in all required fields before proceeding.");
      return;
    }

    const config = SERVICE_CONFIG.find((s) => s.name === selectedService);
    if (!config || !config.stripeLink) {
      setError("Payment link not configured for this service.");
      return;
    }

    // prepara dati per EmailJS
    const templateParams = {
      service: selectedService,
      booking_date: date,
      booking_time: timeSlot,
      address,
      full_name: fullName,
      phone,
      email,
      notes,
    };

    try {
      // emailjs globale viene caricato da index.html tramite CDN
      if (window.emailjs) {
        await window.emailjs.send(
          "service_fastandclean",
          "template_1528593",
          templateParams
        );
      } else {
        console.warn("EmailJS not available on window.");
      }

      // se tutto ok -> vai al pagamento Stripe
      window.location.href = config.stripeLink;
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("There was a problem sending emails. Please try again.");
    }
  }

  return (
    <div className="book-page">
      <div className="container">
        <h1>Book Your Service</h1>
        <p className="book-intro">
          Choose your preferred service, date and time slot. You&apos;ll be
          redirected to our secure Stripe checkout to complete your booking.
        </p>

        <div className="booking-grid">
          {/* FORM */}
          <form className="booking-form">
            {/* Service */}
            <div className="field">
              <label htmlFor="service">Select Service *</label>
              <select
                id="service"
                value={selectedService}
                onChange={handleServiceChange}
              >
                {SERVICE_CONFIG.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="field">
              <label htmlFor="price">
                Price (£) <span className="field-note">Match this with your chosen package.</span>
              </label>
              <input
                id="price"
                type="number"
                min="0"
                value={price}
                onChange={handlePriceChange}
              />
            </div>

            {/* Date */}
            <div className="field">
              <label htmlFor="date">Preferred Date *</label>
              <input
                id="date"
                type="date"
                min={todayStr}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Time slot */}
            <div className="field">
              <label htmlFor="timeslot">Preferred Time Slot *</label>
              <select
                id="timeslot"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
              >
                <option value="">Select a time slot</option>
                <option value="Morning: 9:00 AM – 2:00 PM">
                  Morning: 9:00 AM – 2:00 PM
                </option>
                <option value="Afternoon: 3:00 PM – 7:00 PM">
                  Afternoon: 3:00 PM – 7:00 PM
                </option>
              </select>
            </div>

            {/* Full name & phone */}
            <div className="field-row">
              <div className="field">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div className="field">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Address */}
            <div className="field">
              <label htmlFor="address">Service Address *</label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {/* Notes */}
            <div className="field">
              <label htmlFor="notes">Additional Notes (Optional)</label>
              <textarea
                id="notes"
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </form>

          {/* SUMMARY */}
          <aside className="booking-summary">
            <div className="summary-card">
              <h2>Booking Summary</h2>
              <p>
                <strong>Service:</strong> {selectedService} — £
                {price || 0}
              </p>
              <p>
                <strong>Date:</strong> {date || "Select a date"}
              </p>
              <p>
                <strong>Time Slot:</strong> {timeSlot || "Select a time slot"}
              </p>
              <p>
                <strong>Duration:</strong> {duration}
              </p>

              {error && <p className="error-text">{error}</p>}

              <button
                type="button"
                className="btn-primary btn-full"
                onClick={handleProceedToPayment}
              >
                Proceed to Payment
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}