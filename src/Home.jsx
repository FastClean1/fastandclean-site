import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const services = [
    {
      id: "deep",
      name: "Deep Cleaning",
      description:
        "A deep, detailed clean designed to remove ingrained dirt from your home.",
      priceFrom: "From £185 (Flat) / £260 (House)",
      infoLink: "/deep-cleaning",
    },
    {
      id: "eot",
      name: "End of Tenancy Cleaning",
      description:
        "A full professional clean for empty properties when moving in or out.",
      priceFrom: "From £215 (Flat) / £290 (House)",
      infoLink: "/end-of-tenancy",
    },
    {
      id: "after",
      name: "After Building Cleaning",
      description:
        "Remove dust and residue after renovations or building work.",
      priceFrom: "From £219 (Flat) / £294 (House)",
      infoLink: "/after-building",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-content">
          <span className="hero-kicker">Cambridge & London</span>

          <h1 className="hero-title">
            Professional Cleaning & Home Services
          </h1>

          <p className="hero-subtitle">
            Transparent pricing. Easy booking. Trusted local professionals for
            cleaning, ovens and handyman services.
          </p>

          <div className="hero-actions">
            <a href="#services" className="btn-primary">
              View Services
            </a>
            <a
              href="https://wa.me/447777174561"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              WhatsApp Us
            </a>
          </div>

          <div className="hero-trust">
            <div className="trust-item">
              <strong>✓ Insured</strong>
              Professional & reliable
            </div>
            <div className="trust-item">
              <strong>✓ Guaranteed</strong>
              48h complaint window
            </div>
            <div className="trust-item">
              <strong>✓ Local Team</strong>
              Cambridge & London
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services-section">
        <div className="container">
          <h2 className="section-title">Our Cleaning Services</h2>
          <p className="section-subtitle">
            Choose a service to get an instant quote or read what’s included.
          </p>

          <div className="services-grid">
            {services.map((s) => (
              <div className="service-card" key={s.id}>
                <div className="service-body">
                  <h3>{s.name}</h3>
                  <p>{s.description}</p>
                  <div className="service-meta">
                    <span className="price">{s.priceFrom}</span>
                  </div>
                </div>

                <Link
                  to={`/quote?service=${s.id}`}
                  className="btn-primary full-width"
                >
                  Get Quote
                </Link>

                <Link
                  to={s.infoLink}
                  style={{
                    marginTop: 10,
                    textAlign: "center",
                    fontSize: 13,
                    textDecoration: "underline",
                  }}
                >
                  What’s included
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="reviews-section">
        <div className="container">
          <h2 className="section-title">Customer Reviews</h2>
          <p className="section-subtitle">
            Real feedback from our customers.
          </p>

          <div className="reviews-cta">
            <a
              href="https://g.page/r/CdhuI-exB04dEAE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="google-review-btn"
            >
              ⭐ Leave us a Google Review
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="container contact-grid">
          <div className="contact-info">
            <h2 className="section-title">Contact Us</h2>
            <p className="section-subtitle">
              Questions, changes or special requests? Get in touch.
            </p>

            <ul className="contact-list">
              <li>
                <strong>Phone:</strong> 07777 174561
              </li>
              <li>
                <strong>Email:</strong> fastandcleanoffice@gmail.com
              </li>
              <li>
                <strong>Areas:</strong> Cambridge, London & nearby towns
              </li>
            </ul>

            <div className="contact-note">
              <strong>Need to change or cancel a booking?</strong>
              <br />
              Please read our{" "}
              <Link to="/refund-policy" style={{ textDecoration: "underline" }}>
                Refund & Cancellation Policy
              </Link>
              .
            </div>
          </div>
        </div>
      </section>
    </>
  );
}