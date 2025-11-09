import React, { useState } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";

// --- CONFIG BASE ---

const COMPANY = {
  name: "Fast & Clean Ltd",
  phone: "07918646714",
  phoneDisplay: "+44 7918 646714",
  email: "fastandcleanoffice@gmail.com",
  areas: "Cambridge & London",
};

const SERVICES = [
  {
    id: "trial-cleaning",
    name: "Trial Cleaning",
    description:
      "1-hour professional trial clean. Ideal for first-time customers to experience our quality.",
    duration: "1h service",
    price: 40,
  },
  {
    id: "house-cleaning",
    name: "House Cleaning",
    description:
      "Regular or deep cleaning for flats and houses, including kitchens, bathrooms, and living areas.",
    duration: "3h service",
    price: 95,
  },
  {
    id: "office-cleaning",
    name: "Office Cleaning",
    description:
      "Professional commercial cleaning for offices, clinics, retail spaces, and business facilities.",
    duration: "2h service",
    price: 120,
  },
  {
    id: "garden-maintenance",
    name: "Garden Maintenance",
    description:
      "Lawn mowing, hedge trimming, weeding, and seasonal tidy-ups to keep your garden sharp.",
    duration: "2h service",
    price: 65,
  },
  {
    id: "landscaping",
    name: "Landscaping",
    description:
      "Planting, design, and outdoor improvements to refresh and upgrade your property.",
    duration: "4h service",
    price: 160,
  },
  {
    id: "handyman-repairs",
    name: "Handyman Repairs",
    description:
      "Minor repairs, furniture assembly, painting, and small home & office fixes.",
    duration: "2h service",
    price: 80,
  },
];

// Mappa servizi -> link Stripe (PER ORA PLACEHOLDER)
const STRIPE_LINKS = {
  "trial-cleaning": "https://buy.stripe.com/test_trial_cleaning",
  "house-cleaning": "https://buy.stripe.com/test_house_cleaning",
  "office-cleaning": "https://buy.stripe.com/test_office_cleaning",
  "garden-maintenance": "https://buy.stripe.com/test_garden",
  "landscaping": "https://buy.stripe.com/test_landscaping",
  "handyman-repairs": "https://buy.stripe.com/test_handyman",
};

// --- COMPONENTI LAYOUT ---

function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="page-root">
      <header className="top-nav">
        <div className="top-nav-inner">
          <div className="logo">
            <span className="logo-mark">FC</span>
            <div className="logo-text">
              <div className="logo-title">Fast & Clean Ltd</div>
              <div className="logo-sub">Professional Home Services</div>
            </div>
          </div>
          <nav className="nav-links">
            <Link
              to="/"
              className={
                location.pathname === "/" ? "nav-link active" : "nav-link"
              }
            >
              Services
            </Link>
            <Link
              to="/book"
              className={
                location.pathname === "/book" ? "nav-link active" : "nav-link"
              }
            >
              Book Online
            </Link>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </nav>
          <div className="nav-cta">
            <span className="nav-phone">Call: {COMPANY.phoneDisplay}</span>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </div>
          <div className="footer-contact">
            {COMPANY.email} · {COMPANY.areas}
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- HOME (lista servizi + hero) ---

