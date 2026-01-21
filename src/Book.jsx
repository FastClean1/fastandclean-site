import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Book() {
  const [params] = useSearchParams();

  const serviceKey = params.get("serviceKey") || "";
  const serviceName = params.get("serviceName") || "Service";

  // Cleaning fields
  const propertyType = params.get("propertyType") || "";
  const bedrooms = params.get("bedrooms") || "";
  const bathrooms = params.get("bathrooms") || "";
  const extraLivingRooms = params.get("extraLivingRooms") || "";
  const additionalRooms = params.get("additionalRooms") || "";
  const basePrice = params.get("basePrice") || "";
  const additionalCost = params.get("additionalCost") || "";

  // Handyman fields
  const hours = params.get("hours") || "";
  const rate = params.get("rate") || "";

  // Oven fields
  const ovenLabel = params.get("ovenLabel") || "";
  const ovenType = params.get("ovenType") || "";

  // Total
  const price = params.get("price") || "";

  // ✅ Date + time slot (ARRIVANO DA QUOTE)
  const bookingDate = params.get("bookingDate") || "";
  const timeSlot = params.get("timeSlot") || "";
  const timeSlotLabel = params.get("timeSlotLabel") || "";
  const timeStart = params.get("timeStart") || "";
  const timeEnd = params.get("timeEnd") || "";

  // Customer details
  const leadServiceAddress = params.get("address") || "";
  const leadEmail = params.get("email") || "";
  const leadPhone = params.get("phone") || "";
  const leadName = params.get("fullName") || "";

  const [fullName, setFullName] = useState(leadName);
  const [phone, setPhone] = useState(leadPhone);
  const [email, setEmail] = useState(leadEmail);
  const [address, setAddress] = useState(leadServiceAddress);
  const [notes, setNotes] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const totalNumber = useMemo(() => {
    const n = Number(price);
    return Number.isFinite(n) ? n : 0;
  }, [price]);

  const totalPence = useMemo(() => Math.round(totalNumber * 100), [totalNumber]);

  const scheduleLabel = useMemo(() => {
    if (timeSlotLabel) return timeSlotLabel;
    if (timeStart && timeEnd) return `${timeStart}–${timeEnd}`;
    return timeSlot || "";
  }, [timeSlotLabel, timeStart, timeEnd, timeSlot]);

  const renderServiceSummary = () => {
    if (serviceKey === "handyman") {
      return (
        <>
          <p><strong>Service:</strong> {serviceName}</p>
          <p><strong>Hours:</strong> {hours} (max 4)</p>
          <p><strong>Rate:</strong> £{rate}/hour</p>
        </>
      );
    }

    if (serviceKey === "oven") {
      return (
        <>
          <p><strong>Service:</strong> {serviceName}</p>
          <p><strong>Oven type:</strong> {ovenLabel || ovenType}</p>
        </>
      );
    }

    return (
      <>
        <p><strong>Service:</strong> {serviceName}</p>
        <p>
          <strong>Property:</strong> {propertyType} · {bedrooms} bed · {bathrooms} bath ·{" "}
          {extraLivingRooms} extra living
        </p>
        <p><strong>Base price:</strong> £{basePrice}</p>
        <p>
          <strong>Additional rooms:</strong> {additionalRooms} · <strong>Additional cost:</strong> £{additionalCost}
        </p>
      </>
    );
  };

  const validate = () => {
    setError("");

    // Date/time devono arrivare da Quote. Se mancano, significa che qualcuno è arrivato qui “a mano”.
    if (!bookingDate || !scheduleLabel) {
      setError("Missing date/time from the quote step. Please go back and select date & time.");
      return false;
    }

    if (!fullName || !phone || !email || !address) {
      setError("Please fill all required fields (name, phone, email, address).");
      return false;
    }

    if (!totalPence || totalPence < 100) {
      setError("Invalid total price. Please go back and recalculate the quote.");
      return false;
    }

    return true;
  };

  const proceedToStripe = async () => {
    if (!validate()) return;

    setLoading(true);
    setError("");

    try {
      const payload = {
        currency: "gbp",
        amount: totalPence,

        service: {
          serviceKey,
          serviceName,
          propertyType,
          bedrooms,
          bathrooms,
          extraLivingRooms,
          additionalRooms,
          basePrice,
          additionalCost,
          hours,
          rate,
          ovenType,
          ovenLabel,
        },

        schedule: {
          bookingDate,
          timeSlot,
          timeSlotLabel,
          timeStart,
          timeEnd,
        },

        customer: {
          fullName,
          phone,
          email,
          address,
          notes,
        },
      };

      const res = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Stripe session creation failed.");
      }

      if (!data?.url) {
        throw new Error("Missing Stripe Checkout URL.");
      }

      window.location.href = data.url;
    } catch (e) {
      setError(e?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-container">
      <h1 className="booking-title">Book your service</h1>

      <div className="booking-summary">
        <h2 style={{ marginTop: 0 }}>Booking Summary</h2>

        {renderServiceSummary()}

        <p><strong>Date:</strong> {bookingDate}</p>
        <p><strong>Time:</strong> {scheduleLabel}</p>

        <p style={{ marginTop: 10 }}>
          <strong>Total:</strong> £{totalNumber}
        </p>
      </div>

      <div className="booking-form">
        <label>Full Name *</label>
        <input value={fullName} onChange={(e) => setFullName(e.target.value)} />

        <label>Phone Number *</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label>Email Address *</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Service Address *</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} />

        <label>Additional Notes (Optional)</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>

      {error && <div className="booking-error">{error}</div>}

      <button
        className="btn-primary full-width"
        onClick={proceedToStripe}
        style={{ marginTop: 14 }}
        disabled={loading}
      >
        {loading ? "Redirecting to Stripe..." : "Pay deposit / Pay now (Stripe)"}
      </button>
    </div>
  );
}