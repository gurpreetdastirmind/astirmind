import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMode } from '../context/ModeContext';

gsap.registerPlugin(ScrollTrigger);

const agencyTestimonials = [
  { 
    quote: 'Team AstirMind has been very reliable and always available during U.S. hours when needed. Their responsiveness and willingness to assist have been greatly appreciated. It\'s been a pleasure working with someone so dependable. Thank you, Aksh, for your support!', 
    name: 'Julieanne Downing', 
    role: 'Client' 
  },
  { 
    quote: 'Team AstirMind is a talented developers who was able to achieve the task needed for my project and was able to come up with creative solutions on the fly! Will definitely recommend 👌', 
    name: 'Daniel Nejo', 
    role: 'Presidential Ideas' 
  },
  { 
    quote: 'Work completed as requested and in a quick time, there has been good and understandable communication with Team, I am satisfied and recommend it', 
    name: 'Guillermo Vila', 
    role: 'BBO Agency' 
  },
];

const instituteTestimonials = [
  { quote: 'I joined with zero coding experience. By week 8 I had a working Android app on the Play Store. The mentors push you hard but in a good way.', name: 'Priya S.', role: 'Android Development — Batch 2024' },
  { quote: 'The Gen AI program is hands-on from day one. I built a RAG pipeline for my internship project. That alone got me two job offers.', name: 'Arjun M.', role: 'Generative AI — Batch 2023' },
  { quote: 'Other institutes give you slides. AstirMind gave me a real codebase to work on and a mentor who had shipped actual products.', name: 'Farida K.', role: 'Full Stack Development — Batch 2024' },
  { quote: 'The placement support is genuine. They helped me prep for interviews and connected me directly with companies they had worked with.', name: 'Rahul T.', role: 'Data Science — Batch 2023' },
  { quote: 'Computer Vision was tough but the structure made it manageable. Finished with a project I am genuinely proud to show.', name: 'Divya N.', role: 'Computer Vision — Batch 2024' },
];

const AUTO_INTERVAL = 4500;

export default function Testimonials() {
  const { mode } = useMode();
  const isAgency = mode === 'Xperience';
  const testimonials = isAgency ? agencyTestimonials : instituteTestimonials;

  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const transitioning = useRef(false);
  const hovering = useRef(false);
  const timerRef = useRef(null);

  // Reset active index when mode changes
  useEffect(() => {
    setActive(0);
  }, [mode]);

  const goTo = useCallback((i, list) => {
    const total = list || testimonials;
    if (i === active || transitioning.current) return;
    transitioning.current = true;
    const el = quoteRef.current;
    if (!el) { setActive(i); transitioning.current = false; return; }
    gsap.to(el, {
      opacity: 0, y: -15, duration: 0.18, ease: 'power2.in', onComplete: () => {
        setActive(i);
        gsap.fromTo(el, { opacity: 0, y: 15 }, {
          opacity: 1, y: 0, duration: 0.25, ease: 'power2.out',
          onComplete: () => { transitioning.current = false; },
        });
      },
    });
  }, [active, testimonials]);

  // Auto-toggle
  useEffect(() => {
    const tick = () => {
      if (!hovering.current) {
        setActive((prev) => {
          const next = (prev + 1) % testimonials.length;
          const el = quoteRef.current;
          if (el && !transitioning.current) {
            transitioning.current = true;
            gsap.to(el, {
              opacity: 0, y: -15, duration: 0.18, ease: 'power2.in', onComplete: () => {
                gsap.fromTo(el, { opacity: 0, y: 15 }, {
                  opacity: 1, y: 0, duration: 0.25, ease: 'power2.out',
                  onComplete: () => { transitioning.current = false; },
                });
              },
            });
          }
          return next;
        });
      }
    };
    timerRef.current = setInterval(tick, AUTO_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [testimonials.length, mode]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testi-reveal', {
        opacity: 0, y: 30, duration: 0.65, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const t = testimonials[active];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      style={{ padding: '7rem 0', borderBottom: '1px solid var(--line)', background: 'var(--bg-alt)' }}
      onMouseEnter={() => { hovering.current = true; }}
      onMouseLeave={() => { hovering.current = false; }}
    >
      <div className="container">

        <div className="testi-reveal" style={{ marginBottom: '3rem' }}>
          <span className="section-label">{isAgency ? 'Client Voices' : 'Student Outcomes'}</span>
          <h2 className="t-h2">{isAgency ? 'What people say.' : 'Hear from our graduates.'}</h2>
        </div>

        <div className="grid-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '3rem', alignItems: 'start' }}>

          {/* Left: list */}
          <div className="testi-reveal" style={{ gridColumn: '1 / 5' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--accent)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '2rem' }}>
              {String(active + 1).padStart(2, '0')}
              <span style={{ fontSize: '0.875rem', color: 'var(--text-3)', fontWeight: 400, marginLeft: 8 }}>/ {String(testimonials.length).padStart(2, '0')}</span>
            </div>
            <div>
              {testimonials.map((client, i) => (
                <button key={i} onClick={() => goTo(i)}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',
                    padding: '1rem 1rem 1rem 1.125rem',
                    background: i === active ? 'var(--bg-card)' : 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--line)',
                    borderLeft: i === active ? '2px solid var(--accent)' : '2px solid transparent',
                    cursor: 'pointer', textAlign: 'left', gap: 12,
                    transition: 'background 0.2s, border-color 0.2s',
                  }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: i === active ? 700 : 450, color: i === active ? 'var(--text)' : 'var(--text-3)', transition: 'color 0.15s' }}>{client.name}</span>
                  <span className="t-mono" style={{ fontSize: '0.5625rem', color: i === active ? 'var(--accent)' : 'var(--text-3)', fontWeight: i === active ? 700 : 500, flexShrink: 0, textAlign: 'right', maxWidth: 100 }}>{client.role}</span>
                </button>
              ))}
            </div>

            {/* Progress dots */}
            <div style={{ display: 'flex', gap: 6, marginTop: '1.5rem' }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} style={{
                  width: i === active ? 20 : 6, height: 6, border: 'none', cursor: 'pointer',
                  background: i === active ? 'var(--accent)' : 'var(--line-light)',
                  transition: 'width 0.3s, background 0.3s',
                  padding: 0,
                }} />
              ))}
            </div>
          </div>

          {/* Right: quote */}
          <div style={{ gridColumn: '6 / 13', borderLeft: '1px solid var(--line)', paddingLeft: '3rem' }}>
            <div ref={quoteRef} style={{ opacity: 1, background: 'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015))', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'var(--shadow-soft)', padding: '2rem 2.25rem' }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '5rem', fontWeight: 700, color: 'var(--line-light)', lineHeight: 0.8, marginBottom: '1.25rem', letterSpacing: '-0.04em', userSelect: 'none' }}>&ldquo;</div>
              <blockquote style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.125rem, 2vw, 1.75rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.4, color: 'var(--text)', margin: '0 0 2.5rem', border: 'none', padding: 0 }}>
                {t.quote}
              </blockquote>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <div style={{ width: 40, height: 40, background: 'var(--text)', color: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700, flexShrink: 0 }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text)' }}>{t.name}</div>
                  <div className="t-mono" style={{ fontSize: '0.5625rem' }}>{t.role}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}