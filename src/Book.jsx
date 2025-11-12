import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./book.css";

// Mappa servizio → link Stripe (pagamento dopo form)
const PAYMENT_LINKS = {
  "Trial Cleaning": "https://buy.stripe.com/3cI3cwb4qaozez5akE7N606",
  "House Cleaning": "https://buy.stripe.com/eVq14o6Oa9kv8aH2Sc7N604",
  "Office Cleaning": "https://buy.stripe.com/14A7sM6Oa1S38aHdwQ7N603",
  "Garden Maintenance": "https://buy.stripe.com/6oU4gAgoK9kvaiP8cw7N602",
  "Landscaping": "https://buy.stripe.com/eVqcN6dcy7cnaiPgJ27N601",
  "Handyman Repairs": "https://buy.stripe.com/3cIfZib4qdALbmTfEY7N600",
};

export default function Book() {
  const [sp] = useSearchParams();
  const initialService = sp.get("service") || "Trial Cleaning";
  const initialPrice = sp.get("price") || "1";

  const [selectedService, setSelectedService] = useState(initialService);
  const [selectedPrice, setSelectedPrice] = useState(initialPrice);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const services = useMemo(
    () => [
      { name: "Trial Cleaning", price: 1 },
      { name: "House Cleaning", price: 95 },
      { name: "Office Cleaning", price: 120 },
      { name: "Garden Maintenance", price: 65 },
      { name: "Landscaping", price: 160 },
      { name: "Handyman Repairs", price: 80 },
    ],
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (window.emailjs) {
        await window.emailjs.send(
          "YOUR_SERVICE_ID", // <-- sostituisci con il tuo
          "YOUR_TEMPLATE_ID", // <-- sostituisci con il tuo
          {
            to_email: email,
            service: selectedService,
            price: `£${selectedPrice}`,
            date,
            timeSlot,
            fullName,
            phone,
            address,
            notes,
          }
        );
      }
    } catch (err) {
      console.error("EmailJS error:", err);
    }

    const link = PAYMENT_LINKS[selectedService];
    if (!link) {
      setError("Payment link not found for this service.");
      return;
    }

    window.location.href = link;
  };

  return (
    <section className="book">
      <div className="container container-narrow">
        <h1>Book Your Service</h1>
        <p className="muted">
          Fill out the form below to reserve your spot. Once submitted, you'll be
          redirected to secure payment.
        </p>

        <form className="book-form" onSubmit={handleSubmit}>
          <label>
            Select Service *
            <select
              value={selectedService}
              onChange={(e) => {
                const s = services.find((x) => x.name === e.target.value);
                setSelectedService(e.target.value);
                if (s) setSelectedPrice(String(s.price));
              }}
            >
              {services.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name} — £{s.price}
                </option>
              ))}
            </select>
          </label>

          <label>
            Price (£) *
            <input
              type="number"
              min="0"
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              required
            />
          </label>

          <div className="grid-2">
            <label>
              Preferred Date *
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </label>
            <label>
              Preferred Time Slot *
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                required
              >
                <option value="">Select a time slot</option>
                <option>Morning: 9:00 AM – 2:00 PM</option>
                <option>Afternoon: 3:00 PM – 7:00 PM</option>
              </select>
            </label>
          </div>

          <div className="grid-2">
            <label>
              Full Name *
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </label>
            <label>
              Phone Number *
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>
          </div>

          <label>
            Email Address *
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Service Address *
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>

          <label>
            Additional Notes (optional)
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </label>

          <div className="summary">
            <h3>Booking Summary</h3>
            <ul>
              <li>
                <strong>Service:</strong> {selectedService} — £{selectedPrice}
              </li>
              <li>
                <strong>Date:</strong> {date || "Select a date"}
              </li>
              <li>
                <strong>Time Slot:</strong> {timeSlot || "Select a time slot"}
              </li>
              <li>
                <strong>Customer:</strong> {fullName || "Your name"}
              </li>
            </ul>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn btn-primary btn-full">
            Proceed to Payment
          </button>
        </form>
      </div>
    </section>
  );
}