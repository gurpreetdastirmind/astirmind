// ServiceDetails.jsx - Enhanced version with detailed content per service
import { useParams } from 'react-router-dom';
import { agencyServices } from './Services';
import { Helmet } from 'react-helmet';
import { 
  Star, Zap, MessageCircle, Shield, CreditCard, Database, ArrowRight, Check, 
  Cloud, Server, Code, Layers, Settings, Users, BarChart, GitBranch, Terminal, 
  Package, Lock, Globe, Cpu, Smartphone, Bot, Layout, Palette, ShoppingCart, 
  Megaphone, BriefcaseBusiness, GraduationCap, PenTool, MonitorCog, Workflow, 
  Brain, MessageSquareMore, BarChart3, TrendingUp, LineChart, Code2, 
  Layout as LayoutIcon, Phone, Eye, Calculator, Atom,
  Target 
} from 'lucide-react';
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

// Detailed service content for each service
const serviceDetailsMap = {
  'ml-ai-solutions': {
    detailedDescription: `AstirMind leverages Machine Learning, Automatic Speech Recognition (ASR), Image Recognition, Text-to-Speech, and AI-driven systems to build intelligent and scalable digital solutions. Our AI/ML practice combines cutting-edge research with production-grade engineering to deliver solutions that actually work in the real world.

We build custom machine learning models for computer vision, natural language processing, predictive analytics, and generative AI applications. Our team focuses on deploying models into production environments with robust monitoring, retraining pipelines, and performance optimization.

Whether you need to automate document processing, build a recommendation engine, detect anomalies in real-time, or create a conversational AI system, we have the expertise to deliver. We work with modern frameworks including PyTorch, TensorFlow, Hugging Face, and LangChain to build solutions that are both powerful and maintainable.`,
    deliverables: [
      'Custom ML models for classification, regression, and clustering',
      'Natural Language Processing (NLP) pipelines for text analysis',
      'Computer Vision systems for image and video processing',
      'ASR and Text-to-Speech solutions for voice applications',
      'Generative AI applications with LLMs and RAG',
      'Model deployment with MLOps and monitoring',
      'Real-time inference pipelines and API services',
      'AI-powered automation and decision support systems'
    ],
    technologies: [
      'Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Hugging Face',
      'LangChain', 'OpenAI API', 'AWS SageMaker', 'FastAPI', 'Docker'
    ]
  },
  'automation-solutions': {
    detailedDescription: `We build intelligent automation systems for lead generation, workflow automation, browser automation, CRM integrations, and business process optimization. Our automation solutions are designed to eliminate repetitive manual tasks, reduce errors, and free up your team to focus on strategic work.

Using a combination of robotic process automation (RPA), workflow orchestration, and AI-powered decision making, we create systems that can handle complex business processes end-to-end. From lead generation and qualification to customer onboarding and support, our automation solutions scale with your business.

We specialize in integrating automation systems with existing tools and platforms, ensuring seamless data flow and minimal disruption to your operations. Every solution is built with reliability, error handling, and monitoring as core principles.`,
    deliverables: [
      'Intelligent lead generation and qualification systems',
      'Workflow automation and business process optimization',
      'Browser automation for data extraction and web tasks',
      'CRM integrations and data synchronization',
      'Automated reporting and analytics dashboards',
      'Customer onboarding and support automation',
      'Document processing and data extraction pipelines',
      'Business rules engines and decision automation'
    ],
    technologies: [
      'Python', 'Selenium', 'Playwright', 'Zapier', 'Make', 'Node.js',
      'Django', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'
    ]
  },
  'web-development': {
    detailedDescription: `We craft modern, responsive, and high-performance websites and web applications focused on scalability, accessibility, and user experience. Our web development practice combines cutting-edge frontend frameworks with robust backend architectures to deliver digital experiences that engage users and drive business growth.

From simple landing pages to complex enterprise web applications, we approach every project with a focus on performance, accessibility, and maintainability. We follow best practices in SEO, responsive design, and progressive enhancement to ensure your website works flawlessly across all devices and browsers.

Our development process includes thorough testing, performance optimization, and deployment automation. We work closely with you to understand your business goals and user needs, translating them into intuitive, high-performing digital solutions.`,
    deliverables: [
      'Responsive, mobile-first websites and landing pages',
      'Single-page applications (SPAs) and progressive web apps',
      'Custom CMS implementations and headless CMS solutions',
      'E-commerce websites with secure payment processing',
      'Web applications with real-time features and WebSockets',
      'SEO-optimized, high-performance digital experiences',
      'Accessible websites following WCAG standards',
      'Integration with third-party services and APIs'
    ],
    technologies: [
      'React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS',
      'Node.js', 'Python/Django', 'PostgreSQL', 'MongoDB', 'AWS'
    ]
  },
  'mern-stack-development': {
    detailedDescription: `Build full-stack JavaScript applications using MongoDB, Express.js, React, and Node.js. We create scalable, high-performance web apps with seamless frontend-backend integration, real-time features, and robust REST APIs.

The MERN stack is our go-to choice for modern web applications that require fast development cycles, excellent performance, and a unified JavaScript ecosystem. We leverage the power of React's component architecture, Node.js's event-driven model, and MongoDB's flexible document storage to build applications that can handle complex business logic and high user loads.

Our MERN development approach emphasizes code quality, testing, and maintainability. We follow industry best practices for state management, API design, data modeling, and deployment, ensuring your application is ready for production from day one.`,
    deliverables: [
      'Full-stack JavaScript applications with MERN stack',
      'Scalable REST APIs and GraphQL endpoints',
      'Real-time features using WebSocket and Socket.io',
      'State management with Redux or Context API',
      'Authentication and authorization with JWT',
      'Database modeling and optimization with MongoDB',
      'Cloud deployment and DevOps integration',
      'Performance optimization and monitoring'
    ],
    technologies: [
      'MongoDB', 'Express.js', 'React', 'Node.js', 'Redux', 'TypeScript',
      'Mongoose', 'JWT', 'Socket.io', 'AWS', 'Docker', 'Git'
    ]
  },
  'mobile-app-development': {
    detailedDescription: `AstirMind builds feature-rich Android and cross-platform mobile applications designed for performance, usability, and business growth. Our mobile development practice focuses on creating apps that delight users, perform reliably, and scale with your business.

We leverage cross-platform frameworks like React Native and Flutter to deliver high-quality apps for both iOS and Android from a single codebase. This approach reduces development costs, speeds up time-to-market, and ensures consistency across platforms. For applications requiring native-level performance or specific platform features, we also offer native Android development with Kotlin and native iOS development with Swift.

Our mobile development process includes rigorous testing, performance optimization, and a focus on user experience. We ensure your app meets app store guidelines, handles offline scenarios gracefully, and provides a smooth, engaging experience for your users.`,
    deliverables: [
      'Cross-platform mobile apps with React Native or Flutter',
      'Native Android apps with Kotlin and Jetpack Compose',
      'Offline-first applications with local data persistence',
      'Push notifications and real-time updates',
      'Biometric authentication (fingerprint, face recognition)',
      'Payment gateway integration and in-app purchases',
      'App store deployment and optimization',
      'Analytics and performance monitoring'
    ],
    technologies: [
      'React Native', 'Flutter', 'Kotlin', 'Dart', 'Firebase', 'SQLite',
      'Redux', 'Bloc', 'REST APIs', 'GraphQL', 'Google Maps API'
    ]
  },
  'cms-mvc-development': {
    detailedDescription: `We develop scalable CMS and MVC-based platforms tailored for businesses across multiple industries with secure and efficient architectures. Our CMS solutions empower content teams to manage digital content efficiently while our MVC applications provide robust, structured foundations for complex web applications.

We specialize in building custom CMS platforms that go beyond off-the-shelf solutions, providing exactly the features and workflows your content team needs. Our MVC development approach ensures clean separation of concerns, making your application maintainable, testable, and scalable.

Whether you need a content-heavy website with an intuitive admin interface or a complex web application with multiple user roles and workflows, we have the expertise to deliver a solution that meets your requirements and grows with your business.`,
    deliverables: [
      'Custom CMS platforms with intuitive admin interfaces',
      'MVC web applications with structured architecture',
      'Headless CMS solutions for omnichannel content delivery',
      'Multi-site management and content syndication',
      'Workflow management and approval systems',
      'Role-based access control and user management',
      'SEO optimization and content strategy',
      'Migration from legacy systems to modern CMS'
    ],
    technologies: [
      'Django', 'Laravel', 'Ruby on Rails', 'WordPress', 'Contentful',
      'Strapi', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch'
    ]
  },
  'cloud-consulting': {
    detailedDescription: `AstirMind helps businesses migrate, optimize, and scale applications on cloud platforms with secure infrastructure and growth-focused strategies. Our cloud consulting services guide you through every step of your cloud journey, from initial assessment to full-scale deployment and ongoing optimization.

We work with all major cloud providers—AWS, Azure, and Google Cloud—to design solutions that maximize performance, minimize costs, and ensure security compliance. Our approach includes infrastructure as code, automated deployment pipelines, and continuous monitoring to keep your cloud environment running smoothly.

Whether you're looking to migrate existing applications, build new cloud-native solutions, or optimize your current cloud spend, our experienced cloud architects provide the guidance and technical expertise you need.`,
    deliverables: [
      'Cloud migration strategy and execution',
      'Infrastructure as code with Terraform and CloudFormation',
      'CI/CD pipeline implementation for automated deployments',
      'Cost optimization and cloud spend management',
      'Security compliance and best practices',
      'Disaster recovery and business continuity planning',
      'Performance monitoring and optimization',
      'Cloud-native application development'
    ],
    technologies: [
      'AWS', 'Azure', 'Google Cloud', 'Terraform', 'Docker', 'Kubernetes',
      'Jenkins', 'GitHub Actions', 'Prometheus', 'Grafana', 'AWS Lambda'
    ]
  },
  'api-development-integrations': {
    detailedDescription: `Secure and scalable REST API development with seamless third-party integrations including CRMs, payment gateways, cloud services, and enterprise tools. Our API development practice focuses on building robust, well-documented, and secure interfaces that enable seamless communication between systems.

We design APIs that follow industry best practices—RESTful design, proper versioning, comprehensive documentation, and robust error handling. Our APIs are built with security as a primary concern, implementing authentication, authorization, rate limiting, and input validation to protect your data.

Beyond API development, we specialize in integrating with a wide range of third-party services. Whether you need to connect your application to Salesforce, Stripe, Twilio, or any other service, we ensure smooth, reliable integration with proper error handling and monitoring.`,
    deliverables: [
      'REST API development with comprehensive documentation',
      'GraphQL API implementation for flexible queries',
      'Third-party service integrations (CRMs, payment gateways)',
      'Microservices architecture and implementation',
      'API security and authentication (OAuth, JWT)',
      'Rate limiting, caching, and performance optimization',
      'API gateway implementation and management',
      'Integration testing and monitoring'
    ],
    technologies: [
      'Node.js', 'Python', 'Django REST Framework', 'Express', 'FastAPI',
      'GraphQL', 'Apollo', 'PostgreSQL', 'MongoDB', 'Redis', 'JWT'
    ]
  },
  'ai-chatbots-conversational-ai': {
    detailedDescription: `Building intelligent AI-powered assistants, customer support bots, document assistants, and conversational systems using modern LLM technologies. Our conversational AI solutions leverage the latest advances in natural language processing to create engaging, helpful, and efficient interactions.

We build chatbots and conversational agents that understand context, handle complex queries, and provide accurate, helpful responses. Our solutions go beyond simple rule-based systems, using large language models (LLMs) and retrieval-augmented generation (RAG) to deliver intelligent, context-aware conversations.

Whether you need a customer support bot to handle common queries, a document assistant to help users find information, or a domain-specific expert system, we have the expertise to build conversational AI that works for your business.`,
    deliverables: [
      'AI-powered customer support and FAQ chatbots',
      'Document assistants for knowledge management',
      'Domain-specific expert systems and advisory bots',
      'Multi-language and multi-lingual conversational agents',
      'Integration with messaging platforms (WhatsApp, Telegram, Slack)',
      'RAG (Retrieval-Augmented Generation) pipelines',
      'Fine-tuned LLMs for specific use cases',
      'Analytics and conversation optimization'
    ],
    technologies: [
      'OpenAI API', 'LangChain', 'LlamaIndex', 'Hugging Face Transformers',
      'FastAPI', 'PostgreSQL (pgvector)', 'Redis', 'Supabase', 'Next.js'
    ]
  },
  'data-analytics-visualization': {
    detailedDescription: `Transforming raw data into meaningful insights through interactive dashboards, reporting systems, graph analytics, and business intelligence solutions. Our data analytics practice helps you make data-driven decisions with confidence.

We build comprehensive analytics solutions that connect to your data sources, clean and transform your data, and present it through intuitive visualizations. Our dashboards are designed for both operational monitoring and strategic decision-making, with features like drill-down, filtering, and real-time updates.

Our approach emphasizes data quality, performance, and usability. We ensure your analytics solution provides accurate, timely insights that your team can actually use to drive business outcomes.`,
    deliverables: [
      'Interactive dashboards and reporting systems',
      'Data warehousing and ETL/ELT pipelines',
      'Business intelligence solutions with real-time data',
      'Predictive analytics and forecasting models',
      'Graph analytics for relationship mapping',
      'Custom data visualization and charting',
      'Self-service analytics and data exploration',
      'Performance monitoring and KPI tracking'
    ],
    technologies: [
      'Power BI', 'Tableau', 'Looker', 'Python', 'Pandas', 'NumPy',
      'SQL', 'PostgreSQL', 'Snowflake', 'Apache Superset', 'Grafana'
    ]
  },
  'saas-product-development': {
    detailedDescription: `End-to-end SaaS application development including scalable architectures, subscription systems, dashboards, and cloud-native platforms. We help you build, launch, and scale SaaS products that generate recurring revenue and deliver exceptional value to your customers.

Our SaaS development approach covers everything from initial product discovery and prototyping to full-scale development, launch, and ongoing maintenance. We design for multi-tenancy, scalability, and security from day one, ensuring your SaaS product can grow with your user base.

We understand the unique challenges of SaaS—subscription management, user onboarding, billing, and compliance. Our solutions incorporate these considerations from the start, resulting in products that are ready for the market.`,
    deliverables: [
      'Multi-tenant SaaS application architecture',
      'Subscription management and billing systems',
      'User authentication and role-based access',
      'Dashboard and reporting interfaces',
      'API access for integration and extensibility',
      'Custom branding and white-labeling',
      'Analytics and usage tracking',
      'Deployment and DevOps automation'
    ],
    technologies: [
      'React', 'Next.js', 'Node.js', 'Python', 'Django', 'PostgreSQL',
      'Stripe', 'MongoDB', 'AWS', 'Docker', 'Kubernetes'
    ]
  },
  'ui-ux-design': {
    detailedDescription: `We create intuitive, visually engaging, and user-focused interfaces that align perfectly with client goals and modern design standards. Our design practice combines user research, interaction design, and visual design to create digital experiences that users love.

We follow a human-centered design process, starting with user research and journey mapping, moving through wireframing and prototyping, and ending with high-fidelity designs ready for development. Our work is grounded in real user needs and validated through testing.

Beyond visual design, we create comprehensive design systems that ensure consistency across your digital products. We also focus on accessibility, ensuring your designs work for all users regardless of their abilities.`,
    deliverables: [
      'User research and persona development',
      'Information architecture and journey mapping',
      'Wireframing and interactive prototyping',
      'High-fidelity UI design and visual branding',
      'Design systems and component libraries',
      'Usability testing and user validation',
      'Accessibility (WCAG) compliance',
      'Responsive and adaptive design'
    ],
    technologies: [
      'Figma', 'Adobe XD', 'Sketch', 'InVision', 'Zeplin', 'Framer',
      'Miro', 'UserTesting', 'Hotjar', 'Google Analytics'
    ]
  },
  'ecommerce-development': {
    detailedDescription: `AstirMind develops scalable e-commerce platforms with secure payment systems, optimized user journeys, and seamless shopping experiences. Our e-commerce solutions help you sell more effectively online, with features designed to convert visitors into customers.

We build custom e-commerce platforms tailored to your business model—whether you're a B2C retailer, B2B distributor, or D2C brand. Our solutions include product catalog management, inventory tracking, secure payment processing, order management, and customer analytics.

Our e-commerce development process focuses on conversion optimization, user experience, and performance. We ensure your online store loads quickly, works smoothly across devices, and provides a frictionless shopping experience from browsing to checkout.`,
    deliverables: [
      'Custom e-commerce platforms and online stores',
      'Shopify and WooCommerce development and customization',
      'Headless e-commerce architecture',
      'Payment gateway integration (Stripe, PayPal, Razorpay)',
      'Inventory management and order processing',
      'Personalized shopping and product recommendations',
      'Shopping cart abandonment recovery',
      'Multi-language and multi-currency support'
    ],
    technologies: [
      'React', 'Next.js', 'Shopify', 'WooCommerce', 'Node.js', 'Python',
      'Stripe', 'PayPal', 'MongoDB', 'PostgreSQL', 'Redis'
    ]
  },
  'digital-marketing': {
    detailedDescription: `We help brands grow digitally through strategic marketing, lead generation, SEO, social media campaigns, and performance-driven advertising. Our digital marketing services are designed to drive measurable results and maximize your return on investment.

We take a data-driven approach to marketing, using analytics to inform strategy, optimize campaigns, and demonstrate ROI. Our team combines creative content creation with technical SEO, paid advertising expertise, and social media management to build comprehensive marketing programs.

Whether you're looking to increase brand awareness, generate leads, or drive sales, we develop marketing strategies that align with your business goals and deliver tangible results.`,
    deliverables: [
      'SEO (Search Engine Optimization) strategy and execution',
      'Paid advertising campaigns (Google Ads, Meta Ads)',
      'Social media marketing and content strategy',
      'Email marketing automation and drip campaigns',
      'Lead generation and conversion optimization',
      'Content marketing and blog writing',
      'Analytics and performance reporting',
      'Conversion rate optimization (CRO)'
    ],
    technologies: [
      'Google Analytics', 'Google Ads', 'Meta Ads Manager', 'SEMrush',
      'Ahrefs', 'HubSpot', 'Mailchimp', 'ActiveCampaign', 'Hotjar'
    ]
  },
  'erp-crm-solutions': {
    detailedDescription: `Custom ERP and CRM platforms designed to streamline operations, manage workflows, improve productivity, and centralize business management. Our enterprise solutions help businesses of all sizes operate more efficiently and make better decisions.

We build custom ERP systems that integrate your business processes—finance, HR, inventory, procurement, and more—into a single, unified platform. Our CRM solutions help you manage customer relationships, track interactions, and drive sales growth.

Our approach focuses on understanding your business processes and building systems that actually improve how you work. We prioritize user adoption, so our solutions are intuitive and designed to make your team's work easier, not harder.`,
    deliverables: [
      'Custom ERP (Enterprise Resource Planning) systems',
      'CRM (Customer Relationship Management) platforms',
      'Business process automation and workflow management',
      'Financial management and accounting integration',
      'Human resources management and payroll',
      'Inventory and supply chain management',
      'Customer support and ticketing systems',
      'Analytics and business intelligence'
    ],
    technologies: [
      'Django', 'Laravel', 'Node.js', 'React', 'PostgreSQL', 'MongoDB',
      'REST APIs', 'GraphQL', 'Docker', 'AWS', 'Redis'
    ]
  },
  'internship-project-assistance': {
    detailedDescription: `AstirMind provides industry-oriented internships, project guidance, and practical training in web development, AI, mobile development, and UI/UX. Our programs are designed to bridge the gap between academic learning and industry requirements.

We offer structured internship programs where you work on real projects under the guidance of experienced mentors. Our internships cover the full development lifecycle—from requirements gathering and design to development, testing, and deployment—giving you practical experience that employers value.

Beyond internships, we provide project assistance for students and professionals looking to build their skills or complete specific projects. Our mentors provide guidance on architecture, code quality, best practices, and career development.`,
    deliverables: [
      'Structured internship programs with live projects',
      'One-on-one mentorship from industry experts',
      'Practical training in web, AI, and mobile development',
      'Project guidance and code reviews',
      'Portfolio development with real projects',
      'Career guidance and interview preparation',
      'Industry certification with online verification',
      'Hands-on experience with modern tools and technologies'
    ],
    technologies: [
      'React', 'Python', 'Node.js', 'Django', 'Flutter', 'React Native',
      'Git', 'Docker', 'REST APIs', 'PostgreSQL', 'MongoDB'
    ]
  },
  'blockchain-crypto-solutions': {
    detailedDescription: `Build decentralized applications (dApps), smart contracts, tokenomics, and secure crypto wallets. We help enterprises leverage blockchain for transparency, traceability, and trustless transactions across industries like finance, supply chain, and real estate.

Our blockchain solutions are built on leading platforms including Ethereum, Solana, and Polkadot. We develop smart contracts that are secure, efficient, and auditable, enabling trustless transactions and automated business logic. Our team follows best practices for smart contract development, including thorough testing, security audits, and gas optimization.

We also build Web3 applications with seamless wallet integration, enabling users to interact with blockchain networks through intuitive interfaces. Our solutions are designed to bring the benefits of blockchain technology—transparency, immutability, and decentralization—to real-world business applications.`,
    deliverables: [
      'Smart contract development and auditing',
      'Decentralized applications (dApps) with Web3 integration',
      'Crypto wallets with multi-currency support',
      'Tokenomics design and ICO/STO strategy',
      'DeFi (Decentralized Finance) applications',
      'NFT marketplaces and platforms',
      'Blockchain integration with existing systems',
      'Supply chain traceability solutions'
    ],
    technologies: [
      'Solidity', 'Rust', 'Ethereum', 'Solana', 'Web3.js', 'ethers.js',
      'Hardhat', 'Truffle', 'IPFS', 'Node.js', 'React', 'TypeScript'
    ]
  },
  'devops-cicd-solutions': {
    detailedDescription: `Automate your software delivery lifecycle with robust CI/CD pipelines, infrastructure as code, container orchestration, and 24/7 monitoring. We help teams ship faster, rollback safely, and scale without downtime.

Our DevOps solutions implement the principles of continuous integration and continuous delivery, enabling rapid, reliable software releases. We automate build, test, and deployment processes to eliminate manual bottlenecks and reduce errors.

We also implement comprehensive monitoring and alerting systems, giving you visibility into your applications' performance and health. Our approach includes infrastructure as code, ensuring your infrastructure is reproducible, version-controlled, and auditable.`,
    deliverables: [
      'CI/CD pipeline implementation and automation',
      'Infrastructure as code with Terraform and CloudFormation',
      'Container orchestration with Docker and Kubernetes',
      'Automated testing and quality assurance',
      'Application and infrastructure monitoring',
      'Log aggregation and analysis',
      'Security scanning and compliance automation',
      'Disaster recovery and backup strategies'
    ],
    technologies: [
      'GitHub Actions', 'Jenkins', 'GitLab CI', 'Terraform', 'Docker',
      'Kubernetes', 'Prometheus', 'Grafana', 'ELK Stack', 'AWS'
    ]
  },
  'iot-emerging-technologies': {
    detailedDescription: `Connect the physical and digital worlds with custom IoT solutions — from sensor networks and edge computing to cloud dashboards. We also explore AR/VR, computer vision at the edge, and next-gen hardware integrations.

Our IoT solutions enable you to collect, process, and act on data from physical sensors and devices. We build end-to-end IoT systems including device firmware, edge computing modules, cloud infrastructure, and user-facing dashboards. Our solutions are designed for reliability, scalability, and security.

We also work with emerging technologies including augmented reality (AR), virtual reality (VR), and edge AI. We help you leverage these technologies to create immersive experiences, automate processes, and gain real-time insights from your physical environment.`,
    deliverables: [
      'Custom IoT solutions with sensor networks and edge computing',
      'Firmware development for microcontrollers (ESP32, Arduino)',
      'Cloud infrastructure for IoT data management',
      'Real-time monitoring and control dashboards',
      'Computer vision at the edge',
      'AR/VR applications for training and visualization',
      'MQTT and WebSocket communication protocols',
      'Predictive maintenance and asset monitoring'
    ],
    technologies: [
      'ESP32', 'Arduino', 'Raspberry Pi', 'MQTT', 'Node.js', 'Python',
      'AWS IoT Core', 'Azure IoT Hub', 'Docker', 'React', 'Grafana'
    ]
  },
  'data-scraping-workflow-automations': {
    detailedDescription: `Extract structured data from websites, APIs, and documents at scale. Build end-to-end automation workflows that trigger actions, sync data across platforms, and eliminate manual repetitive tasks. Perfect for lead generation, market research, price monitoring, and operational efficiency.

Our data scraping solutions are built to handle even the most challenging websites—including those with JavaScript rendering, dynamic content, and anti-scraping measures. We use a combination of techniques including headless browsers, proxy management, and CAPTCHA solving to reliably extract the data you need.

We also build complete automation workflows that combine data extraction with data processing, storage, and action triggering. Whether you need to generate leads, monitor competitor prices, or automate data entry, our solutions are designed for reliability and scale.`,
    deliverables: [
      'Web scraping and data extraction at scale',
      'API integration and data aggregation',
      'Workflow automation and business process optimization',
      'Lead generation and prospecting systems',
      'Price monitoring and competitive intelligence',
      'Document processing and data extraction',
      'Data cleaning, transformation, and enrichment',
      'Automated reporting and alerting'
    ],
    technologies: [
      'Python', 'Scrapy', 'Selenium', 'Playwright', 'BeautifulSoup',
      'Zapier', 'Make', 'PostgreSQL', 'MongoDB', 'Apache Airflow'
    ]
  }
};

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
      },
      {
        icon: Brain,
        title: 'Generative AI & Content Creation',
        description: 'Building content generation systems for marketing, documentation, and creative applications using LLMs and diffusion models.'
      },
      {
        icon: BarChart3,
        title: 'Predictive Analytics',
        description: 'Using machine learning to forecast trends, customer behavior, and business outcomes from historical data.'
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
      },
      {
        icon: Bot,
        title: 'Lead Generation Systems',
        description: 'Automated lead generation, qualification, and outreach systems that integrate with your CRM and marketing tools.'
      },
      {
        icon: Workflow,
        title: 'Business Process Orchestration',
        description: 'Orchestrating complex business processes across multiple systems with error handling, retries, and monitoring.'
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
      },
      {
        icon: Globe,
        title: 'Internationalization & Multi-language',
        description: 'Creating web applications that support multiple languages, currencies, and regional content for global audiences.'
      },
      {
        icon: Layout,
        title: 'Design System Implementation',
        description: 'Implementing comprehensive design systems for consistent, maintainable, and scalable web applications.'
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
      },
      {
        icon: Code,
        title: 'API-First Development',
        description: 'Building API-first applications with comprehensive documentation, versioning, and testing for developer-friendly integration.'
      },
      {
        icon: Server,
        title: 'Microservices Architecture',
        description: 'Designing microservices-based MERN applications with service discovery, load balancing, and inter-service communication.'
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
      },
      {
        icon: Smartphone,
        title: 'E-Commerce Mobile Apps',
        description: 'Building mobile e-commerce apps with seamless checkout, product browsing, and payment integration for enhanced customer experience.'
      },
      {
        icon: Users,
        title: 'Social & Community Apps',
        description: 'Developing social networking applications with user profiles, feeds, messaging, and real-time engagement features.'
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
      },
      {
        icon: Layout,
        title: 'Enterprise Portals',
        description: 'Creating enterprise portals with role-based access, document management, and collaboration features.'
      },
      {
        icon: Layers,
        title: 'E-Learning Platforms',
        description: 'Building LMS (Learning Management Systems) with course management, user tracking, and certification features.'
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
      },
      {
        icon: Server,
        title: 'Serverless Architecture',
        description: 'Designing serverless applications with AWS Lambda, Azure Functions, and Google Cloud Functions for optimal scalability.'
      },
      {
        icon: Cloud,
        title: 'Multi-Cloud Strategy',
        description: 'Developing multi-cloud strategies for reduced vendor lock-in, increased reliability, and optimized performance.'
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
      },
      {
        icon: Code,
        title: 'GraphQL Implementation',
        description: 'Building GraphQL APIs for flexible, efficient data querying with auto-generated documentation and type safety.'
      },
      {
        icon: Workflow,
        title: 'Event-Driven Architecture',
        description: 'Implementing event-driven architectures with message queues, event buses, and real-time data streaming.'
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
      },
      {
        icon: Brain,
        title: 'Domain-Specific Expert Systems',
        description: 'AI assistants trained on your specific domain knowledge for internal use, customer support, and advisory roles.'
      },
      {
        icon: MessageSquareMore,
        title: 'Agentic Chatbots',
        description: 'Building chatbots that can take actions, make decisions, and complete multi-step tasks autonomously.'
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
      },
      {
        icon: BarChart,
        title: 'Performance Monitoring',
        description: 'Building performance dashboards for monitoring KPIs, operational metrics, and business health indicators.'
      },
      {
        icon: TrendingUp,
        title: 'Forecasting & Trend Analysis',
        description: 'Using time series analysis and forecasting models to predict sales, demand, and market trends.'
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
      },
      {
        icon: Cloud,
        title: 'SaaS Deployment & Scaling',
        description: 'Implementing deployment strategies for SaaS products with auto-scaling, load balancing, and zero-downtime updates.'
      },
      {
        icon: Users,
        title: 'Customer Lifecycle Management',
        description: 'Building systems for customer onboarding, retention, upselling, and churn management for SaaS businesses.'
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
      },
      {
        icon: Palette,
        title: 'Brand Identity & Visual Design',
        description: 'Developing brand identities, visual guidelines, and design languages for cohesive brand experiences.'
      },
      {
        icon: PenTool,
        title: 'UX Strategy & Consulting',
        description: 'Providing UX strategy, user journey mapping, and design consulting to improve product adoption and user satisfaction.'
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
      },
      {
        icon: ShoppingCart,
        title: 'Cart Recovery & Retention',
        description: 'Smart cart recovery systems with automated email/SMS reminders and personalized offers to reduce abandonment rates.'
      },
      {
        icon: BarChart3,
        title: 'Analytics & Conversion Optimization',
        description: 'E-commerce analytics, conversion tracking, and A/B testing for data-driven optimization of the shopping experience.'
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
      },
      {
        icon: Target,
        title: 'Lead Generation & Qualification',
        description: 'Strategic lead generation campaigns with automated qualification and scoring for efficient sales pipeline management.'
      },
      {
        icon: LineChart,
        title: 'Performance Marketing',
        description: 'Data-driven performance marketing campaigns with granular targeting, budget optimization, and measurable results.'
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
      },
      {
        icon: BriefcaseBusiness,
        title: 'Sales & Pipeline Management',
        description: 'Building sales management systems with pipeline tracking, forecasting, and performance analytics.'
      },
      {
        icon: Users,
        title: 'Team Collaboration & Task Management',
        description: 'Integrated task management, team collaboration, and productivity tools for enterprise teams.'
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
      },
      {
        icon: GraduationCap,
        title: 'Skill Development Programs',
        description: 'Structured programs for developing in-demand skills in AI, web development, mobile development, and data science.'
      },
      {
        icon: Code,
        title: 'Hackathons & Competitions',
        description: 'Participating in hackathons and coding competitions with mentorship and support from industry professionals.'
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
      },
      {
        icon: Lock,
        title: 'Supply Chain Traceability',
        description: 'Building blockchain-based traceability systems for supply chain transparency, authenticity verification, and compliance.'
      },
      {
        icon: CreditCard,
        title: 'DeFi & Fintech Solutions',
        description: 'Developing DeFi applications for lending, borrowing, swapping, and other financial services on blockchain.'
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
      },
      {
        icon: GitBranch,
        title: 'GitOps & Automated Workflows',
        description: 'Implementing GitOps workflows for automated deployment, rollback, and infrastructure updates from Git repositories.'
      },
      {
        icon: Terminal,
        title: 'Security & Compliance Automation',
        description: 'Automating security scanning, compliance checks, and vulnerability assessment in the CI/CD pipeline.'
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
      },
      {
        icon: Cpu,
        title: 'Edge AI & Computer Vision',
        description: 'Running AI and computer vision models at the edge for real-time analysis and decision-making.'
      },
      {
        icon: Cloud,
        title: 'Industrial IoT (IIoT)',
        description: 'Developing IIoT solutions for manufacturing, predictive maintenance, and industrial process optimization.'
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
      },
      {
        icon: Workflow,
        title: 'Business Process Automation',
        description: 'Building end-to-end automation solutions for entire business processes with monitoring, error handling, and reporting.'
      },
      {
        icon: Package,
        title: 'Data Aggregation & Enrichment',
        description: 'Aggregating data from multiple sources and enriching it with additional information for comprehensive analysis.'
      }
    ]
  }
};

