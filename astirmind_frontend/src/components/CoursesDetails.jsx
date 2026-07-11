import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  Star, ChevronDown, ChevronUp, Users, GraduationCap, Briefcase, 
  UserCheck, Building, RefreshCw, Award, Laptop, TrendingUp, 
  Microscope, Stethoscope, BarChart, Zap, Target, DollarSign, 
  Clock, Calendar, CreditCard, FileCheck, FolderOpen, Users2,
  Code, GitBranch, Smartphone, Database, Shield, Cloud, Cpu,
  Layout, Palette, Terminal, Layers, Package, CheckCircle,
  ArrowRight, BookOpen, Trophy, Sparkles
} from 'lucide-react';
import { courses } from './Services';

// Star Rating Component
function StarRating({ rating, total = 5 }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {[...Array(total)].map((_, i) => (
        <Star
          key={i}
          size={18}
          strokeWidth={1.5}
          fill={i < fullStars ? 'var(--accent)' : (i === fullStars && hasHalfStar ? 'var(--accent)' : 'none')}
          style={{
            color: i < fullStars || (i === fullStars && hasHalfStar) ? 'var(--accent)' : 'var(--line)',
            opacity: i < fullStars || (i === fullStars && hasHalfStar) ? 1 : 0.3
          }}
        />
      ))}
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'var(--text-2)',
        marginLeft: '8px'
      }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

// Syllabus Accordion Component
function SyllabusModule({ module, index, isOpen, onToggle }) {
  return (
    <div style={{
      borderBottom: '1px solid var(--line)',
      padding: '1rem 0'
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '0.5rem 0',
          textAlign: 'left'
        }}
      >
        <div>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5625rem',
            color: 'var(--accent)',
            letterSpacing: '0.08em',
            display: 'block',
            marginBottom: '0.25rem'
          }}>
            Module {index + 1}
          </span>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--text)'
          }}>
            {module.title}
          </span>
        </div>
        {isOpen ? (
          <ChevronUp size={18} color="var(--text-3)" />
        ) : (
          <ChevronDown size={18} color="var(--text-3)" />
        )}
      </button>

      <div style={{
        overflow: 'hidden',
        maxHeight: isOpen ? 500 : 0,
        transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <ul style={{
          padding: '0.5rem 0 1rem 1.5rem',
          margin: 0,
          color: 'var(--text-2)',
          lineHeight: 2,
          listStyle: 'none'
        }}>
          {module.topics.map((topic, i) => (
            <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline' }}>
              <span style={{ color: 'var(--accent)', fontSize: '0.5rem' }}>▸</span>
              <span style={{ fontSize: '0.9rem' }}>{topic}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// FAQ Accordion Component
function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <div style={{
      borderBottom: '1px solid var(--line)',
      padding: '0.75rem 0'
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '0.5rem 0',
          textAlign: 'left'
        }}
      >
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.95rem',
          fontWeight: 500,
          color: 'var(--text)',
          lineHeight: 1.4
        }}>
          {faq.question}
        </span>
        {isOpen ? (
          <ChevronUp size={18} color="var(--text-3)" style={{ flexShrink: 0 }} />
        ) : (
          <ChevronDown size={18} color="var(--text-3)" style={{ flexShrink: 0 }} />
        )}
      </button>

      <div style={{
        overflow: 'hidden',
        maxHeight: isOpen ? 500 : 0,
        transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <p style={{
          padding: '0.5rem 0 0.75rem 0',
          margin: 0,
          color: 'var(--text-2)',
          lineHeight: 1.7,
          fontSize: '0.9rem'
        }}>
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

// ALL audience types - SAME for EVERY course
const allAudienceTypes = [
  {
    icon: GraduationCap,
    title: 'B.Tech Students',
    description: 'Engineering students looking to build practical skills and gain industry experience before graduation.'
  },
  {
    icon: Award,
    title: 'B.Com Students',
    description: 'Commerce students who want to combine business knowledge with technical skills for better career opportunities.'
  },
  {
    icon: GraduationCap,
    title: 'BCA Students',
    description: 'Computer Application students wanting to specialize in modern development technologies.'
  },
  {
    icon: Laptop,
    title: 'M.Sc IT Students',
    description: 'IT postgraduates looking to deepen their technical expertise and work on industry-level projects.'
  },
  {
    icon: GraduationCap,
    title: 'MCA Students',
    description: 'Master\'s students seeking advanced technical training and real-world project experience.'
  },
  {
    icon: TrendingUp,
    title: 'BBA Students',
    description: 'Business administration students aiming to understand technology to lead digital transformation initiatives.'
  },
  {
    icon: Microscope,
    title: 'B.Sc Non-Medical Students',
    description: 'Science students (Physics, Chemistry, Mathematics) who want to build technical skills and explore career opportunities in technology.'
  },
  {
    icon: Stethoscope,
    title: 'B.Sc Medical Students',
    description: 'Medical science students looking to combine healthcare knowledge with technology for careers in health-tech, bioinformatics, and medical software.'
  },
  {
    icon: BarChart,
    title: 'MBA Students',
    description: 'Business administration graduates who want to understand technology to lead digital transformation and manage tech-driven businesses.'
  },
  {
    icon: Briefcase,
    title: 'Working Professionals',
    description: 'Professionals looking to upskill, switch careers, or stay current with the latest technologies.'
  },
  {
    icon: UserCheck,
    title: 'Fresh Graduates',
    description: 'Recent graduates ready to launch their careers with hands-on training and portfolio development.'
  },
  {
    icon: Building,
    title: 'Business Owners & Entrepreneurs',
    description: 'Entrepreneurs who want to understand technology to better lead their teams and make informed decisions.'
  },
  {
    icon: RefreshCw,
    title: 'Career Switchers',
    description: 'Professionals transitioning into tech from other fields, looking for a structured learning path.'
  }
];

// Who Should Join Component
function WhoShouldJoin() {
  return (
    <div style={{
      marginTop: '4rem',
      borderTop: '1px solid var(--line)',
      paddingTop: '3rem'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1rem'
      }}>
        <Users size={24} color="var(--accent)" />
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1.75rem',
          margin: 0
        }}>
          Who Should Join This Program?
        </h2>
      </div>

      <p style={{
        color: 'var(--text-2)',
        marginBottom: '2rem',
        maxWidth: 700,
        lineHeight: 1.7,
        fontSize: '1rem'
      }}>
        This program is designed for individuals at various stages of their career who want to gain practical, hands-on experience in software development.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))',
        gap: '1px',
        border: '1px solid var(--line)',
        background: 'var(--line)',
      }}>
        {allAudienceTypes.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              style={{
                background: 'var(--bg-card)',
                padding: '1.5rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                transition: 'background 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-elevated)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--bg-card)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{
                  width: 36,
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--accent)',
                  borderRadius: '4px',
                  background: 'rgba(255,255,255,0.03)'
                }}>
                  <Icon size={18} color="var(--accent)" />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  margin: 0,
                  color: 'var(--text)'
                }}>
                  {item.title}
                </h3>
              </div>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                lineHeight: 1.6,
                color: 'var(--text-2)',
                margin: 0,
                paddingLeft: '3rem'
              }}>
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ NEW SECTIONS ============

