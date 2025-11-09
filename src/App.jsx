import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const services = [
  {
    id: "trial",
    name: "Trial Cleaning",
    description:
      "Try our professional quality with a 1-hour trial clean. Perfect for first-time customers.",
    duration: "1h service",
    price: 40,
    icon: "⭐"
  },
  {
    id: "house",
    name: "House Cleaning",
    description:
      "Regular or deep cleaning for flats and houses, including kitchens, bathrooms and living areas.",
    duration: "3h service",
    price: 95,
    icon: "🏠"
  },
  {
    id: "office",
    name: "Office Cleaning",
    description:
      "Professional cleaning for offices, clinics and retail spaces with flexible schedules.",
    duration: "2h service",
    price: 120,
    icon: "🏢"
  },
  {
    id: "garden",
    name: "Garden Maintenance",
    description:
      "Lawn mowing, hedge trimming, weeding and seasonal tidy-ups to keep your garden sharp.",
    duration: "2h service",
    price: 65,
    icon: "🌿"
  },
  {
    id: "landscaping",
    name: "Landscaping",
    description:
      "Planting, design, patio and outdoor improvements to refresh your property.",
    duration: "4h service",
    price: 160,
    icon: "🌱"
  },
  {
    id: "handyman",
    name: "Handyman Repairs",
    description:
      "Minor repairs, furniture assembly, small painting jobs and general home fixes.",
    duration: "2h service",
    price: 80,
    icon: "🛠️"
  }
];

function App() {
  return (
    <div className="page">
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <span className="logo-text">Fast &amp; Clean Ltd</span>
        </div>

        {/* Dropdown menu on the right */}
        <div className="header-right">
          <div className="dropdown">
            <button className="dropdown-toggle">Menu ▾</button>
            <div className="dropdown-menu">
              <a href="#services">Services</a>
              <Link to="/book">Book Online</Link>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero">
          <p className="hero-eyebrow">Professional</p>
          <h1 className="hero-title">Home Services</h1>

          {/* SOLO questa linea nera: centrata */}
          <p className="hero-subtitle">
            Expert cleaning, gardening, and handyman services for your home and
            business across Cambridge and London. Book online, pay securely,
            and enjoy peace of mind.
          </p>

          <div className="hero-badges">
            <span>✔ Licensed &amp; Insured</span>
            <span>⚡ Same Day Service (subject to availability)</span>
            <span>⭐ Satisfaction Guaranteed</span>
          </div>

          <div className="hero-actions">
            <Link to="/book" className="btn-primary">
              Book Service Now
            </Link>
            <a href="#services" className="btn-outline">
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
          {/* TUTTO questo blocco più centrale */}
          <h2 className="section-title">Our Professional Services</h2>
          <p className="section-subtitle">
            From deep cleaning to garden maintenance and handyman repairs,
            we provide clear packages with upfront pricing.
          </p>

          <div className="booking-note">
            <strong>New Booking System:</strong> Two convenient time slots per
            day. Morning: 9:00 AM – 2:00 PM · Afternoon: 3:00 PM – 7:00 PM.
            One booking per slot to ensure quality.
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-name">{service.name}</h3>
                <p className="service-desc">{service.description}</p>
                <div className="service-meta">
                  <span>{service.duration}</span>
                  <span className="service-price">From £{service.price}</span>
                </div>
                <Link
                  to={`/book?service=${encodeURIComponent(
                    service.name
                  )}&price=${service.price}`}
                  className="btn-card"
                >
                  Book This Service
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact-section">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Ready to book a service or have questions? We&apos;re here to help
            with all your cleaning, gardening and handyman needs.
          </p>

          <div className="contact-grid">
            <div className="contact-details">
              <h3>Contact Information</h3>
              <ul>
                <li>
                  <strong>Phone:</strong>{" "}
                  <a href="tel:+447918646714">07918 646714</a>
                </li>
                <li>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:fastandcleanoffice@gmail.com">
                    fastandcleanoffice@gmail.com
                  </a>
                </li>
                <li>
                  <strong>Service Area:</strong> Cambridge &amp; London
                </li>
                <li>
                  <strong>Hours:</strong> Mon–Sat 8:00–18:00, Sun 10:00–16:00
                </li>
              </ul>

              <h3>What Our Customers Say</h3>
              <p className="testimonial">
                “The online booking system made everything super easy, and the
                team delivered an excellent clean.”
              </p>
              <p className="testimonial">
                “Great attention to detail and very reliable. Highly
                recommended.”
              </p>
            </div>

            <div className="contact-form">
              <h3>Send Us a Message</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(
                    "Thank you for your message. We will get back to you within 24 hours."
                  );
                }}
              >
                <div className="form-row">
                  <input type="text" placeholder="Full Name" required />
                  <input type="email" placeholder="Email Address" required />
                </div>
                <div className="form-row">
                  <input type="tel" placeholder="Phone Number" required />
                  <input
                    type="text"
                    placeholder="Service Area (Cambridge / London / Other)"
                    required
                  />
                </div>
                <textarea
                  rows="4"
                  placeholder="Tell us about your service needs or any questions..."
                  required
                />
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
        © 2025 Fast &amp; Clean Ltd. Based in Cambridge &amp; London — Professional
        Home Services.
      </footer>
    </div>
  );
}

export default App;
