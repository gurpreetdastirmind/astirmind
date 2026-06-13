import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Send, User, Mail, Phone, MessageSquare, Paperclip, DollarSign, CheckCircle, Clock, Code, BarChart3, Shield, Zap, Calendar, FileText, Sparkles, MapPin, ExternalLink } from 'lucide-react';
import { API_BASE as API, getCSRFToken } from '../config/api';

const BUDGETS = [
  'Less than $5k',
  '$5k – $9k',
  '$9k – $20k',
  '$20k – $50k',
  'More than $50k',
];

// Additional data for enhanced UI
const DELIVERABLES = [
  { icon: FileText, title: 'Detailed Scope', desc: 'Complete project breakdown & documentation' },
  { icon: Clock, title: 'Timeline Plan', desc: 'Milestone-based delivery schedule' },
  { icon: Code, title: 'Clean Code', desc: 'Well-documented, scalable solutions' },
  { icon: Shield, title: 'Quality Assurance', desc: 'Thorough testing & security audit' },
];

const TECH_STACK = [
  { name: 'React/Next.js', level: 'Expert' },
  { name: 'Node.js/Python', level: 'Expert' },
  { name: 'AWS/Cloud', level: 'Advanced' },
  { name: 'Tailwind/CSS', level: 'Expert' },
];

const PROJECT_STATS = [
  { value: '150+', label: 'Projects Completed', icon: CheckCircle },
  { value: '98%', label: 'Client Satisfaction', icon: BarChart3 },
  { value: '24h', label: 'Avg Response Time', icon: Zap },
  { value: '4.9', label: 'Client Rating', icon: Sparkles },
];

const inputStyle = {
  background: 'var(--bg-alt)',
  border: '1px solid var(--line)',
  color: 'var(--text)',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.9375rem',
  padding: '0.75rem 1rem',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s',
  borderRadius: 0,
};

function FormField({ label, icon: Icon, children, required }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 6 }}>
        {Icon && <Icon size={11} strokeWidth={1.5} />}
        {label}
        {required && <span style={{ color: 'var(--accent)' }}>*</span>}
      </label>
      {children}
    </div>
  );
}

