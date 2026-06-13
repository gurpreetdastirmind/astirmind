import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone } from 'lucide-react';


import metalImg from '../assets/metal.jpeg'
import constructImg from '../assets/construct.jpeg'
import gpsImg from '../assets/gpsci.avif'
// import tsImg from '../assets/tsdining.png'
import llreitImg from '../assets/llreit.png'
import crockeryImg from '../assets/crockery.jpeg'
import fundingIntelligenceImg from '../assets/graph.avif'
import notebookLLMImg from '../assets/graph.avif'
import leadImg from '../assets/lead.jpeg'
import quickbooksBotImg from '../assets/finance.jpeg'
import missUGiftsImg from '../assets/finance.jpeg'


gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ['All', 'Websites', 'AI/ML'];

const projects = [
  {
  id: '01',
  category: 'E-Commerce',
  title: 'Royal Crockery',
  type: 'E-Commerce Website',
  tags: ['E-Commerce', 'Crockery', 'Kitchenware', 'Home Decor'],
  url: '',
  featured: true,
  image:crockeryImg},


{
  id: '02',
  category: 'Education',
  title: 'GPS Computer Institute',
  type: 'Educational Platform',
  tags: ['Computer Education', 'Programming', 'Web Development', 'Digital Skills'], 
  url: 'https://gpsci.com',
  featured: false,
  image: gpsImg
},

{
  id: '03',
  category: 'Construction',
  title: 'Prime4You Construction',
  type: 'Construction & Renovation Company Website',
  tags: ['Construction', 'Renovation', 'Residential Projects', 'Interior Design'],
  url: 'https://prime4you.ca/',
  featured: true,
  image: constructImg
},
{
  id: '04',
  category: 'Industrial',
  title: 'BR Metals Genset',
  type: 'Industrial Power Solutions & Scrap Trading Website',
  tags: ['Generators', 'Electrical Equipment', 'Industrial Scrap', 'Metal Trading'],
  url: 'https://www.brmetalsgenset.com/',
  featured: true,
  image: metalImg
},

{
  id: '05',
  category: 'Restaurant',
  title: 'TS Dining',
  type: 'Restaurant Website',
  tags: ['Restaurant', 'Dining', 'Lounge', 'Food & Beverages'],
  url: 'http://tsdininglounge.com/',
  featured: true,
  image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80'
},


{
  id: '06',
  category: 'Education',
  title: 'LLREIT',
  type: 'Educational Institute Website',
  tags: ['Higher Education', 'Skill Development', 'Professional Courses', 'Computer Training'],
  url: 'https://llreit.in',
  featured: true,
  image: llreitImg
},
{
  id: '07',
  category: 'AI/ML',
  title: 'Funding Intelligence',
  type: 'Grant & Donor Matching Intelligence Platform',
  tags: ['AI Matching', 'Graph Analytics', 'Data Visualization', 'Recommendation System'],
  url: '',
  featured: true,
  image: fundingIntelligenceImg
},
{
  id: '08',
  category: 'AI/ML',
  title: 'Notebook LLM Automation Bot',
  type: 'Document Summarization & Audio Generation Automation Platform',
  tags: ['LLM', 'Automation', 'Selenium', 'AWS SQS', 'AWS S3', 'GoLogin'],
  url: '',
  featured: true,
  image: notebookLLMImg
},
{
  id: '9',
  category: 'Automation',
  title: 'AI Lead Generation Bot',
  type: 'Automated Recruitment & Lead Intelligence Platform',
  tags: [
    'LinkedIn',
    'Indeed',
    'Glassdoor',
    'ZipRecruiter',
    'ZenRows',
    'Apollo',
    'Zoho CRM',
    'Web Scraping',
    'Lead Generation',
    'Automation'
  ],
  url: '',
  featured: true,
  image: leadImg
},
{
  id: '10',
  category: 'Automation',
  title: 'QuickBooks Investment Automation Bot',
  type: 'Investment Data Extraction & Financial Structuring Platform',
  tags: [
    'QuickBooks',
    'Financial Automation',
    'Investment Software',
    'Data Extraction',
    'Web Scraping',
    'Accounting Integration',
    'Structured Data',
    'Automation'
  ],
  url: '',
  featured: true,
  image: quickbooksBotImg
},
{
  id: '11',
  category: 'E-Commerce',
  title: 'Miss U Gifts',
  type: 'Smart Gifting & NFC Notification Platform',
  tags: [
    'E-Commerce',
    'Smart Gifts',
    'NFC Technology',
    'Instant Notifications',
    'Couple Connectivity',
    'Interactive Products',
    'Real-Time Alerts'
  ],
  url: 'https://missu.gifts/',
  featured: true,
  image: missUGiftsImg
}
  // { id: '02', category: 'Websites', title: 'QuickJobs4u', type: 'Job Marketplace', tags: ['PHP', 'MySQL', 'Bootstrap'], url: 'http://www.quickjobs4u.com.au', featured: false, image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80' },
  // { id: '03', category: 'Websites', title: 'My Ghosla', type: 'Interior Platform', tags: ['Angular', 'Django', 'AWS'], url: 'https://www.myghosla.com/', featured: false, image: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1400&q=80' },
  // { id: '04', category: 'Websites', title: 'StyleBrigade', type: 'Booking Platform', tags: ['React', 'Node.js', 'MongoDB'], url: 'https://stylebrigade.co/', featured: true, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80' },
  // { id: '05', category: 'Apps', title: 'Spice Kitchen', type: 'Mobile App', tags: ['Android', 'Java', 'Firebase'], url: '#', featured: false, image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80' },
  // { id: '06', category: 'Apps', title: 'Eye Oscar', type: 'Utility App', tags: ['React Native', 'Firebase'], url: '#', featured: false, image: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=900&q=80' },
];

