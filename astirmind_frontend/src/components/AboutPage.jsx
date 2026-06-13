import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Cloud, Award, MapPin, Users, Mail, Phone, ArrowUpRight, CheckCircle, MonitorCog, Bot, LayoutDashboard, Workflow, MessageSquareMore, BarChart3, Layers3, Palette, ShoppingCart, Megaphone, BriefcaseBusiness, ShieldCheck, GraduationCap, PenTool, Smartphone, TerminalSquare, Database, Eye, Cpu, Globe, Link as LinkIcon, Server, Wifi, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ──────────────────────────────────────────────────── */

export const SERVICES = [

  {
    n: '01',
    slug: 'ml-ai-solutions',
    title: 'ML & AI Solutions',
    desc: 'AstirMind leverages Machine Learning, Automatic Speech Recognition (ASR), Image Recognition, Text-to-Speech, and AI-driven systems to build intelligent and scalable digital solutions.',
    tags: ['Machine Learning', 'ASR', 'AI Automation', 'Computer Vision'],
    Icon: Brain
  },

  {
    n: '02',
    slug: 'automation-solutions',
    title: 'Automation Solutions',
    desc: 'We build intelligent automation systems for lead generation, workflow automation, browser automation, CRM integrations, and business process optimization.',
    tags: ['Automation', 'Selenium', 'CRM', 'Workflow Systems'],
    Icon: Bot
  },

  {
    n: '03',
    slug: 'web-development',
    title: 'Web Development',
    desc: 'We craft modern, responsive, and high-performance websites and web applications focused on scalability, accessibility, and user experience.',
    tags: ['Html', 'CSS', 'Java-Script'],
    Icon: MonitorCog
  },

  {
    n: '04',
    slug: 'mern-stack-development',
    title: 'MERN Stack Development',
    desc: 'Full-stack web applications built with MongoDB, Express.js, React, and Node.js. Scalable, high-performance solutions with seamless client-server integration and real-time capabilities.',
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'REST APIs'],
    Icon: TerminalSquare
  },

  {
    n: '05',
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    desc: 'AstirMind builds feature-rich Android and cross-platform mobile applications designed for performance, usability, and business growth.',
    tags: ['Android', 'React Native', 'Flutter', 'Mobile UI'],
    Icon: Smartphone
  },

  {
    n: '06',
    slug: 'cms-mvc-development',
    title: 'CMS & MVC Development',
    desc: 'We develop scalable CMS and MVC-based platforms tailored for businesses across multiple industries with secure and efficient architectures.',
    tags: ['Django', 'Laravel', 'CMS', 'MVC'],
    Icon: LayoutDashboard
  },

  {
    n: '07',
    slug: 'cloud-consulting',
    title: 'Cloud Consulting',
    desc: 'AstirMind helps businesses migrate, optimize, and scale applications on cloud platforms with secure infrastructure and growth-focused strategies.',
    tags: ['AWS', 'Cloud Infrastructure', 'DevOps', 'Scalability'],
    Icon: Cloud
  },

  {
    n: '08',
    slug: 'api-development-integrations',
    title: 'API Development & Integrations',
    desc: 'Secure and scalable REST API development with seamless third-party integrations including CRMs, payment gateways, cloud services, and enterprise tools.',
    tags: ['REST APIs', 'DRF', 'Microservices', 'Integrations'],
    Icon: Workflow
  },

  {
    n: '09',
    slug: 'ai-chatbots-conversational-ai',
    title: 'AI Chatbots & Conversational AI',
    desc: 'Building intelligent AI-powered assistants, customer support bots, document assistants, and conversational systems using modern LLM technologies.',
    tags: ['LLM', 'Chatbots', 'OpenAI', 'Conversational AI'],
    Icon: MessageSquareMore
  },

  {
    n: '10',
    slug: 'data-analytics-visualization',
    title: 'Data Analytics & Visualization',
    desc: 'Transforming raw data into meaningful insights through interactive dashboards, reporting systems, graph analytics, and business intelligence solutions.',
    tags: ['Analytics', 'Dashboards', 'Data Visualization', 'Business Intelligence'],
    Icon: BarChart3
  },

  {
    n: '11',
    slug: 'saas-product-development',
    title: 'SaaS Product Development',
    desc: 'End-to-end SaaS application development including scalable architectures, subscription systems, dashboards, and cloud-native platforms.',
    tags: ['SaaS', 'Cloud Apps', 'Multi-Tenant', 'Subscriptions'],
    Icon: Layers3
  },

  {
    n: '12',
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    desc: 'We create intuitive, visually engaging, and user-focused interfaces that align perfectly with client goals and modern design standards.',
    tags: ['Figma', 'UI Design', 'UX Research', 'Wireframing'],
    Icon: Palette
  },

  {
    n: '13',
    slug: 'ecommerce-development',
    title: 'E-Commerce Development',
    desc: 'AstirMind develops scalable e-commerce platforms with secure payment systems, optimized user journeys, and seamless shopping experiences.',
    tags: ['E-Commerce', 'Shopify', 'WooCommerce', 'Payment Gateway'],
    Icon: ShoppingCart
  },

  {
    n: '14',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    desc: 'We help brands grow digitally through strategic marketing, lead generation, SEO, social media campaigns, and performance-driven advertising.',
    tags: ['SEO', 'Branding', 'Lead Generation', 'Social Media'],
    Icon: Megaphone
  },

  {
    n: '15',
    slug: 'erp-crm-solutions',
    title: 'ERP & CRM Solutions',
    desc: 'Custom ERP and CRM platforms designed to streamline operations, manage workflows, improve productivity, and centralize business management.',
    tags: ['ERP', 'CRM', 'Business Automation', 'Enterprise Solutions'],
    Icon: BriefcaseBusiness
  },

  {
    n: '16',
    slug: 'internship-project-assistance',
    title: 'Internship & Project Assistance',
    desc: 'AstirMind provides industry-oriented internships, project guidance, and practical training in web development, AI, mobile development, and UI/UX.',
    tags: ['Training', 'Internships', 'Project Mentorship', 'Skill Development'],
    Icon: GraduationCap
  },

  // NEW: Blockchain & Crypto Solutions
  {
    n: '17',
    slug: 'blockchain-crypto-solutions',
    title: 'Blockchain & Crypto Solutions',
    desc: 'Build decentralized applications (dApps), smart contracts, and blockchain-based systems using Ethereum, Solidity, Web3.js, and Hyperledger. Secure, transparent, and tamper-proof solutions for finance, supply chain, identity management, and more.',
    tags: ['Blockchain', 'Smart Contracts', 'Solidity', 'Ethereum', 'Web3', 'Crypto'],
    Icon: LinkIcon
  },

  // NEW: DevOps & CI/CD Solutions
  {
    n: '18',
    slug: 'devops-solutions',
    title: 'DevOps & CI/CD Solutions',
    desc: 'Implement modern DevOps practices including continuous integration/continuous deployment (CI/CD), containerization with Docker, orchestration with Kubernetes, infrastructure as code (Terraform), and monitoring with Prometheus & Grafana. Automate and scale your infrastructure.',
    tags: ['DevOps', 'CI/CD', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'AWS'],
    Icon: Server
  },

  // NEW: IoT & Emerging Technologies
  {
    n: '19',
    slug: 'iot-emerging-technologies',
    title: 'IoT & Emerging Technologies',
    desc: 'Design and develop Internet of Things (IoT) solutions with sensors, microcontrollers (Arduino, ESP32, Raspberry Pi), MQTT protocols, edge computing, and cloud integration. Also explore emerging tech like AR/VR, 5G, digital twins, and ambient computing.',
    tags: ['IoT', 'Arduino', 'ESP32', 'MQTT', 'Edge Computing', '5G', 'Smart Devices'],
    Icon: Wifi
  }

];

