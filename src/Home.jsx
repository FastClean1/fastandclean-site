import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const services = [
    {
      name: "Trial Cleaning",
      description:
        "1-hour trial clean to experience our professional quality. Perfect for first-time customers.",
      duration: "1h service",
      priceFrom: "From £1",
    },
    {
      name: "House Cleaning",
      description:
        "Regular or deep cleaning for flats and houses, including kitchens, bathrooms and living areas.",
      duration: "3h service",
      priceFrom: "From £95",
    },
    {
      name: "Office Cleaning",
      description:
        "Professional cleaning for offices, clinics and retail spaces with flexible schedules.",
      duration: "2h service",
      priceFrom: "From £120",
    },
    {
      name: "Garden Maintenance",
      description:
        "Lawn mowing, hedge trimming, weeding and tidy-ups to keep your garden sharp all year.",
      duration: "2h service",
      priceFrom: "From £65",
    },
    {
      name: "Landscaping",
      description:
        "Planting, design and outdoor improvements to refresh and upgrade your property.",
      duration: "4h service",
      priceFrom: "From £160",
    },
    {
      name: "Handyman Repairs",
      description:
        "Minor repairs, furniture assembly, painting and general home & office fixes.",
      duration: "2h service",
      priceFrom: "From £80",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-content">
          <h1 className="hero-title">Home Services</h1>
          <p className="hero-subtitle">
            Expert cleaning, gardening and handyman services for your home or business across Cambridge & London.
            Book online, pay securely, and enjoy peace of mind.
          </p>

          <div className="hero-badges">
            <span>✅ Licensed & Insured</span>
            <span>⚡ Same Day Service (subject to availability)</span>
            <span>⭐ Satisfaction Guaranteed</span>
          </div>

          <div className="hero-actions">
            <Link to="/book" className="btn-primary">Book Service Now</Link>
            <a href="#services" className="btn-outline">View Services</a>
          </div>

          <div className="hero-stats">
            <div><strong>500+</strong><span>Happy Customers</span></div>
            <div><strong>24/7</strong><span>Available Support</span></div>
            <div><strong>5★</strong><span>Average Rating</span></div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services-section">
        <div className="container">
          <h2 className="section-title">Our Professional Services</h2>
          <p className="section-subtitle">
            From deep cleaning to garden maintenance and handyman repairs, we provide clear packages with upfront pricing.
          </p>

          <div className="booking-banner">
            <strong>New Booking System:</strong> We now offer two convenient time slots per day.
            Morning: 9:00 AM – 2:00 PM | Afternoon: 3:00 PM – 7:00 PM.
            One booking per slot to ensure dedicated service quality.
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

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="container contact-grid">
          <div className="contact-info">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">
              Ready to book a service or have questions? We’re here to help with all your cleaning,
              gardening and handyman needs.
            </p>

            <ul className="contact-list">
              <li><strong>Phone:</strong> 07918 646714</li>
              <li><strong>Email:</strong> fastandcleanoffice@gmail.com</li>
              <li><strong>Service Areas:</strong> Cambridge, London & nearby towns</li>
            </ul>

            <div className="testimonials">
              <h3>What customers say</h3>
              <p>“Super punctual and spotless results.”</p>
              <p>“Great communication and fair prices.”</p>
              <p>“Reliable team, will book again.”</p>
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
              <input required placeholder="Full Name" />
              <input required type="email" placeholder="Email Address" />
            </div>

            <textarea required placeholder="Your message..." />

            <button className="btn-primary full-width" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}