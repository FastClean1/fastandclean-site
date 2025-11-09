import React from "react";
import "./styles.css";

function getPaymentStatus() {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const value = params.get("payment");
  if (value === "success") return "success";
  if (value === "cancelled") return "cancelled";
  return null;
}

export default function App() {
  const paymentStatus = getPaymentStatus();

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="page-root">
      {/* Banner pagamento */}
      {paymentStatus === "success" && (
        <div className="payment-banner success">
          ✅ Payment received. Your booking has been submitted. We’ll contact you to confirm details.
        </div>
      )}
      {paymentStatus === "cancelled" && (
        <div className="payment-banner cancel">
          ⚠️ Payment was cancelled. You can try again or contact us for assistance.
        </div>
      )}

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">Fast &amp; Clean Ltd</div>
        <div className="nav-dropdown">
          <button className="nav-dropdown-btn">Menu ▾</button>
          <div className="nav-dropdown-menu">
            <button onClick={() => handleScrollTo("services")}>Services</button>
            <button onClick={() => (window.location.href = "/book")}>
              Book Online
            </button>
            <button onClick={() => handleScrollTo("contact")}>Contact</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <p className="hero-kicker">Professional</p>
        <h1 className="hero-title">
          Home Services
        </h1>
        <p className="hero-subtitle">
          Expert cleaning, gardening and handyman services for your home and business
          across Cambridge &amp; London. Book online, pay securely, and enjoy peace of mind.
        </p>
        <div className="hero-badges">
          <span>✅ Licensed &amp; Insured</span>
          <span>⚡ Same Day Service (subject to availability)</span>
          <span>⭐ Satisfaction Guaranteed</span>
        </div>
        <div className="hero-actions">
          <button
            className="btn-primary"
            onClick={() => (window.location.href = "/book")}
          >
            Book Service Now
          </button>
          <button
            className="btn-ghost"
            onClick={() => handleScrollTo("services")}
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

      {/* SERVICES */}
      <section id="services" className="services-section">
        <h2>Our Professional Services</h2>
        <p className="services-subtitle">
          From deep cleaning to garden maintenance and handyman repairs, we provide
          clear packages with upfront pricing.
        </p>

        <div className="booking-banner">
          <strong>New Booking System:</strong> We now offer two convenient time slots per day.
          <br />
          <span>Morning: 9:00 AM – 2:00 PM &nbsp; | &nbsp; Afternoon: 3:00 PM – 7:00 PM</span>
          <br />
          <small>One booking per slot to ensure dedicated service quality.</small>
        </div>

        <div className="services-grid">
          {/* 1 */}
          <div className="service-card">
            <div className="service-icon">★</div>
            <h3>Trial Cleaning</h3>
            <p>
              1-hour trial clean to experience our professional quality. Ideal for new customers.
            </p>
            <div className="service-meta">
              <span>1h service</span>
              <span>From £40</span>
            </div>
            <button
              className="btn-card"
              onClick={() =>
                (window.location.href = "/book?service=Trial%20Cleaning&price=40")
              }
            >
              Book This Service
            </button>
          </div>

          {/* 2 */}
          <div className="service-card">
            <div className="service-icon">🏠</div>
            <h3>House Cleaning</h3>
            <p>
              Regular or deep cleaning for flats and houses, including kitchens, bathrooms and living areas.
            </p>
            <div className="service-meta">
              <span>3h service</span>
              <span>From £95</span>
            </div>
            <button
              className="btn-card"
              onClick={() =>
                (window.location.href = "/book?service=House%20Cleaning&price=95")
              }
            >
              Book This Service
            </button>
          </div>

          {/* 3 */}
          <div className="service-card">
            <div className="service-icon">🏢</div>
            <h3>Office Cleaning</h3>
            <p>
              Professional cleaning for offices, clinics and retail spaces with flexible schedules.
            </p>
            <div className="service-meta">
              <span>2h service</span>
              <span>From £120</span>
            </div>
            <button
              className="btn-card"
              onClick={() =>
                (window.location.href = "/book?service=Office%20Cleaning&price=120")
              }
            >
              Book This Service
            </button>
          </div>

          {/* 4 */}
          <div className="service-card">
            <div className="service-icon">🌿</div>
            <h3>Garden Maintenance</h3>
            <p>
              Lawn mowing, hedge trimming, weeding and tidy-ups to keep your garden sharp.
            </p>
            <div className="service-meta">
              <span>2h service</span>
              <span>From £65</span>
            </div>
            <button
              className="btn-card"
              onClick={() =>
                (window.location.href = "/book?service=Garden%20Maintenance&price=65")
              }
            >
              Book This Service
            </button>
          </div>

          {/* 5 */}
          <div className="service-card">
            <div className="service-icon">🌳</div>
            <h3>Landscaping</h3>
            <p>
              Planting, design and outdoor improvements to refresh and upgrade your property.
            </p>
            <div className="service-meta">
              <span>4h service</span>
              <span>From £160</span>
            </div>
            <button
              className="btn-card"
              onClick={() =>
                (window.location.href = "/book?service=Landscaping&price=160")
              }
            >
              Book This Service
            </button>
          </div>

          {/* 6 */}
          <div className="service-card">
            <div className="service-icon">🛠</div>
            <h3>Handyman Repairs</h3>
            <p>
              Furniture assembly, minor repairs, painting and general home &amp; office fixes.
            </p>
            <div className="service-meta">
              <span>2h service</span>
              <span>From £80</span>
            </div>
            <button
              className="btn-card"
              onClick={() =>
                (window.location.href = "/book?service=Handyman%20Repairs&price=80")
              }
            >
              Book This Service
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="contact-left">
          <h2>Get In Touch</h2>
          <p>
            Ready to book a service or have questions? We're here to help with all your cleaning,
            gardening and handyman needs.
          </p>
          <ul className="contact-list">
            <li><strong>Phone:</strong> 07918 646714</li>
            <li><strong>Email:</strong> fastandcleanoffice@gmail.com</li>
            <li><strong>Service Area:</strong> Cambridge &amp; London</li>
            <li><strong>Hours:</strong> Mon–Sat 8:00–18:00, Sun 10:00–16:00</li>
          </ul>
        </div>

        <div className="contact-right">
          <h3>Send Us a Message</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you! We'll get back to you shortly.");
            }}
          >
            <div className="contact-grid">
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email Address" required />
            </div>
            <div className="contact-grid">
              <input type="tel" placeholder="Phone Number" />
              <input type="text" placeholder="Service Area (Cambridge / London)" />
            </div>
            <textarea placeholder="Tell us about your service needs or questions..." />
            <button type="submit" className="btn-primary full">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © 2025 Fast &amp; Clean Ltd. Based in Cambridge &amp; London – Professional Home Services.
      </footer>
    </div>
  );
}
