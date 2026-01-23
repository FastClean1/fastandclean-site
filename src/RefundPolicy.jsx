import React from "react";
import { Link } from "react-router-dom";

export default function RefundPolicy() {
  return (
    <section className="info-page">
      <div className="container">
        <h1 className="section-title">Refund & Complaints Policy</h1>

        <p className="section-subtitle">
          This policy explains cancellations, rescheduling, complaints and what
          happens if something isn’t done correctly. By booking with Fast & Clean
          Ltd you agree to the terms below.
        </p>

        <div className="contact-note">
          <strong>Important:</strong> “Refund policy” does <strong>not</strong>{" "}
          mean customers automatically receive money back simply by making a
          complaint. Our standard resolution is a <strong>free re-clean</strong>{" "}
          of the affected areas, within the conditions below.
        </div>

        <h3>1) Complaints & Free Re-clean (48 hours)</h3>
        <p>
          After the service is completed, the customer has{" "}
          <strong>48 hours</strong> to report any issues. If the complaint is
          valid, we will arrange a <strong>second visit for free</strong> to
          re-clean or fix the parts that were not cleaned properly.
        </p>
        <ul className="info-list">
          <li>
            Complaints must be sent within <strong>48 hours</strong> of job
            completion.
          </li>
          <li>
            The free re-clean covers only the affected areas, not a full new
            service.
          </li>
          <li>
            If no complaint is made within 48 hours, the service is considered
            accepted and <strong>no refund</strong> will be issued.
          </li>
        </ul>

        <h3>2) Cancellations</h3>
        <p>
          If the customer cancels a booking after payment, fees apply depending
          on how late the cancellation happens:
        </p>
        <ul className="info-list">
          <li>
            Cancelled <strong>less than 24 hours</strong> before the booking:{" "}
            <strong>£20</strong> will be deducted from the amount paid.
          </li>
          <li>
            Cancelled on the <strong>same day</strong> of the booking:{" "}
            <strong>£50</strong> will be deducted from the amount paid.
          </li>
        </ul>

        <h3>3) Rescheduling (Change date)</h3>
        <p>
          Customers can request to change the booking date up to{" "}
          <strong>48 hours</strong> before the scheduled booking.
        </p>
        <ul className="info-list">
          <li>
            Reschedule requested <strong>48+ hours</strong> before: no fee (subject to availability).
          </li>
          <li>
            Reschedule requested <strong>less than 48 hours</strong> before:{" "}
            the booking will either stay on the original date, or a fee may apply
            depending on the case.
          </li>
          <li>
            If the customer requests a change <strong>less than 24 hours</strong>{" "}
            before the booking, a <strong>£20</strong> fee may be charged.
          </li>
        </ul>

        <div className="contact-note">
          <strong>Note:</strong> Rescheduling is always subject to availability.
          We will do our best to accommodate changes, but we cannot guarantee the
          same day/time slot.
        </div>

        <h3>4) Handyman & Oven Cleaning – Deposits</h3>
        <p>
          For Handyman and Oven Cleaning services, the amount paid online is
          treated as a <strong>deposit</strong>.
        </p>
        <ul className="info-list">
          <li>
            After the booking, our team will contact the customer to confirm
            details and requirements.
          </li>
          <li>
            If the customer cancels <strong>within 24 hours</strong> of the
            booking or cancels on the <strong>same day</strong>, the deposit may
            be retained.
          </li>
          <li>
            If the customer changes the booking date the day before, we will try
            to accommodate it (subject to availability).
          </li>
        </ul>

        <h3>5) Refund Processing Time</h3>
        <p>
          If a refund is approved, it will be processed back to the original
          payment method. Refunds normally take between{" "}
          <strong>5 and 15 working days</strong> to appear, depending on the bank
          or card provider.
        </p>

        <h3>6) Service-specific conditions</h3>
        <p>
          Some services require certain conditions to be met (for example End of
          Tenancy Cleaning requires an empty property). If those conditions are
          not met, the team may not be able to complete the work as intended.
        </p>

        <div style={{ marginTop: 22, textAlign: "center" }}>
          <Link to="/" className="btn-outline">
            Back to Home
          </Link>
          <span style={{ margin: "0 10px" }} />
          <Link to="/quote?service=deep" className="btn-primary">
            Get a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}