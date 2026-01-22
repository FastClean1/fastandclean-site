import React from "react";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="booking-container">
      <h1 className="booking-title">Payment cancelled</h1>

      <div className="booking-summary">
        <p>No worries — you can try again.</p>

        <div style={{ marginTop: 14 }}>
          <Link className="btn-primary" to="/book">
            Go back to booking
          </Link>
          <div style={{ marginTop: 10 }}>
            <Link to="/">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}