import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

export default function Book() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);

  // -----------------------------
  // Read values coming from /quote
  // -----------------------------
  const serviceKey = params.get("serviceKey") || "";
  const serviceName = params.get("serviceName") || "Service";
  const price = Number(params.get("price") || 0);

  // Optional extras coming from Quote.jsx (kept for email/summary)
  const propertyType = params.get("propertyType") || "";
  const bedrooms = params.get("bedrooms") || "";
  const bathrooms = params.get("bathrooms") || "";
  const extraLivingRooms = params.get("extraLivingRooms") || "";
  const additionalRooms = params.get("additionalRooms") || "";
  const basePrice = params.get("basePrice") || "";
  const additionalCost = params.get("additionalCost") || "";

  const ovenType = params.get("ovenType") || "";
  const ovenLabel = params.get("ovenLabel") || "";

  const hours = params.get("hours") || "";
  const rate = params.get("rate") || "";

  // -----------------------------
  // Booking form state
  // -----------------------------
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning: 9:00 AM – 2:00 PM");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -----------------------------
  // Helpers
  // -----------------------------
  const validate = () => {
    if (!fullName.trim()) return "Full name is required.";
    if (!email.trim()) return "Email is required.";
    if (!phone.trim()) return "Phone is required.";
    if (!address.trim()) return "Address is required.";
    if (!date) return "Date is required.";
    if (!price || Number.isNaN(price)) return "Price is missing. Go back and try again.";
    return "";
  };

  // -----------------------------
  // ✅ PAY: Save bookingData BEFORE redirecting to Stripe
  // -----------------------------
  const startCheckout = async () => {
    setError("");
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    setLoading(true);

    try {
      // ✅ This is THE fix: persist booking data before leaving to Stripe
      const bookingData = {
        // customer
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),

        // booking
        date,
        timeSlot,
        notes: notes?.trim() || "-",

        // service
        serviceKey,
        serviceName,
        price: String(price),

        // optional details (for nicer emails)
        propertyType,
        bedrooms,
        bathrooms,
        extraLivingRooms,
        additionalRooms,
        basePrice,
        additionalCost,

        ovenType,
        ovenLabel,

        hours,
        rate,
      };

      localStorage.setItem("bookingData", JSON.stringify(bookingData));

      // Create Stripe checkout session (Netlify function)
      const res = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceKey,
          serviceName,
          price,
          // success/cancel handled by your function or Stripe session config
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to create checkout session.");
      }

      if (!data?.url) {
        throw new Error("Checkout URL missing from server response.");
      }

      // Redirect to Stripe
      window.location.href = data.url;
    } catch (e) {
      console.error(e);
      setError(e?.message || "Something went wrong.");
      setLoading(false);
    }
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="booking-container">
      <h1 className="booking-title">Booking</h1>

      <p className="section-subtitle" style={{ textAlign: "left" }}>
        <strong>Service:</strong> {serviceName}
        <br />
        <strong>Total:</strong> £{price}
      </p>

      <div className="booking-form">
        <label>Full Name *</label>
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name" />

        <label>Email *</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />

        <label>Phone *</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" />

        <label>Address *</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full address" />

        <label>Date *</label>
        <input value={date} onChange={(e) => setDate(e.target.value)} type="date" />

        <label>Time Slot *</label>
        <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
          <option>Morning: 9:00 AM – 2:00 PM</option>
          <option>Afternoon: 3:00 PM – 7:00 PM</option>
          <option>Evening: 7:00 PM – 10:00 PM</option>
        </select>

        <label>Notes (optional)</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything we should know?" />
      </div>

      {error ? (
        <div style={{ marginTop: 12, color: "#b91c1c", fontSize: 14 }}>
          <strong>Error:</strong> {error}
        </div>
      ) : null}

      <div className="booking-summary">
        <h2 style={{ marginTop: 0 }}>Summary</h2>
        <p>
          <strong>Service:</strong> {serviceName}
        </p>
        <p>
          <strong>Total price:</strong> £{price}
        </p>

        <button className="btn-primary full-width" onClick={startCheckout} disabled={loading}>
          {loading ? "Redirecting to payment..." : "Pay & Confirm Booking"}
        </button>

        <div style={{ marginTop: 12, fontSize: 13, color: "#6b7280" }}>
          <Link to={`/quote?service=${encodeURIComponent(serviceKey || "deep")}`}>← Back to Quote</Link>
          {" · "}
          <Link to="/">Home</Link>
        </div>
      </div>
    </div>
  );
}