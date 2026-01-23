// src/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const PHONE_DISPLAY = "07777174561";
  const PHONE_TEL = "+447777174561";
  const WHATSAPP_LINK = "https://wa.me/447777174561";
  const GOOGLE_REVIEW_URL = "https://g.page/r/CdhuI-exB04dEAE/review";

  const services = [
    {
      id: "deep",
      name: "Deep Cleaning",
      description:
        "Deep, detailed cleaning for kitchens, bathrooms and living areas. Pricing based on property size.",
      priceFrom: "From £185 (Flat) / £260 (House)",
    },
    {
      id: "eot",
      name: "End of Tenancy Cleaning",
      description:
        "End of tenancy clean with clear pricing based on property size. Ideal for tenants, landlords & agencies.",
      priceFrom: "From £215 (Flat) / £290 (House)",
    },
    {
      id: "after",
      name: "After Building Cleaning",
      description:
        "Post-construction / after building clean. Remove dust and building residue with professional results.",
      priceFrom: "From £219 (Flat) / £294 (House)",
    },
    {
      id: "oven",
      name: "Oven Cleaning",
      description:
        "Choose your oven type (single, double, range, Aga) and book instantly. Pricing is fixed by oven type.",
      priceFrom: "From £55",
    },
    {
      id: "handyman",
      name: "Handyman",
      description:
        "Repairs, assembly, minor jobs. £20/hour. Choose 1–4 hours maximum.",
      priceFrom: "£20/hour",
    },
    {
      id: "test",
      name: "Test Service (£1)",
      description:
        "Real service used to test the full booking + Stripe flow end-to-end.",
      priceFrom: "£1",
    },
  ];

  const reviews = [
    {
      name: "Customer",
      when: "Google Review",
      stars: "★★★★★",
      text: "Great service — fast, professional and very thorough. Would book again.",
    },
    {
      name: "Customer",
      when: "Google Review",
      stars: "★★★★★",
      text: "End of tenancy clean was perfect. Landlord was happy and deposit returned.",
    },
    {
      name: "Customer",
      when: "Google Review",
      stars: "★★★★★",
      text: "Very reliable team. Communication was clear and results were excellent.",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-kicker">Fast & Clean Ltd — Cambridge & London</div>

          <h1 className="hero-title">Home Services</h1>

          <p className="hero-subtitle">
            Professional cleaning, oven cleaning and handyman services across Cambridge & London.
            Transparent pricing, easy booking.
          </p>

          <div className="hero-badges">
            <span>✅ Licensed & Insured</span>
            <span>⭐ Satisfaction Guaranteed</span>
          </div>

          <div className="hero-actions">
            <a href="#services" className="btn-primary">View Services</a>
            <a href="#contact" className="btn-outline">Contact</a>
          </div>

          <div className="hero-trust">
            <div className="trust-item">
              <strong>10+ years</strong>
              Experience
            </div>
            <div className="trust-item">
              <strong>Instant quotes</strong>
              No waiting
            </div>
            <div className="trust-item">
              <strong>Support</strong>
              Fast response
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Choose a service to get an instant quote and continue to booking.
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
                  to={`/quote?service=${encodeURIComponent(s.id)}`}
                  className="btn-primary full-width"
                >
                  Book / Get Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="reviews-section">
        <div className="container">
          <h2 className="section-title">Reviews</h2>
          <p className="section-subtitle">
            Real feedback helps new customers feel confident booking.
          </p>

          <div className="reviews-grid">
            {reviews.map((r, idx) => (
              <div className="review-card" key={idx}>
                <div className="review-top">
                  <div className="review-meta">
                    <strong>{r.name}</strong>
                    <span>{r.when}</span>
                  </div>
                  <div className="review-stars">{r.stars}</div>
                </div>
                <p className="review-text">{r.text}</p>
              </div>
            ))}
          </div>

          <div className="reviews-cta">
            <a
              href={GOOGLE_REVIEW_URL}
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
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">
              Ready to book or have questions? We’re here to help.
            </p>

            <ul className="contact-list">
              <li>
                <strong>Phone:</strong>{" "}
                <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
              </li>
              <li>
                <strong>Email:</strong> fastandcleanoffice@gmail.com
              </li>
              <li>
                <strong>Service Areas:</strong> Cambridge, London & nearby towns
              </li>
            </ul>

            <div className="contact-note">
              Fastest way to reach us: WhatsApp or phone.
            </div>

            <div className="hero-actions" style={{ justifyContent: "flex-start", marginTop: 14 }}>
              <a className="btn-primary" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
              <a className="btn-outline" href={`tel:${PHONE_TEL}`}>
                Call {PHONE_DISPLAY}
              </a>
            </div>

            <div style={{ marginTop: 14 }}>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="google-review-btn"
              >
                ⭐ Leave a Google Review
              </a>
            </div>
          </div>

          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent! We’ll get back to you shortly.");
            }}
          >
            <h3>Send Us a Message</h3>

            <div className="form-row">
              <input required placeholder="Full Name" />
              <input required type="email" placeholder="Email Address" />
            </div>

            <textarea required placeholder="Your message..." />

            <button className="btn-primary full-width" type="submit">
              Send Message
            </button>

            <p className="form-disclaimer">
              By submitting, you agree to be contacted about your enquiry.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}