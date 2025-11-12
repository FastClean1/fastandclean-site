import React from "react";

export default function Home({ services }) {
  return (
    <div className="container">
      <section className="hero center">
        <h1>Home Services</h1>
        <p className="lead">
          Expert cleaning, gardening and handyman services for your home or business across Cambridge & London.
          Book online, pay securely, and enjoy peace of mind.
        </p>

        <div className="badges">
          <span>✅ Licensed & Insured</span>
          <span>⚡ Same Day Service (subject to availability)</span>
          <span>⭐ Satisfaction Guaranteed</span>
        </div>
      </section>

      <section id="services" className="services-block">
        <h2 className="center">Our Professional Services</h2>

        <div className="notice center">
          <strong>New Booking System:</strong> We now offer two convenient time slots per day.
          <span className="pill">Morning: 9:00 AM – 2:00 PM</span>
          <span className="pill">Afternoon: 3:00 PM – 7:00 PM</span>
          <em> One booking per slot to ensure dedicated service quality.</em>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <div className="service-card" key={service.name}>
              <h3>{service.name}</h3>
              <p>{service.description}</p>

              <p className="service-meta">
                {service.duration} <span>{service.priceFrom}</span>
              </p>

              <a
                href={service.stripeLink}
                className="btn btn-primary"
                rel="noopener noreferrer"
                target="_blank"
              >
                Book This Service
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-block">
        <h2>Get In Touch</h2>
        <div className="contact-grid">
          <div>
            <ul className="contact-list">
              <li><strong>Phone:</strong> 07918 646714</li>
              <li><strong>Email:</strong> fastandcleanoffice@gmail.com</li>
              <li><strong>Service Area:</strong> Cambridge & London</li>
              <li><strong>Hours:</strong> Mon–Sat 8:00–18:00, Sun 10:00–16:00</li>
            </ul>
          </div>

          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks! We’ll get back to you shortly.");
            }}
          >
            <div className="row">
              <input placeholder="Full Name" required />
              <input type="email" placeholder="Email Address" required />
            </div>
            <div className="row">
              <input placeholder="Phone Number" required />
              <input placeholder="Service Area (Cambridge / London)" />
            </div>
            <textarea placeholder="Tell us about your service needs..." rows={5} />
            <button className="btn btn-primary" type="submit">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
}