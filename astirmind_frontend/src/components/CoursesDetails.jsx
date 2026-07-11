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

// ALL audience types - SAME for EVERY course (UPDATED with B.A. and 12th Class)
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
    icon: Award,
    title: 'B.A. Students',
    description: 'Arts students who want to develop technical skills and explore diverse career opportunities in the digital economy, combining creative thinking with technology.'
  },
  {
    icon: GraduationCap,
    title: '12th Class Students',
    description: 'High school graduates looking to build a strong foundation in technology before entering college or starting their professional journey.'
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

// ============ COURSE-SPECIFIC DATA ============

// 1. Career Opportunities for each course
const courseCareers = {
  'android': [
    { role: 'Android Developer', experience: '0-2 Years' },
    { role: 'Mobile App Developer', experience: '2-4 Years' },
    { role: 'Senior Android Engineer', experience: '4-7 Years'  },
    { role: 'Mobile Tech Lead', experience: '7-10 Years'  },
    { role: 'Solution Architect', experience: '10+ Years'  }
  ],
  'genai': [
    { role: 'AI Engineer', experience: '0-2 Years' },
    { role: 'ML Engineer', experience: '2-5 Years'},
    { role: 'Prompt Engineer', experience: '2-4 Years' },
    { role: 'AI Product Manager', experience: '5-8 Years' },
    { role: 'Chief AI Officer', experience: '10+ Years' }
  ],
  'fullstack': [
    { role: 'Frontend Developer', experience: '0-2 Years' },
    { role: 'Backend Developer', experience: '2-4 Years' },
    { role: 'Full Stack Developer', experience: '3-6 Years' },
    { role: 'Tech Lead', experience: '6-10 Years' },
    { role: 'CTO', experience: '10+ Years'}
  ],
  'web-development': [
    { role: 'Web Developer', experience: '0-2 Years'},
    { role: 'Frontend Engineer', experience: '2-4 Years' },
    { role: 'Senior Web Developer', experience: '4-7 Years'},
    { role: 'Web Tech Lead', experience: '7-10 Years' },
    { role: 'Web Architect', experience: '10+ Years' }
  ],
  'mobile-app-development': [
    { role: 'Mobile Developer', experience: '0-2 Years'},
    { role: 'React Native Developer', experience: '2-4 Years'},
    { role: 'Flutter Developer', experience: '2-5 Years'},
    { role: 'Mobile Tech Lead', experience: '5-9 Years'},
    { role: 'Mobile Architect', experience: '10+ Years' }
  ],
  'uiux': [
    { role: 'UI/UX Designer', experience: '0-2 Years'},
    { role: 'Product Designer', experience: '2-5 Years'},
    { role: 'Senior UX Designer', experience: '4-8 Years'},
    { role: 'UX Lead', experience: '6-10 Years'},
    { role: 'Design Director', experience: '10+ Years'}
  ],
  'datascience': [
    { role: 'Data Analyst', experience: '0-2 Years'},
    { role: 'Data Scientist', experience: '2-5 Years'},
    { role: 'Senior Data Scientist', experience: '4-8 Years'},
    { role: 'ML Tech Lead', experience: '7-10 Years'},
    { role: 'Chief Data Officer', experience: '10+ Years'}
  ],
  'python': [
    { role: 'Python Developer', experience: '0-2 Years'},
    { role: 'Backend Developer', experience: '2-4 Years'},
    { role: 'Senior Python Engineer', experience: '4-7 Years' },
    { role: 'Python Tech Lead', experience: '7-10 Years'},
    { role: 'Solution Architect', experience: '10+ Years'}
  ],
  'cloud-computing': [
    { role: 'Cloud Engineer', experience: '0-2 Years'},
    { role: 'DevOps Engineer', experience: '2-5 Years'},
    { role: 'Senior Cloud Engineer', experience: '4-8 Years'},
    { role: 'Cloud Architect', experience: '7-12 Years'},
    { role: 'Principal Cloud Architect', experience: '12+ Years'}
  ]
};

// 2. Skills for each course
const courseSkills = {
  'android': [
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
  ],
  'genai': [
    { icon: Code, label: 'Prompt Engineering' },
    { icon: Cloud, label: 'LLM Integration (OpenAI, Claude)' },
    { icon: Layers, label: 'RAG Pipeline Development' },
    { icon: Database, label: 'Vector Databases' },
    { icon: GitBranch, label: 'LangChain & LangGraph' },
    { icon: Shield, label: 'AI Ethics & Safety' },
    { icon: Cpu, label: 'Model Fine-tuning' },
    { icon: Package, label: 'API Development' },
    { icon: Terminal, label: 'Python Programming' },
    { icon: Cloud, label: 'Cloud Deployment (AWS/Azure)' },
    { icon: Users2, label: 'AI Product Strategy' },
    { icon: Trophy, label: 'AI Agents Development' }
  ],
  'fullstack': [
    { icon: Code, label: 'React.js Development' },
    { icon: Code, label: 'Node.js Development' },
    { icon: Code, label: 'Python/Django Development' },
    { icon: Database, label: 'Database Design (SQL & NoSQL)' },
    { icon: Cloud, label: 'REST API Development' },
    { icon: GitBranch, label: 'Git & Version Control' },
    { icon: Shield, label: 'Authentication & Authorization' },
    { icon: Layers, label: 'Microservices Architecture' },
    { icon: Package, label: 'Docker & Containerization' },
    { icon: Cpu, label: 'System Design' },
    { icon: Terminal, label: 'CI/CD Pipelines' },
    { icon: Cloud, label: 'Cloud Deployment' }
  ],
  'web-development': [
    { icon: Code, label: 'HTML5 & CSS3' },
    { icon: Code, label: 'JavaScript (ES6+)' },
    { icon: Layout, label: 'Responsive Web Design' },
    { icon: Layers, label: 'React.js Framework' },
    { icon: Package, label: 'Node.js Backend' },
    { icon: Database, label: 'MongoDB & SQL' },
    { icon: Cloud, label: 'API Integration' },
    { icon: GitBranch, label: 'Git & GitHub' },
    { icon: Palette, label: 'UI/UX Principles' },
    { icon: Terminal, label: 'Command Line Basics' },
    { icon: Cloud, label: 'Web Hosting & Deployment' },
    { icon: Trophy, label: 'Website Optimization' }
  ],
  'mobile-app-development': [
    { icon: Smartphone, label: 'React Native Development' },
    { icon: Smartphone, label: 'Flutter Development' },
    { icon: Code, label: 'Dart Programming' },
    { icon: Layout, label: 'Mobile UI/UX Design' },
    { icon: Database, label: 'Firebase Integration' },
    { icon: Cloud, label: 'REST API Integration' },
    { icon: Shield, label: 'App Security' },
    { icon: Layers, label: 'State Management' },
    { icon: Package, label: 'Push Notifications' },
    { icon: Cpu, label: 'Performance Optimization' },
    { icon: GitBranch, label: 'Git & Version Control' },
    { icon: Trophy, label: 'App Store & Play Store Deployment' }
  ],
  'uiux': [
    { icon: Palette, label: 'User Research & Discovery' },
    { icon: Layout, label: 'Wireframing & Prototyping' },
    { icon: Palette, label: 'Visual Design (Color, Typography)' },
    { icon: Layers, label: 'Design Systems' },
    { icon: Package, label: 'Figma Advanced' },
    { icon: Cloud, label: 'Adobe XD & Photoshop' },
    { icon: Users2, label: 'User Testing & Validation' },
    { icon: Trophy, label: 'Portfolio Development' },
    { icon: Terminal, label: 'Interactive Prototyping' },
    { icon: Database, label: 'Information Architecture' },
    { icon: GitBranch, label: 'Design Handoff' },
    { icon: Shield, label: 'Accessibility Design' }
  ],
  'datascience': [
    { icon: Code, label: 'Python Programming' },
    { icon: Code, label: 'Data Cleaning & Preprocessing' },
    { icon: Database, label: 'SQL & NoSQL Databases' },
    { icon: Layers, label: 'Machine Learning Algorithms' },
    { icon: Cloud, label: 'Deep Learning (TensorFlow, PyTorch)' },
    { icon: Package, label: 'Data Visualization (Matplotlib, Seaborn)' },
    { icon: Cpu, label: 'Statistical Analysis' },
    { icon: GitBranch, label: 'Git & Version Control' },
    { icon: Shield, label: 'ML Model Deployment' },
    { icon: Terminal, label: 'Big Data Tools (Spark, Hadoop)' },
    { icon: Cloud, label: 'Cloud ML Services' },
    { icon: Trophy, label: 'Business Intelligence' }
  ],
  'python': [
    { icon: Code, label: 'Python Fundamentals' },
    { icon: Code, label: 'Object-Oriented Programming' },
    { icon: Database, label: 'Data Structures & Algorithms' },
    { icon: Cloud, label: 'Django Web Framework' },
    { icon: Package, label: 'REST API Development' },
    { icon: Layers, label: 'NumPy & Pandas' },
    { icon: Cpu, label: 'Data Visualization' },
    { icon: GitBranch, label: 'Git & Version Control' },
    { icon: Shield, label: 'Automation & Scripting' },
    { icon: Terminal, label: 'Testing & Debugging' },
    { icon: Cloud, label: 'Database Integration' },
    { icon: Trophy, label: 'Project Development' }
  ],
  'cloud-computing': [
    { icon: Cloud, label: 'Cloud Fundamentals (IaaS, PaaS, SaaS)' },
    { icon: Cloud, label: 'AWS Core Services' },
    { icon: Cloud, label: 'Azure & GCP' },
    { icon: Layers, label: 'Docker & Kubernetes' },
    { icon: Package, label: 'CI/CD Pipelines' },
    { icon: Shield, label: 'Cloud Security' },
    { icon: Cpu, label: 'Infrastructure as Code (Terraform)' },
    { icon: GitBranch, label: 'Git & Version Control' },
    { icon: Terminal, label: 'Monitoring & Logging' },
    { icon: Database, label: 'Cloud Databases' },
    { icon: Code, label: 'Serverless Architecture' },
    { icon: Trophy, label: 'Disaster Recovery & Backup' }
  ]
};

// 3. Tools & Technologies for each course
const courseTools = {
  'android': [
    'Kotlin', 'Android Studio', 'Jetpack Compose', 'Git', 'GitHub',
    'Firebase', 'SQLite', 'Room Database', 'Retrofit', 'REST APIs',
    'Material Design', 'MVVM', 'Coroutines', 'Flow', 'Dagger/Hilt',
    'Google Play Console', 'Figma', 'Postman', 'Gradle', 'JUnit'
  ],
  'genai': [
    'Python', 'OpenAI API', 'Claude API', 'LangChain', 'Vector Databases',
    'Pinecone', 'Weaviate', 'FAISS', 'Hugging Face', 'PyTorch',
    'TensorFlow', 'Docker', 'FastAPI', 'Streamlit', 'AWS Bedrock',
    'Git', 'GitHub', 'Jupyter', 'VS Code', 'LangGraph'
  ],
  'fullstack': [
    'React', 'Node.js', 'Python', 'Django', 'Express.js',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Git', 'GitHub',
    'Docker', 'AWS', 'REST APIs', 'Redux', 'Webpack',
    'TypeScript', 'Tailwind CSS', 'JWT', 'Jest', 'Postman'
  ],
  'web-development': [
    'HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js',
    'Express.js', 'MongoDB', 'MySQL', 'Git', 'GitHub',
    'Bootstrap', 'Tailwind CSS', 'REST APIs', 'Webpack', 'VS Code',
    'Chrome DevTools', 'Postman', 'Netlify', 'Vercel', 'Heroku'
  ],
  'mobile-app-development': [
    'React Native', 'Flutter', 'Dart', 'JavaScript', 'Firebase',
    'SQLite', 'REST APIs', 'Git', 'GitHub', 'Android Studio',
    'Xcode', 'VS Code', 'Redux', 'Bloc', 'Provider',
    'App Store Connect', 'Google Play Console', 'Postman', 'Figma', 'Expo'
  ],
  'uiux': [
    'Figma', 'Adobe XD', 'Adobe Photoshop', 'Adobe Illustrator', 'Sketch',
    'InVision', 'Miro', 'Zeplin', 'UX Research Tools', 'Hotjar',
    'Google Analytics', 'UsabilityHub', 'Protopie', 'Framer', 'Webflow',
    'Notion', 'Slack', 'Trello', 'Jira', 'Abstract'
  ],
  'datascience': [
    'Python', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn',
    'Scikit-learn', 'TensorFlow', 'PyTorch', 'Keras', 'Jupyter',
    'SQL', 'MongoDB', 'Tableau', 'Power BI', 'Hadoop',
    'Spark', 'Docker', 'Git', 'AWS SageMaker', 'GCP AI Platform'
  ],
  'python': [
    'Python', 'Django', 'Flask', 'FastAPI', 'NumPy',
    'Pandas', 'Matplotlib', 'Seaborn', 'SQLite', 'PostgreSQL',
    'MySQL', 'Git', 'GitHub', 'VS Code', 'PyCharm',
    'Jupyter', 'Docker', 'REST APIs', 'Postman', 'Pytest'
  ],
  'cloud-computing': [
    'AWS (EC2, S3, VPC, IAM)', 'Azure', 'GCP', 'Docker', 'Kubernetes',
    'Terraform', 'Ansible', 'CI/CD (Jenkins, GitHub Actions)', 'Linux', 'Bash',
    'Python', 'Node.js', 'MySQL', 'PostgreSQL', 'MongoDB',
    'Redis', 'Nginx', 'Apache', 'CloudWatch', 'Prometheus'
  ]
};

// ============ COMPONENTS ============

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

// 1. Why Learn This Course? - UPDATED (Salary Insights REMOVED)
function WhyLearnThis({ courseTitle }) {
  const data = {
    futureScope: `The demand for ${courseTitle} professionals is growing exponentially. With the rapid digital transformation across industries, skilled developers are needed more than ever.`,
    careerDemand: 'The job market for developers is projected to grow by 22% through 2030, with thousands of new positions opening each year.',
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
          background: 'var(--bg-alt)',
          gridColumn: '1 / 2'
        }}>
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={18} color="var(--accent)" /> Career Demand
          </h4>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.7, margin: 0 }}>{data.careerDemand}</p>
        </div>

        <div style={{
          padding: '1.5rem',
          border: '1px solid var(--line)',
          background: 'var(--bg-alt)',
          gridColumn: '2 / 3'
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
    { label: 'Duration Options', value: '120 hours • 45 Days • 12-16 Weeks • 6-8 Months' },
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

// 4. Career Opportunities - COURSE SPECIFIC
function CareerOpportunities({ courseSlug }) {
  const careers = courseCareers[courseSlug] || courseCareers['android'];
  
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
          gridTemplateColumns: '1fr 1fr',
          padding: '0.75rem 1.5rem',
          background: 'var(--bg-elevated)',
          borderBottom: '1px solid var(--line)',
          fontWeight: 600
        }}>
          <span>Job Role</span>
          <span>Experience Level</span>
        </div>
        {careers.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              padding: '0.75rem 1.5rem',
              borderBottom: index < careers.length - 1 ? '1px solid var(--line)' : 'none',
              background: index % 2 === 0 ? 'var(--bg-alt)' : 'var(--bg-card)'
            }}
          >
            <span style={{ color: 'var(--text)' }}>{item.role}</span>
            <span style={{ color: 'var(--text-2)' }}>{item.experience}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. Skills You Will Learn - COURSE SPECIFIC
