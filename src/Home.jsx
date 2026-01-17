import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  // NEW MAIN SERVICES (replace old grid)
  const services = [
    {
      id: "deep",
      name: "Deep Cleaning",
      description:
        "Deep cleaning priced by property size (not hourly). Ideal for a full reset of your home.",
      flatFrom: 185,
      houseFrom: 260,
    },
    {
      id: "eot",
      name: "End of Tenancy Cleaning",
      description:
        "Agency-standard end of tenancy clean. Fridge & freezer cleaning included.",
      flatFrom: 215,
      houseFrom: 290,
    },
    {
      id: "after",
      name: "After Building Cleaning",
      description:
        "Post-renovation clean to remove dust, paint splashes, plaster residue and construction debris.",
      flatFrom: 219,
      houseFrom: 294,
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-content">
          <h1 className="hero-title">Professional Cleaning Services</h1>
          <p className="hero-subtitle">
            Deep Clean, End of Tenancy and After Building Cleaning across Cambridge & London.
            Transparent pricing based on property size. Book online and pay securely.
          </p>

          <div className="hero-badges">
            <span>✅ Licensed & Insured</span>
            <span>⚡ Same Day Service (subject to availability)</span>
            <span>⭐ Satisfaction Guaranteed</span>
          </div>

          <div className="hero-actions">
            <a href="#services" className="btn-primary">View Services</a>
            <a href="#contact" className="btn-outline">Contact</a>
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
          <h2 className="section-title">Services & Pricing</h2>
          <p className="section-subtitle">
            Choose a service and get an instant quote. Prices are based on property size (not hourly).
          </p>

          <div className="booking-banner">
            <strong>Booking slots:</strong> Morning: 9:00 AM – 2:00 PM | Afternoon: 3:00 PM – 7:00 PM.
            One booking per slot to ensure dedicated service quality.
          </div>

          <div className="services-grid">
            {services.map((s) => (
              <div className="service-card" key={s.id}>
                <div className="service-body">
                  <h3>{s.name}</h3>
                  <p>{s.description}</p>

                  <div className="service-meta" style={{ marginTop: 10 }}>
                    <span>From £{s.flatFrom} (Flat)</span>
                    <span className="price">From £{s.houseFrom} (House)</span>
                  </div>
                </div>

                <Link
                  to={`/quote?service=${encodeURIComponent(s.id)}`}
                  className="btn-primary full-width"
                >
                  Get instant quote
                </Link>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14, fontSize: 12, color: "#6b7280", textAlign: "center" }}>
            Kitchen, main living room and hallways are always included in the base price.
            Additional bedrooms and bathrooms are charged as additional rooms.
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="container contact-grid">
          <div className="contact-info">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">
              Ready to book or have questions? We’re based in Cambridge & London and cover nearby towns.
            </p>

            <ul className="contact-list">
              <li><strong>Phone:</strong> 07918 646714</li>
              <li><strong>Email:</strong> fastandcleanoffice@gmail.com</li>
              <li><strong>Location:</strong> Cambridge & London (UK)</li>
              <li><strong>Business:</strong> Fast & Clean Ltd</li>
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