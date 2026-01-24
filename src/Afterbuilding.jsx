import React from "react";
import { Link } from "react-router-dom";

export default function Afterbuilding() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="page-card">
          <h1 className="page-title">After Building Cleaning</h1>

          <p className="page-lead">
            After Building Cleaning is designed to remove dust, debris and
            residue left behind after renovation or construction work. This
            service is ideal once all builders have finished their work.
          </p>

          <div className="callout">
            <strong>Important:</strong> This service is priced per job based on
            the size and condition of the property. It is{" "}
            <strong>not charged by the hour</strong>. Our team will take the time
            needed to complete the work thoroughly.
          </div>

          <div className="page-block">
            <h2>What’s included</h2>
            <ul>
              <li>Clean reachable surfaces in all rooms</li>
              <li>Clean exterior of cupboards and all appliances</li>
              <li>Deep clean kitchen & bathrooms (including descaling)</li>
              <li>Clean pictures, glass and light fixtures</li>
              <li>Vacuum & mop all floors</li>
              <li>Clean inside windows</li>
              <li>
                Clean hard-to-reach areas (surfaces, floors and inside windows)
              </li>
              <li>Wipe down door frames and switch plates</li>
              <li>Clean underneath light or movable furniture</li>
              <li>Descale toilets</li>
              <li>Clean grouting</li>
            </ul>
          </div>

          <div className="page-block">
            <h2>Optional additional services</h2>
            <ul>
              <li>
                Inside fridge/freezer (must be empty and defrosted 24h before)
              </li>
              <li>Carpet & upholstery cleaning</li>
              <li>External areas (balcony, terrace, etc.)</li>
            </ul>
          </div>

          <div className="page-block">
            <h2>What is NOT included</h2>
            <ul>
              <li>De-cluttering or rubbish removal</li>
              <li>Cleaning inside cupboards</li>
              <li>
                Cleaning inside other appliances (dishwasher, washing machine,
                etc.)
              </li>
              <li>Cleaning external windows</li>
              <li>Moving heavy furniture</li>
              <li>Wiping or spot-cleaning walls</li>
              <li>Mould removal or heavy limescale removal</li>
            </ul>
          </div>

          <div className="callout">
            <strong>Complaints & Guarantee:</strong>
            <br />
            After the service is completed, the client has{" "}
            <strong>48 hours</strong> to report any issues. We will arrange a{" "}
            <strong>free re-clean</strong> of the affected areas. No refunds are
            issued if no complaint is made within 48 hours.
          </div>

          <div style={{ marginTop: 24, textAlign: "center" }}>
            <Link to="/quote?service=after" className="btn-primary">
              Get a Quote for After Building Cleaning
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}