// src/components/CaseStudies.jsx - UPDATED with working images
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ExternalLink, 
  ArrowUpRight, 
  CheckCircle, 
  Briefcase, 
  Users, 
  TrendingUp, 
  Award,
  GraduationCap
} from 'lucide-react';
import { useMode } from '../context/ModeContext';

gsap.registerPlugin(ScrollTrigger);

// Client Projects with RELIABLE images
const clientProjects = [
  {
    id: '01',
    title: 'Royal Crockery',
    type: 'E-Commerce Platform',
    description: 'A complete e-commerce solution for luxury crockery and kitchenware with secure payment processing, inventory management, and seamless checkout experience.',
    results: [
      '40% increase in online sales within 3 months',
      'Reduced cart abandonment by 25%',
      'Mobile-responsive design with 98% user satisfaction'
    ],
    tags: ['E-Commerce', 'Crockery', 'Kitchenware', 'Payment Gateway'],
    // ✅ WORKING IMAGE - E-commerce/retail
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
    url: '#',
    featured: true,
    category: 'E-Commerce'
  },
  {
    id: '02',
    title: 'GPS Computer Institute',
    type: 'Educational Platform',
    description: 'A comprehensive educational management system with course management, student enrollment, progress tracking, and certification generation.',
    results: [
      'Streamlined enrollment process by 60%',
      '300+ students managed through the platform',
      'Automated certificate generation with online verification'
    ],
    tags: ['Education', 'LMS', 'Course Management', 'Certification'],
    // ✅ WORKING IMAGE - Education/learning
    image: 'https://gpsci.in/images/computer-t.jpg',
    url: 'https://gpsci.com',
    featured: true,
    category: 'Education'
  },
  {
    id: '03',
    title: 'Prime4You Construction',
    type: 'Construction Company Website',
    description: 'A professional website for a construction and renovation company with project portfolio, service showcase, and client inquiry management system.',
    results: [
      '200% increase in client inquiries',
      'Enhanced brand presence and credibility',
      'Showcased 50+ completed projects'
    ],
    tags: ['Construction', 'Portfolio', 'Lead Generation', 'Renovation'],
    // ✅ WORKING IMAGE - Construction/building
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
    url: 'https://prime4you.ca/',
    featured: true,
    category: 'Construction'
  },
  {
    id: '04',
    title: 'BR Metals Genset',
    type: 'Industrial Solutions Website',
    description: 'A comprehensive industrial solutions platform for generators, electrical equipment, and scrap trading with inventory management and inquiry systems.',
    results: [
      'Expanded customer base across India',
      'Streamlined inventory management process',
      'Real-time generator availability tracking'
    ],
    tags: ['Industrial', 'Generators', 'Equipment', 'Scrap Trading'],
    // ✅ WORKING IMAGE - Industrial/engineering
    image: 'https://www.brmetalsgenset.com/images/generator.jpg',
    url: 'https://www.brmetalsgenset.com/',
    featured: true,
    category: 'Industrial'
  },
  {
    id: '05',
    title: 'TS Dining Lounge',
    type: 'Restaurant Website',
    description: 'A modern restaurant website with online reservations, menu management, table booking system, and customer feedback integration.',
    results: [
      'Online reservations increased by 45%',
      'Reduced no-shows with automated reminders',
      'Enhanced customer engagement through digital feedback'
    ],
    tags: ['Restaurant', 'Reservations', 'Menu Management', 'Customer Engagement'],
    // ✅ WORKING IMAGE - Restaurant/dining
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    url: 'http://tsdininglounge.com/',
    featured: true,
    category: 'Restaurant'
  },
  {
    id: '06',
    title: 'LLREIT',
    type: 'Educational Institute Website',
    description: 'A professional educational institute platform with course catalog, student registration, placement support, and alumni networking features.',
    results: [
      'Student enrollment increased by 80%',
      'Placement success rate improved to 92%',
      'Digital presence established with global reach'
    ],
    tags: ['Education', 'Institute', 'Placement', 'Alumni'],
    // ✅ WORKING IMAGE - University/education
    image: 'https://llreit.in/assets/img/360_F_521944677_mgxZzncgczxZbhAPJTRpwWagS39GHt8h3.jpg',
    url: 'https://llreit.in',
    featured: true,
    category: 'Education'
  },
  {
    id: '07',
    title: 'Miss U Gifts',
    type: 'Smart Gifting Platform',
    description: 'An innovative gifting platform with NFC technology integration, enabling instant notifications and personalized gift experiences with real-time delivery tracking.',
    results: [
      '50,000+ NFC-enabled gifts delivered',
      '98% customer satisfaction rate',
      'Real-time notification system with 99.9% uptime'
    ],
    tags: ['E-Commerce', 'NFC Technology', 'Smart Gifts', 'Notifications'],
    // ✅ WORKING IMAGE - Gifts/technology
    image: 'https://www.missu.gifts/media/keychains/soccer23.jpeg',
    url: 'https://missu.gifts/',
    featured: true,
    category: 'E-Commerce'
  }
];

