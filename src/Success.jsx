// src/Success.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import emailjs from "@emailjs/browser";

export default function Success() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const sessionId = params.get("session_id") || "";
  const [status, setStatus] = useState("Processing...");
  const [details, setDetails] = useState(null);

  const booking = useMemo(() => {
    try {
      const raw = localStorage.getItem("bookingData");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    // evita doppio invio email se l’utente refresh-a la pagina
    if (!sessionId) return;
    const sentKey = `emailSentForSession_${sessionId}`;
    if (localStorage.getItem(sentKey)) {
      setStatus("Payment successful. Confirmation email already sent for this session.");
      return;
    }

    if (!booking) {
      setStatus("Payment successful. (No booking data found in this browser session to email automatically.)");
      return;
    }

    // === EmailJS keys (DEVONO essere presenti in Netlify/Vite env) ===
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("Payment successful, but email failed to send. Missing EmailJS environment variables.");
      return;
    }

    // ✅ TEMPLATE PARAMS ALLINEATI AL TEMPLATE CHE HAI IN FOTO
    // Template usa: {{email}}, {{full_name}}, {{service}}, {{booking_date}}, {{booking_time}}, {{address}}
    const templateParams = {
      email: booking.email,                       // -> {{email}}  (TO EMAIL + REPLY TO)
      full_name: booking.fullName,                // -> {{full_name}}
      service: booking.serviceName,               // -> {{service}}
      booking_date: booking.date,                 // -> {{booking_date}}
      booking_time: booking.timeSlot,             // -> {{booking_time}}
      address: booking.address,                   // -> {{address}}

      // opzionali (solo se li aggiungi nel template)
      phone: booking.phone || "",
      price: booking.price ?? "",
      notes: booking.notes || "-",
      session_id: sessionId || "-",
    };

    // debug rapido: deve essere una email vera
    console.log("EmailJS TO:", templateParams.email);

    setDetails({
      serviceName: booking.serviceName,
      price: booking.price,
      date: booking.date,
      timeSlot: booking.timeSlot,
      fullName: booking.fullName,
      email: booking.email,
    });

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY })
      .then(() => {
        localStorage.setItem(sentKey, "1");
        setStatus("Payment successful. Confirmation email sent to the customer.");
      })
      .catch((err) => {
        const msg =
          err?.text ||
          err?.message ||
          (typeof err === "string" ? err : "") ||
          "Unknown EmailJS error";
        setStatus(`Payment successful, but email failed to send. (EmailJS error) ${msg}`);
      });
  }, [sessionId, booking]);

  return (
    <div className="booking-container">
      <h1 className="booking-title">Payment successful</h1>

      <div className="booking-summary">
        <h2 style={{ marginTop: 0 }}>Status</h2>
        <p style={{ marginTop: 8 }}>{status}</p>

        {details && (
          <>
            <hr style={{ margin: "14px 0" }} />
            <p>
              <strong>Service:</strong> {details.serviceName}{" "}
              {details.price !== undefined && details.price !== null ? `(£${details.price})` : ""}
            </p>
            <p>
              <strong>Date:</strong> {details.date} · <strong>Time:</strong> {details.timeSlot}
            </p>
            <p>
              <strong>Customer:</strong> {details.fullName} ({details.email})
            </p>
          </>
        )}

        <button className="btn-primary" style={{ marginTop: 12 }} onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}