// 1. Why Learn This Course?
function WhyLearnThis({ courseTitle }) {
  const data = {
    futureScope: `The demand for ${courseTitle} professionals is growing exponentially. With the rapid digital transformation across industries, skilled developers are needed more than ever.`,
    careerDemand: 'The job market for developers is projected to grow by 22% through 2030, with thousands of new positions opening each year.',
    salaryInsights: 'Entry-level: ₹4-8 LPA | Mid-level: ₹8-15 LPA | Senior: ₹15-30 LPA+',
    industryUsage: 'Technology, Fintech, Healthcare, E-commerce, Education, Entertainment, Banking, Insurance, Real Estate, Manufacturing'
  };

  return (
    <div style={{
      marginTop: '4rem',
      borderTop: '1px solid var(--line)',
      paddingTop: '3rem'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1.5rem'
      }}>
        <Target size={24} color="var(--accent)" />
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1.75rem',
          margin: 0
        }}>
          Why Learn This Course?
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem'
      }}>
        <div style={{
          padding: '1.5rem',
          border: '1px solid var(--line)',
          background: 'var(--bg-alt)',
          gridColumn: '1 / -1'
        }}>
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Zap size={18} color="var(--accent)" /> Future Scope
          </h4>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.7, margin: 0 }}>{data.futureScope}</p>
        </div>

        <div style={{
          padding: '1.5rem',
          border: '1px solid var(--line)',
          background: 'var(--bg-alt)'
        }}>
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={18} color="var(--accent)" /> Career Demand
          </h4>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.7, margin: 0 }}>{data.careerDemand}</p>
        </div>

        <div style={{
          padding: '1.5rem',
          border: '1px solid var(--line)',
          background: 'var(--bg-alt)'
        }}>
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <DollarSign size={18} color="var(--accent)" /> Salary Insights
          </h4>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.7, margin: 0 }}>{data.salaryInsights}</p>
        </div>

        <div style={{
          padding: '1.5rem',
          border: '1px solid var(--line)',
          background: 'var(--bg-alt)',
          gridColumn: '1 / -1'
        }}>
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Building size={18} color="var(--accent)" /> Industry Usage
          </h4>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.7, margin: 0 }}>{data.industryUsage}</p>
        </div>
      </div>
    </div>
  );
}

