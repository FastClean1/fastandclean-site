import React from "react";
import { Link } from "react-router-dom";

export default function DeepCleaning() {
  return (
    <section className="info-page">
      <div className="container">
        <h1 className="section-title">Deep Cleaning</h1>

        <p className="section-subtitle">
          Deep Cleaning is a thorough clean designed to remove deep, ingrained
          dirt from a customer’s home. Ideal for seasonal resets, moving in,
          or when your home needs extra attention beyond regular cleaning.
        </p>

        <div className="contact-note">
          <strong>Important:</strong> This service is priced per job based on the
          size of the property. It is <strong>not charged by the hour</strong>.
          Our team will take the time needed to complete the work properly.
        </div>

        <h3>What’s included</h3>
        <ul className="info-list">
          <li>Clean reachable surfaces in all rooms</li>
          <li>Clean exterior of cupboards and appliances</li>
          <li>Deep clean kitchen & bathrooms (including descaling)</li>
          <li>Vacuum & mop floors</li>
          <li>Clean underneath light or movable furniture</li>
          <li>Clean and disinfect the trash can</li>
          <li>Clean inside windows</li>
          <li>Wipe down door frames and switch plates</li>
        </ul>

        <h3>Optional additional services</h3>
        <ul className="info-list">
          <li>Inside fridge/freezer (must be empty and defrosted)</li>
          <li>Carpet & upholstery cleaning</li>
          <li>External areas (balcony, terrace, etc.)</li>
        </ul>

        <h3>What is NOT included</h3>
        <ul className="info-list">
          <li>De-cluttering</li>
          <li>Tidy-up and washing dishes</li>
          <li>Cleaning inside cupboards</li>
          <li>Moving heavy furniture</li>
          <li>Wiping or spot-cleaning walls</li>
          <li>Mould removal or heavy limescale removal</li>
        </ul>

        <div className="contact-note">
          <strong>Complaints & Guarantee:</strong><br />
          After the service is completed, the client has <strong>48 hours</strong>
          to report any issue. We will arrange a <strong>free re-clean</strong>
          of the affected areas. Refunds are not issued if no complaint is made
          within 48 hours.
        </div>

        <div style={{ marginTop: 24, textAlign: "center" }}>
          <Link to="/quote?service=deep" className="btn-primary">
            Get a Quote for Deep Cleaning
          </Link>
        </div>
      </div>
    </section>
  );
}