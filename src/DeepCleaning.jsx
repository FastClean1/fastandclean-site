// src/DeepCleaning.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function DeepCleaning() {
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
        Deep Cleaning — What’s included
      </h1>
      <p className="section-subtitle" style={{ textAlign: "left", marginLeft: 0 }}>
        Deep cleaning is a thorough clean designed to remove deep, ingrained dirt
        from a customer’s home.
      </p>

      <div className="booking-summary" style={{ background: "#ffffff" }}>
        <h2 style={{ marginTop: 0 }}>✅ What’s included</h2>
        <ul style={{ marginTop: 10, lineHeight: 1.7, color: "#374151" }}>
          <li>Clean reachable surfaces in all rooms</li>
          <li>Clean exterior of cupboards and appliances</li>
          <li>Clean kitchen & bathrooms, including descaling</li>
          <li>Vacuum & mop floors</li>
          <li>Clean underneath light/movable furniture</li>
          <li>Clean and disinfect the trash can</li>
          <li>Clean inside windows</li>
          <li>Wipe down door frames and switch plates</li>
        </ul>
      </div>

      <div className="booking-summary" style={{ background: "#ffffff", marginTop: 16 }}>
        <h2 style={{ marginTop: 0 }}>➕ Optional extra services</h2>
        <ul style={{ marginTop: 10, lineHeight: 1.7, color: "#374151" }}>
          <li>Inside fridge/freezer (must be empty and defrosted)</li>
          <li>Carpet & upholstery cleaning</li>
          <li>External areas (balcony, terrace, etc)</li>
        </ul>
      </div>

      <div className="booking-summary" style={{ background: "#ffffff", marginTop: 16 }}>
        <h2 style={{ marginTop: 0 }}>❌ Not included</h2>
        <ul style={{ marginTop: 10, lineHeight: 1.7, color: "#374151" }}>
          <li>De-cluttering</li>
          <li>Tidy-up & washing dishes</li>
          <li>Cleaning of inside cupboards</li>
          <li>Moving heavy furniture to clean underneath</li>
          <li>Wiping of walls and spot cleaning</li>
          <li>Mould removal / heavy limescale removal</li>
        </ul>
      </div>

      <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link to="/quote?service=deep" className="btn-primary">
          Get Quote / Book Deep Cleaning
        </Link>

        <a className="btn-outline" href={`tel:${PHONE_TEL}`}>
          Call {PHONE_DISPLAY}
        </a>

        <a
          className="btn-outline"
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}