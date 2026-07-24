  import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Helmet } from 'react-helmet';
import { OrganizationSchema, BreadcrumbSchema } from './Schema'; 
import {
  Brain, Cloud, MonitorCog, Bot, LayoutDashboard, Workflow, MessageSquareMore, BarChart3, Layers3, Palette, ShoppingCart, Megaphone, BriefcaseBusiness, ShieldCheck, GraduationCap, PenTool, Smartphone, TerminalSquare, Database, Eye, Cpu, Globe, CloudSun, Target, TrendingUp, LineChart, Code2, Layout, Code, Phone, Star, Atom, Calculator
} from 'lucide-react';
import { useMode } from '../context/ModeContext';
import { Link } from 'react-router-dom';
import { useGoogleRating } from '../hooks/useGoogleRating';
import { courses } from './Services';

gsap.registerPlugin(ScrollTrigger);

// Google Star Rating Component
function GoogleStarRating({ rating, total = 5 }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {[...Array(total)].map((_, i) => (
        <Star 
          key={i}
          size={14} 
          strokeWidth={1.5}
          fill={i < fullStars ? 'var(--accent)' : (i === fullStars && hasHalfStar ? 'var(--accent)' : 'none')}
          style={{ 
            color: i < fullStars || (i === fullStars && hasHalfStar) ? 'var(--accent)' : 'var(--line)',
            opacity: i < fullStars || (i === fullStars && hasHalfStar) ? 1 : 0.3
          }}
        />
      ))}
    </div>
  );
}

// Complete Icon Map - All icons used in courses
const ICON_MAP = {
  Brain: Brain,
  Globe: Globe,
  Database: Database,
  Eye: Eye,
  Smartphone: Smartphone,
  Cpu: Cpu,
  TerminalSquare: TerminalSquare,
  PenTool: PenTool,
  Bot: Bot,
  Cloud: Cloud,
  MonitorCog: MonitorCog,
  Layout: Layout,
  Code2: Code2,
  Phone: Phone,
  Code: Code,
  CloudSun: CloudSun,
  Target: Target,
  LineChart: LineChart,
  Atom: Atom,
  Calculator: Calculator,
  // Add any other icons your courses might use
};

function getIcon(icon) {
  // If icon is already a React component, return it
  if (icon && typeof icon === 'function') {
    return icon;
  }
  // If icon is a string, look it up in the map
  if (typeof icon === 'string') {
    return ICON_MAP[icon] || Brain;
  }
  // Fallback
  return Brain;
}

