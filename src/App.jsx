import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Home from "./Home.jsx";
import Quote from "./Quote.jsx";
import Book from "./Book.jsx";
import Success from "./Success.jsx";
import Cancel from "./Cancel.jsx";

import RefundPolicy from "./RefundPolicy.jsx";
import EOT from "./EOT.jsx";
import Deep from "./Deep.jsx";
import AfterBuilding from "./AfterBuilding.jsx";

export default function App() {
  const navigate = useNavigate();

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
                navigate(value);
              }}
            >
              <option value="" disabled>Menu</option>
              <option value="/">Home</option>
              <option value="/quote?service=deep">Get a Quote</option>
              <option value="/refund-policy">Refund Policy</option>
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
          <Route path="/deep-cleaning" element={<Deep />} />
          <Route path="/after-building" element={<AfterBuilding />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container">
          © {new Date().getFullYear()} Fast & Clean Ltd — Cambridge & London
        </div>
      </footer>
    </>
  );
}