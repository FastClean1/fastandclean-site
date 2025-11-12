import React from "react";
import { Link } from "react-router-dom";

export default function Home({ services }) {
  return (
    <div className="home-wrap">
      <section className="hero">
        <h1>Home Services</h1>
        <p>
          Expert cleaning, gardening and handyman services for your home or business across Cambridge & London.
          Book online, pay securely, and enjoy peace of mind.
        </p>
        <Link to="/book" className="btn-primary">
          Book Service Now
        </Link>
      </section>

      <section className="services">
        <h2>Our Professional Services</h2>
        <div className="service-grid">
          {services.map((service) => (
            <div className="service-card" key={service.name}>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <p className="service-meta">
                {service.duration} <span>{service.priceFrom}</span>
              </p>
              <a href={service.stripeLink} className="btn-primary">
                Book This Service
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}