import React, { useState } from "react";
import "./styles.css";

const services = [
  {
    name: "Trial Cleaning",
    description:
      "Try our professional quality with a 1-hour trial clean. Perfect for first-time customers.",
    duration: "1h service",
    price: "£40",
  },
  {
    name: "House Cleaning",
    description:
      "Regular or deep cleaning for flats and houses, including kitchens, bathrooms and living areas.",
    duration: "3h service",
    price: "£95",
  },
  {
    name: "Office Cleaning",
    description:
      "Professional cleaning for offices, clinics and retail spaces with flexible schedules.",
    duration: "2h service",
    price: "£120",
  },
  {
    name: "Garden Maintenance",
    description:
      "Lawn mowing, hedge trimming, weeding and tidy-ups to keep your garden sharp all year.",
    duration: "2h service",
    price: "£65",
  },
  {
    name: "Landscaping",
    description:
      "Design, planting and outdoor improvements to refresh and upgrade your outdoor space.",
    duration: "4h service",
    price: "£160",
  },
  {
    name: "Handyman Repairs",
    description:
      "Minor repairs, furniture assembly, painting and small jobs around your home or office.",
    duration: "2h service",
    price: "£80",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  const goToBook = () => {
    // Sezione "Book Online" = scroll alla griglia servizi
    scrollTo("services");
  };

  const buildBookLink = (service) =>
    `/book?service=${encodeURIComponent(
      service.name
    )}&price=${encodeURIComponent(service.price)}`;

  return (
    <div className="app">
      {/* HEADER */}
      <header className="top-nav">
        <div className="logo" onClick={() => scrollTo("top")}>
          Fast &amp; Clean Ltd
        </div>

        <div className="nav-right">
          <button
            className="nav-toggle"
            onClick={() => setMenuOpen((open) => !open)}
          >
            Menu ▾
          </button>
          <div className={`nav-dropdown ${menuOpen ? "open" : ""}`}>
            <button onClick={() => scrollTo("services")}>Services</button>
            <button onClick={goToBook}>Book Online</button>
            <button onClick={() => scrollTo("contact")}>Contact</button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <p className="hero-eyebrow">Professional</p>
          <h1 className="hero-title">Home Services</h1>
          <p className="hero-subtitle">
            Expert cleaning, gardening and handyman services for your home and
            business across Cambridge and London. Book online, pay securely and
            enjoy peace of mind.
          </p>

          <div className="hero-badges">
            <span>✅ Licensed &amp; Insured</span>
            <span>⚡ Same Day Service (subject to availability)</span>
            <span>⭐ Satisfaction Guaranteed</span>
          </div>

          <div className="hero-actions">
            <button className="btn-primary" onClick={goToBook}>
              Book Service Now
            </button>
            <button
              className="btn-secondary"
              onClick={() => scrollTo("services")}
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
              <div className="stat-label">Available Support</div>
            </div>
            <div>
              <div className="stat-number">5★</div>
              <div className="stat-label">Average Rating</div>
            </div>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section id="services" className="services-section">
          <h2 className="section-title">Our Professional Services</h2>
          <p className="section-subtitle">
            From deep cleaning to garden maintenance and handyman repairs, we
            provide clear packages with upfront pricing.
          </p>

          <div className="booking-banner">
            <strong>New Booking System:</strong> We now offer two convenient
            time slots per day.{" "}
            <span className="highlight">
              Morning: 9:00 AM - 2:00 PM
            </span>{" "}
            &nbsp;|&nbsp;
            <span className="highlight">
              Afternoon: 3:00 PM - 7:00 PM
            </span>
            . One booking per slot to ensure dedicated service quality.
          </div>

          <div className="service-grid">
            {services.map((s) => (
              <div key={s.name} className="service-card">
                <div className="service-icon">
                  {/* Placeholder icon - puoi sostituire con SVG */}
                  <span>★</span>
                </div>
                <h3 className="service-title">{s.name}</h3>
                <p className="service-desc">{s.description}</p>

                <div className="service-meta">
                  <span>{s.duration}</span>
                  <span className="service-price">From {s.price}</span>
                </div>

                <a className="btn-primary full-width" href={buildBookLink(s)}>
                  Book This Service
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT / GET IN TOUCH */}
        <section id="contact" className="contact-section">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Ready to book a service or have questions? We're here to help with
            all your cleaning, gardening and handyman needs.
          </p>

          <div className="contact-layout">
            {/* LEFT COLUMN */}
            <div className="contact-left">
              <h3>Contact Information</h3>
              <ul className="contact-list">
                <li>
                  <strong>Phone:</strong> 07918 646714
                </li>
                <li>
                  <strong>Email:</strong> fastandcleanoffice@gmail.com
                </li>
                <li>
                  <strong>Service Area:</strong> Cambridge &amp; London
                </li>
                <li>
                  <strong>Hours:</strong> Mon–Sat 8:00–18:00, Sun 10:00–16:00
                </li>
              </ul>

              <h3 className="mt-24">What Our Customers Say</h3>
              <div className="testimonial">
                “The online booking system made everything super easy, and the
                team delivered an excellent clean.”
              </div>
              <div className="testimonial">
                “Great attention to detail and very reliable. Highly
                recommended.”
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="contact-right">
              <div className="contact-form-card">
                <div className="form-header">
                  <h3>Send Us a Message</h3>
                  <p>
                    Have a question or need a custom quote? We'll get back to
                    you within 24 hours.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert(
                      "Form received. (Demo only – connect EmailJS or backend to send messages.)"
                    );
                  }}
                >
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input type="text" required />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input type="email" required />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input type="tel" required />
                    </div>
                    <div className="form-group">
                      <label>Service Area</label>
                      <input
                        type="text"
                        placeholder="Cambridge / London / Other"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Message *</label>
                    <textarea
                      rows="4"
                      required
                      placeholder="Tell us about your service needs or ask any questions..."
                    />
                  </div>

                  <button type="submit" className="btn-primary full-width">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <p>
            © 2025 Fast &amp; Clean Ltd. Based in Cambridge &amp; London –{" "}
            <span>Professional Home Services</span>.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
