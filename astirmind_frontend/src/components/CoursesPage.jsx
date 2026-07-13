import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Helmet } from 'react-helmet';
import {
  Brain, Globe, Database, Eye, Smartphone, Cpu,
  TerminalSquare, PenTool, Star, ArrowUpRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { courses } from './Services';
import { useGoogleRating } from '../hooks/useGoogleRating';

gsap.registerPlugin(ScrollTrigger);

// Map icon_name strings → Lucide components
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

function getIcon(iconName) {
  for (const [key, Icon] of Object.entries(ICON_MAP)) {
    if (iconName && iconName.toLowerCase() === key.toLowerCase()) {
      return Icon;
    }
  }
  return Brain;
}

// Google Star Rating Component
function GoogleStarRating({ rating, total = 5 }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {[...Array(total)].map((_, i) => (
        <Star
          key={i}
          size={14}
          strokeWidth={1.5}
          fill={i < fullStars ? 'var(--accent)' : (i === fullStars && hasHalfStar ? 'var(--accent)' : 'none')}
          style={{
            color: i < fullStars || (i === fullStars && hasHalfStar) ? 'var(--accent)' : 'var(--line)',
            opacity: i < fullStars || (i === fullStars && hasHalfStar) ? 1 : 0.3
          }}
        />
      ))}
    </div>
  );
}

export default function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const heroRef = useRef(null);
  
  // Get Google Rating dynamically
  const { rating: googleRating, loading: ratingLoading } = useGoogleRating();

  // Use local courses data
  useEffect(() => {
    const mappedPrograms = courses.map((course, index) => ({
      ...course,
      order: index + 1,
      icon_name: course.Icon ? course.Icon.name : 'Brain',
      tagline: course.desc.split('.')[0] + '.',
      overview: course.desc,
      duration: course.tags.find(t => t.includes('Week')) || '12 Weeks',
      format: 'Hybrid',
      has_certificate: course.tags.includes('Certification'),
      has_internship: course.tags.includes('Internship'),
      tools: course.tags.filter(t => !t.includes('Week') && !t.includes('Project') && !t.includes('Certification') && !t.includes('Internship') && !t.includes('Mentor') && !t.includes('Campaign')),
    }));
    
    setPrograms(mappedPrograms);
  }, []);

  // Hero animation
  useEffect(() => {
    if (!programs.length) return;
    
    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll('.prog-hero-in');
      if (elements.length) {
        gsap.from(elements, {
          opacity: 0, y: 24, duration: 0.65, stagger: 0.1, ease: 'power2.out',
        });
      }
      
      gsap.from('.program-card', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.programs-grid', start: 'top 85%' },
      });
    }, heroRef);
    return () => ctx.revert();
  }, [programs]);

  if (!programs.length) {
    return (
      <div style={{ paddingTop: 68, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', color: 'var(--text)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-3)', marginBottom: '1rem' }}>No programs available</div>
        </div>
      </div>
    );
  }

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
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.92) 50%, rgba(10,10,10,0.55) 100%)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)', zIndex: 2 }} />
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
            <div className="prog-hero-in programs-stat-row" style={{ display: 'flex', flexWrap: 'wrap' }}>
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

        {/* ── Programs Grid ── */}
        <div className="container" style={{ padding: '4rem 0' }}>
          <div className="programs-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
            gap: '1px',
            border: '1px solid var(--line)',
            background: 'var(--line)',
          }}>
            {programs.map((program, index) => {
              const Icon = getIcon(program.icon_name);
              return (
                <Link
                  key={program.slug}
                  to={`/courses/${program.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
                >
                  <div
                    className="program-card"
                    style={{
                      background: 'var(--bg-card)',
                      padding: '2.5rem',
                      height: '100%',
                      minHeight: 380,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.25rem',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
                      transition: 'background 0.2s, transform 0.25s, box-shadow 0.25s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--bg-elevated)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.04), 0 12px 30px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--bg-card)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.03)';
                    }}
                  >
                    {/* Header: Number + Icon */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--accent)', letterSpacing: '0.08em' }}>
                        {String(program.order).padStart(2, '0')}
                      </span>
                      <span style={{ width: 28, height: 28, color: 'var(--text-2)' }}>
                        <Icon size={28} strokeWidth={1.5} />
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(1rem, 1.8vw, 1.375rem)',
                        fontWeight: 700,
                        marginBottom: '0.5rem',
                        letterSpacing: '-0.02em',
                        color: 'var(--text)'
                      }}>
                        {program.title}
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.875rem',
                        lineHeight: 1.65,
                        color: 'var(--text-2)',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        {program.desc}
                      </p>
                    </div>

                    {/* Google Rating Section - Dynamic from Google */}
                    {!ratingLoading ? (
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem', 
                        flexWrap: 'wrap'
                      }}>
                        <GoogleStarRating rating={googleRating.ratingValue} />
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.5625rem',
                          color: 'var(--text-2)',
                          fontWeight: 600
                        }}>
                          {googleRating.ratingValue.toFixed(1)}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.5rem',
                          color: 'var(--text-3)'
                        }}>
                          ({googleRating.reviewCount.toLocaleString()} Google reviews)
                        </span>
                      </div>
                    ) : (
                      <div style={{ 
                        display: 'flex', 
                        gap: '0.5rem',
                        alignItems: 'center'
                      }}>
                        <div style={{ 
                          width: 80, 
                          height: 16, 
                          background: 'var(--bg-alt)', 
                          borderRadius: 4,
                          animation: 'pulse 1.5s ease-in-out infinite'
                        }} />
                      </div>
                    )}

                    {/* Tags */}
                    <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                      {program.tags.slice(0, 4).map((tag, j) => (
                        <span
                          key={j}
                          className="badge-raw"
                          style={tag === 'Internship' || tag === 'Certification' ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : {}}
                        >
                          {tag}
                        </span>
                      ))}
                      {program.tags.length > 4 && (
                        <span className="badge-raw" style={{ opacity: 0.6 }}>+{program.tags.length - 4}</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}