import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Book() {
  const [params] = useSearchParams();
  const service = params.get("service");
  const price = params.get("price");

  const [form, setForm] = useState({});

  return (
    <div className="booking-container">
      <h1 className="booking-title">Your details</h1>

      <div className="booking-summary">
        <p><strong>Service:</strong> {service}</p>
        <p><strong>Total price:</strong> £{price}</p>
      </div>

      <div className="booking-form">
        {["Full name", "Phone", "Email", "Address"].map((f) => (
          <input
            key={f}
            placeholder={f}
            onChange={(e) =>
              setForm({ ...form, [f]: e.target.value })
            }
          />
        ))}
      </div>

      <button className="btn-primary full-width">
        Proceed to payment
      </button>
    </div>
  );
}