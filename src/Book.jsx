import React, { useState, useEffect } from "react";
import "./book.css";
import { useLocation } from "react-router-dom";

const SERVICES = [
  { id: "trial", name: "Trial Cleaning", price: 40, duration: "1h service" },
  { id: "house", name: "House Cleaning", price: 95, duration: "3h service" },
  { id: "office", name: "Office Cleaning", price: 120, duration: "2h service" },
  { id: "garden", name: "Garden Maintenance", price: 65, duration: "2h service" },
  { id: "landscaping", name: "Landscaping", price: 160, duration: "4h service" },
  { id: "handyman", name: "Handyman Repairs", price: 80, duration: "2h service" },
];

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Book() {
  const query = useQuery();

  const queryService = query.get("service");
  const queryPrice = query.get("price");

  const initialService =
    SERVICES.find((s) => s.name === queryService) ||
    (queryService && queryPrice
      ? {
          id: "custom",
          name: queryService,
          price: Number(queryPrice),
          duration: "",
        }
      : SERVICES[0]);

  const [service, setService] = useState(initialService);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (queryService) {
      const found =
        SERVICES.find((s) => s.name === queryService) ||
        (queryPrice
          ? {
              id: "custom",
              name: queryService,
              price: Number(queryPrice),
              duration: "",
            }
          : null);
      if (found) setService(found);
    }
  }, [queryService, queryPrice]);

  const handleServiceChange = (e) => {
    const selectedName = e.target.value;
    const found = SERVICES.find((s) => s.name === selectedName);
    if (found) setService(found);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!service || !date || !slot || !fullName || !phone || !email || !address) {
      alert("Please fill in all required fields before proceeding to payment.");
      return;
    }

    // Qui collegherai Stripe Checkout. Per ora mostriamo solo un riepilogo chiaro.
    const summary = `
Service: ${service.name} (£${service.price})
Date: ${date}
Time slot: ${slot}
Name: ${fullName}
Phone: ${phone}
Email: ${email}
Address: ${address}
Notes: ${notes || "-"}
    `.trim();

    alert(
      summary +
        "\n\nOn the next step this page will redirect to a secure Stripe checkout (quando lo configuriamo)."
    );
  };

  return (
    <div className="container">
      <h1>Book Your Service</h1>
      <p
        style={{
          textAlign: "center",
          marginBottom: "25px",
          color: "#555",
          maxWidth: "620px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Choose your preferred service, date and time slot. Only one booking per slot is available
        to guarantee top quality.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Service */}
        <div>
          <label>Select Service *</label>
          <select
            value={service?.name || ""}
            onChange={handleServiceChange}
            required
          >
            {SERVICES.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name} - £{s.price}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label>Preferred Date *</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Time Slot */}
        <div>
          <label>Preferred Time Slot *</label>
          <select
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            required
          >
            <option value="">Select a time slot</option>
            <option value="Morning 9:00 AM - 2:00 PM">
              Morning 9:00 AM - 2:00 PM
            </option>
            <option value="Afternoon 3:00 PM - 7:00 PM">
              Afternoon 3:00 PM - 7:00 PM
            </option>
          </select>
        </div>

        {/* Full Name */}
        <div>
          <label>Full Name *</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label>Email Address *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label>Phone Number *</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {/* Address */}
        <div style={{ gridColumn: "span 2" }}>
          <label>Service Address *</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        {/* Notes */}
        <textarea
          placeholder="Additional notes (access details, parking info, special requests)…"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {/* Submit */}
        <button type="submit">Proceed to Payment</button>
      </form>

      <div className="booking-summary">
        <h3>Booking Summary</h3>
        <p>
          <strong>Service:</strong>{" "}
          {service ? `${service.name} — £${service.price}` : "-"}
        </p>
        <p>
          <strong>Date:</strong> {date || "Select a date"}
        </p>
        <p>
          <strong>Time Slot:</strong> {slot || "Select a time slot"}
        </p>
        <p>
          <strong>Duration:</strong> {service?.duration || "-"}
        </p>
        <p style={{ fontSize: "13px", color: "#666" }}>
          On the next step you’ll be redirected to a secure Stripe payment page to
          complete your booking (lo aggiungiamo dopo).
        </p>
      </div>
    </div>
  );
}
