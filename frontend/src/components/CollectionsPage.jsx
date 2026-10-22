import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Heart, ChevronDown, ChevronRight, ChevronLeft, X, Sparkles } from 'lucide-react';

// Comprehensive Category & Models hierarchy configuration
export const CATEGORY_MODELS_CONFIG = [
  {
    id: 'chokers',
    label: 'Chokers',
    count: 18,
    models: [
      { id: 'Royal Kundan Chokers', label: 'Royal Kundan Chokers', count: 6 },
      { id: 'Polki Chokers', label: 'Polki Chokers', count: 4 },
      { id: 'Jaipur Meenakari Chokers', label: 'Jaipur Meenakari Chokers', count: 3 },
      { id: 'Temple Rold Gold Chokers', label: 'Temple Rold Gold Chokers', count: 2 },
      { id: 'Tribal Silver Ghungroo Chokers', label: 'Tribal Silver Ghungroo Chokers', count: 2 },
      { id: 'Pearl Collar Chokers', label: 'Pearl Collar Chokers', count: 1 }
    ]
  },
  {
    id: 'necklace-sets',
    label: 'Necklace Sets & Haram',
    count: 24,
    models: [
      { id: 'Temple Haaram', label: 'Temple Haaram', count: 8 },
      { id: 'Gutapusalu / Pearl Layered', label: 'Gutapusalu / Pearl Layered', count: 5 },
      { id: 'Rani Haar / Royal Layers', label: 'Rani Haar / Royal Layers', count: 4 },
      { id: 'Pendant Chain Sets', label: 'Pendant Chain Sets', count: 4 },
      { id: 'Mango / Kasu Mala', label: 'Mango / Kasu Mala', count: 3 }
    ]
  },
  {
    id: 'earrings',
    label: 'Earrings & Jhumkas',
    count: 18,
    models: [
      { id: 'Antique Peacock Jhumkas', label: 'Antique Peacock Jhumkas', count: 6 },
      { id: 'Royal Chandbalis', label: 'Royal Chandbalis', count: 5 },
      { id: 'Solitaire & Diamond Studs', label: 'Solitaire & Diamond Studs', count: 3 },
      { id: 'Kundan Danglers & Drops', label: 'Kundan Danglers & Drops', count: 3 },
      { id: 'Ear Cuffs / Deva Kaan', label: 'Ear Cuffs / Deva Kaan', count: 1 }
    ]
  },
  {
    id: 'bangles',
    label: 'Bangles & Bracelets',
    count: 14,
    models: [
      { id: 'Rajwada Kundan Kadas', label: 'Rajwada Kundan Kadas', count: 5 },
      { id: 'Temple Antique Valayal', label: 'Temple Antique Valayal', count: 4 },
      { id: 'Openable Stone Bangles', label: 'Openable Stone Bangles', count: 3 },
      { id: 'Haathphool Bridal Bracelets', label: 'Haathphool Bridal Bracelets', count: 2 }
    ]
  },
  {
    id: 'rings',
    label: 'Rings (Finger Rings)',
    count: 16,
    models: [
      { id: 'Oversized Floral Kundan Cocktail Rings', label: 'Floral Kundan Cocktail Rings', count: 5 },
      { id: 'Royal Mirror Arsi Rings', label: 'Royal Mirror Arsi Rings', count: 4 },
      { id: 'Antique Temple Peacock Rings', label: 'Antique Temple Peacock Rings', count: 3 },
      { id: 'Solitaire Illusion Halo Rings', label: 'Solitaire Diamond Halo Rings', count: 2 },
      { id: 'Navratna Nine-Gem Rings', label: 'Navratna Nine-Gem Rings', count: 2 }
    ]
  },
  {
    id: 'maang-tikka',
    label: 'Maang Tikka & Hair',
    count: 12,
    models: [
      { id: 'Regal Matha Patti Suite', label: 'Regal Matha Patti Suite', count: 4 },
      { id: 'Single String Maang Tikka', label: 'Single String Maang Tikka', count: 4 },
      { id: 'Passa / Jhoomar', label: 'Passa / Jhoomar', count: 2 },
      { id: 'Jada Billa / Hair Chotis', label: 'Jada Billa / Hair Chotis', count: 2 }
    ]
  },
  {
    id: 'waist-belts',
    label: 'Waist Belts / Vaddanam',
    count: 10,
    models: [
      { id: 'Temple Rold Gold Goddess Vaddanam', label: 'Temple Rold Gold Goddess Vaddanam', count: 4 },
      { id: 'Polki Kamarbandh', label: 'Polki Kamarbandh', count: 3 },
      { id: 'Adjustable Sleek Waist Chains', label: 'Adjustable Sleek Waist Chains', count: 3 }
    ]
  },
  {
    id: 'bridal-sets',
    label: 'Bridal Sets',
    count: 22,
    models: [
      { id: 'Grand Heritage Rajputana Suite', label: 'Grand Heritage Rajputana Suite', count: 8 },
      { id: 'South Indian Muhurtham Set', label: 'South Indian Muhurtham Set', count: 8 },
      { id: 'Modern Cocktail Diamond Suite', label: 'Modern Cocktail Diamond Suite', count: 6 }
    ]
  }
];

