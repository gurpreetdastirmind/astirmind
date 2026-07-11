import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMode } from '../context/ModeContext';

export default function Navbar() {
  const { mode, startModeTransition } = useMode();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinkRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isInnerPage = [
    '/blog',
    '/courses',
    '/hiring',
    '/quote',
    '/verify',
    '/about',
    '/services',
  ].some(p => location.pathname.startsWith(p));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      navLinkRefs.current.forEach((link) => {
        if (!link) return;

        link.addEventListener('mousemove', (e) => {
          const rect = link.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          gsap.to(link, {
            x: dx * 0.3,
            y: dy * 0.15,
            duration: 0.4,
            ease: 'power2.out',
          });
        });

        link.addEventListener('mouseleave', () => {
          gsap.to(link, {
            x: 0, y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.4)',
          });
        });
      });
    });
    return () => ctx.revert();
  }, [mode]);

  // Navigation links - Services now uses /services route
  const links = mode === 'Xperience'
    ? [ 
        { label: 'Services', href: '/services' },
        { label: 'About', href: '/about' }, 
        { label: 'Blog', href: '/blog' }, 
        { label: 'Hiring', href: '/hiring' }
      ]
    : [
        { label: 'Courses', href: '/courses' }, 
        { label: 'About', href: '/about' }, 
        { label: 'Blog', href: '/blog' }, 
        { label: 'Verify', href: '/verify' }
      ];

  const isActive = (href) => {
    if (href.startsWith('#')) return false;
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const handleNav = () => setMenuOpen(false);

  const handleModeToggle = (m) => {
    if (isInnerPage) {
      navigate('/');
    }
    startModeTransition(m);
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 68, zIndex: 1000,
        background: scrolled ? 'rgba(6,5,3,0.94)' : 'rgba(6,5,3,0.6)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: '1px solid var(--line)',
        transition: 'background 0.25s, backdrop-filter 0.25s',
      }}>
        <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Brand */}
          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            <img
              src="/img/brand-logo-white.png"
              alt="AstirMind"
              style={{ height: 36, width: 'auto', display: 'block', objectFit: 'contain' }}
            />
          </Link>

          {/* Nav Links + Toggle */}
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {links.map((link, i) => {
              const active = isActive(link.href);
              const commonProps = {
                ref: (el) => (navLinkRefs.current[i] = el),
                className: 't-mono',
                style: {
                  textDecoration: 'none',
                  color: active ? 'var(--text)' : 'var(--text-2)',
                  transition: 'color 0.15s',
                  display: 'inline-block',
                  willChange: 'transform',
                  borderBottom: active ? '1px solid var(--text)' : '1px solid transparent',
                  paddingBottom: '2px',
                },
                onMouseEnter: (e) => { e.currentTarget.style.color = 'var(--text)'; },
                onMouseLeave: (e) => { e.currentTarget.style.color = active ? 'var(--text)' : 'var(--text-2)'; },
              };
              
              return link.href.startsWith('/') ? (
                <Link key={i} {...commonProps} to={link.href}>
                  {link.label}
                </Link>
              ) : (
                <a key={i} {...commonProps} href={link.href}>
                  {link.label}
                </a>
              );
            })}

            {/* Toggle */}
            <div style={{ display: 'flex', border: '1px solid var(--line)', background: 'var(--bg-alt)' }}>
              {['Xperience', 'Training'].map((m) => (
                <button key={m} onClick={() => handleModeToggle(m)}
                  style={{
                    padding: '5px 16px', background: mode === m ? 'var(--text)' : 'transparent',
                    color: mode === m ? 'var(--text-inv)' : 'var(--text-3)',
                    border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-mono)', fontSize: '0.6875rem',
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                    transition: 'all 0.18s',
                  }}
                  onMouseEnter={e => { if (mode !== m) e.currentTarget.style.color = 'var(--text)'; }}
                  onMouseLeave={e => { if (mode !== m) e.currentTarget.style.color = 'var(--text-3)'; }}
                >{m}</button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link to="/quote" className="btn-solid hide-mobile" style={{ padding: '0.5rem 1.25rem', fontSize: '0.8125rem', flexShrink: 0, textDecoration: 'none' }}>
            Get a Quote
          </Link>

          {/* Mobile Hamburger */}
          <button className="hide-desktop" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'transparent', border: '1px solid var(--line)', width: 40, height: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, cursor: 'pointer' }}>
            <div style={{ width: 18, height: 1.5, background: 'var(--text)', transition: '0.25s', transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none' }} />
            <div style={{ width: 18, height: 1.5, background: 'var(--text)', transition: '0.2s', opacity: menuOpen ? 0 : 1 }} />
            <div style={{ width: 18, height: 1.5, background: 'var(--text)', transition: '0.25s', transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div style={{
        position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 999,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem 5vw',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.77, 0, 0.175, 1)',
        borderLeft: '1px solid var(--line)',
      }}>
        <div style={{ display: 'flex', border: '1px solid var(--line)', background: 'var(--bg-alt)', marginBottom: '2.5rem' }}>
          {['Xperience', 'Training'].map((m) => (
            <button key={m} onClick={() => { handleModeToggle(m); handleNav(); }}
              style={{ flex: 1, padding: '10px', background: mode === m ? 'var(--text)' : 'transparent',
                color: mode === m ? 'var(--text-inv)' : 'var(--text-3)', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', textTransform: 'uppercase',
                letterSpacing: '0.06em', transition: 'all 0.18s' }}>{m}</button>
          ))}
        </div>
        {links.map((link, i) => (
          link.href.startsWith('/') ? (
            <Link key={i} to={link.href} onClick={handleNav} style={{ textDecoration: 'none',
              color: isActive(link.href) ? 'var(--accent)' : 'var(--text)',
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 600, letterSpacing: '-0.025em',
              padding: '1rem 0', borderBottom: '1px solid var(--line)', display: 'block' }}>{link.label}</Link>
          ) : (
            <a key={i} href={link.href} onClick={handleNav} style={{ textDecoration: 'none', color: 'var(--text)',
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 600, letterSpacing: '-0.025em',
              padding: '1rem 0', borderBottom: '1px solid var(--line)', display: 'block' }}>{link.label}</a>
          )
        ))}
        <Link to="/quote" onClick={handleNav} className="btn-solid" style={{ marginTop: '2rem', alignSelf: 'flex-start', textDecoration: 'none' }}>Get a Quote</Link>
        <Link to="/quote" onClick={handleNav} style={{ textDecoration: 'none', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', marginTop: '1rem' }}>Request a Quote →</Link>
      </div>
    </>
  );
}