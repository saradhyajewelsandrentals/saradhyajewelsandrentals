import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onRemoveWishlist,
  onSelectProduct
}) {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer-panel">
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Heart size={20} color="#e53935" fill="#e53935" />
            <h3 className="drawer-title">Saved Favourites ({wishlistedProducts.length})</h3>
          </div>
          <button className="nav-icon-btn" onClick={onClose} aria-label="Close wishlist">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          {wishlistedProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--charcoal-400)' }}>
              <Heart size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.3 }} />
              <p style={{ fontWeight: 600, color: 'var(--charcoal-700)' }}>Your wishlist is empty</p>
              <p style={{ fontSize: '0.85rem' }}>Click the heart icon on any piece to save it for later.</p>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
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
                  src={product.image}
                  alt={product.name}
                  style={{ width: 75, height: 75, objectFit: 'cover', borderRadius: 6 }}
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: 'var(--charcoal-400)', fontWeight: 600 }}>
                      {product.category}
                    </span>
                    <button
                      onClick={() => onRemoveWishlist(product.id)}
                      style={{ color: 'var(--charcoal-400)', padding: 2 }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--charcoal-900)' }}>
                    {product.name}
                  </h4>
                  <div style={{ fontSize: '0.82rem', color: 'var(--maroon-800)', fontWeight: 600 }}>
                    Rent: ₹{product.rentPrice.toLocaleString('en-IN')} / 4 days
                  </div>
                  <button
                    className="btn-outline"
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', alignSelf: 'flex-start', marginTop: 4 }}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                  >
                    <ShoppingBag size={13} />
                    <span>View & Rent</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