function BrowserChrome() {
  return (
    <div style={{ background: 'var(--bg)', borderBottom: '1px solid var(--line)', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 5 }}>
      <div style={{ width: 6, height: 6, background: 'var(--line-light)' }} />
      <div style={{ width: 6, height: 6, background: 'var(--line-light)' }} />
      <div style={{ width: 6, height: 6, background: 'var(--line-light)' }} />
      <div style={{ flex: 1, marginLeft: 6, height: 14, background: 'var(--bg-alt)', border: '1px solid var(--line)' }} />
    </div>
  );
}

function WebsitePreview({ image, title }) {
  return (
    <div style={{ minHeight: 170, border: '1px solid var(--line)', overflow: 'hidden', position: 'relative' }}>
      <img src={image} alt={title} style={{ width: '100%', height: 185, objectFit: 'cover', display: 'block', filter: 'brightness(0.9) contrast(1.05)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,5,3,0.0) 40%, rgba(6,5,3,0.42) 100%)' }} />
      <div style={{ position: 'absolute', left: 12, right: 12, bottom: 10, height: 3, background: 'var(--accent)', width: '32%' }} />
    </div>
  );
}

function AppPreview({ image, title }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '14px 0', minHeight: 170, background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.005))' }}>
      <div style={{ width: '68%', border: '1px solid var(--line)', background: 'rgba(255,255,255,0.03)', padding: '10px 10px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Smartphone size={15} color="var(--text-2)" strokeWidth={1.6} />
          <div style={{ height: 4, width: 50, background: 'var(--accent)' }} />
        </div>
        <div style={{ border: '1px solid var(--line)', overflow: 'hidden', height: 130, position: 'relative' }}>
          <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.88) contrast(1.05)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,5,3,0.0) 50%, rgba(6,5,3,0.35) 100%)' }} />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const isLive = project.url !== '#';

  return (
    <a href={isLive ? project.url : undefined} target={isLive ? '_blank' : undefined} rel="noopener noreferrer"
      style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div className="work-card" style={{
        background: 'var(--bg)', border: '1px solid var(--line)',
        overflow: 'hidden', height: '100%',
        display: 'flex', flexDirection: 'column',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
        transition: 'border-color 0.2s, transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s',
      }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'var(--line-light)';
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.03), 0 20px 44px rgba(0,0,0,0.24)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--line)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.03)';
        }}
      >
        <BrowserChrome />
        <div style={{ padding: '1.125rem', flex: 1, background: 'linear-gradient(180deg, rgba(255,255,255,0.02), transparent)' }}>
          {project.category === 'Apps' ? <AppPreview image={project.image} title={project.title} /> : <WebsitePreview image={project.image} title={project.title} />}
        </div>
        <div style={{ padding: '1rem', borderTop: '1px solid var(--line)', background: 'var(--bg-alt)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--accent)', marginBottom: 3 }}>{project.id}</div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 2 }}>{project.title}</h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-3)' }}>{project.type}</div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0, marginTop: 4 }}>
              {isLive ? 'Visit' : 'Case'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
            {project.tags.map((tag, j) => <span key={j} className="badge-raw" style={{ fontSize: '0.5rem' }}>{tag}</span>)}
          </div>
        </div>
      </div>
    </a>
  );
}

export default function Work() {
  const [active, setActive] = useState('All');
  const sectionRef = useRef(null);
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from('.work-header', {
        opacity: 0, y: 24, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
      });

      gsap.from('.work-card', {
        clipPath: 'inset(0 0 100% 0)',
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.work-grid', start: 'top 82%' },
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" style={{ padding: '7rem 0', borderBottom: '1px solid var(--line)', background: 'var(--bg)' }}>
      <div className="container">

        {/* Header */}
        <div className="work-header" style={{ marginBottom: '3rem' }}>
          <span className="section-label">Selected Work</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
            <h2 className="t-h2">We Ship Real Things.</h2>
            <div style={{ display: 'flex', border: '1px solid var(--line)', background: 'var(--bg-alt)' }}>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActive(cat)}
                  style={{ padding: '6px 16px', background: active === cat ? 'var(--text)' : 'transparent',
                    color: active === cat ? 'var(--text-inv)' : 'var(--text-3)', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.06em',
                    transition: 'all 0.18s' }}>{cat}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Project grid */}
        <div className="work-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          background: 'var(--line)',
          border: '1px solid var(--line)',
        }}>
          {filtered.map((project) => (
            <div key={project.id} style={{ gridColumn: project.featured ? 'span 2' : 'span 1' }}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
