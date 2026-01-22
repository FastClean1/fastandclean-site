import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import emailjs from "@emailjs/browser";

export default function Success() {
  const [params] = useSearchParams();
  const [status, setStatus] = useState("Processing payment result...");
  const [details, setDetails] = useState(null);

  // Stripe usually returns session_id on success redirect
  const sessionId = params.get("session_id") || params.get("sessionId") || "";

  // Read booking from storage (same browser/session)
  const booking = useMemo(() => {
    try {
      const raw = localStorage.getItem("bookingData");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    // If we cannot read booking data, we still show success but can't email
    if (!booking) {
      setStatus(
        "Payment successful. (No booking data found in this browser session to email automatically.)"
      );
      setDetails(null);
      return;
    }

    // Avoid resending email if user refreshes Success page
    const sentKey = sessionId
      ? `emailSentForSession:${sessionId}`
      : "emailSentForSession:no-session";
    const alreadySent = localStorage.getItem(sentKey) === "1";
    if (alreadySent) {
      setStatus("Payment successful. Confirmation email already sent.");
      setDetails({
        service: booking.serviceName || "-",
        date: booking.date || "-",
        time: booking.timeSlot || "-",
        total: booking.price || "-",
        customer: `${booking.fullName || "-"} (${booking.email || "-"})`,
      });
      return;
    }

    // --------- ENV VARS (Vite) ----------
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const missing = [];
    if (!SERVICE_ID) missing.push("VITE_EMAILJS_SERVICE_ID");
    if (!TEMPLATE_ID) missing.push("VITE_EMAILJS_TEMPLATE_ID");
    if (!PUBLIC_KEY) missing.push("VITE_EMAILJS_PUBLIC_KEY");

    // Build details for UI
    const uiDetails = {
      service: booking.serviceName || "—",
      date: booking.date || "—",
      time: booking.timeSlot || "—",
      total: booking.price ? `£${booking.price}` : "—",
      customer: `${booking.fullName || "—"} (${booking.email || "—"})`,
    };
    setDetails(uiDetails);

    if (missing.length) {
      setStatus(
        `Payment successful. Missing EmailJS env vars (${missing.join(" / ")}).`
      );
      return;
    }

    // --------- ✅ NEW TEMPLATE PARAMS (MATCH TEMPLATE) ----------
    // Template uses: {{email}}, {{service}}, {{booking_date}}, {{booking_time}}, {{address}}, {{full_name}}, {{phone}} (+ optional others)
    const templateParams = {
      email: booking.email || "",
      service: booking.serviceName || "",
      booking_date: booking.date || "",
      booking_time: booking.timeSlot || "",
      address: booking.address || "",
      full_name: booking.fullName || "",
      phone: booking.phone || "",
      price: booking.price || "",
      notes: booking.notes || "-",
      session_id: sessionId || "-",
    };

    // If recipient email missing, don't attempt send
    if (!templateParams.email) {
      setStatus(
        "Payment successful, but email failed to send. (EmailJS error) The recipients address is empty."
      );
      return;
    }

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
  }, [booking, sessionId]);

  return (
    <div className="booking-container">
      <h1 className="booking-title">Payment successful</h1>

      <div className="booking-summary">
        <h2 style={{ marginTop: 0 }}>Status</h2>
        <p>{status}</p>

        {details && (
          <>
            <hr style={{ margin: "16px 0" }} />
            <p>
              <strong>Service:</strong> {details.service}
            </p>
            <p>
              <strong>Date:</strong> {details.date} · <strong>Time:</strong>{" "}
              {details.time}
            </p>
            <p>
              <strong>Total:</strong> {details.total}
            </p>
            <p>
              <strong>Customer:</strong> {details.customer}
            </p>
          </>
        )}

        <Link to="/" className="btn-primary" style={{ marginTop: 16 }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}