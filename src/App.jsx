import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./Home.jsx";
import Quote from "./Quote.jsx";
import Book from "./Book.jsx";
import Success from "./Success.jsx";
import Cancel from "./Cancel.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container header-row">
          <Link to="/" className="brand">
            Fast &amp; Clean Ltd
          </Link>

          <div className="header-right">
            <select
              className="menu-select"
              defaultValue=""
              onChange={(e) => {
                const v = e.target.value;
                if (v) window.location.href = v;
              }}
            >
              <option value="">Menu</option>
              <option value="/#services">Services</option>
              <option value="/#contact">Contact</option>
              <option value="/quote?service=deep">Get a Quote</option>
            </select>
          </div>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/book" element={<Book />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container">
          © {new Date().getFullYear()} Fast &amp; Clean Ltd — Based in Cambridge &amp; London.
        </div>
      </footer>
    </div>
  );
}