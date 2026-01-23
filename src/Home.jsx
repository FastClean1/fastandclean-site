// src/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const googleReviewUrl = "https://g.page/r/CdhuI-exB04dEAE/review";

  const services = [
    {
      title: "Deep Cleaning",
      desc: "Deep, detailed cleaning for kitchens, bathrooms and living areas. Pricing based on property size.",
      price: "From £185 (Flat) / £260 (House)",
      to: "/quote?service=deep",
    },
    {
      title: "End of Tenancy Cleaning",
      desc: "End of tenancy clean with clear pricing based on property size. Ideal for tenants, landlords & agencies.",
      price: "From £215 (Flat) / £290 (House)",
      to: "/quote?service=eot",
    },
    {
      title: "After Building Cleaning",
      desc: "Post-construction / after building clean. Remove dust and building residue with professional results.",
      price: "From £219 (Flat) / £294 (House)",
      to: "/quote?service=after",
    },
    {
      title: "Oven Cleaning",
      desc: "Choose your oven type (single, double, range, Aga) and book instantly. Pricing is fixed by oven type.",
      price: "From £55",
      to: "/quote?service=oven",
    },
    {
      title: "Handyman",
      desc: "Repairs, assembly, minor jobs. £20/hour. Choose 1–4 hours maximum.",
      price: "£20/hour",
      to: "/quote?service=handyman",
    },
    {
      title: "Test Service (£1)",
      desc: "Internal test to validate the full booking + Stripe flow end-to-end.",
      price: "£1",
      to: "/quote?service=test",
    },
  ];

  const reviews = [
    {
      name: "Customer",
      when: "Google Review",
      stars: "★★★★★",
      text: "Great service — fast, professional and very thorough. Would book again.",
    },
    {
      name: "Customer",
      when: "Google Review",
      stars: "★★★★★",
      text: "End of tenancy clean was perfect. Landlord was happy and deposit returned.",
    },
    {
      name: "Customer",
      when: "Google Review",
      stars: "★★★★★",
      text: "Very reliable team. Communication was clear and results were excellent.",
    },
  ];

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-kicker">Fast & Clean Ltd — Professional Cleaning Services</div>

            <h1 className="hero-title">Professional Cleaning, Done Properly</h1>

            <p className="hero-subtitle">
              Instant quotes. Simple booking. Trusted results for homes, end of tenancy, after building and oven
              cleaning.
            </p>

            <div className="hero-badges">
              <span>✅ Insured & professional</span>
              <span>✅ Transparent pricing</span>
              <span>✅ Fast booking</span>
            </div>

            <div className="hero-actions">
              <Link className="btn-primary" to="/quote?service=deep">
                Get an Instant Quote
              </Link>
              <a className="btn-outline" href={googleReviewUrl} target="_blank" rel="noopener noreferrer">
                ⭐ Leave a Google Review
              </a>
            </div>

            <div className="hero-trust">
              <div className="trust-item">
                <strong>10+ years</strong>
                Experience in cleaning
              </div>
              <div className="trust-item">
                <strong>Cambridge & London</strong>
                Coverage area
              </div>
              <div className="trust-item">
                <strong>Instant pricing</strong>
                No waiting for quotes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Choose a service to get an instant quote and continue to booking.</p>

          <div className="booking-banner">
            Tip: If you already know what you need, pick a service below — you’ll see the price instantly.
          </div>

          <div className="services-grid">
            {services.map((s) => (
              <div className="service-card" key={s.title}>
                <div className="service-body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>

                  <div className="service-meta" style={{ marginTop: 10 }}>
                    <span className="price">{s.price}</span>
                  </div>
                </div>

                <div style={{ marginTop: 14 }}>
                  <Link className="btn-primary full-width" to={s.to}>
                    Book / Get Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="reviews-section">
        <div className="container">
          <h2 className="section-title">Reviews</h2>
          <p className="section-subtitle">
            Reviews build trust and help new customers feel confident booking.
          </p>

          <div className="reviews-grid">
            {reviews.map((r, idx) => (
              <div className="review-card" key={idx}>
                <div className="review-top">
                  <div className="review-meta">
                    <strong>{r.name}</strong>
                    <span>{r.when}</span>
                  </div>
                  <div className="review-stars">{r.stars}</div>
                </div>
                <p className="review-text">{r.text}</p>
              </div>
            ))}
          </div>

          <div className="reviews-cta">
            <a className="btn-primary" href={googleReviewUrl} target="_blank" rel="noopener noreferrer">
              ⭐ Leave us a Google Review
            </a>
            <Link className="btn-outline" to="/quote?service=deep">
              Get an Instant Quote
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2 className="section-title">Get In Touch</h2>
              <p className="section-subtitle">
                Ready to book or have questions? We’re here to help.
              </p>

              <ul className="contact-list">
                <li>
                  <strong>Email:</strong> fastandcleanoffice@gmail.com
                </li>
                <li>
                  <strong>Phone:</strong> 07918 646714
                </li>
                <li>
                  <strong>Coverage:</strong> Cambridge & London
                </li>
              </ul>

              <div className="contact-note">
                Want to help us? Leaving a Google review takes 30 seconds and makes a big difference.
              </div>

              <div style={{ marginTop: 12 }}>
                <a className="btn-outline" href={googleReviewUrl} target="_blank" rel="noopener noreferrer">
                  ⭐ Leave a Google Review
                </a>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Se hai già una logica email/submit in un altro file, qui puoi collegarla.
    alert("Message sent! (Connect this form to your email service if needed.)");
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h3>Send Us a Message</h3>

      <div className="form-row">
        <input name="fullName" placeholder="Full Name" required />
        <input name="email" type="email" placeholder="Email Address" required />
      </div>

      <div className="form-row">
        <input name="phone" placeholder="Phone" />
        <input name="postcode" placeholder="Postcode" />
      </div>

      <textarea name="message" placeholder="How can we help?" required />

      <button className="btn-primary full-width" type="submit">
        Send Message
      </button>

      <p className="form-disclaimer">
        By submitting this form you agree to be contacted about your enquiry.
      </p>
    </form>
  );
}