export const agencyServices = [
  {
    n: '01',
    slug: 'ml-ai-solutions',
    title: 'ML & AI Solutions',
    desc: 'AstirMind leverages Machine Learning, Automatic Speech Recognition (ASR), Image Recognition, Text-to-Speech, and AI-driven systems to build intelligent and scalable digital solutions.',
    tags: ['Machine Learning', 'ASR', 'AI Automation', 'Computer Vision'],
    Icon: Brain,
  },
  {
    n: '02',
    slug: 'automation-solutions',
    title: 'Automation Solutions',
    desc: 'We build intelligent automation systems for lead generation, workflow automation, browser automation, CRM integrations, and business process optimization.',
    tags: ['Automation', 'Selenium', 'CRM', 'Workflow Systems'],
    Icon: Bot,
  },
  {
    n: '03',
    slug: 'web-development',
    title: 'Web Development',
    desc: 'We craft modern, responsive, and high-performance websites and web applications focused on scalability, accessibility, and user experience.',
    tags: ['React', 'Next.js', 'Node.js', 'Django'],
    Icon: MonitorCog,
  },
  {
    n: '04',
    slug: 'mern-stack-development',
    title: 'MERN Stack Development',
    desc: 'Build full-stack JavaScript applications using MongoDB, Express.js, React, and Node.js. We create scalable, high-performance web apps with seamless frontend-backend integration, real-time features, and robust REST APIs.',
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'REST APIs', 'Full Stack'],
    Icon: Globe,
  },
  {
    n: '05',
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    desc: 'AstirMind builds feature-rich Android and cross-platform mobile applications designed for performance, usability, and business growth.',
    tags: ['Android', 'React Native', 'Flutter', 'Mobile UI'],
    Icon: Smartphone,
  },
  {
    n: '06',
    slug: 'cms-mvc-development',
    title: 'CMS & MVC Development',
    desc: 'We develop scalable CMS and MVC-based platforms tailored for businesses across multiple industries with secure and efficient architectures.',
    tags: ['Django', 'Laravel', 'CMS', 'MVC'],
    Icon: LayoutDashboard,
  },
  {
    n: '07',
    slug: 'cloud-consulting',
    title: 'Cloud Consulting',
    desc: 'AstirMind helps businesses migrate, optimize, and scale applications on cloud platforms with secure infrastructure and growth-focused strategies.',
    tags: ['AWS', 'Cloud Infrastructure', 'DevOps', 'Scalability'],
    Icon: Cloud,
  },
  {
    n: '08',
    slug: 'api-development-integrations',
    title: 'API Development & Integrations',
    desc: 'Secure and scalable REST API development with seamless third-party integrations including CRMs, payment gateways, cloud services, and enterprise tools.',
    tags: ['REST APIs', 'DRF', 'Microservices', 'Integrations'],
    Icon: Workflow,
  },
  {
    n: '09',
    slug: 'ai-chatbots-conversational-ai',
    title: 'AI Chatbots & Conversational AI',
    desc: 'Building intelligent AI-powered assistants, customer support bots, document assistants, and conversational systems using modern LLM technologies.',
    tags: ['LLM', 'Chatbots', 'OpenAI', 'Conversational AI'],
    Icon: MessageSquareMore,
  },
  {
    n: '10',
    slug: 'data-analytics-visualization',
    title: 'Data Analytics & Visualization',
    desc: 'Transforming raw data into meaningful insights through interactive dashboards, reporting systems, graph analytics, and business intelligence solutions.',
    tags: ['Analytics', 'Dashboards', 'Data Visualization', 'Business Intelligence'],
    Icon: BarChart3,
  },
  {
    n: '11',
    slug: 'saas-product-development',
    title: 'SaaS Product Development',
    desc: 'End-to-end SaaS application development including scalable architectures, subscription systems, dashboards, and cloud-native platforms.',
    tags: ['SaaS', 'Cloud Apps', 'Multi-Tenant', 'Subscriptions'],
    Icon: Layers3,
  },
  {
    n: '12',
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    desc: 'We create intuitive, visually engaging, and user-focused interfaces that align perfectly with client goals and modern design standards.',
    tags: ['Figma', 'UI Design', 'UX Research', 'Wireframing'],
    Icon: Palette,
  },
  {
    n: '13',
    slug: 'ecommerce-development',
    title: 'E-Commerce Development',
    desc: 'AstirMind develops scalable e-commerce platforms with secure payment systems, optimized user journeys, and seamless shopping experiences.',
    tags: ['E-Commerce', 'Shopify', 'WooCommerce', 'Payment Gateway'],
    Icon: ShoppingCart,
  },
  {
    n: '14',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    desc: 'We help brands grow digitally through strategic marketing, lead generation, SEO, social media campaigns, and performance-driven advertising.',
    tags: ['SEO', 'Branding', 'Lead Generation', 'Social Media'],
    Icon: Megaphone,
  },
  {
    n: '15',
    slug: 'erp-crm-solutions',
    title: 'ERP & CRM Solutions',
    desc: 'Custom ERP and CRM platforms designed to streamline operations, manage workflows, improve productivity, and centralize business management.',
    tags: ['ERP', 'CRM', 'Business Automation', 'Enterprise Solutions'],
    Icon: BriefcaseBusiness,
  },
  {
    n: '16',
    slug: 'internship-project-assistance',
    title: 'Internship & Project Assistance',
    desc: 'AstirMind provides industry-oriented internships, project guidance, and practical training in web development, AI, mobile development, and UI/UX.',
    tags: ['Training', 'Internships', 'Project Mentorship', 'Skill Development'],
    Icon: GraduationCap,
  },
  {
    n: '17',
    slug: 'blockchain-crypto-solutions',
    title: 'Blockchain & Crypto Solutions',
    desc: 'Build decentralized applications (dApps), smart contracts, tokenomics, and secure crypto wallets. We help enterprises leverage blockchain for transparency, traceability, and trustless transactions across industries like finance, supply chain, and real estate.',
    tags: ['Blockchain', 'Smart Contracts', 'Web3', 'Solidity', 'Crypto Wallets', 'dApps'],
    Icon: ShieldCheck,
  },
  {
    n: '18',
    slug: 'devops-cicd-solutions',
    title: 'DevOps & CI/CD Solutions',
    desc: 'Automate your software delivery lifecycle with robust CI/CD pipelines, infrastructure as code, container orchestration, and 24/7 monitoring. We help teams ship faster, rollback safely, and scale without downtime.',
    tags: ['CI/CD', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Terraform', 'Monitoring'],
    Icon: TrendingUp,
  },
  {
    n: '19',
    slug: 'iot-emerging-technologies',
    title: 'IoT & Emerging Technologies',
    desc: 'Connect the physical and digital worlds with custom IoT solutions — from sensor networks and edge computing to cloud dashboards. We also explore AR/VR, computer vision at the edge, and next-gen hardware integrations.',
    tags: ['IoT', 'Edge Computing', 'Sensor Networks', 'MQTT', 'ESP32', 'Arduino', 'AR/VR'],
    Icon: Cpu,
  },
  {
    n: '20',
    slug: 'data-scraping-workflow-automations',
    title: 'Data Scraping & Workflow Automations',
    desc: 'Extract structured data from websites, APIs, and documents at scale. Build end-to-end automation workflows that trigger actions, sync data across platforms, and eliminate manual repetitive tasks. Perfect for lead generation, market research, price monitoring, and operational efficiency.',
    tags: ['Web Scraping', 'Workflow Automation', 'Data Extraction', 'Zapier', 'Make', 'Python', 'Selenium', 'APIs'],
    Icon: Workflow,
  },
];

