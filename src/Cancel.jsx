import React from "react";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="booking-container">
      <h1 className="booking-title">Payment cancelled</h1>
      <div className="booking-summary">
        <p>Your payment was cancelled. You can go back and try again.</p>

        <Link to="/" className="btn-primary" style={{ display: "inline-block", marginTop: 12 }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}