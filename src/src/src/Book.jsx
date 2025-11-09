import React, { useMemo, useState } from "react";

import { useLocation, Link } from "react-router-dom";



const SERVICE_OPTIONS = [

  { label: "Trial Cleaning - £40", value: "Trial Cleaning", price: 40, duration: "1 hour" },

  { label: "House Cleaning - £95", value: "House Cleaning", price: 95, duration: "3 hours" },

  { label: "Office Cleaning - £120", value: "Office Cleaning", price: 120, duration: "2 hours" },

  { label: "Garden Maintenance - £65", value: "Garden Maintenance", price: 65, duration: "2 hours" },

  { label: "Landscaping - £160", value: "Landscaping", price: 160, duration: "4 hours" },

  { label: "Handyman Repairs - £80", value: "Handyman Repairs", price: 80, duration: "2 hours" }

];



function useQuery() {

  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);

}



export default function Book() {

  const query = useQuery();

  const preSelected = decodeURIComponent(query.get("service") || "");

  const matched = SERVICE_OPTIONS.find((s) => s.value === preSelected);



  const [service, setService] = useState(matched?.value || SERVICE_OPTIONS[0].value);

  const [date, setDate] = useState("");

  const [slot, setSlot] = useState("");

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");

  const [notes, setNotes] = useState("");



  const selectedService = SERVICE_OPTIONS.find((s) => s.value === service) || SERVICE_OPTIONS[0];



  const handleSubmit = (e) => {

    e.preventDefault();

    if (!date || !slot) {

      alert("Please select date and time slot.");

      return;

    }

    if (!name || !phone || !email || !address) {

      alert("Please fill all required fields.");

      return;

    }



    // Qui poi collegheremo Stripe Checkout.

    // Per ora facciamo solo una simulazione di redirect.

    const summary = encodeURIComponent(

      `Service: ${selectedService.value}\nPrice: £${selectedService.price}\nDate: ${date}\nTime: ${slot}\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nAddress: ${address}\nNotes: ${notes || "-"}`

    );



    alert(

      "Booking captured. Next step would redirect to Stripe Checkout with this summary:\n\n" +

        decodeURIComponent(summary)

    );



    // Esempio placeholder:

    // window.location.href = "https://buy.stripe.com/test_1234567890"; 

  };



  return (

    <div className="page book-page">

      <header className="nav">

        <div className="nav-left">

          <span className="logo-mark">F</span>

          <span className="logo-text">Fast &amp; Clean Ltd</span>

        </div>

        <nav className="nav-links">

          <Link to="/" className="nav-link">

            Home

          </Link>

          <a href="#top" className="nav-link active">

            Book Your Service

          </a>

          <a href="/#contact" className="nav-link">

            Contact

          </a>

        </nav>

      </header>



      <main className="book-main">

        <section className="section-header">

          <h2>Book Your Service</h2>

          <p>

            Choose your preferred service, date and time slot. Only one booking per slot is available

            to guarantee top quality.

          </p>

        </section>



        <div className="book-grid">

          <form className="book-form" onSubmit={handleSubmit}>

            <div className="form-field">

              <label>Select Service *</label>

              <select

                value={service}

                onChange={(e) => setService(e.target.value)}

                required

              >

                {SERVICE_OPTIONS.map((opt) => (

                  <option key={opt.value} value={opt.value}>

                    {opt.label}

                  </option>

                ))}

              </select>

            </div>



            <div className="form-row">

              <div className="form-field">

                <label>Preferred Date *</label>

                <input

                  type="date"

                  value={date}

                  onChange={(e) => setDate(e.target.value)}

                  required

                />

              </div>

              <div className="form-field">

                <label>Preferred Time Slot *</label>

                <select

                  value={slot}

                  onChange={(e) => setSlot(e.target.value)}

                  required

                >

                  <option value="">Select a time slot</option>

                  <option value="Morning 9:00 - 14:00">Morning 9:00 - 2:00 PM</option>

                  <option value="Afternoon 15:00 - 19:00">Afternoon 3:00 - 7:00 PM</option>

                </select>

              </div>

            </div>



            <div className="form-row">

              <div className="form-field">

                <label>Full Name *</label>

                <input

                  value={name}

                  onChange={(e) => setName(e.target.value)}

                  required

                />

              </div>

              <div className="form-field">

                <label>Phone Number *</label>

                <input

                  value={phone}

                  onChange={(e) => setPhone(e.target.value)}

                  required

                />

              </div>

            </div>



            <div className="form-field">

              <label>Email Address *</label>

              <input

                type="email"

                value={email}

                onChange={(e) => setEmail(e.target.value)}

                required

              />

            </div>



            <div className="form-field">

              <label>Service Address *</label>

              <input

                value={address}

                onChange={(e) => setAddress(e.target.value)}

                required

              />

            </div>



            <div className="form-field">

              <label>Additional Notes (Optional)</label>

              <textarea

                rows="3"

                value={notes}

                onChange={(e) => setNotes(e.target.value)}

                placeholder="Access details, parking info, special requests..."

              />

            </div>



            <button type="submit" className="btn-primary full-width">

              Proceed to Payment

            </button>

          </form>



          <aside className="booking-summary">

            <h3>Booking Summary</h3>

            <ul>

              <li>

                <strong>Service:</strong> {selectedService.value}

              </li>

              <li>

                <strong>Price:</strong> £{selectedService.price}

              </li>

              <li>

                <strong>Duration:</strong> {selectedService.duration}

              </li>

              <li>

                <strong>Date:</strong> {date || "Select a date"}

              </li>

              <li>

                <strong>Time Slot:</strong> {slot || "Select a time slot"}

              </li>

            </ul>

            <p className="summary-note">

              On the next step you’ll be redirected to a secure Stripe checkout

              page to complete your payment.

            </p>

          </aside>

        </div>

      </main>

    </div>

  );


}
