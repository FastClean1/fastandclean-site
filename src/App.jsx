// src/App.jsx
import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Home from "./Home.jsx";
import Quote from "./Quote.jsx";
import Book from "./Book.jsx";
import Success from "./Success.jsx";
import Cancel from "./Cancel.jsx";

// ✅ New “What’s Included” pages
import EOT from "./EOT.jsx";
import DeepCleaning from "./DeepCleaning.jsx";
import AfterBuilding from "./AfterBuilding.jsx";

export default function App() {
  const navigate = useNavigate();

  const PHONE_DISPLAY = "07777174561";
  const PHONE_TEL = "+447777174561";
  const WHATSAPP_LINK = "https://wa.me/447777174561";

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <div className="logo">
            <Link to="/">Fast & Clean Ltd</Link>
          </div>

          <div className="nav-menu">
            <select
              onChange={(e) => {
                const v = e.target.value;
                if (!v) return;

                // External link (WhatsApp)
                if (v.startsWith("http")) {
                  window.open(v, "_blank", "noopener,noreferrer");
                  e.target.value = "";
                  return;
                }

                // Anchor link
                if (v.startsWith("#")) {
                  navigate("/");
                  setTimeout(() => {
                    const el = document.querySelector(v);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 50);
                } else {
                  navigate(v);
                }

                e.target.value = "";
              }}
              defaultValue=""
            >
              <option value="" disabled>
                Menu
              </option>

              <option value="/">Home</option>
              <option value="/quote?service=deep">Get Quote</option>
              <option value="/book">Book Online</option>

              <option value="/included-eot">EOT: What’s included</option>
              <option value="/included-deep">Deep: What’s included</option>
              <option value="/included-after">After Building: What’s included</option>

              <option value={WHATSAPP_LINK}>WhatsApp</option>
              <option value="#contact">Contact</option>
            </select>
          </div>
        </div>
      </header>

      <main>
        <Routes>
          {/* Main */}
          <Route path="/" element={<Home />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/book" element={<Book />} />

          {/* Stripe */}
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />

          {/* ✅ What’s Included pages */}
          <Route path="/included-eot" element={<EOT />} />
          <Route path="/included-deep" element={<DeepCleaning />} />
          <Route path="/included-after" element={<AfterBuilding />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container">
          © {new Date().getFullYear()} Fast & Clean Ltd — Based in Cambridge & London ·{" "}
          <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a> ·{" "}
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      </footer>
    </>
  );
}