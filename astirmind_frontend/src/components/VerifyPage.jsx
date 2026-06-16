import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Search, ShieldCheck, Download, AlertCircle } from 'lucide-react';
import { API_BASE as API, MEDIA_BASE } from '../config/api';
import { Helmet } from 'react-helmet';

export default function VerifyPage() {
  const pageRef = useRef(null);
  const [certNum, setCertNum] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | found | not_found | error
  const [record, setRecord] = useState(null);

  const getFileExt = (url = '') => {
    const clean = url.split('?')[0];
    return clean.split('.').pop()?.toLowerCase() || '';
  };
  const isImageExt = (ext) => ['jpg', 'jpeg', 'png'].includes(ext);
  const isPdfExt = (ext) => ext === 'pdf';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.verify-header', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out', delay: 0.1 });
      gsap.from('.verify-form', { opacity: 0, y: 40, duration: 0.7, ease: 'power3.out', delay: 0.3 });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (status === 'found') {
      gsap.from('.verify-result', {
        opacity: 0, y: 24, clipPath: 'inset(0 0 8% 0)',
        duration: 0.6, ease: 'power3.out',
      });
    }
  }, [status]);

  const handleVerify = async (e) => {
    e.preventDefault();
    const key = certNum.trim().toUpperCase();
    setStatus('loading');
    try {
      const res = await fetch(`${API}/verify/?cert=${encodeURIComponent(key)}`);
      if (res.ok) {
        const data = await res.json();
        setRecord({
          cert_number: data.cert_number,
          name: data.candidate_name,
          training: data.training_name || '—',
          program: data.program,
          duration: data.duration || '—',
          date: data.issue_date,
          projects: data.projects || null,
          certificate_file: data.certificate_file ? `${MEDIA_BASE}${data.certificate_file}` : '',
        });
        setStatus('found');
      } else {
        setRecord(null);
        setStatus('not_found');
      }
    } catch {
      setRecord(null);
      setStatus('error');
    }
  };

  return (
      <>
      <Helmet>
        <title>Verify Certificate | AstirMind Software Solutions</title>
        <meta
          name="description"
          content="Verify your AstirMind certificate and internship credentials. Authenticate your achievements and training certifications."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Verify Certificate | AstirMind Software Solutions" />
        <meta property="og:description" content="Verify your AstirMind certificate and internship credentials." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div ref={pageRef} style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 68 }}>

        {/* ── Page Header ── */}
        <div className="verify-header" style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--line)' }}>
          <img
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000&q=70"
            alt=""
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 50%', filter: 'brightness(0.1) contrast(1.2)', pointerEvents: 'none' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,5,3,0.2) 0%, rgba(6,5,3,0.92) 100%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)' }} />

          <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '4.5rem', paddingBottom: '3.5rem' }}>
            <span className="section-label" style={{ color: 'var(--accent)', borderColor: 'rgba(255,255,255,0.12)' }}>Credentials</span>
            <h1 style={{
              fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1,
              color: '#fff', marginTop: '0.75rem',
            }}>
              Verify Certificate
            </h1>
            <p className="t-body" style={{ marginTop: '1rem', maxWidth: 480, color: 'rgba(255,255,255,0.5)' }}>
              Enter the certificate number printed on the credential to confirm its authenticity.
            </p>
          </div>
        </div>

        <div className="container" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>

            {/* ── Search Form ── */}
            <div className="verify-form vf-box" style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
                <ShieldCheck size={18} color="var(--accent)" strokeWidth={1.5} />
                <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '1rem', color: 'var(--text)' }}>Certificate Verification</span>
              </div>
              <p className="t-body" style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                Try demo numbers:{' '}
                <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', background: 'var(--bg-elevated)', padding: '2px 6px' }}>AM-2024-001</code>,{' '}
                <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', background: 'var(--bg-elevated)', padding: '2px 6px' }}>AM-2024-042</code>
              </p>

              <form onSubmit={handleVerify} className="vf-search-row">
                <input
                  type="text"
                  value={certNum}
                  onChange={e => { setCertNum(e.target.value); setStatus('idle'); }}
                  placeholder="e.g. AM-2024-001"
                  className="vf-input"
                  onFocus={e => e.target.style.borderColor = 'var(--line-light)'}
                  onBlur={e => e.target.style.borderColor = 'var(--line)'}
                />
                <button
                  type="submit"
                  className="btn-solid vf-submit-btn"
                  style={{ opacity: status === 'loading' ? 0.6 : 1 }}
                  disabled={status === 'loading'}
                >
                  <Search size={14} strokeWidth={2} />
                  {status === 'loading' ? 'Checking…' : 'Verify'}
                </button>
              </form>
            </div>

            {/* ── Loading ── */}
            {status === 'loading' && (
              <div style={{ border: '1px solid var(--line)', padding: '2.5rem', background: 'var(--bg-alt)', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-3)' }}>
                Checking records…
              </div>
            )}

            {/* ── Error ── */}
            {status === 'error' && (
              <div style={{ border: '1px solid var(--line)', padding: '1.75rem', background: 'var(--bg-alt)', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <AlertCircle size={20} color="var(--accent)" strokeWidth={1.5} style={{ flexShrink: 0, marginTop: 2 }} />
                <div className="t-body" style={{ fontSize: '0.875rem' }}>Could not connect to the verification server. Please ensure the backend is running and try again.</div>
              </div>
            )}

            {/* ── Not Found ── */}
            {status === 'not_found' && (
              <div style={{ border: '1px solid var(--line)', padding: '1.75rem', background: 'var(--bg-alt)', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: 40, height: 40, border: '1px solid var(--line-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <AlertCircle size={18} color="var(--text-3)" strokeWidth={1.5} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text)', marginBottom: 4 }}>Candidate Records Not Found</div>
                  <div className="t-body" style={{ fontSize: '0.875rem' }}>The certificate number you entered does not match any record. Please double-check the number and try again.</div>
                </div>
              </div>
            )}

            {/* ── Found ── */}
            {status === 'found' && record && (
              <div className="verify-result" style={{ border: '1px solid var(--line)', background: 'var(--bg-alt)', overflow: 'hidden' }}>

                {/* Result Header */}
                <div className="vr-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 32, height: 32, border: '1px solid var(--line-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ShieldCheck size={16} color="var(--accent)" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Verified</div>
                      <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--text)' }}>Candidate Record</div>
                    </div>
                  </div>

                  {record.certificate_file && (
                    <div className="vr-actions">
                      <a
                        href={record.certificate_file}
                        target="_blank"
                        rel="noreferrer"
                        className="vr-action-btn"
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--line-light)'; e.currentTarget.style.color = 'var(--text)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--text-3)'; }}
                      >
                        View Certificate
                      </a>
                      <a
                        href={record.certificate_file}
                        download
                        className="vr-action-btn"
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--line-light)'; e.currentTarget.style.color = 'var(--text)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--text-3)'; }}
                      >
                        <Download size={12} strokeWidth={1.5} /> Download
                      </a>
                    </div>
                  )}
                </div>

                {/* Record rows */}
                <div className="vr-body">
                  {[
                    ['Verification ID', record.cert_number || certNum.trim().toUpperCase(), true],
                    ['Name', record.name, false],
                    ['Course', record.training, false],
                    ['Programme', record.program, false],
                    ['Duration', record.duration, false],
                    ['Issue Date', record.date, false],
                  ].map(([key, val, isId]) => (
                    <div key={key} className="vr-row">
                      <span className="vr-label">{key}</span>
                      <span className="vr-value" style={{
                        fontFamily: isId ? 'var(--font-mono)' : 'var(--font-sans)',
                        color: isId ? 'var(--accent)' : 'var(--text)',
                        letterSpacing: isId ? '0.06em' : 'normal',
                      }}>
                        {val}
                      </span>
                    </div>
                  ))}

                  {/* Projects */}
                  {record.projects && Array.isArray(record.projects) && record.projects.length > 0 && (
                    <div style={{ marginTop: '1.5rem' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
                        Projects
                      </div>
                      {record.projects.map((proj, idx) => (
                        <div key={idx} style={{ border: '1px solid var(--line)', padding: '1rem 1.25rem', marginBottom: '0.75rem', background: 'var(--bg)' }}>
                          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text)', marginBottom: proj.description ? '0.4rem' : 0 }}>
                            {proj.title || proj}
                          </div>
                          {proj.description && (
                            <div className="t-body" style={{ fontSize: '0.875rem' }}>{proj.description}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Certificate Preview */}
                  {record.certificate_file && (
                    <div style={{ marginTop: '1.25rem', border: '1px solid var(--line)', background: 'var(--bg)', overflow: 'hidden' }}>
                      <div style={{ padding: '0.7rem 1rem', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: '0.56rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Certificate Preview
                      </div>
                      {isImageExt(getFileExt(record.certificate_file)) && (
                        <img
                          src={record.certificate_file}
                          alt="certificate preview"
                          style={{ width: '100%', maxHeight: 480, objectFit: 'contain', display: 'block', background: '#0a0908' }}
                        />
                      )}
                      {isPdfExt(getFileExt(record.certificate_file)) && (
                        <iframe
                          src={record.certificate_file}
                          title="certificate preview pdf"
                          style={{ width: '100%', height: 480, border: 'none', background: '#fff' }}
                        />
                      )}
                    </div>
                  )}
                </div>

                <div style={{ padding: '1rem 1.5rem 1.25rem', borderTop: '1px solid var(--line)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-3)', letterSpacing: '0.05em' }}>
                    This record has been verified from AstirMind's official database. For any discrepancies, contact info@astirmind.com.
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
      </>
      );
}
