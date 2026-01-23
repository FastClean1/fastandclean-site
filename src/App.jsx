import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

/* MAIN PAGES */
import Home from "./Home.jsx";
import Quote from "./Quote.jsx";
import Book from "./Book.jsx";
import Success from "./Success.jsx";
import Cancel from "./Cancel.jsx";

/* INFO / POLICY PAGES */
import RefundPolicy from "./RefundPolicy.jsx";
import EOT from "./EOT.jsx";
import DeepCleaning from "./DeepCleaning.jsx";
import Afterbuilding from "./Afterbuilding.jsx";

export default function App() {
  const navigate = useNavigate();

  const WHATSAPP_LINK = "https://wa.me/447777174561";
  const PHONE_DISPLAY = "07777174561";
  const PHONE_TEL = "+447777174561";

  return (
    <>
      {/* HEADER */}
      <header className="site-header">
        <div className="container header-inner">
          <div className="logo">
            <Link to="/">Fast & Clean Ltd</Link>
          </div>

          <div className="nav-menu">
            <select
              defaultValue=""
              onChange={(e) => {
                const value = e.target.value;
                if (!value) return;

                // External link (WhatsApp)
                if (value.startsWith("http")) {
                  window.open(value, "_blank", "noopener,noreferrer");
                  e.target.value = "";
                  return;
                }

                // Anchor
                if (value.startsWith("#")) {
                  navigate("/");
                  setTimeout(() => {
                    const el = document.querySelector(value);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 50);
                  e.target.value = "";
                  return;
                }

                navigate(value);
                e.target.value = "";
              }}
            >
              <option value="" disabled>
                Menu
              </option>

              <option value="/">Home</option>
              <option value="/quote?service=deep">Get a Quote</option>

              <option value="/deep-cleaning">Deep Cleaning – What’s included</option>
              <option value="/end-of-tenancy">End of Tenancy – What’s included</option>
              <option value="/after-building">After Building – What’s included</option>

              <option value="/refund-policy">Refund Policy</option>

              <option value={WHATSAPP_LINK}>WhatsApp</option>
              <option value="#contact">Contact</option>
            </select>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/book" element={<Book />} />

          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />

          {/* INFO PAGES */}
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/end-of-tenancy" element={<EOT />} />
          <Route path="/deep-cleaning" element={<DeepCleaning />} />
          <Route path="/after-building" element={<Afterbuilding />} />
        </Routes>
      </main>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        className="whatsapp-float"
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        💬 <span>WhatsApp</span>
      </a>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container">
          © {new Date().getFullYear()} Fast & Clean Ltd — Cambridge & London ·{" "}
          <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
        </div>
      </footer>
    </>
  );
}