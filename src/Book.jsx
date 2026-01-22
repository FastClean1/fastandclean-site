import React, { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function Book() {
  const [params] = useSearchParams();

  // --- Service basics ---
  const serviceKey = params.get("serviceKey") || "";
  const serviceName = params.get("serviceName") || "Service";

  // --- Cleaning fields (optional, shown in summary) ---
  const propertyType = params.get("propertyType") || "";
  const bedrooms = params.get("bedrooms") || "";
  const bathrooms = params.get("bathrooms") || "";
  const extraLivingRooms = params.get("extraLivingRooms") || "";
  const additionalRooms = params.get("additionalRooms") || "";
  const basePrice = params.get("basePrice") || "";
  const additionalCost = params.get("additionalCost") || "";

  // --- Handyman fields (optional) ---
  const hours = params.get("hours") || "";
  const rate = params.get("rate") || "";

  // --- Oven fields (optional) ---
  const ovenLabel = params.get("ovenLabel") || "";
  const ovenType = params.get("ovenType") || "";

  // --- Total price (required) ---
  const price = params.get("price") || "";

  // --- Date + time slot (required) ---
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning: 9:00 AM – 2:00 PM");

  // --- Customer details (required) ---
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Minimum date = today
  const todayISO = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const priceNumber = useMemo(() => {
    const n = Number(price);
    return Number.isFinite(n) ? n : 0;
  }, [price]);

  const renderServiceSummary = () => {
    if (serviceKey === "handyman") {
      return (
        <>
          <p>
            <strong>Service:</strong> {serviceName}
          </p>
          <p>
            <strong>Hours:</strong> {hours} (max 4)
          </p>
          <p>
            <strong>Rate:</strong> £{rate}/hour
          </p>
        </>
      );
    }

    if (serviceKey === "oven") {
      return (
        <>
          <p>
            <strong>Service:</strong> {serviceName}
          </p>
          <p>
            <strong>Oven type:</strong> {ovenLabel || ovenType}
          </p>
        </>
      );
    }

    // Default: cleaning
    return (
      <>
        <p>
          <strong>Service:</strong> {serviceName}
        </p>
        <p>
          <strong>Property:</strong> {propertyType} · {bedrooms} bed · {bathrooms} bath ·{" "}
          {extraLivingRooms} extra living
        </p>
        <p>
          <strong>Base price:</strong> £{basePrice}
        </p>
        <p>
          <strong>Additional rooms:</strong> {additionalRooms} ·{" "}
          <strong>Additional cost:</strong> £{additionalCost}
        </p>
      </>
    );
  };

  const proceedToStripe = async () => {
    setError("");

    // Validate required booking fields
    if (!date || !timeSlot || !fullName || !phone || !email || !address) {
      setError("Please fill all required fields including date and time slot.");
      return;
    }

    // Validate price
    if (!priceNumber || priceNumber <= 0) {
      setError("Invalid price. Please go back and generate a quote again.");
      return;
    }

    // Build a single booking payload (saved for Success.jsx to email via EmailJS)
    const booking = {
      serviceKey,
      serviceName,

      // quote details
      propertyType,
      bedrooms,
      bathrooms,
      extraLivingRooms,
      additionalRooms,
      basePrice,
      additionalCost,
      hours,
      rate,
      ovenType,
      ovenLabel,

      // booking details
      price: String(priceNumber),
      date,
      timeSlot,

      // customer details
      fullName,
      phone,
      email,
      address,
      notes,

      createdAt: new Date().toISOString(),
    };

    // Save locally so /success can send EmailJS confirmation
    sessionStorage.setItem("lastBooking", JSON.stringify(booking));

    // Reset “already sent” flag so a new paid session can send an email
    // Success.jsx should set this to the Stripe session_id after sending.
    localStorage.removeItem("emailSentForSession");

    setLoading(true);

    try {
      const res = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking }),
      });

      const data = await res.json();

      if (!res.ok || !data?.url) {
        throw new Error(data?.error || data?.message || "Payment error. Please try again.");
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (e) {
      setLoading(false);
      setError(String(e?.message || e));
    }
  };

  return (
    <div className="booking-container">
      <h1 className="booking-title">Book your service</h1>

      <div className="booking-summary">
        <h2 style={{ marginTop: 0 }}>Booking Summary</h2>

        {renderServiceSummary()}

        <p style={{ marginTop: 10 }}>
          <strong>Total:</strong> £{priceNumber}
        </p>

        <div style={{ marginTop: 10, fontSize: 13, color: "#6b7280" }}>
          <Link to="/quote?service=deep">← Back to quote</Link>
        </div>
      </div>

      <div className="booking-form">
        <label>Preferred Date *</label>
        <input
          type="date"
          min={todayISO}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Preferred Time Slot *</label>
        <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
          <option>Morning: 9:00 AM – 2:00 PM</option>
          <option>Afternoon: 3:00 PM – 7:00 PM</option>
        </select>

        <label>Full Name *</label>
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} />

        <label>Phone Number *</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label>Email Address *</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Service Address *</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} />

        <label>Additional Notes (Optional)</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>

      {error && <div className="booking-error">{error}</div>}

      <button
        className="btn-primary full-width"
        onClick={proceedToStripe}
        style={{ marginTop: 14 }}
        disabled={loading}
      >
        {loading ? "Redirecting to Stripe..." : "Pay deposit / Pay now (Stripe)"}
      </button>
    </div>
  );
}