import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function StatementBanner({ onExploreProcess }) {
  return (
    <section className="statement-banner-section" id="rental-revolution">
      <div className="container">
        <div className="statement-banner-grid">
          {/* Left Column Text & Action */}
          <div className="statement-left">
            <span className="statement-eyebrow">THE RENTAL REVOLUTION</span>
            <h2 className="statement-heading">
              Wear designer statement bridal sets at a fraction of the cost.
            </h2>
            <p className="statement-body">
              Premium craftsmanship shouldn't come with buyer's regret. Experience handcrafted heritage bridal jewellery delivered right to your doorstep, perfectly sanitized and ready for your special day.
            </p>
            <button
              className="statement-btn"
              onClick={onExploreProcess}
              id="statement-explore-btn"
            >
              <span>Explore Rental Process</span>
            </button>
          </div>

          {/* Right Column: Two featured imagery cards */}
          <div className="statement-right-images">
            <div className="statement-img-card">
              <img
                src="/images/banner-bride.jpg"
                alt="Radiant Bride wearing Saradhya Polki Choker"
                loading="lazy"
              />
            </div>
            <div className="statement-img-card">
              <img
                src="/images/velvet-cushion.jpg"
                alt="Handcrafted Jewelry on Velvet Cushion"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
