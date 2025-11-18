import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./book.css";

// Config servizi + Stripe payment links
const SERVICES = {
  "Trial Cleaning": {
    price: 1,
    duration: "1h service",
    stripeLink: "https://buy.stripe.com/3cI3cwb4qaozez5akE7N606",
  },
  "House Cleaning": {
    price: 95,
    duration: "3h service",
    stripeLink: "https://buy.stripe.com/eVq14o6Oa9kv8aH2Sc7N604",
  },
  "Office Cleaning": {
    price: 120,
    duration: "2h service",
    stripeLink: "https://buy.stripe.com/14A7sM6Oa1S38aHdwQ7N603",
  },
  "Garden Maintenance": {
    price: 65,
    duration: "2h service",
    stripeLink: "https://buy.stripe.com/6oU4gAgoK9kvaiP8cw7N602",
  },
  Landscaping: {
    price: 160,
    duration: "4h service",
    stripeLink: "https://buy.stripe.com/eVqcN6dcy7cnaiPgJ27N601",
  },
  "Handyman Repairs": {
    price: 80,
    duration: "2h service",
    stripeLink: "https://buy.stripe.com/3cIfZib4qdALbmTfEY7N600",
  },
};

// EmailJS config
const EMAILJS_SERVICE_ID = "service_fastandclean";
const EMAILJS_TEMPLATE_ID = "template_1528593";
const BUSINESS_EMAIL = "fastandcleanoffice@gmail.com";

function useQuery() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}

export default function Book() {
  const query = useQuery();

  const [selectedService, setSelectedService] = useState("Trial Cleaning");
  const [selectedPrice, setSelectedPrice] = useState(1);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning: 9:00 AM – 2:00 PM");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Legge service/price dalla query (?service=...&price=...)
  useEffect(() => {
    const serviceFromUrl = query.get("service");
    const priceFromUrl = query.get("price");

    if (serviceFromUrl && SERVICES[serviceFromUrl]) {
      setSelectedService(serviceFromUrl);
      const defaultPrice = SERVICES[serviceFromUrl].price;
      setSelectedPrice(priceFromUrl ? Number(priceFromUrl) || defaultPrice : defaultPrice);
    } else {
      // default Trial
      setSelectedService("Trial Cleaning");
      setSelectedPrice(SERVICES["Trial Cleaning"].price);
    }
  }, [query]);

  const currentConfig = SERVICES[selectedService];

  // --------- EMAILJS ----------
  const sendEmails = async () => {
    const emailjs = window.emailjs;

    if (!emailjs) {
      console.error("EmailJS non è caricato (window.emailjs mancante).");
      throw new Error("Email service not available");
    }

    // Dati che mandiamo al template
    const templateParams = {
      customer_name: fullName,
      email: email, // il cliente
      service: selectedService,
      price: `£${selectedPrice}`,
      date,
      time_slot: timeSlot,
      address,
      phone,
      notes: notes || "-",
    };

    // 1) Email al cliente
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    // 2) Copia all'azienda (stesso template, ma email = BUSINESS_EMAIL)
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      ...templateParams,
      email: BUSINESS_EMAIL,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Controllo campi obbligatori
    if (
      !selectedService ||
      !date ||
      !timeSlot ||
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !address.trim()
    ) {
      setError("Please fill in all required fields before continuing.");
      return;
    }

    const config = SERVICES[selectedService];
    if (!config || !config.stripeLink) {
      setError("Payment link not configured for this service.");
      return;
    }

    try {
      setIsSubmitting(true);

      // 1) mando le email
      await sendEmails();

      // 2) porto il cliente su Stripe
      window.location.href = config.stripeLink;
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("There was a problem sending emails. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="booking-page">
      <div className="container booking-container">
        <div className="booking-main">
          <h1>Book Your Service</h1>
          <p className="booking-intro">
            Choose your preferred service, date and time slot. You'll then be redirected to
            our secure Stripe checkout to complete your booking.
          </p>

          <form className="booking-form" onSubmit={handleSubmit}>
            {/* Service & price */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="service">Select Service *</label>
                <select
                  id="service"
                  value={selectedService}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedService(value);
                    setSelectedPrice(SERVICES[value].price);
                  }}
                >
                  {Object.keys(SERVICES).map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="price">Price (£)</label>
                <input
                  id="price"
                  type="number"
                  min="0"
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(Number(e.target.value) || 0)}
                />
                <small className="field-hint">
                  Match this with your chosen package.
                </small>
              </div>
            </div>

            {/* Date & time slot */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Preferred Date *</label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="timeSlot">Preferred Time Slot *</label>
                <select
                  id="timeSlot"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                >
                  <option>Morning: 9:00 AM – 2:00 PM</option>
                  <option>Afternoon: 3:00 PM – 7:00 PM</option>
                </select>
              </div>
            </div>

            {/* Customer details */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="address">Service Address *</label>
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="notes">Additional Notes (Optional)</label>
                <textarea
                  id="notes"
                  rows="3"
                  placeholder="Any special instructions or requirements..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            {/* Error message */}
            {error && <p className="form-error">{error}</p>}

            {/* Booking summary + button */}
            <div className="summary-and-button">
              <div className="summary-card">
                <h2 className="summary-title">Booking Summary</h2>
                <p>
                  <strong>Service:</strong> {selectedService} — £{selectedPrice}
                </p>
                <p>
                  <strong>Date:</strong> {date || "Select a date"}
                </p>
                <p>
                  <strong>Time Slot:</strong> {timeSlot}
                </p>
                <p>
                  <strong>Duration:</strong>{" "}
                  {currentConfig ? currentConfig.duration : "-"}
                </p>
              </div>

              <button
                type="submit"
                className="btn-primary btn-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Proceed to Payment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}