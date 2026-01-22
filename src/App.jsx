import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./Home.jsx";
import Quote from "./Quote.jsx";
import Book from "./Book.jsx";
import Success from "./Success.jsx";
import Cancel from "./Cancel.jsx";

export default function App() {
  const navigate = useNavigate();

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
                if (v.startsWith("#")) {
                  navigate("/");
                  setTimeout(() => {
                    const el = document.querySelector(v);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 50);
                } else {
                  navigate(v);
                }
              }}
              defaultValue=""
            >
              <option value="" disabled>
                Menu
              </option>
              <option value="/">Home</option>
              <option value="/quote?service=deep">Get Quote</option>
              <option value="/quote?service=test">Test Service (£1)</option>
              <option value="/book">Book Online</option>
              <option value="#contact">Contact</option>
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
          © {new Date().getFullYear()} Fast & Clean Ltd — Based in Cambridge & London.
        </div>
      </footer>
    </>
  );
}