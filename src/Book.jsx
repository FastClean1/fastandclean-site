// src/Book.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "./book.css";

export default function Book() {
  const [searchParams] = useSearchParams();

  // Leggo servizio/prezzo dall'URL (?service=...&price=...)
  const initialService = searchParams.get("service") || "Select a service";
  const initialPrice = searchParams.get("price") || "";

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
  const [loading, setLoading] = useState(false);

  // Se uno arriva sulla pagina senza parametri, non esplodiamo
  useEffect(() => {
    if (!initialService || initialService === "Select a service") {
      setSelectedService("Trial Cleaning - £40");
      setSelectedPrice("40");
    }
  }, [initialService]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !selectedService ||
      !selectedPrice ||
      !fullName ||
      !email ||
      !phone ||
      !date ||
      !timeSlot ||
      !address
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/.netlify/functions/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service: `${selectedService}`,
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

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url; // manda il cliente su Stripe
      } else {
        console.error("Stripe error:", data);
        setError("Payment error. Please try again later.");
      }
    } catch (err) {
      console.error("Request error:", err);
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-page">
      {/* Header semplice con link home */}
      <header className="book-header">
        <div className="book-logo">
          <Link to="/">Fast &amp; Clean Ltd</Link>
        </div>
        <div className="book-menu">
          <select
            onChange={(e) => {
              const val = e.target.value;
              if (val) window.location.href = val;
            }}
            defaultValue=""
          >
            <option value="" disabled>
              Menu
            </option>
            <option value="/">Home</option>
            <option value="/#services">Services</option>
            <option value="/book">Book Online</option>
            <option value="/#contact">Contact</option>
          </select>
        </div>
      </header>

      <main className="book-container">
        <section className="book-intro">
          <h1>Book Your Service</h1>
          <p>
            Choose your preferred service, date and time slot. Only one booking
            per day is available to guarantee top quality.
          </p>
        </section>

        <form className="book-form" onSubmit={handleSubmit}>
          {/* SERVICE + PRICE */}
          <div className="form-group">
            <label>Select Service *</label>
            <select
              value={selectedService}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedService(value);
                const priceMatch = value.match(/£(\d+)/);
                setSelectedPrice(priceMatch ? priceMatch[1] : "");
              }}
              required
            >
              <option value="Trial Cleaning - £40">Trial Cleaning - £40</option>
              <option value="House Cleaning - £95">
                House Cleaning - £95
              </option>
              <option value="Office Cleaning - £120">
                Office Cleaning - £120
              </option>
              <option value="Garden Maintenance - £65">
                Garden Maintenance - £65
              </option>
              <option value="Landscaping - £160">
                Landscaping - £160
              </option>
              <option value="Handyman Repairs - £80">
                Handyman Repairs - £80
              </option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Preferred Date *</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Preferred Time Slot *</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                required
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
          </div>

          {/* CUSTOMER INFO */}
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

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Service Address *</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street, city, postcode"
              required
            />
          </div>

          <div className="form-group">
            <label>Additional Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Access details, parking info, special requests..."
            />
          </div>

          {/* BOOKING SUMMARY */}
          <section className="booking-summary">
            <h2>Booking Summary</h2>
            <p>
              <strong>Service:</strong> {selectedService || "-"}
            </p>
            <p>
              <strong>Price:</strong>{" "}
              {selectedPrice ? `£${selectedPrice}` : "-"}
            </p>
            <p>
              <strong>Date:</strong> {date || "-"}
            </p>
            <p>
              <strong>Time Slot:</strong> {timeSlot || "-"}
            </p>
          </section>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="primary-btn full-width"
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </form>
      </main>
    </div>
  );
}