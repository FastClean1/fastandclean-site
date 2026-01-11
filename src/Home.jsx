// Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const services = [
    {
      name: "Trial Cleaning",
      description:
        "A 1-hour trial clean to experience our professional standards. Ideal for first-time customers.",
      duration: "1h service",
      priceFrom: "From £1",
    },
    {
      name: "House Cleaning",
      description:
        "Regular or deep cleaning for flats and houses. Kitchens, bathrooms, bedrooms and living areas.",
      duration: "3h service",
      priceFrom: "From £95",
    },
    {
      name: "Office Cleaning",
      description:
        "Professional cleaning for offices, clinics and retail spaces. Flexible scheduling available.",
      duration: "2h service",
      priceFrom: "From £120",
    },
    {
      name: "Garden Maintenance",
      description:
        "Lawn mowing, hedge trimming, weeding and seasonal tidy-ups to keep your garden sharp.",
      duration: "2h service",
      priceFrom: "From £65",
    },
    {
      name: "Landscaping",
      description:
        "Planting, garden refresh, design support and outdoor improvements to upgrade your property.",
      duration: "4h service",
      priceFrom: "From £160",
    },
    {
      name: "Handyman Repairs",
      description:
        "Minor repairs, furniture assembly, painting touch-ups and general home & office fixes.",
      duration: "2h service",
      priceFrom: "From £80",
    },
  ];

  // Replace these with your real reviews (avoid fake-perfect marketing lines).
  const reviews = [
    {
      name: "Sarah M.",
      area: "Cambridge",
      service: "House Cleaning",
      rating: 5,
      date: "2025-11-18",
      text: "Very punctual and spotless results. Communication was excellent.",
    },
    {
      name: "James P.",
      area: "London",
      service: "Handyman Repairs",
      rating: 5,
      date: "2025-12-02",
      text: "Quick fix, tidy work, and fair price. Would book again.",
    },
    {
      name: "Elena R.",
      area: "Cambridge",
      service: "Garden Maintenance",
      rating: 5,
      date: "2025-12-10",
      text: "Reliable team and great attention to detail. Garden looks sharp again.",
    },
    {
      name: "Mark T.",
      area: "London",
      service: "Office Cleaning",
      rating: 5,
      date: "2025-12-16",
      text: "Consistent quality and flexible scheduling. Professional and easy to deal with.",
    },
    {
      name: "Amina K.",
      area: "Cambridge",
      service: "Deep Cleaning",
      rating: 5,
      date: "2025-12-20",
      text: "Booked a deep clean and the result was outstanding—kitchen and bathrooms perfect.",
    },
    {
      name: "Rob D.",
      area: "London",
      service: "Landscaping",
      rating: 5,
      date: "2025-12-28",
      text: "Great suggestions and a solid upgrade to the outdoor space. Clean finish.",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-content">
          <p className="hero-kicker">Cambridge & London</p>

          <h1 className="hero-title">Professional Home Services</h1>

          <p className="hero-subtitle">
            Cleaning, gardening and handyman services for homes and small businesses.
            Simple online booking, clear pricing, and reliable local teams.
          </p>

          <div className="hero-badges">
            <span>✅ Licensed & Insured</span>
            <span>🧾 Clear pricing</span>
            <span>⭐ Quality-focused service</span>
          </div>

          <div className="hero-actions">
            <Link to="/book" className="btn-primary">
              Book Service Now
            </Link>
            <a href="#services" className="btn-outline">
              View Services
            </a>
          </div>

          <div className="hero-trust">
            <div className="trust-item">
              <strong>Cambridge</strong>
              <span>Local availability</span>
            </div>
            <div className="trust-item">
              <strong>London</strong>
              <span>Wide coverage</span>
            </div>
            <div className="trust-item">
              <strong>Fast support</strong>
              <span>Quick replies</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services-section">
        <div className="container">
          <h2 className="section-title">Services & Pricing</h2>
          <p className="section-subtitle">
            Choose a service and book a time slot. One booking per slot to ensure dedicated service quality.
          </p>

          <div className="booking-banner">
            <strong>Booking slots:</strong> Morning: 9:00 AM – 2:00 PM · Afternoon: 3:00 PM – 7:00 PM
          </div>

          <div className="services-grid">
            {services.map((s) => (
              <div className="service-card" key={s.name}>
                <div className="service-body">
                  <h3>{s.name}</h3>
                  <p>{s.description}</p>
                  <div className="service-meta">
                    <span>{s.duration}</span>
                    <span className="price">{s.priceFrom}</span>
                  </div>
                </div>

                <Link
                  to={`/book?service=${encodeURIComponent(s.name)}`}
                  className="btn-primary full-width"
                >
                  Book This Service
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="reviews-section">
        <div className="container">
          <h2 className="section-title">Customer Reviews</h2>
          <p className="section-subtitle">
            Recent feedback from customers across Cambridge & London.
          </p>

          <div className="reviews-grid">
            {reviews.map((r, idx) => (
              <div className="review-card" key={idx}>
                <div className="review-top">
                  <div className="review-stars" aria-label={`${r.rating} star rating`}>
                    {"★".repeat(r.rating)}
                    {"☆".repeat(5 - r.rating)}
                  </div>

                  <div className="review-meta">
                    <strong>{r.name}</strong>
                    <span>
                      {r.area} · {r.service}
                      {r.date ? ` · ${r.date}` : ""}
                    </span>
                  </div>
                </div>

                <p className="review-text">“{r.text}”</p>
              </div>
            ))}
          </div>

          <div className="reviews-cta">
            <Link to="/book" className="btn-primary">
              Book Service Now
            </Link>
            <a href="#contact" className="btn-outline">
              Ask a Question
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="container contact-grid">
          <div className="contact-info">
            <h2 className="section-title">Contact</h2>
            <p className="section-subtitle">
              Questions before booking? Send a message or call. We cover Cambridge, London and nearby towns.
            </p>

            <ul className="contact-list">
              <li>
                <strong>Phone:</strong>{" "}
                <a href="tel:+447918646714">07918 646714</a>
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:fastandcleanoffice@gmail.com">fastandcleanoffice@gmail.com</a>
              </li>
              <li>
                <strong>Service Areas:</strong> Cambridge, London & nearby towns
              </li>
            </ul>

            <div className="contact-note">
              <strong>Tip:</strong> For same-day requests, call us to check availability.
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
              <input required placeholder="Full Name" name="fullName" />
              <input required type="email" placeholder="Email Address" name="email" />
            </div>

            <textarea required placeholder="Your message..." name="message" />

            <button className="btn-primary full-width" type="submit">
              Send Message
            </button>

            <p className="form-disclaimer">
              By sending this message, you agree to be contacted about your request.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}