import React, { useState, useEffect } from "react";

const services = [
  { name: "Trial Cleaning", price: 40 },
  { name: "House Cleaning", price: 95 },
  { name: "Office Cleaning", price: 120 },
  { name: "Garden Maintenance", price: 65 },
  { name: "Landscaping", price: 160 },
  { name: "Handyman Repairs", price: 80 },
];

// QUI incolli i TUOI link Stripe (uno per servizio)
const paymentLinks = {
  "Trial Cleaning": "https://buy.stripe.com/XXX_TRIAL",          // <- sostituisci
  "House Cleaning": "https://buy.stripe.com/XXX_HOUSE",          // <- sostituisci
  "Office Cleaning": "https://buy.stripe.com/XXX_OFFICE",        // <- sostituisci
  "Garden Maintenance": "https://buy.stripe.com/XXX_GARDEN",     // <- sostituisci
  "Landscaping": "https://buy.stripe.com/XXX_LANDSCAPING",       // <- sostituisci
  "Handyman Repairs": "https://buy.stripe.com/XXX_HANDYMAN",     // <- sostituisci
};

export default function Book() {
  const searchParams = new URLSearchParams(window.location.search);
  const initialService = searchParams.get("service") || services[0].name;
  const initialPrice =
    Number(searchParams.get("price")) ||
    services.find((s) => s.name === initialService)?.price ||
    services[0].price;

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

  // Se arrivi da ?service=...&price=...
  useEffect(() => {
    const s = searchParams.get("service");
    const p = Number(searchParams.get("price"));
    if (s && services.find((x) => x.name === s)) {
      setSelectedService(s);
      setSelectedPrice(p || services.find((x) => x.name === s).price);
    }
  }, []);

  const handleServiceChange = (e) => {
    const name = e.target.value;
    const service = services.find((s) => s.name === name);
    setSelectedService(name);
    setSelectedPrice(service ? service.price : 0);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setError("");

    if (!selectedService || !selectedPrice || !fullName || !email || !phone || !date || !timeSlot || !address) {
      setError("Please fill all required fields before proceeding to payment.");
      return;
    }

    const url = paymentLinks[selectedService];

    if (!url) {
      setError("Payment link not configured for this service.");
      return;
    }

    // (Opzionale: qui potresti salvare la prenotazione via email/webhook in futuro)

    window.location.href = url;
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "24px",
        backgroundColor: "#f7f9fc",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "8px",
          fontSize: "28px",
          fontWeight: "700",
          color: "#102a43",
        }}
      >
        Book Your Service
      </h1>
      <p
        style={{
          textAlign: "center",
          marginBottom: "24px",
          color: "#5a7184",
        }}
      >
        Choose your service, pick a date and time, and then complete your
        secure payment on Stripe.
      </p>

      <form onSubmit={handlePayment}>
        {/* Service + Date */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <div>
            <label className="book-label">Select Service *</label>
            <select
              className="book-input"
              value={selectedService}
              onChange={handleServiceChange}
            >
              {services.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name} – £{s.price}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="book-label">Preferred Date *</label>
            <input
              type="date"
              className="book-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Time Slot */}
        <div style={{ marginBottom: "16px" }}>
          <label className="book-label">Preferred Time Slot *</label>
          <select
            className="book-input"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
          >
            <option value="">Select a time slot</option>
            <option>Morning: 9:00 AM – 2:00 PM</option>
            <option>Afternoon: 3:00 PM – 7:00 PM</option>
          </select>
        </div>

        {/* Name + Phone */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <div>
            <label className="book-label">Full Name *</label>
            <input
              className="book-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="book-label">Phone Number *</label>
            <input
              className="book-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div style={{ marginBottom: "16px" }}>
          <label className="book-label">Email Address *</label>
          <input
            type="email"
            className="book-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Address */}
        <div style={{ marginBottom: "16px" }}>
          <label className="book-label">Service Address *</label>
          <input
            className="book-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        {/* Notes */}
        <div style={{ marginBottom: "24px" }}>
          <label className="book-label">
            Additional Notes (Optional)
          </label>
          <textarea
            className="book-input"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Summary */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "16px",
            border: "1px solid #e1e7f0",
          }}
        >
          <h2
            style={{
              margin: "0 0 12px",
              fontSize: "20px",
              fontWeight: "700",
              color: "#102a43",
            }}
          >
            Booking Summary
          </h2>
          <p>
            <strong>Service:</strong> {selectedService} – £{selectedPrice}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {date || "Please select a date"}
          </p>
          <p>
            <strong>Time Slot:</strong>{" "}
            {timeSlot || "Please select a time slot"}
          </p>
        </div>

        {/* Error */}
        {error && (
          <p
            style={{
              color: "#d93025",
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}

        {/* Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "999px",
            fontSize: "16px",
            fontWeight: "600",
            backgroundColor: "#007bff",
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}