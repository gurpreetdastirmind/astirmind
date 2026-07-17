import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Cloud, MonitorCog, Bot, LayoutDashboard, Workflow, MessageSquareMore, BarChart3, Layers3, Palette, ShoppingCart, Megaphone, BriefcaseBusiness, ShieldCheck, GraduationCap, PenTool, Smartphone, TerminalSquare, Database, Eye, Cpu, Globe, CloudSun, Target, TrendingUp, LineChart, Code2, Layout, Code, Phone, Star, Atom, Calculator } from 'lucide-react';
import { useMode } from '../context/ModeContext';
import { Link } from 'react-router-dom';
import { useGoogleRating } from '../hooks/useGoogleRating';

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

export const courses = [
  {
    n: '01',
    slug: 'genai',
    title: 'Generative AI & LLMs',
    desc: 'Hands-on training with large language models, prompt engineering, RAG pipelines, and building AI-powered applications. Work on real products, not toy examples.',
    tags: ['6-8 Months', 'Live Projects', 'Certification'],
    Icon: Brain,
  },
  {
    n: '02',
    slug: 'automation-solutions',
    title: 'Automation & Data Scraping Solutions',
    desc: 'We build intelligent automation systems for lead generation, data extraction, workflow automation, browser automation, CRM integrations, and business process optimization. Extract structured data from any website and automate repetitive tasks across your entire tech stack.',
    tags: ['6-8 Months','Web Scraping', 'Workflow Automation', 'Selenium', 'CRM', 'Lead Generation', 'Data Extraction'],
    Icon: Bot,
  },
  {
    n: '03',
    slug: 'fullstack',
    title: 'Full Stack Development',
    desc: 'Master both JavaScript (React/Node) AND Python/Django stacks. Build complete web products from database to UI with REST APIs, authentication, and deployment. Choose your specialization or learn both — the exact stacks companies hire for.',
    tags: ['6-8 Months', 'Live Projects', 'Internship', 'Certification', 'React/Node', 'Python/Django'],
    Icon: Globe,
  },
  {
    n: '04',
    slug: 'foundational-programming',
    title: 'C, C++, Java & Python',
    desc: 'Master the fundamentals of programming with four essential languages. Learn C for systems programming, C++ for performance-critical applications, Java for enterprise development, and Python for AI, data science, and automation. Build a strong foundation that makes learning any new language easy.',
    tags: ['2 Months', 'Live Projects', 'Certification', 'C', 'C++', 'Java', 'Python', 'DSA'],
    Icon: Code,
  },
  {
    n: '05',
    slug: 'web-design',
    title: 'Web Design',
    desc: 'Master responsive web design principles, typography, color theory, layout techniques, and modern CSS frameworks. Learn to create visually stunning, user-friendly websites that adapt seamlessly across all devices. Build a professional portfolio of real client-ready designs.',
    tags: ['45 days','120-Hours', 'Live Projects', 'Certification', 'Figma', 'Responsive Design', 'CSS', 'Portfolio'],
    Icon: Layout,
  },
  {
    n: '06',
    slug: 'web-development',
    title: 'Web Development',
    desc: 'Learn modern frontend and backend web development with HTML5, CSS3, JavaScript, React, and Node.js. Build dynamic, database-driven web applications with authentication, APIs, and deployment. Master the skills to become a professional web developer.',
    tags: ['45 days','120-Hours', 'Live Projects', 'Internship', 'Certification', 'React', 'Node.js', 'MongoDB'],
    Icon: Code2,
  },
  {
    n: '07',
    slug: 'mobile-app-development',
    title: 'Mobile App Development (React Native & Flutter)',
    desc: 'Master cross-platform mobile app development using React Native and Flutter. Build high-performance iOS and Android apps from a single codebase. Learn state management, native modules, app deployment to App Store and Play Store, and real-world project workflows.',
    tags: ['6-8 Months', 'Live Projects', 'Internship', 'Certification', 'React Native', 'Flutter', 'iOS', 'Android'],
    Icon: Phone,
  },
  {
    n: '08',
    slug: 'datascience',
    title: 'Data Science & ML',
    desc: 'Statistics, feature engineering, model training, and production ML. You will deploy models, not just fit them in a notebook.',
    tags: ['6-8 Months', 'Live Projects', 'Certification'],
    Icon: Database,
  },
  {
    n: '09',
    slug: 'cv',
    title: 'Computer Vision',
    desc: 'Image classification, object detection, and video analysis using modern deep learning frameworks. Work on real camera and sensing pipelines.',
    tags: ['6-8 Months', 'Live Projects', 'Certification'],
    Icon: Eye,
  },
  {
    n: '10',
    slug: 'android',
    title: 'Android Development',
    desc: 'Native Android with Kotlin. Architecture patterns, Jetpack Compose, and publishing a real app to the Play Store before you finish.',
    tags: ['6-8 Months', 'Live Projects', 'Internship', 'Certification'],
    Icon: Smartphone,
  },
  {
    n: '11',
    slug: 'embedded',
    title: 'Embedded & IoT Systems',
    desc: 'Microcontrollers, sensors, firmware, and connecting hardware to cloud backends. Practical builds from day one.',
    tags: ['6-8 Months', 'Live Projects', 'Certification'],
    Icon: Cpu,
  },
  {
    n: '12',
    slug: 'python',
    title: 'Python Engineering',
    desc: 'From syntax to production-quality Python with Django & FastAPI. Backend development, automation, and scripting with real-world workflows and deployment practices.',
    tags: ['6-8 Months', 'Mentor Support', 'Certification', 'Django', 'FastAPI'],
    Icon: TerminalSquare,
  },
  {
    n: '13',
    slug: 'uiux',
    title: 'UI/UX Design',
    desc: 'User research, wireframing, prototyping, and high-fidelity interfaces. Build a portfolio that reflects real product design workflows.',
    tags: ['6-8 Months', 'Portfolio Projects', 'Certification'],
    Icon: PenTool,
  },
  {
    n: '14',
    slug: 'cloud-computing',
    title: 'Cloud Computing',
    desc: 'Master AWS, Azure, and Google Cloud fundamentals. Learn cloud architecture, serverless computing, containerization with Docker and Kubernetes, and infrastructure as code. Hands-on deployment of scalable applications.',
    tags: ['6-8 Months', 'Live Projects', 'Certification', 'AWS', 'Docker', 'Kubernetes'],
    Icon: CloudSun,
  },
  {
    n: '15',
    slug: 'digital-performance-marketing',
    title: 'Digital Marketing & Performance Marketing',
    desc: 'Learn SEO, Google Ads, Meta Ads, email marketing, and conversion rate optimization. Run real campaigns with measurable ROI. Master analytics, audience targeting, and data-driven growth strategies.',
    tags: ['6-8 Months', 'Live Campaigns', 'Certification', 'Google Ads', 'Meta Ads', 'Analytics'],
    Icon: Target,
  },
  {
    n: '16',
    slug: 'data-analytics',
    title: 'Data Analytics',
    desc: 'Master data cleaning, exploratory data analysis (EDA), statistical analysis, and visualization tools like Power BI, Tableau, and Python (Pandas, Matplotlib, Seaborn). Learn to extract actionable insights from complex datasets and drive business decisions.',
    tags: ['6-8 Months', 'Live Projects', 'Certification', 'Power BI', 'Tableau', 'Python', 'SQL'],
    Icon: LineChart,
  },
  {
    n: '17',
    slug: 'python-ai-foundation',
    title: 'Python Foundation for Artificial Intelligence',
    desc: 'Build a strong foundation in Python programming specifically tailored for AI development. Master essential tools and libraries including Python 3.x, VS Code, Jupyter Notebook, Python IDLE, Tkinter, SQLite3, NumPy, Pandas, and SciPy. Perfect for beginners looking to start their AI journey.',
    tags: ['45 days', '120-Hours', 'Live Projects', 'Certification', 'Python 3.x', 'NumPy', 'Pandas', 'SciPy', 'Tkinter', 'SQLite3'],
    Icon: Atom,
  },
  {
    n: '18',
    slug: 'python-data-analytics-foundation',
    title: 'Python Foundation for Data Analytics',
    desc: 'Learn Python programming with a focus on data analytics. Master data manipulation, cleaning, visualization, and analysis using Python 3.x, VS Code, Jupyter Notebook, Python IDLE, NumPy, Pandas, and SciPy. Build real-world analytics projects and develop data-driven decision-making skills.',
    tags: ['45 days', '120-Hours', 'Live Projects', 'Certification', 'Python 3.x', 'NumPy', 'Pandas', 'SciPy', 'Data Visualization', 'Analytics'],
    Icon: Calculator,
  },
];

