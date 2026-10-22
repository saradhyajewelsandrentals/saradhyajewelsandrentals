import React from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';

export default function Navbar({
  globalMode,
  setGlobalMode,
  wishlistCount,
  cartCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  currentPageView,
  activeFilter,
  onNavigate,
  user,
  onOpenAuth
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="site-header">
      <div className="container nav-container">
        {/* Brand Logo */}
        <a
          href="#"
          className="brand-logo"
          id="brand-home-link"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
        >
          <div className="logo-symbol">S</div>
          <div className="brand-text-wrap">
            <span className="brand-name">Saradhya</span>
            <span className="brand-subline">Jewels & Rentals</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-links">
          {/* 1. Shop (Navigates to Collections in Buy Mode) */}
          <a
            href="#shop"
            className={`nav-link ${currentPageView === 'collections' && globalMode === 'buy' && activeFilter !== 'bridal' && activeFilter !== 'new-arrivals' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('collections', 'all', 'buy');
            }}
            id="nav-link-shop"
          >
            Shop
          </a>

          {/* 2. Rent (Navigates to Collections in Rent Mode) */}
          <a
            href="#rent"
            className={`nav-link ${currentPageView === 'collections' && globalMode === 'rent' && activeFilter !== 'bridal' && activeFilter !== 'new-arrivals' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('collections', 'all', 'rent');
            }}
            id="nav-link-rent"
          >
            Rent
          </a>

          {/* 3. Bridal (Navigates to Bridal Wedding Filter) */}
          <a
            href="#bridal"
            className={`nav-link ${currentPageView === 'collections' && activeFilter === 'bridal' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('collections', 'bridal');
            }}
            id="nav-link-bridal"
          >
            Bridal
          </a>

          {/* 4. New Arrivals (Navigates to New Arrivals Filter/Sort) */}
          <a
            href="#new-arrivals"
            className={`nav-link ${currentPageView === 'collections' && activeFilter === 'new-arrivals' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('collections', 'new-arrivals');
            }}
            id="nav-link-new-arrivals"
          >
            New Arrivals
          </a>

          {/* 5. Collections (Navigates to All Collections) */}
          <a
            href="#collections"
            className={`nav-link ${currentPageView === 'collections' && activeFilter === 'all' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('collections', 'all');
            }}
            id="nav-link-collections"
          >
            Collections
          </a>

          {/* 6. Contact Us */}
          <a
            href="#contact"
            className={`nav-link ${currentPageView === 'contact' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate('contact');
            }}
            id="nav-link-contact"
          >
            Contact
          </a>
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

          {/* Profile / Firebase Auth Button */}
          <button
            className="nav-icon-btn"
            aria-label="My Account"
            id="nav-account-btn"
            onClick={onOpenAuth}
            title={user ? `Signed in as ${user.displayName || user.email}` : 'Sign In'}
          >
            {user ? (
              user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  style={{ width: 26, height: 26, borderRadius: '50%', border: '1.5px solid var(--gold-500)' }}
                />
              ) : (
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    backgroundColor: 'var(--maroon-800)',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1.5px solid var(--gold-500)'
                  }}
                >
                  {(user.displayName || user.email || 'S').charAt(0).toUpperCase()}
                </span>
              )
            ) : (
              <User size={20} />
            )}
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
          <a href="#shop" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); onNavigate('collections', 'all', 'buy'); }} style={{ fontWeight: 600 }}>Shop</a>
          <a href="#rent" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); onNavigate('collections', 'all', 'rent'); }} style={{ fontWeight: 600 }}>Rent</a>
          <a href="#bridal" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); onNavigate('collections', 'bridal'); }} style={{ fontWeight: 600 }}>Bridal</a>
          <a href="#new-arrivals" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); onNavigate('collections', 'new-arrivals'); }} style={{ fontWeight: 600 }}>New Arrivals</a>
          <a href="#collections" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); onNavigate('collections', 'all'); }} style={{ fontWeight: 600 }}>Collections</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); onNavigate('contact'); }} style={{ fontWeight: 600 }}>Contact Us</a>
          <a href="#guidelines" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); onNavigate('guidelines'); }} style={{ fontSize: '0.9rem', color: '#666' }}>Rental Guidelines</a>
          <a href="#terms" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); onNavigate('terms'); }} style={{ fontSize: '0.9rem', color: '#666' }}>Terms & Conditions</a>
          <a href="#privacy" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); onNavigate('privacy'); }} style={{ fontSize: '0.9rem', color: '#666' }}>Privacy Policy</a>
        </div>
      )}
    </header>
  );
}
