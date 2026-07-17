import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMode } from '../context/ModeContext';

gsap.registerPlugin(ScrollTrigger);

function AgencyIllustration() {
  const ref = useRef(null);
  const codeLines = [
    {
      num: '01',
      chars: 46,
      code: [
        <span key="k1" style={{ color: '#C586C0' }}>import</span>,
        ' { createPipeline } ',
        <span key="k2" style={{ color: '#C586C0' }}>from</span>,
        ' ',
        <span key="k3" style={{ color: '#9CDCFE' }}>'./core/pipeline'</span>,
        ';',
      ],
      dim: false,
    },
    {
      num: '02',
      chars: 46,
      code: [
        <span key="k1" style={{ color: '#C586C0' }}>import</span>,
        ' { launchProgram } ',
        <span key="k2" style={{ color: '#C586C0' }}>from</span>,
        ' ',
        <span key="k3" style={{ color: '#9CDCFE' }}>'./core/courses'</span>,
        ';',
      ],
      dim: false,
    },
    { num: '03', chars: 0, code: [], dim: true },
    {
      num: '04',
      chars: 32,
      code: [
        <span key="k1" style={{ color: '#C586C0' }}>const</span>,
        ' product = ',
        <span key="k2" style={{ color: '#CE9178' }}>'client-portal'</span>,
        ';',
      ],
      dim: false,
    },
    {
      num: '05',
      chars: 32,
      code: [
        <span key="k1" style={{ color: '#C586C0' }}>const</span>,
        ' cohort = ',
        <span key="k2" style={{ color: '#CE9178' }}>'summer-interns'</span>,
        ';',
      ],
      dim: false,
    },
    { num: '06', chars: 0, code: [], dim: true },
    {
      num: '07',
      chars: 39,
      code: [
        <span key="k1" style={{ color: '#4EC9B0' }}>export async function</span>,
        ' ',
        <span key="k2" style={{ color: '#DCDCAA' }}>kickoff</span>,
        '() {',
      ],
      dim: false,
    },
    {
      num: '08',
      chars: 43,
      code: [
        '  ',
        <span key="k1" style={{ color: '#C586C0' }}>const</span>,
        ' pipeline = ',
        <span key="k2" style={{ color: '#DCDCAA' }}>createPipeline</span>,
        '(product);',
      ],
      dim: false,
    },
    {
      num: '09',
      chars: 49,
      code: [
        '  ',
        <span key="k1" style={{ color: '#C586C0' }}>await</span>,
        ' ',
        <span key="k2" style={{ color: '#DCDCAA' }}>launchProgram</span>,
        '({ cohort, pipeline });',
      ],
      dim: false,
    },
    {
      num: '10',
      chars: 28,
      code: [
        '  ',
        <span key="k1" style={{ color: '#DCDCAA' }}>return</span>,
        ' pipeline.ready();',
      ],
      dim: false,
    },
    { num: '11', chars: 1, code: ['}'], dim: false },
  ];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 7;
      gsap.to(el, { x, y, duration: 1, ease: 'power2.out' });
    };

    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={ref} style={{
      width: '100%', maxWidth: 620,
      background: '#0C0B0A',
      border: '1px solid var(--line)',
      overflow: 'hidden',
      willChange: 'transform',
      boxShadow: '0 24px 80px rgba(0,0,0,0.28)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: '1px solid var(--line)', background: '#0F0E0C' }}>
        <div style={{ width: 8, height: 8, background: '#FF5F57', borderRadius: '50%' }} />
        <div style={{ width: 8, height: 8, background: '#FFBD2E', borderRadius: '50%' }} />
        <div style={{ width: 8, height: 8, background: '#27C93F', borderRadius: '50%' }} />
        <div style={{ flex: 1, marginLeft: 8, height: 16, background: '#1A1815', borderRadius: 0, border: '1px solid var(--line)' }} />
      </div>

      <div style={{ minHeight: 372, padding: '22px 0 18px' }}>
        {codeLines.map((line, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '36px 1fr', gap: 16,
            padding: '3px 18px',
            background: line.dim ? 'rgba(255,255,255,0.015)' : 'transparent',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-3)', userSelect: 'none', textAlign: 'right', lineHeight: '1.7' }}>{line.num}</span>
            <span style={{ display: 'flex', alignItems: 'center', minHeight: 20 }}>
              {line.dim ? (
                <span style={{ display: 'inline-block', width: '100%' }} />
              ) : (
                <span style={{
                  display: 'inline-block',
                  maxWidth: '100%',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--text-2)',
                  lineHeight: '1.7',
                  verticalAlign: 'top',
                }}>
                  {line.code}
                </span>
              )}
            </span>
          </div>
        ))}

        <div style={{ display: 'grid', gridTemplateColumns: '36px 1fr', gap: 16, padding: '3px 18px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-3)', textAlign: 'right', lineHeight: '1.7' }}>12</span>
          <span style={{ display: 'flex', alignItems: 'center', minHeight: 20 }}>
            <span style={{ width: 8, height: 15, background: 'var(--accent)', display: 'inline-block', animation: 'blink 1s step-end infinite' }} />
          </span>
        </div>
      </div>

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
}