export default function Services() {
  const { mode } = useMode();
  const sectionRef = useRef(null);
  
  // Get Google Rating dynamically
  const { rating: googleRating, loading: ratingLoading } = useGoogleRating();

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.svc-header', {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
      });

      gsap.from('.svc-card', {
        clipPath: 'inset(0 0 100% 0)',
        opacity: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.svc-grid', start: 'top 82%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [mode]);

  const isAgency = mode === 'Xperience';
  const items = isAgency ? agencyServices : courses;

  return (
    <section ref={sectionRef} id="services" style={{ borderBottom: '1px solid var(--line)', background: isAgency ? 'var(--bg-alt)' : 'var(--bg)', position: 'relative', overflow: 'hidden' }}>

      {/* ── Agency: full-bleed photo banner at the top of the section ── */}
      {isAgency && (
        <div style={{ position: 'relative', height: 260, overflow: 'hidden', borderBottom: '1px solid var(--line)' }}>
          <img
            src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=2000&q=85"
            alt="Engineering team at work"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', filter: 'brightness(0.55) contrast(1.1)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(6,5,3,0.88) 0%, rgba(6,5,3,0.3) 60%, rgba(6,5,3,0.65) 100%)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 3, background: 'var(--accent)' }} />
          <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="section-label" style={{ color: 'var(--accent)', borderColor: 'rgba(255,255,255,0.15)', marginBottom: '0.75rem' }}>Capabilities</span>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 700, letterSpacing: '-0.035em', color: '#fff', lineHeight: 1.1, maxWidth: 540 }}>
              What We Build
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.75rem', maxWidth: 400 }}>
              Core engineering principles over trends. Solid foundations build better products.
            </p>
          </div>
        </div>
      )}

      {/* Institute: accent rule at top */}
      {!isAgency && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)' }} />
      )}

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: isAgency ? '4rem' : '7rem', paddingBottom: isAgency ? '7rem' : '7rem' }}>
        {/* Agency header is now the photo banner above; Institute header stays here */}
        {!isAgency && (
          <div className="svc-header" style={{ marginBottom: '3rem' }}>
            <span className="section-label">Curriculum</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
              <h2 className="t-h2">What You Will Learn</h2>
              <p className="t-body" style={{ maxWidth: 380 }}>
                Every program runs on live projects with working mentors. You graduate with a portfolio, not just a certificate.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              {[{ v: '18', l: 'Programs' }, { v: '100%', l: 'Project-Based' }, { v: 'Internships', l: 'Available' }].map(({ v, l }) => (
                <div key={l} style={{ border: '1px solid var(--line)', padding: '0.6rem 1.25rem', display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 700, color: 'var(--accent)' }}>{v}</span>
                  <span className="t-mono" style={{ fontSize: '0.5625rem', color: 'var(--text-3)' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {isAgency && (
          <div className="svc-header" style={{ marginBottom: '3rem' }} />
        )}

        <div className="svc-grid" style={{
          display: 'grid',
          gridTemplateColumns: isAgency ? 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))' : 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: '1px', border: '1px solid var(--line)', background: 'var(--line)',
        }}>
          {items.map((item, i) => {
            const Icon = item.Icon;
            return (
              <Link
                key={i}
                to={
                  isAgency
                    ? `/services/${item.slug}`
                    : `/courses/${item.slug}`
                }
                style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
              >
                <div
                  className="svc-card"
                  style={{
                    background: 'var(--bg-card)',
                    padding: '2.5rem',
                    height: '100%',
                    minHeight: isAgency ? 480 : 400,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
                    transition: 'background 0.2s, transform 0.25s, box-shadow 0.25s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--bg-elevated)';
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.04), 0 18px 38px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--bg-card)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.03)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--accent)', letterSpacing: '0.08em' }}>{item.n}</span>
                    <span style={{ width: 28, height: 28, color: 'var(--text-2)' }}>
                      <Icon size={28} strokeWidth={1.5} />
                    </span>
                  </div>
                  <div>
                    <h3 className="t-h3" style={{ marginBottom: '0.5rem', fontSize: 'clamp(1rem, 1.8vw, 1.375rem)' }}>{item.title}</h3>
                    <p className="t-body" style={{ fontSize: '0.9375rem', lineHeight: 1.65, marginBottom: '0.75rem' }}>{item.desc}</p>
                    
                    {/* Google Rating Section - Dynamic from Google */}
                    {!ratingLoading ? (
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem', 
                        flexWrap: 'wrap',
                        marginTop: '0.25rem'
                      }}>
                        <GoogleStarRating rating={googleRating.ratingValue} />
                        <span style={{ 
                          fontFamily: 'var(--font-mono)', 
                          fontSize: '0.625rem', 
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
                        <span style={{ 
                          fontFamily: 'var(--font-mono)', 
                          fontSize: '0.5rem', 
                          color: 'var(--accent)',
                          opacity: 0.7,
                          marginLeft: '0.25rem'
                        }}>
                          ★★★★★
                        </span>
                      </div>
                    ) : (
                      <div style={{ 
                        display: 'flex', 
                        gap: '0.5rem',
                        alignItems: 'center',
                        marginTop: '0.25rem'
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
                  </div>
                  <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                    {item.tags.map((tag, j) => (
                      <span key={j} className="badge-raw" style={tag === 'Internship' || tag === 'Certification' ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : {}}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        {!isAgency && (
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <a href="#contact" className="btn-solid" style={{ padding: '0.65rem 1.75rem', fontSize: '0.875rem' }}>
              Apply for a Program
            </a>
          </div>
        )}
      </div>
    </section>
  );
}