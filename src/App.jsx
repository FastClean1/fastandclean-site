import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Book from "./Book";
import "./styles.css";

// Catalogo servizi (mostrato in Home tramite props)
const services = [
  {
    name: "Trial Cleaning",
    description:
      "1-hour trial clean to experience our professional quality. Perfect for first-time customers.",
    duration: "1h service",
    priceFrom: "From £1",
    price: 1,
  },
  {
    name: "House Cleaning",
    description:
      "Regular or deep cleaning for flats and houses, including kitchens, bathrooms and living areas.",
    duration: "3h service",
    priceFrom: "From £95",
    price: 95,
  },
  {
    name: "Office Cleaning",
    description:
      "Professional cleaning for offices, clinics and retail spaces with flexible schedules.",
    duration: "2h service",
    priceFrom: "From £120",
    price: 120,
  },
  {
    name: "Garden Maintenance",
    description:
      "Lawn mowing, hedge trimming, weeding and tidy-ups to keep your garden sharp all year.",
    duration: "2h service",
    priceFrom: "From £65",
    price: 65,
  },
  {
    name: "Landscaping",
    description:
      "Planting, design and outdoor improvements to refresh and upgrade your property.",
    duration: "4h service",
    priceFrom: "From £160",
    price: 160,
  },
  {
    name: "Handyman Repairs",
    description:
      "Minor repairs, furniture assembly, painting and general home & office fixes.",
    duration: "2h service",
    priceFrom: "From £80",
    price: 80,
  },
];

export default function App() {
  return (
    <>
      {/* HEADER */}
      <header className="site-header">
        <div className="container nav-wrap">
          <Link className="brand" to="/">Fast &amp; Clean Ltd</Link>

          {/* Menu a tendina a destra */}
          <details className="menu">
            <summary>Menu</summary>
            <nav className="menu-list">
              <Link to="/">Services</Link>
              <Link to="/book">Book Online</Link>
              <a href="#contact">Contact</a>
            </nav>
          </details>
        </div>
      </header>

      {/* ROUTES */}
      <main>
        <Routes>
          {/* Passo i servizi a Home: lì renderizzi cards + bottoni */}
          <Route path="/" element={<Home services={services} />} />
          <Route path="/book" element={<Book />} />
          {/* fallback */}
          <Route path="*" element={<Home services={services} />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container">
          © {new Date().getFullYear()} Fast &amp; Clean Ltd — Based in Cambridge &amp; London · Professional Home Services.
        </div>
      </footer>
    </>
  );
}