const PROGRAMS = [
  {
    slug: 'genai',
    title: 'Generative AI & LLMs',
    internship: true
  },

  {
    slug: 'fullstack',
    title: 'Full Stack Development',
    internship: true
  },

  {
    slug: 'mern',
    title: 'MERN Stack',
    internship: true
  },

  {
    slug: 'datascience',
    title: 'Data Science & ML',
    internship: true
  },

  {
    slug: 'cv',
    title: 'Computer Vision',
    internship: true
  },

  {
    slug: 'android',
    title: 'Android Development',
    internship: true
  },

  {
    slug: 'embedded',
    title: 'Embedded & IoT Systems',
    internship: true
  },

  {
    slug: 'data-analytics',
    title: 'Data Analytics',
    internship: true
  },
  
  {
    slug: 'blockchain',
    title: 'Blockchain Development',
    internship: true
  },
  
  {
    slug: 'devops',
    title: 'DevOps Engineering',
    internship: true
  }
];

const TESTIMONIALS = [
  { name: 'Austins',    domain: 'Machine Learning', country: 'USA',    quote: 'Very good work quality and excellent at communicating with updates almost daily. Delivered exactly what was needed.' },
  { name: 'Neha Wadera', domain: 'Machine Learning', country: 'India',  quote: 'Extremely bright and very capable. They went above and beyond what was initially specified. Highly recommended.' },
  { name: 'Jessie',     domain: 'Artificial Intelligence', country: 'Canada', quote: 'Very easy to communicate with. Available when needed, completed our job on time. We are very happy and look forward to working with them again.' },
  { name: 'Ravi',       domain: 'Frontend',         country: 'India',  quote: 'I\'ve worked with them on previous projects and their quality of work is top notch every single time. Highly recommended.' },
  { name: 'Sukhdeep',   domain: 'WordPress',        country: 'India',  quote: 'Excellent work. Their communication was top-notch and their skills were strong. I enjoyed working with them and will have additional jobs for them in the future.' },
];