function SkillsYouWillLearn({ courseSlug }) {
  const skills = courseSkills[courseSlug] || courseSkills['android'];
  
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

// 6. Tools & Technologies Covered - COURSE SPECIFIC
function ToolsTechnologies({ courseSlug }) {
  const tools = courseTools[courseSlug] || courseTools['android'];
  
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

// ============ NEW SECTIONS TO INSERT BEFORE FAQ ============

// Live Projects Section
function LiveProjects() {
  const projects = [
    {
      name: "E-Commerce Platform with AI Recommendations",
      description: "A full-featured e-commerce platform with AI-powered product recommendations, real-time inventory management, and secure payment gateway integration.",
      difficulty: "Advanced",
      techStack: "React, Node.js, Python, MongoDB, OpenAI API, Stripe, Docker, AWS"
    },
    {
      name: "Healthcare Patient Management System",
      description: "A comprehensive patient management system with appointment scheduling, EHR integration, telemedicine features, and HIPAA-compliant data security.",
      difficulty: "Intermediate",
      techStack: "Flutter, Firebase, Node.js, PostgreSQL, Twilio, JWT, Azure"
    },
    {
      name: "FinTech Mobile Banking App",
      description: "A secure mobile banking application with biometric authentication, real-time transaction tracking, budget planning, and investment portfolio management.",
      difficulty: "Advanced",
      techStack: "Kotlin, Jetpack Compose, Spring Boot, MySQL, Redis, OAuth2, AWS"
    },
    {
      name: "AI-Powered Content Generation Tool",
      description: "An intelligent content generation platform leveraging LLMs for blog writing, social media posts, and marketing copy with customization options.",
      difficulty: "Intermediate",
      techStack: "Python, FastAPI, LangChain, Vector Databases, React, Docker, GCP"
    },
    {
      name: "Smart IoT Home Automation Dashboard",
      description: "A real-time IoT dashboard for controlling smart home devices with voice commands, automation rules, and energy consumption analytics.",
      difficulty: "Advanced",
      techStack: "React Native, Node.js, MQTT, InfluxDB, Grafana, AWS IoT, Python"
    },
    {
      name: "Online Learning Management System",
      description: "A complete LMS with video streaming, assessment tools, progress tracking, certification generation, and instructor analytics dashboard.",
      difficulty: "Intermediate",
      techStack: "Django, React, PostgreSQL, Redis, WebRTC, Stripe, Celery"
    },
    {
      name: "Real Estate Property Finder",
      description: "A property discovery platform with advanced search filters, map integration, property valuation tools, and virtual tour capabilities.",
      difficulty: "Intermediate",
      techStack: "Next.js, TypeScript, MongoDB, Mapbox, ElasticSearch, AWS, Tailwind"
    },
    {
      name: "Food Delivery Optimizer",
      description: "A logistics optimization platform for food delivery with real-time tracking, route optimization, driver management, and customer analytics.",
      difficulty: "Advanced",
      techStack: "Flutter, Go, Redis, Kafka, PostgreSQL, Google Maps API, Docker"
    }
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
        <FolderOpen size={24} color="var(--accent)" />
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1.75rem',
          margin: 0
        }}>
          Live Projects
        </h2>
      </div>

      <p style={{
        color: 'var(--text-2)',
        marginBottom: '2rem',
        maxWidth: 700,
        lineHeight: 1.7,
        fontSize: '1rem'
      }}>
        Work on real industry-level projects that build your portfolio and prepare you for the professional world.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
        gap: '1px',
        border: '1px solid var(--line)',
        background: 'var(--line)',
      }}>
        {projects.map((project, index) => (
          <div
            key={index}
            style={{
              background: 'var(--bg-card)',
              padding: '1.75rem',
              transition: 'background 0.2s, transform 0.2s',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
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
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}>
              <h4 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                fontWeight: 600,
                margin: 0,
                color: 'var(--text)'
              }}>
                {project.name}
              </h4>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                letterSpacing: '0.08em',
                padding: '4px 10px',
                border: '1px solid var(--accent)',
                color: 'var(--accent)',
                whiteSpace: 'nowrap',
                marginLeft: '1rem'
              }}>
                {project.difficulty}
              </span>
            </div>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              lineHeight: 1.7,
              color: 'var(--text-2)',
              margin: 0
            }}>
              {project.description}
            </p>
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              marginTop: '0.25rem'
            }}>
              {project.techStack.split(', ').map((tech, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5625rem',
                    letterSpacing: '0.03em',
                    color: 'var(--text-3)',
                    border: '1px solid var(--line)',
                    padding: '3px 8px',
                    background: 'var(--bg-alt)'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Student Portfolio Section
function StudentPortfolio() {
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
        <Code size={24} color="var(--accent)" />
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1.75rem',
          margin: 0
        }}>
          Student Portfolio Showcase
        </h2>
      </div>

      <p style={{
        color: 'var(--text-2)',
        marginBottom: '2rem',
        maxWidth: 700,
        lineHeight: 1.7,
        fontSize: '1rem'
      }}>
        Explore the work of our alumni — GitHub profiles, certifications, and project screenshots that demonstrate their growth.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{
          padding: '1.5rem',
          border: '1px solid var(--line)',
          background: 'var(--bg-alt)',
          transition: 'border-color 0.2s, background 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent)';
          e.currentTarget.style.background = 'var(--bg-elevated)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--line)';
          e.currentTarget.style.background = 'var(--bg-alt)';
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <GitBranch size={18} color="var(--accent)" />
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>GitHub Portfolios</h4>
          </div>
          <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
            View student repositories with live projects, contributions, and collaborative work.
          </p>
        </div>

        <div style={{
          padding: '1.5rem',
          border: '1px solid var(--line)',
          background: 'var(--bg-alt)',
          transition: 'border-color 0.2s, background 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent)';
          e.currentTarget.style.background = 'var(--bg-elevated)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--line)';
          e.currentTarget.style.background = 'var(--bg-alt)';
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Award size={18} color="var(--accent)" />
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>Certificates</h4>
          </div>
          <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
            ISO Certified Internship certificates with online verification capabilities.
          </p>
        </div>

        <div style={{
          padding: '1.5rem',
          border: '1px solid var(--line)',
          background: 'var(--bg-alt)',
          gridColumn: '1 / -1',
          transition: 'border-color 0.2s, background 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent)';
          e.currentTarget.style.background = 'var(--bg-elevated)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--line)';
          e.currentTarget.style.background = 'var(--bg-alt)';
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Smartphone size={18} color="var(--accent)" />
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>App Screenshots & Demos</h4>
          </div>
          <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
            Showcase of student-built applications with screenshots, video demos, and case studies.
          </p>
        </div>
      </div>
    </div>
  );
}

// Internship Program & Certification Section
function InternshipProgram() {
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
        <Award size={24} color="var(--accent)" />
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1.75rem',
          margin: 0
        }}>
          Internship Program & Certification
        </h2>
      </div>

      <p style={{
        color: 'var(--text-2)',
        marginBottom: '2rem',
        maxWidth: 700,
        lineHeight: 1.7,
        fontSize: '1rem'
      }}>
        Gain hands-on experience through our unique internship program where you work on real client projects or structured institute projects that mirror professional workflows.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1px',
        border: '1px solid var(--line)',
        background: 'var(--line)',
      }}>
        <div style={{
          background: 'var(--bg-card)',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Briefcase size={20} color="var(--accent)" />
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 600, margin: 0 }}>Real Client Projects</h4>
          </div>
          <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
            Work on actual client requirements with real deadlines, feedback loops, and deliverables. Experience the full project lifecycle from requirements gathering to deployment.
          </p>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FolderOpen size={20} color="var(--accent)" />
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 600, margin: 0 }}>Structured Institute Projects</h4>
          </div>
          <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
            Work on carefully designed projects that follow industry workflows, complete with code reviews, sprint planning, and technical documentation.
          </p>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          gridColumn: '1 / 2'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Shield size={20} color="var(--accent)" />
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 600, margin: 0 }}>ISO Certified Internship Certificate</h4>
          </div>
          <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
            Receive a globally recognized ISO Certified Internship Certificate that adds immense value to your professional profile and resume.
          </p>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          gridColumn: '2 / 3'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CheckCircle size={20} color="var(--accent)" />
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 600, margin: 0 }}>Online Verification</h4>
          </div>
          <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>
            Every certificate comes with a unique verification code that employers can use to instantly verify your certification online.
          </p>
        </div>
      </div>
    </div>
  );
}

