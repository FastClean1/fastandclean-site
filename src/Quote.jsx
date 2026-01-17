import React, { useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Quote() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const serviceKey = params.get("service");

  const SERVICES = {
    deep: {
      name: "Deep Cleaning",
      base: { flat: 185, house: 260 },
      includes: [
        "Kitchen",
        "Main living room",
        "Hallways",
      ],
      addons: [
        { label: "Balcony", price: 60 },
        { label: "Fridge (inside)", price: 25 },
        { label: "Freezer (inside)", price: 25 },
        { label: "Carpet steam clean", price: 40 },
      ],
    },
    eot: {
      name: "End of Tenancy Cleaning",
      base: { flat: 215, house: 290 },
      includes: [
        "Kitchen",
        "Main living room",
        "Hallways",
        "Fridge & freezer included",
        "Agency standard cleaning",
      ],
      addons: [
        { label: "Balcony", price: 60 },
        { label: "Carpet steam clean", price: 40 },
      ],
    },
    after: {
      name: "After Building Cleaning",
      base: { flat: 219, house: 294 },
      includes: [
        "Post renovation dust removal",
        "Kitchen",
        "Living room",
        "Hallways",
      ],
      addons: [],
    },
  };

  const cfg = SERVICES[serviceKey];

  const [type, setType] = useState("flat");
  const [beds, setBeds] = useState(1);
  const [baths, setBaths] = useState(1);
  const [extraRooms, setExtraRooms] = useState(0);
  const [addons, setAddons] = useState({});

  const additionalRooms =
    Math.max(0, beds - 1) +
    Math.max(0, baths - 1) +
    extraRooms;

  const additionalCost =
    additionalRooms === 0 ? 0 :
    additionalRooms === 1 ? 35 :
    additionalRooms === 2 ? 50 :
    additionalRooms === 3 ? 60 :
    null;

  const addonsTotal = Object.values(addons).reduce((s, v) => s + v, 0);

  const total =
    additionalCost === null
      ? null
      : cfg.base[type] + additionalCost + addonsTotal;

  return (
    <div className="booking-container">
      <h1 className="booking-title">{cfg.name}</h1>

      <div className="booking-summary">
        <strong>What's included</strong>
        <ul>
          {cfg.includes.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
        <p className="note">
          Prices are based on property size, not time.
        </p>
      </div>

      <div className="booking-form">
        <label>Property type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="flat">Flat</option>
          <option value="house">House</option>
        </select>

        <label>Bedrooms</label>
        <select value={beds} onChange={(e) => setBeds(+e.target.value)}>
          {[1,2,3,4,5].map(n => <option key={n}>{n}</option>)}
        </select>

        <label>Bathrooms</label>
        <select value={baths} onChange={(e) => setBaths(+e.target.value)}>
          {[1,2,3].map(n => <option key={n}>{n}</option>)}
        </select>

        <label>Extra living rooms</label>
        <select value={extraRooms} onChange={(e) => setExtraRooms(+e.target.value)}>
          {[0,1,2,3].map(n => <option key={n}>{n}</option>)}
        </select>

        {cfg.addons.map((a) => (
          <label key={a.label} className="addon">
            <input
              type="checkbox"
              onChange={(e) =>
                setAddons({
                  ...addons,
                  [a.label]: e.target.checked ? a.price : 0,
                })
              }
            />
            {a.label} (+£{a.price})
          </label>
        ))}
      </div>

      {total === null ? (
        <div className="booking-error">
          More than 3 additional rooms require a custom quote.
        </div>
      ) : (
        <>
          <div className="booking-summary">
            <strong>Total price: £{total}</strong>
          </div>

          <button
            className="btn-primary full-width"
            onClick={() =>
              navigate(`/book?service=${cfg.name}&price=${total}`)
            }
          >
            Continue
          </button>
        </>
      )}
    </div>
  );
}