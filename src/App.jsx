import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Book from "./Book";
import "./styles.css";

function HomePage() {
  const navigate = useNavigate();

  const services = [
    {
      name: "Trial Cleaning",
      description:
        "1-hour trial clean to experience our professional quality. Ideal for new customers.",
      duration: "1h service",
      priceFrom: 40,
    },
    {
      name: "House Cleaning",
      description:
        "Regular or deep cleaning for flats and houses, including kitchens, bathrooms and living areas.",
      duration: "3h service",
      priceFrom: 95,
    },
    {
      name: "Office Cleaning",
      description:
        "Professional cleaning for offices, clinics and retail spaces with flexible schedules.",
      duration: "2h service",
      priceFrom: 120,
    },
    {
      name: "Garden Maintenance",
      description:
        "Lawn mowing, hedge trimming, weeding and tidy-ups to keep your garden sharp all year.",
      duration: "2h service",
      priceFrom: 65,
    },
    {
      name: "Landscaping",
      description:
        "Planting, design and outdoor improvements to refresh and upgrade your property.",
      duration: "4h service",
      priceFrom: 160,
    },
    {
      name: "Handyman Repairs",
      description:
        "Minor repairs, furniture assembly, painting and general home & office fixes.",
      duration: "2h service",
      priceFrom: 80,
    },
  ];

  const handleBookClick = (service) => {
    navigate(
      `/book?service=${encodeURIComponent(
        service.name
      )}&price=${service.priceFrom}`
    );
  };

  return (
    <div className="page">
      {/* HEADER */}
      <header className="top-bar">
        <div className="logo">Fast &amp; Clean Ltd</div>

        <div className="nav-dropdown">
          <button className="nav-dropdown-toggle">Menu ▾</button>
          <div className="nav-dropdown-menu">
            <a href="#services">Services</a>
            <a href="#book-online">Book Online</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <h1>Home Services</h1>
        <p className="hero-subtitle">
          Expert cleaning, gardening and handyman services for your home or
          business across Cambridge &amp; London.
          <br />
          Book online, pay securely, and enjoy peace of mind.
        </p>

        <div className="hero-badges">
          <span>✔ Licensed &amp; Insured</span>
          <span>⚡ Same Day Service (subject to availability)</span>
          <span>⭐ Satisfaction Guaranteed</span>
        </div>

        <div className="hero-actions">
          <button
            className="btn-primary"
            onClick={() =>
              navigate(
                `/book?service=${encodeURIComponent(
                  "House Cleaning"
                )}&price=95`
              )
            }
          >
            Book Service Now
          </button>
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
            <div className="stat-label">Available Support</div>
          </div>
          <div>
            <div className="stat-number">5★</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services-section">
        <h2>Our Professional Services</h2>
        <p className="section-subtitle">
          From deep cleaning to garden maintenance and handyman repairs, we
          provide clear packages with upfront pricing.
        </p>

        <div className="booking-system">
          <strong>New Booking System:</strong> We now offer two convenient time
          slots per day.{" "}
          <span className="highlight">
            Morning: 9:00 AM – 2:00 PM · Afternoon: 3:00 PM – 7:00 PM
          </span>{" "}
          One booking per slot to ensure dedicated service quality.
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.name} className="service-card">
              <div className="service-icon">★</div>
              <h3>{service.name}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-meta">
                <span>{service.duration}</span>
                <span className="price">From £{service.priceFrom}</span>
              </div>
              <button
                className="btn-service"
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

          <h3>Contact Information</h3>
          <ul className="contact-list">
            <li>
              <strong>Phone:</strong>{" "}
              <a href="tel:07918646714">07918 646714</a>
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
            “The online booking system made everything super easy, and the team
            delivered an excellent clean.”
          </p>
          <p className="testimonial">
            “Great attention to detail and very reliable. Highly recommended.”
          </p>
        </div>

        <div className="contact-right">
          <h3>Send Us a Message</h3>
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert(
                "Thank you! For now this form is a demo. We can collegarlo ad email o backend dopo."
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
            <textarea placeholder="Tell us about your service needs..." />
            <button type="submit" className="btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © 2025 Fast &amp; Clean Ltd. Based in Cambridge &amp; London —
        Professional Home Services.
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/book" element={<Book />} />
    </Routes>
  );
}
