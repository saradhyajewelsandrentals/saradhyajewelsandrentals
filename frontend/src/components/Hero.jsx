import React from 'react';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Hero({ heroMode, setHeroMode, onExploreShop, onExploreRent }) {
  return (
    <section className="hero-section" id="hero">
      {/* Background with luxury Indian bride */}
      <div className="hero-bg-container">
        <img
          src="/images/hero-banner.jpg"
          alt="Saradhya Bridal Jewels"
          className="hero-bg-image"
          onError={(e) => {
            // Fallback in case of any loading issue
            e.currentTarget.src = "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1600&auto=format&fit=crop";
          }}
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        {/* Eyebrow badge */}
        <div className="hero-pill-badge">
          <Sparkles size={14} style={{ color: '#d4af37', display: 'inline', marginRight: 6 }} />
          EXCLUSIVE 1-GRAM ROLD GOLD & RENTALS
        </div>

        {/* Main Headline */}
        <h1 className="hero-title">
          Big occasions.
          <span className="italic-flair">Beautiful jewellery.</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Discover bridal sets, temple jewellery, and diamond-look polki in premium 1-gram rold gold to rent for your special moments or purchase for a lifetime.
        </p>

        {/* Experience Rental / Purchase to Own Pill Switch */}
        <div className="hero-mode-pill">
          <button
            className={`hero-mode-btn ${heroMode === 'rent' ? 'active' : ''}`}
            onClick={() => setHeroMode('rent')}
            id="hero-toggle-rent"
          >
            Experience Rental
          </button>
          <button
            className={`hero-mode-btn ${heroMode === 'buy' ? 'active' : ''}`}
            onClick={() => setHeroMode('buy')}
            id="hero-toggle-buy"
          >
            Purchase to Own
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="hero-cta-group">
          <button
            className="btn-primary"
            onClick={onExploreShop}
            id="hero-cta-shop"
          >
            <span>Shop Jewellery</span>
            <ArrowRight size={17} />
          </button>

          <button
            className="btn-glass"
            onClick={onExploreRent}
            id="hero-cta-rent"
          >
            <span>Explore Rental Sets</span>
            <ArrowUpRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
