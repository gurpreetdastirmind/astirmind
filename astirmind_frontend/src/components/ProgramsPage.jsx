import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { API_BASE } from '../config/api';
import { Helmet } from 'react-helmet';
import {
  Brain, Globe, Database, Eye, Smartphone, Cpu,
  TerminalSquare, PenTool, ChevronDown, ArrowUpRight, Loader2, AlertCircle,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

// Map icon_name strings (from DB) → Lucide components
const ICON_MAP = {
  Brain,
  Globe,
  Database,
  Eye,
  Smartphone,
  Cpu,
  TerminalSquare,
  PenTool,
};

function getIcon(name) {
  return ICON_MAP[name] || Brain;
}

// ─── placeholder while loading ───────────────────────────────────────────────
function LoadingState() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 12, color: 'var(--text-3)' }}>
      <Loader2 size={20} strokeWidth={1.5} style={{ animation: 'spin 1s linear infinite' }} />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.08em' }}>Loading programs…</span>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 12, color: 'var(--text-3)' }}>
      <AlertCircle size={24} strokeWidth={1.5} color="var(--accent)" />
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}>{message}</span>
    </div>
  );
}

// ─── Programs are fetched from the API ───────────────────────────────────────

function Badge({ children, accent, dim }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.07em',
      textTransform: 'uppercase', padding: '3px 10px',
      border: `1px solid ${accent ? 'var(--accent)' : dim ? 'rgba(255,255,255,0.1)' : 'var(--line)'}`,
      color: accent ? 'var(--accent)' : dim ? 'var(--text-3)' : 'var(--text-2)',
    }}>{children}</span>
  );
}

