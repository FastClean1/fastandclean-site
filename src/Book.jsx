import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./book.css";

// PAYMENT LINKS STRIPE (AGGIORNATI)
const PAYMENT_LINKS = {
  "Trial Cleaning - £1": "https://buy.stripe.com/3cI3cwb4qaozez5akE7N606",
  "House Cleaning - £95": "https://buy.stripe.com/eVq14o6Oa9kv8aH2Sc7N604",
  "Office Cleaning - £120": "https://buy.stripe.com/14A7sM6Oa1S38aHdwQ7N603",
  "Garden Maintenance - £65": "https://buy.stripe.com/6oU4gAgoK9kvaiP8cw7N602",
  "Landscaping - £160": "https://buy.stripe.com/eVqcN6dcy7cnaiPgJ27N601",
  "Handyman Repairs - £80": "https://buy.stripe.com/3cIfZib4qdALbmTfEY7N600",
};

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Book() {
  const query = useQuery();
  const navigate = useNavigate();

  const initialService = query.get("service") || "Trial Cleaning";
  const initialPrice = query.get("price") || "1";

  const [selectedService, setSelectedService] = useState(initialService);
  const [selectedPrice, setSelectedPrice] = useState(initialPrice);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!date || !timeSlot || !fullName || !email || !phone || !address) {
      setError("Please fill in all required fields (*) before proceeding.");
      return;
    }

    const key = `${selectedService} - £${selectedPrice}`;
    const paymentUrl = PAYMENT_LINKS[key];

    if (!paymentUrl) {
      setError("Payment link not configured for this service.");
      return;
    }

    window.location.href = paymentUrl;
  };

  return (
    <div className="booking-page">
      {/* HEADER */}
      <header className="booking-header">
        <div className="booking-logo" onClick={() => navigate("/")}>
          Fast &amp; Clean Ltd
        </div>
        <div className="booking-menu">
          <button onClick={() => navigate("/")}>Home</button>
        </div>
      </header>

      {/* MAIN */}
      <main className="booking-main">
        <section className="booking-card">
          <h1 className="booking-title">Book Your Service</h1>
          <p className="booking-subtitle">
            Choose your preferred service, date and time slot.
            You&apos;ll be redirected to our secure Stripe checkout to complete your booking.
          </p>

          <form className="booking-form" onSubmit={handleSubmit}>
            {/* SERVICE */}
            <div className="form-group">
              <label>Select Service *</label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                <option>Trial Cleaning</option>
                <option>House Cleaning</option>
                <option>Office Cleaning</option>
                <option>Garden Maintenance</option>
                <option>Landscaping</option>
                <option>Handyman Repairs</option>
              </select>
            </div>

            {/* PRICE */}
            <div className="form-group">
              <label>Price (£)</label>
              <input
                type="number"
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                min="1"
              />
              <small>Match this with your chosen package.</small>
            </div>

            {/* DATE */}
            <div className="form-group">
              <label>Preferred Date *</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            {/* TIME SLOT */}
            <div className="form-group">
              <label>Preferred Time Slot *</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                required
              >
                <option value="">Select a time slot</option>
                <option>Morning: 9:00 AM – 2:00 PM</option>
                <option>Afternoon: 3:00 PM – 7:00 PM</option>
              </select>
            </div>

            {/* NAME + PHONE */}
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* ADDRESS */}
            <div className="form-group">
              <label>Service Address *</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* NOTES */}
            <div className="form-group">
              <label>Additional Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="3"
              />
            </div>

            {/* SUMMARY */}
            <div className="booking-summary">
              <h2>Booking Summary</h2>
              <p>
                <strong>Service:</strong> {selectedService} – £{selectedPrice}
              </p>
              <p>
                <strong>Date:</strong> {date || "Select a date"}
              </p>
              <p>
                <strong>Time Slot:</strong>{" "}
                {timeSlot || "Select a time slot"}
              </p>
            </div>

            {/* ERROR */}
            {error && <p className="booking-error">{error}</p>}

            {/* BUTTON */}
            <button type="submit" className="booking-submit">
              Proceed to Payment
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}