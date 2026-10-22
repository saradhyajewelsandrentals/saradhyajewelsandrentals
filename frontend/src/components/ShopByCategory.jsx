import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ShopByCategory({ categories, onSelectCategory }) {
  return (
    <section className="category-section" id="categories">
      <div className="container">
        {/* Header with split layout */}
        <div className="section-header-split">
          <div>
            <div className="section-eyebrow">CURATED FOR EVERY OCCASION</div>
            <h2 className="section-title">Shop by Category</h2>
          </div>
          <p className="section-subtext-right">
            Whether you want to buy for life or rent for a single day, we provide hand-crafted pieces curated for your precious moments.
          </p>
        </div>

        {/* 8 Categories Grid (2 rows of 4) */}
        <div className="category-grid">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="category-card"
              onClick={() => onSelectCategory(cat.id)}
              id={`cat-card-${cat.id}`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="category-card-img"
                loading="lazy"
              />
              <div className="category-card-gradient"></div>
              <div className="category-card-content">
                <h3 className="category-card-title">{cat.name}</h3>
                <span className="category-card-link">
                  <span>Explore</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
