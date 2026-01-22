import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Book() {
  const location = useLocation();
  const navigate = useNavigate();

  // Booking data might arrive from Quote via location.state
  const quote = location.state?.quote || null;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const serviceName = useMemo(() => {
    return quote?.serviceName || quote?.service || "Service";
  }, [quote]);

  const price = useMemo(() => {
    // expect quote.price to be like 215 or "£215"
    if (!quote?.price) return "";
    const p = String(quote.price).replace("£", "").trim();
    return p;
  }, [quote]);

  const canSubmit =
    fullName.trim() &&
    email.trim() &&
    phone.trim() &&
    address.trim() &&
    date.trim() &&
    timeSlot.trim();

  async function handlePay(e) {
    e.preventDefault();
    setErrMsg("");

    if (!canSubmit) {
      setErrMsg("Please fill in all required fields.");
      return;
    }

    // Build the payload we will use BOTH for localStorage + serverless function
    const bookingPayload = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      serviceName: serviceName,
      date: date.trim(),
      timeSlot: timeSlot.trim(),
      price: price || "",
      notes: notes?.trim() || "-",
    };

    try {
      setLoading(true);

      // ✅ Save BEFORE redirecting to Stripe
      localStorage.setItem("bookingData", JSON.stringify(bookingPayload));

      // ✅ Send EXACTLY what the function expects: { bookingPayload: {...} }
      const res = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingPayload }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrMsg(data?.error || "Checkout error. Please try again.");
        setLoading(false);
        return;
      }

      if (!data?.url) {
        setErrMsg("Stripe session URL missing. Please try again.");
        setLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      setErrMsg("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ padding: "24px 0" }}>
      <h1>Booking</h1>

      {!quote && (
        <div className="card" style={{ padding: 16, marginBottom: 16 }}>
          <p style={{ margin: 0 }}>
            No quote found. Please go back and generate a quote first.
          </p>
          <button className="btn-outline" onClick={() => navigate("/quote")}>
            Back to Quote
          </button>
        </div>
      )}

      <div className="card" style={{ padding: 16, marginBottom: 16 }}>
        <h3 style={{ marginTop: 0 }}>{serviceName}</h3>
        <p style={{ margin: 0 }}>
          <strong>Price:</strong> {price ? `£${price}` : "—"}
        </p>
      </div>

      <form className="card" style={{ padding: 16 }} onSubmit={handlePay}>
        <h3 style={{ marginTop: 0 }}>Customer details</h3>

        <div className="form-row">
          <label>
            Full name *
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Full name"
            />
          </label>

          <label>
            Email *
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="Email"
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Phone *
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Phone"
            />
          </label>

          <label>
            Address *
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Full address"
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Date *
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              placeholder="DD/MM/YYYY"
            />
          </label>

          <label>
            Time slot *
            <input
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              required
              placeholder="Morning / Afternoon etc."
            />
          </label>
        </div>

        <label>
          Notes
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional notes..."
          />
        </label>

        {errMsg && (
          <div style={{ color: "crimson", marginTop: 12 }}>{errMsg}</div>
        )}

        <button
          className="btn-primary"
          type="submit"
          disabled={loading || !quote}
          style={{ marginTop: 14, width: "100%" }}
        >
          {loading ? "Redirecting..." : "Pay & Confirm"}
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