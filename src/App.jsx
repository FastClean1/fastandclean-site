import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home.jsx";
import Quote from "./Quote.jsx";
import Book from "./Book.jsx";

export default function App() {
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <div className="logo">
            <Link to="/">Fast & Clean Ltd</Link>
          </div>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/book" element={<Book />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container">
          © {new Date().getFullYear()} Fast & Clean Ltd — Cambridge & London
        </div>
      </footer>
    </>
  );
}