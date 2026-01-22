import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import emailjs from "@emailjs/browser";

export default function Success() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id") || params.get("sessionId") || "";

  const [status, setStatus] = useState("Payment successful.");
  const [booking, setBooking] = useState(null);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const bookingFromStorage = useMemo(() => {
    try {
      const raw = localStorage.getItem("bookingData");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    setBooking(bookingFromStorage);

    if (!bookingFromStorage) {
      setStatus("Payment successful. (No booking data found in this browser session to email automatically.)");
      return;
    }

    // evita invii doppi sul refresh
    const alreadySentKey = `emailSentForSession:${sessionId || "no_session_id"}`;
    const alreadySent = localStorage.getItem(alreadySentKey);
    if (alreadySent === "1") {
      setStatus("Payment successful. Confirmation email already sent for this session.");
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus(
        "Payment successful. Missing EmailJS env vars (VITE_EMAILJS_SERVICE_ID / VITE_EMAILJS_TEMPLATE_ID / VITE_EMAILJS_PUBLIC_KEY)."
      );
      return;
    }

    // ✅ PARAMETRI ALLINEATI AL TUO TEMPLATE (quello dello screenshot)
    const templateParams = {
      email: bookingFromStorage.email,
      service: bookingFromStorage.serviceName,
      booking_date: bookingFromStorage.date,
      booking_time: bookingFromStorage.timeSlot,
      address: bookingFromStorage.address,
      full_name: bookingFromStorage.fullName,
      phone: bookingFromStorage.phone,
      price: bookingFromStorage.price,
      notes: bookingFromStorage.notes || "-",
      session_id: sessionId || "-",
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY })
      .then(() => {
        localStorage.setItem(alreadySentKey, "1");
        setStatus("Payment successful. Confirmation email sent to the customer.");
      })
      .catch((err) => {
        setStatus(
          "Payment successful, but email failed to send. (EmailJS error) " +
            (err?.text || err?.message || "")
        );
      });
  }, [SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY, bookingFromStorage, sessionId]);

  return (
    <div className="booking-container">
      <h1 className="booking-title">Payment successful</h1>

      <div className="booking-summary">
        <h2 style={{ marginTop: 0 }}>Status</h2>
        <p>{status}</p>

        {booking && (
          <>
            <hr style={{ margin: "14px 0", opacity: 0.3 }} />
            <p><strong>Service:</strong> {booking.serviceName}</p>
            <p><strong>Date:</strong> {booking.date} · <strong>Time:</strong> {booking.timeSlot}</p>
            <p><strong>Total:</strong> £{booking.price}</p>
            <p><strong>Customer:</strong> {booking.fullName} ({booking.email})</p>
          </>
        )}

        <Link to="/" className="btn-primary" style={{ display: "inline-block", marginTop: 12 }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}