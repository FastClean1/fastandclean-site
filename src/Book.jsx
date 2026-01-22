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
    return (
      quote?.serviceName ||
      quote?.service ||
      quote?.title ||
      "Cleaning Service"
    );
  }, [quote]);

  const price = useMemo(() => {
    // prova a leggere vari formati
    const p =
      quote?.price ??
      quote?.total ??
      quote?.amount ??
      quote?.finalPrice ??
      0;

    // se è stringa tipo "£120" => estrai numero
    if (typeof p === "string") {
      const num = Number(p.replace(/[^0-9.]/g, ""));
      return Number.isFinite(num) ? num : 0;
    }

    return Number.isFinite(p) ? Number(p) : 0;
  }, [quote]);

  async function handlePay(e) {
    e.preventDefault();
    setErrMsg("");

    if (!quote) {
      setErrMsg("Missing quote data. Go back to Quote and try again.");
      return;
    }

    if (!fullName || !email || !phone || !address || !date || !timeSlot) {
      setErrMsg("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const bookingData = {
        fullName,
        email,
        phone,
        address,
        date,
        timeSlot,
        notes: notes || "-",
        serviceName,
        price,
        // puoi aggiungere altri campi del quote se ti servono
        quote: quote || {},
      };

      // ✅ SALVA PRIMA di andare su Stripe
      localStorage.setItem("bookingData", JSON.stringify(bookingData));

      const res = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // ✅ la function deve ricevere "booking"
        body: JSON.stringify({ booking: bookingData }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrMsg(data?.error || "Checkout session error.");
        setLoading(false);
        return;
      }

      const checkoutUrl = data?.url || data?.checkoutUrl;
      if (!checkoutUrl) {
        setErrMsg("Checkout URL missing in response.");
        setLoading(false);
        return;
      }

      window.location.href = checkoutUrl;
    } catch (err) {
      setErrMsg(err?.message || "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 650, margin: "30px auto", padding: 16 }}>
      <h2>Booking Details</h2>

      {!quote ? (
        <div style={{ padding: 12, background: "#ffecec", borderRadius: 8 }}>
          Missing quote data. Go back to Quote and try again.
        </div>
      ) : (
        <div style={{ padding: 12, background: "#f6f6f6", borderRadius: 8 }}>
          <b>Service:</b> {serviceName} <br />
          <b>Price:</b> £{price}
        </div>
      )}

      <form onSubmit={handlePay} style={{ marginTop: 16 }}>
        <label>Full name *</label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={{ width: "100%", padding: 10, margin: "6px 0 12px" }}
          required
        />

        <label>Email *</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          style={{ width: "100%", padding: 10, margin: "6px 0 12px" }}
          required
        />

        <label>Phone *</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: "100%", padding: 10, margin: "6px 0 12px" }}
          required
        />

        <label>Address *</label>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: "100%", padding: 10, margin: "6px 0 12px" }}
          required
        />

        <label>Date *</label>
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="DD/MM/YYYY"
          style={{ width: "100%", padding: 10, margin: "6px 0 12px" }}
          required
        />

        <label>Time slot *</label>
        <input
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          placeholder="Morning: 9:00 AM – 2:00 PM"
          style={{ width: "100%", padding: 10, margin: "6px 0 12px" }}
          required
        />

        <label>Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ width: "100%", padding: 10, margin: "6px 0 12px" }}
          rows={4}
        />

        {errMsg ? (
          <div style={{ color: "crimson", marginBottom: 10 }}>
            {errMsg}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading || !quote}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "none",
            background: "#1d4ed8",
            color: "white",
            fontSize: 16,
            cursor: "pointer",
          }}
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