// AI/ML Projects with RELIABLE images
const aiProjects = [
  {
    id: '08',
    title: 'Funding Intelligence',
    type: 'AI Grant Matching Platform',
    description: 'An AI-powered platform using graph analytics and recommendation systems to match organizations with relevant grants, donors, and funding opportunities.',
    results: [
      '90% accuracy in grant matching',
      'Reduced research time by 75%',
      'Successfully matched $2M+ in funding'
    ],
    tags: ['AI Matching', 'Graph Analytics', 'Recommendation System', 'Data Visualization'],
    // ✅ WORKING IMAGE - AI/Data
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    url: '#',
    featured: true,
    category: 'AI/ML'
  },
  {
    id: '09',
    title: 'Notebook LLM Automation Bot',
    type: 'Document Automation Platform',
    description: 'An intelligent automation platform using LLMs for document summarization, audio generation, and automated workflows with cloud integration.',
    results: [
      'Processed 10,000+ documents monthly',
      'Reduced manual work by 80%',
      'Scalable architecture with AWS integration'
    ],
    tags: ['LLM', 'Automation', 'AWS', 'Document Processing'],
    // ✅ WORKING IMAGE - Automation/technology
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=80',
    url: '#',
    featured: true,
    category: 'AI/ML'
  },
  {
    id: '10',
    title: 'AI Lead Generation Bot',
    type: 'Intelligent Recruitment Platform',
    description: 'An AI-powered lead generation and recruitment platform that extracts, processes, and qualifies leads from multiple sources with CRM integration.',
    results: [
      'Generated 5,000+ qualified leads monthly',
      'Automated 90% of recruitment workflows',
      'Integrated with 10+ data sources'
    ],
    tags: ['Lead Generation', 'Web Scraping', 'Automation', 'CRM Integration'],
    // ✅ WORKING IMAGE - Business/leads
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    url: '#',
    featured: true,
    category: 'Automation'
  },
  {
    id: '11',
    title: 'QuickBooks Investment Bot',
    type: 'Financial Automation Platform',
    description: 'A financial automation platform that extracts and structures investment data from QuickBooks for analysis, reporting, and financial planning.',
    results: [
      'Automated 85% of financial data extraction',
      'Real-time investment portfolio tracking',
      'Saved 40+ hours monthly on manual data entry'
    ],
    tags: ['Financial Automation', 'QuickBooks', 'Data Extraction', 'Investment'],
    // ✅ WORKING IMAGE - Finance/business
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
    url: '#',
    featured: true,
    category: 'Automation'
  }
];

// Student Projects with RELIABLE images
const studentProjects = [
  {
    id: 'SP01',
    title: 'E-Commerce Platform with AI Recommendations',
    type: 'Student Capstone Project',
    description: 'A full-featured e-commerce platform with AI-powered product recommendations, real-time inventory management, and secure payment gateway integration.',
    students: ['Priya S.', 'Arjun M.'],
    technologies: ['React', 'Python', 'MongoDB', 'OpenAI API', 'Stripe'],
    // ✅ WORKING IMAGE
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
    featured: true
  },
  {
    id: 'SP02',
    title: 'Healthcare Patient Management System',
    type: 'Student Capstone Project',
    description: 'A comprehensive patient management system with appointment scheduling, EHR integration, telemedicine features, and HIPAA-compliant data security.',
    students: ['Rahul T.', 'Divya N.'],
    technologies: ['Flutter', 'Firebase', 'Node.js', 'PostgreSQL', 'Twilio'],
    // ✅ WORKING IMAGE
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    featured: true
  },
  {
    id: 'SP03',
    title: 'FinTech Mobile Banking App',
    type: 'Student Capstone Project',
    description: 'A secure mobile banking application with biometric authentication, real-time transaction tracking, budget planning, and investment portfolio management.',
    students: ['Farida K.', 'Ananya R.'],
    technologies: ['Kotlin', 'Jetpack Compose', 'Spring Boot', 'MySQL', 'AWS'],
    // ✅ WORKING IMAGE
    image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=1200&q=80',
    featured: true
  },
  {
    id: 'SP04',
    title: 'AI-Powered Content Generation Tool',
    type: 'Student Capstone Project',
    description: 'An intelligent content generation platform leveraging LLMs for blog writing, social media posts, and marketing copy with customization options.',
    students: ['Priya S.', 'Arjun M.'],
    technologies: ['Python', 'FastAPI', 'LangChain', 'Vector Databases', 'React'],
    // ✅ WORKING IMAGE
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    featured: true
  },
  {
    id: 'SP05',
    title: 'Smart IoT Home Automation Dashboard',
    type: 'Student Capstone Project',
    description: 'A real-time IoT dashboard for controlling smart home devices with voice commands, automation rules, and energy consumption analytics.',
    students: ['Rahul T.', 'Divya N.'],
    technologies: ['React Native', 'Node.js', 'MQTT', 'InfluxDB', 'AWS IoT'],
    // ✅ WORKING IMAGE
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
    featured: true
  },
  {
    id: 'SP06',
    title: 'Online Learning Management System',
    type: 'Student Capstone Project',
    description: 'A complete LMS with video streaming, assessment tools, progress tracking, certification generation, and instructor analytics dashboard.',
    students: ['Farida K.', 'Ananya R.'],
    technologies: ['Django', 'React', 'PostgreSQL', 'Redis', 'WebRTC'],
    // ✅ WORKING IMAGE
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    featured: true
  },
  {
    id: 'SP07',
    title: 'Real Estate Property Finder',
    type: 'Student Capstone Project',
    description: 'A property discovery platform with advanced search filters, map integration, property valuation tools, and virtual tour capabilities.',
    students: ['Priya S.', 'Rahul T.'],
    technologies: ['Next.js', 'TypeScript', 'MongoDB', 'Mapbox', 'ElasticSearch'],
    // ✅ WORKING IMAGE
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    featured: true
  },
  {
    id: 'SP08',
    title: 'Food Delivery Optimizer',
    type: 'Student Capstone Project',
    description: 'A logistics optimization platform for food delivery with real-time tracking, route optimization, driver management, and customer analytics.',
    students: ['Arjun M.', 'Divya N.'],
    technologies: ['Flutter', 'Go', 'Redis', 'Kafka', 'PostgreSQL'],
    // ✅ WORKING IMAGE
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80',
    featured: true
  }
];

