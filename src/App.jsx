import "./styles.css";

export default function App() {
  const STRIPE_PAYMENT_LINK =
    "https://buy.stripe.com/test_payment_link_here"; // Replace this with your real Stripe Payment Link

  return (
    <div className="container">
      {/* HEADER */}
      <header className="header">
        <h1>Fast &amp; Clean Ltd</h1>
        <p className="hero-subtitle">
          Professional cleaning services in Cambridge and London
        </p>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <h2>Clean. Reliable. Professional.</h2>
        <p>
          We provide domestic cleaning, end-of-tenancy cleaning, after-builders
          cleaning, painting, and property maintenance services for homes and
          offices across Cambridge and London.
        </p>
        <a href="#booking" className="btn">
          Book now
        </a>
      </section>

      {/* SERVICES SECTION */}
      <section className="section" id="services">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>End of Tenancy Cleaning</h3>
            <p>Full professional deep clean for moving in or out of a property.</p>
          </div>
          <div className="service-card">
            <h3>After Builders Cleaning</h3>
            <p>
              We remove all dust and construction residue, leaving your space spotless.
            </p>
          </div>
          <div className="service-card">
            <h3>Deep Cleaning</h3>
            <p>Thorough cleaning of kitchens, bathrooms, and hard-to-reach areas.</p>
          </div>
          <div className="service-card">
            <h3>Painting &amp; Maintenance</h3>
            <p>
              We handle painting, small repairs, and handyman jobs for homes and offices.
            </p>
          </div>
          <div className="service-card">
            <h3>Pet Walking</h3>
            <p>Professional and caring pet walking services while you’re busy or away.</p>
          </div>
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section className="section" id="booking">
        <h2 className="section-title">Book Your Cleaning</h2>
        <p>
          Choose your preferred date and time for our cleaning service. Fill in your contact
          details and we’ll confirm your booking.
        </p>

        <form
          name="booking"
          method="POST"
          data-netlify="true"
          className="booking-form"
        >
          <input type="hidden" name="form-name" value="booking" />

          <label>
            Full Name:
            <input type="text" name="name" placeholder="Enter your full name" required />
          </label>

          <label>
            Email:
            <input type="email" name="email" placeholder="Enter your email" required />
          </label>

          <label>
            Phone:
            <input type="tel" name="phone" placeholder="Enter your phone number" required />
          </label>

          <label>
            Postcode:
            <input type="text" name="postcode" placeholder="CB1..." required />
          </label>

          <label>
            Date:
            <input type="date" name="date" required />
          </label>

          <label>
            Time:
            <input type="time" name="time" required />
          </label>

          <label>
            Service Type:
            <select name="service" required>
              <option value="">Select a service</option>
              <option>End of Tenancy Cleaning</option>
              <option>After Builders Cleaning</option>
              <option>Deep Cleaning</option>
              <option>Painting & Maintenance</option>
              <option>Pet Walking</option>
            </select>
          </label>

          <label>
            Notes:
            <textarea
              name="notes"
              rows="4"
              placeholder="Tell us more about your property or special requests."
            />
          </label>

          <button type="submit" className="btn">
            Send Booking Request
          </button>
        </form>
      </section>

      {/* STRIPE PAYMENT */}
      <section className="section" id="payment">
        <h2 className="section-title">Secure Online Payment</h2>
        <p>
          Once your booking is confirmed, you can pay safely online using our Stripe
          checkout link below.
        </p>
        <button
          className="btn"
          onClick={() => {
            if (STRIPE_PAYMENT_LINK.includes("test_payment_link_here")) {
              alert("Please update your real Stripe Payment Link in the code.");
            } else {
              window.location.href = STRIPE_PAYMENT_LINK;
            }
          }}
        >
          Pay with Stripe
        </button>
      </section>

      {/* COMPANY INFO */}
      <section className="section" id="company">
        <h2 className="section-title">About Fast &amp; Clean Ltd</h2>
        <div className="company-grid">
          <div>
            <h3>Company Details</h3>
            <p>Fast &amp; Clean Ltd</p>
            <p>Cambridge &amp; London, United Kingdom</p>
            <p>Company No: 00000000</p>
            <p>VAT: (if applicable)</p>
          </div>

          <div>
            <h3>Contact</h3>
            <p>Phone: 07918646714</p>
            <p>Email: fastandcleanoffice@gmail.com</p>
            <p>Service area: Cambridge &amp; London</p>
          </div>

          <div>
            <h3>Opening Hours</h3>
            <p>Mon – Sat: 08:00 – 18:00</p>
            <p>Evening &amp; Sunday by request</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2025 Fast &amp; Clean Ltd — All rights reserved.</p>
      </footer>
    </div>
  );
}
