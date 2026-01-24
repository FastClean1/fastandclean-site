// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Quote from "./Quote";
import Book from "./Book";
import Success from "./Success";

import RefundPolicy from "./RefundPolicy";
import EOT from "./EOT";
import DeepCleaning from "./DeepCleaning";
import Afterbuilding from "./Afterbuilding";

export default function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/book" element={<Book />} />
          <Route path="/success" element={<Success />} />

          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/end-of-tenancy" element={<EOT />} />
          <Route path="/deep-cleaning" element={<DeepCleaning />} />
          <Route path="/after-building" element={<Afterbuilding />} />
        </Routes>
      </main>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/447777174561"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
      >
        WhatsApp
      </a>
    </>
  );
}