import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Book() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning: 9:00 AM – 2:00 PM");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // ✅ Quote: prima da querystring, se manca fallback da localStorage
  const quote = useMemo(() => {
    const serviceKey = params.get("serviceKey");
    const serviceName = params.get("serviceName");
    const price = params.get("price");

    if (serviceKey && serviceName && price) {
      // prendi tutto ciò che è passato in query
      const obj = {};
      for (const [k, v] of params.entries()) obj[k] = v;
      obj.price = Number(obj.price);
      return obj;
    }

    // fallback: localStorage
    try {
      const raw = localStorage.getItem("quoteData");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, [params]);

  // Se la quote arriva da querystring, la persistiamo (così Book non dipende dal flusso)
  useEffect(() => {
    if (quote) {
      localStorage.setItem("quoteData", JSON.stringify(quote));
    }
  }, [quote]);

  const canPay =
    !!quote &&
    fullName.trim() &&
    email.trim() &&
    phone.trim() &&
    address.trim() &&
    date.trim() &&
    timeSlot.trim();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");

    if (!quote) {
      setErrMsg("Missing quote data. Go back to Quote and try again.");
      return;
    }

    if (!canPay) {
      setErrMsg("Please fill all required fields.");
      return;
    }

    const bookingData = {
      // quote
      serviceKey: quote.serviceKey || quote.servicekey || quote.service || "unknown",
      serviceName: quote.serviceName || quote.servicename || quote.service || "Service",
      price: Number(quote.price || 0),

      // customer
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      date: date.trim(),
      timeSlot: timeSlot.trim(),
      notes: (notes || "").trim(),

      // extra
      createdAt: new Date().toISOString(),
    };

    // ✅ salva PRIMA di Stripe
    localStorage.setItem("bookingData", JSON.stringify(bookingData));

    setLoading(true);
    try {
      const res = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking: bookingData }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || `Checkout error (${res.status})`);
      }

      if (!data?.url) {
        throw new Error("Missing Stripe checkout URL");
      }

      // ✅ redirect a Stripe
      window.location.href = data.url;
    } catch (err) {
      setLoading(false);
      setErrMsg(String(err?.message || err));
    }
  };

  return (
    <div className="booking-container">
      <h1 className="booking-title">Booking Details</h1>

      {!quote && (
        <div
          style={{
            background: "#fee2e2",
            border: "1px solid #fecaca",
            padding: 12,
            borderRadius: 8,
            marginBottom: 12,
            color: "#7f1d1d",
          }}
        >
          Missing quote data. Go back to Quote and try again.
        </div>
      )}

      {errMsg && (
        <div
          style={{
            background: "#fff7ed",
            border: "1px solid #fed7aa",
            padding: 12,
            borderRadius: 8,
            marginBottom: 12,
            color: "#9a3412",
          }}
        >
          {errMsg}
        </div>
      )}

      <form className="booking-form" onSubmit={onSubmit}>
        <label>Full name *</label>
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} />

        <label>Email *</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Phone *</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label>Address *</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} />

        <label>Date *</label>
        <input
          placeholder="DD/MM/YYYY"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Time slot *</label>
        <input value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} />

        <label>Notes</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />

        <button
          className="btn-primary full-width"
          type="submit"
          disabled={!canPay || loading}
          style={{ opacity: !canPay || loading ? 0.6 : 1 }}
        >
          {loading ? "Redirecting to payment..." : "Pay & Confirm"}
        </button>

        <div style={{ marginTop: 10, fontSize: 14 }}>
          ←{" "}
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/quote")}
          >
            Back to Quote
          </span>{" "}
          ·{" "}
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/")}
          >
            Cancel and go Home
          </span>
        </div>
      </form>
    </div>
  );
}