function InstituteIllustration() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 7;
      gsap.to(el, { x, y, duration: 1, ease: 'power2.out' });
    };
    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={ref} style={{
      width: '100%', maxWidth: 600,
      background: '#0C0B0A',
      border: '1px solid var(--line)',
      overflow: 'hidden',
      willChange: 'transform',
      boxShadow: '0 24px 80px rgba(0,0,0,0.24)',
    }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--line)', background: '#0F0E0C' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Curriculum Overview</div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>Full-Stack Development Track</div>
      </div>

      {[
        { week: '01-04', title: 'Fundamentals', progress: 100, color: true },
        { week: '05-08', title: 'Backend Engineering', progress: 72, color: true },
        { week: '09-12', title: 'Frontend & Design', progress: 28, color: false },
        { week: '13-16', title: 'Capstone & Deploy', progress: 0, color: false },
      ].map((mod, i) => (
        <div key={i} style={{ padding: '14px 16px', borderBottom: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-3)', marginRight: 12 }}>WEEK {mod.week}</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text)' }}>{mod.title}</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: mod.progress === 100 ? '#27C93F' : mod.progress > 0 ? 'var(--accent)' : 'var(--text-3)' }}>
              {mod.progress > 0 ? `${mod.progress}%` : 'Upcoming'}
            </span>
          </div>
          <div style={{ height: 3, background: 'var(--line)', borderRadius: 0, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${mod.progress}%`, background: mod.progress === 100 ? '#27C93F' : 'var(--accent)', transition: 'width 0.3s' }} />
          </div>
        </div>
      ))}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid var(--line)' }}>
        {[{ l: 'Duration', v: '16 wks' }, { l: 'Format', v: 'Live' }, { l: 'Mode', v: 'Offline' }].map((s, i) => (
          <div key={i} style={{ padding: '12px 10px', textAlign: 'center', borderRight: i < 2 ? '1px solid var(--line)' : 'none' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-3)', marginBottom: 4 }}>{s.l}</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text)' }}>{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const HEADLINE = {
  Xperience: ['We Build', 'Software', 'That Works.'],
  Training: ['We Train', 'The Next', 'Generation.'],
};

export default function Hero() {
  const { mode } = useMode();
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── 1. Word-by-word stagger on headline ── */
      gsap.from('.hero-word', {
        y: '110%',
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.15,
      });

      /* ── 2. Clip-path reveal for non-headline elements ── */
      gsap.from('.hero-reveal', {
        clipPath: 'inset(0 0 100% 0)',
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.45,
      });

      /* ── 3. Scale in illustration ── */
      gsap.from('.hero-illustration', {
        opacity: 0,
        scale: 0.94,
        duration: 0.7,
        ease: 'power2.out',
        delay: 0.3,
      });

      /* ── 4. Multi-layer parallax on bg text ── */
      gsap.to('.hero-bg-text', {
        y: '18%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      /* ── 5. Secondary bg gradient shifts slower ── */
      gsap.to('.hero-bg-gradient', {
        y: '8%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

    }, heroRef);
    return () => ctx.revert();
  }, [mode]);

  return (
    <section ref={heroRef} style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      borderBottom: '1px solid var(--line)', overflow: 'hidden',
paddingTop: 68,
    }}>

      {/* Secondary bg gradient — shifts on scroll */}
      <div className="hero-bg-gradient" style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: mode === 'Xperience'
          ? 'radial-gradient(ellipse 75% 58% at 78% 48%, rgba(217,79,44,0.11) 0%, transparent 72%), radial-gradient(ellipse 48% 38% at 58% 36%, rgba(255,255,255,0.025) 0%, transparent 75%)'
          : 'radial-gradient(ellipse 78% 60% at 32% 50%, rgba(217,79,44,0.09) 0%, transparent 72%), radial-gradient(ellipse 52% 40% at 62% 62%, rgba(214,137,67,0.06) 0%, transparent 78%)',
      }} />

      {/* Dot grid overlay — very subtle */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 80%)',
      }} />

      {/* Background word — large, slow parallax */}
      <div className="hero-bg-text" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--font-sans)', fontSize: 'clamp(7rem, 20vw, 22rem)',
        fontWeight: 700, letterSpacing: '-0.06em',
        color: 'rgba(255,255,255,0.08)', zIndex: 0, pointerEvents: 'none',
        whiteSpace: 'nowrap', userSelect: 'none',
      }}>
        {mode === 'Xperience' ? 'BUILD' : 'LEARN'}
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="grid-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '0.75rem', alignItems: 'center' }}>

          {/* Copy */}
          <div style={{ gridColumn: '1 / 6' }}>
            <div className="hero-reveal badge-raw" style={{ marginBottom: '1.5rem' }}>
              {mode === 'Xperience' ? 'Software Engineering' : 'Technical Training'}
            </div>

            {/* Headline — each word clips in independently */}
            <h1 style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', marginBottom: '1.75rem', overflow: 'hidden' }}>
              {HEADLINE[mode].map((line, i) => (
                <span key={i} style={{ overflow: 'hidden', lineHeight: 1.05 }}>
                  <span className="hero-word t-hero" style={i === 1 ? { color: 'var(--accent)' } : {}}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p className="t-body-lg hero-reveal" style={{ maxWidth: 520, marginBottom: '2rem' }}>
              {mode === 'Xperience'
                ? 'We engineer reliable applications for growing businesses. We also run an institute providing technical training and internships to the next generation of developers.'
                : 'Learn software engineering by building real applications. We offer hands-on training and internship programs that give you the practical experience needed to start your career.'}
            </p>

            <div className="hero-reveal" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href={mode === 'Xperience' ? '#work' : '#services'} className="btn-solid">
                {mode === 'Xperience' ? 'View Our Work' : 'Explore Programs'}
              </a>
              <a href="#contact" className="btn-outline">
                {mode === 'Xperience' ? 'Start a Project' : 'Apply Now'}
              </a>
            </div>
          </div>

          {/* Illustration */}
          <div className="hero-illustration hide-mobile" style={{ gridColumn: '6 / 13', display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ width: '100%', maxWidth: mode === 'Xperience' ? 640 : 620, display: 'flex', justifyContent: 'flex-end' }}>
              {mode === 'Xperience' ? <AgencyIllustration /> : <InstituteIllustration />}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
