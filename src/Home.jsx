import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const services = [
    {
      id: "deep",
      name: "Deep Cleaning",
      description:
        "Deep, detailed cleaning for kitchens, bathrooms and living areas. Pricing based on property size.",
      priceFrom: "From £185 (Flat) / £260 (House)",
    },
    {
      id: "eot",
      name: "End of Tenancy Cleaning",
      description:
        "End of tenancy clean with clear pricing based on property size. Ideal for tenants, landlords & agencies.",
      priceFrom: "From £215 (Flat) / £290 (House)",
    },
    {
      id: "after",
      name: "After Building Cleaning",
      description:
        "Post-construction / after building clean. Remove dust and building residue with professional results.",
      priceFrom: "From £219 (Flat) / £294 (House)",
    },
    {
      id: "oven",
      name: "Oven Cleaning",
      description:
        "Choose your oven type (single, double, range, Aga) and book instantly. Pricing is fixed by oven type.",
      priceFrom: "From £55",
    },
    {
      id: "handyman",
      name: "Handyman",
      description:
        "Repairs, assembly, minor jobs. £20/hour. Choose 1–4 hours maximum.",
      priceFrom: "£20/hour",
    },
    {
      id: "test",
      name: "Test Service (£1)",
      description:
        "Internal test to validate the full booking + Stripe flow end-to-end.",
      priceFrom: "£1",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-content">
          <h1 className="hero-title">Home Services</h1>
          <p className="hero-subtitle">
            Professional cleaning, oven cleaning and handyman services across Cambridge &amp; London.
            Transparent pricing, easy booking.
          </p>

          <div className="hero-badges">
            <span>✅ Licensed &amp; Insured</span>
            <span>⭐ Satisfaction Guaranteed</span>
          </div>

          <div className="hero-actions">
            <a href="#services" className="btn-primary">View Services</a>
            <a href="#contact" className="btn-outline">Contact</a>
          </div>

          <div className="hero-stats">
            <div><strong>500+</strong><span>Happy Customers</span></div>
            <div><strong>24/7</strong><span>Support</span></div>
            <div><strong>5★</strong><span>Average Rating</span></div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Choose a service to get an instant quote and continue to booking.
          </p>

          <div className="services-grid">
            {services.map((s) => (
              <div className="service-card" key={s.id}>
                <div className="service-body">
                  <h3>{s.name}</h3>
                  <p>{s.description}</p>
                  <div className="service-meta">
                    <span className="price">{s.priceFrom}</span>
                  </div>
                </div>

                <Link
                  to={`/quote?service=${encodeURIComponent(s.id)}`}
                  className="btn-primary full-width"
                >
                  Book / Get Quote
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
              Ready to book or have questions? We’re here to help.
            </p>

            <ul className="contact-list">
              <li><strong>Phone:</strong> 07918 646714</li>
              <li><strong>Email:</strong> fastandcleanoffice@gmail.com</li>
              <li><strong>Service Areas:</strong> Cambridge, London &amp; nearby towns</li>
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