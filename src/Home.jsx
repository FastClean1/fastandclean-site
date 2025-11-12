import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home({ services = [] }) {
  const navigate = useNavigate();

  const goToBook = (service) => {
    // manda alla pagina di raccolta dati con service + price precompilati
    navigate(
      `/book?service=${encodeURIComponent(service.name)}&price=${encodeURIComponent(
        service.price ?? ""
      )}`
    );
  };

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner">
          <h1>Home Services</h1>
          <p className="lead">
            Expert cleaning, gardening and handyman services for your home or business
            across Cambridge &amp; London. Book online, pay securely, and enjoy peace of mind.
          </p>

          <div className="badges">
            <span>✅ Licensed &amp; Insured</span>
            <span>⚡ Same Day Service (subject to availability)</span>
            <span>⭐ Satisfaction Guaranteed</span>
          </div>

          <div className="hero-cta">
            <Link to="/book" className="btn btn-primary">Book Service Now</Link>
            <a href="#services" className="btn btn-outline">View Services</a>
          </div>

          <div className="stats">
            <div><strong>500+</strong><span>Happy Customers</span></div>
            <div><strong>24/7</strong><span>Available Support</span></div>
            <div><strong>5★</strong><span>Average Rating</span></div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services">
        <div className="container">
          <h2>Our Professional Services</h2>
          <p className="section-lead">
            From deep cleaning to garden maintenance and handyman repairs, we provide
            clear packages with upfront pricing.
          </p>

          <div className="booking-note">
            <strong>New Booking System:</strong> We now offer two convenient time slots per day.
            <span> Morning: 9:00 AM – 2:00 PM </span> | <span> Afternoon: 3:00 PM – 7:00 PM</span>.
            One booking per slot to ensure dedicated service quality.
          </div>

          <div className="service-grid">
            {services.map((s) => (
              <article className="service-card" key={s.name}>
                <h3>{s.name}</h3>
                <p>{s.description}</p>

                <p className="service-meta">
                  <span>{s.duration}</span>
                  <span className="price">From {s.priceFrom}</span>
                </p>

                <div className="card-actions">
                  <button
                    className="btn btn-primary btn-full"
                    onClick={() => goToBook(s)}
                  >
                    Book This Service
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact">
        <div className="container contact-grid">
          <div>
            <h2>Get In Touch</h2>
            <p>
              Ready to book a service or have questions? We’re here to help with all your
              cleaning, gardening and handyman needs.
            </p>

            <ul className="contact-list">
              <li><strong>Phone:</strong> 07918 646714</li>
              <li><strong>Email:</strong> fastandcleanoffice@gmail.com</li>
              <li><strong>Service Area:</strong> Cambridge &amp; London</li>
              <li><strong>Hours:</strong> Mon–Sat 8:00–18:00, Sun 10:00–16:00</li>
            </ul>
          </div>

          {/* Mini form “vetrina” (il booking vero è nella pagina Book) */}
          <div>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="grid-2">
                <input placeholder="Full Name" required />
                <input type="email" placeholder="Email Address" required />
              </div>
              <div className="grid-2">
                <input placeholder="Phone Number" />
                <input placeholder="Service Area (Cambridge / London / Other)" />
              </div>
              <textarea placeholder="Tell us about your service needs or any questions..." />
              <button className="btn btn-primary" type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}