const STACK = ['React', 'Python', 'TensorFlow', 'Node.js', 'AWS', 'Android', 'Angular', 'FastAPI', 'PostgreSQL', 'Docker', 'Next.js', 'Kubernetes', 'MongoDB', 'Django', 'Firebase', 'Kotlin', 'Express.js', 'Solidity', 'Ethereum', 'Terraform', 'Arduino'];

/* ─── Sub-components ─────────────────────────────────────── */

function SectionLabel({ children, accent }) {
  return (
    <span className="section-label" style={accent ? { color: 'var(--accent)', borderColor: 'rgba(255,255,255,0.12)' } : {}}>
      {children}
    </span>
  );
}

function ServiceCard({ Icon, title, desc, index, slug }) {
  return (
    <Link
      to={`/services/${slug}`}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        height: '100%'
      }}
    >
      <div
        className="about-page-card"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--line)',
          padding: '2rem',
          height: '100%',
          minHeight: 300,
          display: 'flex', flexDirection: 'column', gap: '1rem',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
          transition: 'background 0.2s, transform 0.25s, border-color 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'var(--bg-elevated)';
          e.currentTarget.style.borderColor = 'var(--line-light)';
          e.currentTarget.style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'var(--bg-card)';
          e.currentTarget.style.borderColor = 'var(--line)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--accent)', letterSpacing: '0.08em' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <Icon size={24} strokeWidth={1.4} color="var(--text-3)" />
        </div>
        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text)' }}>{title}</h3>
        <p className="t-body" style={{ fontSize: '0.875rem', lineHeight: 1.65 }}>{desc}</p>
      </div>
    </Link>
  );
}

function TestimonialCard({ t }) {
  return (
    <div style={{
      border: '1px solid var(--line)',
      background: 'var(--bg-alt)',
      padding: '2rem',
      display: 'flex', flexDirection: 'column', gap: '1.25rem',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
    }}>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--text-2)', fontStyle: 'italic' }}>
        "{t.quote}"
      </div>
      <div style={{ borderTop: '1px solid var(--line)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--text)', marginBottom: 2 }}>{t.name}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t.domain}</div>
        </div>
        <span className="badge-raw">{t.country}</span>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */

