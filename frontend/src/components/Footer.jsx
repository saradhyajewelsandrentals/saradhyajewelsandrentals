import React, { useState } from 'react';

export default function Footer({ onSubscribeNewsletter }) {
  const [email, setEmail] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    const res = await onSubscribeNewsletter(email);
    setStatusMsg(res.message);
    if (res.success) setEmail('');
    setTimeout(() => setStatusMsg(''), 6000);
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col footer-brand">
            <span className="footer-brand-title">Saradhya</span>
            <p className="footer-brand-desc">
              Timelessly crafted and impeccably styled jewellery rentals & heirlooms for your memorable occasions.
            </p>
          </div>

          {/* Customer Service */}
          <div className="footer-col">
            <h4 className="footer-heading">Customer Service</h4>
            <ul className="footer-links">
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); alert('Concierge: concierge@saradhyajewels.com | +91 98765 43210'); }}>Contact Us</a></li>
              <li><a href="#shipping" onClick={(e) => { e.preventDefault(); alert('We deliver Pan-India 2 days prior to your event.'); }}>Shipping & Returns</a></li>
              <li><a href="#guidelines" onClick={(e) => { e.preventDefault(); alert('All rentals include sanitization and protective velvet packaging.'); }}>Rental Guidelines</a></li>
              <li><a href="#care" onClick={(e) => { e.preventDefault(); alert('Store away from direct moisture and perfume sprays.'); }}>Jewellery Care</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#faqs" onClick={(e) => { e.preventDefault(); alert('Security deposit is 100% refunded upon return inspection.'); }}>FAQs</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); alert('Saradhya was founded to make royal bridal heirlooms accessible to every bride.'); }}>About Saradhya</a></li>
              <li><a href="#terms" onClick={(e) => { e.preventDefault(); alert('Standard terms apply for return dates and care.'); }}>Terms of Service</a></li>
              <li><a href="#privacy" onClick={(e) => { e.preventDefault(); alert('We protect customer privacy strictly.'); }}>Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col">
            <h4 className="footer-heading">Newsletter</h4>
            <p className="footer-brand-desc" style={{ fontSize: '0.85rem' }}>
              Subscribe for new arrivals, exclusive rental discounts, and style guides.
            </p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                id="newsletter-email-input"
              />
              <button type="submit" className="newsletter-btn" id="newsletter-submit-btn">
                Join
              </button>
            </form>
            {statusMsg && (
              <p style={{ fontSize: '0.78rem', color: '#58111a', fontWeight: 600, marginTop: '0.4rem' }}>
                {statusMsg}
              </p>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          © 2026 Saradhya Jewels & Rentals. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
