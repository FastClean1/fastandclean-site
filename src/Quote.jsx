import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

export default function Quote() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  // service in URL: /quote?service=deep | eot | after
  const serviceKey = (params.get("service") || "deep").toLowerCase();

  // Base prices (with -£15 applied)
  const SERVICES = useMemo(
    () => ({
      deep: {
        id: "deep",
        name: "Deep Cleaning",
        subtitle:
          "Base includes: Kitchen, Primary Living Room & Hallway + 1 Bedroom + 1 Bathroom.",
        base: { flat: 185, house: 260 },
      },
      eot: {
        id: "eot",
        name: "End of Tenancy Cleaning",
        subtitle:
          "Fridge & Freezer included. Base includes: Kitchen, Primary Living Room & Hallway + 1 Bedroom + 1 Bathroom.",
        base: { flat: 215, house: 290 },
      },
      after: {
        id: "after",
        name: "After Building Cleaning",
        subtitle:
          "Base includes: Kitchen, Primary Living Room & Hallway + 1 Bedroom + 1 Bathroom.",
        base: { flat: 219, house: 294 },
      },
    }),
    []
  );

  const cfg = SERVICES[serviceKey] || SERVICES.deep;

  // selections
  const [propertyType, setPropertyType] = useState("flat"); // flat | house
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [extraLivingRooms, setExtraLivingRooms] = useState(0);

  // Safety: prevent 0 values (if browser caches weird state)
  useEffect(() => {
    if (bedrooms < 1) setBedrooms(1);
    if (bathrooms < 1) setBathrooms(1);
    if (extraLivingRooms < 0) setExtraLivingRooms(0);
  }, [bedrooms, bathrooms, extraLivingRooms]);

  // Additional rooms = any bedrooms beyond 1 + bathrooms beyond 1 + extra living rooms beyond the primary (which is included)
  const additionalRooms =
    Math.max(0, bedrooms - 1) +
    Math.max(0, bathrooms - 1) +
    Math.max(0, extraLivingRooms);

  // ✅ RULE: +£35 for each additional room (NO LIMIT)
  const additionalCost = additionalRooms * 35;

  const basePrice = cfg.base[propertyType];
  const total = basePrice + additionalCost;

  const goBook = () => {
    const q = new URLSearchParams({
      serviceKey: cfg.id,
      serviceName: cfg.name,
      propertyType,
      bedrooms: String(bedrooms),
      bathrooms: String(bathrooms),
      extraLivingRooms: String(extraLivingRooms),
      additionalRooms: String(additionalRooms),
      basePrice: String(basePrice),
      additionalCost: String(additionalCost),
      price: String(total),
    });

    navigate(`/book?${q.toString()}`);
  };

  return (
    <div className="booking-container">
      <h1 className="booking-title">{cfg.name} — Instant Quote</h1>

      <p className="section-subtitle" style={{ textAlign: "left" }}>
        Pricing is based on property size (not hourly). Base always includes:{" "}
        <strong>Kitchen + Primary Living Room + Hallway + 1 Bedroom + 1 Bathroom</strong>.
        <br />
        Each additional bedroom, bathroom or extra living room is{" "}
        <strong>+£35</strong> (no limits).
      </p>

      <div className="booking-summary" style={{ marginBottom: 14 }}>
        <p style={{ margin: 0, color: "#4b5563", fontSize: 13 }}>
          {cfg.subtitle}
        </p>
      </div>

      <div className="booking-form">
        <label>Property type *</label>
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="flat">Flat</option>
          <option value="house">House</option>
        </select>

        <label>Bedrooms *</label>
        <select
          value={bedrooms}
          onChange={(e) => setBedrooms(Number(e.target.value))}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <label>Bathrooms *</label>
        <select
          value={bathrooms}
          onChange={(e) => setBathrooms(Number(e.target.value))}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <label>Extra living rooms (primary living room is included) *</label>
        <select
          value={extraLivingRooms}
          onChange={(e) => setExtraLivingRooms(Number(e.target.value))}
        >
          {Array.from({ length: 10 }, (_, i) => i).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="booking-summary">
        <h2 style={{ marginTop: 0 }}>Quote Summary</h2>

        <p>
          <strong>Service:</strong> {cfg.name}
        </p>
        <p>
          <strong>Property:</strong> {propertyType.toUpperCase()} — {bedrooms} bed /{" "}
          {bathrooms} bath
          {extraLivingRooms > 0 ? ` + ${extraLivingRooms} extra living room(s)` : ""}
        </p>

        <p>
          <strong>Base price:</strong> £{basePrice}
        </p>
        <p>
          <strong>Additional rooms:</strong> {additionalRooms} × £35 = £{additionalCost}
        </p>

        <p style={{ marginTop: 10 }}>
          <strong>Total price:</strong> £{total}
        </p>

        <button className="btn-primary full-width" onClick={goBook} style={{ marginTop: 10 }}>
          Continue to booking
        </button>

        <div style={{ marginTop: 12, fontSize: 13, color: "#6b7280" }}>
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}