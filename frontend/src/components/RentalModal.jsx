import React, { useState, useEffect } from 'react';
import { X, Calendar, ShieldCheck, Check, Sparkles, ShoppingBag } from 'lucide-react';

export default function RentalModal({ product, onClose, onAddToCart }) {
  const [mode, setMode] = useState('rent');
  const [days, setDays] = useState(4);
  const [startDate, setStartDate] = useState('');
  const [damageProtection, setDamageProtection] = useState(true);
  const [calcResult, setCalcResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Set default start date to 5 days from today
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 4);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setStartDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Fetch live rental price calculation from Backend API
  useEffect(() => {
    if (!product) return;

    if (mode === 'rent') {
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      fetch(`${apiBase}/rentals/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          days: Number(days),
          damageProtection
        })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setCalcResult(data.data);
          }
        })
        .catch(() => {
          // Fallback local calc if backend not yet running
          const basePrice = product.rentPrice;
          const totalRent = days === 7 ? Math.round(basePrice * 1.6) : basePrice;
          const fee = damageProtection ? Math.round(totalRent * 0.08) : 0;
          setCalcResult({
            baseRentPrice: basePrice,
            rentalTotal: totalRent,
            damageProtectionFee: fee,
            refundableSecurityDeposit: product.securityDeposit,
            totalPayableNow: totalRent + fee + product.securityDeposit
          });
        })
        .finally(() => setLoading(false));
    }
  }, [product, mode, days, damageProtection]);

  if (!product) return null;

  const handleConfirm = () => {
    onAddToCart({
      product,
      mode,
      rentalDays: mode === 'rent' ? days : null,
      rentalStartDate: mode === 'rent' ? startDate : null,
      price: mode === 'rent' ? (calcResult?.rentalTotal || product.rentPrice) : product.buyPrice,
      securityDeposit: mode === 'rent' ? (calcResult?.refundableSecurityDeposit || product.securityDeposit) : 0,
      damageProtectionFee: (mode === 'rent' && damageProtection) ? (calcResult?.damageProtectionFee || 0) : 0
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <div className="rental-modal-grid">
          {/* Product Image Side */}
          <div className="modal-image-side">
            <img src={product.image} alt={product.name} />
          </div>

          {/* Form & Pricing Side */}
          <div className="modal-form-side">
            <div>
              <span className="product-category-label">{product.category}</span>
              <h2 className="product-title" style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>
                {product.name}
              </h2>
              <p style={{ fontSize: '0.84rem', color: 'var(--charcoal-500)', lineHeight: 1.5 }}>
                {product.description}
              </p>
            </div>

            {/* Mode selection (Rent vs Buy) */}
            <div style={{ display: 'flex', gap: '0.5rem', background: '#f7f4ee', padding: 4, borderRadius: 999 }}>
              <button
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  borderRadius: 999,
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  backgroundColor: mode === 'rent' ? 'var(--maroon-800)' : 'transparent',
                  color: mode === 'rent' ? '#ffffff' : 'var(--charcoal-700)',
                  transition: '0.2s'
                }}
                onClick={() => setMode('rent')}
              >
                Rent This Piece
              </button>
              <button
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  borderRadius: 999,
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  backgroundColor: mode === 'buy' ? 'var(--maroon-800)' : 'transparent',
                  color: mode === 'buy' ? '#ffffff' : 'var(--charcoal-700)',
                  transition: '0.2s'
                }}
                onClick={() => setMode('buy')}
              >
                Purchase to Own
              </button>
            </div>

            {/* RENTAL CONFIGURATION */}
            {mode === 'rent' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Event / Start date */}
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--charcoal-700)', display: 'block', marginBottom: 4 }}>
                    Delivery Date (2 days before event)
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.85rem',
                      borderRadius: 6,
                      border: '1px solid #dfd7c7',
                      fontSize: '0.88rem',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                {/* Rental Duration Options */}
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--charcoal-700)', display: 'block', marginBottom: 4 }}>
                    Rental Duration
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                    {[
                      { label: '4 Days', value: 4, note: 'Standard' },
                      { label: '7 Days', value: 7, note: '+60%' },
                      { label: '10 Days', value: 10, note: '+90%' }
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setDays(opt.value)}
                        style={{
                          padding: '0.55rem',
                          borderRadius: 8,
                          border: days === opt.value ? '2px solid var(--maroon-800)' : '1px solid #ede7dc',
                          backgroundColor: days === opt.value ? 'var(--maroon-50)' : '#ffffff',
                          color: days === opt.value ? 'var(--maroon-800)' : 'var(--charcoal-700)',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          textAlign: 'center'
                        }}
                      >
                        <div>{opt.label}</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--charcoal-400)' }}>{opt.note}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Damage Protection Checkbox */}
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.82rem', color: 'var(--charcoal-700)' }}>
                  <input
                    type="checkbox"
                    checked={damageProtection}
                    onChange={(e) => setDamageProtection(e.target.checked)}
                  />
                  <span>Add 100% Zero-Liability Damage Protection (+8%)</span>
                </label>

                {/* Rental Pricing Summary Box */}
                <div style={{ background: '#faf8f5', border: '1px solid #eee8dc', borderRadius: 8, padding: '0.9rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: 4 }}>
                    <span style={{ color: 'var(--charcoal-500)' }}>Rental ({days} Days):</span>
                    <span style={{ fontWeight: 600 }}>₹{calcResult ? calcResult.rentalTotal.toLocaleString('en-IN') : product.rentPrice}</span>
                  </div>
                  {damageProtection && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: 4 }}>
                      <span style={{ color: 'var(--charcoal-500)' }}>Damage Protection:</span>
                      <span style={{ fontWeight: 600 }}>₹{calcResult ? calcResult.damageProtectionFee.toLocaleString('en-IN') : 0}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: 6, color: '#2e7d32' }}>
                    <span>Refundable Deposit (100% returned):</span>
                    <span style={{ fontWeight: 600 }}>₹{product.securityDeposit.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 700, paddingTop: 6, borderTop: '1px solid #ede7dc', color: 'var(--maroon-900)' }}>
                    <span>Total Payable Now:</span>
                    <span>₹{calcResult ? calcResult.totalPayableNow.toLocaleString('en-IN') : (product.rentPrice + product.securityDeposit)}</span>
                  </div>
                </div>
              </div>
            ) : (
              /* BUY CONFIGURATION */
              <div style={{ background: '#faf8f5', border: '1px solid #eee8dc', borderRadius: 8, padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ color: 'var(--charcoal-500)', fontSize: '0.88rem' }}>Purchase Price:</span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--maroon-900)' }}>
                    ₹{product.buyPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--charcoal-500)' }}>
                  ✓ Includes lifetime polish guarantee<br />
                  ✓ Authentic Hallmark certificate<br />
                  ✓ Complimentary luxury velvet keepsake chest
                </div>
              </div>
            )}

            {/* Inclusions / specs */}
            <div style={{ fontSize: '0.78rem', color: 'var(--charcoal-500)' }}>
              <strong>Includes:</strong> {product.includes}<br />
              <strong>Base Metal:</strong> {product.metalType}
            </div>

            {/* Action Button */}
            <button
              className="btn-primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
              onClick={handleConfirm}
              id="modal-add-to-cart-btn"
            >
              <ShoppingBag size={18} />
              <span>{mode === 'rent' ? 'Add Rental to Bag' : 'Add to Shopping Bag'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