// Placement Support Section
function PlacementSupport() {
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
        <UserCheck size={24} color="var(--accent)" />
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1.75rem',
          margin: 0
        }}>
          Placement Support
        </h2>
      </div>

      <p style={{
        color: 'var(--text-2)',
        marginBottom: '2rem',
        maxWidth: 700,
        lineHeight: 1.7,
        fontSize: '1rem'
      }}>
        We provide comprehensive placement support to help you land your dream job and stand out in the competitive tech industry.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
        gap: '1px',
        border: '1px solid var(--line)',
        background: 'var(--line)',
      }}>
        <div style={{
          background: 'var(--bg-card)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FileCheck size={18} color="var(--accent)" />
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>Resume Optimization</h4>
          </div>
          <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0, paddingLeft: '2.75rem' }}>
            Get expert guidance on crafting ATS-friendly resumes that highlight your technical skills and project experience to recruiters.
          </p>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Users2 size={18} color="var(--accent)" />
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>Mock Interviews</h4>
          </div>
          <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0, paddingLeft: '2.75rem' }}>
            Practice with technical and HR mock interviews conducted by industry professionals to build confidence and improve your performance.
          </p>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <GitBranch size={18} color="var(--accent)" />
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>GitHub Portfolio Guidance</h4>
          </div>
          <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0, paddingLeft: '2.75rem' }}>
            Learn how to build an impressive GitHub portfolio with well-documented projects, clean code, and proper README files that attract recruiters.
          </p>
        </div>
      </div>
    </div>
  );
}

