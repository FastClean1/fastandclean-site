import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Book() {
  const location = useLocation();

  const services = useMemo(
    () => [
      {
        name: "Trial Cleaning",
        price: 1,
        duration: "1h service",
        stripeLink: "https://buy.stripe.com/3cI3cwb4qaozez5akE7N606",
      },
      {
        name: "House Cleaning",
        price: 95,
        duration: "3h service",
        stripeLink: "https://buy.stripe.com/eVq14o6Oa9kv8aH2Sc7N604",
      },
      {
        name: "Office Cleaning",
        price: 120,
        duration: "2h service",
        stripeLink: "https://buy.stripe.com/14A7sM6Oa1S38aHdwQ7N603",
      },
      {
        name: "Garden Maintenance",
        price: 65,
        duration: "2h service",
        stripeLink: "https://buy.stripe.com/6oU4gAgoK9kvaiP8cw7N602",
      },
      {
        name: "Landscaping",
        price: 160,
        duration: "4h service",
        stripeLink: "https://buy.stripe.com/eVqcN6dcy7cnaiPgJ27N601",
      },
      {
        name: "Handyman Repairs",
        price: 80,
        duration: "2h service",
        stripeLink: "https://buy.stripe.com/3cIfZib4qdALbmTfEY7N600",
      },
    ],
    []
  );

  const params = new URLSearchParams(location.search);
  const preselected = params.get("service");

  const [selectedService, setSelectedService] = useState(
    preselected || services[0].name
  );
  const selectedObj = services.find((s) => s.name === selectedService);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning: 9:00 AM – 2:00 PM");

  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (preselected) setSelectedService(preselected);
  }, [preselected]);

  const COMPANY_EMAIL = "fastandcleanoffice@gmail.com";

  // EmailJS settings
  const EMAILJS_PUBLIC_KEY = "5_Cvw67jXHmkH-d_u";
  const EMAILJS_SERVICE_ID = "service_fastandclean";
  const EMAILJS_TEMPLATE_ID = "template_1528593";

  const sendEmails = async () => {
    if (!window.emailjs) {
      throw new Error("EmailJS not loaded. Check index.html CDN.");
    }

    const templateParams = {
      full_name: fullName,
      phone,
      email, // customer email
      customer_email: email,
      service: selectedObj.name,
      price: `£${selectedObj.price}`,
      booking_date: date,
      booking_time: timeSlot,
      address,
      notes,
    };

    // 1) email to company
    await window.emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      { ...templateParams, email: COMPANY_EMAIL },
      EMAILJS_PUBLIC_KEY
    );

    // 2) email to customer
    await window.emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      { ...templateParams, email },
      EMAILJS_PUBLIC_KEY
    );
  };

  const handleProceed = async () => {
    setError("");

    if (!date || !fullName || !email || !phone || !address) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setSending(true);
      await sendEmails();
      window.location.href = selectedObj.stripeLink;
    } catch (e) {
      console.error(e);
      setError("There was a problem sending emails. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="booking-container">
      <h1 className="booking-title">Book Your Service</h1>
      <p className="section-subtitle" style={{ textAlign: "left" }}>
        Choose your preferred service, date and time slot. You’ll be redirected to secure Stripe checkout to complete your booking.
      </p>

      <div className="booking-form">
        <label>Select Service *</label>
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          {services.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>

        <label>Price (£) *</label>
        <input value={selectedObj.price} disabled />

        <label>Preferred Date *</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <label>Preferred Time Slot *</label>
        <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
          <option>Morning: 9:00 AM – 2:00 PM</option>
          <option>Afternoon: 3:00 PM – 7:00 PM</option>
        </select>

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

      <div className="booking-summary">
        <h2 style={{ marginTop: 0 }}>Booking Summary</h2>
        <p><strong>Service:</strong> {selectedObj.name} — £{selectedObj.price}</p>
        <p><strong>Date:</strong> {date || "—"}</p>
        <p><strong>Time Slot:</strong> {timeSlot}</p>
        <p><strong>Duration:</strong> {selectedObj.duration}</p>
      </div>

      {error && <div className="booking-error">{error}</div>}

      <button
        className="btn-primary full-width"
        onClick={handleProceed}
        disabled={sending}
        style={{ marginTop: 14 }}
      >
        {sending ? "Sending..." : "Proceed to Payment"}
      </button>
    </div>
  );
}