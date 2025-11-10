import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Book from "./Book";
import "./styles.css";

function Layout({ children }) {
  const navigate = useNavigate();

  const handleMenuChange = (e) => {
    const value = e.target.value;
    if (!value) return;

    if (value.startsWith("#")) {
      const el = document.querySelector(value);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(value);
    }

    e.target.value = "";
  };

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <div className="logo">
            <Link to="/">Fast &amp; Clean Ltd</Link>
          </div>
          <div className="nav-menu">
            <select defaultValue="" onChange={handleMenuChange}>
              <option value="">Menu</option>
              <option value="#services">Services</option>
              <option value="/book">Book Online</option>
              <option value="#contact">Contact</option>
            </select>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container">
          <p>
            © 2025 Fast &amp; Clean Ltd. Based in Cambridge &amp; London — Professional
            Home Services.
          </p>
        </div>
      </footer>
    </>
  );
}

function Home() {
  const services = [
    {
      name: "Trial Cleaning",
      description:
        "1-hour trial clean to experience our professional quality. Perfect for first-time customers.",
      duration: "1h service",
      price: 40,
    },
    {
      name: "House Cleaning",
      description:
        "Regular or deep cleaning for flats and houses, including kitchens, bathrooms and living areas.",
      duration: "3h service",
      price: 95,
    },
    {
      name: "Office Cleaning",
      description:
        "Professional cleaning for offices, clinics and retail spaces with flexible schedules.",
      duration: "2h service",
      price: 120,
    },
    {
      name: "Garden Maintenance",
      description:
        "Lawn mowing, hedge trimming, weeding and tidy-ups to keep your garden sharp all year.",
      duration: "2h service",
      price: 65,
    },
    {
      name: "Landscaping",
      description:
        "Planting, design and outdoor improvements to refresh and upgrade your property.",
      duration: "4h service",
      price: 160,
    },
    {
      name: "Handyman Repairs",
      description:
        "Minor repairs, furniture assembly, painting and general home & office fixes.",
      duration: "2h service",
      price: 80,
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-content">
          <h1 className="hero-title">Home Services</h1>
          <p className="hero-subtitle">
            Expert cleaning, gardening and handyman services for your home or
            business across Cambridge &amp; London. Book online, pay securely,
            and enjoy peace of mind.
          </p>

          <div className="hero-badges">
            <span>✅ Licensed &amp; Insured</span>
            <span>⚡ Same Day Service (subject to availability)</span>
            <span>⭐ Satisfaction Guaranteed</span>
          </div>

          <div className="hero-actions">
            <Link className="btn-primary" to="/book">
              Book Service Now
            </Link>
            <a className="btn-outline" href="#services">
              View Services
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <strong>500+</strong>
              <span>Happy Customers</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>Available Support</span>
            </div>
            <div>
              <strong>5★</strong>
              <span>Average Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services-section">
        <div className="container">
          <h2 className="section-title">Our Professional Services</h2>
          <p className="section-subtitle">
            From deep cleaning to garden maintenance and handyman repairs, we
            provide clear packages with upfront pricing.
          </p>

          <div className="booking-banner">
            <strong>New Booking System:</strong> We now offer two convenient time
            slots per day.{" "}
            <span>Morning: 9:00 AM – 2:00 PM</span> |{" "}
            <span>Afternoon: 3:00 PM – 7:00 PM</span>. One booking per slot to
            ensure dedicated service quality.
          </div>

          <div className="services-grid">
            {services.map((s) => (
              <div key={s.name} className="service-card">
                <div className="service-body">
                  <h3>{s.name}</h3>
                  <p>{s.description}</p>
                  <div className="service-meta">
                    <span>{s.duration}</span>
                    <span className="price">From £{s.price}</span>
                  </div>
                </div>

                <Link
                  className="btn-primary full-width"
                  to={`/book?service=${encodeURIComponent(
                    s.name
                  )}&price=${s.price}`}
                >
                  Book This Service
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="container contact-grid">
          <div className="contact-info">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">
              Ready to book a service or have questions? We're here to help with
              all your cleaning, gardening and handyman needs.
            </p>

            <ul className="contact-list">
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

            <div className="testimonials">
              <h3>What Our Customers Say</h3>
              <p>
                "The online booking system made everything super easy, and the
                team delivered an excellent clean."
              </p>
              <p>
                "Great attention to detail and very reliable. Highly
                recommended."
              </p>
            </div>
          </div>

          <div className="contact-form">
            <h3>Send Us a Message</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! We’ll get back to you shortly.");
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
                />
              </div>
              <textarea
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
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/book"
        element={
          <Layout>
            <Book />
          </Layout>
        }
      />
    </Routes>
  );
}
