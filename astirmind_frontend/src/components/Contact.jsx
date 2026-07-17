import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { API_BASE, getCSRFToken } from '../config/api';

gsap.registerPlugin(ScrollTrigger);

export default function Contact({ isPage = false }) {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        opacity: 0, y: 30, duration: 0.65, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/messages/`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'X-CSRFToken': getCSRFToken() },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
        setForm({ name: '', email: '', message: '' });
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data?.detail || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" style={{ 
      padding: isPage ? '7rem 0' : '7rem 0', 
      borderBottom: '1px solid var(--line)', 
      background: 'var(--bg-alt)',
      minHeight: isPage ? '100vh' : 'auto'
    }}>
      <div className="container">
        <div className="grid-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '3rem', alignItems: 'start' }}>

          {/* Left */}
          <div className="contact-reveal" style={{ gridColumn: '1 / 5' }}>
            <span className="section-label">Get In Touch</span>
            <h2 className="t-h2" style={{ marginBottom: '1.5rem' }}>Let's build something solid.</h2>
            <p className="t-body" style={{ marginBottom: '2rem', maxWidth: 340 }}>
              Have a project in mind? Fill out the form and we'll get back to you within 4 hours during business hours.
            </p>

            {/* WhatsApp */}
            <a href="https://wa.me/919815674608" target="_blank" rel="noopener noreferrer" className="btn-solid" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', background: '#25D366', borderColor: '#25D366' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chat on WhatsApp
            </a>

            {/* Info */}
            <div style={{ borderTop: '1px solid var(--line)' }}>
              {[
                { l: 'Email', v: 'info@astirmind.com', href: 'mailto:info@astirmind.com' },
                { l: 'Phone', v: '+91 98156 74608', href: 'tel:+919815674608' },
                { l: 'Response', v: 'Within 4 hours' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.875rem 0', borderBottom: '1px solid var(--line)' }}>
                  <span className="t-mono" style={{ fontSize: '0.625rem' }}>{item.l}</span>
                  {item.href ? <a href={item.href} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text)', textDecoration: 'none' }}>{item.v}</a> : <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-2)' }}>{item.v}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-reveal" style={{ gridColumn: '6 / 13', borderLeft: '1px solid var(--line)', paddingLeft: '3rem' }}>
            {sent ? (
              <div>
                <div className="badge-raw" style={{ marginBottom: '1rem', background: 'var(--text)', color: 'var(--bg)' }}>Message Sent</div>
                <h3 className="t-h3" style={{ marginBottom: '0.75rem' }}>Thank you.</h3>
                <p className="t-body">We've received your message and will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label className="t-mono" style={{ display: 'block', marginBottom: '0.375rem', fontSize: '0.625rem' }}>Name</label>
                  <input className="input-raw" type="text" placeholder="Jane Doe" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="t-mono" style={{ display: 'block', marginBottom: '0.375rem', fontSize: '0.625rem' }}>Email</label>
                  <input className="input-raw" type="email" placeholder="jane@company.com" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="t-mono" style={{ display: 'block', marginBottom: '0.375rem', fontSize: '0.625rem' }}>Message</label>
                  <textarea className="input-raw" rows="5" placeholder="How can we help?" required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ resize: 'vertical' }} />
                </div>
                {error && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#D94F2C', margin: 0 }}>{error}</p>}
                <button type="submit" className="btn-solid" style={{ alignSelf: 'flex-start', opacity: loading ? 0.6 : 1 }} disabled={loading}>{loading ? 'Sending…' : 'Send Message'}</button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}