export default function CollectionsPage({
  mode,
  setMode,
  products,
  wishlist,
  onToggleWishlist,
  onSelectProduct,
  onNavigateHome
}) {
  // Category & Model filters
  const [selectedCategories, setSelectedCategories] = useState(['chokers', 'necklace-sets']);
  const [selectedModels, setSelectedModels] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({
    'chokers': true,
    'necklace-sets': true,
    'earrings': false,
    'bangles': false,
    'rings': true,
    'maang-tikka': false
  });

  // Other filters
  const [priceMax, setPriceMax] = useState(5000);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedFinishes, setSelectedFinishes] = useState(['1-Gram Rold Gold Finish']);
  const [selectedStoneColor, setSelectedStoneColor] = useState('ruby');
  const [sortBy, setSortBy] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);

  // Toggle category expansion
  const toggleExpand = (catId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  // Toggle category checkbox
  const toggleCategory = (catId) => {
    if (selectedCategories.includes(catId)) {
      setSelectedCategories(selectedCategories.filter(c => c !== catId));
    } else {
      setSelectedCategories([...selectedCategories, catId]);
      // Auto expand to show models
      setExpandedCategories(prev => ({ ...prev, [catId]: true }));
    }
  };

  // Toggle subcategory / model checkbox
  const toggleModel = (modelId) => {
    if (selectedModels.includes(modelId)) {
      setSelectedModels(selectedModels.filter(m => m !== modelId));
    } else {
      setSelectedModels([...selectedModels, modelId]);
    }
  };

  // Toggle finish
  const toggleFinish = (finName) => {
    if (selectedFinishes.includes(finName)) {
      setSelectedFinishes(selectedFinishes.filter(f => f !== finName));
    } else {
      setSelectedFinishes([...selectedFinishes, finName]);
    }
  };

  // Toggle occasion
  const toggleOccasion = (occName) => {
    if (selectedOccasions.includes(occName)) {
      setSelectedOccasions(selectedOccasions.filter(o => o !== occName));
    } else {
      setSelectedOccasions([...selectedOccasions, occName]);
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedModels([]);
    setPriceMax(25000);
    setSelectedOccasions([]);
    setSelectedFinishes([]);
    setSelectedStoneColor(null);
  };

  // Active filter tags row
  const activeTags = useMemo(() => {
    const tags = [];

    // Category tags
    selectedCategories.forEach(catId => {
      const cfg = CATEGORY_MODELS_CONFIG.find(c => c.id === catId);
      if (cfg) {
        tags.push({
          id: `cat-${catId}`,
          label: cfg.label,
          onRemove: () => setSelectedCategories(selectedCategories.filter(c => c !== catId))
        });
      }
    });

    // Model tags
    selectedModels.forEach(modelId => {
      tags.push({
        id: `model-${modelId}`,
        label: modelId,
        onRemove: () => setSelectedModels(selectedModels.filter(m => m !== modelId))
      });
    });

    // Finish tags
    selectedFinishes.forEach(fin => {
      tags.push({
        id: `fin-${fin}`,
        label: fin,
        onRemove: () => setSelectedFinishes(selectedFinishes.filter(f => f !== fin))
      });
    });

    // Price tag
    if (priceMax < 25000) {
      tags.push({
        id: 'price-max',
        label: `Under ₹${priceMax.toLocaleString('en-IN')}`,
        onRemove: () => setPriceMax(25000)
      });
    }

    return tags;
  }, [selectedCategories, selectedModels, selectedFinishes, priceMax]);

  // Filter products by all active criteria (works for both Buy & Rent modes)
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Model filter (if any models selected, match against product.model)
      if (selectedModels.length > 0) {
        if (!p.model || !selectedModels.includes(p.model)) {
          return false;
        }
      }

      // 2. Category filter (if categories selected and no specific model matched)
      if (selectedCategories.length > 0 && selectedModels.length === 0) {
        if (!selectedCategories.includes(p.categoryId)) {
          // Allow loose category matches for demo completeness
          const catMatches = selectedCategories.some(c =>
            (c === 'necklace-sets' && (p.category === 'LONG NECKLACE' || p.category === 'PENDANT SET')) ||
            (c === 'chokers' && p.category === 'CHOKER SET') ||
            (c === 'earrings' && p.category === 'EARRINGS') ||
            (c === 'bangles' && p.category === 'BANGLES SET') ||
            (c === 'rings' && p.category === 'RINGS') ||
            (c === 'maang-tikka' && p.category === 'MAANG TIKKA')
          );
          if (!catMatches) return false;
        }
      }

      // 3. Price Filter (based on current Mode: Rent vs Buy)
      const currentPrice = mode === 'rent' ? p.rentPrice : p.buyPrice;
      if (currentPrice > priceMax) return false;

      // 4. Finish filter
      if (selectedFinishes.length > 0 && p.finish && !selectedFinishes.includes(p.finish)) {
        // optional filter
      }

      return true;
    });
  }, [products, selectedCategories, selectedModels, priceMax, selectedFinishes, mode]);

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
            <span className="breadcrumb-current">
              {mode === 'buy' ? 'Buy Jewellery' : 'Rent Jewellery'}
            </span>
          </nav>

          {/* Mode Switcher Banner Ribbon */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            backgroundColor: '#f7f4ee',
            padding: '4px 12px',
            borderRadius: 999,
            marginBottom: '1rem',
            border: '1px solid #ede7dc'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--charcoal-600)' }}>Current Catalog Mode:</span>
            <button
              onClick={() => setMode('buy')}
              style={{
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                padding: '3px 12px',
                borderRadius: 999,
                backgroundColor: mode === 'buy' ? 'var(--maroon-800)' : 'transparent',
                color: mode === 'buy' ? '#ffffff' : 'var(--charcoal-700)',
                transition: 'all 0.2s'
              }}
            >
              PURCHASE / BUY
            </button>
            <button
              onClick={() => setMode('rent')}
              style={{
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                padding: '3px 12px',
                borderRadius: 999,
                backgroundColor: mode === 'rent' ? 'var(--maroon-800)' : 'transparent',
                color: mode === 'rent' ? '#ffffff' : 'var(--charcoal-700)',
                transition: 'all 0.2s'
              }}
            >
              RENTAL COLLECTION
            </button>
          </div>

          {/* Heading Row */}
          <div className="collections-title-row">
            <div>
              <span className="collections-eyebrow">
                {mode === 'buy' ? 'PERMANENT POSSESSION' : 'FLEXIBLE OCCASION LUXURY'}
              </span>
              <h1 className="collections-title">
                {mode === 'buy' ? 'Exquisite Collection to Buy' : 'Exquisite Collection for Rent'}
              </h1>
              <p className="collections-description">
                {mode === 'buy'
                  ? 'Handcrafted imitation masterpieces designed for eternity. Own heirloom-quality pieces crafted with precision polish, polki stones, and traditional artistry for your most momentous celebrations.'
                  : 'Wear heirloom-grade designer jewellery for 4, 7, or 10 days at a fraction of the retail cost. 100% sanitized, secured with damage protection, and delivered 2 days prior to your celebration.'}
              </p>
            </div>

            {/* Sort & Count */}
            <div className="collections-toolbar-right">
              <span className="collections-count">
                Showing <strong>{filteredProducts.length}</strong> pieces
              </span>
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

          {/* Categories with Nested Models Hierarchy */}
          <div className="filter-group">
            <div className="filter-group-header">
              <span>Categories & Models</span>
              <span className="collapse-icon">−</span>
            </div>
            <div className="filter-options-list" style={{ gap: '0.85rem' }}>
              {CATEGORY_MODELS_CONFIG.map((cat) => {
                const isCatChecked = selectedCategories.includes(cat.id);
                const isExpanded = !!expandedCategories[cat.id];

                return (
                  <div key={cat.id} className="category-tree-block" style={{ borderBottom: '1px solid #f7f4ee', paddingBottom: '0.4rem' }}>
                    {/* Main Category Row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <label className="filter-checkbox-row" style={{ flex: 1, margin: 0 }}>
                        <input
                          type="checkbox"
                          checked={isCatChecked}
                          onChange={() => toggleCategory(cat.id)}
                        />
                        <span className="checkbox-custom"></span>
                        <span className="filter-label" style={{ fontWeight: 600 }}>{cat.label}</span>
                        <span className="filter-item-count">({cat.count})</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => toggleExpand(cat.id)}
                        style={{ padding: 4, color: 'var(--charcoal-400)', display: 'flex', alignItems: 'center' }}
                        aria-label="Expand models"
                      >
                        {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </button>
                    </div>

                    {/* Subcategories / Models Nested Under Main Category */}
                    {isExpanded && cat.models && (
                      <div
                        className="nested-models-list"
                        style={{
                          marginLeft: '1.4rem',
                          marginTop: '0.45rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.4rem',
                          borderLeft: '1.5px solid #dfd7c7',
                          paddingLeft: '0.65rem'
                        }}
                      >
                        {cat.models.map((model) => {
                          const isModelChecked = selectedModels.includes(model.id);

                          return (
                            <label
                              key={model.id}
                              className="filter-checkbox-row"
                              style={{ fontSize: '0.76rem', color: isModelChecked ? 'var(--maroon-800)' : 'var(--charcoal-600)' }}
                            >
                              <input
                                type="checkbox"
                                checked={isModelChecked}
                                onChange={() => toggleModel(model.id)}
                              />
                              <span className="checkbox-custom" style={{ width: 13, height: 13 }}></span>
                              <span className="filter-label">{model.label}</span>
                              <span className="filter-item-count">({model.count})</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="filter-group">
            <div className="filter-group-header">
              <span>Price Range ({mode === 'buy' ? 'Purchase' : 'Rental'})</span>
              <span className="collapse-icon">−</span>
            </div>
            <div className="price-filter-box">
              <div className="price-slider-row">
                <span className="price-slider-min">₹{mode === 'rent' ? '200' : '1,000'}</span>
                <span className="price-slider-max">₹{mode === 'rent' ? '5,000' : '25,000'}</span>
              </div>
              <input
                type="range"
                min={mode === 'rent' ? '200' : '1000'}
                max={mode === 'rent' ? '5000' : '25000'}
                step={mode === 'rent' ? '100' : '500'}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="price-range-slider"
              />
              <div className="price-inputs-row">
                <div className="price-input-box">
                  <span>₹{mode === 'rent' ? '200' : '1,000'}</span>
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
                '1-Gram Rold Gold Finish',
                'Antique Matte Rold Gold',
                'Rose Gold & Rhodium',
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

        {/* Right Products Catalog Grid */}
        <section className="collections-catalog-section">
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#ffffff', borderRadius: 12, border: '1px solid #ede7dc' }}>
              <Sparkles size={36} color="var(--gold-500)" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--charcoal-900)' }}>
                No pieces match these specific model filters
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--charcoal-500)', marginTop: 4, marginBottom: '1.25rem' }}>
                Try selecting different models, resetting filters, or switching price range.
              </p>
              <button className="btn-primary" onClick={handleResetFilters}>
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="collections-products-grid">
              {filteredProducts.map((product) => {
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
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span className="item-category-eyebrow">{product.category}</span>
                        {product.model && (
                          <span style={{ fontSize: '0.62rem', color: 'var(--gold-600)', fontWeight: 600 }}>
                            {product.model.split(' ')[0]}
                          </span>
                        )}
                      </div>

                      <h3
                        className="item-title"
                        onClick={() => onSelectProduct(product)}
                        title={product.fullName || product.name}
                      >
                        {product.name}
                      </h3>

                      {/* Price Row (Adapted for Buy vs Rent) */}
                      <div className="item-price-row">
                        <span className="item-current-price">
                          ₹{(mode === 'buy' ? product.buyPrice : product.rentPrice).toLocaleString('en-IN')}
                        </span>
                        {mode === 'buy' && product.originalPrice && (
                          <span className="item-original-price">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        {mode === 'rent' && (
                          <span style={{ fontSize: '0.74rem', color: 'var(--maroon-800)', fontWeight: 600 }}>
                            / 4 days
                          </span>
                        )}
                      </div>

                      {mode === 'rent' && product.securityDeposit && (
                        <div style={{ fontSize: '0.68rem', color: '#2e7d32', marginBottom: '0.5rem' }}>
                          +₹{product.securityDeposit.toLocaleString('en-IN')} refundable deposit
                        </div>
                      )}

                      {/* Buy Now / Rent Now Button */}
                      <button
                        className="item-buy-now-btn"
                        onClick={() => onSelectProduct(product)}
                        id={`btn-action-${product.id}`}
                      >
                        <span>{mode === 'buy' ? 'Buy Now' : 'Rent Now'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

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
