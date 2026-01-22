import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import emailjs from "@emailjs/browser";

export default function Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id") || "";
  const [status, setStatus] = useState("Payment successful. Preparing email…");
  const [booking, setBooking] = useState(null);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const missingEnv = useMemo(() => {
    const missing = [];
    if (!SERVICE_ID) missing.push("VITE_EMAILJS_SERVICE_ID");
    if (!TEMPLATE_ID) missing.push("VITE_EMAILJS_TEMPLATE_ID");
    if (!PUBLIC_KEY) missing.push("VITE_EMAILJS_PUBLIC_KEY");
    return missing;
  }, [SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY]);

  useEffect(() => {
    // 1) read bookingData from localStorage
    const raw = localStorage.getItem("bookingData");
    if (!raw) {
      setStatus(
        "Payment successful. (No booking data found in this browser session to email automatically.)"
      );
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      setBooking(parsed);
    } catch {
      setStatus(
        "Payment successful. (Booking data was corrupted. Cannot email automatically.)"
      );
      return;
    }
  }, []);

  useEffect(() => {
    if (!booking) return;

    // prevent double-send for same Stripe session
    if (sessionId) {
      const sentFor = localStorage.getItem("emailSentForSession");
      if (sentFor === sessionId) {
        setStatus("Payment successful. Confirmation email already sent.");
        return;
      }
    }

    if (missingEnv.length) {
      setStatus(
        `Payment successful. Missing EmailJS env vars (${missingEnv.join(
          " / "
        )}).`
      );
      return;
    }

    // ✅ NEW TEMPLATE PARAMS (exactly what you posted)
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
        if (sessionId) localStorage.setItem("emailSentForSession", sessionId);
        setStatus("Payment successful. Confirmation email sent to the customer.");
      })
      .catch((err) => {
        setStatus(
          "Payment successful, but email failed to send. (EmailJS error) " +
            (err?.text || err?.message || "")
        );
      });
  }, [booking, sessionId, missingEnv, SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY]);

  return (
    <div className="container" style={{ padding: "24px 0" }}>
      <h1>Payment successful</h1>

      <div className="card" style={{ padding: 16 }}>
        <h3 style={{ marginTop: 0 }}>Status</h3>
        <p style={{ marginTop: 6 }}>{status}</p>

        {booking && (
          <>
            <hr style={{ margin: "16px 0" }} />
            <p>
              <strong>Service:</strong> {booking.serviceName}
            </p>
            <p>
              <strong>Date:</strong> {booking.date} · <strong>Time:</strong>{" "}
              {booking.timeSlot}
            </p>
            <p>
              <strong>Total:</strong>{" "}
              {booking.price ? `£${booking.price}` : "—"}
            </p>
            <p>
              <strong>Customer:</strong> {booking.fullName} ({booking.email})
            </p>
          </>
        )}

        <button
          className="btn-primary"
          style={{ marginTop: 14 }}
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}