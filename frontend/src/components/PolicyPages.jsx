import React, { useState } from 'react';
import { Shield, FileText, CheckCircle2, Mail, Phone, Clock, MapPin, Send, AlertCircle, ArrowLeft } from 'lucide-react';

export default function PolicyPages({ activeTab, onSelectTab, onNavigateHome, onNavigateCollections }) {
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Rental Booking',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', inquiryType: 'Rental Booking', message: '' });
      setFormSubmitted(false);
    }, 6000);
  };

  return (
    <div className="policy-pages-container" style={{ minHeight: '80vh', backgroundColor: '#faf8f5', padding: '2.5rem 0 5rem 0' }}>
      <div className="container" style={{ maxWidth: 1040, margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Top Breadcrumb & Back */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <button
            onClick={onNavigateHome}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'transparent',
              border: 'none',
              color: 'var(--maroon-800)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft size={16} /> Back to Home
          </button>

          <span style={{ fontSize: '0.8rem', color: 'var(--charcoal-500)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Saradhya Legal & Customer Support
          </span>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          backgroundColor: '#ffffff',
          padding: '0.5rem',
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          border: '1px solid #ede7dc',
          marginBottom: '2.5rem'
        }}>
          {[
            { id: 'privacy', label: 'Privacy Policy', icon: Shield },
            { id: 'terms', label: 'Terms & Conditions', icon: FileText },
            { id: 'guidelines', label: 'Rental Guidelines', icon: CheckCircle2 },
            { id: 'contact', label: 'Contact Us', icon: Mail }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: 8,
                  border: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: isActive ? 'var(--maroon-800)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--charcoal-700)'
                }}
              >
                <Icon size={16} color={isActive ? 'var(--gold-400)' : 'currentColor'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* 1. PRIVACY POLICY */}
        {/* ============================================================== */}
        {activeTab === 'privacy' && (
          <div style={{ backgroundColor: '#ffffff', padding: '3rem', borderRadius: 16, border: '1px solid #ede7dc', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ borderBottom: '1px solid #f0eae1', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--gold-600)', textTransform: 'uppercase' }}>
                INDIAN DIGITAL PERSONAL DATA PROTECTION ACT (DPDPA 2023) COMPLIANT
              </span>
              <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: 'var(--maroon-900)', margin: '0.5rem 0' }}>
                Privacy Policy
              </h1>
              <p style={{ color: 'var(--charcoal-500)', fontSize: '0.88rem', margin: 0 }}>
                Effective Date: October 2026 | Last Updated: October 22, 2026
              </p>
            </div>

            <div style={{ lineHeight: 1.8, color: 'var(--charcoal-700)', fontSize: '0.94rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <section>
                <h3 style={{ color: 'var(--maroon-800)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>1. Introduction & Scope</h3>
                <p>
                  At <strong>Saradhya Jewels & Rentals</strong> ("Saradhya", "we", "our", or "us"), we value the trust you place in us when browsing, purchasing, or renting our handcrafted 1-gram rold gold jewellery. This Privacy Policy is prepared in accordance with the <strong>Information Technology Act, 2000</strong>, the <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong>, and the <strong>Digital Personal Data Protection Act, 2023 (DPDPA)</strong> of India.
                </p>
              </section>

              <section>
                <h3 style={{ color: 'var(--maroon-800)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>2. Information We Collect</h3>
                <p>To deliver and manage both retail purchases and jewellery rentals across India, we collect:</p>
                <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                  <li><strong>Personal Identification Details:</strong> Full Name, Email Address, Contact Number, and Delivery/Billing Address.</li>
                  <li><strong>KYC Verification Documents (For Rentals Only):</strong> As per Indian rental standards, customers booking high-value bridal rental suites submit a valid Government Photo ID (such as Aadhaar Card with masked numbers, Voter ID, Driving Licence, or Passport) solely for identity verification and anti-theft security.</li>
                  <li><strong>Payment & Transaction Information:</strong> Order histories and transaction reference tokens. All online payments are handled directly by RBI-authorized payment aggregators (Razorpay / Stripe / UPI). We never store debit/credit card numbers or CVV.</li>
                  <li><strong>Device & Browsing Data:</strong> IP address, device type, and cookies to improve browsing speed and remember your saved bag items.</li>
                </ul>
              </section>

              <section>
                <h3 style={{ color: 'var(--maroon-800)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>3. Purpose & Use of Data</h3>
                <p>Your data is processed strictly for legitimate operational purposes:</p>
                <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                  <li>Processing, packaging, and dispatching jewellery orders to your doorstep.</li>
                  <li>Coordinating delivery schedules 2 days prior to your wedding/event date.</li>
                  <li>Processing security deposit refunds via UPI/NEFT within 3–5 working days upon successful return inspection.</li>
                  <li>Sending automated SMS/WhatsApp shipment tracking notifications.</li>
                </ul>
              </section>

              <section>
                <h3 style={{ color: 'var(--maroon-800)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>4. KYC Document Retention & Safety</h3>
                <p>
                  KYC documents submitted for rental reservations are stored in encrypted cloud storage and are <strong>permanently deleted within 14 days</strong> of the successful return of the rented ornaments and refund of the security deposit. We do NOT sell, rent, or trade your personal data to any third-party marketing companies.
                </p>
              </section>

              <section>
                <h3 style={{ color: 'var(--maroon-800)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>5. Grievance Officer & Contact</h3>
                <p>
                  In accordance with the Information Technology Act 2000 and the Consumer Protection (E-Commerce) Rules 2020, our designated Grievance Officer can be contacted at:
                </p>
                <div style={{ backgroundColor: '#faf8f5', borderLeft: '4px solid var(--gold-500)', padding: '1rem 1.25rem', marginTop: '0.5rem' }}>
                  <strong>Grievance Officer:</strong> Legal & Compliance Desk, Saradhya Jewels & Rentals<br />
                  <strong>Official Email:</strong> <a href="mailto:saradhyajewelsandrentals@gmail.com" style={{ color: 'var(--maroon-800)', fontWeight: 600 }}>saradhyajewelsandrentals@gmail.com</a><br />
                  <strong>Helpline:</strong> +91 98765 43210 (10:00 AM – 8:00 PM IST, Monday to Saturday)<br />
                  <strong>Jurisdiction:</strong> Hyderabad, Telangana, India
                </div>
              </section>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 2. TERMS & CONDITIONS */}
        {/* ============================================================== */}
        {activeTab === 'terms' && (
          <div style={{ backgroundColor: '#ffffff', padding: '3rem', borderRadius: 16, border: '1px solid #ede7dc', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ borderBottom: '1px solid #f0eae1', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--gold-600)', textTransform: 'uppercase' }}>
                INDIAN CONTRACT ACT 1872 & E-COMMERCE RULES 2020 COMPLIANT
              </span>
              <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: 'var(--maroon-900)', margin: '0.5rem 0' }}>
                Terms & Conditions
              </h1>
              <p style={{ color: 'var(--charcoal-500)', fontSize: '0.88rem', margin: 0 }}>
                Please review these binding conditions before placing a purchase or rental order with Saradhya Jewels & Rentals.
              </p>
            </div>

            <div style={{ lineHeight: 1.8, color: 'var(--charcoal-700)', fontSize: '0.94rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <section>
                <h3 style={{ color: 'var(--maroon-800)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>1. Nature of Jewellery & Representation</h3>
                <p>
                  All ornaments listed on Saradhya Jewels & Rentals are premium <strong>1-Gram Rold Gold & micro gold-plated imitation bridal jewellery</strong> crafted over skin-friendly, lead & nickel-free high-grade brass and copper bases. Stones featured are uncut polki crystals, hand-faceted kundan, AAA grade cubic zirconia, and cultured pearls. <em>Our products are not 22K or 24K solid bullion gold.</em>
                </p>
              </section>

              <section>
                <h3 style={{ color: 'var(--maroon-800)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>2. Rental Agreement & Bailment</h3>
                <p>
                  Renting jewellery from Saradhya constitutes a legal bailment under Section 148 of the Indian Contract Act, 1872. The customer ("Bailee") takes temporary possession of the jewellery solely for personal wearing during the reserved rental period and is contractually bound to return the ornaments in the provided protective packaging.
                </p>
              </section>

              <section>
                <h3 style={{ color: 'var(--maroon-800)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>3. Rental Duration & Timing</h3>
                <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                  <li><strong>Standard Rental:</strong> 4 days (Day 1: Arrival, Day 2–3: Celebration & Events, Day 4: Return Courier Pickup).</li>
                  <li><strong>Extended Rental:</strong> 7 or 10-day packages can be requested during booking.</li>
                  <li><strong>Complimentary Buffer:</strong> To guarantee peace of mind, we aim to deliver the jewellery 1 to 2 days prior to your specified event date at no extra charge.</li>
                </ul>
              </section>

              <section>
                <h3 style={{ color: 'var(--maroon-800)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>4. Security Deposit & Refund Policy</h3>
                <p>
                  A refundable security deposit is collected with every rental order. Upon return of the jewellery to our studio, our quality audit team conducts a verification check within 24 hours. The security deposit is <strong>100% refunded within 3 to 5 business days</strong> directly to the original payment mode or bank account via UPI/NEFT.
                </p>
              </section>

              <section>
                <h3 style={{ color: 'var(--maroon-800)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>5. Cancellation & Rescheduling Policy</h3>
                <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                  <li><strong>7+ Days Before Dispatch:</strong> 100% full refund of both rental fee and security deposit.</li>
                  <li><strong>3 to 6 Days Before Dispatch:</strong> 50% rental fee retained (as pieces are blocked and unavailable to other brides); 100% deposit refunded.</li>
                  <li><strong>Date Rescheduling:</strong> Allowed free of charge once, subject to jewellery availability for the revised date.</li>
                </ul>
              </section>

              <section>
                <h3 style={{ color: 'var(--maroon-800)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>6. Governing Law & Dispute Resolution</h3>
                <p>
                  These terms are governed by the laws of the Republic of India. Any legal dispute or claim arising shall be subject to the exclusive jurisdiction of the competent courts in Hyderabad, Telangana, India.
                </p>
              </section>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 3. RENTAL GUIDELINES */}
        {/* ============================================================== */}
        {activeTab === 'guidelines' && (
          <div style={{ backgroundColor: '#ffffff', padding: '3rem', borderRadius: 16, border: '1px solid #ede7dc', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ borderBottom: '1px solid #f0eae1', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--gold-600)', textTransform: 'uppercase' }}>
                INDIAN BRIDAL RENTAL BEST PRACTICES & CARE CODE
              </span>
              <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: 'var(--maroon-900)', margin: '0.5rem 0' }}>
                Rental Guidelines & Care Guide
              </h1>
              <p style={{ color: 'var(--charcoal-500)', fontSize: '0.88rem', margin: 0 }}>
                Essential instructions to ensure an effortless, glamorous, and hassle-free rental experience.
              </p>
            </div>

            <div style={{ lineHeight: 1.8, color: 'var(--charcoal-700)', fontSize: '0.94rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Step Process Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div style={{ backgroundColor: '#faf8f5', border: '1px solid #ede7dc', padding: '1.25rem', borderRadius: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--maroon-800)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '0.5rem' }}>1</div>
                  <h4 style={{ color: 'var(--maroon-900)', margin: '0 0 0.25rem 0' }}>Select & Book</h4>
                  <p style={{ fontSize: '0.82rem', margin: 0, color: 'var(--charcoal-600)' }}>Choose your jewellery, enter your wedding date, and confirm your booking with initial rental fee & deposit.</p>
                </div>
                <div style={{ backgroundColor: '#faf8f5', border: '1px solid #ede7dc', padding: '1.25rem', borderRadius: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--maroon-800)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '0.5rem' }}>2</div>
                  <h4 style={{ color: 'var(--maroon-900)', margin: '0 0 0.25rem 0' }}>Quick KYC</h4>
                  <p style={{ fontSize: '0.82rem', margin: 0, color: 'var(--charcoal-600)' }}>Upload a copy of your Govt photo ID via our secure portal. Verification is confirmed within 2 hours.</p>
                </div>
                <div style={{ backgroundColor: '#faf8f5', border: '1px solid #ede7dc', padding: '1.25rem', borderRadius: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--maroon-800)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '0.5rem' }}>3</div>
                  <h4 style={{ color: 'var(--maroon-900)', margin: '0 0 0.25rem 0' }}>Delivered Ready</h4>
                  <p style={{ fontSize: '0.82rem', margin: 0, color: 'var(--charcoal-600)' }}>Arrives 2 days early in sanitized velvet cases with tamper seals. Ready to wear for your photoshoot & wedding.</p>
                </div>
                <div style={{ backgroundColor: '#faf8f5', border: '1px solid #ede7dc', padding: '1.25rem', borderRadius: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--maroon-800)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '0.5rem' }}>4</div>
                  <h4 style={{ color: 'var(--maroon-900)', margin: '0 0 0.25rem 0' }}>Hassle-Free Return</h4>
                  <p style={{ fontSize: '0.82rem', margin: 0, color: 'var(--charcoal-600)' }}>Place back in the return carton. Our courier partner picks it up from your doorstep. Deposit refunded promptly.</p>
                </div>
              </div>

              {/* Do's and Don'ts */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ backgroundColor: '#f0f7ed', border: '1px solid #cce4c4', padding: '1.5rem', borderRadius: 12 }}>
                  <h4 style={{ color: '#2d6a1b', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={18} /> THE DO'S
                  </h4>
                  <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.86rem', color: '#1f4813', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li>Apply makeup, perfume, deodorants, hairspray, and body lotion <strong>before</strong> putting on your jewellery.</li>
                    <li>Always store each piece in its dedicated velvet-lined slot to avoid stone friction or entanglement.</li>
                    <li>Fasten the dori (neck cords) and ear locks carefully with hairpins for extra bridal comfort.</li>
                    <li>Repack the ornaments back into the original protective casing immediately after your celebration.</li>
                  </ul>
                </div>

                <div style={{ backgroundColor: '#fdf2f2', border: '1px solid #f8c9c9', padding: '1.5rem', borderRadius: 12 }}>
                  <h4 style={{ color: '#991b1b', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertCircle size={18} /> THE DON'TS
                  </h4>
                  <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.86rem', color: '#7f1d1d', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <li><strong>DO NOT</strong> spray perfumes, alcohol-based body mist, or hand sanitizers directly onto 1-gram rold gold surfaces.</li>
                    <li><strong>DO NOT</strong> submerge in water or wear during haldi / pool celebrations where chemical dyes could stain the stones.</li>
                    <li><strong>DO NOT</strong> attempt to polish, solder, bend, or clean with chemical detergents at home.</li>
                    <li><strong>DO NOT</strong> discard the prepaid return courier shipping label provided in the parcel.</li>
                  </ul>
                </div>
              </div>

              {/* Sanitization Assurance */}
              <section style={{ backgroundColor: '#faf8f5', border: '1px solid #ede7dc', padding: '1.5rem', borderRadius: 12 }}>
                <h4 style={{ color: 'var(--maroon-900)', marginTop: 0 }}>Hospital-Grade Sanitization Guarantee</h4>
                <p style={{ margin: 0, fontSize: '0.88rem' }}>
                  Every Saradhya rental suite undergoes a strict 3-step purification process between clients: (1) gentle ultrasonic debris elimination, (2) hospital-grade 254nm UV-C germicidal sterilization, and (3) sealed antimicrobial velvet wrapping. 100% hygienic, skin-friendly, and sterile.
                </p>
              </section>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 4. CONTACT US */}
        {/* ============================================================== */}
        {activeTab === 'contact' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            
            {/* Left: Contact Info & Channels */}
            <div style={{ backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: 16, border: '1px solid #ede7dc', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--gold-600)', textTransform: 'uppercase' }}>
                  SARADHYA ROYAL CONCIERGE
                </span>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: 'var(--maroon-900)', margin: '0.5rem 0' }}>
                  Contact Us
                </h1>
                <p style={{ color: 'var(--charcoal-500)', fontSize: '0.88rem', margin: 0 }}>
                  We are here to assist with bridal fittings, rental date reservations, custom styling consultations, and deposit inquiries.
                </p>
              </div>

              {/* Email Box - Explicitly highlighting saradhyajewelsandrentals@gmail.com */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1.25rem', backgroundColor: '#faf8f5', borderRadius: 12, border: '1px solid #ede7dc' }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, backgroundColor: 'var(--maroon-800)', color: 'var(--gold-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={20} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 0.2rem 0', color: 'var(--maroon-900)', fontSize: '0.95rem' }}>Official Customer Support Email</h4>
                  <a
                    href="mailto:saradhyajewelsandrentals@gmail.com"
                    style={{ color: 'var(--maroon-800)', fontWeight: 700, fontSize: '0.98rem', textDecoration: 'none' }}
                  >
                    saradhyajewelsandrentals@gmail.com
                  </a>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.78rem', color: 'var(--charcoal-500)' }}>
                    Expect a prompt response within 2–4 business hours.
                  </p>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1.25rem', backgroundColor: '#faf8f5', borderRadius: 12, border: '1px solid #ede7dc' }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, backgroundColor: 'var(--maroon-800)', color: 'var(--gold-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={20} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 0.2rem 0', color: 'var(--maroon-900)', fontSize: '0.95rem' }}>Bridal Concierge Helpline & WhatsApp</h4>
                  <a
                    href="tel:+919876543210"
                    style={{ color: 'var(--maroon-800)', fontWeight: 700, fontSize: '0.98rem', textDecoration: 'none' }}
                  >
                    +91 98765 43210
                  </a>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.78rem', color: 'var(--charcoal-500)' }}>
                    Direct WhatsApp bridal styling assistance available daily.
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1.25rem', backgroundColor: '#faf8f5', borderRadius: 12, border: '1px solid #ede7dc' }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, backgroundColor: 'var(--maroon-800)', color: 'var(--gold-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Clock size={20} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 0.2rem 0', color: 'var(--maroon-900)', fontSize: '0.95rem' }}>Operating Hours</h4>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--charcoal-700)', fontWeight: 500 }}>
                    Monday to Saturday: 10:00 AM – 8:00 PM IST<br />
                    Sunday: 11:00 AM – 6:00 PM IST
                  </p>
                </div>
              </div>

              {/* Shipping Reach */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1.25rem', backgroundColor: '#faf8f5', borderRadius: 12, border: '1px solid #ede7dc' }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, backgroundColor: 'var(--maroon-800)', color: 'var(--gold-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 0.2rem 0', color: 'var(--maroon-900)', fontSize: '0.95rem' }}>Pan-India Express Dispatch</h4>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--charcoal-700)' }}>
                    Serving brides across Hyderabad, Bengaluru, Chennai, Mumbai, Delhi-NCR, Vijayawada, Visakhapatnam, and all Tier-1 & Tier-2 cities in India.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Message Form */}
            <div style={{ backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: 16, border: '1px solid #ede7dc', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: 'var(--maroon-900)', margin: '0 0 0.5rem 0' }}>
                Send Us a Message
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--charcoal-500)', margin: '0 0 1.5rem 0' }}>
                Have a question regarding jewellery dimensions, dates, or security deposit? Fill out the form below.
              </p>

              {formSubmitted ? (
                <div style={{ backgroundColor: '#f0f7ed', border: '1px solid #cce4c4', borderRadius: 12, padding: '2rem', textAlign: 'center' }}>
                  <CheckCircle2 size={40} color="#2d6a1b" style={{ margin: '0 auto 1rem auto' }} />
                  <h4 style={{ color: '#2d6a1b', margin: '0 0 0.5rem 0' }}>Thank You for Reaching Out!</h4>
                  <p style={{ color: '#1f4813', fontSize: '0.88rem', margin: 0 }}>
                    Your message has been delivered to <strong>saradhyajewelsandrentals@gmail.com</strong>. Our bridal coordinator will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--charcoal-700)', marginBottom: '0.35rem' }}>Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Radhika Sharma"
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid #dcd3c4', fontSize: '0.88rem' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--charcoal-700)', marginBottom: '0.35rem' }}>Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@gmail.com"
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid #dcd3c4', fontSize: '0.88rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--charcoal-700)', marginBottom: '0.35rem' }}>WhatsApp / Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 00000"
                        style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid #dcd3c4', fontSize: '0.88rem' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--charcoal-700)', marginBottom: '0.35rem' }}>Inquiry Type</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid #dcd3c4', fontSize: '0.88rem', backgroundColor: '#fff' }}
                    >
                      <option value="Rental Booking">Rental Date & Booking Inquiry</option>
                      <option value="Custom Bridal Set">Bridal Jewellery Matching / Styling</option>
                      <option value="Purchase Inquiry">Direct Purchase & Dispatch Inquiry</option>
                      <option value="Security Deposit">Deposit Refund Status</option>
                      <option value="Other">General Question</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--charcoal-700)', marginBottom: '0.35rem' }}>Your Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please mention your event date, jewelry piece names, or any questions..."
                      style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid #dcd3c4', fontSize: '0.88rem', resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.85rem' }}
                  >
                    <span>Send Message to Concierge</span>
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
