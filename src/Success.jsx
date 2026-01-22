import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import emailjs from "@emailjs/browser";

export default function Success() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id") || "";

  const [status, setStatus] = useState("Sending confirmation email...");
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const bookingRaw = sessionStorage.getItem("lastBooking");
    const booking = bookingRaw ? JSON.parse(bookingRaw) : null;
    setDetails(booking);

    if (!booking) {
      setStatus(
        "Payment successful. (No booking data found in this browser session to email automatically.)"
      );
      return;
    }

    // Evita doppi invii se l’utente ricarica la pagina
    const sentKey = localStorage.getItem("emailSentForSession");
    if (sentKey && sentKey === sessionId) {
      setStatus("Payment successful. Confirmation email already sent.");
      return;
    }

    // EmailJS env (Vite) -> Netlify env: VITE_EMAILJS_SERVICE_ID ecc.
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus(
        "Payment successful. Missing EmailJS env vars (VITE_EMAILJS_SERVICE_ID / VITE_EMAILJS_TEMPLATE_ID / VITE_EMAILJS_PUBLIC_KEY)."
      );
      return;
    }

    const templateParams = {
      to_email: booking.email,
      customer_name: booking.fullName,
      phone: booking.phone,
      address: booking.address,
      service_name: booking.serviceName,
      date: booking.date,
      time: booking.timeSlot,
      price: booking.price,
      notes: booking.notes || "-",
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
    <div className="booking-container">
      <h1 className="booking-title">Payment successful</h1>

      <div className="booking-summary">
        <h2 style={{ marginTop: 0 }}>Status</h2>
        <p>{status}</p>

        {details && (
          <>
            <hr style={{ margin: "14px 0" }} />
            <p>
              <strong>Service:</strong> {details.serviceName}
            </p>
            <p>
              <strong>Date:</strong> {details.date} · <strong>Time:</strong> {details.timeSlot}
            </p>
            <p>
              <strong>Total:</strong> £{details.price}
            </p>
            <p>
              <strong>Customer:</strong> {details.fullName} ({details.email})
            </p>
          </>
        )}

        <div style={{ marginTop: 14 }}>
          <Link className="btn-primary" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}