// 2. Why AstirMind?
function WhyAstirMind() {
  const features = [
    { icon: Users2, title: 'One-on-One Mentoring', desc: 'Personalized guidance from industry experts to accelerate your learning.' },
    { icon: Sparkles, title: '2 Free Demo Classes', desc: 'Experience our teaching methodology before committing to the program.' },
    { icon: Calendar, title: 'Monthly Fee Structure', desc: 'Flexible payment options with monthly installments to ease your financial burden.' },
    { icon: Clock, title: 'Flexible Timings', desc: 'Choose from morning, evening, or weekend batches as per your convenience.' },
    { icon: Trophy, title: 'ISO Certified Internship', desc: 'Industry-recognized certification that adds value to your professional profile.' },
    { icon: Briefcase, title: 'Placement Assistance', desc: 'Dedicated support for job placements and interview preparation.' }
  ];

  return (
    <div style={{
      marginTop: '4rem',
      borderTop: '1px solid var(--line)',
      paddingTop: '3rem'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1.5rem'
      }}>
        <Trophy size={24} color="var(--accent)" />
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1.75rem',
          margin: 0
        }}>
          Why AstirMind?
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
        gap: '1px',
        border: '1px solid var(--line)',
        background: 'var(--line)',
      }}>
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              style={{
                background: 'var(--bg-card)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-elevated)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--bg-card)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Icon size={20} color="var(--accent)" />
                <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 600, margin: 0, color: 'var(--text)' }}>
                  {feature.title}
                </h4>
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-2)', margin: 0, paddingLeft: '2.75rem' }}>
                {feature.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 3. Course Highlights
function CourseHighlights() {
  const highlights = [
    { label: 'Duration', value: '12-16 Weeks' },
    { label: 'Training Mode', value: 'Online / Hybrid' },
    { label: 'Fees', value: 'Flexible Monthly Plans' },
    { label: 'Certification', value: 'ISO Certified' },
    { label: 'Projects', value: '5+ Live Projects' },
    { label: 'Internship', value: 'Paid Internship Opportunity' }
  ];

  return (
    <div style={{
      marginTop: '4rem',
      borderTop: '1px solid var(--line)',
      paddingTop: '3rem'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1.5rem'
      }}>
        <FileCheck size={24} color="var(--accent)" />
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1.75rem',
          margin: 0
        }}>
          Course Highlights
        </h2>
      </div>

      <div style={{
        border: '1px solid var(--line)',
        overflow: 'hidden'
      }}>
        {highlights.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              padding: '0.75rem 1.5rem',
              borderBottom: index < highlights.length - 1 ? '1px solid var(--line)' : 'none',
              background: index % 2 === 0 ? 'var(--bg-alt)' : 'var(--bg-card)'
            }}
          >
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--text)' }}>{item.label}</span>
            <span style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-2)' }}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 4. Career Opportunities
function CareerOpportunities() {
  const careers = [
    { role: 'Android Developer', experience: '0-2 Years', salary: '₹4-8 LPA' },
    { role: 'Mobile App Developer', experience: '2-4 Years', salary: '₹8-12 LPA' },
    { role: 'Senior Android Engineer', experience: '4-7 Years', salary: '₹12-20 LPA' },
    { role: 'Mobile Tech Lead', experience: '7-10 Years', salary: '₹20-30 LPA' },
    { role: 'Solution Architect', experience: '10+ Years', salary: '₹30-50 LPA' }
  ];

  return (
    <div style={{
      marginTop: '4rem',
      borderTop: '1px solid var(--line)',
      paddingTop: '3rem'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1.5rem'
      }}>
        <Briefcase size={24} color="var(--accent)" />
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1.75rem',
          margin: 0
        }}>
          Career Opportunities
        </h2>
      </div>

      <div style={{
        border: '1px solid var(--line)',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          padding: '0.75rem 1.5rem',
          background: 'var(--bg-elevated)',
          borderBottom: '1px solid var(--line)',
          fontWeight: 600
        }}>
          <span>Job Role</span>
          <span>Experience Level</span>
          <span>Average Salary</span>
        </div>
        {careers.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              padding: '0.75rem 1.5rem',
              borderBottom: index < careers.length - 1 ? '1px solid var(--line)' : 'none',
              background: index % 2 === 0 ? 'var(--bg-alt)' : 'var(--bg-card)'
            }}
          >
            <span style={{ color: 'var(--text)' }}>{item.role}</span>
            <span style={{ color: 'var(--text-2)' }}>{item.experience}</span>
            <span style={{ color: 'var(--accent)' }}>{item.salary}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. Skills You Will Learn
