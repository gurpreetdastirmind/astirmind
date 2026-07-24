// src/components/WhyAstirMind.jsx
import { Users2, Sparkles, Calendar, Clock, Trophy, Briefcase } from 'lucide-react';

const features = [
  { icon: Users2, title: '1-on-1 Mentoring', desc: 'Personalized guidance from industry experts to accelerate your learning.' },
  { icon: Sparkles, title: '2 Free Demo Classes', desc: 'Experience our teaching methodology before committing to the program.' },
  { icon: Calendar, title: 'Monthly Fee Structure', desc: 'Flexible payment options with monthly installments to ease your financial burden.' },
  { icon: Clock, title: 'Flexible Timings', desc: 'Choose from morning, evening, or weekend batches as per your convenience.' },
  { icon: Trophy, title: 'ISO Certified Internship', desc: 'Industry-recognized certification that adds value to your professional profile.' },
  { icon: Briefcase, title: 'Placement Assistance', desc: 'Dedicated support for job placements and interview preparation.' }
];

export default function WhyAstirMind() {
  return (
    <section style={{ padding: '5rem 0', borderBottom: '1px solid var(--line)', background: 'var(--bg-alt)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label" style={{ display: 'inline-block' }}>Why AstirMind</span>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1, color: 'var(--text)', marginTop: '0.75rem' }}>
            Why Choose Us?
          </h2>
          <p style={{ color: 'var(--text-3)', maxWidth: 500, margin: '0.5rem auto 0' }}>
            We combine industry expertise with personalized learning to help you succeed.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: '1px', border: '1px solid var(--line)', background: 'var(--line)' }}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} style={{ background: 'var(--bg-card)', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-elevated)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-card)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--accent)', borderRadius: '4px', flexShrink: 0 }}>
                    <Icon size={20} color="var(--accent)" strokeWidth={1.5} />
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 600, margin: 0, color: 'var(--text)' }}>{feature.title}</h4>
                </div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-2)', margin: 0, paddingLeft: '3rem' }}>{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}