// Google Maps Component - Enhanced version with better error handling
function GoogleMapLocation({ variant = 'sidebar' }) {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  // Office location coordinates (update these with your actual office coordinates)
  const officeLocation = {
    lat: 28.6139,
    lng: 77.2090,
    fullAddress: '123 Business Park, Sector 62, Noida, Uttar Pradesh - 201301'
  };

  useEffect(() => {
    // Check if Google Maps API is already loaded
    if (window.google && window.google.maps) {
      setMapLoaded(true);
      return;
    }

    // Load Google Maps script dynamically
    const scriptId = 'google-maps-script';
    if (!document.querySelector(`#${scriptId}`)) {
      const script = document.createElement('script');
      script.id = scriptId;
      // IMPORTANT: Replace 'YOUR_API_KEY_HERE' with your actual Google Maps API key
      // Get a key from: https://console.cloud.google.com/google/maps-apis
      const apiKey = 'YOUR_API_KEY_HERE'; // <-- REPLACE THIS WITH YOUR REAL API KEY
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initGoogleMap`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        console.error('Failed to load Google Maps');
        setMapError(true);
      };
      window.initGoogleMap = () => {
        setMapLoaded(true);
      };
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (mapLoaded && mapRef.current && window.google && !mapError) {
      try {
        const map = new window.google.maps.Map(mapRef.current, {
          center: officeLocation,
          zoom: variant === 'fullwidth' ? 14 : 15,
          styles: [
            {
              featureType: 'all',
              elementType: 'all',
              stylers: [{ saturation: -100 }, { lightness: 10 }]
            }
          ],
          disableDefaultUI: true,
          zoomControl: true,
          zoomControlOptions: {
            position: window.google.maps.ControlPosition.RIGHT_BOTTOM
          },
          mapTypeControl: variant === 'fullwidth',
          mapTypeControlOptions: {
            position: window.google.maps.ControlPosition.TOP_RIGHT,
            style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU
          }
        });

        const marker = new window.google.maps.Marker({
          position: officeLocation,
          map: map,
          title: 'Astir Mind Office',
          animation: window.google.maps.Animation.DROP,
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            scaledSize: new window.google.maps.Size(variant === 'fullwidth' ? 50 : 40, variant === 'fullwidth' ? 50 : 40)
          }
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="font-family: sans-serif; padding: 8px;">
              <strong style="color: #333; font-size: 14px;">Astir Mind</strong><br/>
              <span style="font-size: 12px; color: #666;">${officeLocation.fullAddress}</span>
              <br/>
              <a href="https://maps.google.com/?q=${officeLocation.lat},${officeLocation.lng}" 
                 target="_blank" 
                 style="font-size: 11px; color: #0066cc; text-decoration: none; display: inline-block; margin-top: 5px;">
                Get Directions →
              </a>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        if (variant === 'fullwidth') {
          setTimeout(() => {
            infoWindow.open(map, marker);
          }, 1000);
        }
      } catch (err) {
        console.error('Google Maps error:', err);
        setMapError(true);
      }
    }
  }, [mapLoaded, officeLocation, variant, mapError]);

  if (mapError) {
    return (
      <div style={{ 
        width: '100%', 
        height: variant === 'fullwidth' ? '350px' : '200px', 
        border: '1px solid var(--line)',
        background: 'var(--bg-alt)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <MapPin size={32} color="var(--accent)" strokeWidth={1.5} />
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-3)', textAlign: 'center', maxWidth: '80%' }}>
          Unable to load map. Please check your Google Maps API key.
        </p>
        <a 
          href={`https://maps.google.com/?q=${officeLocation.lat},${officeLocation.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)' }}
        >
          Open in Google Maps →
        </a>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <div 
        ref={mapRef} 
        style={{ 
          width: '100%', 
          height: variant === 'fullwidth' ? '350px' : '200px', 
          border: '1px solid var(--line)',
          background: 'var(--bg-alt)'
        }}
      >
        {!mapLoaded && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            background: 'var(--bg-alt)',
            color: 'var(--text-3)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            gap: '0.5rem'
          }}>
            <div style={{ width: 16, height: 16, border: '2px solid var(--accent)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            Loading map...
          </div>
        )}
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function QuotePage() {
  const pageRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', budget: '', message: '' });
  const [fileName, setFileName] = useState('');
  const [attachmentFile, setAttachmentFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.quote-header', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out', delay: 0.1 });
      gsap.from('.quote-form', { opacity: 0, y: 40, clipPath: 'inset(0 0 6% 0)', duration: 0.75, ease: 'power3.out', delay: 0.3 });
      gsap.from('.data-section', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out', delay: 0.5, stagger: 0.2 });
      gsap.from('.bottom-map', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out', delay: 0.6 });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    if (!form.budget) newErrors.budget = 'Please select a budget range.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError('');
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('email', form.email);
      fd.append('phone', form.phone);
      fd.append('budget', form.budget);
      fd.append('message', form.message);
      if (attachmentFile) fd.append('attachment', attachmentFile);
      const res = await fetch(`${API}/quotes/`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'X-CSRFToken': getCSRFToken() },
        body: fd,
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setSubmitError(data?.detail || 'Submission failed. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div ref={pageRef} style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 68 }}>

      {/* ── Page Header ── */}
      <div className="quote-header" style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--line)' }}>
        <img
          src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=2000&q=70"
          alt=""
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', filter: 'brightness(0.12) contrast(1.15)', pointerEvents: 'none' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,5,3,0.3) 0%, rgba(6,5,3,0.9) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '4.5rem', paddingBottom: '3.5rem' }}>
          <span className="section-label" style={{ color: 'var(--accent)', borderColor: 'rgba(255,255,255,0.12)' }}>Get Started</span>
          <h1 style={{
            fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1,
            color: '#fff', marginTop: '0.75rem', maxWidth: 660,
          }}>
            Request a Quote
          </h1>
          <p className="t-body" style={{ marginTop: '1rem', maxWidth: 520, color: 'rgba(255,255,255,0.5)' }}>
            Let's talk about everything and work together. Fill out the form and we will be in touch within 24 hours.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '5rem', paddingBottom: '7rem' }}>
        {/* Two Column Layout */}
        <div className="page-split-form" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', alignItems: 'start', marginBottom: '4rem' }}>

          {/* Side info */}
          <div className="hide-mobile" style={{ position: 'sticky', top: '6rem' }}>
            {/* Project Stats */}
            <div className="data-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {PROJECT_STATS.map((stat, idx) => (
                <div key={idx} style={{ border: '1px solid var(--line)', padding: '1rem', background: 'var(--bg-alt)', textAlign: 'center' }}>
                  <stat.icon size={20} color="var(--accent)" strokeWidth={1.5} style={{ marginBottom: '0.5rem' }} />
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.25rem' }}>{stat.value}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-3)', textTransform: 'uppercase' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="data-section" style={{ border: '1px solid var(--line)', padding: '2rem', background: 'var(--bg-alt)', marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>Contact Info</div>
              
              {[
                { label: 'Call us', value: '+91-9815674608', sub: '24 hrs available', link: 'tel:+919815674608' },
                { label: 'Email', value: 'astirmind@gmail.com', sub: 'Send business requirements', link: 'mailto:astirmind@gmail.com' },
              ].map(({ label, value, sub, link }) => (
                <div key={label} style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label}</div>
                  <a href={link} style={{ textDecoration: 'none' }}>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)', marginBottom: 2, transition: 'color 0.2s' }}>{value}</div>
                  </a>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-3)' }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* What We Deliver */}
            <div className="data-section" style={{ border: '1px solid var(--line)', padding: '2rem', background: 'var(--bg-alt)', marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>What We Deliver</div>
              {DELIVERABLES.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: '1rem' }}>
                  <item.icon size={16} color="var(--accent)" strokeWidth={1.5} style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-3)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="data-section" style={{ border: '1px solid var(--line)', padding: '2rem', background: 'var(--bg-alt)', marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Technology Stack</div>
              {TECH_STACK.map((tech, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--text)' }}>{tech.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--accent)' }}>{tech.level}</span>
                </div>
              ))}
            </div>

            {/* We Build For */}
            <div className="data-section" style={{ border: '1px solid var(--line)', padding: '2rem', background: 'var(--bg-alt)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>We build for</div>
              {['Startups', 'Growing businesses', 'Enterprise teams', 'Individual founders'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.6rem' }}>
                  <div style={{ width: 4, height: 4, background: 'var(--accent)', flexShrink: 0 }} />
                  <span className="t-body" style={{ fontSize: '0.875rem' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Column */}
          <div>
            <div className="quote-form">
              {submitted ? (
                <div style={{ border: '1px solid var(--line)', padding: '4rem', background: 'var(--bg-alt)', textAlign: 'center' }}>
                  <div style={{ width: 56, height: 56, border: '2px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <CheckCircle size={26} color="var(--accent)" strokeWidth={1.5} />
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '0.75rem' }}>
                    Quote Request Sent
                  </h2>
                  <p className="t-body" style={{ maxWidth: 380, margin: '0 auto' }}>
                    We will review your project and get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="form-row-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                      <FormField label="Full Name" icon={User} required>
                        <input
                          type="text" value={form.name} placeholder="Your full name"
                          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                          style={{ ...inputStyle, borderColor: errors.name ? 'var(--accent)' : 'var(--line)' }}
                          onFocus={e => e.target.style.borderColor = 'var(--line-light)'}
                          onBlur={e => e.target.style.borderColor = errors.name ? 'var(--accent)' : 'var(--line)'}
                        />
                        {errors.name && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--accent)' }}>{errors.name}</span>}
                      </FormField>
                      <FormField label="Email" icon={Mail} required>
                        <input
                          type="email" value={form.email} placeholder="you@example.com"
                          onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                          style={{ ...inputStyle, borderColor: errors.email ? 'var(--accent)' : 'var(--line)' }}
                          onFocus={e => e.target.style.borderColor = 'var(--line-light)'}
                          onBlur={e => e.target.style.borderColor = errors.email ? 'var(--accent)' : 'var(--line)'}
                        />
                        {errors.email && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--accent)' }}>{errors.email}</span>}
                      </FormField>
                    </div>

                    <FormField label="Contact Number" icon={Phone}>
                      <input
                        type="tel" value={form.phone} placeholder="+91 98156 74608"
                        onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = 'var(--line-light)'}
                        onBlur={e => e.target.style.borderColor = 'var(--line)'}
                      />
                    </FormField>

                    <FormField label="Budget Range" icon={DollarSign} required>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {BUDGETS.map(b => (
                          <button
                            key={b} type="button"
                            onClick={() => setForm(p => ({ ...p, budget: b }))}
                            style={{
                              padding: '0.5rem 1rem',
                              border: `1px solid ${form.budget === b ? 'var(--accent)' : 'var(--line)'}`,
                              background: form.budget === b ? 'var(--accent-dim)' : 'var(--bg-alt)',
                              color: form.budget === b ? 'var(--accent)' : 'var(--text-3)',
                              fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                              cursor: 'pointer', transition: 'all 0.15s',
                            }}
                            onMouseEnter={e => { if (form.budget !== b) { e.currentTarget.style.borderColor = 'var(--line-light)'; e.currentTarget.style.color = 'var(--text)'; } }}
                            onMouseLeave={e => { if (form.budget !== b) { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--text-3)'; } }}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                      {errors.budget && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--accent)' }}>{errors.budget}</span>}
                    </FormField>

                    <FormField label="Message" icon={MessageSquare} required>
                      <textarea
                        rows={5} value={form.message} placeholder="Describe your project, timeline, and goals..."
                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                        style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                        onFocus={e => e.target.style.borderColor = 'var(--line-light)'}
                        onBlur={e => e.target.style.borderColor = 'var(--line)'}
                      />
                    </FormField>

                    <FormField label="Attachment (optional)" icon={Paperclip}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid var(--line)', padding: '0.75rem 1rem', background: 'var(--bg-alt)', cursor: 'pointer', transition: 'border-color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--line-light)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}
                      >
                        <Paperclip size={14} color="var(--text-3)" strokeWidth={1.5} />
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: fileName ? 'var(--text)' : 'var(--text-3)' }}>
                          {fileName || 'Attach project brief or spec document'}
                        </span>
                        <input type="file" onChange={e => { const f = e.target.files[0]; setFileName(f?.name || ''); setAttachmentFile(f || null); }} style={{ display: 'none' }} />
                      </label>
                    </FormField>

                    <div style={{ paddingTop: '0.5rem' }}>
                      {submitError && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', marginBottom: '0.75rem' }}>{submitError}</p>}
                      <button type="submit" className="btn-solid" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 2rem', fontSize: '0.875rem', opacity: submitting ? 0.6 : 1 }} disabled={submitting}>
                        <Send size={14} strokeWidth={2} /> {submitting ? 'Sending…' : 'Send Quote Request'}
                      </button>
                    </div>
                  </form>

                  {/* Google Map Section - Below the Send Quote Request button */}
                  <div className="bottom-map" style={{ marginTop: '3rem', borderTop: '1px solid var(--line)', paddingTop: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div>
                        <span className="section-label" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>📍 Visit Us</span>
                        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text)', marginTop: '0.25rem', marginBottom: '0.25rem' }}>
                          Our Office Location
                        </h3>
                        <p style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                          123 Business Park, Sector 62, Noida, Uttar Pradesh - 201301
                        </p>
                      </div>
                      <a 
                        href="https://maps.google.com/?q=28.6139,77.2090" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textDecoration: 'none', borderBottom: '1px solid var(--accent-dim)', paddingBottom: '0.25rem' }}
                      >
                        <ExternalLink size={12} /> Get Directions
                      </a>
                    </div>
                    <GoogleMapLocation variant="fullwidth" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}