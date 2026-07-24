// src/components/ChoosePath.jsx
import { Link } from 'react-router-dom';
import { useMode } from '../context/ModeContext';

export default function ChoosePath() {
  const { mode } = useMode();
  
  return (
    <section style={{ padding: '4rem 0', borderBottom: '1px solid var(--line)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <span className="section-label">Choose Your Path</span>
        <h2 style={{ 
          fontFamily: 'var(--font-sans)', 
          fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', 
          fontWeight: 700, 
          marginTop: '0.75rem',
          letterSpacing: '-0.04em',
          color: 'var(--text)'
        }}>
          {mode === 'Xperience' ? 'Build Your Business' : 'Build Your Career'}
        </h2>
        <p style={{ 
          fontFamily: 'var(--font-sans)',
          color: 'var(--text-3)', 
          maxWidth: 500, 
          margin: '0.5rem auto 2rem',
          fontSize: '1rem',
          lineHeight: 1.7
        }}>
          {mode === 'Xperience' 
            ? 'Get custom software, AI, and automation solutions for your business.'
            : 'Get hands-on training with 1-on-1 mentoring and live projects.'}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link 
            to={mode === 'Xperience' ? '/services' : '/courses'} 
            className="btn-solid"
            style={{ textDecoration: 'none' }}
          >
            {mode === 'Xperience' ? 'Explore Services' : 'Explore Programs'}
          </Link>
          <Link 
            to={mode === 'Xperience' ? '/quote' : '/contact'} 
            className="btn-outline"
            style={{ textDecoration: 'none' }}
          >
            {mode === 'Xperience' ? 'Start a Project' : 'Book Free Demo'}
          </Link>
        </div>
      </div>
    </section>
  );
}