import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { API_BASE as API } from '../config/api';
import { POSTS as STATIC_POSTS } from './BlogDetailPage';
import { Helmet } from 'react-helmet';

gsap.registerPlugin(ScrollTrigger);

async function fetchPosts() {
  try {
    const res = await fetch(`${API}/blog/`, { credentials: 'include' });
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data.map(p => ({
      id: String(p.id),
      slug: String(p.id),
      category: p.category || 'Engineering',
      title: p.title,
      subtitle: p.subtitle || '',
      date: p.published_at ? new Date(p.published_at).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : 'Apr 2026',
      read: p.read_time || '5 min',
      featured: p.is_featured || false,
      image: p.image_src || p.image_url || '',
      body: p.body || '',
    }));
  } catch {
    return [];
  }
}

const CATEGORIES = ['All', 'Engineering', 'Training', 'Internship'];

function FeaturedCard({ post }) {
  const navigate = useNavigate();
  return (
    <article
      className="blog-featured"
      onClick={() => navigate(`/blog/${post.id}`)}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        border: '1px solid var(--line)',
        overflow: 'hidden',
        background: 'var(--bg-alt)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
        transition: 'border-color 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--line-light)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: 380 }}>
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            filter: 'brightness(0.85) contrast(1.08)',
            transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 60%, rgba(6,5,3,0.7) 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)' }} />
        <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem' }}>
          <span className="badge-raw" style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff', background: 'rgba(6,5,3,0.6)', backdropFilter: 'blur(8px)' }}>
            Featured
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span className="badge-raw" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>{post.category}</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
            fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.15,
            color: 'var(--text)', marginBottom: '1rem',
          }}>
            {post.title}
          </h2>
          <p className="t-body" style={{ fontSize: '0.9375rem', lineHeight: 1.7 }}>{post.subtitle}</p>
        </div>

        <div>
          <div style={{ height: '1px', background: 'var(--line)', margin: '2rem 0 1.5rem' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-3)' }}>
                <Calendar size={11} strokeWidth={1.5} /> {post.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-3)' }}>
                <Clock size={11} strokeWidth={1.5} /> {post.read} read
              </span>
            </div>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--accent)' }}>
              Read <ArrowUpRight size={14} strokeWidth={2} />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function PostCard({ post }) {
  const navigate = useNavigate();
  return (
    <article
      className="blog-card"
      onClick={() => navigate(`/blog/${post.id}`)}
      style={{
        border: '1px solid var(--line)',
        background: 'var(--bg-alt)',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
        transition: 'border-color 0.2s, transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--line-light)';
        e.currentTarget.style.transform = 'translateY(-5px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--line)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ aspectRatio: '16 / 9', overflow: 'hidden', position: 'relative' }}>
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            filter: 'brightness(0.88) contrast(1.06)',
            transition: 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(6,5,3,0.45) 100%)' }} />
        <span style={{
          position: 'absolute', top: '0.75rem', left: '0.75rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
          color: 'rgba(255,255,255,0.7)', background: 'rgba(6,5,3,0.55)', backdropFilter: 'blur(6px)',
          padding: '3px 8px', border: '1px solid rgba(255,255,255,0.1)',
        }}>
          {post.category}
        </span>
      </div>

      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-3)' }}>
            <Calendar size={10} strokeWidth={1.5} /> {post.date}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-3)' }}>
            <Clock size={10} strokeWidth={1.5} /> {post.read} read
          </span>
        </div>

        <h3 style={{
          fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
          fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.3, color: 'var(--text)',
        }}>
          {post.title}
        </h3>
        <p className="t-body" style={{ fontSize: '0.875rem', lineHeight: 1.65, flex: 1 }}>{post.subtitle}</p>

        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'flex-end' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent)' }}>
            Read post <ArrowUpRight size={12} strokeWidth={2} />
          </span>
        </div>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageRef = useRef(null);

  useEffect(() => {
    fetchPosts().then(data => {
      setPosts(data.length > 0 ? data : STATIC_POSTS);
      setLoading(false);
    }).catch(() => {
      setPosts(STATIC_POSTS);
      setLoading(false);
    });
  }, []);

  const featured = posts.find(p => p.featured);
  const showFeaturedCard = featured && (activeCategory === 'All' || activeCategory === featured.category);
  const rest = posts.filter(p => {
    if (showFeaturedCard && p === featured) return false;
    return activeCategory === 'All' || p.category === activeCategory;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.blog-page-header', {
        opacity: 0, y: 30, duration: 0.7, ease: 'power3.out', delay: 0.1,
      });
      gsap.from('.blog-featured', {
        opacity: 0, y: 40, clipPath: 'inset(0 0 8% 0)',
        duration: 0.75, ease: 'power3.out', delay: 0.25,
      });
      gsap.from('.blog-card', {
        opacity: 0, y: 32, duration: 0.55, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.blog-grid', start: 'top 85%' },
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
      <>
      <Helmet>
        <title>Blog | AstirMind Software Solutions</title>
        <meta
          name="description"
          content="Read the latest articles and insights from AstirMind about web development, AI, software solutions, technology trends, and internship programs."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Blog | AstirMind Software Solutions" />
        <meta property="og:description" content="Read the latest articles and insights from AstirMind about web development, AI, software solutions, technology trends, and internship programs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <div ref={pageRef} style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 68 }}>

        {/* ── Page Header ── */}
        <div className="blog-page-header" style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--line)' }}>
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2000&q=70"
            alt=""
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', filter: 'brightness(0.14) grayscale(30%) contrast(1.15)', pointerEvents: 'none' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,5,3,0.3) 0%, rgba(6,5,3,0.85) 100%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)' }} />

          <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '4rem', paddingBottom: '3.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
              <div>
                <span className="section-label" style={{ color: 'var(--accent)', borderColor: 'rgba(255,255,255,0.12)' }}>Editorial</span>
                <h1 style={{
                  fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                  fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1,
                  color: '#fff', marginTop: '0.75rem',
                }}>
                  Engineering Notes &amp;<br />Training Insights
                </h1>
              </div>
              <p className="t-body" style={{ maxWidth: 380, color: 'rgba(255,255,255,0.55)', alignSelf: 'flex-end' }}>
                Practical writing from our software team and mentors. Focused on projects, training, and internships.
              </p>
            </div>

            {/* Quote */}
            <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <blockquote style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', fontStyle: 'italic', maxWidth: 620 }}>
                "Blogging is just writing — writing using a particularly efficient type of publishing technology."
              </blockquote>
            </div>
          </div>
        </div>

        <div className="container" style={{ paddingTop: '4rem', paddingBottom: '7rem' }}>

          {/* ── Featured Post ── */}
          {showFeaturedCard && (
            <div style={{ marginBottom: '4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Latest post</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--line)' }} />
              </div>
              <FeaturedCard post={featured} />
            </div>
          )}

          {/* ── Category Filter ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Filter</span>
              <div style={{ display: 'flex', border: '1px solid var(--line)', background: 'var(--bg-alt)' }}>
                {CATEGORIES.map(cat => (
                  <button key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: '6px 14px',
                      background: activeCategory === cat ? 'var(--text)' : 'transparent',
                      color: activeCategory === cat ? 'var(--text-inv)' : 'var(--text-3)',
                      border: 'none', cursor: 'pointer',
                      fontFamily: 'var(--font-mono)', fontSize: '0.625rem',
                      textTransform: 'uppercase', letterSpacing: '0.06em',
                      transition: 'all 0.18s',
                    }}
                    onMouseEnter={e => { if (activeCategory !== cat) e.currentTarget.style.color = 'var(--text)'; }}
                    onMouseLeave={e => { if (activeCategory !== cat) e.currentTarget.style.color = 'var(--text-3)'; }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-3)' }}>
              {rest.length} {rest.length === 1 ? 'post' : 'posts'}
            </span>
          </div>

          {/* ── Post Grid ── */}
          <div className="blog-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
            gap: '1px',
            background: 'var(--line)',
            border: '1px solid var(--line)',
          }}>
            {rest.map(post => (
              <div key={post.id} style={{ background: 'var(--bg)' }}>
                <PostCard post={post} />
              </div>
            ))}
          </div>

          {rest.length === 0 && (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
              No posts in this category yet.
            </div>
          )}

        </div>
      </div>
      </>
      );
}
