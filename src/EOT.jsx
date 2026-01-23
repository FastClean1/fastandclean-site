import React from "react";
import { Link } from "react-router-dom";

export default function EOT() {
  return (
    <section className="info-page">
      <div className="container">
        <h1 className="section-title">End of Tenancy Cleaning</h1>

        <p className="section-subtitle">
          Our End of Tenancy Cleaning service is designed to thoroughly clean an
          <strong> empty property</strong> when a tenant is moving out or a new
          owner is moving in.
        </p>

        {/* IMPORTANT NOTICE */}
        <div className="contact-note">
          <strong>Important:</strong> This service is <strong>not charged by the hour</strong>.
          It is a full job-based service.  
          The cleaning team will take the time needed to complete the work properly.
        </div>

        <h3>What’s included</h3>
        <ul className="info-list">
          <li>Clean reachable surfaces in all rooms</li>
          <li>Remove cobwebs in all rooms</li>
          <li>Clean skirting boards</li>
          <li>Clean bins, pictures, glass and light fixtures</li>
          <li>Clean exterior of cupboards and appliances</li>
          <li>Deep clean kitchen & bathrooms (including descaling)</li>
          <li>Vacuum & mop all floors</li>
          <li>Clean inside windows</li>
          <li>Clean inside cupboards</li>
          <li>Clean hard-to-reach areas</li>
          <li>Clean grouting</li>
          <li>Clean inside fridge & freezer</li>
          <li>Clean inside other appliances (dishwasher, washing machine, etc.)</li>
          <li>Clean extractor fan filter</li>
          <li>Clean underneath light or movable furniture</li>
        </ul>

        <h3>Optional additional services</h3>
        <ul className="info-list">
          <li>Carpet & upholstery cleaning</li>
          <li>External areas (balcony, terrace, etc.)</li>
          <li>Oven cleaning</li>
        </ul>

        <h3>What is NOT included</h3>
        <ul className="info-list">
          <li>De-cluttering or rubbish removal</li>
          <li>Cleaning external windows</li>
          <li>Moving heavy furniture</li>
          <li>Wiping or spot-cleaning walls</li>
          <li>Mould or heavy limescale removal</li>
        </ul>

        <h3>Important conditions</h3>
        <ul className="info-list">
          <li>The property must be completely empty of personal belongings</li>
          <li>The client must vacate the property before the cleaning starts</li>
          <li>The client can inspect the property <strong>only after</strong> the service is completed</li>
        </ul>

        <div className="contact-note">
          <strong>Complaints & Guarantee:</strong><br />
          After the service is completed, the client has <strong>48 hours</strong> to report any issues.
          We will arrange a <strong>free re-clean</strong> of the affected areas.
          Refunds are not issued if no complaint is made within 48 hours.
        </div>

        <div style={{ marginTop: 24, textAlign: "center" }}>
          <Link to="/quote?service=eot" className="btn-primary">
            Get a Quote for End of Tenancy Cleaning
          </Link>
        </div>
      </div>
    </section>
  );
}