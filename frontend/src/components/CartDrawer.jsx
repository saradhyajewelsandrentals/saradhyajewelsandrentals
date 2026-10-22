import React from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onClearCart
}) {
  if (!isOpen) return null;

  const totalRentalFees = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);
  const totalDeposits = cartItems.reduce((acc, item) => acc + (item.securityDeposit || 0), 0);
  const totalProtection = cartItems.reduce((acc, item) => acc + (item.damageProtectionFee || 0), 0);
  const grandTotal = totalRentalFees + totalDeposits + totalProtection;

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer-panel">
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <ShoppingBag size={20} color="var(--maroon-800)" />
            <h3 className="drawer-title">Your Jewellery Bag ({cartItems.length})</h3>
          </div>
          <button className="nav-icon-btn" onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--charcoal-400)' }}>
              <ShoppingBag size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.3 }} />
              <p style={{ fontWeight: 600, color: 'var(--charcoal-700)' }}>Your bag is empty</p>
              <p style={{ fontSize: '0.85rem' }}>Explore our exquisite bridal collection to add pieces.</p>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={`${item.product.id}-${index}`}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1rem',
                  borderRadius: 10,
                  border: '1px solid #ede7dc',
                  backgroundColor: '#ffffff'
                }}
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  style={{ width: 75, height: 75, objectFit: 'cover', borderRadius: 6 }}
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '2px 8px',
                      borderRadius: 999,
                      backgroundColor: item.mode === 'rent' ? 'var(--maroon-100)' : '#fdf6e2',
                      color: item.mode === 'rent' ? 'var(--maroon-800)' : '#9c6a18'
                    }}>
                      {item.mode === 'rent' ? `Rental • ${item.rentalDays} Days` : 'Purchase'}
                    </span>
                    <button
                      onClick={() => onRemoveItem(index)}
                      style={{ color: 'var(--charcoal-400)', padding: 2 }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--charcoal-900)' }}>
                    {item.product.name}
                  </h4>
                  {item.mode === 'rent' && item.rentalStartDate && (
                    <span style={{ fontSize: '0.72rem', color: 'var(--charcoal-500)' }}>
                      Delivery: {item.rentalStartDate}
                    </span>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 'auto' }}>
                    <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--maroon-800)' }}>
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    {item.securityDeposit > 0 && (
                      <span style={{ fontSize: '0.7rem', color: '#2e7d32' }}>
                        +₹{item.securityDeposit} deposit
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="drawer-footer">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.25rem', fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--charcoal-600)' }}>
                <span>Subtotal (Rent / Purchase):</span>
                <span>₹{totalRentalFees.toLocaleString('en-IN')}</span>
              </div>
              {totalProtection > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--charcoal-600)' }}>
                  <span>Damage Protection Waiver:</span>
                  <span>₹{totalProtection.toLocaleString('en-IN')}</span>
                </div>
              )}
              {totalDeposits > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2e7d32', fontWeight: 500 }}>
                  <span>Refundable Security Deposit:</span>
                  <span>₹{totalDeposits.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '0.65rem',
                borderTop: '1px solid #dfd7c7',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: 'var(--maroon-900)'
              }}>
                <span>Total Payable:</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              className="btn-primary"
              style={{ width: '100%' }}
              onClick={() => {
                alert('Thank you! Redirecting to Saradhya Secure Payment Gateway & KYC Verification.');
                onClearCart();
                onClose();
              }}
              id="checkout-btn"
            >
              <span>Proceed to Booking</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
