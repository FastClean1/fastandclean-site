import React from "react";
import { Link } from "react-router-dom";

const SERVICES = [
  {
    id: "trial",
    name: "Trial Cleaning",
    description:
      "Try our professional quality with a 1-hour trial clean. Perfect for first-time customers.",
    duration: "1h service",
    price: "From £40"
  },
  {
    id: "house",
    name: "House Cleaning",
    description:
      "Regular or deep cleaning for flats and houses, including kitchens, bathrooms and living areas.",
    duration: "3h service",
    price: "From £95"
  },
  {
    id: "office",
    name: "Office Cleaning",
    description:
      "Professional cleaning for offices, clinics and retail spaces with flexible schedules.",
    duration: "2h service",
    price: "From £120"
  },
  {
    id: "garden",
    name: "Garden Maintenance",
    description:
      "Lawn mowing, hedge trimming, weeding and seasonal tidy-ups to keep your garden sharp.",
    duration: "2h service",
    price: "From £65"
  },
  {
    id: "landscaping",
    name: "Landscaping",
    description:
      "Planting design, patio and outdoor improvements to refresh your property.",
    duration: "4h service",
    price: "From £160"
  },
  {
    id: "handyman",
    name: "Handyman Repairs",
    description:
      "Minor repairs, furniture assembly, small painting jobs and general home fixes.",
    duration: "2h service",
    price: "From £80"
  }
];

export default function App() {
  return (
    <div className="page">
      {/* Top Nav */}
      <header className="nav">
        <div className="nav-left">
          <span className="logo-mark">F</span>
          <span className="logo-text">Fast &amp; Clean Ltd</span>
        </div>
        <nav className="nav-links">
          <a href="#services">Services</a>
          <Link to="/book" className="nav-link">
            Book Online
          </Link>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* HERO */}
      <main>
        <section className="hero">
          <p className="eyebrow">Professional</p>
          <h1>
            <span className="hero-main">Home Services</span>
          </h1>
          <p className="hero-sub">
            Expert cleaning, gardening and handyman services for your home or
            business across Cambridge and London. Book online, pay securely, and
            enjoy peace of mind.
          </p>

          <div className="hero-badges">
            <div>✅ Licensed &amp; Insured</div>
            <div>⚡ Same Day Service (subject to availability)</div>
            <div>⭐ Satisfaction Guaranteed</div>
          </div>

          <div className="hero-actions">
            <Link to="/book" className="btn-primary">
              Book Service Now
            </Link>
            <a href="#services" className="btn-secondary">
              View Services
            </a>
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
          <div className="section-header">
            <h2>Our Professional Services</h2>
            <p>
              From deep cleaning to garden maintenance and handyman repairs, we
              provide clear packages with upfront pricing.
            </p>
          </div>

          <div className="booking-banner">
            <strong>New Booking System:</strong> Two convenient time slots per
            day. Morning: <span>9:00 AM - 2:00 PM</span> · Afternoon:{" "}
            <span>3:00 PM - 7:00 PM</span>. One booking per slot to ensure
            quality.
          </div>

          <div className="services-grid">
            {SERVICES.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon">
                  {service.id === "trial" && "★"}
                  {service.id === "house" && "🏠"}
                  {service.id === "office" && "🏢"}
                  {service.id === "garden" && "🌿"}
                  {service.id === "landscaping" && "🌳"}
                  {service.id === "handyman" && "🔧"}
                </div>
                <h3>{service.name}</h3>
                <p className="service-desc">{service.description}</p>
                <div className="service-meta">
                  <span>{service.duration}</span>
                  <span className="service-price">{service.price}</span>
                </div>
                <Link
                  to={`/book?service=${encodeURIComponent(
                    service.name
                  )}&price=${encodeURIComponent(service.price)}`}
                  className="btn-primary full-width"
                >
                  Book This Service
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT + INFO */}
        <section id="contact" className="contact-section">
          <div className="section-header">
            <h2>Get In Touch</h2>
            <p>
              Ready to book or have questions? We’re here to help with all your
              cleaning, gardening and handyman needs.
            </p>
          </div>
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Contact Information</h3>
              <ul>
                <li>
                  📞 <strong>Phone:</strong> 07918646714
                </li>
                <li>
                  📧 <strong>Email:</strong> fastandcleanoffice@gmail.com
                </li>
                <li>
                  📍 <strong>Service Area:</strong> Cambridge &amp; London
                </li>
                <li>
                  🕒 <strong>Hours:</strong> Mon–Sat 8:00–18:00, Sun 10:00–16:00
                </li>
              </ul>

              <h3>What Our Customers Say</h3>
              <p className="quote">
                “They cleaned our office thoroughly and the online booking was
                super easy.”
              </p>
              <p className="quote">
                “Great attention to detail and very professional. Highly
                recommended.”
              </p>
            </div>

            <div className="contact-box">
              <h3>Send Us a Message</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(
                    "Thanks for your message. We’ll get back to you within 24 hours."
                  );
                }}
              >
                <div className="form-row">
                  <div className="form-field">
                    <label>Full Name</label>
                    <input required />
                  </div>
                  <div className="form-field">
                    <label>Email Address</label>
                    <input type="email" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label>Phone Number</label>
                    <input required />
                  </div>
                  <div className="form-field">
                    <label>Service Area</label>
                    <input placeholder="Cambridge / London / Other" />
                  </div>
                </div>
                <div className="form-field">
                  <label>Message</label>
                  <textarea rows="4" required />
                </div>
                <button type="submit" className="btn-primary full-width">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div>© {new Date().getFullYear()} Fast &amp; Clean Ltd. All rights reserved.</div>
        <div>Based in Cambridge &amp; London — Professional Home Services</div>
      </footer>
    </div>
  );
}
