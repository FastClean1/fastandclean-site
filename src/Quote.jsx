import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Quote() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const serviceKey = params.get("service") || "deep";

  const SERVICES = {
    deep: { name: "Deep Cleaning", base: { flat: 185, house: 260 } },
    eot: { name: "End of Tenancy Cleaning", base: { flat: 215, house: 290 } },
    after: { name: "After Building Cleaning", base: { flat: 219, house: 294 } },
  };

  const cfg = SERVICES[serviceKey];

  const [propertyType, setPropertyType] = useState("flat");
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [extraLivingRooms, setExtraLivingRooms] = useState(0);

  const additionalRooms =
    Math.max(0, bedrooms - 1) +
    Math.max(0, bathrooms - 1) +
    Math.max(0, extraLivingRooms);

  const additionalCost =
    additionalRooms === 0 ? 0 :
    additionalRooms === 1 ? 35 :
    additionalRooms === 2 ? 50 :
    additionalRooms === 3 ? 60 : null;

  if (additionalCost === null) {
    return (
      <div className="booking-container">
        <h1 className="booking-title">Custom quote required</h1>
        <p>Please contact us for properties with more than 3 additional rooms.</p>
      </div>
    );
  }

  const total = cfg.base[propertyType] + additionalCost;

  const goNext = () => {
    const q = new URLSearchParams({
      serviceKey,
      serviceName: cfg.name,
      propertyType,
      bedrooms,
      bathrooms,
      extraLivingRooms,
      price: total,
    });
    navigate(`/book?${q.toString()}`);
  };

  return (
    <div className="booking-container">
      <h1 className="booking-title">{cfg.name}</h1>

      <div className="booking-form">
        <label>Property type</label>
        <select value={propertyType} onChange={e => setPropertyType(e.target.value)}>
          <option value="flat">Flat</option>
          <option value="house">House</option>
        </select>

        <label>Bedrooms</label>
        <select value={bedrooms} onChange={e => setBedrooms(+e.target.value)}>
          {[1,2,3,4,5].map(n => <option key={n}>{n}</option>)}
        </select>

        <label>Bathrooms</label>
        <select value={bathrooms} onChange={e => setBathrooms(+e.target.value)}>
          {[1,2,3].map(n => <option key={n}>{n}</option>)}
        </select>

        <label>Extra living rooms</label>
        <select value={extraLivingRooms} onChange={e => setExtraLivingRooms(+e.target.value)}>
          {[0,1,2,3].map(n => <option key={n}>{n}</option>)}
        </select>
      </div>

      <div className="booking-summary">
        <p><strong>Total:</strong> £{total}</p>
      </div>

      <button className="btn-primary full-width" onClick={goNext}>
        Continue
      </button>
    </div>
  );
}