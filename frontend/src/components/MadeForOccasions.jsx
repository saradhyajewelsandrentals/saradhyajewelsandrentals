import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function MadeForOccasions({ occasions, onSelectOccasion }) {
  return (
    <section className="occasions-section" id="occasions">
      <div className="container">
        {/* Centered Section Header */}
        <div className="section-centered-header">
          <div className="section-eyebrow">FEATURED COLLECTIONS</div>
          <h2 className="section-title">Made for Your Next Occasion</h2>
          <p className="section-subtitle">
            Find the curated pieces personalized for each celebration in life, available for easy rentals or purchase today.
          </p>
        </div>

        {/* 4 Occasion Cards */}
        <div className="occasions-grid">
          {occasions.map((occ) => (
            <div
              key={occ.id}
              className="occasion-card"
              onClick={() => onSelectOccasion(occ.id)}
              id={`occasion-card-${occ.id}`}
            >
              <img
                src={occ.image}
                alt={occ.title}
                className="occasion-card-img"
                loading="lazy"
              />
              <div className="occasion-card-gradient"></div>
              <div className="occasion-card-content">
                <span className="occasion-pill">{occ.subtitle}</span>
                <h3 className="occasion-title">{occ.title}</h3>
                <p className="occasion-desc">{occ.description}</p>
                <button className="occasion-btn">
                  <span>{occ.buttonText}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