function AccordionModule({ mod, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div style={{ borderBottom: '1px solid var(--line)' }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1rem 0', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16,
      }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>{mod.title}</span>
        <ChevronDown size={15} strokeWidth={2} color="var(--text-3)"
          style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
      </button>
      <div style={{ overflow: 'hidden', maxHeight: open ? 500 : 0, transition: 'max-height 0.3s cubic-bezier(0.4,0,0.2,1)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))', gap: '4px 1.5rem', paddingBottom: '1.25rem' }}>
          {mod.topics.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--accent)', flexShrink: 0, marginTop: 2 }}>—</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-2)', lineHeight: 1.55 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSlug, setActiveSlug] = useState(null);
  const heroRef = useRef(null);

  // Fetch programs from API
  useEffect(() => {
    fetch(`${API_BASE}/programs/`)
      .then(r => { if (!r.ok) throw new Error(`Server error ${r.status}`); return r.json(); })
      .then(data => {
        setPrograms(data);
        if (data.length > 0) setActiveSlug(data[0].slug);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const program = programs.find(p => p.slug === activeSlug) || programs[0];
  const Icon = program ? getIcon(program.icon_name) : Brain;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.prog-hero-in', {
        opacity: 0, y: 24, duration: 0.65, stagger: 0.1, ease: 'power2.out',
      });
    });
    return () => ctx.revert();
  }, []);

  // animate detail panel on program change
  useEffect(() => {
    if (!program) return;
    gsap.fromTo('.prog-detail-in', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: 'power2.out' });
  }, [activeSlug]);

  if (loading) return <div style={{ paddingTop: 68 }}><LoadingState /></div>;
  if (error) return <div style={{ paddingTop: 68 }}><ErrorState message={`Could not load programs: ${error}`} /></div>;
  if (!program) return null;

  return (
      <>
      <Helmet>
        <title>Internship Programs | AstirMind Software Solutions</title>
        <meta
          name="description"
          content="Explore AstirMind's internship and training programs in web development, AI, mobile development, data science, and more. Gain hands-on experience with real projects."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Internship Programs | AstirMind Software Solutions" />
        <meta property="og:description" content="Explore AstirMind's internship and training programs in web development, AI, mobile development, data science, and more." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 68 }}>

        {/* ── Page header ── */}
        <div ref={heroRef} style={{
          position: 'relative', overflow: 'hidden',
          borderBottom: '1px solid var(--line)',
          backgroundImage: 'url(/img/page-header-training.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}>
          {/* dark overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.92) 50%, rgba(10,10,10,0.55) 100%)' }} />
          {/* accent rule top */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)', zIndex: 2 }} />
          {/* ghost text */}
          <div style={{ position: 'absolute', right: '-1rem', top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-mono)', fontSize: 'clamp(6rem, 18vw, 14rem)', fontWeight: 700, color: 'rgba(255,255,255,0.04)', letterSpacing: '-0.05em', userSelect: 'none', pointerEvents: 'none', lineHeight: 1, zIndex: 1 }}>
            LEARN
          </div>
          <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', position: 'relative', zIndex: 2 }}>
            <span className="prog-hero-in section-label" style={{ color: 'var(--accent)', borderColor: 'rgba(255,255,255,0.15)' }}>AstirMind Institute</span>
            <h1 className="prog-hero-in" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1.05, marginBottom: '1rem' }}>
              Programs & Courses
            </h1>
            <p className="prog-hero-in" style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', maxWidth: 500, marginBottom: '2.5rem' }}>
              Every program runs on live projects with working mentors. You graduate with a portfolio, code in production, and the experience companies look for.
            </p>
            <div className="prog-hero-in programs-stat-row">
              {[
                { v: `${programs.length}`, l: 'Programs' },
                { v: `${programs.filter(p => p.has_internship).length}`, l: 'Internship Tracks' },
                { v: `${programs.filter(p => p.has_certificate).length}`, l: 'Certified' },
                { v: '100%', l: 'Project-Based' },
              ].map(({ v, l }, i) => (
                <div key={l} style={{ padding: '0.875rem 1.75rem', borderRight: '1px solid rgba(255,255,255,0.12)', borderLeft: i === 0 ? '1px solid rgba(255,255,255,0.12)' : 'none', background: 'rgba(255,255,255,0.04)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '-0.03em', lineHeight: 1 }}>{v}</div>
                  <div className="t-mono" style={{ fontSize: '0.5625rem', color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main layout: sidebar + detail ── */}
        <div className="programs-layout">

          {/* ── Left sidebar (desktop) ── */}
          <div className="programs-sidebar">
            {/* sidebar header */}
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--line)' }}>
              <span className="t-mono" style={{ fontSize: '0.5625rem', color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {programs.length} Programs
              </span>
            </div>

            {/* program list */}
            {programs.map((p) => {
              const I = getIcon(p.icon_name);
              const isActive = activeSlug === p.slug;
              return (
                <button
                  key={p.slug}
                  onClick={() => setActiveSlug(p.slug)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                    padding: '1.125rem 1.5rem',
                    background: isActive ? 'var(--bg-elevated)' : 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--line)',
                    borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'background 0.15s, border-color 0.15s',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--bg-alt)'; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                >
                  {/* icon box */}
                  <div style={{
                    width: 36, height: 36, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `1px solid ${isActive ? 'var(--accent)' : 'var(--line)'}`,
                    background: isActive ? 'rgba(255,255,255,0.04)' : 'transparent',
                    transition: 'border-color 0.15s',
                  }}>
                    <I size={16} strokeWidth={1.5} color={isActive ? 'var(--accent)' : 'var(--text-3)'} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--text)' : 'var(--text-2)', letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                      <span className="t-mono" style={{ fontSize: '0.5rem', color: 'var(--text-3)' }}>{p.duration}</span>
                      {p.has_internship && <span className="t-mono" style={{ fontSize: '0.5rem', color: 'var(--accent)' }}>· Internship</span>}
                    </div>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: isActive ? 'var(--accent)' : 'var(--text-3)', flexShrink: 0 }}>{String(p.order).padStart(2, '0')}</span>
                </button>
              );
            })}
          </div>

          {/* ── Mobile arrow nav ── */}
          {(() => {
            const idx = programs.findIndex(p => p.slug === activeSlug);
            const prev = programs[idx - 1];
            const next = programs[idx + 1];
            return (
              <div className="programs-arrow-nav">
                <button
                  className="programs-arrow-btn"
                  onClick={() => prev && setActiveSlug(prev.slug)}
                  disabled={!prev}
                  aria-label="Previous program"
                >
                  <ChevronLeft size={18} strokeWidth={2} />
                </button>
                <div className="programs-arrow-label">
                  <span className="t-mono" style={{ fontSize: '0.5rem', color: 'var(--text-3)', display: 'block', marginBottom: 2 }}>
                    {String(idx + 1).padStart(2, '0')} / {String(programs.length).padStart(2, '0')}
                  </span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em' }}>
                    {program.title}
                  </span>
                </div>
                <button
                  className="programs-arrow-btn"
                  onClick={() => next && setActiveSlug(next.slug)}
                  disabled={!next}
                  aria-label="Next program"
                >
                  <ChevronRight size={18} strokeWidth={2} />
                </button>
              </div>
            );
          })()}

          {/* ── Right detail panel ── */}
          <div className="programs-detail">

            {/* program title bar */}
            <div className="prog-detail-in programs-detail-header">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.75rem' }}>
                  <Icon size={22} strokeWidth={1.5} color="var(--accent)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-3)', letterSpacing: '0.1em' }}>
                    PROGRAM {String(program.order).padStart(2, '0')} / {String(programs.length).padStart(2, '0')}
                  </span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.035em', color: 'var(--text)', lineHeight: 1.1, marginBottom: '0.5rem' }}>
                  {program.title}
                </h2>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--text-2)', lineHeight: 1.5 }}>{program.tagline}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <Badge>{program.duration}</Badge>
                  <Badge>{program.format}</Badge>
                  {program.has_internship && <Badge accent>Internship</Badge>}
                  {program.has_certificate && <Badge dim>Certificate</Badge>}
                </div>
                <Link
                  to={`/programs/${program.slug}`}
                  className="btn-solid"
                  style={{
                    marginTop: 4,
                    padding: '0.6rem 1.25rem',
                    fontSize: '0.8125rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    textDecoration: 'none'
                  }}
                >
                  View Details  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {/* body: overview + curriculum in one readable flow */}
            <div className="programs-detail-body">

              {/* overview */}
              <div className="prog-detail-in">
                <div className="t-mono" style={{ fontSize: '0.5625rem', color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Overview</div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: 1.75, color: 'var(--text-2)', maxWidth: 660 }}>{program.overview}</p>
              </div>

              {/* curriculum */}
              <div className="prog-detail-in">
                <div className="t-mono" style={{ fontSize: '0.5625rem', color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Curriculum</div>
                <div style={{ border: '1px solid var(--line)' }}>
                  {program.modules.map((mod, i) => (
                    <div key={`${program.slug}-${i}`} style={{ borderBottom: i < program.modules.length - 1 ? '1px solid var(--line)' : 'none', padding: '0 1.5rem' }}>
                      <AccordionModule mod={mod} index={i} />
                    </div>
                  ))}
                </div>
              </div>

              {/* tools */}
              <div className="prog-detail-in">
                <div className="t-mono" style={{ fontSize: '0.5625rem', color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Tools & Stack</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {program.tools.map(t => (
                    <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.05em', color: 'var(--text-2)', border: '1px solid var(--line)', padding: '6px 14px', background: 'var(--bg-alt)' }}>{t}</span>
                  ))}
                </div>
              </div>
              {/* apply CTA strip */}
              <div
                className="prog-detail-in"
                style={{
                  borderTop: '1px solid var(--line)',
                  paddingTop: '2.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1.5rem'
                }}
              >

                <div>

                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: 'var(--text)',
                      letterSpacing: '-0.02em',
                      marginBottom: '0.4rem'
                    }}
                  >
                    Request Full Curriculum
                  </div>

                  <div
                    className="t-mono"
                    style={{
                      fontSize: '0.5625rem',
                      color: 'var(--text-3)',
                      lineHeight: 1.8,
                      maxWidth: 520
                    }}
                  >
                    Get complete syllabus, project roadmap,
                    internship details, tools covered,
                    fees structure, and career guidance directly on WhatsApp.
                  </div>

                </div>

                <a
                  href={`https://wa.me/919815674608?text=${encodeURIComponent(
                    `Hi AstirMind, please share the full curriculum and complete details for ${program.title}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-solid"
                  style={{
                    padding: '0.75rem 1.75rem',
                    fontSize: '0.9rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  Request Curriculum
                  <ArrowUpRight size={16} />
                </a>

              </div>

            </div>
          </div>

        </div>
      </div>
      </>
      );
}
