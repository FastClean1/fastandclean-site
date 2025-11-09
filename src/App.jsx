// src/App.jsx

import "./styles.css";

const STRIPE_CHECKOUT_URL =
  "https://buy.stripe.com/your-payment-link-here"; // TODO: replace with your real Stripe Payment Link

function App() {
  return (
    <div className="page">
      {/* HERO */}
      <header className="hero" id="top">
        <div className="hero-inner">
          <h1>Fast &amp; Clean Ltd</h1>
          <p className="hero-subtitle">
            Professional cleaning services in Cambridge and surrounding areas.
          </p>
          <p className="hero-tagline">
            Reliable. Insured. High-standard cleaning for homes and businesses.
          </p>

          <div className="hero-actions">
            <a href="#booking" className="btn btn-primary">
              Get a free quote
            </a>
            <a href="#services" className="btn btn-outline">
              View services
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* SERVICES */}
        <section className="section" id="services">
          <h2 className="section-title">Our Services</h2>
          <p className="section-intro">
            Tailored cleaning solutions for busy professionals, landlords, and
            families.
          </p>
          <div className="cards">
            <div className="card">
              <h3>Regular Domestic Cleaning</h3>
              <p>
                Weekly, fortnightly or monthly cleaning to keep your home fresh
                and tidy.
              </p>
            </div>
            <div className="card">
              <h3>End of Tenancy / Move Out</h3>
              <p>
                Deep clean for check-out inspections. Landlord &amp; agency
                standards.
              </p>
            </div>
            <div className="card">
              <h3>One-Off Deep Cleaning</h3>
              <p>
                Full property refresh: kitchen degrease, bathrooms, limescale,
                skirting, inside windows.
              </p>
            </div>
            <div className="card">
              <h3>After Builders Cleaning</h3>
              <p>
                Removal of dust, paint marks and debris after refurbishment or
                construction work.
              </p>
            </div>
            <div className="card">
              <h3>Carpet &amp; Upholstery (on request)</h3>
              <p>Professional treatment via trusted partners.</p>
            </div>
            <div className="card">
              <h3>Commercial &amp; Office Cleaning</h3>
              <p>
                Flexible cleaning plans for offices, clinics and small
                businesses.
              </p>
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="section section-muted">
          <h2 className="section-title">Why choose Fast &amp; Clean Ltd?</h2>
          <div className="grid-3">
            <div className="card-plain">
              <h3>Trained &amp; Insured</h3>
              <p>
                Professional, vetted cleaners with public liability insurance.
              </p>
            </div>
            <div className="card-plain">
              <h3>Transparent Pricing</h3>
              <p>No hidden fees. Clear quotes before any work is carried out.</p>
            </div>
            <div className="card-plain">
              <h3>Flexible Scheduling</h3>
              <p>Evenings &amp; weekends available upon request.</p>
            </div>
          </div>
        </section>

        {/* BOOKING FORM */}
        <section className="section" id="booking">
          <h2 className="section-title">Request a Booking</h2>
          <p className="section-intro">
            Fill in the form below. We&apos;ll confirm availability and send you
            the final quote.
          </p>

          {/* Netlify form - handles submissions without backend */}
          <form
            name="booking"
            method="POST"
            data-netlify="true"
            className="booking-form"
          >
            <input type="hidden" name="form-name" value="booking" />

            <div className="form-row">
              <div className="field">
                <label>Full name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Smith"
                  required
                />
              </div>
              <div className="field">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+44 7..."
                  required
                />
              </div>
              <div className="field">
                <label>Postcode *</label>
                <input
                  type="text"
                  name="postcode"
                  placeholder="CB1..."
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label>Address *</label>
                <input
                  type="text"
                  name="address"
                  placeholder="House number & street"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label>Service type *</label>
                <select name="service" required>
                  <option value="">Select service</option>
                  <option>Regular domestic cleaning</option>
                  <option>End of tenancy / Move out</option>
                  <option>One-off deep clean</option>
                  <option>After builders</option>
                  <option>Commercial / Office</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="field">
                <label>Preferred date *</label>
                <input type="date" name="date" required />
              </div>
              <div className="field">
                <label>Preferred time *</label>
                <input type="time" name="time" required />
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label>Property size</label>
                <select name="size">
                  <option value="">Select</option>
                  <option>Studio / 1 bed</option>
                  <option>2 bedrooms</option>
                  <option>3 bedrooms</option>
                  <option>4+ bedrooms</option>
                  <option>Office / Commercial</option>
                </select>
              </div>
              <div className="field">
                <label>Extras</label>
                <input
                  type="text"
                  name="extras"
                  placeholder="Oven, fridge, inside windows, etc."
                />
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label>Notes</label>
                <textarea
                  name="notes"
                  rows="4"
                  placeholder="Tell us more about the property or any special requests."
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              Send booking request
            </button>

            <p className="form-helper">
              By submitting, you agree to be contacted by Fast &amp; Clean Ltd
              to confirm your booking.
            </p>
          </form>
        </section>

        {/* STRIPE PAYMENT SECTION */}
        <section className="section section-muted" id="payment">
          <h2 className="section-title">Secure Payment with Stripe</h2>
          <p className="section-intro">
            Once your booking is confirmed, you can pay your deposit or full
            amount securely online.
          </p>
          <p className="section-intro">
            We use{" "}
            <strong>Stripe</strong> for card payments – PCI compliant and
            protected.
          </p>

          <button
            className="btn btn-primary"
            onClick={() => {
              if (STRIPE_CHECKOUT_URL.includes("your-payment-link-here")) {
                alert(
                  "Add your real Stripe Payment Link inside STRIPE_CHECKOUT_URL in App.jsx."
                );
              } else {
                window.location.href = STRIPE_CHECKOUT_URL;
              }
            }}
          >
            Pay with Stripe
          </button>

          <p className="small-note">
            This button should point to your official Stripe Payment Link (you
            can create it from your Stripe Dashboard).
          </p>
        </section>

        {/* COMPANY INFO */}
        <section className="section" id="company">
          <h2 className="section-title">About Fast &amp; Clean Ltd</h2>
          <div className="company-grid">
            <div>
              <h3>Company details</h3>
              <p>Fast &amp; Clean Ltd</p>
              <p>Cambridge, United Kingdom</p>
              <p>Company No: 00000000</p>
              <p>VAT: (if applicable)</p>
            </div>
            <div>
              <h3>Contact</h3>
              <p>Phone: +44 (0)7...</p>
              <p>Email: info@fastandclean.co.uk</p>
              <p>Service area: Cambridge &amp; surrounding villages.</p>
            </div>
            <div>
              <h3>Opening hours</h3>
              <p>Mon – Sat: 08:00 – 18:00</p>
              <p>Evening &amp; Sunday slots on request.</p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Fast &amp; Clean Ltd — All rights
          reserved.
        </p>
        <p className="footer-links">
          <a href="#top">Back to top</a>
          <span>•</span>
          <a href="#services">Services</a>
          <span>•</span>
          <a href="#booking">Booking</a>
          <span>•</span>
          <a href="#company">Company info</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
