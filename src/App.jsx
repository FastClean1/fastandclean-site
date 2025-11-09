export default function App() {
  return (
    <div className="page">
      {/* NAVBAR */}
      <header className="nav">
        <div className="nav-left">
          <span className="logo">Fast &amp; Clean Ltd</span>
        </div>
        <nav className="nav-links">
          <a href="#services">Services</a>
          <a href="#booking">Book Online</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="nav-right">
          <a href="tel:+447918646714" className="nav-phone">
            07918 646714
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-inner">
          <p className="badge">Professional Cleaning &amp; Home Services</p>
          <h1>
            Professional <span>Home Services</span>
          </h1>
          <p className="hero-subtitle">
            Expert cleaning and maintenance services across Cambridge &amp; London.
            Book online, secure your slot, and enjoy a spotless home or office with
            trusted, insured professionals.
          </p>

          <div className="hero-benefits">
            <div className="benefit">
              <span className="check">✓</span> Licensed &amp; Insured
            </div>
            <div className="benefit">
              <span className="check">✓</span> Same Day / Next Day Slots
            </div>
            <div className="benefit">
              <span className="check">✓</span> Satisfaction Guaranteed
            </div>
          </div>

          <div className="hero-actions">
            <a href="#booking" className="btn-primary">
              Book Service Now
            </a>
            <a href="#services" className="btn-outline">
              View Services
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Online Booking</div>
            </div>
            <div className="stat">
              <div className="stat-number">5★</div>
              <div className="stat-label">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section" id="services">
        <div className="section-header">
          <h2>Our Professional Services</h2>
          <p>
            From deep cleaning to garden care and handyman tasks, Fast &amp; Clean Ltd
            delivers reliable services tailored to busy professionals and families.
          </p>
        </div>

        {/* Booking info bar */}
        <div className="booking-info">
          <div className="booking-label">New Booking System</div>
          <div className="booking-text">
            We offer two convenient time slots per day:
            <span> Morning: 9:00 AM - 2:00 PM</span>
            <span> Afternoon: 3:00 PM - 7:00 PM</span>
            One booking per slot to ensure quality.
          </div>
        </div>

        <div className="services-grid">
          {/* Trial Service */}
          <ServiceCard
            icon="⭐"
            title="Trial Cleaning"
            description="Try our professional quality with a 1-hour trial clean. Ideal for first-time customers."
            duration="1h service"
            price="From £40"
          />

          {/* House Cleaning */}
          <ServiceCard
            icon="🏠"
            title="House Cleaning"
            description="Regular or deep cleaning for flats and houses, including kitchens, bathrooms and living areas."
            duration="3h service"
            price="From £95"
          />

          {/* Office Cleaning */}
          <ServiceCard
            icon="🏢"
            title="Office Cleaning"
            description="Professional cleaning for offices, clinics and retail spaces with flexible schedules."
            duration="2h service"
            price="From £120"
          />

          {/* Garden Maintenance */}
          <ServiceCard
            icon="🌿"
            title="Garden Maintenance"
            description="Lawn mowing, hedge trimming, weeding and seasonal tidy-ups to keep your garden sharp."
            duration="2h service"
            price="From £65"
          />

          {/* Landscaping */}
          <ServiceCard
            icon="🌳"
            title="Landscaping"
            description="Planting, design touches and light outdoor improvements to refresh your property."
            duration="4h service"
            price="From £160"
          />

          {/* Handyman */}
          <ServiceCard
            icon="🛠"
            title="Handyman Repairs"
            description="Minor repairs, furniture assembly, small painting jobs and general home fixes."
            duration="2h service"
            price="From £80"
          />
        </div>
      </section>

      {/* BOOKING SECTION (layout only, logica dopo) */}
      <section className="section booking-section" id="booking">
        <div className="section-header">
          <h2>Book Your Service</h2>
          <p>
            Choose your service, preferred date and time slot. We&apos;ll confirm by
            email or phone. Secure payments will be handled on the next step.
          </p>
        </div>

        <div className="booking-form-wrapper">
          <form
            className="booking-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert(
                "This is a demo layout. Booking + Stripe integration will be connected next."
              );
            }}
          >
            <div className="form-row">
              <div className="form-field">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name" required />
              </div>
              <div className="form-field">
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div className="form-field">
                <label>Service</label>
                <select required>
                  <option value="">Select a service</option>
                  <option>Trial Cleaning</option>
                  <option>House Cleaning</option>
                  <option>Office Cleaning</option>
                  <option>Garden Maintenance</option>
                  <option>Landscaping</option>
                  <option>Handyman Repairs</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Date</label>
                <input type="date" required />
              </div>
              <div className="form-field">
                <label>Time Slot</label>
                <select required>
                  <option value="">Select a time slot</option>
                  <option>Morning (9:00 AM - 2:00 PM)</option>
                  <option>Afternoon (3:00 PM - 7:00 PM)</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label>Notes (optional)</label>
              <textarea
                rows="3"
                placeholder="Tell us about the property, access, parking or special requests."
              />
            </div>

            <button type="submit" className="btn-primary full-width">
              Continue to Secure Payment
            </button>

            <p className="booking-hint">
              * Next step: you&apos;ll be able to review your booking and pay securely
              online.
            </p>
          </form>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="section contact-section" id="contact">
        <div className="contact-layout">
          {/* Contact info */}
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>
              Ready to book or have questions? We&apos;re here to help with all your
              cleaning and maintenance needs.
            </p>

            <div className="contact-item">
              <div className="icon">📞</div>
              <div>
                <div className="label">Phone</div>
                <a href="tel:+447918646714">07918 646714</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="icon">📧</div>
              <div>
                <div className="label">Email</div>
                <a href="mailto:fastandcleanoffice@gmail.com">
                  fastandcleanoffice@gmail.com
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="icon">📍</div>
              <div>
                <div className="label">Service Areas</div>
                <div>Cambridge &amp; London</div>
              </div>
            </div>

            <div className="contact-item">
              <div className="icon">⏰</div>
              <div>
                <div className="label">Business Hours</div>
                <div>Mon–Fri: 8:00 AM – 6:00 PM</div>
                <div>Sat: 8:00 AM – 6:00 PM</div>
                <div>Sun: 10:00 AM – 4:00 PM</div>
                <div className="emergency">Emergency cleaning on request</div>
              </div>
            </div>
          </div>

          {/* Simple contact form (layout only) */}
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message form UI ready. We can hook this to EmailJS next.");
            }}
          >
            <h3>Send Us a Message</h3>
            <p>We aim to reply within 24 hours.</p>

            <div className="form-field">
              <label>Full Name</label>
              <input type="text" required />
            </div>
            <div className="form-field">
              <label>Email Address</label>
              <input type="email" required />
            </div>
            <div className="form-field">
              <label>Phone Number</label>
              <input type="tel" />
            </div>
            <div className="form-field">
              <label>Message</label>
              <textarea rows="4" required />
            </div>

            <button type="submit" className="btn-primary full-width">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div>© {new Date().getFullYear()} Fast &amp; Clean Ltd. All rights reserved.</div>
        <div className="footer-sub">
          Professional cleaning &amp; maintenance services in Cambridge &amp; London.
        </div>
      </footer>
    </div>
  );
}

/* Service card component */
function ServiceCard({ icon, title, description, duration, price }) {
  return (
    <div className="service-card">
      <div className="service-icon">{icon}</div>
      <h3>{title}</h3>
      <p className="service-desc">{description}</p>
      <div className="service-meta">
        <span>{duration}</span>
        <span className="price">{price}</span>
      </div>
      <a href="#booking" className="service-btn">
        Book This Service
      </a>
    </div>
  );
}
