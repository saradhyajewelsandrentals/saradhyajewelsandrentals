import React from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';

export default function Navbar({
  globalMode,
  setGlobalMode,
  wishlistCount,
  cartCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="site-header">
      {/* Top subtle announcement */}
      <div className="announcement-bar">
        <span>✨ ROYAL BRIDAL CONCIERGE:</span> Free Pan-India Delivery on rentals above ₹1,999 • 100% Sanitized & Damage Insured
      </div>

      <div className="container nav-container">
        {/* Brand Logo */}
        <a href="#" className="brand-logo" id="brand-home-link">
          <div className="logo-symbol">S</div>
          <div className="brand-text-wrap">
            <span className="brand-name">Saradhya</span>
            <span className="brand-subline">Jewels & Rentals</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-links">
          <a href="#shop" className="nav-link active">Shop</a>
          <a href="#rent" className="nav-link">Rent</a>
          <a href="#bridal" className="nav-link">Bridal</a>
          <a href="#new-arrivals" className="nav-link">New Arrivals</a>
          <a href="#collections" className="nav-link">Collections</a>
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          {/* Buy / Rent Switch Toggle */}
          <div className="mode-toggle-switch" title="Toggle shopping mode">
            <button
              className={`mode-toggle-btn ${globalMode === 'buy' ? 'active' : ''}`}
              onClick={() => setGlobalMode('buy')}
              id="nav-buy-toggle"
            >
              Buy
            </button>
            <button
              className={`mode-toggle-btn ${globalMode === 'rent' ? 'active' : ''}`}
              onClick={() => setGlobalMode('rent')}
              id="nav-rent-toggle"
            >
              Rent
            </button>
          </div>

          {/* Search Button */}
          <button
            className="nav-icon-btn"
            onClick={onOpenSearch}
            aria-label="Search collection"
            id="nav-search-btn"
          >
            <Search size={20} />
          </button>

          {/* Wishlist Button */}
          <button
            className="nav-icon-btn"
            onClick={onOpenWishlist}
            aria-label="Wishlist"
            id="nav-wishlist-btn"
          >
            <Heart size={20} />
            {wishlistCount > 0 && <span className="icon-badge">{wishlistCount}</span>}
          </button>

          {/* Cart / Bag Button */}
          <button
            className="nav-icon-btn"
            onClick={onOpenCart}
            aria-label="Cart"
            id="nav-cart-btn"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
          </button>

          {/* Profile Button */}
          <button
            className="nav-icon-btn"
            aria-label="My Account"
            id="nav-account-btn"
            onClick={() => alert('Welcome to Saradhya Concierge. Please sign in to view your bookings.')}
          >
            <User size={20} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="nav-icon-btn mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#faf8f5',
          borderBottom: '1px solid #ede7dc',
          padding: '1.25rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <a href="#shop" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600 }}>Shop</a>
          <a href="#rent" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600 }}>Rent</a>
          <a href="#bridal" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600 }}>Bridal</a>
          <a href="#new-arrivals" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600 }}>New Arrivals</a>
          <a href="#collections" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600 }}>Collections</a>
        </div>
      )}
    </header>
  );
}
