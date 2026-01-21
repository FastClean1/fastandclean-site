import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const services = [
    { id: "deep", name: "Deep Cleaning", flat: 185, house: 260 },
    { id: "eot", name: "End of Tenancy Cleaning", flat: 215, house: 290 },
    { id: "after", name: "After Building Cleaning", flat: 219, house: 294 },
  ];

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <h1 className="hero-title">Professional Cleaning Services</h1>
          <p className="hero-subtitle">
            Deep Cleaning, End of Tenancy and After Building cleaning across Cambridge & London.
            Transparent pricing based on property size.
          </p>

          <div className="hero-badges">
            <span>✅ Licensed & Insured</span>
            <span>⭐ Satisfaction Guaranteed</span>
          </div>

          <div className="hero-actions">
            <a href="#services" className="btn-primary">View Services</a>
            <a href="#contact" className="btn-outline">Contact</a>
          </div>
        </div>
      </section>

      <section id="services" className="services-section">
        <div className="container">
          <h2 className="section-title">Services & Pricing</h2>
          <p className="section-subtitle">
            Get an instant quote based on the size of your property.
          </p>

          <div className="services-grid">
            {services.map(s => (
              <div className="service-card" key={s.id}>
                <div className="service-body">
                  <h3>{s.name}</h3>
                  <div className="service-meta">
                    <span>From £{s.flat} (Flat)</span>
                    <span className="price">From £{s.house} (House)</span>
                  </div>
                </div>

                <Link
                  to={`/quote?service=${s.id}`}
                  className="btn-primary full-width"
                >
                  Get instant quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container contact-grid">
          <div className="contact-info">
            <h2 className="section-title">Get In Touch</h2>
            <ul className="contact-list">
              <li><strong>Phone:</strong> 07918 646714</li>
              <li><strong>Email:</strong> fastandcleanoffice@gmail.com</li>
              <li><strong>Location:</strong> Cambridge & London</li>
            </ul>
          </div>

          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent!");
            }}
          >
            <h3>Send Us a Message</h3>
            <div className="form-row">
              <input required placeholder="Full Name" />
              <input required type="email" placeholder="Email" />
            </div>
            <textarea required placeholder="Your message..." />
            <button className="btn-primary full-width">Send</button>
          </form>
        </div>
      </section>
    </>
  );
}