import React from 'react';
import { ShieldCheck, Sparkles, Calendar, Truck, Gift } from 'lucide-react';

export default function TrustBadges({ badges }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck size={22} />;
      case 'Sparkles':
        return <Sparkles size={22} />;
      case 'Calendar':
        return <Calendar size={22} />;
      case 'Truck':
        return <Truck size={22} />;
      case 'Gift':
        return <Gift size={22} />;
      default:
        return <ShieldCheck size={22} />;
    }
  };

  return (
    <section className="trust-badges-section" id="guarantee">
      <div className="container">
        <div className="trust-badges-grid">
          {badges.map((b) => (
            <div key={b.id} className="trust-badge-item">
              <div className="trust-icon-box">
                {getIcon(b.icon)}
              </div>
              <h4 className="trust-badge-title">{b.title}</h4>
              <p className="trust-badge-desc">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
