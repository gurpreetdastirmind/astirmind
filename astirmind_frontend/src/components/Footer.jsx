import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  const location = useLocation();
  const isInnerPage = ['/blog', '/courses', '/hiring', '/quote', '/verify'].some(p => location.pathname.startsWith(p));

  const cols = [
    {
      heading: 'Services',
      links: [
        { label: 'Web Development', href: '#services' },
        { label: 'Mobile Development', href: '#services' },
        { label: 'AI / Machine Learning', href: '#services' },
        { label: 'Cloud Consulting', href: '#services' },
        { label: 'Request a Quote', href: '/quote' },
      ],
    },
    {
      heading: 'Training',
      links: [
        { label: 'Programs', href: '/courses' },
        { label: 'Internships', href: '#services' },
        { label: 'Verify Certificate', href: '/verify' },
        { label: 'Blog', href: '/blog' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Our Work', href: '#work' },
        { label: 'Contact', href: '#contact' },
        { label: 'Hiring', href: '/hiring' },
      ],
    },
  ];

  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--line)' }}>
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>

        <div className="grid-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2.5rem', paddingBottom: '3rem', borderBottom: '1px solid var(--line)', marginBottom: '1.5rem' }}>

          {/* Brand */}
          <div style={{ gridColumn: '1 / 5' }}>
            <div style={{ marginBottom: '1rem' }}>
              <img src="/img/brand-logo-white.png" alt="AstirMind" style={{ height: 40, width: 'auto', objectFit: 'contain' }} />
            </div>
            <p className="t-body" style={{ fontSize: '0.875rem', maxWidth: 240, marginBottom: '1.5rem' }}>
              Intelligent software. Human-centric design. Training the next generation of engineers.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[{ l: 'Instagram', h: 'https://www.instagram.com/astirmind/' }, { l: 'Twitter', h: 'https://twitter.com/AstirMind' }, { l: 'Facebook', h: 'https://www.facebook.com/AstirMind-363890014173446' },{ l: 'YouTube', h: 'www.youtube.com/@astirmind7859' },].map((s, i) => (
                <a key={i} href={s.h} target="_blank" rel="noopener noreferrer"
                  className="t-mono" style={{ fontSize: '0.625rem', color: 'var(--text-3)', textDecoration: 'none', border: '1px solid var(--line)', padding: '8px 14px', minHeight: 36, display: 'inline-flex', alignItems: 'center', transition: 'color 0.15s, border-color 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--text)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-3)'; e.currentTarget.style.borderColor = 'var(--line)'; }}
                >{s.l}</a>
              ))}
            </div>
                     
          </div>

          {/* Nav cols */}
          {cols.map((col, i) => (
            <div key={i} style={{ gridColumn: `${5 + i * 3} / ${8 + i * 3}`, paddingLeft: '1.5rem', borderLeft: '1px solid var(--line)' }}>
              <div className="badge-raw" style={{ marginBottom: '1rem', display: 'inline-block' }}>{col.heading}</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {col.links.map((link, j) => (
                  <li key={j}>
                    {link.href.startsWith('/') ? (
                      <Link to={link.href} className="t-body" style={{ fontSize: '0.875rem', color: 'var(--text-2)', textDecoration: 'none', transition: 'color 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-2)'}
                      >{link.label}</Link>
                    ) : (
                      <a href={isInnerPage && link.href.startsWith('#') ? `/${link.href}` : link.href} className="t-body" style={{ fontSize: '0.875rem', color: 'var(--text-2)', textDecoration: 'none', transition: 'color 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-2)'}
                      >{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <span className="t-mono" style={{ fontSize: '0.5625rem', color: 'var(--text-3)' }}>&copy; {year} AstirMind. All rights reserved.</span>
          <a href="mailto:info@astirmind.com" className="t-mono" style={{ fontSize: '0.5625rem', color: 'var(--text-3)', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
          >info@astirmind.com</a>
        </div>
      </div>
    </footer>
  );
}
