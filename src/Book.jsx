import React, { useState, useEffect } from "react";
import "./book.css";

const SERVICES = [
  { label: "Trial Cleaning - £40", value: "Trial Cleaning", price: 40 },
  { label: "House Cleaning - £95", value: "House Cleaning", price: 95 },
  { label: "Office Cleaning - £120", value: "Office Cleaning", price: 120 },
  { label: "Garden Maintenance - £65", value: "Garden Maintenance", price: 65 },
  { label: "Landscaping - £160", value: "Landscaping", price: 160 },
  { label: "Handyman Repairs - £80", value: "Handyman Repairs", price: 80 },
];

export default function Book() {
  const [selectedService, setSelectedService] = useState(SERVICES[0].value);
  const [selectedPrice, setSelectedPrice] = useState(SERVICES[0].price);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const s = SERVICES.find((s) => s.value === selectedService);
    setSelectedPrice(s ? s.price : 0);
  }, [selectedService]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "/.netlify/functions/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service: `${selectedService} - £${selectedPrice}`,
            price: selectedPrice,
            fullName,
            email,
            phone,
            date,
            timeSlot,
            address,
            notes,
          }),
        }
      );

      const text = await response.text();
      let data = {};
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        console.error("Invalid JSON from server:", text);
        throw new Error("Invalid response from payment server.");
      }

      if (response.ok && data.url) {
        window.location.href = data.url; // vai su Stripe
      } else {
        console.error("Stripe error:", data);
        throw new Error(data.message || "Payment error");
      }
    } catch (err) {
      console.error(err);
      setError("Network / payment error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-page">
      <div className="book-container">
        <h1 className="book-title">Book Your Service</h1>
        <p className="book-subtitle">
          Choose your preferred service, date and time slot. Pay securely online.
        </p>

        <form className="book-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Select Service *</label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              required
            >
              {SERVICES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row two-cols">
            <div>
              <label>Preferred Date *</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Preferred Time Slot *</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                required
              >
                <option value="">Select a time</option>
                <option value="Morning: 9:00 AM – 2:00 PM">
                  Morning: 9:00 AM – 2:00 PM
                </option>
                <option value="Afternoon: 3:00 PM – 7:00 PM">
                  Afternoon: 3:00 PM – 7:00 PM
                </option>
              </select>
            </div>
          </div>

          <div className="form-row two-cols">
            <div>
              <label>Full Name *</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Phone Number *</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <label>Email Address *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <label>Service Address *</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <label>Additional Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
            />
          </div>

          <div className="summary-card">
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

          {error && <div className="error-message">{error}</div>}

          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}