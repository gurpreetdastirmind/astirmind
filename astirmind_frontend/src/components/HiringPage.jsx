import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { Upload, RefreshCw, Send, User, Mail, Phone, MessageSquare, ShieldCheck } from 'lucide-react';
import { API_BASE as API, getCSRFToken } from '../config/api';
import { Helmet } from 'react-helmet';
import { OrganizationSchema, BreadcrumbSchema } from './Schema';

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

export default function HiringPage() {
  const pageRef = useRef(null);
  const location = useLocation();
  const [captcha, setCaptcha] = useState('');
  const [captchaId, setCaptchaId] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [fileName, setFileName] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hiring-header', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out', delay: 0.1 });
      gsap.from('.hiring-form-wrap', { opacity: 0, y: 40, clipPath: 'inset(0 0 6% 0)', duration: 0.75, ease: 'power3.out', delay: 0.3 });
    }, pageRef);
    return () => ctx.revert();
  }, []);

    useEffect(() => {
    document.title = 'Careers | Join AstirMind Team';
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = 'Join AstirMind\'s talented team of developers, designers, and innovators. Explore career opportunities in software development, AI, and digital solutions.';
    }
  }, [location.pathname]);


  const loadCaptcha = async () => {
    setCaptchaLoading(true);
    console.log('Loading captcha from:', `${API}/captcha/`);  // Debug log
    try {
      const res = await fetch(`${API}/captcha/`, { credentials: 'include', mode: 'cors', });
      console.log('Response status:', res.status);
      const data = await res.json();
      console.log('Captcha data:', data);
      setCaptcha(data.svg || '');
      setCaptchaId(data.challenge_id || '');
      setCaptchaInput('');
      setErrors(prev => ({ ...prev, captcha: null }));
    } catch {
      setCaptcha('');
      setCaptchaId('');
      setErrors(prev => ({ ...prev, captcha: 'Could not load verification challenge.' }));
    } finally {
      setCaptchaLoading(false);
    }
  };

  useEffect(() => {
    loadCaptcha();
  }, []);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();
    if (!['pdf', 'doc', 'docx'].includes(ext)) {
      setErrors(prev => ({ ...prev, resume: 'Invalid format. Upload .pdf, .doc, or .docx only.' }));
      setFileName('');
    } else {
      setErrors(prev => ({ ...prev, resume: null }));
      setFileName(file.name);
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    if (!fileName) newErrors.resume = 'Please attach your resume.';
    if (!captchaInput.trim()) newErrors.captcha = 'Please solve the captcha.';
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${API}/captcha/verify/`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
        },
        body: JSON.stringify({ challenge_id: captchaId, answer: captchaInput }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrors(prev => ({ ...prev, captcha: data.error || 'Verification failed.' }));
        await loadCaptcha();
        return;
      }
      // Captcha passed — submit application
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('email', form.email);
      fd.append('phone', form.phone);
      fd.append('message', form.message);
      if (resumeFile) fd.append('resume', resumeFile);
      const appRes = await fetch(`${API}/hiring/`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'X-CSRFToken': getCSRFToken() },
        body: fd,
      });
      if (!appRes.ok) {
        const appData = await appRes.json().catch(() => ({}));
        setErrors(prev => ({ ...prev, captcha: appData?.detail || 'Submission failed. Please try again.' }));
        return;
      }
      setSubmitted(true);
    } catch {
      setErrors(prev => ({ ...prev, captcha: 'Could not verify captcha. Please try again.' }));
      await loadCaptcha();
    } finally {
      setSubmitting(false);
    }
  };

  return (
        <>
      <Helmet key={`hiring-page-${location.key || location.pathname}`}>
        <title>Careers | Join AstirMind Team</title>
        <meta
          name="description"
          content="Join AstirMind's talented team of developers, designers, and innovators. Explore career opportunities in software development, AI, and digital solutions."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Careers | Join AstirMind Team" />
        <meta property="og:description" content="Join AstirMind's talented team of developers, designers, and innovators." />
        <meta property="og:type" content="website" />
      </Helmet>

         <OrganizationSchema />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Careers', url: '/hiring' }
      ]} />
      <div ref={pageRef} style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 68 }}>

        {/* ── Page Header ── */}
        <div className="hiring-header" style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--line)' }}>
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=70"
            alt=""
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%', filter: 'brightness(0.12) contrast(1.2)', pointerEvents: 'none' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,5,3,0.2) 0%, rgba(6,5,3,0.9) 100%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'var(--line)' }} />

          <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '4.5rem', paddingBottom: '3.5rem' }}>
            <span className="section-label" style={{ color: 'var(--accent)', borderColor: 'rgba(255,255,255,0.12)' }}>We're Hiring</span>
            <h1 style={{
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1,
              color: '#fff', marginTop: '0.75rem', maxWidth: 680,
            }}>
              Human resources isn't a thing we do.{' '}
              <span style={{ color: 'var(--accent)' }}>It's the thing that runs our business.</span>
            </h1>
            <p className="t-body" style={{ marginTop: '1rem', maxWidth: 520, color: 'rgba(255,255,255,0.5)' }}>
              We are always looking for engineers and designers who take their craft seriously. Share your resume and we will be in touch.
            </p>
          </div>
        </div>

        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '7rem' }}>
          <div className="page-split-form" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', alignItems: 'start' }}>

            {/* Side info */}
            <div className="hiring-form-wrap hide-mobile" style={{ position: 'sticky', top: '6rem' }}>
              <div style={{ border: '1px solid var(--line)', padding: '2rem', background: 'var(--bg-alt)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>What we look for</div>
                {[
                  ['Craft', 'You take quality personally. You notice when something is slightly off.'],
                  ['Curiosity', 'You read outside your stack and bring ideas from unexpected places.'],
                  ['Clarity', 'You communicate what you are doing without being asked.'],
                  ['Ownership', 'You see problems through to the end, not just to the pull request.'],
                ].map(([title, desc]) => (
                  <div key={title} style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--text)', marginBottom: 4 }}>{title}</div>
                    <div className="t-body" style={{ fontSize: '0.8125rem' }}>{desc}</div>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid var(--line)', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-3)', marginBottom: '0.75rem' }}>ACCEPTED FORMATS</div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['PDF', 'DOC', 'DOCX'].map(f => (
                      <span key={f} className="badge-raw" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="hiring-form-wrap">
              {submitted ? (
                <div style={{ border: '1px solid var(--line)', padding: '4rem', background: 'var(--bg-alt)', textAlign: 'center' }}>
                  <div style={{ width: 56, height: 56, border: '2px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <ShieldCheck size={26} color="var(--accent)" strokeWidth={1.5} />
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '0.75rem' }}>
                    Application Received
                  </h2>
                  <p className="t-body" style={{ maxWidth: 380, margin: '0 auto' }}>
                    Thank you — we review every submission and will reach out if there is a fit.
                  </p>
                </div>
              ) : (
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

                  <FormField label="Upload Resume" icon={Upload} required>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', border: `1px solid ${errors.resume ? 'var(--accent)' : 'var(--line)'}`, padding: '0.75rem 1rem', background: 'var(--bg-alt)', cursor: 'pointer', transition: 'border-color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--line-light)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = errors.resume ? 'var(--accent)' : 'var(--line)'}
                    >
                      <Upload size={16} color="var(--text-3)" strokeWidth={1.5} />
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: fileName ? 'var(--text)' : 'var(--text-3)' }}>
                        {fileName || 'Choose file — .pdf, .doc, .docx'}
                      </span>
                      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFile} style={{ display: 'none' }} />
                    </label>
                    {errors.resume && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--accent)' }}>{errors.resume}</span>}
                  </FormField>

                  <FormField label="Message" icon={MessageSquare}>
                    <textarea
                      rows={4} value={form.message} placeholder="Anything else you'd like us to know..."
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 110 }}
                      onFocus={e => e.target.style.borderColor = 'var(--line-light)'}
                      onBlur={e => e.target.style.borderColor = 'var(--line)'}
                    />
                  </FormField>

                  {/* Captcha */}
                  <FormField label="Verification" icon={ShieldCheck} required>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <div style={{
                        minWidth: 220,
                        minHeight: 72,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--line)',
                        padding: '0.2rem',
                      }}>
                        {captchaLoading ? (
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-3)' }}>Loading…</span>
                        ) : captcha ? (
                          <div dangerouslySetInnerHTML={{ __html: captcha }} />
                        ) : (
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--accent)' }}>Captcha unavailable</span>
                        )}
                      </div>
                      <button type="button" onClick={loadCaptcha}
                        style={{ background: 'transparent', border: '1px solid var(--line)', padding: '0.6rem 0.8rem', cursor: 'pointer', color: 'var(--text-3)', display: 'flex', alignItems: 'center', transition: 'border-color 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--line-light)'; e.currentTarget.style.color = 'var(--text)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--text-3)'; }}
                        disabled={captchaLoading}
                      >
                        <RefreshCw size={14} strokeWidth={1.5} />
                      </button>
                      <input
                        type="text" value={captchaInput} placeholder="Type the characters above"
                        onChange={e => setCaptchaInput(e.target.value)}
                        style={{ ...inputStyle, flex: 1, minWidth: 180, borderColor: errors.captcha ? 'var(--accent)' : 'var(--line)' }}
                        onFocus={e => e.target.style.borderColor = 'var(--line-light)'}
                        onBlur={e => e.target.style.borderColor = errors.captcha ? 'var(--accent)' : 'var(--line)'}
                      />
                    </div>
                    {errors.captcha && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--accent)' }}>{errors.captcha}</span>}
                  </FormField>

                  <div style={{ paddingTop: '0.5rem' }}>
                    <button type="submit" className="btn-solid" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 2rem', fontSize: '0.875rem', opacity: submitting ? 0.7 : 1 }} disabled={submitting || captchaLoading || !captchaId}>
                      <Send size={14} strokeWidth={2} /> {submitting ? 'Verifying…' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      </>
      );
}
