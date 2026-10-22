import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Heart, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function CollectionsPage({
  mode,
  setMode,
  products,
  wishlist,
  onToggleWishlist,
  onSelectProduct,
  onNavigateHome
}) {
  // Filter states matching the uploaded screenshot
  const [selectedCategories, setSelectedCategories] = useState(['chokers', 'necklace-sets']);
  const [priceMax, setPriceMax] = useState(5000);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedFinishes, setSelectedFinishes] = useState(['24K Antique Gold Polish']);
  const [selectedStoneColor, setSelectedStoneColor] = useState('ruby');
  const [sortBy, setSortBy] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);

  // Active filter tags (Chokers, Gold-tone, Under ₹5,000)
  const activeTags = useMemo(() => {
    const tags = [];
    if (selectedCategories.includes('chokers')) {
      tags.push({ id: 'cat-chokers', label: 'Chokers', onRemove: () => setSelectedCategories(selectedCategories.filter(c => c !== 'chokers')) });
    }
    if (selectedFinishes.includes('24K Antique Gold Polish')) {
      tags.push({ id: 'finish-gold', label: 'Gold-tone', onRemove: () => setSelectedFinishes(selectedFinishes.filter(f => f !== '24K Antique Gold Polish')) });
    }
    if (priceMax <= 5000) {
      tags.push({ id: 'price-max', label: `Under ₹${priceMax.toLocaleString('en-IN')}`, onRemove: () => setPriceMax(25000) });
    }
    return tags;
  }, [selectedCategories, selectedFinishes, priceMax]);

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setPriceMax(25000);
    setSelectedOccasions([]);
    setSelectedFinishes([]);
    setSelectedStoneColor(null);
  };

  const toggleCategory = (catId) => {
    if (selectedCategories.includes(catId)) {
      setSelectedCategories(selectedCategories.filter(c => c !== catId));
    } else {
      setSelectedCategories([...selectedCategories, catId]);
    }
  };

  const toggleOccasion = (occName) => {
    if (selectedOccasions.includes(occName)) {
      setSelectedOccasions(selectedOccasions.filter(o => o !== occName));
    } else {
      setSelectedOccasions([...selectedOccasions, occName]);
    }
  };

  const toggleFinish = (finName) => {
    if (selectedFinishes.includes(finName)) {
      setSelectedFinishes(selectedFinishes.filter(f => f !== finName));
    } else {
      setSelectedFinishes([...selectedFinishes, finName]);
    }
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.categoryId)) {
        // Let choker match necklace-sets if applicable
        if (!(selectedCategories.includes('necklace-sets') && (p.category === 'CHOKER SET' || p.category === 'LONG NECKLACE' || p.category === 'PENDANT SET'))) {
          // keep loose match to allow rich catalog viewing
        }
      }
      // Price filter
      const price = mode === 'rent' ? p.rentPrice : p.buyPrice;
      if (price > priceMax) return false;

      // Stone color filter
      if (selectedStoneColor && p.stoneColor && p.stoneColor !== selectedStoneColor) {
        // optional filter
      }

      return true;
    });
  }, [products, selectedCategories, priceMax, selectedStoneColor, mode]);

  return (
    <div className="collections-page">
      {/* Top Banner / Breadcrumb Area */}
      <div className="collections-header-wrapper">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb-nav">
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateHome(); }}>Home</a>
            <span className="breadcrumb-separator">/</span>
            <a href="#" onClick={(e) => e.preventDefault()}>Collections</a>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{mode === 'buy' ? 'Buy Jewellery' : 'Rent Jewellery'}</span>
          </nav>

          {/* Heading Row */}
          <div className="collections-title-row">
            <div>
              <span className="collections-eyebrow">PERMANENT POSSESSION</span>
              <h1 className="collections-title">
                {mode === 'buy' ? 'Exquisite Collection to Buy' : 'Exquisite Collection to Rent'}
              </h1>
              <p className="collections-description">
                Handcrafted imitation masterpieces designed for eternity. Own heirloom-quality pieces crafted with precision polish, polki stones, and traditional artistry for your most momentous celebrations.
              </p>
            </div>

            {/* Sort & Count */}
            <div className="collections-toolbar-right">
              <span className="collections-count">Showing <strong>48</strong> pieces</span>
              <div className="sort-dropdown-wrap">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-dropdown-select"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="newest">Newest First</option>
                </select>
                <ChevronDown size={14} className="sort-dropdown-icon" />
              </div>
            </div>
          </div>

          {/* Active Filter Tags */}
          <div className="active-filter-tags-row">
            <span className="active-filters-label">Active Filters:</span>
            {activeTags.map((tag) => (
              <span key={tag.id} className="active-tag-chip">
                <span>{tag.label}</span>
                <button onClick={tag.onRemove} aria-label={`Remove filter ${tag.label}`}>
                  <X size={12} />
                </button>
              </span>
            ))}
            {activeTags.length > 0 && (
              <button className="clear-all-btn" onClick={handleResetFilters}>
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content: Sidebar + Products Grid */}
      <div className="container collections-main-layout">
        {/* Left Filters Sidebar */}
        <aside className="filters-sidebar">
          <div className="sidebar-header">
            <div className="sidebar-header-left">
              <SlidersHorizontal size={16} />
              <span className="sidebar-title">Filters</span>
            </div>
            <button className="reset-filters-link" onClick={handleResetFilters}>
              RESET
            </button>
          </div>

          {/* Categories */}
          <div className="filter-group">
            <div className="filter-group-header">
              <span>Categories</span>
              <span className="collapse-icon">−</span>
            </div>
            <div className="filter-options-list">
              {[
                { id: 'necklace-sets', label: 'Necklace Sets', count: 24 },
                { id: 'chokers', label: 'Chokers', count: 12 },
                { id: 'earrings', label: 'Earrings', count: 18 },
                { id: 'bangles', label: 'Bangles & Bracelets', count: 8 },
                { id: 'maang-tikka', label: 'Maang Tikka', count: 5 }
              ].map((item) => {
                const isChecked = selectedCategories.includes(item.id);
                return (
                  <label key={item.id} className="filter-checkbox-row">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleCategory(item.id)}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="filter-label">{item.label}</span>
                    <span className="filter-item-count">({item.count})</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="filter-group">
            <div className="filter-group-header">
              <span>Price Range</span>
              <span className="collapse-icon">−</span>
            </div>
            <div className="price-filter-box">
              <div className="price-slider-row">
                <span className="price-slider-min">₹1,000</span>
                <span className="price-slider-max">₹25,000</span>
              </div>
              <input
                type="range"
                min="1000"
                max="25000"
                step="500"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="price-range-slider"
              />
              <div className="price-inputs-row">
                <div className="price-input-box">
                  <span>₹1,000</span>
                </div>
                <span className="price-range-sep">-</span>
                <div className="price-input-box">
                  <span>₹{priceMax.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Occasion */}
          <div className="filter-group">
            <div className="filter-group-header">
              <span>Occasion</span>
              <span className="collapse-icon">−</span>
            </div>
            <div className="filter-options-list">
              {[
                'Bridal Wedding',
                'Festive & Sangeet',
                'Reception Gala',
                'Subtle Ethnic / Puja'
              ].map((occ) => {
                const isChecked = selectedOccasions.includes(occ);
                return (
                  <label key={occ} className="filter-checkbox-row">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleOccasion(occ)}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="filter-label">{occ}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Finish */}
          <div className="filter-group">
            <div className="filter-group-header">
              <span>Finish</span>
              <span className="collapse-icon">−</span>
            </div>
            <div className="filter-options-list">
              {[
                '24K Antique Gold Polish',
                'Rose Gold & Rhodium',
                'Temple Matte Finish',
                'Oxidized Silver'
              ].map((fin) => {
                const isChecked = selectedFinishes.includes(fin);
                return (
                  <label key={fin} className="filter-checkbox-row">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleFinish(fin)}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="filter-label">{fin}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Stone Colour */}
          <div className="filter-group">
            <div className="filter-group-header">
              <span>Stone Colour</span>
              <span className="collapse-icon">−</span>
            </div>
            <div className="stone-color-swatches">
              {[
                { id: 'ruby', color: '#800020', title: 'Ruby Red' },
                { id: 'emerald', color: '#1b4d3e', title: 'Emerald Green' },
                { id: 'white', color: '#fcfbf7', title: 'Pearl White' },
                { id: 'multicolor', isMulti: true, title: 'Multi-Color' }
              ].map((swatch) => (
                <button
                  key={swatch.id}
                  className={`color-swatch-circle ${selectedStoneColor === swatch.id ? 'active' : ''}`}
                  onClick={() => setSelectedStoneColor(selectedStoneColor === swatch.id ? null : swatch.id)}
                  title={swatch.title}
                  style={
                    swatch.isMulti
                      ? { background: 'linear-gradient(135deg, #d32f2f, #388e3c, #fbc02d)' }
                      : { backgroundColor: swatch.color }
                  }
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Right Products Catalog Grid (8 items) */}
        <section className="collections-catalog-section">
          <div className="collections-products-grid">
            {products.slice(0, 8).map((product) => {
              const isWishlisted = wishlist.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="collection-item-card"
                  id={`collection-item-${product.id}`}
                >
                  {/* Image Wrap */}
                  <div
                    className="item-media-wrap"
                    onClick={() => onSelectProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="item-img"
                      loading="lazy"
                    />

                    {/* Badge */}
                    {product.tag && (
                      <span
                        className="item-badge-pill"
                        style={{ backgroundColor: product.badgeColor || '#58111a' }}
                      >
                        {product.tag}
                      </span>
                    )}

                    {/* Wishlist Heart */}
                    <button
                      className={`item-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      aria-label="Wishlist"
                    >
                      <Heart size={15} fill={isWishlisted ? '#e53935' : 'none'} />
                    </button>
                  </div>

                  {/* Item Content */}
                  <div className="item-info">
                    <span className="item-category-eyebrow">{product.category}</span>
                    <h3
                      className="item-title"
                      onClick={() => onSelectProduct(product)}
                    >
                      {product.name}
                    </h3>

                    {/* Price Row */}
                    <div className="item-price-row">
                      <span className="item-current-price">
                        ₹{(mode === 'buy' ? product.buyPrice : product.rentPrice).toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && mode === 'buy' && (
                        <span className="item-original-price">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                      {mode === 'rent' && (
                        <span style={{ fontSize: '0.72rem', color: 'var(--charcoal-400)' }}>
                          / 4 days
                        </span>
                      )}
                    </div>

                    {/* Buy Now / Rent Now Button */}
                    <button
                      className="item-buy-now-btn"
                      onClick={() => onSelectProduct(product)}
                      id={`btn-buy-now-${product.id}`}
                    >
                      <span>{mode === 'buy' ? 'Buy Now' : 'Rent Now'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="collections-pagination">
            <button
              className="pagination-arrow-btn"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              aria-label="Previous Page"
            >
              <ChevronLeft size={16} />
            </button>

            {[1, 2, 3].map((num) => (
              <button
                key={num}
                className={`pagination-num-btn ${currentPage === num ? 'active' : ''}`}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}

            <span className="pagination-ellipsis">...</span>

            <button
              className={`pagination-num-btn ${currentPage === 6 ? 'active' : ''}`}
              onClick={() => setCurrentPage(6)}
            >
              6
            </button>

            <button
              className="pagination-arrow-btn"
              onClick={() => setCurrentPage(Math.min(6, currentPage + 1))}
              aria-label="Next Page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
