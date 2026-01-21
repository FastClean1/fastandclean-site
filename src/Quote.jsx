import React, { useMemo, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

export default function Quote() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const serviceKey = (params.get("service") || "deep").toLowerCase();

  const CLEANING_SERVICES = useMemo(
    () => ({
      deep: { id: "deep", name: "Deep Cleaning", base: { flat: 185, house: 260 } },
      eot: { id: "eot", name: "End of Tenancy Cleaning", base: { flat: 215, house: 290 } },
      after: { id: "after", name: "After Building Cleaning", base: { flat: 219, house: 294 } },
    }),
    []
  );

  // Oven prices chosen inside real competitor ranges:
  // single ~£45–£70, double ~£60–£90, range ~£85–£125, aga often ~£95–£125+
  const OVEN_PRICES = useMemo(
    () => ({
      single: { label: "Single Oven (60cm)", price: 55 },
      double: { label: "Double Oven", price: 75 },
      range: { label: "Range Cooker (90–100cm)", price: 95 },
      aga: { label: "Aga (4 oven / large)", price: 125 },
    }),
    []
  );

  const HANDYMAN_RATE = 20;
  const HANDYMAN_MAX_HOURS = 4;

  // ---------- HANDYMAN FLOW ----------
  const [handymanHours, setHandymanHours] = useState(1);

  const handymanTotal = handymanHours * HANDYMAN_RATE;

  const goBookHandyman = () => {
    const q = new URLSearchParams({
      serviceKey: "handyman",
      serviceName: "Handyman",
      hours: String(handymanHours),
      rate: String(HANDYMAN_RATE),
      price: String(handymanTotal),
    });
    navigate(`/book?${q.toString()}`);
  };

  // ---------- OVEN FLOW ----------
  const [ovenType, setOvenType] = useState("single");
  const ovenTotal = OVEN_PRICES[ovenType]?.price ?? 55;

  const goBookOven = () => {
    const q = new URLSearchParams({
      serviceKey: "oven",
      serviceName: "Oven Cleaning",
      ovenType,
      ovenLabel: OVEN_PRICES[ovenType]?.label || "Oven",
      price: String(ovenTotal),
    });
    navigate(`/book?${q.toString()}`);
  };

  // ---------- CLEANING FLOW ----------
  const cfg = CLEANING_SERVICES[serviceKey];

  const [propertyType, setPropertyType] = useState("flat");
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [extraLivingRooms, setExtraLivingRooms] = useState(0);

  const additionalRooms =
    Math.max(0, bedrooms - 1) +
    Math.max(0, bathrooms - 1) +
    Math.max(0, extraLivingRooms);

  // ✅ RULE: +£35 for each additional room (NO LIMIT)
  const additionalCost = additionalRooms * 35;

  const cleaningBasePrice = cfg ? cfg.base[propertyType] : 0;
  const cleaningTotal = cleaningBasePrice + additionalCost;

  const goBookCleaning = () => {
    const q = new URLSearchParams({
      serviceKey: cfg.id,
      serviceName: cfg.name,
      propertyType,
      bedrooms: String(bedrooms),
      bathrooms: String(bathrooms),
      extraLivingRooms: String(extraLivingRooms),
      additionalRooms: String(additionalRooms),
      basePrice: String(cleaningBasePrice),
      additionalCost: String(additionalCost),
      price: String(cleaningTotal),
    });
    navigate(`/book?${q.toString()}`);
  };

  // ---------- RENDER ----------
  // Handyman
  if (serviceKey === "handyman") {
    return (
      <div className="booking-container">
        <h1 className="booking-title">Handyman — £{HANDYMAN_RATE}/hour</h1>
        <p className="section-subtitle" style={{ textAlign: "left" }}>
          Choose how many hours you need (maximum {HANDYMAN_MAX_HOURS} hours).
        </p>

        <div className="booking-form">
          <label>Hours *</label>
          <select
            value={handymanHours}
            onChange={(e) => setHandymanHours(Number(e.target.value))}
          >
            {Array.from({ length: HANDYMAN_MAX_HOURS }, (_, i) => i + 1).map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>

        <div className="booking-summary">
          <h2 style={{ marginTop: 0 }}>Quote Summary</h2>
          <p><strong>Rate:</strong> £{HANDYMAN_RATE}/hour</p>
          <p><strong>Hours:</strong> {handymanHours}</p>
          <p style={{ marginTop: 10 }}><strong>Total price:</strong> £{handymanTotal}</p>

          <button className="btn-primary full-width" onClick={goBookHandyman}>
            Continue to booking
          </button>

          <div style={{ marginTop: 12, fontSize: 13, color: "#6b7280" }}>
            <Link to="/">← Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  // Oven
  if (serviceKey === "oven") {
    return (
      <div className="booking-container">
        <h1 className="booking-title">Oven Cleaning — Instant Price</h1>
        <p className="section-subtitle" style={{ textAlign: "left" }}>
          Choose the oven type you want cleaned. Price is fixed by oven type.
        </p>

        <div className="booking-form">
          <label>Oven type *</label>
          <select value={ovenType} onChange={(e) => setOvenType(e.target.value)}>
            {Object.entries(OVEN_PRICES).map(([key, v]) => (
              <option key={key} value={key}>
                {v.label} — £{v.price}
              </option>
            ))}
          </select>
        </div>

        <div className="booking-summary">
          <h2 style={{ marginTop: 0 }}>Quote Summary</h2>
          <p><strong>Service:</strong> Oven Cleaning</p>
          <p><strong>Oven:</strong> {OVEN_PRICES[ovenType]?.label}</p>
          <p style={{ marginTop: 10 }}><strong>Total price:</strong> £{ovenTotal}</p>

          <button className="btn-primary full-width" onClick={goBookOven}>
            Continue to booking
          </button>

          <div style={{ marginTop: 12, fontSize: 13, color: "#6b7280" }}>
            <Link to="/">← Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  // Cleaning (deep/eot/after)
  if (!cfg) {
    return (
      <div className="booking-container">
        <h1 className="booking-title">Service not found</h1>
        <p>Go back and select a service.</p>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <h1 className="booking-title">{cfg.name} — Instant Quote</h1>

      <p className="section-subtitle" style={{ textAlign: "left" }}>
        Base always includes: <strong>Kitchen + Primary Living Room + Hallway + 1 Bedroom + 1 Bathroom</strong>.
        <br />
        Each additional bedroom, bathroom or extra living room is <strong>+£35</strong> (no limits).
      </p>

      <div className="booking-form">
        <label>Property type *</label>
        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
          <option value="flat">Flat</option>
          <option value="house">House</option>
        </select>

        <label>Bedrooms *</label>
        <select value={bedrooms} onChange={(e) => setBedrooms(Number(e.target.value))}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        <label>Bathrooms *</label>
        <select value={bathrooms} onChange={(e) => setBathrooms(Number(e.target.value))}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        <label>Extra living rooms (primary living room included) *</label>
        <select value={extraLivingRooms} onChange={(e) => setExtraLivingRooms(Number(e.target.value))}>
          {Array.from({ length: 10 }, (_, i) => i).map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <div className="booking-summary">
        <h2 style={{ marginTop: 0 }}>Quote Summary</h2>
        <p><strong>Base price:</strong> £{cleaningBasePrice} ({propertyType})</p>
        <p><strong>Additional rooms:</strong> {additionalRooms} × £35 = £{additionalCost}</p>
        <p style={{ marginTop: 10 }}><strong>Total price:</strong> £{cleaningTotal}</p>

        <button className="btn-primary full-width" onClick={goBookCleaning}>
          Continue to booking
        </button>

        <div style={{ marginTop: 12, fontSize: 13, color: "#6b7280" }}>
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}