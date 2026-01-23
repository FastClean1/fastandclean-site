import React from "react";
import { Link } from "react-router-dom";

export default function Afterbuilding() {
  return (
    <section className="info-page">
      <div className="container">
        <h1 className="section-title">After Building Cleaning</h1>

        <p className="section-subtitle">
          After Building Cleaning is designed to remove dust, debris and residue
          left behind after renovation or construction work. This service is
          ideal once all builders have finished their work.
        </p>

        <div className="contact-note">
          <strong>Important:</strong> This service is priced per job based on the
          size and condition of the property. It is <strong>not charged by the hour</strong>.
          Our team will take the time needed to complete the work thoroughly.
        </div>

        <h3>What’s included</h3>
        <ul className="info-list">
          <li>Clean reachable surfaces in all rooms</li>
          <li>Clean exterior of cupboards and all appliances</li>
          <li>Deep clean kitchen & bathrooms (including descaling)</li>
          <li>Clean pictures, glass and light fixtures</li>
          <li>Vacuum & mop all floors</li>
          <li>Clean inside windows</li>
          <li>Clean hard-to-reach areas (surfaces, floors and inside windows)</li>
          <li>Wipe down door frames and switch plates</li>
          <li>Clean underneath light or movable furniture</li>
          <li>Descale toilets</li>
          <li>Clean grouting</li>
        </ul>

        <h3>Optional additional services</h3>
        <ul className="info-list">
          <li>Inside fridge/freezer (must be empty and defrosted 24h before)</li>
          <li>Carpet & upholstery cleaning</li>
          <li>External areas (balcony, terrace, etc.)</li>
        </ul>

        <h3>What is NOT included</h3>
        <ul className="info-list">
          <li>De-cluttering or rubbish removal</li>
          <li>Cleaning inside cupboards</li>
          <li>Cleaning inside other appliances (dishwasher, washing machine, etc.)</li>
          <li>Cleaning external windows</li>
          <li>Moving heavy furniture</li>
          <li>Wiping or spot-cleaning walls</li>
          <li>Mould removal or heavy limescale removal</li>
        </ul>

        <div className="contact-note">
          <strong>Complaints & Guarantee:</strong>
          <br />
          After the service is completed, the client has <strong>48 hours</strong> to report any
          issues. We will arrange a <strong>free re-clean</strong> of the affected areas.
          No refunds are issued if no complaint is made within 48 hours.
        </div>

        <div style={{ marginTop: 24, textAlign: "center" }}>
          <Link to="/quote?service=after" className="btn-primary">
            Get a Quote for After Building Cleaning
          </Link>
        </div>
      </div>
    </section>
  );
}