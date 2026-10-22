import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function StyleInspiration({ inspirations, onSelectLook }) {
  return (
    <section className="inspiration-section" id="inspiration">
      <div className="container">
        {/* Split Header */}
        <div className="section-header-split">
          <div>
            <div className="section-eyebrow">REAL BRIDES & CELEBRITIES</div>
            <h2 className="section-title">Style Inspiration</h2>
          </div>
          <p className="section-subtext-right">
            Real brides and fashion icons styling Saradhya pieces. Tag us with @saradhyajewels to get featured in our bridal lookbook.
          </p>
        </div>

        {/* 3 Inspiration Cards */}
        <div className="inspiration-grid">
          {inspirations.map((item) => (
            <div
              key={item.id}
              className="inspiration-card"
              onClick={() => onSelectLook(item)}
              id={`insp-card-${item.id}`}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
              />
              <div className="inspiration-overlay"></div>
              <div className="inspiration-content">
                <span className="inspiration-tag">
                  <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
                  {item.tag || item.subtitle}
                </span>
                <h3 className="inspiration-title">{item.title}</h3>
                <p className="inspiration-desc">{item.description}</p>
                <div className="inspiration-btn">
                  <span>Shop This Look</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