function SkillsYouWillLearn() {
  const skills = [
    { icon: Smartphone, label: 'Android App Development' },
    { icon: Code, label: 'Kotlin Programming' },
    { icon: Layout, label: 'Android UI/UX Design' },
    { icon: Database, label: 'Firebase & SQLite Integration' },
    { icon: Cloud, label: 'Cloud APIs & Services' },
    { icon: GitBranch, label: 'Git & Version Control' },
    { icon: Shield, label: 'App Security & Encryption' },
    { icon: Layers, label: 'MVVM Architecture' },
    { icon: Package, label: 'Dependency Injection' },
    { icon: Cpu, label: 'Performance Optimization' },
    { icon: Terminal, label: 'Command Line Tools' },
    { icon: Palette, label: 'Material Design Principles' },
    { icon: Smartphone, label: 'Push Notifications' },
    { icon: Database, label: 'Offline Data Storage' },
    { icon: Cloud, label: 'REST API Integration' },
    { icon: Shield, label: 'Biometric Authentication' },
    { icon: Layers, label: 'Jetpack Compose' },
    { icon: Code, label: 'Testing & Debugging' },
    { icon: GitBranch, label: 'CI/CD Pipelines' },
    { icon: Package, label: 'Google Play Console' },
    { icon: Users2, label: 'Agile Development' },
    { icon: Trophy, label: 'App Monetization' }
  ];

  return (
    <div style={{
      marginTop: '4rem',
      borderTop: '1px solid var(--line)',
      paddingTop: '3rem'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1.5rem'
      }}>
        <BookOpen size={24} color="var(--accent)" />
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1.75rem',
          margin: 0
        }}>
          Skills You Will Learn
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))',
        gap: '1px',
        border: '1px solid var(--line)',
        background: 'var(--line)',
      }}>
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <div
              key={index}
              style={{
                background: 'var(--bg-card)',
                padding: '0.75rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-elevated)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--bg-card)';
              }}
            >
              <Icon size={16} color="var(--accent)" />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--text-2)' }}>
                {skill.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 6. Tools & Technologies Covered
function ToolsTechnologies() {
  const tools = [
    'Kotlin', 'Android Studio', 'Jetpack Compose', 'Git', 'GitHub',
    'Firebase', 'SQLite', 'Room Database', 'Retrofit', 'REST APIs',
    'Material Design', 'MVVM', 'Coroutines', 'Flow', 'Dagger/Hilt',
    'Google Play Console', 'Figma', 'Postman', 'Gradle', 'JUnit'
  ];

  return (
    <div style={{
      marginTop: '4rem',
      borderTop: '1px solid var(--line)',
      paddingTop: '3rem'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1.5rem'
      }}>
        <Layers size={24} color="var(--accent)" />
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1.75rem',
          margin: 0
        }}>
          Tools & Technologies Covered
        </h2>
      </div>

      <div style={{
        display: 'flex',
        gap: '0.75rem',
        flexWrap: 'wrap'
      }}>
        {tools.map((tool, index) => (
          <span
            key={index}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              letterSpacing: '0.05em',
              color: 'var(--text-2)',
              border: '1px solid var(--line)',
              padding: '6px 14px',
              background: 'var(--bg-alt)',
              transition: 'background 0.2s, border-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.background = 'var(--bg-elevated)';
              e.currentTarget.style.color = 'var(--text)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--line)';
              e.currentTarget.style.background = 'var(--bg-alt)';
              e.currentTarget.style.color = 'var(--text-2)';
            }}
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

// Syllabus data for each course
const courseSyllabus = {
  'genai': {
    modules: [
      {
        title: 'Introduction to Generative AI',
        topics: [
          'What is Generative AI?',
          'History & Evolution of AI',
          'Types of Generative Models',
          'Applications of Generative AI',
          'Ethics & Responsible AI'
        ]
      },
      {
        title: 'Large Language Models (LLMs)',
        topics: [
          'Introduction to LLMs',
          'Transformer Architecture',
          'GPT Models',
          'BERT & Other Models',
          'Fine-tuning LLMs',
          'Model Evaluation'
        ]
      },
      {
        title: 'Prompt Engineering',
        topics: [
          'Introduction to Prompt Engineering',
          'Zero-shot & Few-shot Learning',
          'Chain of Thought Prompting',
          'Advanced Prompting Techniques',
          'Prompt Optimization',
          'Best Practices'
        ]
      },
      {
        title: 'RAG Pipelines',
        topics: [
          'Introduction to RAG',
          'Vector Databases',
          'Embeddings',
          'Retrieval Strategies',
          'Generation with Context',
          'RAG Evaluation'
        ]
      },
      {
        title: 'Building AI-Powered Applications',
        topics: [
          'API Integration (OpenAI, Anthropic)',
          'Building Chatbots',
          'Document Assistants',
          'Content Generation Tools',
          'Deployment & Scaling',
          'Production Best Practices'
        ]
      },
      {
        title: 'Projects & Capstone',
        topics: [
          'AI Chatbot Development',
          'Document Q&A System',
          'Content Generation Tool',
          'End-to-End AI Application',
          'Project Presentation'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the duration of the Generative AI program?',
        answer: 'The program typically spans 12 weeks with hands-on projects and real-world applications.'
      },
      {
        question: 'Do I need prior AI experience?',
        answer: 'Basic programming knowledge is recommended, but we cover AI concepts from the ground up.'
      },
      {
        question: 'What will I build during this program?',
        answer: 'You will build AI chatbots, document Q&A systems, content generation tools, and a complete AI application.'
      },
      {
        question: 'Will I get a certificate?',
        answer: 'Yes, you will receive an industry-recognized certificate upon completion.'
      },
      {
        question: 'What tools will I use?',
        answer: 'You will work with OpenAI API, LangChain, Vector Databases, Python, and modern AI frameworks.'
      }
    ]
  },
  'fullstack': {
    modules: [
      {
        title: 'Frontend Development',
        topics: [
          'React Fundamentals',
          'Components & Props',
          'State & Hooks',
          'React Router',
          'State Management (Redux)',
          'API Integration',
          'Responsive Design'
        ]
      },
      {
        title: 'Backend Development',
        topics: [
          'Node.js Fundamentals',
          'Express.js',
          'REST APIs',
          'Authentication & Authorization',
          'Database Integration',
          'Error Handling'
        ]
      },
      {
        title: 'Python/Django Stack',
        topics: [
          'Python Fundamentals',
          'Django Framework',
          'Models & Migrations',
          'Views & Templates',
          'Django REST Framework',
          'Authentication'
        ]
      },
      {
        title: 'Database & Deployment',
        topics: [
          'SQL & NoSQL Databases',
          'MongoDB',
          'PostgreSQL',
          'Cloud Deployment',
          'CI/CD Pipelines',
          'Docker & Containerization'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the duration of the Full Stack program?',
        answer: 'The program spans 16 weeks with live projects and internship opportunities.'
      },
      {
        question: 'Do I need prior coding experience?',
        answer: 'Basic programming knowledge is helpful, but we start from fundamentals.'
      },
      {
        question: 'Will I get an internship?',
        answer: 'Yes, the program includes internship opportunities with real project experience.'
      }
    ]
  },
  'web-development': {
    modules: [
      {
        title: 'HTML & CSS Fundamentals',
        topics: [
          'HTML5 Semantic Elements',
          'CSS3 Styling',
          'Flexbox & Grid',
          'Responsive Design',
          'CSS Frameworks'
        ]
      },
      {
        title: 'JavaScript Essentials',
        topics: [
          'ES6+ Features',
          'DOM Manipulation',
          'Event Handling',
          'Async/Await',
          'API Integration'
        ]
      },
      {
        title: 'Frontend Frameworks',
        topics: [
          'React.js Fundamentals',
          'Components & Props',
          'State Management',
          'React Router',
          'Build Tools'
        ]
      },
      {
        title: 'Backend Development',
        topics: [
          'Node.js',
          'Express.js',
          'REST APIs',
          'Authentication',
          'Database Integration'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the duration of the Web Development program?',
        answer: 'The program spans 14 weeks with live projects and internship opportunities.'
      },
      {
        question: 'Do I need prior coding experience?',
        answer: 'No prior experience is required. We start from the fundamentals.'
      }
    ]
  },
  'mobile-app-development': {
    modules: [
      {
        title: 'React Native Fundamentals',
        topics: [
          'React Native Setup',
          'Components & Styling',
          'Navigation',
          'State Management',
          'API Integration'
        ]
      },
      {
        title: 'Flutter Development',
        topics: [
          'Dart Fundamentals',
          'Flutter Widgets',
          'Layouts',
          'State Management',
          'Firebase Integration'
        ]
      },
      {
        title: 'Advanced Mobile Features',
        topics: [
          'Push Notifications',
          'Camera & Gallery',
          'Location Services',
          'Offline Storage',
          'Biometric Authentication'
        ]
      },
      {
        title: 'App Deployment',
        topics: [
          'App Store Submission',
          'Play Store Submission',
          'App Monetization',
          'Analytics',
          'App Maintenance'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the duration of the Mobile App program?',
        answer: 'The program spans 14 weeks with live projects and internship opportunities.'
      },
      {
        question: 'Which platforms will I learn?',
        answer: 'You\'ll learn both React Native and Flutter for cross-platform development.'
      }
    ]
  },
  'uiux': {
    modules: [
      {
        title: 'UX Research & Discovery',
        topics: [
          'User Research Methods',
          'User Personas',
          'Journey Mapping',
          'Competitive Analysis',
          'Information Architecture'
        ]
      },
      {
        title: 'Wireframing & Prototyping',
        topics: [
          'Low-Fidelity Wireframes',
          'High-Fidelity Wireframes',
          'Interactive Prototypes',
          'Figma Advanced',
          'Adobe XD'
        ]
      },
      {
        title: 'Visual Design',
        topics: [
          'Color Theory',
          'Typography',
          'Layout & Composition',
          'Design Systems',
          'Responsive Design'
        ]
      },
      {
        title: 'UI/UX Projects',
        topics: [
          'Mobile App Design',
          'Web App Design',
          'Design Systems',
          'Portfolio Development',
          'Case Studies'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the duration of the UI/UX program?',
        answer: 'The program spans 10 weeks with portfolio projects and certification.'
      },
      {
        question: 'Do I need design experience?',
        answer: 'No prior design experience is required. We start from fundamentals.'
      }
    ]
  },
  'datascience': {
    modules: [
      {
        title: 'Data Science Fundamentals',
        topics: [
          'Introduction to Data Science',
          'Data Types & Structures',
          'Data Collection',
          'Data Quality Assessment',
          'Data Governance'
        ]
      },
      {
        title: 'Data Cleaning & Preprocessing',
        topics: [
          'Data Cleaning Techniques',
          'Handling Missing Values',
          'Outlier Detection',
          'Data Transformation',
          'Feature Engineering'
        ]
      },
      {
        title: 'Machine Learning',
        topics: [
          'Supervised Learning',
          'Unsupervised Learning',
          'Model Evaluation',
          'Cross Validation',
          'Hyperparameter Tuning'
        ]
      },
      {
        title: 'Data Visualization',
        topics: [
          'Matplotlib',
          'Seaborn',
          'Plotly',
          'Power BI',
          'Tableau'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the duration of the Data Science program?',
        answer: 'The program spans 14 weeks with live projects and certification.'
      },
      {
        question: 'Do I need prior programming experience?',
        answer: 'Basic Python knowledge is helpful but not required. We start from fundamentals.'
      }
    ]
  },
  'python': {
    modules: [
      {
        title: 'Python Fundamentals',
        topics: [
          'Python Syntax',
          'Data Types',
          'Functions',
          'Modules & Packages',
          'File Handling'
        ]
      },
      {
        title: 'Advanced Python',
        topics: [
          'OOP Concepts',
          'Decorators',
          'Generators',
          'Context Managers',
          'Metaclasses'
        ]
      },
      {
        title: 'Web Development with Django',
        topics: [
          'Django Framework',
          'Models & Migrations',
          'Views & Templates',
          'Django REST Framework',
          'Authentication'
        ]
      },
      {
        title: 'Data Science with Python',
        topics: [
          'NumPy',
          'Pandas',
          'Matplotlib',
          'Seaborn',
          'Scikit-learn'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the duration of the Python program?',
        answer: 'The program spans 8 weeks with mentor support and certification.'
      },
      {
        question: 'Do I need prior coding experience?',
        answer: 'No prior experience is required. We start from the basics.'
      }
    ]
  },
  'android': {
    modules: [
      {
        title: 'Android Fundamentals',
        topics: [
          'Kotlin Basics',
          'Android Studio Setup',
          'Activities & Fragments',
          'Layouts & UI Design',
          'Intents & Navigation'
        ]
      },
      {
        title: 'Advanced Android',
        topics: [
          'RecyclerView',
          'ViewModels',
          'LiveData',
          'Room Database',
          'Retrofit API Integration'
        ]
      },
      {
        title: 'Jetpack Compose',
        topics: [
          'Compose Fundamentals',
          'State Management',
          'Navigation in Compose',
          'Theming & Styling',
          'Compose Animations'
        ]
      },
      {
        title: 'App Deployment',
        topics: [
          'Google Play Store Submission',
          'App Signing',
          'App Monetization',
          'Firebase Analytics',
          'App Maintenance'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the duration of the Android program?',
        answer: 'The program spans 12 weeks with live projects and internship opportunities.'
      },
      {
        question: 'Do I need prior Android experience?',
        answer: 'Basic programming knowledge is helpful, but we start from fundamentals.'
      }
    ]
  },
  'cloud-computing': {
    modules: [
      {
        title: 'Cloud Fundamentals',
        topics: [
          'Introduction to Cloud Computing',
          'IaaS, PaaS, SaaS Models',
          'AWS, Azure, GCP Overview',
          'Virtualization',
          'Cloud Architecture'
        ]
      },
      {
        title: 'AWS Services',
        topics: [
          'EC2',
          'S3',
          'VPC',
          'IAM',
          'RDS',
          'Lambda'
        ]
      },
      {
        title: 'Containerization & DevOps',
        topics: [
          'Docker',
          'Kubernetes',
          'CI/CD Pipelines',
          'Terraform',
          'Monitoring & Logging'
        ]
      },
      {
        title: 'Cloud Deployment',
        topics: [
          'Deploying Web Applications',
          'Microservices Architecture',
          'Serverless Applications',
          'Disaster Recovery',
          'Cloud Security'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the duration of the Cloud Computing program?',
        answer: 'The program spans 12 weeks with live projects and certification.'
      },
      {
        question: 'Do I need prior cloud experience?',
        answer: 'Basic IT knowledge is helpful, but we start from fundamentals.'
      }
    ]
  }
};

export default function CoursesDetails() {
  const { slug } = useParams();
  const [openModules, setOpenModules] = useState({});
  const [openFAQs, setOpenFAQs] = useState({});

  // Find the course from local data
  const course = courses.find(item => item.slug === slug);

  // Get syllabus for this course
  const syllabus = courseSyllabus[slug] || {
    modules: [
      { title: 'Module 1: Foundation', topics: ['Core Concepts', 'Best Practices', 'Tools & Technologies'] },
      { title: 'Module 2: Advanced Topics', topics: ['Advanced Implementation', 'Optimization', 'Integration'] },
      { title: 'Module 3: Real-World Application', topics: ['Project Development', 'Testing', 'Deployment'] }
    ],
    faqs: [
      {
        question: 'What is the duration of this program?',
        answer: 'The duration varies by course but typically ranges from 8-16 weeks depending on the specific program.'
      },
      {
        question: 'Do you offer customized training?',
        answer: 'Yes, we offer customized training programs tailored to your specific learning goals and requirements.'
      },
      {
        question: 'What kind of support do you provide?',
        answer: 'We provide comprehensive support including mentorship, project guidance, and post-program assistance.'
      }
    ]
  };

  const toggleModule = (index) => {
    setOpenModules(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleFAQ = (index) => {
    setOpenFAQs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (!course) {
    return (
      <div style={{ padding: '6rem 2rem', minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
        <div className="container">
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-sans)' }}>Course Not Found</h1>
          <p style={{ color: 'var(--text-2)' }}>The course you're looking for doesn't exist or has been moved.</p>
        </div>
      </div>
    );
  }

  const Icon = course.Icon;

  return (
    <>
      <Helmet>
        <title>{course.title} | AstirMind Training Program</title>
        <meta name="description" content={course.desc} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`${course.title} | AstirMind Training Program`} />
        <meta property="og:description" content={course.desc} />
        <meta property="og:type" content="website" />
      </Helmet>

      <section style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--text)',
        padding: '6rem 0'
      }}>
        <div className="container">
          {/* Hero */}
          <div style={{
            marginBottom: '4rem',
            borderBottom: '1px solid var(--line)',
            paddingBottom: '2rem'
          }}>
            <div style={{
              width: 64,
              height: 64,
              marginBottom: '1.5rem',
              color: 'var(--accent)'
            }}>
              <Icon size={64} strokeWidth={1.5} />
            </div>

            <span style={{
              color: 'var(--accent)',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              fontFamily: 'var(--font-mono)'
            }}>
              {course.n} · Program
            </span>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              marginTop: '1rem',
              marginBottom: '1rem',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '-0.03em'
            }}>
              {course.title}
            </h1>

            {/* Rating Section */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
              flexWrap: 'wrap'
            }}>
              <StarRating rating={course.rating || 4.5} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-3)'
              }}>
                Based on {course.reviews || 0} reviews
              </span>
            </div>

            <p style={{
              maxWidth: 760,
              lineHeight: 1.8,
              fontSize: '1.05rem',
              color: 'var(--text-2)'
            }}>
              {course.desc}
            </p>
          </div>

          {/* Tags */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '4rem'
          }}>
            {course.tags.map((tag, index) => (
              <span key={index} className="badge-raw" style={tag === 'Internship' || tag === 'Certification' ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : {}}>
                {tag}
              </span>
            ))}
          </div>

          {/* ========== ALL NEW SECTIONS ========== */}
          
          {/* 1. Why Learn This Course? */}
          <WhyLearnThis courseTitle={course.title} />

          {/* 2. Why AstirMind? */}
          <WhyAstirMind />

          {/* 3. Course Highlights */}
          <CourseHighlights />

          {/* 4. Career Opportunities */}
          <CareerOpportunities />

          {/* 5. Skills You Will Learn */}
          <SkillsYouWillLearn />

          {/* 6. Tools & Technologies Covered */}
          <ToolsTechnologies />

          {/* 7. Who Should Join? */}
          <WhoShouldJoin />

          {/* 8. Syllabus Section */}
          <div style={{
            marginTop: '4rem',
            borderTop: '1px solid var(--line)',
            paddingTop: '3rem'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-sans)',
              marginBottom: '1rem',
              fontSize: '1.75rem'
            }}>
              Course Curriculum
            </h2>
            <p style={{
              color: 'var(--text-2)',
              marginBottom: '2rem',
              maxWidth: 600
            }}>
              Comprehensive syllabus designed to give you hands-on experience with real-world projects
            </p>

            <div style={{
              border: '1px solid var(--line)',
              padding: '0 1.5rem'
            }}>
              {syllabus.modules.map((module, index) => (
                <SyllabusModule
                  key={index}
                  module={module}
                  index={index}
                  isOpen={openModules[index] || false}
                  onToggle={() => toggleModule(index)}
                />
              ))}
            </div>

            {/* Module Stats */}
            <div style={{
              display: 'flex',
              gap: '2rem',
              marginTop: '2rem',
              padding: '1.5rem',
              border: '1px solid var(--line)',
              background: 'var(--bg-alt)',
              flexWrap: 'wrap'
            }}>
              <div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  color: 'var(--text-3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}>
                  Total Modules
                </span>
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--accent)'
                }}>
                  {syllabus.modules.length}
                </div>
              </div>
              <div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  color: 'var(--text-3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}>
                  Total Topics
                </span>
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--text)'
                }}>
                  {syllabus.modules.reduce((total, mod) => total + mod.topics.length, 0)}
                </div>
              </div>
              <div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.5rem',
                  color: 'var(--text-3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}>
                  Duration
                </span>
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--text)'
                }}>
                  {course.tags.find(t => t.includes('Week')) || 'Flexible'}
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div style={{
            marginTop: '4rem',
            borderTop: '1px solid var(--line)',
            paddingTop: '3rem'
          }}>
            <h2 style={{
              fontFamily: 'var(--font-sans)',
              marginBottom: '1rem',
              fontSize: '1.75rem'
            }}>
              Frequently Asked Questions
            </h2>
            <p style={{
              color: 'var(--text-2)',
              marginBottom: '2rem',
              maxWidth: 600
            }}>
              Find answers to common questions about this program
            </p>

            <div style={{
              border: '1px solid var(--line)',
              padding: '0 1.5rem'
            }}>
              {syllabus.faqs && syllabus.faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  faq={faq}
                  index={index}
                  isOpen={openFAQs[index] || false}
                  onToggle={() => toggleFAQ(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}