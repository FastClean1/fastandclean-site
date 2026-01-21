import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Book() {
  const [params] = useSearchParams();

  const serviceName = params.get("serviceName");
  const propertyType = params.get("propertyType");
  const bedrooms = params.get("bedrooms");
  const bathrooms = params.get("bathrooms");
  const extraLivingRooms = params.get("extraLivingRooms");
  const price = params.get("price");

  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning: 9:00 AM – 2:00 PM");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState("");

  const todayISO = useMemo(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  }, []);

  const submit = () => {
    if (!date || !timeSlot || !fullName || !phone || !email || !address) {
      setError("Please fill all required fields including date and time.");
      return;
    }

    alert(
      `Booking saved:\n${serviceName}\nDate: ${date}\nTime: ${timeSlot}\nTotal: £${price}`
    );
  };

  return (
    <div className="booking-container">
      <h1 className="booking-title">Booking details</h1>

      <div className="booking-summary">
        <p><strong>Service:</strong> {serviceName}</p>
        <p>
          <strong>Property:</strong> {propertyType} · {bedrooms} bed · {bathrooms} bath ·
          {extraLivingRooms} extra living
        </p>
        <p><strong>Total:</strong> £{price}</p>
      </div>

      <div className="booking-form">
        <label>Date *</label>
        <input type="date" min={todayISO} value={date} onChange={e => setDate(e.target.value)} />

        <label>Time slot *</label>
        <select value={timeSlot} onChange={e => setTimeSlot(e.target.value)}>
          <option>Morning: 9:00 AM – 2:00 PM</option>
          <option>Afternoon: 3:00 PM – 7:00 PM</option>
        </select>

        <label>Full name *</label>
        <input value={fullName} onChange={e => setFullName(e.target.value)} />

        <label>Phone *</label>
        <input value={phone} onChange={e => setPhone(e.target.value)} />

        <label>Email *</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />

        <label>Address *</label>
        <input value={address} onChange={e => setAddress(e.target.value)} />
      </div>

      {error && <div className="booking-error">{error}</div>}

      <button className="btn-primary full-width" onClick={submit}>
        Proceed (Stripe next)
      </button>
    </div>
  );
}