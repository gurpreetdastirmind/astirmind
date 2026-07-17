import { useParams } from 'react-router-dom';
import { agencyServices } from './Services';
import { Helmet } from 'react-helmet';
import { Star, Zap, MessageCircle, Shield, CreditCard, Database, ArrowRight } from 'lucide-react';
import { useGoogleRating } from '../hooks/useGoogleRating';

// Google Star Rating Component
function GoogleStarRating({ rating, total = 5 }) {
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
    </div>
  );
}

// Service-specific use cases data
const serviceUseCases = {
  'ml-ai-solutions': {
    title: 'AI & Machine Learning Use Cases',
    useCases: [
      {
        icon: Zap,
        title: 'Agentic Workflows',
        description: 'Autonomous handling of complex user tasks such as booking appointments, drafting responses, or data extraction from unstructured sources.'
      },
      {
        icon: Database,
        title: 'Multimodal Processing',
        description: 'Parsing scanned invoices, PDF documents, or images alongside text prompts for instant structured output and data extraction.'
      },
      {
        icon: MessageCircle,
        title: 'Real-Time Streaming',
        description: 'Delivering interactive AI responses with minimal latency for real-time customer interactions and support systems.'
      },
      {
        icon: Shield,
        title: 'AI Fraud Detection',
        description: 'Real-time detection of suspicious login patterns, API rate abuse, and fraudulent activities using machine learning models.'
      }
    ]
  },
  'automation-solutions': {
    title: 'Automation Use Cases',
    useCases: [
      {
        icon: Zap,
        title: 'Workflow Automation',
        description: 'End-to-end automation of business processes including lead generation, data extraction, and CRM integration for seamless operations.'
      },
      {
        icon: Database,
        title: 'Data Scraping at Scale',
        description: 'Extract structured data from websites, APIs, and documents for market research, price monitoring, and competitive analysis.'
      },
      {
        icon: MessageCircle,
        title: 'Browser Automation',
        description: 'Automate repetitive browser tasks including form filling, data entry, and web testing using Selenium and Playwright.'
      },
      {
        icon: Shield,
        title: 'Intelligent Document Processing',
        description: 'Automated extraction and processing of data from invoices, receipts, contracts, and other business documents.'
      }
    ]
  },
  'web-development': {
    title: 'Web Development Use Cases',
    useCases: [
      {
        icon: Zap,
        title: 'High-Performance Web Applications',
        description: 'Building scalable, high-performance web applications with modern frameworks like React, Next.js, and Node.js.'
      },
      {
        icon: Database,
        title: 'E-Commerce Platforms',
        description: 'Developing secure, scalable e-commerce platforms with payment gateways, inventory management, and customer analytics.'
      },
      {
        icon: MessageCircle,
        title: 'Progressive Web Apps (PWAs)',
        description: 'Creating offline-capable, mobile-first web applications that deliver native-app like experiences.'
      },
      {
        icon: Shield,
        title: 'Enterprise Web Portals',
        description: 'Building secure, role-based web portals for internal teams, clients, and partners with advanced access controls.'
      }
    ]
  },
  'mern-stack-development': {
    title: 'MERN Stack Use Cases',
    useCases: [
      {
        icon: Zap,
        title: 'Real-Time Applications',
        description: 'Building real-time applications with WebSocket integration, live updates, and seamless data synchronization across clients.'
      },
      {
        icon: Database,
        title: 'Scalable REST APIs',
        description: 'Developing robust REST APIs with Node.js, Express, and MongoDB for high-traffic applications and microservices.'
      },
      {
        icon: MessageCircle,
        title: 'Single Page Applications (SPAs)',
        description: 'Creating fast, responsive single-page applications with React and Redux for optimal user experience.'
      },
      {
        icon: Shield,
        title: 'Full-Stack Authentication',
        description: 'Implementing secure authentication and authorization systems with JWT, OAuth, and social login integrations.'
      }
    ]
  },
  'mobile-app-development': {
    title: 'Mobile App Development Use Cases',
    useCases: [
      {
        icon: Zap,
        title: 'Cross-Platform Apps',
        description: 'Building high-performance iOS and Android apps from a single codebase using React Native and Flutter.'
      },
      {
        icon: Database,
        title: 'Offline-First Applications',
        description: 'Developing mobile apps with offline data synchronization, local storage, and seamless cloud integration.'
      },
      {
        icon: MessageCircle,
        title: 'Real-Time Messaging Apps',
        description: 'Building chat applications, notification systems, and real-time communication platforms with push notifications.'
      },
      {
        icon: Shield,
        title: 'Biometric Authentication',
        description: 'Implementing secure fingerprint, face recognition, and passkey authentication for mobile applications.'
      }
    ]
  },
  'cms-mvc-development': {
    title: 'CMS & MVC Use Cases',
    useCases: [
      {
        icon: Zap,
        title: 'Content Management Systems',
        description: 'Building scalable CMS platforms for content-heavy websites, blogs, and news portals with intuitive admin interfaces.'
      },
      {
        icon: Database,
        title: 'MVC Web Applications',
        description: 'Developing structured web applications using MVC frameworks like Django, Laravel, and Ruby on Rails.'
      },
      {
        icon: MessageCircle,
        title: 'Multi-Site Management',
        description: 'Creating systems to manage multiple websites from a single CMS instance with shared content and assets.'
      },
      {
        icon: Shield,
        title: 'Headless CMS',
        description: 'Building decoupled CMS solutions for omnichannel content delivery with RESTful APIs and modern frontend frameworks.'
      }
    ]
  },
  'cloud-consulting': {
    title: 'Cloud Consulting Use Cases',
    useCases: [
      {
        icon: Zap,
        title: 'Cloud Migration',
        description: 'Seamless migration of on-premise applications to cloud platforms with minimal downtime and zero data loss.'
      },
      {
        icon: Database,
        title: 'Infrastructure Optimization',
        description: 'Optimizing cloud infrastructure for cost, performance, and scalability with auto-scaling and load balancing.'
      },
      {
        icon: MessageCircle,
        title: 'DevOps Automation',
        description: 'Implementing CI/CD pipelines, infrastructure as code, and automated deployment workflows for faster delivery.'
      },
      {
        icon: Shield,
        title: 'Cloud Security & Compliance',
        description: 'Implementing security best practices, compliance frameworks, and disaster recovery strategies on cloud platforms.'
      }
    ]
  },
  'api-development-integrations': {
    title: 'API & Integration Use Cases',
    useCases: [
      {
        icon: Zap,
        title: 'REST API Development',
        description: 'Building secure, scalable REST APIs with proper documentation, versioning, and error handling.'
      },
      {
        icon: Database,
        title: 'Third-Party Integrations',
        description: 'Seamless integration with payment gateways, CRMs, cloud services, and enterprise tools.'
      },
      {
        icon: MessageCircle,
        title: 'Microservices Architecture',
        description: 'Designing and implementing microservices-based architectures for complex enterprise applications.'
      },
      {
        icon: Shield,
        title: 'API Gateway & Security',
        description: 'Implementing API gateways, rate limiting, authentication, and API key management for secure access.'
      }
    ]
  },
  'ai-chatbots-conversational-ai': {
    title: 'Conversational AI Use Cases',
    useCases: [
      {
        icon: Zap,
        title: 'Agentic Workflows',
        description: 'Autonomous handling of complex user tasks like booking, drafting responses, and data extraction from various sources.'
      },
      {
        icon: Database,
        title: 'AI-Powered Customer Support',
        description: 'Intelligent customer support bots handling queries, troubleshooting, and escalations with natural language understanding.'
      },
      {
        icon: MessageCircle,
        title: 'Document Assistants',
        description: 'AI assistants that can read, understand, and extract information from documents, contracts, and reports.'
      },
      {
        icon: Shield,
        title: 'Multilingual Chatbots',
        description: 'Building multilingual conversational agents that can communicate in multiple languages with real-time translation.'
      }
    ]
  },
  'data-analytics-visualization': {
    title: 'Data Analytics Use Cases',
    useCases: [
      {
        icon: Zap,
        title: 'Interactive Dashboards',
        description: 'Building real-time, interactive dashboards with drill-down capabilities for business intelligence and decision-making.'
      },
      {
        icon: Database,
        title: 'Predictive Analytics',
        description: 'Leveraging historical data to predict future trends, customer behavior, and business outcomes.'
      },
      {
        icon: MessageCircle,
        title: 'Business Intelligence',
        description: 'Transforming raw data into actionable insights through comprehensive BI reporting and visualization.'
      },
      {
        icon: Shield,
        title: 'Graph Analytics',
        description: 'Analyzing connected data for relationship mapping, network analysis, and social graph applications.'
      }
    ]
  },
  'saas-product-development': {
    title: 'SaaS Product Use Cases',
    useCases: [
      {
        icon: Zap,
        title: 'Metered / Usage-Based Billing',
        description: 'Automatically tracking and billing exact API usage or consumption metrics with smart billing logic.'
      },
      {
        icon: Database,
        title: 'Multi-Tenant Architecture',
        description: 'Building scalable multi-tenant SaaS platforms with data isolation, security, and custom branding for each tenant.'
      },
      {
        icon: MessageCircle,
        title: 'Subscription Management',
        description: 'Implementing flexible subscription systems with multiple pricing tiers, trial periods, and payment gateway integration.'
      },
      {
        icon: Shield,
        title: 'Self-Service Portals',
        description: 'Building customer-facing portals for account management, billing, support, and feature configuration.'
      }
    ]
  },
  'ui-ux-design': {
    title: 'UI/UX Design Use Cases',
    useCases: [
      {
        icon: Zap,
        title: 'Design Systems',
        description: 'Creating comprehensive design systems with reusable components, guidelines, and consistency across products.'
      },
      {
        icon: Database,
        title: 'User Research & Testing',
        description: 'Conducting user research, usability testing, and validation to create user-centered designs that solve real problems.'
      },
      {
        icon: MessageCircle,
        title: 'Interactive Prototyping',
        description: 'Building high-fidelity interactive prototypes for user testing, stakeholder presentations, and development handoff.'
      },
      {
        icon: Shield,
        title: 'Accessibility Design',
        description: 'Creating inclusive designs that meet WCAG standards and ensure accessibility for all users.'
      }
    ]
  },
  'ecommerce-development': {
    title: 'E-Commerce Use Cases',
    useCases: [
      {
        icon: Zap,
        title: 'Smart Localized Checkout',
        description: 'Dynamic payment routing using local payment gateways to minimize transaction failures and improve conversion rates.'
      },
      {
        icon: Database,
        title: 'Inventory Management',
        description: 'Real-time inventory tracking, automated stock updates, and multi-warehouse management for seamless operations.'
      },
      {
        icon: MessageCircle,
        title: 'Personalized Shopping',
        description: 'AI-powered product recommendations, personalized shopping experiences, and behavioral targeting for higher conversion.'
      },
      {
        icon: Shield,
        title: 'Secure Payment Integration',
        description: 'Integration with multiple payment gateways, fraud detection, and PCI-compliant security for safe transactions.'
      }
    ]
  },
  'digital-marketing': {
    title: 'Digital Marketing Use Cases',
    useCases: [
      {
        icon: Zap,
        title: 'AI-Personalized Messaging',
        description: 'Dynamically tailoring transactional messages across WhatsApp, SMS, or Email based on real-time user behavior.'
      },
      {
        icon: Database,
        title: 'Omnichannel Delivery',
        description: 'Automatically switching delivery channels (Push → WhatsApp → SMS) if delivery fails for maximum reach.'
      },
      {
        icon: MessageCircle,
        title: 'Two-Way Conversational Automation',
        description: 'Routing incoming user replies back through AI agents for instant resolution and seamless customer experience.'
      },
      {
        icon: Shield,
        title: 'Campaign Analytics & ROI',
        description: 'Real-time campaign analytics, ROI tracking, and conversion optimization for data-driven marketing decisions.'
      }
    ]
  },
  'erp-crm-solutions': {
    title: 'ERP & CRM Use Cases',
    useCases: [
      {
        icon: Zap,
        title: 'Business Process Automation',
        description: 'Automating end-to-end business processes from lead management to order fulfillment and customer support.'
      },
      {
        icon: Database,
        title: 'Customer 360° View',
        description: 'Unified customer view across all touchpoints for better understanding, engagement, and relationship management.'
      },
      {
        icon: MessageCircle,
        title: 'Workflow Management',
        description: 'Designing and implementing automated workflows for approvals, notifications, and task management.'
      },
      {
        icon: Shield,
        title: 'Enterprise Resource Planning',
        description: 'Streamlining operations across finance, HR, inventory, and procurement with integrated ERP solutions.'
      }
    ]
  },
  'internship-project-assistance': {
    title: 'Internship & Training Use Cases',
    useCases: [
      {
        icon: Zap,
        title: 'Live Project Training',
        description: 'Hands-on training with real industry projects, complete with requirements gathering, development, and deployment.'
      },
      {
        icon: Database,
        title: 'Mentorship Programs',
        description: 'One-on-one mentoring from industry experts with regular code reviews, feedback sessions, and career guidance.'
      },
      {
        icon: MessageCircle,
        title: 'Portfolio Development',
        description: 'Building a comprehensive portfolio with real projects, contributions, and certifications for job applications.'
      },
      {
        icon: Shield,
        title: 'Industry Certification',
        description: 'ISO Certified Internship certificates with online verification for credibility and professional recognition.'
      }
    ]
  },
  'blockchain-crypto-solutions': {
    title: 'Blockchain & Crypto Use Cases',
    useCases: [
      {
        icon: Zap,
        title: 'Smart Contract Development',
        description: 'Building secure, auditable smart contracts for various use cases including finance, supply chain, and real estate.'
      },
      {
        icon: Database,
        title: 'Crypto Wallet Integration',
        description: 'Developing secure crypto wallets with multi-currency support, transaction history, and real-time balance updates.'
      },
      {
        icon: MessageCircle,
        title: 'dApp Development',
        description: 'Building decentralized applications (dApps) with web3 integration, wallet connectivity, and blockchain interactions.'
      },
      {
        icon: Shield,
        title: 'Tokenomics Design',
        description: 'Designing token economics, ICO/STO strategies, and governance models for blockchain projects.'
      }
    ]
  },
  'devops-cicd-solutions': {
    title: 'DevOps & CI/CD Use Cases',
    useCases: [
      {
        icon: Zap,
        title: 'Automated Deployment Pipelines',
        description: 'CI/CD pipelines for automated testing, building, and deployment to multiple environments with rollback capabilities.'
      },
      {
        icon: Database,
        title: 'Infrastructure as Code',
        description: 'Managing infrastructure using code with Terraform, CloudFormation, and automated provisioning.'
      },
      {
        icon: MessageCircle,
        title: 'Container Orchestration',
        description: 'Implementing Docker and Kubernetes for container management, scaling, and service discovery.'
      },
      {
        icon: Shield,
        title: 'Monitoring & Alerting',
        description: 'Setting up comprehensive monitoring, logging, and alerting systems for proactive issue detection and resolution.'
      }
    ]
  },
  'iot-emerging-technologies': {
    title: 'IoT & Emerging Tech Use Cases',
    useCases: [
      {
        icon: Zap,
        title: 'Edge Computing Solutions',
        description: 'Processing data at the edge with minimal latency for real-time IoT applications and analytics.'
      },
      {
        icon: Database,
        title: 'Sensor Networks',
        description: 'Deploying and managing sensor networks for environmental monitoring, asset tracking, and industrial automation.'
      },
      {
        icon: MessageCircle,
        title: 'IoT Cloud Integration',
        description: 'Connecting IoT devices to cloud platforms with MQTT, HTTP, and WebSocket protocols for data streaming.'
      },
      {
        icon: Shield,
        title: 'AR/VR Experiences',
        description: 'Building augmented and virtual reality applications for training, visualization, and interactive experiences.'
      }
    ]
  },
  'data-scraping-workflow-automations': {
    title: 'Data Scraping & Automation Use Cases',
    useCases: [
      {
        icon: Zap,
        title: 'Workflow Automation',
        description: 'End-to-end automation of business processes including lead generation, data extraction, and CRM integration for seamless operations.'
      },
      {
        icon: Database,
        title: 'Data Scraping at Scale',
        description: 'Extract structured data from websites, APIs, and documents for market research, price monitoring, and competitive analysis.'
      },
      {
        icon: MessageCircle,
        title: 'Browser Automation',
        description: 'Automate repetitive browser tasks including form filling, data entry, and web testing using Selenium and Playwright.'
      },
      {
        icon: Shield,
        title: 'Intelligent Document Processing',
        description: 'Automated extraction and processing of data from invoices, receipts, contracts, and other business documents.'
      }
    ]
  }
};