// Generic use cases for services without specific data
const defaultUseCases = {
  title: 'Use Cases & Applications',
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
    },
    {
      icon: Cloud,
      title: 'Cloud-Native Solutions',
      description: 'Leveraging cloud-native architectures for optimal performance, scalability, and reliability.'
    },
    {
      icon: Users,
      title: 'User-Centric Design',
      description: 'Designing solutions with a focus on user experience and user adoption.'
    }
  ]
};

export default function ServiceDetails() {
  const { slug } = useParams();
  const service = agencyServices.find(item => item.slug === slug);
  
  // Get Google Rating dynamically
  const { rating: googleRating, loading: ratingLoading } = useGoogleRating();

  // Get detailed content for this service
  const details = serviceDetailsMap[slug] || {
    detailedDescription: service?.desc || 'Comprehensive solutions tailored to your business needs.',
    deliverables: [
      'Custom scalable solutions',
      'Modern architecture',
      'High performance systems',
      'SEO & optimization',
      'Cloud deployment'
    ],
    technologies: service?.tags || []
  };

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

          {/* Content - 2 Column Layout with expanded description */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem'
          }}>
            {/* Left Column - Detailed Description & Deliverables */}
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
                {details.deliverables.map((item, index) => (
                  <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <Check size={16} color="var(--accent)" style={{ marginTop: '0.3rem', flexShrink: 0 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Detailed Description - This is the expanded content */}
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: '1.1rem',
                  marginBottom: '0.75rem',
                  color: 'var(--accent)'
                }}>
                  Why Choose Us
                </h3>
                <div style={{
                  lineHeight: 1.8,
                  color: 'var(--text-2)',
                  fontSize: '0.95rem'
                }}>
                  {details.detailedDescription.split('\n').map((paragraph, index) => (
                    <p key={index} style={{ marginBottom: '1rem' }}>
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>

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

            {/* Right Column - Technologies & Quote */}
            <div>
              <h2 style={{ marginBottom: '1rem', fontFamily: 'var(--font-sans)' }}>
                Technologies We Use
              </h2>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                marginBottom: '2rem'
              }}>
                {details.technologies.map((tag, index) => (
                  <span key={index} className="badge-raw" style={{ fontSize: '0.7rem' }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Key Benefits */}
              <div style={{
                padding: '1.5rem',
                border: '1px solid var(--line)',
                background: 'var(--bg-alt)',
                marginBottom: '2rem'
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  marginBottom: '0.75rem'
                }}>
                  Key Benefits
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: 'var(--text-2)',
                  fontSize: '0.875rem',
                  lineHeight: 2
                }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Check size={14} color="var(--accent)" /> Scalable & maintainable architecture
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Check size={14} color="var(--accent)" /> Modern technology stack
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Check size={14} color="var(--accent)" /> Security-first approach
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Check size={14} color="var(--accent)" /> Performance optimization
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Check size={14} color="var(--accent)" /> Continuous support & maintenance
                  </li>
                </ul>
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