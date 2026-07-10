import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
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
  }
};

export default function ProgramDetails() {
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

          {/* Syllabus Section */}
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