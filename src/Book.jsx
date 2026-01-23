import React, { useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Book() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  // ✅ Quote data arrives via querystring from Quote.jsx
  const serviceKey = params.get("serviceKey") || "";
  const serviceName = params.get("serviceName") || "";
  const price = Number(params.get("price") || 0);

  // optional extras from Quote flows (kept for email / internal)
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

  const quoteMissing = useMemo(() => {
    return !serviceKey || !serviceName || !price;
  }, [serviceKey, serviceName, price]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handlePay = async (e) => {
    e.preventDefault();
    setErrMsg("");

    // basic required fields
    if (quoteMissing) {
      setErrMsg("Missing quote data. Go back to Quote and try again.");
      return;
    }
    if (!fullName.trim()) return setErrMsg("Full name is required.");
    if (!email.trim()) return setErrMsg("Email is required.");
    if (!phone.trim()) return setErrMsg("Phone is required.");
    if (!address.trim()) return setErrMsg("Address is required.");
    if (!date.trim()) return setErrMsg("Date is required.");
    if (!timeSlot.trim()) return setErrMsg("Time slot is required.");

    setLoading(true);

    try {
      // ✅ 1) SAVE bookingData BEFORE Stripe redirect
      const bookingData = {
        serviceKey,
        serviceName,
        price,
        // IMPORTANT: must be called exactly `email` for EmailJS template {{email}}
        fullName,
        email,
        phone,
        address,
        date,
        timeSlot,
        notes: notes || "",
        createdAt: new Date().toISOString(),

        // keep extra quote context (optional)
        quote: {
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
        },
      };

      localStorage.setItem("bookingData", JSON.stringify(bookingData));

      // ✅ 2) Create Stripe session (backend expects booking payload)
      const res = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking: bookingData }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrMsg(data?.error || "Checkout failed. Please try again.");
        setLoading(false);
        return;
      }

      if (!data?.url) {
        setErrMsg("Checkout failed: missing Stripe URL.");
        setLoading(false);
        return;
      }

      // ✅ 3) Redirect to Stripe
      window.location.href = data.url;
    } catch (err) {
      setErrMsg(err?.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="booking-container">
      <h1 className="booking-title">Booking Details</h1>

      {quoteMissing && (
        <div
          style={{
            background: "#fee2e2",
            color: "#991b1b",
            padding: "10px 12px",
            borderRadius: 8,
            marginBottom: 12,
            fontSize: 14,
          }}
        >
          Missing quote data. Go back to Quote and try again.
        </div>
      )}

      {!!errMsg && (
        <div
          style={{
            background: "#fee2e2",
            color: "#991b1b",
            padding: "10px 12px",
            borderRadius: 8,
            marginBottom: 12,
            fontSize: 14,
          }}
        >
          {errMsg}
        </div>
      )}

      <form className="booking-form" onSubmit={handlePay}>
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
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Time slot *</label>
        <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
          <option value="">Select…</option>
          <option value="Morning: 9:00 AM – 2:00 PM">Morning: 9:00 AM – 2:00 PM</option>
          <option value="Afternoon: 3:00 PM – 7:00 PM">Afternoon: 3:00 PM – 7:00 PM</option>
        </select>

        <label>Notes</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />

        <div className="booking-summary" style={{ marginTop: 14 }}>
          <p>
            <strong>Service:</strong> {serviceName || "-"}
          </p>
          <p>
            <strong>Total:</strong> £{Number.isFinite(price) ? price : "-"}
          </p>
        </div>

        <button
          className="btn-primary full-width"
          type="submit"
          disabled={loading || quoteMissing}
          style={{ opacity: loading || quoteMissing ? 0.6 : 1 }}
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