// Component for displaying a single case study
function CaseStudyCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="case-study-card"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--line)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.2s, transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s',
        height: '100%',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--line-light)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 20px 44px rgba(0,0,0,0.24)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--line)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 220, overflow: 'hidden', background: 'var(--bg-alt)' }}>
        {!imageError ? (
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.85) contrast(1.05)',
              transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            onError={() => setImageError(true)}
          />
        ) : (
          // Fallback when image fails to load
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-elevated)',
            color: 'var(--text-3)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem'
          }}>
            {project.title}
          </div>
        )}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, transparent 50%, rgba(6,5,3,0.7) 100%)'
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'var(--accent)'
        }} />
        
        {/* Tags */}
        <div style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap'
        }}>
          {project.tags?.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                color: 'rgba(255,255,255,0.8)',
                background: 'rgba(6,5,3,0.6)',
                backdropFilter: 'blur(4px)',
                padding: '3px 10px',
                border: '1px solid rgba(255,255,255,0.1)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              {tag}
            </span>
          ))}
          {project.tags?.length > 3 && (
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5rem',
              color: 'rgba(255,255,255,0.6)',
              background: 'rgba(6,5,3,0.6)',
              padding: '3px 10px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Content - Same as before */}
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              color: 'var(--accent)',
              letterSpacing: '0.08em'
            }}>
              {project.id}
            </span>
            <h3 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
              fontWeight: 700,
              color: 'var(--text)',
              marginTop: '0.25rem',
              letterSpacing: '-0.02em'
            }}>
              {project.title}
            </h3>
          </div>
          {project.url && project.url !== '#' && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                color: 'var(--accent)',
                textDecoration: 'none',
                padding: '4px 10px',
                border: '1px solid var(--accent)',
                opacity: 0.8,
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
            >
              Visit <ExternalLink size={10} />
            </a>
          )}
        </div>

        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.875rem',
          lineHeight: 1.7,
          color: 'var(--text-2)',
          margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: expanded ? 'none' : 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {project.description}
        </p>

        {/* Results */}
        {project.results && (
          <div style={{ marginTop: '0.5rem' }}>
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                color: 'var(--accent)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              {expanded ? 'Show Less' : 'View Results'}
              <ArrowUpRight size={12} style={{ transform: expanded ? 'rotate(135deg)' : 'none' }} />
            </button>

            {expanded && (
              <ul style={{
                marginTop: '0.75rem',
                padding: 0,
                listStyle: 'none'
              }}>
                {project.results.map((result, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      padding: '0.4rem 0',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8125rem',
                      color: 'var(--text-2)',
                      borderBottom: i < project.results.length - 1 ? '1px solid var(--line)' : 'none'
                    }}
                  >
                    <CheckCircle size={14} color="var(--accent)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Students (for student projects) */}
        {project.students && (
          <div style={{
            marginTop: 'auto',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--line)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Users size={14} color="var(--text-3)" />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              color: 'var(--text-3)'
            }}>
              {project.students.join(' • ')}
            </span>
          </div>
        )}

        {/* Technologies (for student projects) */}
        {project.technologies && (
          <div style={{
            display: 'flex',
            gap: '0.375rem',
            flexWrap: 'wrap',
            marginTop: '0.5rem'
          }}>
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  color: 'var(--text-3)',
                  border: '1px solid var(--line)',
                  padding: '2px 8px',
                  background: 'var(--bg-alt)'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Main Client Case Studies Component
export function ClientCaseStudies() {
  const sectionRef = useRef(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(clientProjects.map(p => p.category))];
  
  const filteredProjects = filter === 'All' 
    ? clientProjects 
    : clientProjects.filter(p => p.category === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.case-header', {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%'
        }
      });

      gsap.from('.case-study-card', {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.case-grid',
          start: 'top 85%'
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '5rem 0',
        borderBottom: '1px solid var(--line)',
        background: 'var(--bg)'
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="case-header" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Briefcase size={24} color="var(--accent)" />
            <span className="section-label">Client Case Studies</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
            <h2 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              color: 'var(--text)',
              marginTop: '0.25rem'
            }}>
              Real Results for <br />
              <span style={{ color: 'var(--accent)' }}>Real Businesses</span>
            </h2>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9375rem',
              color: 'var(--text-3)',
              maxWidth: 380,
              lineHeight: 1.7
            }}>
              From startups to enterprises — see how we've helped businesses achieve measurable growth through custom technology solutions.
            </p>
          </div>

          {/* Filter */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            marginTop: '1.5rem',
            borderTop: '1px solid var(--line)',
            paddingTop: '1.5rem'
          }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '6px 16px',
                  background: filter === cat ? 'var(--text)' : 'transparent',
                  color: filter === cat ? 'var(--text-inv)' : 'var(--text-3)',
                  border: '1px solid var(--line)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.625rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  transition: 'all 0.18s'
                }}
                onMouseEnter={e => {
                  if (filter !== cat) {
                    e.currentTarget.style.borderColor = 'var(--line-light)';
                    e.currentTarget.style.color = 'var(--text)';
                  }
                }}
                onMouseLeave={e => {
                  if (filter !== cat) {
                    e.currentTarget.style.borderColor = 'var(--line)';
                    e.currentTarget.style.color = 'var(--text-3)';
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="case-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
          gap: '1px',
          border: '1px solid var(--line)',
          background: 'var(--line)'
        }}>
          {filteredProjects.map((project, index) => (
            <div key={project.id} style={{ background: 'var(--bg)' }}>
              <CaseStudyCard project={project} index={index} />
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div style={{
            padding: '3rem',
            textAlign: 'center',
            border: '1px solid var(--line)',
            background: 'var(--bg-alt)',
            color: 'var(--text-3)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem'
          }}>
            No case studies found in this category.
          </div>
        )}

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1px',
          border: '1px solid var(--line)',
          background: 'var(--line)',
          marginTop: '2rem'
        }}>
          {[
            { icon: Award, value: clientProjects.length, label: 'Case Studies' },
            { icon: Users, value: '98%', label: 'Client Satisfaction' },
            { icon: TrendingUp, value: '150%+', label: 'Average ROI' },
            { icon: CheckCircle, value: '200+', label: 'Projects Delivered' }
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                padding: '1.5rem',
                textAlign: 'center',
                background: 'var(--bg-card)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-elevated)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-card)'}
            >
              <stat.icon size={24} color="var(--accent)" strokeWidth={1.5} />
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                fontWeight: 700,
                color: 'var(--text)',
                letterSpacing: '-0.02em'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                color: 'var(--text-3)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Student Projects Component
export function StudentProjects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.student-header', {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%'
        }
      });

      gsap.from('.student-card', {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.student-grid',
          start: 'top 85%'
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '5rem 0',
        borderBottom: '1px solid var(--line)',
        background: 'var(--bg-alt)'
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="student-header" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <GraduationCap size={24} color="var(--accent)" />
            <span className="section-label">Student Projects</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
            <h2 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.1,
              color: 'var(--text)',
              marginTop: '0.25rem'
            }}>
              What Our <br />
              <span style={{ color: 'var(--accent)' }}>Students Build</span>
            </h2>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9375rem',
              color: 'var(--text-3)',
              maxWidth: 380,
              lineHeight: 1.7
            }}>
              Real projects built by our students during internships and training programs — with mentor guidance and industry standards.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="student-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
          gap: '1px',
          border: '1px solid var(--line)',
          background: 'var(--line)'
        }}>
          {studentProjects.map((project, index) => (
            <div key={project.id} style={{ background: 'var(--bg)' }}>
              <CaseStudyCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Combined export
export default function CaseStudies() {
  const { mode } = useMode();
  
  return (
    <>
      <ClientCaseStudies />
      <StudentProjects />
    </>
  );
}