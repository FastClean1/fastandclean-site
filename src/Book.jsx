import React, { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function Book() {
  const [params] = useSearchParams();

  const serviceKey = params.get("serviceKey") || "";
  const serviceName = params.get("serviceName") || "Service";

  // Cleaning fields
  const propertyType = params.get("propertyType") || "";
  const bedrooms = params.get("bedrooms") || "";
  const bathrooms = params.get("bathrooms") || "";
  const extraLivingRooms = params.get("extraLivingRooms") || "";
  const additionalRooms = params.get("additionalRooms") || "";
  const basePrice = params.get("basePrice") || "";
  const additionalCost = params.get("additionalCost") || "";

  // Handyman fields
  const hours = params.get("hours") || "";
  const rate = params.get("rate") || "";

  // Oven fields
  const ovenLabel = params.get("ovenLabel") || "";
  const ovenType = params.get("ovenType") || "";

  const price = params.get("price") || "";

  // Date + time slot
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning: 9:00 AM – 2:00 PM");

  // Customer details
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const todayISO = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const renderServiceSummary = () => {
    if (serviceKey === "handyman") {
      return (
        <>
          <p><strong>Service:</strong> {serviceName}</p>
          <p><strong>Hours:</strong> {hours} (max 4)</p>
          <p><strong>Rate:</strong> £{rate}/hour</p>
        </>
      );
    }

    if (serviceKey === "oven") {
      return (
        <>
          <p><strong>Service:</strong> {serviceName}</p>
          <p><strong>Oven type:</strong> {ovenLabel || ovenType}</p>
        </>
      );
    }

    return (
      <>
        <p><strong>Service:</strong> {serviceName}</p>
        <p>
          <strong>Property:</strong> {propertyType} · {bedrooms} bed · {bathrooms} bath ·{" "}
          {extraLivingRooms} extra living
        </p>
        <p><strong>Base price:</strong> £{basePrice}</p>
        <p>
          <strong>Additional rooms:</strong> {additionalRooms} ·{" "}
          <strong>Additional cost:</strong> £{additionalCost}
        </p>
      </>
    );
  };

  const submit = async () => {
    setError("");

    if (!date || !timeSlot || !fullName || !phone || !email || !address) {
      setError("Please fill all required fields including date and time slot.");
      return;
    }

    if (!price || Number(price) <= 0 || Number.isNaN(Number(price))) {
      setError("Invalid price. Please go back and generate a quote again.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: price,
          serviceName,
          date,
          timeSlot,
          customerEmail: email,

          // (facoltativo) dati extra che potrai usare dopo con webhook/logs
          customerName: fullName,
          customerPhone: phone,
          address,
          notes,
          serviceKey,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        setError(data?.error || data?.message || "Payment error. Please try again.");
        setLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (e) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="booking-container">
      <h1 className="booking-title">Book your service</h1>

      <div className="booking-summary">
        <h2 style={{ marginTop: 0 }}>Booking Summary</h2>
        {renderServiceSummary()}
        <p style={{ marginTop: 10 }}><strong>Total:</strong> £{price}</p>
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
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Service Address *</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} />

        <label>Additional Notes (Optional)</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>

      {error && <div className="booking-error">{error}</div>}

      <button
        className="btn-primary full-width"
        onClick={submit}
        style={{ marginTop: 14, opacity: loading ? 0.7 : 1 }}
        disabled={loading}
      >
        {loading ? "Redirecting to Stripe..." : "Pay deposit / Pay now (Stripe)"}
      </button>
    </div>
  );
}