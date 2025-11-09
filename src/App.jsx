import React from "react";
import { Routes, Route, Link, Navigate, useSearchParams } from "react-router-dom";

function App() {
  return (
    <div className="page-root">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

/* ---------- HEADER ---------- */

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="logo">Fast &amp; Clean Ltd</div>

        {/* Menu a destra, con dropdown su mobile */}
        <nav className="nav">
          <a href="#services">Services</a>
          <a href="#book-online">Book Online</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="nav-dropdown">
          <details>
            <summary>Menu ▾</summary>
            <div className="nav-dropdown-menu">
              <a href="#services">Services</a>
              <a href="#book-online">Book Online</a>
              <a href="#contact">Contact</a>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

/* ---------- HOME PAGE ---------- */

function Home() {
  const services = [
    {
      name: "Trial Cleaning",
      description:
        "Experience our professional quality with a 1-hour trial clean. Perfect for first-time customers.",
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
        "Professional commercial cleaning for offices, clinics and retail spaces with flexible schedules.",
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
        "Planting design, patio and outdoor improvements to refresh and upgrade your outdoor space.",
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

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <p className="eyebrow">Professional</p>
          <h1>
            Home <span>Services</span>
          </h1>
          <p className="hero-subtitle">
            Expert cleaning, gardening and handyman services across Cambridge and London.
            Book online, pay securely, and enjoy peace of mind.
          </p>

          <div className="hero-badges">
            <span>✔ Licensed &amp; Insured</span>
            <span>⚡ Same Day Service (subject to availability)</span>
            <span>★ Satisfaction Guaranteed</span>
          </div>

          <div className="hero-actions">
            <Link to="/book" className="btn-primary">
              Book Service Now
            </Link>
            <a href="#services" className="btn-ghost">
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
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services-section">
        <div className="section-header">
          <h2>Our Professional Services</h2>
          <p>
            From deep cleaning to garden maintenance and handyman repairs,
            we provide clear packages with upfront pricing.
          </p>
        </div>

        <div className="booking-note">
          <strong>New Booking System:</strong> We now offer two convenient time slots per day.
          <span className="slot">Morning: 9:00 AM - 2:00 PM</span>
          <span className="slot">Afternoon: 3:00 PM - 7:00 PM</span>
          <span>One booking per slot to ensure dedicated service quality.</span>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.name} className="service-card">
              <div className="service-icon">★</div>
              <h3>{service.name}</h3>
              <p className="service-desc">{service.description}</p>
              <div className="service-meta">
                <span>{service.duration}</span>
                <span className="service-price">From {service.price}</span>
              </div>
              <Link
                className="btn-service"
                to={`/book?service=${encodeURIComponent(
                  service.name
                )}&price=${encodeURIComponent(service.price)}`}
              >
                Book This Service
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAKE ANCHOR PER LINK "Book Online" */}
      <div id="book-online" />

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <h2>Get In Touch</h2>
        <p className="contact-intro">
          Ready to book a service or have questions? We&apos;re here to help with all your
          cleaning, gardening and handyman needs.
        </p>

        <div className="contact-grid">
          {/* Info a sinistra */}
          <div className="contact-info">
            <h3>Contact Information</h3>
            <ul>
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

            <h3>What Our Customers Say</h3>
            <p className="quote">
              “The online booking system made everything super easy, and the team delivered an
              excellent clean.”
            </p>
            <p className="quote">
              “Great attention to detail and very reliable. Highly recommended.”
            </p>
          </div>

          {/* Form a destra */}
          <div className="contact-form-card">
            <h3>Send Us a Message</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! We will contact you shortly.");
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
                  placeholder="Service Area (Cambridge / London)"
                  required
                />
              </div>
              <textarea
                rows="4"
                placeholder="Tell us about your service needs or ask any questions..."
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

/* ---------- BOOK PAGE ---------- */

function BookPage() {
  const [params] = useSearchParams();

  const service = params.get("service") || "Select a service";
  const price = params.get("price") || "";
  const label =
    service && price && service !== "Select a service"
      ? `${service} - ${price}`
      : "Select a service";

  return (
    <section className="book-page">
      <div className="book-card">
        <h1>Book Your Service</h1>
        <p className="book-subtitle">
          Choose your preferred date and time slot. Only one booking per day is available
          to ensure top quality.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(
              "Here we would redirect to the secure Stripe payment page with your booking details."
            );
          }}
        >
          <label className="field-label">Select Service *</label>
          <select defaultValue={label} required>
            <option disabled>Select a service</option>
            <option>{label}</option>
            <option>Trial Cleaning - £40</option>
            <option>House Cleaning - £95</option>
            <option>Office Cleaning - £120</option>
            <option>Garden Maintenance - £65</option>
            <option>Landscaping - £160</option>
            <option>Handyman Repairs - £80</option>
          </select>

          <label className="field-label">Preferred Date *</label>
          <input type="date" required />

          <label className="field-label">Preferred Time Slot *</label>
          <select required>
            <option value="">Select a time slot</option>
            <option>Morning (9:00 AM - 2:00 PM)</option>
            <option>Afternoon (3:00 PM - 7:00 PM)</option>
          </select>

          <div className="form-row">
            <div className="field">
              <label className="field-label">Full Name *</label>
              <input type="text" required />
            </div>
            <div className="field">
              <label className="field-label">Phone Number *</label>
              <input type="tel" required />
            </div>
          </div>

          <label className="field-label">Email Address *</label>
          <input type="email" required />

          <label className="field-label">Service Address *</label>
          <input type="text" required />

          <label className="field-label">Additional Notes (Optional)</label>
          <textarea rows="3" />

          <div className="booking-summary">
            <h3>Booking Summary</h3>
            <p>
              <strong>Service:</strong> {label}
            </p>
            <p>
              <strong>Price:</strong> {price || "TBC"}
            </p>
            <p>
              <strong>Duration:</strong> Based on selected service
            </p>
          </div>

          <button type="submit" className="btn-primary full-width">
            Proceed to Payment
          </button>
        </form>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */

function Footer() {
  return (
    <footer className="site-footer">
      © 2025 Fast &amp; Clean Ltd. Based in Cambridge &amp; London — Professional Home
      Services.
    </footer>
  );
}

export default App;
