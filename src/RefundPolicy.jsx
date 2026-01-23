// src/RefundPolicy.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function RefundPolicy() {
  const PHONE_DISPLAY = "07777174561";
  const PHONE_TEL = "+447777174561";
  const WHATSAPP_LINK = "https://wa.me/447777174561";

  return (
    <div className="container" style={{ paddingTop: 28, paddingBottom: 56 }}>
      <div style={{ marginBottom: 16 }}>
        <Link to="/" style={{ textDecoration: "underline" }}>
          ← Back to Home
        </Link>
      </div>

      <h1 className="section-title" style={{ textAlign: "left" }}>
        Refund & Cancellation Policy
      </h1>

      <p className="section-subtitle" style={{ textAlign: "left", marginLeft: 0 }}>
        This policy explains cancellations, rescheduling, complaints and how we handle service issues.
        Booking with Fast & Clean Ltd means you agree to the terms below.
      </p>

      <div className="booking-summary" style={{ background: "#ffffff" }}>
        <h2 style={{ marginTop: 0 }}>Policy (single section)</h2>

        <div style={{ color: "#374151", lineHeight: 1.7, fontSize: 14 }}>
          <p style={{ marginTop: 0 }}>
            <strong>Important:</strong> “Refund policy” does not mean an automatic refund for any complaint.
            Our first solution is always to fix the issue by providing a free re-clean where appropriate.
          </p>

          <h3 style={{ marginTop: 16, marginBottom: 8 }}>1) Cancellations</h3>
          <ul style={{ marginTop: 0 }}>
            <li>
              If you cancel <strong>more than 24 hours</strong> before the booking time, we will deduct{" "}
              <strong>£20</strong> from the amount paid.
            </li>
            <li>
              If you cancel <strong>on the same day</strong> as the booking (including last-minute cancellations),
              we will deduct <strong>£50</strong> from the amount paid.
            </li>
          </ul>

          <h3 style={{ marginTop: 16, marginBottom: 8 }}>2) Rescheduling (changing the date)</h3>
          <ul style={{ marginTop: 0 }}>
            <li>
              You can change your booking date up to <strong>48 hours</strong> before the scheduled date at no cost
              (subject to availability).
            </li>
            <li>
              If you request a date change <strong>within 48 hours</strong> of the booking, either:
              <ul style={{ marginTop: 6 }}>
                <li>a <strong>£20</strong> fee may apply, or</li>
                <li>the booking remains on the originally scheduled date.</li>
              </ul>
            </li>
          </ul>

          <h3 style={{ marginTop: 16, marginBottom: 8 }}>3) Service issues / complaints</h3>
          <ul style={{ marginTop: 0 }}>
            <li>
              After the service is completed, you have <strong>48 hours</strong> to report a problem or complaint.
            </li>
            <li>
              If a valid issue is reported within 48 hours, we will offer a{" "}
              <strong>free second visit (re-clean)</strong> to fix/clean the areas that were not completed properly.
            </li>
            <li>
              If you do not report the issue within the first <strong>48 hours</strong>, we do not issue refunds.
            </li>
            <li>
              Refunds are not provided simply because a customer is unhappy; we must verify the issue and attempt to fix it first.
            </li>
          </ul>

          <h3 style={{ marginTop: 16, marginBottom: 8 }}>4) End of Tenancy (EOT) specific rules</h3>
          <ul style={{ marginTop: 0 }}>
            <li>
              The property must be <strong>empty</strong> and free from personal belongings during an EOT clean.
            </li>
            <li>
              The customer can inspect the property <strong>after</strong> the service is completed, not during the clean.
            </li>
            <li>
              The booking is for the <strong>whole job</strong>, not for a fixed number of hours. Our team may take the time needed to complete the work properly.
            </li>
          </ul>

          <h3 style={{ marginTop: 16, marginBottom: 8 }}>5) Handyman & Oven Cleaning deposits</h3>
          <p style={{ marginTop: 0 }}>
            For handyman and oven cleaning services, the amount paid at booking is treated as a{" "}
            <strong>deposit to secure the slot</strong>. Our team may contact you to confirm details before the visit.
          </p>
          <ul style={{ marginTop: 0 }}>
            <li>
              If you cancel last-minute or within 24 hours, the deposit may be <strong>retained</strong>.
            </li>
            <li>
              If you reschedule the day before, we will normally allow it (subject to availability).
            </li>
          </ul>

          <h3 style={{ marginTop: 16, marginBottom: 8 }}>6) Refund processing time</h3>
          <p style={{ marginTop: 0 }}>
            If a refund is approved, it will be processed within <strong>5 to 15 working days</strong> depending on your bank/payment provider.
          </p>

          <h3 style={{ marginTop: 16, marginBottom: 8 }}>Contact</h3>
          <p style={{ marginTop: 0 }}>
            For cancellations, rescheduling or complaints, contact us as soon as possible:
          </p>
          <ul style={{ marginTop: 0 }}>
            <li>
              <strong>Phone:</strong> <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
            </li>
            <li>
              <strong>WhatsApp:</strong>{" "}
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                Message us on WhatsApp
              </a>
            </li>
            <li>
              <strong>Email:</strong> fastandcleanoffice@gmail.com
            </li>
          </ul>
        </div>
      </div>

      <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link to="/quote?service=deep" className="btn-primary">
          Get Quote / Book
        </Link>

        <a className="btn-outline" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>

        <a className="btn-outline" href={`tel:${PHONE_TEL}`}>
          Call {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  );
}