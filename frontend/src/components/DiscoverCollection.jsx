import React from 'react';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export default function DiscoverCollection({
  products,
  collectionMode,
  setCollectionMode,
  activeFilter,
  setActiveFilter,
  wishlist,
  onToggleWishlist,
  onSelectProduct
}) {
  const filterOptions = [
    { label: 'All Pieces', value: 'all' },
    { label: 'Chokers', value: 'chokers' },
    { label: 'Bridal Sets', value: 'bridal-sets' },
    { label: 'Haaram & Long', value: 'haaram' },
    { label: 'Earrings & Jhumkas', value: 'earrings' }
  ];

  return (
    <section className="collection-section" id="collections">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-split">
          <div>
            <div className="section-eyebrow">HANDCRAFTED PERFECTION</div>
            <h2 className="section-title">Discover the Collection</h2>
          </div>

          {/* Rent vs Buy toggle on right */}
          <div className="collection-mode-toggle">
            <button
              className={`collection-mode-btn ${collectionMode === 'rent' ? 'active' : ''}`}
              onClick={() => setCollectionMode('rent')}
              id="collection-toggle-rent"
            >
              RENT COLLECTION
            </button>
            <button
              className={`collection-mode-btn ${collectionMode === 'buy' ? 'active' : ''}`}
              onClick={() => setCollectionMode('buy')}
              id="collection-toggle-buy"
            >
              BUY COLLECTION
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="collection-toolbar">
          <div className="collection-filters">
            {filterOptions.map((filter) => (
              <button
                key={filter.value}
                className={`filter-chip ${activeFilter === filter.value ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid (4 items) */}
        <div className="product-grid">
          {products.map((product) => {
            const isWishlisted = wishlist.includes(product.id);

            return (
              <div
                key={product.id}
                className="product-card"
                id={`product-card-${product.id}`}
              >
                {/* Media Container */}
                <div
                  className="product-media-wrap"
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-img"
                    loading="lazy"
                  />
                  {/* Status Tag */}
                  {product.tag && (
                    <span
                      className="product-tag-badge"
                      style={{ backgroundColor: product.badgeColor || '#58111a' }}
                    >
                      {product.tag}
                    </span>
                  )}
                  {/* Wishlist Button */}
                  <button
                    className={`product-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    aria-label="Save to Wishlist"
                  >
                    <Heart size={16} fill={isWishlisted ? '#e53935' : 'none'} />
                  </button>
                </div>

                {/* Details */}
                <div className="product-details">
                  <span className="product-category-label">{product.category}</span>
                  <h3
                    className="product-title"
                    onClick={() => onSelectProduct(product)}
                  >
                    {product.name}
                  </h3>

                  <div className="product-pricing-row">
                    <div className="price-stack">
                      <span className="price-buy-tag">
                        Buy: ₹{product.buyPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="price-rent-tag">
                        Rent: ₹{product.rentPrice.toLocaleString('en-IN')} / {product.rentDuration}
                      </span>
                    </div>

                    <button
                      className="product-action-btn"
                      onClick={() => onSelectProduct(product)}
                      aria-label="Add to bag or rent"
                      title="Quick Rent or Buy"
                      id={`btn-add-${product.id}`}
                    >
                      <ShoppingBag size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Collections Button */}
        <div className="collection-footer-cta">
          <button
            className="btn-outline"
            onClick={() => setActiveFilter('all')}
            id="btn-view-all"
          >
            <span>View All Collections</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
