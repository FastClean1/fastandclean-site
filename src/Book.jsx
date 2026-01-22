import React, { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function Book() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const serviceKey = params.get("serviceKey") || params.get("service") || "deep";
  const serviceName = params.get("serviceName") || "Service";
  const price = Number(params.get("price") || 0);

  const summary = useMemo(() => {
    // Mostra qualche dettaglio extra se arrivano da Quote
    const propertyType = params.get("propertyType");
    const bedrooms = params.get("bedrooms");
    const bathrooms = params.get("bathrooms");
    const extraLivingRooms = params.get("extraLivingRooms");
    const ovenLabel = params.get("ovenLabel");
    const hours = params.get("hours");

    const lines = [];

    if (serviceKey === "oven" && ovenLabel) lines.push(`Oven: ${ovenLabel}`);
    if (serviceKey === "handyman" && hours) lines.push(`Hours: ${hours}`);
    if (propertyType) lines.push(`Property: ${propertyType}`);
    if (bedrooms) lines.push(`Bedrooms: ${bedrooms}`);
    if (bathrooms) lines.push(`Bathrooms: ${bathrooms}`);
    if (extraLivingRooms) lines.push(`Extra living rooms: ${extraLivingRooms}`);

    return lines;
  }, [params, serviceKey]);

  // Customer fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning: 9:00 AM – 2:00 PM");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const payNow = async () => {
    setError("");

    if (!fullName || !email || !phone || !address || !date) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!price || Number.isNaN(price) || price <= 0) {
      setError("Invalid price. Go back and generate a quote again.");
      return;
    }

    // ✅ 1) SALVA BOOKINGDATA PRIMA DI STRIPE (questa è la chiave)
    const bookingData = {
      serviceKey,
      serviceName,
      price,
      fullName,
      email,
      phone,
      address,
      date,
      timeSlot,
      notes,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData));

    setLoading(true);

    try {
      // ✅ 2) crea checkout session su Netlify function
      const res = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceKey,
          serviceName,
          amount: price, // in GBP "normal" (la function converte in pence)
          customerEmail: email,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create checkout session");
      }

      const data = await res.json();

      // mi aspetto uno di questi campi dalla tua function:
      const checkoutUrl = data?.url || data?.checkoutUrl;
      if (!checkoutUrl) throw new Error("Checkout URL missing from server response");

      // ✅ 3) vai su Stripe
      window.location.href = checkoutUrl;
    } catch (e) {
      setError(String(e?.message || e));
      setLoading(false);
    }
  };

  return (
    <div className="booking-container">
      <h1 className="booking-title">Booking</h1>

      <p className="section-subtitle" style={{ textAlign: "left" }}>
        Complete your details and proceed to payment.
      </p>

      <div className="booking-form">
        <label>Service</label>
        <input value={serviceName} readOnly />

        <label>Total price</label>
        <input value={`£${price}`} readOnly />

        {summary.length > 0 && (
          <>
            <label>Details</label>
            <div style={{ fontSize: 14, color: "#6b7280" }}>
              {summary.map((x, i) => (
                <div key={i}>• {x}</div>
              ))}
            </div>
          </>
        )}

        <hr style={{ margin: "16px 0", opacity: 0.3 }} />

        <label>Full name *</label>
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} />

        <label>Email *</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />

        <label>Phone *</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label>Address *</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} />

        <label>Date *</label>
        <input value={date} onChange={(e) => setDate(e.target.value)} type="date" />

        <label>Time slot *</label>
        <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
          <option>Morning: 9:00 AM – 2:00 PM</option>
          <option>Afternoon: 3:00 PM – 7:00 PM</option>
        </select>

        <label>Notes</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />

        {error && (
          <div style={{ marginTop: 10, color: "#b91c1c", fontSize: 14 }}>
            {error}
          </div>
        )}

        <button className="btn-primary full-width" onClick={payNow} disabled={loading}>
          {loading ? "Redirecting to payment..." : "Pay & Confirm"}
        </button>

        <div style={{ marginTop: 12, fontSize: 13, color: "#6b7280" }}>
          <Link to={`/quote?service=${encodeURIComponent(serviceKey)}`}>← Back to Quote</Link>
          {" · "}
          <button
            type="button"
            onClick={() => {
              // se vuoi annullare e pulire
              localStorage.removeItem("bookingData");
              navigate("/");
            }}
            style={{
              background: "none",
              border: "none",
              color: "#6b7280",
              textDecoration: "underline",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Cancel and go Home
          </button>
        </div>
      </div>
    </div>
  );
}