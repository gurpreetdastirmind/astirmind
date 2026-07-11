import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileText, MessageSquare, BookOpen,
  LogOut, Plus, Trash2, Edit2, Search, Check, X, Eye,
  ChevronRight, AlertCircle, Save, RefreshCw, Briefcase,
} from 'lucide-react';
import { API_BASE as API, MEDIA_BASE, getCSRFToken } from '../config/api';

/* ─── Fetch helper with CSRF + credentials ─── */
async function apiFetch(path, opts = {}) {
  const isFormData = opts.body instanceof FormData;
  
  const res = await fetch(`${API}${path}`, {
    credentials: 'include',
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      'X-CSRFToken': getCSRFToken(),
      ...opts.headers,
    },
    ...opts,
  });
  if (res.status === 204) return null;
  return res.json();
}

/* ─── Shared styles — warmer palette for better readability ─── */
const S = {
  // Editorial-noir dashboard palette
  page: {
    background: 'radial-gradient(circle at 8% -12%, rgba(217,79,44,0.2) 0%, rgba(12,11,9,0) 36%), #0A0907',
    minHeight: '100vh',
    color: '#C5BFB0',
    fontFamily: "'IBM Plex Mono', monospace",
  },
  sidebar: {
    width: 246,
    background: 'linear-gradient(180deg, #090805 0%, #060504 100%)',
    borderRight: '1px solid #1f1b15',
    display: 'flex', flexDirection: 'column', padding: '1.5rem 0', flexShrink: 0,
  },
  main: { flex: 1, overflow: 'auto', padding: '2rem clamp(1.25rem, 2vw, 2.5rem)' },
  card: {
    background: 'linear-gradient(180deg, rgba(20,18,14,0.96) 0%, rgba(14,12,9,0.96) 100%)',
    border: '1px solid #201c15',
    padding: '1.5rem',
    borderRadius: 10,
    boxShadow: '0 18px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.02)',
  },
  
  // Softer input colors
  input: {
    background: '#0E0C09', border: '1px solid #2d291f', padding: '10px 14px',
    color: '#C5BFB0', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem',
    outline: 'none', width: '100%', boxSizing: 'border-box', borderRadius: 6,
  },
  textarea: {
    background: '#0E0C09', border: '1px solid #2d291f', padding: '12px 14px',
    color: '#C5BFB0', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem',
    outline: 'none', width: '100%', resize: 'vertical', boxSizing: 'border-box', borderRadius: 6,
  },
  
  // Warmer button colors
  btnPrimary: {
    background: 'linear-gradient(135deg, #E15C35 0%, #C94724 100%)', color: '#F5F0E8', border: 'none', padding: '10px 20px',
    fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.625rem', textTransform: 'uppercase',
    letterSpacing: '0.06em', cursor: 'pointer', borderRadius: 6,
  },
  btnDanger: {
    background: 'transparent', color: '#D94F2C', border: '1px solid #3d2a24',
    padding: '5px 10px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5625rem',
    cursor: 'pointer', borderRadius: 6,
  },
  btnGhost: {
    background: 'rgba(14,12,9,0.8)', color: '#9A9080', border: '1px solid #2b271e',
    padding: '6px 12px', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5625rem',
    cursor: 'pointer', borderRadius: 6,
  },
  label: { fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5625rem', color: '#9A9080', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, display: 'block' },
  table: { width: '100%', borderCollapse: 'collapse', borderRadius: 8, overflow: 'hidden' },
  th: { fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', color: '#9A9080', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '12px 14px', borderBottom: '1px solid #252118', textAlign: 'left', background: '#0d0b08' },
  td: { fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', color: '#C5BFB0', padding: '12px 14px', borderBottom: '1px solid #181510' },
};


/* ─── Login Screen ─── */
function LoginScreen({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // First get CSRF token
      await fetch(`${API}/auth/status/`, { credentials: 'include' });
      const data = await apiFetch('/auth/login/', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      if (data?.ok) {
        onLogin(data.username);
      } else {
        setError(data?.error ?? 'Login failed.');
      }
    } catch {
      setError('Could not connect to server.');
    }
    setLoading(false);
  }

  return (
    <div style={{ ...S.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 380 }}>
        {/* Logo */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div style={{ marginBottom: '0.75rem' }}>
            <img src="/img/brand-logo-white.png" alt="AstirMind" style={{ height: 44, width: 'auto', objectFit: 'contain' }} />
          </div>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5625rem', color: '#9A9080', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} style={{ ...S.card }}>
          <div style={{ height: 3, background: '#D94F2C', margin: '-1.5rem -1.5rem 1.5rem' }} />

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={S.label}>Username</label>
            <input style={S.input} type="text" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} required autoFocus placeholder="admin" />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={S.label}>Password</label>
            <input style={S.input} type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required placeholder="••••••••" />
          </div>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'rgba(217,79,44,0.08)', border: '1px solid rgba(217,79,44,0.25)', marginBottom: '1.25rem', borderRadius: 2 }}>
              <AlertCircle size={14} color="#D94F2C" />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.625rem', color: '#D94F2C' }}>{error}</span>
            </div>
          )}

          <button type="submit" style={{ ...S.btnPrimary, width: '100%', opacity: loading ? 0.6 : 1, padding: '12px 18px' }} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', color: '#5a554a', marginTop: '2rem' }}>
          Staff credentials required
        </p>
      </div>
    </div>
  );
}

/* ─── Nav Item ─── */
function NavItem({ icon: Icon, label, active, onClick, count }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 14px', width: 'calc(100% - 18px)', margin: '0 9px', border: '1px solid transparent',
        background: active ? 'linear-gradient(90deg, rgba(217,79,44,0.18), rgba(217,79,44,0.04))' : 'transparent',
        borderLeft: active ? '1px solid #D94F2C' : '1px solid transparent',
        color: active ? '#e8e3dc' : '#7a7060',
        fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.625rem',
        textTransform: 'uppercase', letterSpacing: '0.06em',
        cursor: 'pointer', transition: 'all 0.15s',
        textAlign: 'left',
        borderRadius: 8,
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.background = 'rgba(217,79,44,0.06)';
          e.currentTarget.style.borderColor = '#252118';
          e.currentTarget.style.color = '#b9b09f';
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.borderColor = 'transparent';
          e.currentTarget.style.color = '#7a7060';
        }
      }}
    >
      <Icon size={14} strokeWidth={1.8} />
      {label}
      {count != null && (
        <span style={{ marginLeft: 'auto', background: '#D94F2C', color: '#fff', fontSize: '0.5rem', padding: '1px 5px', minWidth: 16, textAlign: 'center' }}>
          {count}
        </span>
      )}
    </button>
  );
}

