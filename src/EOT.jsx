// src/EOT.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function EOT() {
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
        End of Tenancy Cleaning — What’s included
      </h1>
      <p className="section-subtitle" style={{ textAlign: "left", marginLeft: 0 }}>
        The End of Tenancy cleaning service is designed to thoroughly clean an empty home for when a customer is
        moving out of a rental property or moving in to a house they’ve bought.
      </p>

      <div className="booking-summary" style={{ background: "#ffffff" }}>
        <h2 style={{ marginTop: 0 }}>✅ What’s included</h2>
        <ul style={{ marginTop: 10, lineHeight: 1.7, color: "#374151" }}>
          <li>Clean reachable surfaces in all rooms</li>
          <li>Clean cobwebs in all rooms</li>
          <li>Clean skirting boards in all rooms</li>
          <li>Clean all bins, pictures, glass and light fixtures and fittings</li>
          <li>Clean exterior of cupboards and appliances</li>
          <li>Clean kitchen & bathrooms, including descaling</li>
          <li>Vacuum & mop floors</li>
          <li>Clean inside windows</li>
          <li>Clean inside cupboards</li>
          <li>Clean hard-to-reach areas (surfaces, floors & inside windows)</li>
          <li>Clean grouting</li>
          <li>Clean inside fridge/freezer</li>
          <li>Clean inside other appliances (dishwasher, washing machine etc)</li>
          <li>Clean extractor fan filter</li>
          <li>Clean underneath light/movable furniture</li>
        </ul>
      </div>

      <div className="booking-summary" style={{ background: "#ffffff", marginTop: 16 }}>
        <h2 style={{ marginTop: 0 }}>➕ Optional extra services</h2>
        <ul style={{ marginTop: 10, lineHeight: 1.7, color: "#374151" }}>
          <li>Clean carpet & upholstery</li>
          <li>Clean external areas (balcony, terrace, etc)</li>
          <li>Clean oven</li>
        </ul>
      </div>

      <div className="booking-summary" style={{ background: "#ffffff", marginTop: 16 }}>
        <h2 style={{ marginTop: 0 }}>❌ Not included</h2>
        <ul style={{ marginTop: 10, lineHeight: 1.7, color: "#374151" }}>
          <li>De-cluttering</li>
          <li>Rubbish removal</li>
          <li>Cleaning of external windows</li>
          <li>Moving heavy furniture to clean underneath</li>
          <li>Wiping of walls and spot cleaning</li>
          <li>Mould removal / heavy limescale removal</li>
        </ul>

        <h3 style={{ marginTop: 18, marginBottom: 8 }}>Important notes</h3>
        <ul style={{ marginTop: 0, lineHeight: 1.7, color: "#374151" }}>
          <li>
            The client must have already moved out. The property must be empty and free of personal belongings.
          </li>
          <li>
            The client should not be present during the cleaning so the team can work efficiently and ensure they are the last to leave.
          </li>
          <li>
            The customer can inspect the property only after the service is completed (not during the clean).
          </li>
        </ul>
      </div>

      <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link to="/quote?service=eot" className="btn-primary">
          Get Quote / Book EOT
        </Link>

        <a className="btn-outline" href={`tel:${PHONE_TEL}`}>
          Call {PHONE_DISPLAY}
        </a>

        <a className="btn-outline" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
      </div>
    </div>
  );
}