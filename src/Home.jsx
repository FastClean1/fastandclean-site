import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const services = [
    {
      id: "deep",
      name: "Deep Cleaning",
      flat: 185,
      house: 260,
    },
    {
      id: "eot",
      name: "End of Tenancy Cleaning",
      flat: 215,
      house: 290,
    },
    {
      id: "after",
      name: "After Building Cleaning",
      flat: 219,
      house: 294,
    },
  ];

  return (
    <section className="services-section">
      <div className="container">
        <h1 className="hero-title">Professional Cleaning Services</h1>
        <p className="hero-subtitle">
          Transparent pricing based on property size. Not hourly.
        </p>

        <div className="services-grid">
          {services.map((s) => (
            <div className="service-card" key={s.id}>
              <div className="service-body">
                <h3>{s.name}</h3>
                <p className="price-line">From £{s.flat} (Flat)</p>
                <p className="price-line">From £{s.house} (House)</p>
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
  );
}