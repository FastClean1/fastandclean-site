import React, { useState } from "react";
import "./book.css";

function Book() {
  const [selectedService, setSelectedService] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const services = [
    { name: "Trial Cleaning", price: 40 },
    { name: "House Cleaning", price: 95 },
    { name: "Office Cleaning", price: 120 },
    { name: "Garden Maintenance", price: 65 },
    { name: "Landscaping", price: 160 },
    { name: "Handyman Repairs", price: 80 },
  ];

  const timeSlots = [
    "Morning: 9:00 AM – 2:00 PM",
    "Afternoon: 3:00 PM – 7:00 PM",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!selectedService || !selectedPrice || !fullName || !email || !phone || !address) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/.netlify/functions/create-checkout-session", {
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
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url; // Manda il cliente su Stripe
      } else {
        setError("Something went wrong, please try again later.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Payment error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-container">
      <h2>Book Your Service</h2>
      <p>
        Choose your preferred service, date and time slot. Only one booking per slot is available to guarantee top quality.
      </p>

      <form onSubmit={handleSubmit} className="book-form">
        <label>
          Select Service *
          <select
            value={selectedService}
            onChange={(e) => {
              const selected = services.find((s) => s.name === e.target.value);
              setSelectedService(selected.name);
              setSelectedPrice(selected.price);
            }}
            required
          >
            <option value="">Select a service</option>
            {services.map((s, index) => (
              <option key={index} value={s.name}>
                {s.name} – £{s.price}
              </option>
            ))}
          </select>
        </label>

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
          <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required>
            <option value="">Select a time slot</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </label>

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
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>

        <label>
          Additional Notes (Optional)
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>

        <div className="booking-summary">
          <h3>Booking Summary</h3>
          <p>
            <strong>Service:</strong>{" "}
            {selectedService ? `${selectedService} – £${selectedPrice}` : "Not selected"}
          </p>
          <p>
            <strong>Price:</strong> {selectedPrice ? `£${selectedPrice}` : "–"}
          </p>
          <p>
            <strong>Date:</strong> {date || "Not selected"}
          </p>
          <p>
            <strong>Time Slot:</strong> {timeSlot || "Not selected"}
          </p>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </form>
    </div>
  );
}

export default Book;
