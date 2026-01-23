import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import emailjs from "@emailjs/browser";

export default function Success() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id") || "-";

  const [status, setStatus] = useState("Payment successful. Preparing confirmation email…");
  const [sent, setSent] = useState(false);

  // 🔧 EMAILJS CONFIG
  const SERVICE_ID = "service_erxcip9"; // ✅ NUOVO SERVICE ID
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID; // metti questo in Netlify/Vite env
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;   // metti questo in Netlify/Vite env

  const booking = useMemo(() => {
    try {
      const raw = localStorage.getItem("bookingData");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    // evita doppio invio se ricarichi la pagina
    const alreadySentForSession = localStorage.getItem("emailSentForSession");
    if (alreadySentForSession === sessionId) {
      setStatus("Payment successful. Confirmation email already sent for this session.");
      setSent(true);
      return;
    }

    if (!booking) {
      setStatus("Payment successful. (No booking data found in this browser session to email automatically.)");
      return;
    }

    if (!booking.email) {
      setStatus("Payment successful, but email failed to send. Missing customer email in booking data.");
      return;
    }

    if (!TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("Payment successful, but email failed to send. Missing EmailJS env variables (TEMPLATE_ID / PUBLIC_KEY).");
      return;
    }

    // ✅ QUESTE CHIAVI DEVONO MATCHARE IL TUO TEMPLATE:
    // To Email = {{email}}
    // Testo: {{full_name}}, {{service}}, {{booking_date}}, {{booking_time}}, {{address}}
    const templateParams = {
      email: booking.email,                        // ✅ IMPORTANTISSIMO: deve chiamarsi "email"
      full_name: booking.fullName || "-",          // template: {{full_name}}
      service: booking.serviceName || "-",         // template: {{service}}
      booking_date: booking.date || "-",           // template: {{booking_date}}
      booking_time: booking.timeSlot || "-",       // template: {{booking_time}}
      address: booking.address || "-",             // template: {{address}}

      // extra (se li usi nel template o ti servono dopo)
      phone: booking.phone || "-",
      price: booking.price != null ? String(booking.price) : "-",
      notes: booking.notes || "-",
      session_id: sessionId || "-",
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY })
      .then(() => {
        localStorage.setItem("emailSentForSession", sessionId);
        setStatus("Payment successful. Confirmation email sent to the customer.");
        setSent(true);
      })
      .catch((err) => {
        setStatus(
          "Payment successful, but email failed to send. (EmailJS error) " +
            (err?.text || err?.message || "Unknown error")
        );
      });
  }, [booking, sessionId, TEMPLATE_ID, PUBLIC_KEY]);

  return (
    <div className="booking-container">
      <h1 className="booking-title">Payment successful</h1>

      <div className="booking-summary">
        <h2 style={{ marginTop: 0 }}>Status</h2>
        <p>{status}</p>

        {booking && (
          <>
            <hr style={{ margin: "16px 0" }} />
            <p><strong>Service:</strong> {booking.serviceName} (£{booking.price})</p>
            <p><strong>Date:</strong> {booking.date} · <strong>Time:</strong> {booking.timeSlot}</p>
            <p><strong>Customer:</strong> {booking.fullName} ({booking.email})</p>
          </>
        )}

        <div style={{ marginTop: 16 }}>
          <Link className="btn-primary" to="/">Back to Home</Link>
        </div>

        {/* opzionale: debug veloce */}
        {!sent && (
          <div style={{ marginTop: 12, fontSize: 12, opacity: 0.8 }}>
            Session ID: {sessionId}
          </div>
        )}
      </div>
    </div>
  );
}