function HomePage() {
  const navigate = useNavigate();

  const handleBookClick = (serviceId) => {
    navigate(`/book?service=${encodeURIComponent(serviceId)}`);
  };

  return (
    <Layout>
      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <p className="hero-kicker">Professional</p>
          <h1 className="hero-title">
            Home <span>Services</span>
          </h1>
          <p className="hero-subtitle">
            Expert cleaning, gardening, and handyman services for your home and
            business across {COMPANY.areas}. Book online, pay securely, and
            enjoy peace of mind.
          </p>

          <div className="hero-badges">
            <div className="hero-badge">✔ Licensed & Insured</div>
            <div className="hero-badge">✔ Same Day Service</div>
            <div className="hero-badge">✔ Satisfaction Guaranteed</div>
          </div>

          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() => navigate("/book")}
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
        </div>
      </section>

      {/* BOOKING INFO BAR */}
      <section className="booking-banner">
        <div className="booking-banner-inner">
          <div className="banner-label">New Booking System</div>
          <div className="banner-text">
            We offer two convenient time slots per day:&nbsp;
            <strong>Morning: 9:00 AM – 2:00 PM</strong>&nbsp; | &nbsp;
            <strong>Afternoon: 3:00 PM – 7:00 PM</strong>. One booking per day
            to ensure quality.
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section id="services" className="services-section">
        <h2 className="section-title">Our Professional Services</h2>
        <p className="section-subtitle">
          From deep cleaning to garden maintenance and handyman repairs, we
          provide transparent prices and reliable service.
        </p>

        <div className="services-grid">
          {SERVICES.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">★</div>
              <h3 className="service-title">{service.name}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-meta">
                <span>{service.duration}</span>
                <span className="service-price">From £{service.price}</span>
              </div>
              <button
                className="btn-primary full"
                onClick={() => handleBookClick(service.id)}
              >
                Book This Service
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT + FORM DUMMY (per ora solo layout) */}
      <section id="contact" className="contact-section">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>
              Ready to book a service or need a custom quote? We are here to
              help with all your cleaning, gardening, and handyman needs.
            </p>
            <ul className="contact-list">
              <li>
                <strong>Phone:</strong> {COMPANY.phoneDisplay}
              </li>
              <li>
                <strong>Email:</strong> {COMPANY.email}
              </li>
              <li>
                <strong>Service Area:</strong> {COMPANY.areas}
              </li>
              <li>
                <strong>Business Hours:</strong> Mon–Sat 8:00 AM – 6:00 PM
              </li>
            </ul>
          </div>
          <div className="contact-form-mock">
            <h3>Send Us a Message</h3>
            <p>We usually reply within 24 hours.</p>
            <div className="input-row">
              <input placeholder="Full Name" />
              <input placeholder="Email Address" />
            </div>
            <input placeholder="Phone Number" />
            <textarea placeholder="Tell us about your request..." />
            <button className="btn-primary full">Send Message</button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// --- BOOKING PAGE ---

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function BookingPage() {
  const query = useQuery();
  const navigate = useNavigate();
  const preSelectedId = query.get("service") || "";

  const [serviceId, setServiceId] = useState(
    SERVICES.some((s) => s.id === preSelectedId) ? preSelectedId : ""
  );
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const selectedService = SERVICES.find((s) => s.id === serviceId) || null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedService || !date || !timeSlot || !fullName || !phone || !email || !address) {
      alert("Please fill in all required fields (*) before proceeding to payment.");
      return;
    }

    // Qui puoi salvare la prenotazione via API/Netlify Function.
    // Per ora facciamo solo redirect a Stripe Payment Link.

    const stripeUrl =
      STRIPE_LINKS[selectedService.id] || "https://stripe.com/payments/checkout";

    // In un setup reale, passeresti i dettagli al backend che crea la sessione Checkout.
    // Per adesso apriamo il link (placeholder).
    window.location.href = stripeUrl;
  };

  return (
    <Layout>
      <section className="booking-page">
        <div className="booking-inner">
          <h1 className="booking-title">Book Your Service</h1>
          <p className="booking-subtitle">
            Choose your service, preferred date and time slot. Only one booking
            per day is available to ensure quality.
          </p>

          <form className="booking-form" onSubmit={handleSubmit}>
            {/* Select Service */}
            <label className="field-label">
              Select Service *
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                required
              >
                <option value="">Choose a service</option>
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} - £{s.price}
                  </option>
                ))}
              </select>
            </label>

            {/* Date */}
            <label className="field-label">
              Preferred Date *
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </label>

            {/* Time Slot */}
            <label className="field-label">
              Preferred Time Slot *
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                required
              >
                <option value="">Select a time slot</option>
                <option value="Morning 9:00 AM – 2:00 PM">
                  Morning 9:00 AM – 2:00 PM
                </option>
                <option value="Afternoon 3:00 PM – 7:00 PM">
                  Afternoon 3:00 PM – 7:00 PM
                </option>
              </select>
            </label>

            {/* Name + Phone */}
            <div className="field-row">
              <label className="field-label half">
                Full Name *
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </label>
              <label className="field-label half">
                Phone Number *
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </label>
            </div>

            {/* Email */}
            <label className="field-label">
              Email Address *
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            {/* Address */}
            <label className="field-label">
              Service Address *
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </label>

            {/* Notes */}
            <label className="field-label">
              Additional Notes (Optional)
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </label>

            {/* Summary */}
            <div className="booking-summary">
              <h3>Booking Summary</h3>
              {selectedService ? (
                <ul>
                  <li>
                    <strong>Service:</strong> {selectedService.name}
                  </li>
                  <li>
                    <strong>Price:</strong> £{selectedService.price}
                  </li>
                  <li>
                    <strong>Duration:</strong> {selectedService.duration}
                  </li>
                  {date && (
                    <li>
                      <strong>Date:</strong> {date}
                    </li>
                  )}
                  {timeSlot && (
                    <li>
                      <strong>Time Slot:</strong> {timeSlot}
                    </li>
                  )}
                  {address && (
                    <li>
                      <strong>Address:</strong> {address}
                    </li>
                  )}
                </ul>
              ) : (
                <p>Select a service to see the summary.</p>
              )}
            </div>

            <div className="booking-actions">
              <button
                type="button"
                className="btn-outline"
                onClick={() => navigate("/")}
              >
                ← Back to Services
              </button>
              <button type="submit" className="btn-primary">
                Proceed to Payment
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}

// --- APP ROOT ---

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/book" element={<BookingPage />} />
    </Routes>
  );
}
