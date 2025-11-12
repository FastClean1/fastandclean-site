import React, { useState } from "react";
import "./book.css";

export default function Book() {
  const [form, setForm] = useState({
    service: "",
    price: "",
    date: "",
    timeSlot: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setStatus("Sending...");

      await emailjs.send("service_fastandclean", "template_booking", {
        to_email: window.BUSINESS_EMAIL,
        customer_email: form.email,
        customer_name: form.fullName,
        service: form.service,
        price: form.price,
        date: form.date,
        timeSlot: form.timeSlot,
        phone: form.phone,
        address: form.address,
        notes: form.notes,
      });

      setStatus("✅ Booking details sent! Check your email for confirmation.");
      setForm({
        service: "",
        price: "",
        date: "",
        timeSlot: "",
        fullName: "",
        email: "",
        phone: "",
        address: "",
        notes: "",
      });
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("❌ Failed to send. Please try again.");
    }
  };

  return (
    <div className="book-page">
      <h1>Book Your Service</h1>
      <p>Complete the form to confirm your booking and receive a confirmation email.</p>

      <form className="book-form" onSubmit={handleSubmit}>
        <label>Service</label>
        <select name="service" value={form.service} onChange={handleChange} required>
          <option value="">Select service</option>
          <option value="Trial Cleaning">Trial Cleaning (£1)</option>
          <option value="House Cleaning">House Cleaning (£95)</option>
          <option value="Office Cleaning">Office Cleaning (£120)</option>
          <option value="Garden Maintenance">Garden Maintenance (£65)</option>
          <option value="Landscaping">Landscaping (£160)</option>
          <option value="Handyman Repairs">Handyman Repairs (£80)</option>
        </select>

        <label>Date</label>
        <input type="date" name="date" value={form.date} onChange={handleChange} required />

        <label>Preferred Time Slot</label>
        <select name="timeSlot" value={form.timeSlot} onChange={handleChange} required>
          <option value="">Select slot</option>
          <option value="Morning (9AM - 2PM)">Morning (9AM - 2PM)</option>
          <option value="Afternoon (3PM - 7PM)">Afternoon (3PM - 7PM)</option>
        </select>

        <label>Full Name</label>
        <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />

        <label>Phone</label>
        <input type="text" name="phone" value={form.phone} onChange={handleChange} required />

        <label>Address</label>
        <textarea name="address" value={form.address} onChange={handleChange} required></textarea>

        <label>Notes (optional)</label>
        <textarea name="notes" value={form.notes} onChange={handleChange}></textarea>

        <button type="submit" className="btn-primary">Send Booking</button>
      </form>

      {status && <p className="status-msg">{status}</p>}
    </div>
  );
}