// Generic use cases for services without specific data
const defaultUseCases = {
  title: 'Use Cases',
  useCases: [
    {
      icon: Zap,
      title: 'Custom Solutions',
      description: 'Tailored solutions designed specifically for your business needs and industry requirements.'
    },
    {
      icon: Database,
      title: 'Scalable Architecture',
      description: 'Building scalable, maintainable systems that can grow with your business and user base.'
    },
    {
      icon: MessageCircle,
      title: 'Integration Ready',
      description: 'Seamless integration with existing systems, tools, and third-party services.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Implementing industry-standard security practices to protect your data and applications.'
    }
  ]
};

export default function ServiceDetails() {
  const { slug } = useParams();
  const service = agencyServices.find(item => item.slug === slug);
  
  // Get Google Rating dynamically
  const { rating: googleRating, loading: ratingLoading } = useGoogleRating();

  if (!service) {
    return (
      <div style={{ padding: '6rem 2rem', minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
        <div className="container">
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-sans)' }}>Service Not Found</h1>
          <p style={{ color: 'var(--text-2)' }}>The service you're looking for doesn't exist or has been moved.</p>
        </div>
      </div>
    );
  }

  const Icon = service.Icon;
  const useCaseData = serviceUseCases[slug] || defaultUseCases;

  return (
    <>
      <Helmet>
        <title>{service.title} | AstirMind Software Solutions</title>
        <meta name="description" content={service.desc} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`${service.title} | AstirMind Software Solutions`} />
        <meta property="og:description" content={service.desc} />
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
              {service.title}
            </span>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              marginTop: '1rem',
              marginBottom: '1rem',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '-0.03em'
            }}>
              {service.title}
            </h1>

            {/* Google Rating Section - Dynamic from Google */}
            {!ratingLoading ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap'
              }}>
                <GoogleStarRating rating={googleRating.ratingValue} />
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-2)',
                  fontWeight: 600
                }}>
                  {googleRating.ratingValue.toFixed(1)}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-3)'
                }}>
                  ({googleRating.reviewCount.toLocaleString()} Google reviews)
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--accent)',
                  marginLeft: '0.5rem'
                }}>
                  ★★★★★
                </span>
              </div>
            ) : (
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <div style={{ 
                  width: 120, 
                  height: 24, 
                  background: 'var(--bg-alt)', 
                  borderRadius: 4,
                  animation: 'pulse 1.5s ease-in-out infinite'
                }} />
              </div>
            )}

            <p style={{
              maxWidth: 760,
              lineHeight: 1.8,
              fontSize: '1.05rem',
              color: 'var(--text-2)'
            }}>
              {service.desc}
            </p>
          </div>

          {/* Tags */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '4rem'
          }}>
            {service.tags.map((tag, index) => (
              <span key={index} className="badge-raw">
                {tag}
              </span>
            ))}
          </div>

          {/* Content - 2 Column Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem'
          }}>
            {/* Left Column */}
            <div>
              <h2 style={{ marginBottom: '1rem', fontFamily: 'var(--font-sans)' }}>
                What We Deliver
              </h2>
              <ul style={{
                lineHeight: 2,
                color: 'var(--text-2)',
                listStyle: 'none',
                padding: 0
              }}>
                <li>✓ Custom scalable solutions</li>
                <li>✓ Modern architecture</li>
                <li>✓ High performance systems</li>
                <li>✓ SEO & optimization</li>
                <li>✓ Cloud deployment</li>
              </ul>

              {/* Service Stats */}
              <div style={{
                marginTop: '2rem',
                padding: '1.5rem',
                border: '1px solid var(--line)',
                background: 'var(--bg-alt)'
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  marginBottom: '1rem'
                }}>
                  Service Stats
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }}>
                  <div>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.5rem',
                      color: 'var(--text-3)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em'
                    }}>
                      Rating
                    </span>
                    <div style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: 'var(--accent)'
                    }}>
                      {googleRating.ratingValue.toFixed(1)}
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
                      Reviews
                    </span>
                    <div style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: 'var(--text)'
                    }}>
                      {googleRating.reviewCount.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h2 style={{ marginBottom: '1rem', fontFamily: 'var(--font-sans)' }}>
                Technologies
              </h2>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                marginBottom: '2rem'
              }}>
                {service.tags.map((tag, index) => (
                  <span key={index} className="badge-raw">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Get a Quote Button */}
              <div style={{
                padding: '1.5rem',
                border: '1px solid var(--line)',
                background: 'var(--bg-alt)',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  marginBottom: '0.5rem'
                }}>
                  Ready to Get Started?
                </h3>
                <p style={{
                  color: 'var(--text-2)',
                  fontSize: '0.875rem',
                  marginBottom: '1.5rem'
                }}>
                  Let's discuss your project requirements
                </p>
                <a
                  href="/quote"
                  className="btn-solid"
                  style={{
                    padding: '0.75rem 2rem',
                    display: 'inline-block',
                    textDecoration: 'none'
                  }}
                >
                  Get a Quote
                </a>
              </div>
            </div>
          </div>

          {/* Use Cases Section - Full Width */}
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
              <Zap size={24} color="var(--accent)" />
              <h2 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.75rem',
                margin: 0
              }}>
                {useCaseData.title}
              </h2>
            </div>

            <p style={{
              color: 'var(--text-2)',
              marginBottom: '2rem',
              maxWidth: 700,
              lineHeight: 1.7,
              fontSize: '1rem'
            }}>
              Latest use cases and applications of our {service.title.toLowerCase()} solutions.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
              gap: '1px',
              border: '1px solid var(--line)',
              background: 'var(--line)',
            }}>
              {useCaseData.useCases.map((useCase, index) => {
                const UseCaseIcon = useCase.icon;
                return (
                  <div
                    key={index}
                    style={{
                      background: 'var(--bg-card)',
                      padding: '1.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      transition: 'background 0.2s, transform 0.2s'
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
                        <UseCaseIcon size={18} color="var(--accent)" />
                      </div>
                      <h4 style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        margin: 0,
                        color: 'var(--text)'
                      }}>
                        {useCase.title}
                      </h4>
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      color: 'var(--text-2)',
                      margin: 0,
                      paddingLeft: '3rem'
                    }}>
                      {useCase.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div style={{
            marginTop: '4rem',
            padding: '3rem',
            border: '1px solid var(--line)',
            background: 'var(--bg-alt)',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.5rem',
              marginBottom: '1rem'
            }}>
              Ready to Leverage {service.title}?
            </h3>
            <p style={{
              color: 'var(--text-2)',
              maxWidth: 600,
              margin: '0 auto 2rem',
              lineHeight: 1.7
            }}>
              Let's discuss how our {service.title.toLowerCase()} solutions can help your business achieve its goals.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a
                href="/contact"
                className="btn-solid"
                style={{
                  padding: '0.75rem 2rem',
                  display: 'inline-block',
                  textDecoration: 'none'
                }}
              >
                Contact Us <ArrowRight size={16} style={{ marginLeft: '0.5rem', display: 'inline' }} />
              </a>
              <a
                href="/quote"
                className="btn-outline"
                style={{
                  padding: '0.75rem 2rem',
                  display: 'inline-block',
                  textDecoration: 'none',
                  border: '1px solid var(--line)',
                  color: 'var(--text)',
                  transition: 'background 0.2s, border-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bg-elevated)';
                  e.currentTarget.style.borderColor = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'var(--line)';
                }}
              >
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}