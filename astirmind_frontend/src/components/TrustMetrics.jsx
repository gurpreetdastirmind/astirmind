// src/components/TrustMetrics.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Calculate years of experience dynamically
const getYearsExperience = () => {
  const startYear = 2016;
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
};

export default function TrustMetrics() {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.trust-metric', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const metrics = [
    { value: '200+', label: 'Projects Shipped' },
    { value: getYearsExperience() + '+', label: 'Years Experience' },
    { value: '200+', label: 'Students Trained' },
    { value: '98%', label: 'Client Satisfaction' },
  ];

  return (
    <section 
      ref={sectionRef}
      style={{ 
        padding: '4rem 0', 
        borderBottom: '1px solid var(--line)', 
        background: 'var(--bg-alt)' 
      }}
    >
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '1px', 
          border: '1px solid var(--line)', 
          background: 'var(--line)' 
        }}>
          {metrics.map((item, i) => (
            <div 
              key={i} 
              className="trust-metric"
              style={{ 
                padding: '2rem', 
                textAlign: 'center', 
                background: 'var(--bg-card)',
                transition: 'background 0.2s, transform 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-elevated)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--bg-card)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', 
                fontWeight: 700, 
                color: 'var(--accent)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1
              }}>
                {item.value}
              </div>
              <div style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.625rem', 
                color: 'var(--text-3)',
                marginTop: '0.25rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase'
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}