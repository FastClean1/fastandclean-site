import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Success() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const sessionId = useMemo(() => {
    return params.get("session_id") || params.get("sessionId") || "";
  }, [params]);

  const [status, setStatus] = useState("Payment successful.");
  const [details, setDetails] = useState(null);

  useEffect(() => {
    // 1) prendi booking dal localStorage
    let booking = null;
    try {
      const raw = localStorage.getItem("bookingData");
      booking = raw ? JSON.parse(raw) : null;
    } catch {
      booking = null;
    }

    setDetails(booking);

    if (!booking) {
      setStatus("Payment successful. (No booking data found in this browser session to email automatically.)");
      return;
    }

    // evita doppio invio per la stessa session
    const sentKey = `emailSentForSession:${sessionId || "no-session"}`;
    if (localStorage.getItem(sentKey) === "1") {
      setStatus("Payment successful. Confirmation email already sent.");
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
        localStorage.setItem(sentKey, "1");
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
            <hr />
            <p><strong>Service:</strong> {details.serviceName} (£{details.price})</p>
            <p><strong>Date:</strong> {details.date} · <strong>Time:</strong> {details.timeSlot}</p>
            <p><strong>Customer:</strong> {details.fullName} ({details.email})</p>
          </>
        )}

        <button className="btn-primary" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}