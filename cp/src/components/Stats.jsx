import React, { useEffect, useState } from 'react';

const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count}</span>;
};

const Stats = () => {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-item reveal">
            <div className="stat-number"><CountUp end={500} /><span className="accent">+</span></div>
            <div className="stat-label">Professionals Onboarded</div>
          </div>
          <div className="stat-item reveal reveal-delay-1">
            <div className="stat-number"><CountUp end={3} /></div>
            <div className="stat-label">Industry Modules</div>
          </div>
          <div className="stat-item reveal reveal-delay-2">
            <div className="stat-number"><CountUp end={99} /><span className="accent">.9%</span></div>
            <div className="stat-label">Platform Uptime</div>
          </div>
          <div className="stat-item reveal reveal-delay-3">
            <div className="stat-number"><CountUp end={24} /><span className="accent">/7</span></div>
            <div className="stat-label">Dedicated Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
