import React, { useMemo, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

export default function Quote() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const serviceKey = (params.get("service") || "deep").toLowerCase();

  // === SERVICES CONFIG ===
  const SERVICES = useMemo(
    () => ({
      // 🔹 REAL SERVICES
      deep: { id: "deep", name: "Deep Cleaning", base: { flat: 185, house: 260 } },
      eot: { id: "eot", name: "End of Tenancy Cleaning", base: { flat: 215, house: 290 } },
      after: { id: "after", name: "After Building Cleaning", base: { flat: 219, house: 294 } },

      // 🧪 TEST SERVICE (£1)
      test: {
        id: "test",
        name: "Test Booking (£1)",
        fixedPrice: 1,
      },
    }),
    []
  );

  // =========================
  // 🧪 TEST SERVICE FLOW
  // =========================
  if (serviceKey === "test") {
    const goBookTest = () => {
      const q = new URLSearchParams({
        serviceKey: "test",
        serviceName: "Test Booking (£1)",
        price: "1",
      });
      navigate(`/book?${q.toString()}`);
    };

    return (
      <div className="booking-container">
        <h1 className="booking-title">Test Booking</h1>

        <p className="section-subtitle" style={{ textAlign: "left" }}>
          This is a test service used to verify the booking and Stripe payment flow.
        </p>

        <div className="booking-summary">
          <h2 style={{ marginTop: 0 }}>Summary</h2>
          <p><strong>Service:</strong> Test Booking</p>
          <p><strong>Price:</strong> £1</p>

          <button className="btn-primary full-width" onClick={goBookTest}>
            Continue to booking
          </button>

          <div style={{ marginTop: 12, fontSize: 13 }}>
            <Link to="/">← Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // NORMAL CLEANING FLOW
  // =========================
  const cfg = SERVICES[serviceKey];
  if (!cfg) {
    return (
      <div className="booking-container">
        <h1 className="booking-title">Service not found</h1>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    );
  }

  const [propertyType, setPropertyType] = useState("flat");
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [extraLivingRooms, setExtraLivingRooms] = useState(0);

  const additionalRooms =
    Math.max(0, bedrooms - 1) +
    Math.max(0, bathrooms - 1) +
    Math.max(0, extraLivingRooms);

  const additionalCost = additionalRooms * 35;
  const basePrice = cfg.base[propertyType];
  const total = basePrice + additionalCost;

  const goBookCleaning = () => {
    const q = new URLSearchParams({
      serviceKey: cfg.id,
      serviceName: cfg.name,
      propertyType,
      bedrooms,
      bathrooms,
      extraLivingRooms,
      additionalRooms,
      basePrice,
      additionalCost,
      price: total,
    });
    navigate(`/book?${q.toString()}`);
  };

  return (
    <div className="booking-container">
      <h1 className="booking-title">{cfg.name}</h1>

      <p className="section-subtitle" style={{ textAlign: "left" }}>
        Base includes kitchen, main living room, hallway, 1 bedroom and 1 bathroom.
        Each extra room is <strong>+£35</strong>.
      </p>

      <div className="booking-form">
        <label>Property type</label>
        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
          <option value="flat">Flat</option>
          <option value="house">House</option>
        </select>

        <label>Bedrooms</label>
        <select value={bedrooms} onChange={(e) => setBedrooms(Number(e.target.value))}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>

        <label>Bathrooms</label>
        <select value={bathrooms} onChange={(e) => setBathrooms(Number(e.target.value))}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>

        <label>Extra living rooms</label>
        <select value={extraLivingRooms} onChange={(e) => setExtraLivingRooms(Number(e.target.value))}>
          {Array.from({ length: 10 }, (_, i) => i).map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
      </div>

      <div className="booking-summary">
        <h2 style={{ marginTop: 0 }}>Quote</h2>
        <p>Base: £{basePrice}</p>
        <p>Extra rooms: {additionalRooms} × £35 = £{additionalCost}</p>
        <p><strong>Total:</strong> £{total}</p>

        <button className="btn-primary full-width" onClick={goBookCleaning}>
          Continue to booking
        </button>
      </div>
    </div>
  );
}