/* ─── Records Section ─── */
function RecordsSection() {
  const FILE_BASE = MEDIA_BASE;
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null); // null = list, 'new' = form, id = edit form
  const [form, setForm] = useState({ cert_number: '', candidate_name: '', training_name: '', program: '', duration: '', issue_date: '', certificate_file: null, certificate_file_url: '', projects_text: '' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const getFileExt = (path = '') => path.split('.').pop()?.toLowerCase() || '';
  const isImageExt = (ext) => ['jpg', 'jpeg', 'png'].includes(ext);
  const isPdfExt = (ext) => ext === 'pdf';

  const selectedPreviewUrl = form.certificate_file ? URL.createObjectURL(form.certificate_file) : '';
  const selectedPreviewExt = getFileExt(form.certificate_file?.name || '');
  const existingPreviewUrl = form.certificate_file_url ? `${FILE_BASE}${form.certificate_file_url}` : '';
  const existingPreviewExt = getFileExt(form.certificate_file_url || '');

  const load = useCallback(async (q = '') => {
    const data = await apiFetch(`/records/${q ? `?q=${encodeURIComponent(q)}` : ''}`);
    if (Array.isArray(data)) setRecords(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  function startNew() {
    setForm({ cert_number: '', candidate_name: '', training_name: '', program: '', duration: '', issue_date: '', certificate_file: null, certificate_file_url: '', projects_text: '' });
    setEditing('new');
  }

  function startEdit(r) {
    // Convert projects array to JSON text for textarea editing
    const projectsText = r.projects ? JSON.stringify(r.projects, null, 2) : '';
    setForm({ cert_number: r.cert_number, candidate_name: r.candidate_name, training_name: r.training_name || '', program: r.program, duration: r.duration || '', issue_date: r.issue_date, certificate_file: null, certificate_file_url: r.certificate_file || '', projects_text: projectsText });
    setEditing(r.id);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);

    const payload = new FormData();
    payload.append('candidate_name', form.candidate_name);
    payload.append('training_name', form.training_name);
    payload.append('program', form.program);
    payload.append('grade', 'Pass');
    payload.append('duration', form.duration);
    payload.append('issue_date', form.issue_date);
    if (form.certificate_file) payload.append('certificate_file', form.certificate_file);
    // Parse projects JSON if provided
    if (form.projects_text.trim()) {
      try {
        const parsed = JSON.parse(form.projects_text);
        payload.append('projects', JSON.stringify(parsed));
      } catch {
        setMsg('Projects field contains invalid JSON.'); setSaving(false); return;
      }
    }

    let data;
    if (editing === 'new') {
      data = await apiFetch('/records/', { method: 'POST', body: payload });
    } else {
      data = await apiFetch(`/records/${editing}/`, { method: 'PUT', body: payload });
    }
    setSaving(false);
    if (data?.id || data?.cert_number) {
      setMsg('Saved.'); setEditing(null); load();
      setTimeout(() => setMsg(''), 3000);
    } else {
      setMsg('Error saving. Check fields.');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this record?')) return;
    await apiFetch(`/records/${id}/`, { method: 'DELETE' });
    load(search);
  }

  if (editing !== null) {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem' }}>
          <button style={{ ...S.btnGhost, padding: '4px 8px' }} onClick={() => setEditing(null)}><X size={13} /></button>
          <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#e8e3dc', letterSpacing: '-0.02em' }}>
            {editing === 'new' ? 'Add Record' : 'Edit Record'}
          </h2>
        </div>

        <div style={{ ...S.card, maxWidth: 560 }}>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div><label style={S.label}>Verification ID</label><input style={{ ...S.input, background: '#16120e', color: '#9A9080' }} value={form.cert_number || 'Auto-generated on save'} readOnly /></div>
            <div><label style={S.label}>Candidate Name</label><input style={S.input} value={form.candidate_name} onChange={e => setForm(f => ({ ...f, candidate_name: e.target.value }))} required /></div>
            <div><label style={S.label}>Course</label><input style={S.input} value={form.training_name} onChange={e => setForm(f => ({ ...f, training_name: e.target.value }))} required placeholder="Full Stack Development" /></div>
            <div><label style={S.label}>Programme</label><input style={S.input} value={form.program} onChange={e => setForm(f => ({ ...f, program: e.target.value }))} required /></div>
            <div><label style={S.label}>Duration</label><input style={S.input} value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="e.g. 3 months, 12 weeks" /></div>
            <div><label style={S.label}>Issue Date</label><input style={S.input} type="date" value={form.issue_date} onChange={e => setForm(f => ({ ...f, issue_date: e.target.value }))} required /></div>
            <div>
              <label style={S.label}>Certificate File (PDF / JPG / PNG)</label>
              <input
                style={S.input}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                onChange={e => setForm(f => ({ ...f, certificate_file: e.target.files?.[0] || null }))}
              />
              {form.certificate_file_url && !form.certificate_file && (
                <a href={`${FILE_BASE}${form.certificate_file_url}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.625rem', color: '#D94F2C', display: 'inline-block', marginTop: 6 }}>
                  View existing certificate
                </a>
              )}

              {(selectedPreviewUrl || existingPreviewUrl) && (
                <div style={{ marginTop: 10, border: '1px solid #252218', borderRadius: 6, overflow: 'hidden', background: '#0C0B09' }}>
                  <div style={{ padding: '8px 10px', borderBottom: '1px solid #252218', fontSize: '0.58rem', color: '#9A9080', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Certificate Preview {form.certificate_file ? '(new upload)' : '(existing)'}
                  </div>

                  {selectedPreviewUrl && isImageExt(selectedPreviewExt) && (
                    <img src={selectedPreviewUrl} alt="certificate preview" style={{ width: '100%', maxHeight: 260, objectFit: 'contain', display: 'block', background: '#0a0908' }} />
                  )}

                  {selectedPreviewUrl && isPdfExt(selectedPreviewExt) && (
                    <iframe src={selectedPreviewUrl} title="certificate pdf preview" style={{ width: '100%', height: 300, border: 'none', background: '#fff' }} />
                  )}

                  {!selectedPreviewUrl && existingPreviewUrl && isImageExt(existingPreviewExt) && (
                    <img src={existingPreviewUrl} alt="existing certificate" style={{ width: '100%', maxHeight: 260, objectFit: 'contain', display: 'block', background: '#0a0908' }} />
                  )}

                  {!selectedPreviewUrl && existingPreviewUrl && isPdfExt(existingPreviewExt) && (
                    <iframe src={existingPreviewUrl} title="existing certificate pdf" style={{ width: '100%', height: 300, border: 'none', background: '#fff' }} />
                  )}

                  <div style={{ padding: '8px 10px' }}>
                    <a
                      href={selectedPreviewUrl || existingPreviewUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: '0.625rem', color: '#D94F2C', textDecoration: 'none' }}
                    >
                      Open full preview ↗
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div>
              <label style={S.label}>Projects (optional — JSON array)</label>
              <textarea
                style={{ ...S.input, minHeight: 90, resize: 'vertical', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.72rem' }}
                value={form.projects_text}
                onChange={e => setForm(f => ({ ...f, projects_text: e.target.value }))}
                placeholder={'[\n  { "title": "Project Name", "description": "Short description" }\n]'}
              />
              <span style={{ fontSize: '0.55rem', color: '#807767', marginTop: 4, display: 'block' }}>Leave blank if no projects. Enter valid JSON array.</span>
            </div>
            {msg && <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.625rem', color: msg.startsWith('Error') ? '#D94F2C' : '#a0c878' }}>{msg}</p>}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button type="submit" style={{ ...S.btnPrimary, display: 'flex', alignItems: 'center', gap: 6, opacity: saving ? 0.6 : 1 }}>
                <Save size={12} /> {saving ? 'Saving…' : 'Save'}
              </button>
              <button type="button" style={S.btnGhost} onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#e8e3dc', letterSpacing: '-0.02em', margin: 0 }}>Certificate Records</h2>
          <p style={{ fontSize: '0.62rem', color: '#807767', margin: '0.35rem 0 0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Issue, edit and audit certifications</p>
        </div>
        <button style={{ ...S.btnPrimary, display: 'flex', alignItems: 'center', gap: 6 }} onClick={startNew}>
          <Plus size={13} /> Add Record
        </button>
      </div>

      {msg && <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.625rem', color: '#a0c878', marginBottom: '1rem' }}>{msg}</p>}

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '1.5rem', maxWidth: 400 }}>
        <Search size={13} style={{ position: 'absolute', top: '50%', left: 10, transform: 'translateY(-50%)', color: '#7a7060' }} />
        <input
          style={{ ...S.input, paddingLeft: 32 }}
          placeholder="Search by name or cert number…"
          value={search}
          onChange={e => { setSearch(e.target.value); load(e.target.value); }}
        />
      </div>

      <div style={S.card}>
        <table style={S.table}>
          <thead>
            <tr>
              {['Verify ID', 'Candidate', 'Training', 'Program', 'Issued', 'Certificate', ''].map(h => (
                <th key={h} style={S.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map(r => (
              <tr
                key={r.id}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(217,79,44,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <td style={S.td}>{r.cert_number}</td>
                <td style={S.td}>{r.candidate_name}</td>
                <td style={S.td}>{r.training_name || '—'}</td>
                <td style={{ ...S.td, maxWidth: 180 }}>{r.program}</td>
                <td style={S.td}>{r.issue_date}</td>
                <td style={S.td}>
                  {r.certificate_file ? (
                    <a href={`${FILE_BASE}${r.certificate_file}`} target="_blank" rel="noreferrer" style={{ color: '#D94F2C', fontSize: '0.625rem' }}>Open</a>
                  ) : '—'}
                </td>
                <td style={{ ...S.td, display: 'flex', gap: 6 }}>
                  <button style={{ ...S.btnGhost, padding: '4px 8px' }} onClick={() => startEdit(r)}><Edit2 size={12} /></button>
                  <button style={{ ...S.btnDanger, padding: '4px 8px' }} onClick={() => handleDelete(r.id)}><Trash2 size={12} /></button>
                </td>
              </tr>
            ))}
            {records.length === 0 && (
              <tr><td colSpan={7} style={{ ...S.td, textAlign: 'center', padding: '2rem', color: '#3a3830' }}>No records found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Messages Section ─── */
function MessagesSection() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const load = useCallback(async (q = '') => {
    const data = await apiFetch(`/messages/${q ? `?q=${encodeURIComponent(q)}` : ''}`);
    if (Array.isArray(data)) setMessages(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id) {
    if (!confirm('Delete this message?')) return;
    await apiFetch(`/messages/${id}/`, { method: 'DELETE' });
    setSelected(null);
    load(search);
  }

  async function handleMarkRead(id) {
    await apiFetch(`/messages/${id}/`, { method: 'PATCH' });
    load(search);
  }

  const unread = messages.filter(m => !m.is_read).length;

  if (selected) {
    const m = messages.find(x => x.id === selected);
    if (!m) { setSelected(null); return null; }
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem' }}>
          <button style={{ ...S.btnGhost, padding: '4px 8px' }} onClick={() => setSelected(null)}><X size={13} /></button>
          <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#e8e3dc', letterSpacing: '-0.02em' }}>Message Detail</h2>
        </div>
        <div style={{ ...S.card, maxWidth: 600 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 2rem', marginBottom: '1.5rem' }}>
            <div><label style={S.label}>Name</label><p style={{ fontSize: '0.875rem', color: '#e8e3dc', margin: 0 }}>{m.name}</p></div>
            <div><label style={S.label}>Email</label><p style={{ fontSize: '0.875rem', color: '#e8e3dc', margin: 0 }}>{m.email}</p></div>
            {m.phone && <div><label style={S.label}>Phone</label><p style={{ fontSize: '0.875rem', color: '#e8e3dc', margin: 0 }}>{m.phone}</p></div>}
            <div><label style={S.label}>Received</label><p style={{ fontSize: '0.75rem', color: '#7a7060', margin: 0 }}>{new Date(m.created_at).toLocaleString()}</p></div>
          </div>
          <div style={{ height: '1px', background: '#1e1c18', margin: '0 0 1.25rem' }} />
          <label style={S.label}>Message</label>
          <p style={{ fontSize: '0.875rem', color: '#c5bfb5', lineHeight: 1.65 }}>{m.message}</p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
            {!m.is_read && (
              <button style={{ ...S.btnPrimary, display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => handleMarkRead(m.id)}>
                <Check size={12} /> Mark Read
              </button>
            )}
            <button style={{ ...S.btnDanger, display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => handleDelete(m.id)}>
              <Trash2 size={12} /> Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#e8e3dc', letterSpacing: '-0.02em', margin: 0 }}>Contact Messages</h2>
            <p style={{ fontSize: '0.62rem', color: '#807767', margin: '0.35rem 0 0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Inbound enquiries and follow-ups</p>
          </div>
          {unread > 0 && <span style={{ background: '#D94F2C', color: '#fff', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', padding: '2px 6px' }}>{unread} unread</span>}
        </div>
        <button style={{ ...S.btnGhost, display: 'flex', alignItems: 'center', gap: 5 }} onClick={() => load(search)}>
          <RefreshCw size={11} /> Refresh
        </button>
      </div>

      <div style={{ position: 'relative', marginBottom: '1.5rem', maxWidth: 400 }}>
        <Search size={13} style={{ position: 'absolute', top: '50%', left: 10, transform: 'translateY(-50%)', color: '#7a7060' }} />
        <input style={{ ...S.input, paddingLeft: 32 }} placeholder="Search messages…" value={search} onChange={e => { setSearch(e.target.value); load(e.target.value); }} />
      </div>

      <div style={S.card}>
        <table style={S.table}>
          <thead>
            <tr>{['Name', 'Email', 'Received', 'Status', ''].map(h => <th key={h} style={S.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {messages.map(m => (
              <tr
                key={m.id}
                style={{ opacity: m.is_read ? 0.6 : 1 }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(217,79,44,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <td style={{ ...S.td, fontWeight: m.is_read ? 400 : 600, color: m.is_read ? '#7a7060' : '#e8e3dc' }}>{m.name}</td>
                <td style={S.td}>{m.email}</td>
                <td style={S.td}>{new Date(m.created_at).toLocaleDateString()}</td>
                <td style={S.td}>
                  <span style={{ color: m.is_read ? '#3a3830' : '#D94F2C', fontSize: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {m.is_read ? 'Read' : '● Unread'}
                  </span>
                </td>
                <td style={{ ...S.td, display: 'flex', gap: 6 }}>
                  <button style={{ ...S.btnGhost, padding: '4px 8px' }} onClick={() => setSelected(m.id)}><Eye size={12} /></button>
                  <button style={{ ...S.btnDanger, padding: '4px 8px' }} onClick={() => handleDelete(m.id)}><Trash2 size={12} /></button>
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr><td colSpan={5} style={{ ...S.td, textAlign: 'center', padding: '2rem', color: '#3a3830' }}>No messages.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Blog Section ─── */
function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [activeTab, setActiveTab] = useState('write'); // write | preview
  const [form, setForm] = useState({ title: '', subtitle: '', category: 'Engineering', image_url: '', image_file: null, body: '', read_time: '5 min', is_featured: false });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [ctxMenu, setCtxMenu] = useState(null); // { x, y }
  const textareaRef = useRef(null);
  const selectionRef = useRef({ start: 0, end: 0 });

  const load = useCallback(async () => {
    const data = await apiFetch('/blog/');
    if (Array.isArray(data)) setPosts(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  const resetForm = () => {
    setForm({ title: '', subtitle: '', category: 'Engineering', image_url: '', image_file: null, body: '', read_time: '5 min', is_featured: false });
    setActiveTab('write');
    setEditingPostId(null);
  };

  const openNew = () => {
    resetForm();
    setAdding(true);
  };

  const openEdit = (post) => {
    setForm({
      title: post.title || '',
      subtitle: post.subtitle || '',
      category: post.category || 'Engineering',
      image_url: post.image_url || '',
      image_file: null,
      body: post.body || '',
      read_time: post.read_time || '5 min',
      is_featured: !!post.is_featured,
    });
    setEditingPostId(post.id);
    setActiveTab('write');
    setAdding(true);
  };

  // Close context menu on click outside
  useEffect(() => {
    const handleClick = () => setCtxMenu(null);
    const handleEscape = (e) => {
      if (e.key === 'Escape') setCtxMenu(null);
    };
    if (ctxMenu) {
      document.addEventListener('click', handleClick);
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('click', handleClick);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [ctxMenu]);

  const captureSelection = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    selectionRef.current = {
      start: textarea.selectionStart ?? 0,
      end: textarea.selectionEnd ?? 0,
    };
  };

  // Insert markdown - uses ref to get current text
  const insertMarkdown = (before, after = '', placeholder = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const hasLiveSelection = document.activeElement === textarea;
    const start = hasLiveSelection ? textarea.selectionStart : selectionRef.current.start;
    const end = hasLiveSelection ? textarea.selectionEnd : selectionRef.current.end;
    const currentText = form.body;
    const selectedText = currentText.substring(start, end) || placeholder;
    const newText = currentText.substring(0, start) + before + selectedText + after + currentText.substring(end);

    setForm(f => ({ ...f, body: newText }));

    // Restore focus and set cursor position after the inserted text
    setTimeout(() => {
      textarea.focus();
      const newPos = start + before.length + selectedText.length + after.length;
      textarea.setSelectionRange(newPos, newPos);
      selectionRef.current = { start: newPos, end: newPos };
    }, 0);
  };

  const applyLinePrefix = (prefix, placeholder = 'text') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const hasLiveSelection = document.activeElement === textarea;
    const start = hasLiveSelection ? textarea.selectionStart : selectionRef.current.start;
    const end = hasLiveSelection ? textarea.selectionEnd : selectionRef.current.end;
    const currentText = form.body;
    const selectedText = currentText.substring(start, end) || placeholder;
    const normalized = selectedText.replace(/\r\n/g, '\n');
    const transformed = normalized.split('\n').map(line => `${prefix}${line}`).join('\n');
    const newText = currentText.substring(0, start) + transformed + currentText.substring(end);

    setForm(f => ({ ...f, body: newText }));

    setTimeout(() => {
      textarea.focus();
      const newPos = start + transformed.length;
      textarea.setSelectionRange(newPos, newPos);
      selectionRef.current = { start: newPos, end: newPos };
    }, 0);
  };

  // Context menu insert functions (grouped for better UX)
  const ctxSections = [
    {
      title: 'Inline',
      items: [
        { label: 'Bold', hint: 'Ctrl+B', action: () => insertMarkdown('**', '**', 'bold text') },
        { label: 'Italic', hint: 'Ctrl+I', action: () => insertMarkdown('*', '*', 'italic text') },
        { label: 'Strikethrough', hint: 'Alt+Shift+5', action: () => insertMarkdown('~~', '~~', 'strikethrough') },
        { label: 'Inline Code', hint: '`', action: () => insertMarkdown('`', '`', 'code') },
        { label: 'Link', hint: 'Ctrl+K', action: () => insertMarkdown('[', '](url)', 'link text') },
      ],
    },
    {
      title: 'Headings',
      items: [
        { label: 'Heading 1', hint: '#', action: () => applyLinePrefix('# ', 'Heading') },
        { label: 'Heading 2', hint: '##', action: () => applyLinePrefix('## ', 'Subheading') },
        { label: 'Heading 3', hint: '###', action: () => applyLinePrefix('### ', 'Small heading') },
        { label: 'Quote', hint: '>', action: () => applyLinePrefix('> ', 'quote') },
      ],
    },
    {
      title: 'Blocks',
      items: [
        { label: 'Bullet List', hint: '-', action: () => applyLinePrefix('- ', 'list item') },
        { label: 'Numbered List', hint: '1.', action: () => applyLinePrefix('1. ', 'list item') },
        { label: 'Checkbox', hint: '[ ]', action: () => applyLinePrefix('- [ ] ', 'todo') },
        { label: 'Code Block', hint: '```', action: () => insertMarkdown('\n```\n', '\n```\n', 'code') },
        { label: 'Image', hint: '![alt](url)', action: () => insertMarkdown('![', '](image-url)', 'alt text') },
        { label: 'Horizontal Rule', hint: '---', action: () => insertMarkdown('\n---\n', '', '') },
      ],
    },
  ];

  // Handle right-click context menu
  const handleContextMenu = (e) => {
    e.preventDefault();
    captureSelection();

    const menuWidth = 280;
    const menuHeight = 360;
    const pad = 10;
    const x = Math.min(e.clientX, window.innerWidth - menuWidth - pad);
    const y = Math.min(e.clientY, window.innerHeight - menuHeight - pad);

    setCtxMenu({ x: Math.max(pad, x), y: Math.max(pad, y) });
  };

  const toolbarActions = [
    { label: 'B', style: { fontWeight: 'bold' }, action: () => insertMarkdown('**', '**', 'bold') },
    { label: 'I', style: { fontStyle: 'italic' }, action: () => insertMarkdown('*', '*', 'italic') },
    { label: 'H1', action: () => insertMarkdown('\n# ', '', 'Heading') },
    { label: 'H2', action: () => insertMarkdown('\n## ', '', 'Subheading') },
    { label: '•', action: () => insertMarkdown('\n- ', '', 'list item') },
    { label: '1.', action: () => insertMarkdown('\n1. ', '', 'list item') },
    { label: '``', action: () => insertMarkdown('`', '`', 'code') },
    { label: '```', action: () => insertMarkdown('\n```\n', '\n```\n', 'code block') },
    { label: 'Link', action: () => insertMarkdown('[', '](url)', 'link text') },
    { label: 'Quote', action: () => insertMarkdown('\n> ', '', 'quote') },
  ];

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    const isEditing = editingPostId != null;
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('subtitle', form.subtitle);
    fd.append('category', form.category);
    fd.append('body', form.body);
    fd.append('read_time', form.read_time);
    fd.append('is_featured', form.is_featured ? 'true' : 'false');
    if (form.image_file) {
      fd.append('image', form.image_file);
    } else if (form.image_url) {
      fd.append('image_url', form.image_url);
    }
    const data = await apiFetch(isEditing ? `/blog/${editingPostId}/` : '/blog/', {
      method: isEditing ? 'PUT' : 'POST',
      body: fd,
    });
    setSaving(false);
    if (data?.id) {
      setMsg(isEditing ? 'Post updated.' : 'Post created.');
      setAdding(false);
      resetForm();
      load();
      setTimeout(() => setMsg(''), 3000);
    } else {
      setMsg('Error: ' + JSON.stringify(data));
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this post?')) return;
    await apiFetch(`/blog/${id}/`, { method: 'DELETE' });
    load();
  }

  // Improved markdown preview renderer with stacked inline styles
  const renderPreview = (text) => {
    if (!text) return '<p style="color: #9A9080; font-style: italic;">Start writing to see preview...</p>';

    const escapeHtml = (str = '') => str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const inline = (raw = '') => {
      let s = escapeHtml(raw);

      // images + links
      s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; border-radius: 4px; margin: 0.75rem 0;" />');
      s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color: #D94F2C; text-decoration: underline;">$1</a>');

      // inline code first so further markdown does not alter code content
      s = s.replace(/`([^`]+)`/g, '<code style="background: #1a1814; padding: 2px 6px; border-radius: 3px; color: #D94F2C;">$1</code>');

      // stacked emphasis
      s = s.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong style="color: #F5F0E8;"><em>$1</em></strong>');
      s = s.replace(/\*\*([^*]+)\*\*/g, '<strong style="color: #F5F0E8;">$1</strong>');
      s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
      s = s.replace(/~~([^~]+)~~/g, '<del>$1</del>');

      return s;
    };

    const lines = text.split('\n');
    let html = '';
    let inCode = false;
    let listType = null; // 'ul' | 'ol'

    const closeList = () => {
      if (!listType) return;
      html += listType === 'ul' ? '</ul>' : '</ol>';
      listType = null;
    };

    lines.forEach((line) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('```')) {
        closeList();
        if (!inCode) {
          inCode = true;
          html += '<pre style="background:#141210;border:1px solid #252218;padding:12px 14px;border-radius:4px;overflow:auto;color:#C5BFB0;"><code>';
        } else {
          inCode = false;
          html += '</code></pre>';
        }
        return;
      }

      if (inCode) {
        html += `${escapeHtml(line)}\n`;
        return;
      }

      if (trimmed === '') {
        closeList();
        return;
      }

      if (trimmed === '---') {
        closeList();
        html += '<hr style="border: none; border-top: 1px solid #252218; margin: 1.5rem 0;">';
        return;
      }

      if (/^####\s+/.test(line)) { closeList(); html += `<h4 style="font-size: 0.875rem; font-weight: 600; color: #C5BFB0; margin: 1.25rem 0 0.5rem;">${inline(line.replace(/^####\s+/, ''))}</h4>`; return; }
      if (/^###\s+/.test(line)) { closeList(); html += `<h3 style="font-size: 1rem; font-weight: 600; color: #C5BFB0; margin: 1.5rem 0 0.5rem;">${inline(line.replace(/^###\s+/, ''))}</h3>`; return; }
      if (/^##\s+/.test(line)) { closeList(); html += `<h2 style="font-size: 1.25rem; font-weight: 600; color: #F5F0E8; margin: 1.5rem 0 0.5rem; border-left: 3px solid #D94F2C; padding-left: 0.75rem;">${inline(line.replace(/^##\s+/, ''))}</h2>`; return; }
      if (/^#\s+/.test(line)) { closeList(); html += `<h1 style="font-size: 1.5rem; font-weight: 700; color: #F5F0E8; margin: 1.5rem 0 0.5rem;">${inline(line.replace(/^#\s+/, ''))}</h1>`; return; }

      if (/^>\s+/.test(line)) {
        closeList();
        html += `<blockquote style="border-left: 3px solid #D94F2C; padding-left: 1rem; color: #9A9080; font-style: italic; margin: 1rem 0;">${inline(line.replace(/^>\s+/, ''))}</blockquote>`;
        return;
      }

      const unchecked = line.match(/^- \[ \] (.+)/);
      if (unchecked) {
        closeList();
        html += `<p style="color: #C5BFB0; margin-bottom: 0.5rem;">☐ ${inline(unchecked[1])}</p>`;
        return;
      }

      const checked = line.match(/^- \[x\] (.+)/i);
      if (checked) {
        closeList();
        html += `<p style="color: #C5BFB0; margin-bottom: 0.5rem;">☑ ${inline(checked[1])}</p>`;
        return;
      }

      const bullet = line.match(/^-\s+(.+)/);
      if (bullet) {
        if (listType !== 'ul') {
          closeList();
          listType = 'ul';
          html += '<ul style="margin: 0.25rem 0 0.75rem 1.25rem; padding: 0;">';
        }
        html += `<li style="color: #C5BFB0; margin-bottom: 0.25rem;">${inline(bullet[1])}</li>`;
        return;
      }

      const numbered = line.match(/^\d+\.\s+(.+)/);
      if (numbered) {
        if (listType !== 'ol') {
          closeList();
          listType = 'ol';
          html += '<ol style="margin: 0.25rem 0 0.75rem 1.25rem; padding: 0;">';
        }
        html += `<li style="color: #C5BFB0; margin-bottom: 0.25rem;">${inline(numbered[1])}</li>`;
        return;
      }

      closeList();
      html += `<p style="color: #C5BFB0; line-height: 1.8; margin-bottom: 0.5rem;">${inline(line)}</p>`;
    });

    closeList();
    if (inCode) html += '</code></pre>';

    return html || '<p style="color: #9A9080;">Empty preview...</p>';
  };

  if (adding) {
    return (
      <div style={{ maxWidth: 900 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #1a1814' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button style={{ ...S.btnGhost, padding: '8px 12px' }} onClick={() => { setAdding(false); resetForm(); }}>
              ← Back
            </button>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#F5F0E8' }}>{editingPostId ? 'Edit Blog Post' : 'Create Blog Post'}</h2>
          </div>
          <button type="button" onClick={handleSave} style={{ ...S.btnPrimary, padding: '10px 24px' }}>
            {editingPostId ? 'Save Changes' : 'Publish Post'}
          </button>
        </div>

        {/* Form Fields - Softer Card */}
        <div style={{ background: '#141210', border: '1px solid #1a1814', borderRadius: 6, padding: '1.5rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ ...S.label, marginBottom: 8 }}>Title</label>
              <input 
                style={{ ...S.input, fontSize: '1.1rem', fontWeight: 500, background: '#0C0B09' }} 
                value={form.title} 
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))} 
                placeholder="Enter an engaging title..."
              />
            </div>
            <div>
              <label style={{ ...S.label, marginBottom: 8 }}>Subtitle</label>
              <input 
                style={{ ...S.input, fontSize: '0.9rem', background: '#0C0B09' }} 
                value={form.subtitle} 
                onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} 
                placeholder="Short description for the card..."
              />
            </div>
          </div>

          {/* Meta row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 2fr', gap: '1rem', alignItems: 'end' }}>
            <div>
              <label style={{ ...S.label, marginBottom: 8 }}>Category</label>
              <select style={{ ...S.input, background: '#0C0B09' }} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                <option>Engineering</option>
                <option>Training</option>
                <option>Internship</option>
              </select>
            </div>
            <div>
              <label style={{ ...S.label, marginBottom: 8 }}>Read Time</label>
              <input style={{ ...S.input, background: '#0C0B09' }} value={form.read_time} onChange={e => setForm(f => ({ ...f, read_time: e.target.value }))} placeholder="5 min" />
            </div>
            <div>
              <label style={{ ...S.label, marginBottom: 8 }}>Featured</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '8px 0' }}>
                <input type="checkbox" checked={form.is_featured} onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))} />
                <span style={{ fontSize: '0.75rem', color: '#9A9080' }}>Show on homepage</span>
              </label>
            </div>
            <div>
              <label style={{ ...S.label, marginBottom: 8 }}>Cover Image</label>
              <input
                type="file"
                accept="image/*"
                style={{ ...S.input, background: '#0C0B09', padding: '6px 10px' }}
                onChange={e => setForm(f => ({ ...f, image_file: e.target.files[0] || null }))}
              />
              {form.image_file && (
                <span style={{ fontSize: '0.6rem', color: '#a0c878', marginTop: 4, display: 'block' }}>{form.image_file.name}</span>
              )}
              <label style={{ ...S.label, marginBottom: 4, marginTop: 8 }}>Or paste image URL</label>
              <input style={{ ...S.input, background: '#0C0B09' }} value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://..." />
            </div>
          </div>
        </div>

        {/* Editor Card */}
        <div style={{ background: '#141210', border: '1px solid #1a1814', borderRadius: 6, overflow: 'hidden' }}>
          {/* Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '10px 14px', background: '#0C0B09', borderBottom: '1px solid #1a1814', flexWrap: 'wrap' }}>
            {toolbarActions.map((action, i) => (
              <button
                key={i}
                type="button"
                onClick={action.action}
                title={action.label}
                style={{
                  padding: '6px 10px',
                  background: 'transparent',
                  border: 'none',
                  color: '#9A9080',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.625rem',
                  cursor: 'pointer',
                  ...action.style,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1a1814'; e.currentTarget.style.color = '#F5F0E8'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9A9080'; }}
              >
                {action.label}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', border: '1px solid #1a1814', borderRadius: 3 }}>
              <button
                type="button"
                onClick={() => setActiveTab('write')}
                style={{
                  padding: '6px 14px',
                  background: activeTab === 'write' ? '#1a1814' : 'transparent',
                  border: 'none',
                  color: activeTab === 'write' ? '#F5F0E8' : '#9A9080',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.5625rem',
                  cursor: 'pointer',
                }}
              >
                Write
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                style={{
                  padding: '6px 14px',
                  background: activeTab === 'preview' ? '#1a1814' : 'transparent',
                  border: 'none',
                  color: activeTab === 'preview' ? '#F5F0E8' : '#9A9080',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.5625rem',
                  cursor: 'pointer',
                }}
              >
                Preview
              </button>
            </div>
          </div>

          {/* Write / Preview */}
          {activeTab === 'write' ? (
            <div style={{ position: 'relative' }}>
              <textarea
                ref={textareaRef}
                onContextMenu={handleContextMenu}
                onSelect={captureSelection}
                onKeyUp={captureSelection}
                onMouseUp={captureSelection}
                style={{
                  width: '100%',
                  minHeight: 400,
                  padding: '1.25rem',
                  background: '#0C0B09',
                  border: 'none',
                  color: '#C5BFB0',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.8125rem',
                  lineHeight: 1.8,
                  resize: 'vertical',
                  outline: 'none',
                }}
                value={form.body}
                onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
                placeholder={"Write your blog post here...\n\nUse # for H1, ## for H2, ### for H3\n**bold** or *italic*\n- bullet list\n1. numbered list\n`inline code`"}
              />
              
              {/* Context Menu */}
              {ctxMenu && (
                <div style={{
                  position: 'fixed',
                  left: ctxMenu.x,
                  top: ctxMenu.y,
                  background: 'linear-gradient(180deg, #1a1712 0%, #13100d 100%)',
                  border: '1px solid #2a251c',
                  borderRadius: 10,
                  padding: '8px',
                  minWidth: 260,
                  maxHeight: 360,
                  overflow: 'auto',
                  zIndex: 1000,
                  boxShadow: '0 18px 46px rgba(0,0,0,0.62), inset 0 1px 0 rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(10px)',
                }}>
                  <div style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '0.56rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#8d8372',
                    padding: '4px 8px 10px',
                    borderBottom: '1px solid #252118',
                    marginBottom: 8,
                  }}>
                    Markdown Actions
                  </div>

                  {ctxSections.map((section, sectionIndex) => (
                    <div key={section.title} style={{ marginBottom: sectionIndex === ctxSections.length - 1 ? 2 : 8 }}>
                      <div style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: '0.55rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#6f6658',
                        padding: '4px 8px',
                      }}>
                        {section.title}
                      </div>

                      {section.items.map((item) => (
                        <button
                          key={`${section.title}-${item.label}`}
                          type="button"
                          onClick={() => { item.action(); setCtxMenu(null); }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            padding: '8px 10px',
                            background: 'transparent',
                            border: '1px solid transparent',
                            color: '#C5BFB0',
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: '0.67rem',
                            textAlign: 'left',
                            cursor: 'pointer',
                            borderRadius: 6,
                            transition: 'all 0.12s ease',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(217,79,44,0.12)';
                            e.currentTarget.style.borderColor = '#3a2a22';
                            e.currentTarget.style.color = '#F5F0E8';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.color = '#C5BFB0';
                          }}
                        >
                          <span>{item.label}</span>
                          <span style={{ color: '#7f7565', fontSize: '0.58rem' }}>{item.hint}</span>
                        </button>
                      ))}

                      {sectionIndex < ctxSections.length - 1 && (
                        <div style={{ height: 1, background: '#252118', margin: '8px 6px 0' }} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div 
              style={{ minHeight: 400, padding: '1.5rem', background: '#0C0B09', overflow: 'auto' }}
              dangerouslySetInnerHTML={{ __html: renderPreview(form.body) }}
            />
          )}
        </div>

        {msg && (
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem', color: msg.startsWith('Error') ? '#D94F2C' : '#a0c878', marginTop: '1rem' }}>
            {msg}
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#e8e3dc', letterSpacing: '-0.02em', margin: 0 }}>Blog Posts</h2>
          <p style={{ fontSize: '0.62rem', color: '#807767', margin: '0.35rem 0 0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Create editorials, publish and feature content</p>
        </div>
        <button style={{ ...S.btnPrimary, display: 'flex', alignItems: 'center', gap: 6 }} onClick={openNew}>
          <Plus size={13} /> New Post
        </button>
      </div>

      {msg && <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.625rem', color: '#a0c878', marginBottom: '1rem' }}>{msg}</p>}

      <div style={S.card}>
        <table style={S.table}>
          <thead>
            <tr>{['Title', 'Category', 'Published', 'Featured', ''].map(h => <th key={h} style={S.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {posts.map(p => (
              <tr
                key={p.id}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(217,79,44,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <td style={{ ...S.td, maxWidth: 280 }}>{p.title}</td>
                <td style={S.td}>{p.category}</td>
                <td style={S.td}>{new Date(p.published_at).toLocaleDateString()}</td>
                <td style={S.td}>{p.is_featured ? <span style={{ color: '#D94F2C' }}>★ Yes</span> : <span style={{ color: '#3a3830' }}>—</span>}</td>
                <td style={{ ...S.td, display: 'flex', gap: 6 }}>
                  <button style={{ ...S.btnGhost, padding: '4px 8px' }} onClick={() => openEdit(p)}><Edit2 size={12} /></button>
                  <button style={{ ...S.btnDanger, padding: '4px 8px' }} onClick={() => handleDelete(p.id)}><Trash2 size={12} /></button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr><td colSpan={5} style={{ ...S.td, textAlign: 'center', padding: '2rem', color: '#3a3830' }}>No posts in the database. Showing static posts from frontend.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Hiring Section ─── */
function HiringSection() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const load = useCallback(async (q = '') => {
    const data = await apiFetch(`/hiring/${q ? `?q=${encodeURIComponent(q)}` : ''}`);
    if (Array.isArray(data)) setItems(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id) {
    if (!confirm('Delete this application?')) return;
    await apiFetch(`/hiring/${id}/`, { method: 'DELETE' });
    setSelected(null);
    load(search);
  }

  async function handleMarkRead(id) {
    await apiFetch(`/hiring/${id}/`, { method: 'PATCH' });
    load(search);
  }

  const unread = items.filter(m => !m.is_read).length;

  if (selected) {
    const m = items.find(x => x.id === selected);
    if (!m) { setSelected(null); return null; }
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem' }}>
          <button style={{ ...S.btnGhost, padding: '4px 8px' }} onClick={() => setSelected(null)}><X size={13} /></button>
          <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#e8e3dc', letterSpacing: '-0.02em' }}>Application Detail</h2>
        </div>
        <div style={{ ...S.card, maxWidth: 600 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 2rem', marginBottom: '1.5rem' }}>
            <div><label style={S.label}>Name</label><p style={{ fontSize: '0.875rem', color: '#e8e3dc', margin: 0 }}>{m.name}</p></div>
            <div><label style={S.label}>Email</label><p style={{ fontSize: '0.875rem', color: '#e8e3dc', margin: 0 }}>{m.email}</p></div>
            {m.phone && <div><label style={S.label}>Phone</label><p style={{ fontSize: '0.875rem', color: '#e8e3dc', margin: 0 }}>{m.phone}</p></div>}
            <div><label style={S.label}>Received</label><p style={{ fontSize: '0.75rem', color: '#7a7060', margin: 0 }}>{new Date(m.created_at).toLocaleString()}</p></div>
          </div>
          {m.resume && (
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={S.label}>Resume</label>
              <a href={`${MEDIA_BASE}${m.resume}`} target="_blank" rel="noreferrer"
                style={{ color: '#D94F2C', fontSize: '0.8rem', textDecoration: 'underline' }}>Download Resume</a>
            </div>
          )}
          {m.message && <><label style={S.label}>Message</label><p style={{ fontSize: '0.875rem', color: '#c5bfb5', lineHeight: 1.65, marginTop: '0.5rem' }}>{m.message}</p></>}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
            {!m.is_read && (
              <button style={{ ...S.btnPrimary, display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => handleMarkRead(m.id)}>
                <Check size={12} /> Mark Read
              </button>
            )}
            <button style={{ ...S.btnDanger, display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => handleDelete(m.id)}>
              <Trash2 size={12} /> Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#e8e3dc', letterSpacing: '-0.02em', margin: 0 }}>Hiring Applications</h2>
            <p style={{ fontSize: '0.62rem', color: '#807767', margin: '0.35rem 0 0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Job applications and resumes</p>
          </div>
          {unread > 0 && <span style={{ background: '#D94F2C', color: '#fff', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', padding: '2px 6px' }}>{unread} unread</span>}
        </div>
        <button style={{ ...S.btnGhost, display: 'flex', alignItems: 'center', gap: 5 }} onClick={() => load(search)}>
          <RefreshCw size={11} /> Refresh
        </button>
      </div>

      <div style={{ position: 'relative', marginBottom: '1.5rem', maxWidth: 400 }}>
        <Search size={13} style={{ position: 'absolute', top: '50%', left: 10, transform: 'translateY(-50%)', color: '#7a7060' }} />
        <input style={{ ...S.input, paddingLeft: 32 }} placeholder="Search applications…" value={search} onChange={e => { setSearch(e.target.value); load(e.target.value); }} />
      </div>

      <div style={S.card}>
        <table style={S.table}>
          <thead>
            <tr>{['Name', 'Email', 'Received', 'Status', ''].map(h => <th key={h} style={S.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {items.map(m => (
              <tr
                key={m.id}
                style={{ opacity: m.is_read ? 0.6 : 1 }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(217,79,44,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <td style={{ ...S.td, fontWeight: m.is_read ? 400 : 600, color: m.is_read ? '#7a7060' : '#e8e3dc' }}>{m.name}</td>
                <td style={S.td}>{m.email}</td>
                <td style={S.td}>{new Date(m.created_at).toLocaleDateString()}</td>
                <td style={S.td}>
                  <span style={{ color: m.is_read ? '#3a3830' : '#D94F2C', fontSize: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {m.is_read ? 'Read' : '● Unread'}
                  </span>
                </td>
                <td style={{ ...S.td, display: 'flex', gap: 6 }}>
                  <button style={{ ...S.btnGhost, padding: '4px 8px' }} onClick={() => setSelected(m.id)}><Eye size={12} /></button>
                  <button style={{ ...S.btnDanger, padding: '4px 8px' }} onClick={() => handleDelete(m.id)}><Trash2 size={12} /></button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} style={{ ...S.td, textAlign: 'center', padding: '2rem', color: '#3a3830' }}>No applications.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Quotes Section ─── */
function QuotesSection() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const load = useCallback(async (q = '') => {
    const data = await apiFetch(`/quotes/${q ? `?q=${encodeURIComponent(q)}` : ''}`);
    if (Array.isArray(data)) setItems(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id) {
    if (!confirm('Delete this quote request?')) return;
    await apiFetch(`/quotes/${id}/`, { method: 'DELETE' });
    setSelected(null);
    load(search);
  }

  async function handleMarkRead(id) {
    await apiFetch(`/quotes/${id}/`, { method: 'PATCH' });
    load(search);
  }

  const unread = items.filter(m => !m.is_read).length;

  if (selected) {
    const m = items.find(x => x.id === selected);
    if (!m) { setSelected(null); return null; }
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem' }}>
          <button style={{ ...S.btnGhost, padding: '4px 8px' }} onClick={() => setSelected(null)}><X size={13} /></button>
          <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#e8e3dc', letterSpacing: '-0.02em' }}>Quote Request Detail</h2>
        </div>
        <div style={{ ...S.card, maxWidth: 600 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 2rem', marginBottom: '1.5rem' }}>
            <div><label style={S.label}>Name</label><p style={{ fontSize: '0.875rem', color: '#e8e3dc', margin: 0 }}>{m.name}</p></div>
            <div><label style={S.label}>Email</label><p style={{ fontSize: '0.875rem', color: '#e8e3dc', margin: 0 }}>{m.email}</p></div>
            {m.phone && <div><label style={S.label}>Phone</label><p style={{ fontSize: '0.875rem', color: '#e8e3dc', margin: 0 }}>{m.phone}</p></div>}
            {m.budget && <div><label style={S.label}>Budget</label><p style={{ fontSize: '0.875rem', color: '#e8e3dc', margin: 0 }}>{m.budget}</p></div>}
            <div><label style={S.label}>Received</label><p style={{ fontSize: '0.75rem', color: '#7a7060', margin: 0 }}>{new Date(m.created_at).toLocaleString()}</p></div>
          </div>
          {m.attachment && (
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={S.label}>Attachment</label>
              <a href={`${MEDIA_BASE}${m.attachment}`} target="_blank" rel="noreferrer"
                style={{ color: '#D94F2C', fontSize: '0.8rem', textDecoration: 'underline' }}>Download Attachment</a>
            </div>
          )}
          {m.message && <><label style={S.label}>Message</label><p style={{ fontSize: '0.875rem', color: '#c5bfb5', lineHeight: 1.65, marginTop: '0.5rem' }}>{m.message}</p></>}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
            {!m.is_read && (
              <button style={{ ...S.btnPrimary, display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => handleMarkRead(m.id)}>
                <Check size={12} /> Mark Read
              </button>
            )}
            <button style={{ ...S.btnDanger, display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => handleDelete(m.id)}>
              <Trash2 size={12} /> Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div>
            <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#e8e3dc', letterSpacing: '-0.02em', margin: 0 }}>Quote Requests</h2>
            <p style={{ fontSize: '0.62rem', color: '#807767', margin: '0.35rem 0 0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Pricing and project enquiries</p>
          </div>
          {unread > 0 && <span style={{ background: '#D94F2C', color: '#fff', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', padding: '2px 6px' }}>{unread} unread</span>}
        </div>
        <button style={{ ...S.btnGhost, display: 'flex', alignItems: 'center', gap: 5 }} onClick={() => load(search)}>
          <RefreshCw size={11} /> Refresh
        </button>
      </div>

      <div style={{ position: 'relative', marginBottom: '1.5rem', maxWidth: 400 }}>
        <Search size={13} style={{ position: 'absolute', top: '50%', left: 10, transform: 'translateY(-50%)', color: '#7a7060' }} />
        <input style={{ ...S.input, paddingLeft: 32 }} placeholder="Search quotes…" value={search} onChange={e => { setSearch(e.target.value); load(e.target.value); }} />
      </div>

      <div style={S.card}>
        <table style={S.table}>
          <thead>
            <tr>{['Name', 'Email', 'Budget', 'Received', 'Status', ''].map(h => <th key={h} style={S.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {items.map(m => (
              <tr
                key={m.id}
                style={{ opacity: m.is_read ? 0.6 : 1 }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(217,79,44,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <td style={{ ...S.td, fontWeight: m.is_read ? 400 : 600, color: m.is_read ? '#7a7060' : '#e8e3dc' }}>{m.name}</td>
                <td style={S.td}>{m.email}</td>
                <td style={S.td}>{m.budget || '—'}</td>
                <td style={S.td}>{new Date(m.created_at).toLocaleDateString()}</td>
                <td style={S.td}>
                  <span style={{ color: m.is_read ? '#3a3830' : '#D94F2C', fontSize: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {m.is_read ? 'Read' : '● Unread'}
                  </span>
                </td>
                <td style={{ ...S.td, display: 'flex', gap: 6 }}>
                  <button style={{ ...S.btnGhost, padding: '4px 8px' }} onClick={() => setSelected(m.id)}><Eye size={12} /></button>
                  <button style={{ ...S.btnDanger, padding: '4px 8px' }} onClick={() => handleDelete(m.id)}><Trash2 size={12} /></button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={6} style={{ ...S.td, textAlign: 'center', padding: '2rem', color: '#3a3830' }}>No quote requests.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Programs Section ─── */
const ICON_OPTIONS = ['Brain', 'Globe', 'Database', 'Eye', 'Smartphone', 'Cpu', 'TerminalSquare', 'PenTool', 'Cloud', 'MonitorCog', 'Bot', 'LayoutDashboard', 'Workflow', 'MessageSquareMore', 'BarChart3', 'Layers3', 'Palette'];

function ProgramsSection() {
  const [programs, setPrograms] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    slug: '', order: 0, icon_name: 'Brain', title: '',
    duration: '', format: '', has_internship: false, has_certificate: true,
    tagline: '', overview: '', modules_text: '[]', tools_text: '[]', is_active: true,
  });
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const data = await apiFetch('/courses/?all=1');
    if (Array.isArray(data)) setPrograms(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  const resetForm = () => {
    setForm({
      slug: '', order: 0, icon_name: 'Brain', title: '',
      duration: '', format: '', has_internship: false, has_certificate: true,
      tagline: '', overview: '', modules_text: '[]', tools_text: '[]', is_active: true,
    });
    setEditingId(null);
  };

  const openNew = () => { resetForm(); setAdding(true); };
  const openEdit = (p) => {
    setForm({
      slug: p.slug, order: p.order, icon_name: p.icon_name || 'Brain', title: p.title,
      duration: p.duration, format: p.format,
      has_internship: !!p.has_internship, has_certificate: !!p.has_certificate,
      tagline: p.tagline, overview: p.overview,
      modules_text: JSON.stringify(p.modules, null, 2),
      tools_text: JSON.stringify(p.tools, null, 2),
      is_active: p.is_active,
    });
    setEditingId(p.id);
    setAdding(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this program?')) return;
    await apiFetch(`/courses/${id}/`, { method: 'DELETE' });
    load();
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let modules, tools;
      try { modules = JSON.parse(form.modules_text); } catch { alert('Invalid JSON in Modules field'); setSaving(false); return; }
      try { tools = JSON.parse(form.tools_text); } catch { alert('Invalid JSON in Tools field'); setSaving(false); return; }

      const payload = {
        slug: form.slug,
        order: Number(form.order),
        icon_name: form.icon_name,
        title: form.title,
        duration: form.duration,
        format: form.format,
        has_internship: form.has_internship,
        has_certificate: form.has_certificate,
        tagline: form.tagline,
        overview: form.overview,
        modules,
        tools,
        is_active: form.is_active,
      };

      if (editingId) {
        await apiFetch(`/courses/${editingId}/`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        await apiFetch('/courses/', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }
      setAdding(false);
      load();
    } catch (e) {
      alert('Save failed: ' + e.message);
    }
    setSaving(false);
  };

  if (adding) {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem' }}>
          <button style={{ ...S.btnGhost, padding: '4px 8px' }} onClick={() => setAdding(false)}><X size={13} /></button>
          <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#e8e3dc', letterSpacing: '-0.02em' }}>{editingId ? 'Edit Program' : 'New Program'}</h2>
        </div>

        <div style={{ ...S.card, maxWidth: 720 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 2rem', marginBottom: '1rem' }}>
            <div>
              <label style={S.label}>Slug</label>
              <input style={S.input} value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="genai" required />
            </div>
            <div>
              <label style={S.label}>Order</label>
              <input type="number" style={S.input} value={form.order} onChange={e => setForm(f => ({ ...f, order: e.target.value }))} />
            </div>
            <div>
              <label style={S.label}>Icon (Lucide name)</label>
              <select style={S.input} value={form.icon_name} onChange={e => setForm(f => ({ ...f, icon_name: e.target.value }))}>
                {ICON_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={S.label}>Title</label>
              <input style={S.input} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
            </div>
            <div>
              <label style={S.label}>Duration</label>
              <input style={S.input} value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="12 Weeks" />
            </div>
            <div>
              <label style={S.label}>Format</label>
              <input style={S.input} value={form.format} onChange={e => setForm(f => ({ ...f, format: e.target.value }))} placeholder="Live + Project" />
            </div>
            <div>
              <label style={S.label}>Tagline</label>
              <input style={S.input} value={form.tagline} onChange={e => setForm(f => ({ ...f, tagline: e.target.value }))} />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', paddingBottom: 6 }}>
              <label style={{ ...S.label, marginBottom: 0, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.has_internship} onChange={e => setForm(f => ({ ...f, has_internship: e.target.checked }))} />
                Internship
              </label>
              <label style={{ ...S.label, marginBottom: 0, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.has_certificate} onChange={e => setForm(f => ({ ...f, has_certificate: e.target.checked }))} />
                Certificate
              </label>
              <label style={{ ...S.label, marginBottom: 0, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} />
                Active
              </label>
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={S.label}>Overview</label>
            <textarea style={S.textarea} rows={3} value={form.overview} onChange={e => setForm(f => ({ ...f, overview: e.target.value }))} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={S.label}>Modules (JSON)</label>
              <textarea style={S.textarea} rows={6} value={form.modules_text} onChange={e => setForm(f => ({ ...f, modules_text: e.target.value }))} placeholder='[{"title": "Module 1", "topics": ["topic1", "topic2"]}]' />
            </div>
            <div>
              <label style={S.label}>Tools (JSON array)</label>
              <textarea style={S.textarea} rows={6} value={form.tools_text} onChange={e => setForm(f => ({ ...f, tools_text: e.target.value }))} placeholder='["Python", "Django", "React"]' />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button style={{ ...S.btnPrimary, display: 'flex', alignItems: 'center', gap: 6 }} onClick={handleSave} disabled={saving}>
              <Save size={12} /> {saving ? 'Saving…' : 'Save Program'}
            </button>
            <button style={{ ...S.btnDanger }} onClick={() => setAdding(false)}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#e8e3dc', letterSpacing: '-0.02em', margin: 0 }}>Programs & Courses</h2>
          <p style={{ fontSize: '0.62rem', color: '#807767', margin: '0.35rem 0 0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{programs.length} programs on file</p>
        </div>
        <button style={{ ...S.btnPrimary, display: 'flex', alignItems: 'center', gap: 6 }} onClick={openNew}>
          <Plus size={12} /> Add Program
        </button>
      </div>

      <div style={S.card}>
        <table style={S.table}>
          <thead>
            <tr>
              {['Order', 'Title', 'Duration', 'Format', 'Internship', 'Certificate', 'Active', ''].map(h => <th key={h} style={S.th}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {programs.sort((a, b) => a.order - b.order).map(p => (
              <tr key={p.id}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(217,79,44,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <td style={S.td}>{p.order}</td>
                <td style={{ ...S.td, fontWeight: 600, color: '#e8e3dc' }}>{p.title}</td>
                <td style={S.td}>{p.duration}</td>
                <td style={S.td}>{p.format}</td>
                <td style={S.td}>{p.has_internship ? '✓' : '—'}</td>
                <td style={S.td}>{p.has_certificate ? '✓' : '—'}</td>
                <td style={S.td}>
                  <span style={{ color: p.is_active ? '#a0c878' : '#3a3830', fontSize: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {p.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ ...S.td, display: 'flex', gap: 6 }}>
                  <button style={{ ...S.btnGhost, padding: '4px 8px' }} onClick={() => openEdit(p)}><Edit2 size={12} /></button>
                  <button style={{ ...S.btnDanger, padding: '4px 8px' }} onClick={() => handleDelete(p.id)}><Trash2 size={12} /></button>
                </td>
              </tr>
            ))}
            {programs.length === 0 && (
              <tr><td colSpan={8} style={{ ...S.td, textAlign: 'center', padding: '2rem', color: '#3a3830' }}>No programs yet. Click "Add Program" to create one.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Overview Section ─── */
function OverviewSection({ onNav }) {
  const [counts, setCounts] = useState({ records: 0, messages: 0, unread: 0, posts: 0, hiring: 0, hiringUnread: 0, quotes: 0, quotesUnread: 0, programs: 0 });

  useEffect(() => {
    Promise.all([
      apiFetch('/records/').then(d => Array.isArray(d) ? d.length : 0),
      apiFetch('/messages/').then(d => Array.isArray(d) ? d : []),
      apiFetch('/blog/').then(d => Array.isArray(d) ? d.length : 0),
      apiFetch('/hiring/').then(d => Array.isArray(d) ? d : []),
      apiFetch('/quotes/').then(d => Array.isArray(d) ? d : []),
      apiFetch('/courses/').then(d => Array.isArray(d) ? d : []),
    ]).then(([records, msgs, posts, hiring, quotes, programs]) => {
      setCounts({
        records, messages: msgs.length, unread: msgs.filter(m => !m.is_read).length, posts,
        hiring: hiring.length, hiringUnread: hiring.filter(h => !h.is_read).length,
        quotes: quotes.length, quotesUnread: quotes.filter(q => !q.is_read).length,
        programs: programs.length,
      });
    });
  }, []);

  const tiles = [
    { label: 'Certificate Records', value: counts.records, section: 'records', icon: FileText, note: 'Total issued' },
    { label: 'Contact Messages', value: counts.messages, section: 'messages', icon: MessageSquare, note: `${counts.unread} unread` },
    { label: 'Blog Posts (DB)', value: counts.posts, section: 'blog', icon: BookOpen, note: 'Admin-published' },
    { label: 'Hiring Applications', value: counts.hiring, section: 'hiring', icon: Briefcase, note: `${counts.hiringUnread} unread` },
    { label: 'Quote Requests', value: counts.quotes, section: 'quotes', icon: FileText, note: `${counts.quotesUnread} unread` },
    { label: 'Programs', value: counts.programs, section: 'programs', icon: BookOpen, note: 'Active programs' },
  ];

  return (
    <div>
      <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#e8e3dc', letterSpacing: '-0.02em', marginBottom: '0.4rem' }}>Overview</h2>
      <p style={{ fontSize: '0.62rem', color: '#807767', margin: '0 0 1.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Command surface for operations and publishing</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1px', background: '#1e1c18', border: '1px solid #1e1c18', marginBottom: '2rem' }}>
        {tiles.map(t => (
          <button key={t.label} onClick={() => onNav(t.section)}
            style={{
              background: 'linear-gradient(180deg, #0f0c09 0%, #0b0907 100%)', padding: '1.75rem', textAlign: 'left', border: 'none', cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#15120e'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(180deg, #0f0c09 0%, #0b0907 100%)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <t.icon size={16} strokeWidth={1.5} style={{ color: '#D94F2C', marginBottom: '0.75rem' }} />
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '1.75rem', fontWeight: 700, color: '#e8e3dc', marginBottom: '0.25rem' }}>{t.value}</div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5625rem', color: '#7a7060', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t.label}</div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', color: '#D94F2C', marginTop: '0.5rem' }}>{t.note}</div>
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {[
          { label: 'Manage Records', section: 'records' },
          { label: 'View Messages', section: 'messages' },
          { label: 'Post to Blog', section: 'blog' },
          { label: 'Hiring Apps', section: 'hiring' },
          { label: 'Quote Requests', section: 'quotes' },
          { label: 'Programs', section: 'programs' },
        ].map(a => (
          <button key={a.label} onClick={() => onNav(a.section)}
            style={{ ...S.btnGhost, display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.625rem' }}>
            {a.label} <ChevronRight size={11} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Dashboard ─── */
function Dashboard({ username, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const sectionFromPath = (() => {
    const parts = location.pathname.split('/').filter(Boolean); // ['dash', 'records']
    const candidate = parts[1] || 'overview';
    return ['overview', 'records', 'messages', 'blog', 'hiring', 'quotes', 'programs'].includes(candidate) ? candidate : 'overview';
  })();

  const setSection = (next) => {
    if (next === 'overview') {
      navigate('/dash');
      return;
    }
    navigate(`/dash/${next}`);
  };

  async function handleLogout() {
    await apiFetch('/auth/logout/', { method: 'POST' });
    onLogout();
  }

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'records', label: 'Records', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'hiring', label: 'Hiring', icon: Briefcase },
    { id: 'quotes', label: 'Quotes', icon: FileText },
    { id: 'programs', label: 'Programs', icon: BookOpen },
  ];

  return (
    <div style={{ ...S.page, display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div style={S.sidebar}>
        {/* Logo */}
        <div style={{ padding: '0 20px 1.5rem', borderBottom: '1px solid #1e1c18', marginBottom: '1rem' }}>
          <img src="/img/brand-logo-white.png" alt="AstirMind" style={{ height: 28, width: 'auto', objectFit: 'contain', display: 'block' }} />
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', color: '#3a3830', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 6 }}>Admin</p>
        </div>

        {/* Nav */}
        <div style={{ flex: 1 }}>
          {navItems.map(item => (
            <NavItem key={item.id} icon={item.icon} label={item.label} active={sectionFromPath === item.id} onClick={() => setSection(item.id)} />
          ))}
        </div>

        {/* User */}
        <div style={{ borderTop: '1px solid #1e1c18', padding: '1rem 20px 0', background: 'linear-gradient(180deg, rgba(217,79,44,0) 0%, rgba(217,79,44,0.06) 100%)' }}>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5625rem', color: '#7a7060', marginBottom: 8 }}>
            Signed in as <span style={{ color: '#c5bfb5' }}>{username}</span>
          </p>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: 7, width: '100%', background: 'none',
              border: 'none', cursor: 'pointer', color: '#7a7060',
              fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5625rem',
              textTransform: 'uppercase', letterSpacing: '0.06em', padding: '6px 0',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#D94F2C'}
            onMouseLeave={e => e.currentTarget.style.color = '#7a7060'}
          >
            <LogOut size={13} strokeWidth={1.8} /> Logout
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={S.main}>
        {/* Top bar */}
        <div style={{
          border: '1px solid #201b15',
          background: 'linear-gradient(90deg, rgba(217,79,44,0.08), rgba(217,79,44,0))',
          borderRadius: 10,
          padding: '0.9rem 1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 12,
          zIndex: 4,
          backdropFilter: 'blur(8px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5625rem', color: '#7a7060' }}>
            <span style={{ color: '#D94F2C' }}>Control</span>
            <ChevronRight size={11} />
            <span>Dashboard</span>
            {sectionFromPath !== 'overview' && (
              <>
                <ChevronRight size={11} />
                <span style={{ color: '#c5bfb5', textTransform: 'capitalize' }}>{sectionFromPath}</span>
              </>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', color: '#6c6457', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: '#a0c878', boxShadow: '0 0 10px rgba(160,200,120,0.8)' }} />
          </div>
        </div>

        {sectionFromPath === 'overview' && <OverviewSection onNav={setSection} />}
        {sectionFromPath === 'records'  && <RecordsSection />}
        {sectionFromPath === 'messages' && <MessagesSection />}
        {sectionFromPath === 'blog'     && <BlogSection />}
        {sectionFromPath === 'hiring'   && <HiringSection />}
        {sectionFromPath === 'quotes'   && <QuotesSection />}
        {sectionFromPath === 'programs' && <ProgramsSection />}
      </div>
    </div>
  );
}

/* ─── Root ─── */
export default function DashboardPage() {
  const [authState, setAuthState] = useState('loading'); // loading | login | authed
  const [username, setUsername] = useState('');

  useEffect(() => {
    apiFetch('/auth/status/').then(data => {
      if (data?.authenticated) {
        setUsername(data.username);
        setAuthState('authed');
      } else {
        setAuthState('login');
      }
    }).catch(() => setAuthState('login'));
  }, []);

  if (authState === 'loading') {
    return (
      <div style={{ ...S.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.625rem', color: '#7a7060' }}>Checking session…</span>
      </div>
    );
  }

  if (authState === 'login') {
    return <LoginScreen onLogin={u => { setUsername(u); setAuthState('authed'); }} />;
  }

  return <Dashboard username={username} onLogout={() => { setUsername(''); setAuthState('login'); }} />;
}
