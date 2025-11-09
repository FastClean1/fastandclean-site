import React, { useState } from "react";
import "./styles.css";

const SERVICES = [
  {
    id: "trial",
    name: "Trial Cleaning",
    description:
      "Try our professional quality with a 1-hour trial clean. Perfect for first-time customers.",
    price: "From £40",
    duration: "1h service",
  },
  {
    id: "house",
    name: "House Cleaning",
    description:
      "Regular or deep cleaning for flats and houses, including kitchens, bathrooms and living areas.",
    price: "From £95",
    duration: "3h service",
  },
  {
    id: "office",
    name: "Office Cleaning",
    description:
      "Professional cleaning for offices, clinics and retail spaces with flexible schedules.",
    price: "From £120",
    duration: "2h service",
  },
  {
    id: "garden",
    name: "Garden Maintenance",
    description:
      "Lawn mowing, hedge trimming, weeding and seasonal tidy-ups to keep your garden sharp.",
    price: "From £65",
    duration: "2h service",
  },
  {
    id: "landscaping",
    name: "Landscaping",
    description:
      "Planting, design and outdoor improvements to refresh and upgrade your property.",
    price: "From £160",
    duration: "4h service",
  },
  {
    id: "handyman",
    name: "Handyman Repairs",
    description:
      "Minor repairs, furniture assembly, painting and small jobs around your home.",
    price: "From £80",
    duration: "2h service",
  },
];

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 90;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBookClick = (service) => {
    const url = `/book?service=${encodeURIComponent(
      service.name
    )}&price=${encodeURIComponent(service.price.replace("From £", ""))}`;
    window.location.href = url;
  };

  return (
    <div className="page">
      {/* TOP BAR */}
      <header className="top-bar">
        <div className="brand">Fast &amp; Clean Ltd</div>

        <div className="top-right-menu">
          <button
            className="menu-btn"
            onClick={() => setMenuOpen((open) => !open)}
          >
            Menu ▾
          </button>
          {menuOpen && (
            <div className="menu-dropdown">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  scrollToId("services");
                }}
              >
                Services
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  window.location.href = "/book";
                }}
              >
                Book Online
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  scrollToId("contact");
                }}
              >
                Contact
              </button>
            </div>
          )}
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-label">Professional</div>
          <h1 className="hero-title">Home Services</h1>

          {/* Testo nero centrato */}
          <p className="hero-text">
            Expert cleaning, gardening and handyman services for your home or
            business across Cambridge and London.
            <br />
            Book online, pay securely, and enjoy peace of mind.
          </p>

          <div className="hero-badges">
            <span>✅ Licensed &amp; Insured</span>
            <span>⚡ Same Day Service (subject to availability)</span>
            <span>⭐ Satisfaction Guaranteed</span>
          </div>

          <div className="hero-actions">
            <button
              className="primary-btn"
              onClick={() => scrollToId("services")}
            >
              Book Service Now
            </button>
            <button
              className="ghost-btn"
              onClick={() => scrollToId("services")}
            >
              View Services
            </button>
          </div>

          <div className="hero-stats">
            <div>
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div>
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
            <div>
              <div className="stat-number">5★</div>
              <div className="stat-label">Average Rating</div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="services-section">
          {/* Titolo + testo blu più centrati */}
          <div className="section-header">
            <h2>Our Professional Services</h2>
            <p>
              From deep cleaning to garden maintenance and handyman repairs, we
              provide clear packages with upfront pricing.
            </p>
            <p className="booking-system">
              <strong>New Booking System:</strong> Two convenient time slots per
              day. Morning: 9:00 AM – 2:00 PM · Afternoon: 3:00 PM – 7:00 PM.
              One booking per slot to ensure quality.
            </p>
          </div>

          <div className="service-grid">
            {SERVICES.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon">★</div>
                <h3>{service.name}</h3>
                <p className="service-desc">{service.description}</p>
                <div className="service-meta">
                  <span>{service.duration}</span>
                  <span className="price">{service.price}</span>
                </div>
                <button
                  className="service-btn"
                  onClick={() => handleBookClick(service)}
                >
                  Book This Service
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact-section">
          <div className="contact-left">
            <h2>Get In Touch</h2>
            <p>
              Ready to book a service or have questions? We’re here to help with
              all your cleaning, gardening and handyman needs.
            </p>

            <div className="contact-list">
              <div>
                <strong>Phone:</strong> 07918646714
              </div>
              <div>
                <strong>Email:</strong> fastandcleanoffice@gmail.com
              </div>
              <div>
                <strong>Service Area:</strong> Cambridge &amp; London
              </div>
              <div>
                <strong>Hours:</strong> Mon–Sat 8:00–18:00, Sun 10:00–16:00
              </div>
            </div>

            <div className="testimonials">
              <h3>What Our Customers Say</h3>
              <p>
                “Excellent service! The online booking system made it super
                easy.”
              </p>
              <p>
                “Great attention to detail and very professional.
                Highly recommended.”
              </p>
            </div>
          </div>

          <div className="contact-right">
            <h3>Send Us a Message</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  "Thank you! Your message has been received. We will get back to you shortly."
                );
              }}
            >
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email Address" required />
              <input type="tel" placeholder="Phone Number" required />
              <input
                type="text"
                placeholder="Service Area (Cambridge / London / Other)"
                required
              />
              <textarea
                placeholder="Tell us about your service needs or any questions…"
                rows="4"
                required
              />
              <button type="submit" className="primary-btn full-width">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        © 2025 Fast &amp; Clean Ltd. Based in Cambridge &amp; London — Professional
        Home Services.
