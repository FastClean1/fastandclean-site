import React, { useMemo, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

export default function Quote() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  // service in URL: /quote?service=deep | eot | after
  const serviceKey = params.get("service") || "deep";

  // Base prices (with your -£15 change already applied)
  // Deep: Flat 185, House 260
  // EOT:  Flat 215, House 290
  // After Building: Flat 219, House 294
  const SERVICES = useMemo(
    () => ({
      deep: {
        id: "deep",
        name: "Deep Cleaning",
        subtitle: "Includes: Kitchen, Primary Living Room & Hallway + 1 Bedroom + 1 Bathroom",
        base: { flat: 185, house: 260 },
      },
      eot: {
        id: "eot",
        name: "End of Tenancy Cleaning",
        subtitle: "Fridge & Freezer included. Base includes 1 Bedroom + 1 Bathroom",
        base: { flat: 215, house: 290 },
      },
      after: {
        id: "after",
        name: "After Building Cleaning",
        subtitle: "Base includes 1 Bedroom + 1 Bathroom",
        base: { flat: 219, house: 294 },
      },
    }),
    []
  );

  const cfg = SERVICES[serviceKey] || SERVICES.deep;

  // User choices
  const [propertyType, setPropertyType] = useState("flat"); // flat | house
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [extraLivingRooms, setExtraLivingRooms] = useState(0);

  // Base always includes: kitchen + primary living room + hallway
  // Plus 1 bedroom + 1 bathroom.
  // Extra rooms are any bedrooms beyond 1, bathrooms beyond 1, and extra living rooms beyond the primary.
  const additionalRooms =
    Math.max(0, bedrooms - 1) +
    Math.max(0, bathrooms - 1) +
    Math.max(0, extraLivingRooms);

  // ✅ NEW RULE: Every additional room (bedroom/bathroom/extra living room) costs +£35 (no limits)
  const additionalCost = useMemo(() => additionalRooms * 35, [additionalRooms]);

  const basePrice = cfg.base[propertyType];
  const total = basePrice + additionalCost;

  const goBook = () => {
    // Pass everything to booking page (so you can email it + use it for Stripe later)
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
        Transparent pricing based on property size (not hourly). Select the number of bedrooms, bathrooms and any extra living rooms.
      </p>

      <div className="booking-summary" style={{ marginBottom: 14 }}>
        <p style={{ margin: 0 }}>
          <strong>Included in base price:</strong> Kitchen + Primary Living Room + Hallway + <strong>1 Bedroom</strong> +{" "}
          <strong>1 Bathroom</strong>.
        </p>
        <p style={{ margin: "8px 0 0" }}>
          <strong>Extra charge:</strong> each additional bedroom, bathroom or extra living room is{" "}
          <strong>+£35</strong> (no limits).
        </p>
        <p style={{ margin: "8px 0 0", color: "#6b7280", fontSize: 13 }}>
          {cfg.subtitle}
        </p>
      </div>

      <div className="booking-form">
        <label>Property type *</label>
        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
          <option value="flat">Flat</option>
          <option value="house">House</option>
        </select>

        <label>Bedrooms *</label>
        <select value={bedrooms} onChange={(e) => setBedrooms(Number(e.target.value))}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <label>Bathrooms *</label>
        <select value={bathrooms} onChange={(e) => setBathrooms(Number(e.target.value))}>
          {Array.from({ length: 6 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <label>Extra living rooms (primary living room is included) *</label>
        <select value={extraLivingRooms} onChange={(e) => setExtraLivingRooms(Number(e.target.value))}>
          {Array.from({ length: 6 }, (_, i) => i).map((n) => (
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
          <strong>Property:</strong> {propertyType.toUpperCase()} — {bedrooms} bed / {bathrooms} bath{" "}
          {extraLivingRooms > 0 ? `+ ${extraLivingRooms} extra living room(s)` : ""}
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