export default function CoursesPage() {
  const { mode } = useMode();
  const sectionRef = useRef(null);
  const [programs, setPrograms] = useState([]);
  
  // Get Google Rating dynamically
  const { rating: googleRating, loading: ratingLoading } = useGoogleRating();

  // Use local courses data from Services.jsx
  useEffect(() => {
    const mappedPrograms = courses.map((course, index) => ({
      ...course,
      order: index + 1,
      // Use the Icon directly from the course data
      IconComponent: course.Icon || getIcon(course.icon_name),
      tagline: course.desc.split('.')[0] + '.',
      overview: course.desc,
      duration: course.tags.find(t => t.includes('Week') || t.includes('Months') || t.includes('days') || t.includes('Hours')) || 'Flexible',
      format: 'Hybrid',
      has_certificate: course.tags.includes('Certification'),
      has_internship: course.tags.includes('Internship'),
      tools: course.tags.filter(t => 
        !t.includes('Week') && 
        !t.includes('Months') && 
        !t.includes('days') &&
        !t.includes('Hours') &&
        !t.includes('Project') && 
        !t.includes('Certification') && 
        !t.includes('Internship') && 
        !t.includes('Mentor') && 
        !t.includes('Campaign')
      ),
    }));
    
    setPrograms(mappedPrograms);
  }, []);

  // Hero animation
  useEffect(() => {
    if (!programs.length) return;
    
    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll('.prog-hero-in');
      if (elements.length) {
        gsap.from(elements, {
          opacity: 0, y: 24, duration: 0.65, stagger: 0.1, ease: 'power2.out',
        });
      }
      
      gsap.from('.program-card', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.programs-grid', start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [programs]);

  const isAgency = mode === 'Xperience';
  const items = isAgency ? agencyServices : programs;

  if (!items.length) {
    return (
      <div style={{ paddingTop: 68, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', color: 'var(--text)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-3)', marginBottom: '1rem' }}>No programs available</div>
        </div>
      </div>
    );
  }

  return (
    <>
        <Helmet>
        <title>Internship Programs | AstirMind Software Solutions</title>
        <meta
          name="description"
          content="Explore AstirMind's internship and training programs in web development, AI, mobile development, data science, and more. Gain hands-on experience with real projects."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Internship Programs | AstirMind Software Solutions" />
        <meta property="og:description" content="Explore AstirMind's internship and training programs in web development, AI, mobile development, data science, and more." />
        <meta property="og:type" content="website" />
      </Helmet>

       <OrganizationSchema />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Courses', url: '/courses' }
      ]} />
      
      <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 68 }}>

        {/* ── Page header ── */}
        <div ref={sectionRef} style={{
          position: 'relative', overflow: 'hidden',
          borderBottom: '1px solid var(--line)',
          backgroundImage: 'url(/img/page-header-training.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.92) 50%, rgba(10,10,10,0.55) 100%)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)', zIndex: 2 }} />
          <div style={{ position: 'absolute', right: '-1rem', top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-mono)', fontSize: 'clamp(6rem, 18vw, 14rem)', fontWeight: 700, color: 'rgba(255,255,255,0.04)', letterSpacing: '-0.05em', userSelect: 'none', pointerEvents: 'none', lineHeight: 1, zIndex: 1 }}>
            LEARN
          </div>
          <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', position: 'relative', zIndex: 2 }}>
            <span className="prog-hero-in section-label" style={{ color: 'var(--accent)', borderColor: 'rgba(255,255,255,0.15)' }}>AstirMind Institute</span>
            <h1 className="prog-hero-in" style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1.05, marginBottom: '1rem' }}>
              Programs & Courses
            </h1>
            <p className="prog-hero-in" style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', maxWidth: 500, marginBottom: '2.5rem' }}>
              Every program runs on live projects with working mentors. You graduate with a portfolio, code in production, and the experience companies look for.
            </p>
            <div className="prog-hero-in programs-stat-row" style={{ display: 'flex', flexWrap: 'wrap' }}>
              {[
                { v: `${items.length}`, l: 'Programs' },
                { v: `${items.filter(p => p.has_internship).length}`, l: 'Internship Tracks' },
                { v: `${items.filter(p => p.has_certificate).length}`, l: 'Certified' },
                { v: '100%', l: 'Project-Based' },
              ].map(({ v, l }, i) => (
                <div key={l} style={{ padding: '0.875rem 1.75rem', borderRight: '1px solid rgba(255,255,255,0.12)', borderLeft: i === 0 ? '1px solid rgba(255,255,255,0.12)' : 'none', background: 'rgba(255,255,255,0.04)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '-0.03em', lineHeight: 1 }}>{v}</div>
                  <div className="t-mono" style={{ fontSize: '0.5625rem', color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Programs Grid ── */}
        <div className="container" style={{ padding: '4rem 0' }}>
          <div className="programs-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
            gap: '1px',
            border: '1px solid var(--line)',
            background: 'var(--line)',
          }}>
            {items.map((program, index) => {
              // Get the icon - if it's a course from the courses array, use IconComponent
              // If it's from agencyServices, use Icon directly
              let Icon;
              if (isAgency) {
                Icon = program.Icon || Brain;
              } else {
                Icon = program.IconComponent || getIcon(program.icon_name) || Brain;
              }
              
              return (
                <Link
                  key={program.slug || index}
                  to={isAgency ? `/services/${program.slug}` : `/courses/${program.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
                >
                  <div
                    className="program-card"
                    style={{
                      background: 'var(--bg-card)',
                      padding: '2.5rem',
                      height: '100%',
                      minHeight: 380,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.25rem',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
                      transition: 'background 0.2s, transform 0.25s, box-shadow 0.25s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--bg-elevated)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.04), 0 12px 30px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'var(--bg-card)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.03)';
                    }}
                  >
                    {/* Header: Number + Icon */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--accent)', letterSpacing: '0.08em' }}>
                        {String(program.order || program.n || index + 1).padStart(2, '0')}
                      </span>
                      <span style={{ width: 28, height: 28, color: 'var(--text-2)' }}>
                        <Icon size={28} strokeWidth={1.5} />
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(1rem, 1.8vw, 1.375rem)',
                        fontWeight: 700,
                        marginBottom: '0.5rem',
                        letterSpacing: '-0.02em',
                        color: 'var(--text)'
                      }}>
                        {program.title}
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.875rem',
                        lineHeight: 1.65,
                        color: 'var(--text-2)',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        {program.desc}
                      </p>
                    </div>

                    {/* Google Rating Section - Dynamic from Google */}
                    {!ratingLoading ? (
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem', 
                        flexWrap: 'wrap'
                      }}>
                        <GoogleStarRating rating={googleRating.ratingValue} />
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.5625rem',
                          color: 'var(--text-2)',
                          fontWeight: 600
                        }}>
                          {googleRating.ratingValue.toFixed(1)}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.5rem',
                          color: 'var(--text-3)'
                        }}>
                          ({googleRating.reviewCount.toLocaleString()} Google reviews)
                        </span>
                      </div>
                    ) : (
                      <div style={{ 
                        display: 'flex', 
                        gap: '0.5rem',
                        alignItems: 'center'
                      }}>
                        <div style={{ 
                          width: 80, 
                          height: 16, 
                          background: 'var(--bg-alt)', 
                          borderRadius: 4,
                          animation: 'pulse 1.5s ease-in-out infinite'
                        }} />
                      </div>
                    )}

                    {/* Tags */}
                    <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                      {(program.tags || []).slice(0, 4).map((tag, j) => (
                        <span
                          key={j}
                          className="badge-raw"
                          style={tag === 'Internship' || tag === 'Certification' ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : {}}
                        >
                          {tag}
                        </span>
                      ))}
                      {(program.tags || []).length > 4 && (
                        <span className="badge-raw" style={{ opacity: 0.6 }}>+{(program.tags || []).length - 4}</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}