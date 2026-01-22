import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import emailjs from "@emailjs/browser";

export default function Success() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const sessionId = useMemo(() => params.get("session_id") || "-", [params]);

  const [status, setStatus] = useState("Payment successful.");
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    // 1) prendi bookingData dal localStorage
    const raw = localStorage.getItem("bookingData");
    const parsed = raw ? JSON.parse(raw) : null;
    setBooking(parsed);

    if (!parsed) {
      setStatus(
        "Payment successful. (No booking data found in this browser session to email automatically.)"
      );
      return;
    }

    // evita doppio invio per lo stesso session_id
    const already = localStorage.getItem("emailSentForSession");
    if (already && already === sessionId) {
      setStatus("Payment successful. Confirmation email already sent.");
      return;
    }

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus(
        "Payment successful. Missing EmailJS env vars (VITE_EMAILJS_SERVICE_ID / VITE_EMAILJS_TEMPLATE_ID / VITE_EMAILJS_PUBLIC_KEY)."
      );
      return;
    }

    // 2) template params coerenti col tuo template EmailJS
    const templateParams = {
      email: parsed.email,                 // To Email = {{email}}
      full_name: parsed.fullName,
      phone: parsed.phone,
      address: parsed.address,
      service: parsed.serviceName,
      booking_date: parsed.date,
      booking_time: parsed.timeSlot,
      notes: parsed.notes || "-",
      price: parsed.price != null ? `£${parsed.price}` : "-",
      session_id: sessionId || "-",
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY })
      .then(() => {
        localStorage.setItem("emailSentForSession", sessionId);
        setStatus("Payment successful. Confirmation email sent to the customer.");
      })
      .catch((err) => {
        setStatus(
          "Payment successful, but email failed to send. (EmailJS error) " +
            (err?.text || err?.message || "")
        );
      });
  }, [sessionId]);

  return (
    <div style={{ maxWidth: 900, margin: "30px auto", padding: 16 }}>
      <h2>Payment successful</h2>

      <div
        style={{
          marginTop: 12,
          background: "#f6f6f6",
          padding: 16,
          borderRadius: 12,
        }}
      >
        <h3>Status</h3>
        <div style={{ marginBottom: 12 }}>{status}</div>

        {booking ? (
          <div style={{ borderTop: "1px solid #ddd", paddingTop: 12 }}>
            <div><b>Service:</b> {booking.serviceName} (£{booking.price})</div>
            <div><b>Date:</b> {booking.date} · <b>Time:</b> {booking.timeSlot}</div>
            <div><b>Total:</b> £{booking.price}</div>
            <div><b>Customer:</b> {booking.fullName} ({booking.email})</div>
          </div>
        ) : null}

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: 14,
            padding: "10px 16px",
            borderRadius: 10,
            border: "none",
            background: "#1d4ed8",
            color: "white",
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}