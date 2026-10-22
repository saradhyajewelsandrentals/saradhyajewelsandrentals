import React from 'react';
import { Gem, CalendarCheck, PackageCheck, RotateCcw } from 'lucide-react';

export default function HowRentingWorks({ steps }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Gem':
        return <Gem size={26} />;
      case 'CalendarCheck':
        return <CalendarCheck size={26} />;
      case 'PackageCheck':
        return <PackageCheck size={26} />;
      case 'RotateCcw':
        return <RotateCcw size={26} />;
      default:
        return <Gem size={26} />;
    }
  };

  return (
    <section className="how-it-works-section" id="how-renting-works">
      <div className="container">
        {/* Centered Section Header */}
        <div className="section-centered-header">
          <div className="section-eyebrow">FOUR SIMPLE STEPS FOR RENTALS</div>
          <h2 className="section-title">How Renting Works</h2>
          <p className="section-subtitle">
            From selection to return, a seamless journey for a memorable occasion.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.step} className="step-card" id={`step-${step.step}`}>
              <div className="step-icon-circle">
                {getIcon(step.icon)}
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