export default function AboutPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from('.ap-header', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out', delay: 0.1 });

      // Identity section
      gsap.from('.ap-identity', {
        opacity: 0, y: 36, duration: 0.65, ease: 'power2.out',
        scrollTrigger: { trigger: '.ap-identity', start: 'top 82%' },
      });

      // Service cards
      gsap.from('.about-page-card', {
        opacity: 0, y: 28, clipPath: 'inset(0 0 100% 0)',
        duration: 0.5, stagger: 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: '.ap-services-grid', start: 'top 82%' },
      });

      // Institute section
      gsap.from('.ap-institute', {
        opacity: 0, y: 36, duration: 0.65, ease: 'power2.out',
        scrollTrigger: { trigger: '.ap-institute', start: 'top 82%' },
      });

      // Testimonials
      gsap.from('.ap-testimonial', {
        opacity: 0, y: 28, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.ap-testimonials-grid', start: 'top 85%' },
      });

      // CTA
      gsap.from('.ap-cta', {
        opacity: 0, y: 28, duration: 0.65, ease: 'power2.out',
        scrollTrigger: { trigger: '.ap-cta', start: 'top 85%' },
      });

      // Stack marquee numbers
      gsap.from('.ap-stat-num', {
        textContent: 0,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: { trigger: '.ap-stats-row', start: 'top 85%', once: true },
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 68 }}>

      {/* ══ PAGE HEADER ══════════════════════════════════════ */}
      <div className="ap-header" style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--line)' }}>
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2200&q=75"
          alt=""
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', filter: 'brightness(0.13) contrast(1.2) grayscale(20%)', pointerEvents: 'none' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,5,3,0.25) 0%, rgba(6,5,3,0.88) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '5rem', paddingBottom: '4rem' }}>
          <div className="ap-header-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-end' }}>
            <div>
              <SectionLabel accent>About AstirMind</SectionLabel>
              <h1 style={{
                fontFamily: 'var(--font-sans)', fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.05,
                color: '#fff', marginTop: '0.75rem',
              }}>
                We are programmers.<br />
                <span style={{ color: 'var(--accent)' }}>We are educators.</span>
              </h1>
            </div>
            <div className="ap-header-right" style={{ paddingLeft: '2rem', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.55)', marginBottom: '1.5rem' }}>
                At AstirMind, we build intelligent digital systems that solve real business challenges. Our focus is on creating scalable, reliable, and performance-driven solutions — from AI-powered automation and data systems to custom applications designed around practical operational needs.
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.4)' }}>
                Driven by innovation and continuous learning, we constantly explore emerging technologies to build smarter solutions for complex problems. Alongside our engineering work, we also prepare future developers through structured training, mentorship, and hands-on experience built around real-world projects.
              </p>
            </div>
          </div>

          {/* ── Stats row ── */}
          <div className="ap-stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, marginTop: '3.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2.5rem' }}>
            {[
              { v: '2016', label: 'Est.', sub: 'Founded in Ludhiana' },
              { v: '50+', label: 'Projects', sub: 'Shipped to production' },
              { v: '200+', label: 'Students', sub: 'Trained & placed' },
              { v: '8+', label: 'Years', sub: 'Of active delivery' },
            ].map(({ v, label, sub }, i) => (
              <div key={i} style={{ paddingRight: '2rem', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none', paddingLeft: i > 0 ? '2rem' : 0 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>{v}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>{label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 3 }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ IDENTITY / WHO WE ARE ════════════════════════════ */}
      <div className="ap-identity" style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
          <div className="ap-identity-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

            {/* Images */}
            <div>
              <div style={{ position: 'relative', border: '1px solid var(--line)', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: 'var(--accent)', zIndex: 2 }} />
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=85"
                  alt="AstirMind team coding session"
                  style={{ width: '100%', height: 340, objectFit: 'cover', display: 'block', filter: 'brightness(0.87) contrast(1.05)' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(6,5,3,0.55) 100%)' }} />
                <div style={{ position: 'absolute', bottom: 16, left: 24, right: 16, display: 'flex', gap: 8 }}>
                  {[
                    { Icon: GraduationCap, label: 'Internship Programs' },
                    { Icon: Award, label: 'Certified Training' },
                  ].map(({ Icon, label }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(6,5,3,0.7)', backdropFilter: 'blur(6px)', padding: '8px 12px' }}>
                      <Icon size={14} strokeWidth={1.5} color="var(--accent)" />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ap-img-pair" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.75rem' }}>
                <div style={{ border: '1px solid var(--line)', overflow: 'hidden', height: 130 }}>
                  <img
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
                    alt="Office environment"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85) contrast(1.08)' }}
                  />
                </div>
                <div style={{ border: '1px solid var(--line)', background: 'var(--bg-elevated)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1.25rem', height: 130 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Est. 2016</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1.2 }}>Built in India.<br />Used worldwide.</div>
                  <div style={{ marginTop: 10, width: 32, height: 2, background: 'var(--accent)' }} />
                </div>
              </div>
            </div>

            {/* Copy */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <SectionLabel>Who We Are</SectionLabel>
                <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.15, color: 'var(--text)', marginTop: '0.75rem' }}>
                  A software engineering studio with an education arm.
                </h2>
              </div>

              <p className="t-body-lg" style={{ fontSize: '0.9375rem', lineHeight: 1.75 }}>
                At ASTIRMIND, we engineer reliable applications for growing businesses — from marketing sites to complex internal tools, mobile apps to AI systems. We focus on solid foundations, not trend-chasing.
              </p>
              <p className="t-body" style={{ fontSize: '0.9375rem', lineHeight: 1.75 }}>
                In parallel, we run AstirMind Institute: a structured training and internship program designed to produce future Developers who are ready to contribute from day one. Students graduate with deployed projects, not just certificates.
              </p>

              <div className="ap-contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[
                  { Icon: MapPin, label: 'Ludhiana, India' },
                  { Icon: Users, label: 'Team of engineers & educators' },
                  { Icon: Mail, label: 'astirmind@gmail.com' },
                  { Icon: Phone, label: '+91-9815674608' },
                ].map(({ Icon, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Icon size={14} strokeWidth={1.5} color="var(--accent)" />
                    <span className="t-body" style={{ fontSize: '0.8125rem' }}>{label}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', paddingTop: '0.5rem' }}>
                <a href="/quote" style={{ textDecoration: 'none' }} className="btn-solid">Start a Project</a>
                <a href="/hiring" style={{ textDecoration: 'none' }} className="btn-outline">Join Our Team</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ TECH STACK MARQUEE ═══════════════════════════════ */}
      <div className="marquee-raw" style={{ borderBottom: '1px solid var(--line)', borderTop: '1px solid var(--line)' }}>
        {[...STACK, ...STACK].map((item, i) => (
          <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginRight: '3rem', flexShrink: 0 }}>{item}</span>
        ))}
      </div>

      {/* ══ SERVICES ═════════════════════════════════════════ */}
      <div style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg-alt)' }}>
        <div className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
            <div>
              <SectionLabel>What We Do</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1, color: 'var(--text)', marginTop: '0.75rem' }}>
                Professional approach.<br />Quality service.
              </h2>
            </div>
            <p className="t-body" style={{ maxWidth: 380 }}>
              Core engineering principles over trends. We are professionals at AI, web, mobile, cloud, blockchain, DevOps, IoT, and design — all under one roof.
            </p>
          </div>

          <div className="ap-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))', gap: '1px', border: '1px solid var(--line)', background: 'var(--line)' }}>
            {SERVICES.map((s, i) => (
              <ServiceCard key={i} {...s} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ══ INSTITUTE SECTION ════════════════════════════════ */}
      <div className="ap-institute" style={{ borderBottom: '1px solid var(--line)' }}>
        <div className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
          <div className="ap-institute-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>

            <div>
              <SectionLabel>AstirMind Institute</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.15, color: 'var(--text)', marginTop: '0.75rem', marginBottom: '1.5rem' }}>
                We prepare future developers through real projects, mentorship, and practical industry experience.
              </h2>
              <p className="t-body" style={{ lineHeight: 1.75, marginBottom: '1.25rem' }}>
                At AstirMind, we bridge the gap between academic learning and modern software engineering by creating an environment centered around hands-on development and real-world problem solving. Every program is designed to give students practical exposure to the tools, workflows, and technologies used in professional engineering teams.
              </p>
              <p className="t-body" style={{ lineHeight: 1.75, marginBottom: '2rem' }}>
                Rather than relying only on theoretical instruction, we focus on involvement. Students build live projects, collaborate on production-level applications, and gain experience that reflects actual industry standards. By the end of the program, learners graduate with deployed projects, practical knowledge, and the confidence to contribute in real development environments — not just certificates.
              </p>
              <p className="t-body" style={{ lineHeight: 1.75, marginBottom: '2rem' }}>
                Our approach combines structured learning, mentorship, and continuous experimentation to help aspiring developers strengthen both their technical foundation and problem-solving mindset.
              </p>
              <blockquote style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '1.25rem', fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontStyle: 'italic', color: 'var(--text-2)', lineHeight: 1.7 }}>
                "Tell me and I forget, teach me and I may remember, involve me and I learn."
              </blockquote>

              <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem' }}>
                <a href="/programs" style={{ textDecoration: 'none' }} className="btn-solid">View Programs</a>
                <a href="/verify" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-2)', border: '1px solid var(--line)', padding: '0.65rem 1.2rem', transition: 'color 0.15s, border-color 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--line-light)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-2)'; e.currentTarget.style.borderColor = 'var(--line)'; }}
                >
                  Verify a Certificate <ArrowUpRight size={12} strokeWidth={2} />
                </a>
              </div>
            </div>

            {/* Programs list */}
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
                Active Programs
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--line)' }}>
                {PROGRAMS.map((p, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', borderBottom: i < PROGRAMS.length - 1 ? '1px solid var(--line)' : 'none', background: 'var(--bg-alt)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--accent)', width: 22 }}>{String(i + 1).padStart(2, '0')}</span>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', fontWeight: 500, color: 'var(--text)' }}>{p.title}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                      {p.internship && (
                        <span className="badge-raw" style={{ borderColor: 'var(--accent)', color: 'var(--accent)', fontSize: '0.45rem' }}>Internship</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Institute photo */}
              <div style={{ marginTop: '1.25rem', border: '1px solid var(--line)', overflow: 'hidden', position: 'relative', height: 180 }}>
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                  alt="Students in a training session"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.82) contrast(1.08)' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(6,5,3,0.6) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Available Courses</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '1.25rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1 }}>10 Programs.<br />100% Project-Based.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ TESTIMONIALS ═════════════════════════════════════ */}
      <div style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg-alt)' }}>
        <div className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
            <div>
              <SectionLabel>Client Testimonials</SectionLabel>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1, color: 'var(--text)', marginTop: '0.75rem' }}>
                What clients say.
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['ML / AI', 'Frontend', 'WordPress', 'Internships'].map(t => (
                <span key={t} className="badge-raw">{t}</span>
              ))}
            </div>
          </div>

          <div className="ap-testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="ap-testimonial" style={{ background: 'var(--bg)' }}>
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ CTA STRIP ════════════════════════════════════════ */}
      <div className="ap-cta" style={{ borderBottom: '1px solid var(--line)', position: 'relative', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=2000&q=70"
          alt=""
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', filter: 'brightness(0.1) contrast(1.15)', pointerEvents: 'none' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(6,5,3,0.95) 0%, rgba(6,5,3,0.6) 60%, rgba(6,5,3,0.85) 100%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '5rem', paddingBottom: '5rem' }}>
          <div className="ap-cta-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#fff', marginBottom: '1rem' }}>
                We will help you build up your business.
              </h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'rgba(255,255,255,0.45)', maxWidth: 540, lineHeight: 1.7 }}>
                We always innovate and improvise. Our approach is exceptional, imaginative, and very creative.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flexShrink: 0 }}>
              <a href="/quote" className="btn-solid" style={{ textDecoration: 'none', textAlign: 'center', padding: '0.8rem 2rem' }}>Get a Quote</a>
              <a href="mailto:astirmind@gmail.com" style={{ textDecoration: 'none', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'rgba(255,255,255,0.4)', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >
                astirmind@gmail.com
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap' }}>
            {[
              { Icon: CheckCircle, label: 'Real project delivery' },
              { Icon: CheckCircle, label: 'Internship placements' },
              { Icon: CheckCircle, label: 'Ongoing support' },
              { Icon: CheckCircle, label: 'Certificate programs' },
            ].map(({ Icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon size={14} strokeWidth={2} color="var(--accent)" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}