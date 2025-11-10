import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./book.css";

const Book = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const initialService = params.get("service")
    ? decodeURIComponent(params.get("service"))
    : "";
  const initialPrice = params.get("price") || "";

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

  // Se il link cambia (es. scegli un altro servizio) aggiorniamo i campi
  useEffect(() => {
    if (initialService) setSelectedService(initialService);
    if (initialPrice) setSelectedPrice(initialPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!selectedService || !selectedPrice) {
      setError("Please select a service.");
      return;
    }
    if (!fullName || !email || !phone || !date || !timeSlot || !address) {
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

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url; // vai su Stripe
      } else {
        console.error("Stripe error:", data);
        setError("Payment error. Please try again later.");
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <header className="booking-header">
        <Link to="/" className="booking-logo">
          Fast &amp; Clean Ltd
        </Link>
        <div className="booking-menu">
          <span>Menu ▾</span>
          <div className="booking-menu-dropdown">
            <Link to="/">Home</Link>
            <a href="/#services">Services</a>
            <a href="/#contact">Contact</a>
          </div>
        </div>
      </header>

      <main className="booking-main">
        <section className="booking-intro">
          <h1>Book Your Service</h1>
          <p>
            Choose your preferred service, date and time slot. One booking per
            day is available to guarantee top quality.
          </p>
        </section>

        <section className="booking-content">
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Select Service *</label>
              <select
                value={selectedService ? `${selectedService}|||${selectedPrice}` : ""}
                onChange={(e) => {
                  const [service, price] = e.target.value.split("|||");
                  setSelectedService(service || "");
                  setSelectedPrice(price || "");
                }}
                required
              >
                <option value="">Choose a service</option>
                <option value="Trial Cleaning|||40">Trial Cleaning - £40</option>
                <option value="House Cleaning|||95">
                  House Cleaning - £95
                </option>
                <option value="Office Cleaning|||120">
                  Office Cleaning - £120
                </option>
                <option value="Garden Maintenance|||65">
                  Garden Maintenance - £65
                </option>
                <option value="Landscaping|||160">
                  Landscaping - £160
                </option>
                <option value="Handyman Repairs|||80">
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
                required
              />
            </div>

            <div className="form-group">
              <label>Additional Notes (Optional)</label>
              <textarea
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {error && <div className="booking-error">{error}</div>}

            <div className="booking-summary">
              <h2>Booking Summary</h2>
              <p>
                <strong>Service:</strong>{" "}
                {selectedService
                  ? `${selectedService} – £${selectedPrice}`
                  : "Not selected"}
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
            </div>

            <button
              type="submit"
              className="booking-submit"
              disabled={loading}
            >
              {loading ? "Redirecting to Payment..." : "Proceed to Payment"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Book;