// src/AfterBuilding.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function AfterBuilding() {
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
        After Building Cleaning — What’s included
      </h1>
      <p className="section-subtitle" style={{ textAlign: "left", marginLeft: 0 }}>
        After builders cleaning is designed to remove the dust and dirt that’s left over
        after building work or renovation at a customer’s home.
      </p>

      <div className="booking-summary" style={{ background: "#ffffff" }}>
        <h2 style={{ marginTop: 0 }}>✅ What’s included</h2>
        <ul style={{ marginTop: 10, lineHeight: 1.7, color: "#374151" }}>
          <li>Clean reachable surfaces in all rooms</li>
          <li>Clean exterior of cupboards and all appliances</li>
          <li>Clean kitchen & bathrooms, including descaling</li>
          <li>Clean all pictures, glass and light fixtures and fittings</li>
          <li>Vacuum & mop floors</li>
          <li>Clean inside windows</li>
          <li>Clean hard to reach areas (surfaces, floors & inside windows)</li>
          <li>Wipe down door frames and switch plates</li>
          <li>Clean underneath light/movable furniture</li>
          <li>Descale toilet</li>
          <li>Clean grouting</li>
        </ul>
      </div>

      <div className="booking-summary" style={{ background: "#ffffff", marginTop: 16 }}>
        <h2 style={{ marginTop: 0 }}>➕ Optional extra services</h2>
        <ul style={{ marginTop: 10, lineHeight: 1.7, color: "#374151" }}>
          <li>
            Clean inside fridge/freezer (must be empty and defrosted 24h before the booking date)
          </li>
          <li>Clean carpet & upholstery</li>
          <li>Clean external areas (balcony, terrace, etc)</li>
        </ul>
      </div>

      <div className="booking-summary" style={{ background: "#ffffff", marginTop: 16 }}>
        <h2 style={{ marginTop: 0 }}>❌ Not included</h2>
        <ul style={{ marginTop: 10, lineHeight: 1.7, color: "#374151" }}>
          <li>De-cluttering</li>
          <li>Cleaning of inside cupboards</li>
          <li>Cleaning inside other appliances (dishwasher, washing machine etc)</li>
          <li>Cleaning of external windows</li>
          <li>Moving heavy furniture to clean underneath</li>
          <li>Wiping of walls and spot cleaning</li>
          <li>Mould removal / heavy limescale removal</li>
        </ul>
      </div>

      <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link to="/quote?service=after" className="btn-primary">
          Get Quote / Book After Building
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