// Testimonials Section
function Testimonials() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Android Developer at TechCorp",
      quote: "The live projects and mentorship at AstirMind transformed my career. I landed my dream job within a month of completing the program.",
      rating: 5,
      linkedIn: "linkedin.com/in/priyasharma"
    },
    {
      name: "Rahul Verma",
      role: "Full Stack Developer at StartupHub",
      quote: "The structured approach and real client projects gave me the confidence to work in a professional environment. Highly recommended!",
      rating: 5,
      linkedIn: "linkedin.com/in/rahulverma"
    },
    {
      name: "Ananya Reddy",
      role: "Data Scientist at AnalyticsPro",
      quote: "The Generative AI program was a game-changer. The hands-on projects and expert mentorship helped me transition into AI from traditional development.",
      rating: 4.5,
      linkedIn: "linkedin.com/in/ananyareddy"
    }
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
        <Sparkles size={24} color="var(--accent)" />
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1.75rem',
          margin: 0
        }}>
          What Our Alumni Say
        </h2>
      </div>

      <p style={{
        color: 'var(--text-2)',
        marginBottom: '2rem',
        maxWidth: 700,
        lineHeight: 1.7,
        fontSize: '1rem'
      }}>
        Hear from our past students who have successfully transitioned into tech careers after completing our programs.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            style={{
              padding: '1.75rem',
              border: '1px solid var(--line)',
              background: 'var(--bg-alt)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              transition: 'border-color 0.2s, background 0.2s, transform 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.background = 'var(--bg-elevated)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--line)';
              e.currentTarget.style.background = 'var(--bg-alt)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 600, margin: 0 }}>{testimonial.name}</h4>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-3)', margin: '0.25rem 0 0 0' }}>{testimonial.role}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--accent)' }}>
                  {'★'.repeat(Math.floor(testimonial.rating))}{'☆'.repeat(5 - Math.floor(testimonial.rating))}
                </span>
              </div>
            </div>
            <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
              "{testimonial.quote}"
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '0.25rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--line)'
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-3)' }}>📎</span>
              <a
                href={`https://${testimonial.linkedIn}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.625rem',
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                View on LinkedIn →
              </a>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        padding: '1.5rem',
        border: '1px solid var(--line)',
        background: 'var(--bg-alt)',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: 'var(--text-2)' }}>
          ⭐ See more reviews on:
        </span>
        <a
          href="#"
          style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.875rem', transition: 'opacity 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          Google Reviews
        </a>
        <a
          href="#"
          style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.875rem', transition: 'opacity 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          LinkedIn Recommendations
        </a>
        <a
          href="#"
          style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.875rem', transition: 'opacity 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          Video Testimonials
        </a>
      </div>
    </div>
  );
}

export default function CoursesDetails() {
  const { slug } = useParams();
  const [openModules, setOpenModules] = useState({});
  const [openFAQs, setOpenFAQs] = useState({});

  const course = courses.find(item => item.slug === slug);
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

          {/* 1. Why Learn This Course? */}
          <WhyLearnThis courseTitle={course.title} />

          {/* 2. Why AstirMind? */}
          <WhyAstirMind />

          {/* 3. Course Highlights */}
          <CourseHighlights />

          {/* 4. Career Opportunities */}
          <CareerOpportunities courseSlug={slug} />

          {/* 5. Skills You Will Learn */}
          <SkillsYouWillLearn courseSlug={slug} />

          {/* 6. Tools & Technologies Covered */}
          <ToolsTechnologies courseSlug={slug} />

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

          {/* ====== NEW SECTIONS INSERTED HERE (BEFORE FAQ) ====== */}
          
          {/* 9. Live Projects */}
          <LiveProjects />

          {/* 10. Student Portfolio */}
          <StudentPortfolio />

          {/* 11. Internship Program & Certification */}
          <InternshipProgram />

          {/* 12. Placement Support */}
          <PlacementSupport />

          {/* 13. Testimonials */}
          <Testimonials />

          {/* ====== ORIGINAL FAQ SECTION ====== */}
          
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