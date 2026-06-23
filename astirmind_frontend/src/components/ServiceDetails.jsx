import { useParams } from 'react-router-dom';
import { agencyServices } from './Services';
import { Helmet } from 'react-helmet';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

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

export default function ServiceDetails() {
  const { slug } = useParams();
  const service = agencyServices.find(item => item.slug === slug);
  const [openModules, setOpenModules] = useState({});
  const [openFAQs, setOpenFAQs] = useState({});

  // Get syllabus for this service
  const serviceSyllabus = {
    'ml-ai-solutions': {
      modules: [
        {
          title: 'Python for AI & Data Science',
          topics: [
            'Python Fundamentals',
            'NumPy',
            'Pandas',
            'Matplotlib',
            'Data Cleaning',
            'Exploratory Data Analysis (EDA)'
          ]
        },
        {
          title: 'Machine Learning Fundamentals',
          topics: [
            'Supervised Learning',
            'Unsupervised Learning',
            'Feature Engineering',
            'Feature Selection',
            'Data Preprocessing',
            'Model Evaluation',
            'Cross Validation',
            'Hyperparameter Tuning',
            'Scikit-Learn'
          ]
        },
        {
          title: 'Deep Learning & Neural Networks',
          topics: [
            'Artificial Neural Networks (ANN)',
            'Convolutional Neural Networks (CNN)',
            'Recurrent Neural Networks (RNN)',
            'LSTM & GRU',
            'Transfer Learning',
            'TensorFlow',
            'Keras',
            'PyTorch',
            'Model Optimization',
            'Model Deployment'
          ]
        },
        {
          title: 'Natural Language Processing (NLP)',
          topics: [
            'Text Preprocessing',
            'Tokenization',
            'Word Embeddings',
            'Sentiment Analysis',
            'Named Entity Recognition',
            'Transformers',
            'BERT',
            'Hugging Face'
          ]
        },
        {
          title: 'ASR & Speech AI',
          topics: [
            'Speech-to-Text',
            'Text-to-Speech',
            'Speech Recognition',
            'Voice Assistants',
            'Audio Processing',
            'Whisper'
          ]
        },
        {
          title: 'Computer Vision',
          topics: [
            'OpenCV',
            'Image Processing',
            'Image Classification',
            'Object Detection',
            'Image Segmentation',
            'YOLO',
            'Pose Estimation',
            'OCR'
          ]
        },
        {
          title: 'Generative AI & LLMs',
          topics: [
            'Generative AI',
            'Large Language Models (LLMs)',
            'Prompt Engineering',
            'GPT Models',
            'RAG',
            'Vector Databases',
            'LangChain',
            'AI Agents'
          ]
        },
        {
          title: 'MLOps & Deployment',
          topics: [
            'Model Serving',
            'FastAPI',
            'Docker',
            'Cloud Deployment',
            'Monitoring',
            'CI/CD for ML'
          ]
        },
        {
          title: 'AI Projects',
          topics: [
            'Chatbot Development',
            'Recommendation System',
            'Object Detection System',
            'Speech Recognition App',
            'Generative AI Application',
            'End-to-End AI Capstone Project'
          ]
        }
      ],
      faqs: [
        {
          question: 'What is the duration of the ML & AI Solutions program?',
          answer: 'The program typically spans 12-16 weeks depending on the specific track and project complexity. We offer both full-time and part-time options to accommodate different schedules.'
        },
        {
          question: 'Do I need prior coding experience?',
          answer: 'Basic programming knowledge is recommended, but we provide foundational training in Python for beginners. Our curriculum is designed to take you from fundamentals to advanced AI/ML concepts.'
        },
        {
          question: 'What projects will I work on?',
          answer: 'You\'ll work on real-world projects including chatbots, recommendation systems, object detection systems, speech recognition apps, and generative AI applications. All projects are production-ready.'
        },
        {
          question: 'Will I get a certificate upon completion?',
          answer: 'Yes, you\'ll receive a industry-recognized certificate that validates your AI/ML skills. The certificate is backed by practical project work and assessments.'
        },
        {
          question: 'What tools and technologies will I learn?',
          answer: 'You\'ll master Python, TensorFlow, PyTorch, Scikit-Learn, OpenCV, Hugging Face, LangChain, Docker, FastAPI, and cloud deployment platforms like AWS and Azure.'
        }
      ]
    },
    'automation-solutions': {
      modules: [
        { title: 'Automation Fundamentals', topics: ['Process Analysis', 'Workflow Design', 'Automation Tools', 'Best Practices'] },
        { title: 'Browser Automation', topics: ['Selenium WebDriver', 'Playwright', 'Puppeteer', 'Web Scraping'] },
        { title: 'CRM & Lead Gen Automation', topics: ['CRM Integration', 'Lead Scoring', 'Email Automation', 'Pipeline Management'] },
        { title: 'Workflow Optimization', topics: ['Business Process Automation', 'API Integration', 'Data Sync', 'Monitoring'] }
      ],
      faqs: [
        {
          question: 'What types of automation do you specialize in?',
          answer: 'We specialize in browser automation, workflow automation, CRM automation, lead generation automation, and business process automation using tools like Selenium, Playwright, and custom Python solutions.'
        },
        {
          question: 'How long does it take to implement automation?',
          answer: 'Implementation timelines vary based on complexity. Simple automations can be deployed in 1-2 weeks, while complex enterprise workflows may take 4-6 weeks.'
        },
        {
          question: 'Can you integrate with our existing CRM?',
          answer: 'Yes, we can integrate with all major CRMs including Salesforce, HubSpot, Zoho, and custom CRM solutions through REST APIs and webhooks.'
        },
        {
          question: 'What is business process automation?',
          answer: 'Business process automation uses software and technology to automate repetitive tasks, reduce manual effort, improve accuracy, and increase operational efficiency.'
        },
        {
          question: 'Which automation tools do you use?',
          answer: 'We use Selenium, Playwright, Puppeteer, Python, Node.js, Zapier, Make (Integromat), REST APIs, webhooks, and custom automation frameworks depending on project requirements.'
        },
        {
          question: 'Can automation reduce operational costs?',
          answer: 'Yes, automation reduces repetitive manual work, minimizes human errors, improves productivity, and significantly lowers operational costs over time.'
        },
        {
          question: 'Do you provide web scraping and data extraction solutions?',
          answer: 'Yes, we develop automated web scraping solutions for data collection, market research, lead generation, competitor analysis, and business intelligence purposes.'
        },
        {
          question: 'Can automation handle large volumes of data?',
          answer: 'Absolutely. Our automation solutions are designed to process large datasets efficiently while maintaining accuracy, reliability, and performance.'
        },
        {
          question: 'How secure are automation solutions?',
          answer: 'We implement secure authentication, encrypted data transfer, role-based access controls, logging, monitoring, and compliance best practices to ensure security.'
        },
        {
          question: 'Can automation work with third-party applications?',
          answer: 'Yes, we integrate automation solutions with CRMs, ERPs, marketing platforms, payment gateways, cloud services, databases, and other third-party applications.'
        },
        {
          question: 'What industries benefit from automation?',
          answer: 'Automation is widely used in healthcare, finance, real estate, manufacturing, logistics, education, e-commerce, SaaS, and professional services industries.'
        },
        {
          question: 'Do you provide workflow automation?',
          answer: 'Yes, we automate business workflows such as approvals, notifications, data synchronization, reporting, lead management, and customer onboarding processes.'
        },
        {
          question: 'Can automation improve lead generation?',
          answer: 'Yes, automation can collect leads, enrich contact information, score prospects, automate outreach campaigns, and streamline sales pipelines.'
        },
        {
          question: 'Do you offer monitoring and maintenance services?',
          answer: 'Yes, we provide ongoing monitoring, troubleshooting, updates, performance optimization, and maintenance to ensure automation workflows run smoothly.'
        },
        {
          question: 'What ROI can businesses expect from automation?',
          answer: 'Most businesses experience significant ROI through reduced labor costs, faster processing times, improved accuracy, increased productivity, and better customer experiences.'
        },
        {
          question: 'Can automation scale as our business grows?',
          answer: 'Yes, our automation solutions are designed with scalability in mind, allowing them to handle increased workloads, users, and business processes as your organization expands.'
        }
      ]
    },
    'web-development': {
      modules: [
        { title: 'Frontend Development', topics: ['HTML5 & CSS3', 'JavaScript ES6+', 'React & Next.js', 'State Management'] },
        { title: 'Backend Development', topics: ['Node.js & Express', 'Python & Django', 'REST APIs', 'Authentication'] },
        { title: 'Database & Deployment', topics: ['SQL & NoSQL', 'MongoDB', 'PostgreSQL', 'Cloud Deployment'] },
        { title: 'Performance & Security', topics: ['Web Performance', 'Security Best Practices', 'Testing', 'CI/CD'] }
      ],
      faqs: [
        {
          question: 'What frameworks do you use for web development?',
          answer: 'We use modern frameworks including React, Next.js for frontend, and Node.js, Express, Django for backend development. We also work with various databases like MongoDB, PostgreSQL, and MySQL.'
        },
        {
          question: 'Do you provide post-launch support?',
          answer: 'Yes, we provide comprehensive post-launch support including maintenance, updates, security patches, and performance optimization for 6-12 months depending on the package.'
        }
      ]
    },
    'mern-stack-development': {
      modules: [
        {
          title: 'MongoDB & Backend',
          topics: [
            'Node.js Fundamentals',
            'NPM & Package Management',
            'Express.js',
            'Express Middleware',
            'Routing',
            'RESTful APIs',
            'CRUD Operations',
            'MongoDB Basics',
            'MongoDB Modeling',
            'MongoDB Aggregation',
            'Mongoose ODM',
            'Schemas & Models',
            'Validation',
            'Error Handling',
            'Environment Variables'
          ]
        },
        {
          title: 'React Frontend',
          topics: [
            'React Basics',
            'JSX',
            'Components',
            'Props',
            'State',
            'React Hooks',
            'useState',
            'useEffect',
            'useContext',
            'Context API',
            'Redux Toolkit',
            'React Router',
            'Forms Handling',
            'Form Validation',
            'API Integration',
            'Axios',
            'Conditional Rendering',
            'Event Handling',
            'Custom Hooks',
            'Lazy Loading',
            'React Memo',
            'Tailwind CSS',
            'Bootstrap',
            'Material UI',
            'Responsive Design',
            'Project Deployment'
          ]
        },
        {
          title: 'Authentication & Security',
          topics: [
            'Authentication',
            'Authorization',
            'JWT',
            'OAuth',
            'Role-Based Access Control',
            'Password Hashing (bcrypt)',
            'Protected Routes',
            'Cookies & Sessions',
            'Security Best Practices'
          ]
        },
        {
          title: 'Real-Time Features',
          topics: [
            'WebSockets',
            'Socket.io',
            'Real-time Chat',
            'Notifications',
            'Live Updates',
            'Performance Optimization'
          ]
        },
        {
          title: 'Advanced MERN',
          topics: [
            'File Uploads',
            'Cloudinary Integration',
            'Pagination',
            'Search & Filtering',
            'MVC Architecture',
            'Caching',
            'API Testing with Postman',
            'Git & GitHub',
            'Deployment on VPS',
            'CI/CD Basics'
          ]
        },
        {
          title: 'Projects',
          topics: [
            'Blog Application',
            'E-Commerce Website',
            'Chat Application',
            'Admin Dashboard',
            'Full MERN Capstone Project'
          ]
        }
      ],
      faqs: [
        {
          question: 'Is MERN stack good for enterprise applications?',
          answer: 'Yes, MERN stack is excellent for enterprise applications. It offers scalability, flexibility, and a unified JavaScript ecosystem that reduces development complexity and improves team productivity.'
        },
        {
          question: 'How long does it take to build a MERN application?',
          answer: 'Development time varies by complexity. A simple CRUD application takes 4-6 weeks, while complex enterprise applications with real-time features can take 3-6 months.'
        },
        {
          question: 'What is MERN stack?',
          answer: 'MERN is a full-stack JavaScript technology stack consisting of MongoDB, Express.js, React.js, and Node.js. It enables developers to build modern, scalable web applications using a single programming language.'
        },
        {
          question: 'Why choose MERN stack for web development?',
          answer: 'MERN stack provides faster development, excellent scalability, reusable components, high performance, and a large developer community, making it ideal for modern web applications.'
        },
        {
          question: 'Can MERN stack handle large-scale applications?',
          answer: 'Yes. MERN stack is used to build scalable applications with features such as microservices, cloud deployment, load balancing, caching, and database optimization.'
        },
        {
          question: 'Does MERN stack support real-time applications?',
          answer: 'Yes. Using WebSockets and Socket.io, MERN applications can support real-time chat, notifications, live dashboards, collaborative tools, and streaming features.'
        },
        {
          question: 'Is MERN stack suitable for startups?',
          answer: 'Absolutely. MERN stack reduces development costs, speeds up product launches, and provides flexibility for future growth, making it a popular choice for startups.'
        },
        {
          question: 'What types of applications can be built with MERN stack?',
          answer: 'MERN stack can be used to build e-commerce websites, social media platforms, SaaS applications, CRM systems, dashboards, learning management systems, and enterprise portals.'
        },
        {
          question: 'Is MERN stack SEO-friendly?',
          answer: 'Yes. By using server-side rendering solutions such as Next.js along with React, MERN applications can achieve excellent SEO performance and faster page loading.'
        },
        {
          question: 'Can MERN stack applications be deployed on the cloud?',
          answer: 'Yes. MERN applications can be deployed on AWS, Azure, Google Cloud, DigitalOcean, VPS servers, and modern hosting platforms using Docker and CI/CD pipelines.'
        },
        {
          question: 'How secure is a MERN stack application?',
          answer: 'MERN applications can be highly secure when implemented with JWT authentication, role-based access control, encryption, input validation, HTTPS, and security best practices.'
        },
        {
          question: 'What databases can be used with MERN stack?',
          answer: 'MongoDB is the primary database in MERN, but applications can also integrate with PostgreSQL, MySQL, Redis, and other databases depending on project requirements.'
        }
      ]
    },
    'mobile-app-development': {
      modules: [
        {
          title: 'Mobile App Development Fundamentals',
          topics: [
            'Introduction to Mobile Apps',
            'Mobile UI/UX Principles',
            'Responsive Design',
            'Version Control with Git & GitHub',
            'App Architecture Basics'
          ]
        },
        {
          title: 'Android Development',
          topics: [
            'Kotlin Fundamentals',
            'Object-Oriented Programming',
            'Android Studio',
            'Android SDK',
            'Activities & Fragments',
            'Layouts & UI Design',
            'Intents',
            'RecyclerView',
            'Navigation Components',
            'Local Storage',
            'SQLite',
            'Room Database'
          ]
        },
        {
          title: 'React Native Development',
          topics: [
            'React Native Basics',
            'JSX & Components',
            'Props & State',
            'React Hooks',
            'Navigation',
            'Redux Toolkit',
            'API Integration',
            'Axios',
            'Forms & Validation',
            'Push Notifications',
            'Device Features'
          ]
        },
        {
          title: 'Flutter Development',
          topics: [
            'Dart Fundamentals',
            'Flutter Widgets',
            'Layouts & Navigation',
            'State Management',
            'Provider',
            'Bloc Pattern',
            'API Integration',
            'Firebase Integration',
            'Animations',
            'Cross-Platform Development'
          ]
        },
        {
          title: 'Backend & Database Integration',
          topics: [
            'REST APIs',
            'JSON Handling',
            'Authentication',
            'JWT',
            'Firebase Authentication',
            'Cloud Firestore',
            'Realtime Database',
            'Node.js Backend Integration'
          ]
        },
        {
          title: 'Advanced Mobile Features',
          topics: [
            'Push Notifications',
            'Google Maps Integration',
            'Location Services',
            'Camera Integration',
            'Image Upload',
            'Biometric Authentication',
            'Payment Gateway Integration',
            'Offline Data Storage'
          ]
        },
        {
          title: 'Testing & Optimization',
          topics: [
            'Unit Testing',
            'Widget Testing',
            'Debugging',
            'Performance Optimization',
            'App Security',
            'Code Optimization'
          ]
        },
        {
          title: 'App Deployment & Publishing',
          topics: [
            'App Signing',
            'Google Play Store Publishing',
            'Apple App Store Publishing',
            'App Monetization',
            'Google AdMob',
            'Firebase Analytics',
            'Crash Reporting',
            'App Maintenance'
          ]
        },
        {
          title: 'Industry Projects',
          topics: [
            'E-Commerce App',
            'Food Delivery App',
            'Chat Application',
            'Social Media App',
            'Location Tracking App',
            'Full Mobile App Capstone Project'
          ]
        }
      ],
      faqs: [
        {
          question: 'What platforms do you develop apps for?',
          answer: 'We develop native Android apps using Kotlin, and cross-platform apps using React Native and Flutter for both iOS and Android. This gives you the best of both worlds - native performance and cross-platform efficiency.'
        },
        {
          question: 'Do you handle app store submission?',
          answer: 'Yes, we handle the entire app store submission process for both Google Play Store and Apple App Store. We ensure your app meets all guidelines and requirements for a smooth launch.'
        },
        {
          question: 'How long does it take to develop a mobile app?',
          answer: 'The development timeline depends on the complexity of the app. A basic application may take 4-8 weeks, while a feature-rich enterprise app can take several months.'
        },
        {
          question: 'Which technology is best for mobile app development?',
          answer: 'The choice depends on project requirements. Kotlin is ideal for native Android apps, while React Native and Flutter are excellent for cross-platform development with faster delivery times.'
        },
        {
          question: 'Can you integrate APIs and third-party services?',
          answer: 'Yes, we integrate REST APIs, payment gateways, social logins, maps, analytics tools, cloud services, and other third-party platforms to enhance app functionality.'
        },
        {
          question: 'Do you provide backend development for mobile apps?',
          answer: 'Yes, we develop secure backend systems using Node.js, Express.js, Firebase, and cloud databases to support mobile applications.'
        },
        {
          question: 'Can mobile apps work offline?',
          answer: 'Yes, we can implement offline functionality using local storage solutions such as SQLite, Room Database, and caching mechanisms to ensure uninterrupted user experiences.'
        },
        {
          question: 'Do you develop e-commerce and business apps?',
          answer: 'Yes, we build e-commerce applications, booking platforms, delivery apps, CRM solutions, healthcare apps, educational apps, and custom business applications.'
        },
        {
          question: 'How do you ensure app security?',
          answer: 'We implement industry-standard security practices including authentication, authorization, encrypted data storage, secure APIs, biometric authentication, and compliance with platform guidelines.'
        },
        {
          question: 'Do you offer app maintenance and support?',
          answer: 'Yes, we provide ongoing maintenance, bug fixes, feature enhancements, performance monitoring, and version updates after deployment.'
        },
        {
          question: 'Can you integrate payment gateways into mobile apps?',
          answer: 'Yes, we integrate popular payment gateways such as Stripe, Razorpay, PayPal, and other secure payment solutions for seamless transactions.'
        },
        {
          question: 'Will my app be scalable for future growth?',
          answer: 'Absolutely. We design mobile applications with scalable architectures that can support increasing users, features, and business requirements over time.'
        }
      ]
    },
    'cloud-consulting': {
      modules: [
        {
          title: 'Cloud Computing Fundamentals',
          topics: [
            'Introduction to Cloud Computing',
            'Cloud Service Models (IaaS, PaaS, SaaS)',
            'Public, Private & Hybrid Cloud',
            'AWS, Azure & GCP Overview',
            'Virtualization',
            'Containerization',
            'Cloud Architecture Basics'
          ]
        },
        {
          title: 'Linux & Networking',
          topics: [
            'Linux Fundamentals',
            'Linux Commands',
            'Shell Scripting',
            'TCP/IP',
            'DNS',
            'HTTP/HTTPS',
            'Load Balancing',
            'Networking Concepts'
          ]
        },
        {
          title: 'AWS Cloud Services',
          topics: [
            'EC2',
            'S3',
            'VPC',
            'IAM',
            'RDS',
            'Lambda',
            'CloudWatch',
            'Route 53',
            'Auto Scaling',
            'Elastic Load Balancer'
          ]
        },
        {
          title: 'Azure & Google Cloud',
          topics: [
            'Azure Virtual Machines',
            'Azure Storage',
            'Azure Active Directory',
            'Google Compute Engine',
            'Google Cloud Storage',
            'Google Kubernetes Engine',
            'Cloud Functions'
          ]
        },
        {
          title: 'Infrastructure as Code (IaC)',
          topics: [
            'Terraform Basics',
            'Terraform Modules',
            'State Management',
            'AWS CloudFormation',
            'Ansible',
            'Configuration Management',
            'Automation'
          ]
        },
        {
          title: 'Containers & Orchestration',
          topics: [
            'Docker Fundamentals',
            'Docker Images',
            'Docker Containers',
            'Docker Compose',
            'Kubernetes Architecture',
            'Pods & Services',
            'Deployments',
            'Helm Charts'
          ]
        },
        {
          title: 'DevOps & CI/CD',
          topics: [
            'DevOps Fundamentals',
            'Git & GitHub',
            'GitHub Actions',
            'Jenkins',
            'CI/CD Pipelines',
            'Automated Testing',
            'Deployment Strategies'
          ]
        },
        {
          title: 'Monitoring & Logging',
          topics: [
            'CloudWatch',
            'Prometheus',
            'Grafana',
            'ELK Stack',
            'Log Management',
            'Performance Monitoring',
            'Alerting'
          ]
        },
        {
          title: 'Security & Compliance',
          topics: [
            'Cloud Security Fundamentals',
            'IAM',
            'Identity Federation',
            'Network Security',
            'Encryption',
            'Compliance Standards',
            'Security Best Practices',
            'Disaster Recovery'
          ]
        },
        {
          title: 'Cloud Projects & Deployment',
          topics: [
            'Deploying Web Applications',
            'Microservices Architecture',
            'Serverless Applications',
            'Containerized Deployments',
            'Multi-Cloud Deployments',
            'End-to-End Cloud Project'
          ]
        }
      ],
      faqs: [
        {
          question: 'Which cloud providers do you support?',
          answer: 'We support all major cloud providers including AWS, Microsoft Azure, and Google Cloud Platform. We can help you choose the best provider based on your specific requirements and budget.'
        },
        {
          question: 'What is your cloud migration process?',
          answer: 'Our migration process includes assessment, planning, migration execution, testing, and optimization. We ensure minimal downtime and data integrity throughout the migration process.'
        },
        {
          question: 'What is cloud consulting?',
          answer: 'Cloud consulting helps businesses design, migrate, optimize, and manage cloud infrastructure to improve scalability, security, performance, and cost efficiency.'
        },
        {
          question: 'Why should my business move to the cloud?',
          answer: 'Cloud platforms provide scalability, high availability, reduced infrastructure costs, enhanced security, and faster deployment of applications and services.'
        },
        {
          question: 'Do you provide multi-cloud solutions?',
          answer: 'Yes, we design and manage multi-cloud environments using AWS, Azure, and Google Cloud Platform to improve reliability, flexibility, and vendor independence.'
        },
        {
          question: 'Can you help reduce cloud costs?',
          answer: 'Yes, we perform cloud cost optimization through resource monitoring, right-sizing, auto-scaling, reserved instances, and infrastructure optimization strategies.'
        },
        {
          question: 'Do you provide DevOps services?',
          answer: 'Yes, we implement DevOps practices including CI/CD pipelines, infrastructure automation, Docker, Kubernetes, monitoring, and automated deployments.'
        },
        {
          question: 'How secure are cloud environments?',
          answer: 'Cloud environments can be highly secure when configured correctly with IAM policies, encryption, network security controls, monitoring, compliance frameworks, and security best practices.'
        },
        {
          question: 'What is Infrastructure as Code (IaC)?',
          answer: 'Infrastructure as Code allows cloud resources to be managed and provisioned through code using tools such as Terraform, CloudFormation, and Ansible, ensuring consistency and automation.'
        },
        {
          question: 'Can you deploy containerized applications?',
          answer: 'Yes, we deploy and manage containerized applications using Docker and Kubernetes, enabling scalable, portable, and efficient cloud-native solutions.'
        },
        {
          question: 'Do you offer cloud monitoring and support?',
          answer: 'Yes, we provide 24/7 monitoring, performance optimization, logging, alerting, incident management, and ongoing support for cloud infrastructure.'
        },
        {
          question: 'What industries can benefit from cloud consulting?',
          answer: 'Cloud consulting benefits industries such as healthcare, finance, education, retail, manufacturing, logistics, SaaS, and enterprise organizations of all sizes.'
        },
        {
          question: 'Can you help with disaster recovery and backup strategies?',
          answer: 'Yes, we design disaster recovery plans, automated backups, failover solutions, and business continuity strategies to minimize downtime and protect critical data.'
        },
        {
          question: 'How long does a cloud migration project take?',
          answer: 'The timeline depends on the size and complexity of the infrastructure. Small migrations may take a few weeks, while enterprise-scale migrations can take several months.'
        }
      ]
    },

    'api-development-integrations': {
  modules: [
    {
      title: 'API Fundamentals',
      topics: [
        'Introduction to APIs',
        'REST API Fundamentals',
        'SOAP vs REST',
        'GraphQL Basics',
        'API Architecture',
        'HTTP Methods',
        'Status Codes',
        'Request & Response Lifecycle'
      ]
    },
    {
      title: 'Backend API Development',
      topics: [
        'Node.js API Development',
        'Express.js',
        'Routing',
        'Middleware',
        'CRUD Operations',
        'Database Integration',
        'MongoDB & Mongoose',
        'PostgreSQL Integration'
      ]
    },
    {
      title: 'Authentication & Security',
      topics: [
        'JWT Authentication',
        'OAuth 2.0',
        'API Keys',
        'Role-Based Access Control',
        'Session Management',
        'Password Encryption',
        'Rate Limiting',
        'API Security Best Practices'
      ]
    },
    {
      title: 'Third-Party API Integrations',
      topics: [
        'Payment Gateway Integration',
        'Stripe Integration',
        'PayPal Integration',
        'Razorpay Integration',
        'Google APIs',
        'Google Maps API',
        'Firebase Integration',
        'Social Login APIs'
      ]
    },
    {
      title: 'Advanced API Development',
      topics: [
        'GraphQL APIs',
        'Webhooks',
        'Microservices',
        'API Gateway',
        'Caching with Redis',
        'Queue Systems',
        'Scalable API Design',
        'Versioning Strategies'
      ]
    },
    {
      title: 'API Testing & Documentation',
      topics: [
        'Postman',
        'Swagger/OpenAPI',
        'API Documentation',
        'Unit Testing',
        'Integration Testing',
        'Load Testing',
        'Error Handling',
        'Monitoring & Logging'
      ]
    },
    {
      title: 'Cloud Deployment',
      topics: [
        'Docker',
        'CI/CD Pipelines',
        'AWS Deployment',
        'Azure Deployment',
        'Google Cloud Deployment',
        'Nginx',
        'Load Balancing',
        'Production Monitoring'
      ]
    },
    {
      title: 'Projects',
      topics: [
        'E-Commerce API',
        'Payment Integration Project',
        'CRM API Integration',
        'Social Login System',
        'Booking System API',
        'End-to-End API Capstone Project'
      ]
    }
  ],

  faqs: [
    {
      question: 'What is API development?',
      answer: 'API development involves creating interfaces that allow different applications, platforms, and services to communicate and exchange data securely.'
    },
    {
      question: 'What types of APIs do you develop?',
      answer: 'We develop REST APIs, GraphQL APIs, microservices APIs, internal APIs, public APIs, and third-party integration APIs.'
    },
    {
      question: 'Can you integrate third-party services?',
      answer: 'Yes, we integrate payment gateways, CRM systems, ERP platforms, Google services, social media APIs, cloud services, and custom business applications.'
    },
    {
      question: 'Do you provide API documentation?',
      answer: 'Yes, we create professional API documentation using Swagger/OpenAPI to make integration easier for developers.'
    },
    {
      question: 'How do you secure APIs?',
      answer: 'We implement JWT authentication, OAuth 2.0, API keys, encryption, rate limiting, access controls, and security best practices.'
    },
    {
      question: 'Can APIs handle large-scale applications?',
      answer: 'Yes, we build scalable APIs using caching, load balancing, microservices architecture, and cloud infrastructure.'
    },
    {
      question: 'Do you support payment gateway integrations?',
      answer: 'Yes, we integrate Stripe, PayPal, Razorpay, Paytm, and other payment providers.'
    },
    {
      question: 'What is the difference between REST and GraphQL?',
      answer: 'REST uses multiple endpoints while GraphQL allows clients to request exactly the data they need from a single endpoint.'
    },
    {
      question: 'Do you provide API testing services?',
      answer: 'Yes, we perform functional testing, integration testing, load testing, security testing, and performance testing.'
    },
    {
      question: 'Can you modernize legacy systems with APIs?',
      answer: 'Yes, we create APIs that connect legacy software with modern web, mobile, and cloud applications.'
    },
    {
      question: 'Do you deploy APIs to the cloud?',
      answer: 'Yes, we deploy APIs on AWS, Azure, Google Cloud, DigitalOcean, and VPS servers.'
    },
    {
      question: 'What industries benefit from API integrations?',
      answer: 'E-commerce, healthcare, fintech, logistics, education, SaaS, CRM, ERP, and enterprise businesses all benefit from API integrations.'
    }
  ]
},
    'data-scraping-workflow-automations': {
      modules: [
        { title: 'Web Scraping Fundamentals', topics: ['HTML Parsing', 'CSS Selectors', 'XPath', 'APIs'] },
        { title: 'Advanced Scraping', topics: ['Selenium', 'Playwright', 'Dynamic Content', 'Proxy Rotation'] },
        { title: 'Workflow Automation', topics: ['Zapier', 'Make', 'n8n', 'Custom Workflows'] },
        { title: 'Data Processing', topics: ['Data Cleaning', 'ETL Pipelines', 'Data Storage', 'Visualization'] }
      ],
      faqs: [
        {
          question: 'Is web scraping legal?',
          answer: 'Yes, web scraping is legal when done ethically and in compliance with website terms of service and robots.txt files. We ensure all our scraping activities are compliant with legal requirements.'
        },
        {
          question: 'What data sources can you scrape?',
          answer: 'We can scrape data from any public website, APIs, documents (PDF, Word, Excel), and databases. We also handle dynamic content and JavaScript-rendered pages.'
        }
      ]
    },
    'data-analytics-visualization': {
      modules: [
        {
          title: 'Data Analytics Fundamentals',
          topics: [
            'Introduction to Data Analytics',
            'Data Types & Structures',
            'Data Collection Methods',
            'Data Quality Assessment',
            'Data Governance Basics'
          ]
        },
        {
          title: 'Data Cleaning & Preprocessing',
          topics: [
            'Data Cleaning Techniques',
            'Handling Missing Values',
            'Outlier Detection & Treatment',
            'Data Transformation',
            'Data Normalization',
            'Feature Engineering'
          ]
        },
        {
          title: 'Exploratory Data Analysis (EDA)',
          topics: [
            'Descriptive Statistics',
            'Data Visualization Basics',
            'Univariate Analysis',
            'Bivariate Analysis',
            'Multivariate Analysis',
            'Correlation Analysis',
            'Hypothesis Testing'
          ]
        },
        {
          title: 'Python for Data Analytics',
          topics: [
            'Python Fundamentals',
            'NumPy for Numerical Computing',
            'Pandas for Data Manipulation',
            'DataFrames & Series',
            'GroupBy Operations',
            'Pivot Tables',
            'Time Series Analysis'
          ]
        },
        {
          title: 'Data Visualization Tools',
          topics: [
            'Matplotlib Fundamentals',
            'Seaborn for Statistical Visualization',
            'Plotly for Interactive Charts',
            'Power BI Dashboard Design',
            'Tableau Desktop Fundamentals',
            'Creating Interactive Dashboards',
            'Data Storytelling Techniques'
          ]
        },
        {
          title: 'SQL for Data Analytics',
          topics: [
            'SQL Fundamentals',
            'SELECT Statements',
            'JOIN Operations',
            'Subqueries & CTEs',
            'Window Functions',
            'Aggregation Functions',
            'Database Design',
            'Performance Optimization'
          ]
        },
        {
          title: 'Statistical Analysis',
          topics: [
            'Descriptive Statistics',
            'Inferential Statistics',
            'Probability Distributions',
            'Confidence Intervals',
            'A/B Testing',
            'Regression Analysis',
            'Statistical Significance',
            'Hypothesis Testing'
          ]
        },
        {
          title: 'Business Intelligence & Reporting',
          topics: [
            'BI Concepts & Architecture',
            'Dashboard Design Principles',
            'KPI Identification & Tracking',
            'Executive Dashboards',
            'Automated Reporting',
            'Data-Driven Decision Making',
            'Storytelling with Data'
          ]
        },
        {
          title: 'Advanced Analytics',
          topics: [
            'Predictive Analytics',
            'Forecasting Methods',
            'Time Series Forecasting',
            'Machine Learning Basics',
            'Clustering Analysis',
            'Classification Models',
            'Anomaly Detection'
          ]
        },
        {
          title: 'Data Analytics Projects',
          topics: [
            'Sales Data Analysis & Dashboard',
            'Customer Segmentation Analysis',
            'Financial Data Visualization',
            'Marketing Analytics Dashboard',
            'Healthcare Data Analytics',
            'End-to-End Analytics Capstone Project'
          ]
        }
      ],
      faqs: [
        {
          question: 'What tools will I learn in this program?',
          answer: 'You\'ll master Python, Pandas, NumPy, Matplotlib, Seaborn, Plotly, Power BI, Tableau, SQL, and various statistical analysis tools. You\'ll also learn to create interactive dashboards and business intelligence reports.'
        },
        {
          question: 'Is this program suitable for beginners?',
          answer: 'Yes, we start with fundamentals and gradually progress to advanced topics. Basic programming knowledge is helpful but not required as we cover Python from scratch.'
        },
        {
          question: 'What is data analytics?',
          answer: 'Data analytics is the process of collecting, cleaning, analyzing, and interpreting data to uncover insights, identify trends, and support business decision-making.'
        },
        {
          question: 'What career opportunities are available after learning data analytics?',
          answer: 'You can pursue roles such as Data Analyst, Business Analyst, BI Analyst, Reporting Analyst, Data Visualization Specialist, Product Analyst, and Analytics Consultant.'
        },
        {
          question: 'Do I need programming experience to learn data analytics?',
          answer: 'No prior programming experience is required. The program covers Python fundamentals and gradually introduces advanced analytical concepts.'
        },
        {
          question: 'Will I learn Power BI and Tableau?',
          answer: 'Yes, the program includes Power BI and Tableau for creating interactive dashboards, reports, KPIs, and business intelligence solutions.'
        },
        {
          question: 'Why is SQL important for data analytics?',
          answer: 'SQL is essential for retrieving, filtering, joining, and analyzing data stored in databases. It is one of the most in-demand skills for data analysts.'
        },
        {
          question: 'Will I work on real-world projects?',
          answer: 'Yes, you will complete practical projects involving sales analysis, customer segmentation, financial reporting, marketing analytics, and business dashboards.'
        },
        {
          question: 'What is the difference between data analytics and data science?',
          answer: 'Data analytics focuses on analyzing historical data and creating insights, while data science includes machine learning, predictive modeling, and advanced statistical techniques.'
        },
        {
          question: 'How important is data visualization in analytics?',
          answer: 'Data visualization helps transform complex data into understandable charts, graphs, and dashboards, enabling faster and more informed decision-making.'
        },
        {
          question: 'Will I learn statistical analysis?',
          answer: 'Yes, the curriculum covers descriptive statistics, inferential statistics, probability distributions, hypothesis testing, confidence intervals, and regression analysis.'
        },
        {
          question: 'Can data analytics help businesses improve performance?',
          answer: 'Absolutely. Data analytics helps businesses identify trends, optimize operations, improve customer experiences, reduce costs, and make data-driven decisions.'
        },
        {
          question: 'What industries use data analytics?',
          answer: 'Data analytics is widely used in healthcare, finance, retail, e-commerce, marketing, manufacturing, education, logistics, and technology industries.'
        },
        {
          question: 'Will I learn predictive analytics?',
          answer: 'Yes, the program introduces predictive analytics, forecasting techniques, machine learning basics, anomaly detection, and trend analysis.'
        },
        {
          question: 'Can I create interactive dashboards after completing this program?',
          answer: 'Yes, you will learn to build professional interactive dashboards using Power BI, Tableau, Plotly, and other visualization tools to present insights effectively.'
        }
      ]
    },
    'saas-product-development': {
      modules: [
        {
          title: 'SaaS Fundamentals & Strategy',
          topics: [
            'Introduction to SaaS Business Model',
            'SaaS vs Traditional Software',
            'SaaS Market Analysis',
            'Customer Acquisition Strategy',
            'Pricing Models (Freemium, Subscription, Tiered)',
            'SaaS Metrics (MRR, ARR, Churn, LTV, CAC)',
            'Product-Market Fit',
            'Minimum Viable Product (MVP) Development'
          ]
        },
        {
          title: 'SaaS Architecture Design',
          topics: [
            'Multi-Tenant Architecture',
            'Single-Tenant vs Multi-Tenant',
            'Database Design for SaaS',
            'Microservices Architecture',
            'Event-Driven Architecture',
            'API-First Design',
            'Scalability Patterns',
            'High Availability Design'
          ]
        },
        {
          title: 'Frontend Development for SaaS',
          topics: [
            'React for SaaS Applications',
            'Next.js for SEO & Performance',
            'Admin Dashboard Design',
            'User Dashboard Development',
            'Role-Based UI Rendering',
            'Responsive SaaS Interfaces',
            'Component Libraries & Design Systems',
            'State Management (Redux, Context API)'
          ]
        },
        {
          title: 'Backend Development & APIs',
          topics: [
            'Node.js & Python Backend',
            'RESTful API Development',
            'GraphQL Implementation',
            'API Versioning',
            'API Documentation (Swagger/OpenAPI)',
            'Rate Limiting & Throttling',
            'Webhook Implementation',
            'Third-Party Integrations'
          ]
        },
        {
          title: 'Database & Data Management',
          topics: [
            'Database Schema Design for SaaS',
            'PostgreSQL for SaaS',
            'MongoDB for Flexible Data',
            'Database Sharding',
            'Caching Strategies (Redis)',
            'Data Migration',
            'Backup & Recovery',
            'Data Privacy & GDPR Compliance'
          ]
        },
        {
          title: 'Authentication & Authorization',
          topics: [
            'User Authentication (JWT, OAuth, SSO)',
            'Multi-Factor Authentication (MFA)',
            'Role-Based Access Control (RBAC)',
            'Permission Management',
            'Organization/Team Management',
            'User Invitations & Onboarding',
            'Session Management',
            'Security Best Practices'
          ]
        },
        {
          title: 'Subscription & Billing Systems',
          topics: [
            'Stripe Integration',
            'PayPal Integration',
            'Razorpay Integration',
            'Subscription Management',
            'Recurring Payments',
            'Invoice Generation',
            'Payment Failure Handling',
            'Dunning Management',
            'Trial Management',
            'Coupon & Discount Codes'
          ]
        },
        {
          title: 'SaaS Analytics & Insights',
          topics: [
            'User Analytics Implementation',
            'Product Usage Tracking',
            'User Engagement Metrics',
            'Funnel Analysis',
            'Retention Metrics',
            'Churn Prediction',
            'A/B Testing for SaaS',
            'Google Analytics & Mixpanel'
          ]
        },
        {
          title: 'DevOps & Cloud Deployment',
          topics: [
            'AWS/Azure/GCP Deployment',
            'Docker Containerization',
            'Kubernetes Orchestration',
            'CI/CD Pipeline Setup',
            'Environment Management (Dev/Staging/Prod)',
            'Monitoring & Alerting',
            'Logging & Error Tracking',
            'Auto-Scaling & Load Balancing'
          ]
        },
        {
          title: 'SaaS Operations & Growth',
          topics: [
            'Customer Success Management',
            'Support Systems (Zendesk, Intercom)',
            'Feature Flagging & Rollouts',
            'User Feedback Loops',
            'Product Roadmap Planning',
            'SaaS Marketing Fundamentals',
            'Customer Onboarding Optimization',
            'Growth Hacking for SaaS'
          ]
        },
        {
          title: 'SaaS Projects',
          topics: [
            'Project Management Tool',
            'CRM SaaS Platform',
            'E-Learning SaaS Platform',
            'Healthcare SaaS Application',
            'Fintech SaaS Platform',
            'End-to-End SaaS Capstone Project'
          ]
        }
      ],
      faqs: [
        {
          question: 'What makes a successful SaaS product?',
          answer: 'Successful SaaS products have clear value proposition, excellent user experience, scalable architecture, reliable payment systems, and strong customer success strategies. We cover all these aspects in our development process.'
        },
        {
          question: 'How do you handle multi-tenancy?',
          answer: 'We implement multi-tenancy using database-per-tenant or schema-per-tenant approaches with proper isolation and security. Each tenant\'s data is securely separated while sharing the same application code.'
        },
        {
          question: 'What is SaaS product development?',
          answer: 'SaaS product development involves creating cloud-based software applications that users access through a web browser on a subscription basis, without requiring local installation.'
        },
        {
          question: 'How long does it take to build a SaaS application?',
          answer: 'Development timelines vary based on complexity. A basic MVP may take 2-4 months, while enterprise-grade SaaS platforms with advanced integrations can take 6-12 months or more.'
        },
        {
          question: 'Can you build a SaaS MVP for startups?',
          answer: 'Yes, we specialize in developing Minimum Viable Products (MVPs) that help startups validate their ideas, attract users, and secure investor funding quickly.'
        },
        {
          question: 'Which technologies do you use for SaaS development?',
          answer: 'We use modern technologies including React, Next.js, Node.js, Python, PostgreSQL, MongoDB, Redis, Docker, Kubernetes, AWS, Azure, and Google Cloud.'
        },
        {
          question: 'Do you provide subscription and billing integrations?',
          answer: 'Yes, we integrate Stripe, PayPal, Razorpay, recurring billing systems, invoice generation, coupon management, and subscription lifecycle management.'
        },
        {
          question: 'How do you ensure SaaS platform security?',
          answer: 'We implement secure authentication, role-based access control, multi-factor authentication, encryption, audit logging, compliance standards, and regular security assessments.'
        },
        {
          question: 'Can the SaaS platform scale as my business grows?',
          answer: 'Absolutely. We design scalable cloud architectures with load balancing, auto-scaling, caching, database optimization, and microservices to support future growth.'
        },
        {
          question: 'Do you offer cloud deployment services?',
          answer: 'Yes, we deploy SaaS applications on AWS, Microsoft Azure, and Google Cloud Platform using modern DevOps and CI/CD practices.'
        },
        {
          question: 'Can you integrate third-party APIs into my SaaS product?',
          answer: 'Yes, we integrate payment gateways, CRM systems, analytics tools, communication platforms, AI services, and other third-party APIs based on business requirements.'
        },
        {
          question: 'What analytics features can be included in a SaaS product?',
          answer: 'We can implement user analytics, product usage tracking, retention analysis, churn monitoring, funnel analysis, A/B testing, and custom business intelligence dashboards.'
        },
        {
          question: 'Do you provide post-launch maintenance and support?',
          answer: 'Yes, we offer ongoing maintenance, bug fixes, feature enhancements, monitoring, performance optimization, and infrastructure support after launch.'
        },
        {
          question: 'Can you migrate my existing software to a SaaS platform?',
          answer: 'Yes, we provide migration services to transform traditional desktop or web applications into scalable cloud-based SaaS solutions.'
        },
        {
          question: 'What types of SaaS products can you develop?',
          answer: 'We build CRM platforms, HR systems, project management tools, healthcare applications, fintech platforms, e-learning systems, analytics dashboards, and custom SaaS products.'
        }
      ]
    },
    'ui-ux-design': {
      modules: [
        {
          title: 'UI/UX Design Fundamentals',
          topics: [
            'Introduction to UI/UX Design',
            'UI vs UX - Key Differences',
            'Design Thinking Process',
            'Human-Centered Design',
            'User Psychology Basics',
            'Design Principles (Gestalt, Fitts, Hick)',
            'UX Design Process Overview',
            'Design Ethics & Accessibility'
          ]
        },
        {
          title: 'User Research & Discovery',
          topics: [
            'User Research Methods',
            'User Interviews & Surveys',
            'Competitive Analysis',
            'User Personas Development',
            'Empathy Mapping',
            'User Journey Mapping',
            'Experience Mapping',
            'Stakeholder Interviews'
          ]
        },
        {
          title: 'Information Architecture',
          topics: [
            'Information Architecture Principles',
            'Content Inventory & Audit',
            'Card Sorting',
            'Sitemaps & Navigation Design',
            'User Flow Diagrams',
            'Task Analysis',
            'Content Strategy',
            'Taxonomy & Labeling'
          ]
        },
        {
          title: 'Wireframing & Prototyping',
          topics: [
            'Wireframing Fundamentals',
            'Low-Fidelity Wireframes',
            'High-Fidelity Wireframes',
            'Paper Prototyping',
            'Interactive Prototyping',
            'Figma Prototyping',
            'Adobe XD Prototyping',
            'Prototype Testing & Iteration'
          ]
        },
        {
          title: 'Visual Design Principles',
          topics: [
            'Color Theory & Psychology',
            'Typography Principles',
            'Layout & Composition',
            'Visual Hierarchy',
            'Iconography Design',
            'Imagery & Graphics',
            'Design Systems Basics',
            'Material Design Principles'
          ]
        },
        {
          title: 'UI Design Tools',
          topics: [
            'Figma Advanced',
            'Adobe XD Advanced',
            'Sketch Advanced',
            'Framer',
            'InVision Studio',
            'Component Libraries',
            'Design System Creation',
            'Auto Layout & Constraints'
          ]
        },
        {
          title: 'Interaction Design',
          topics: [
            'Interaction Design Principles',
            'Micro-interactions',
            'Animations & Transitions',
            'Responsive Design',
            'Mobile-First Design',
            'Adaptive Design',
            'Accessibility in Interaction',
            'Gesture-Based Design'
          ]
        },
        {
          title: 'Usability Testing & Evaluation',
          topics: [
            'Usability Testing Methods',
            'Moderated vs Unmoderated Testing',
            'A/B Testing',
            'Heatmaps & Analytics',
            'User Feedback Analysis',
            'Heuristic Evaluation',
            'Cognitive Walkthrough',
            'Accessibility Testing (WCAG)'
          ]
        },
        {
          title: 'UX Strategy & Product Design',
          topics: [
            'Product Strategy Development',
            'Business Model Integration',
            'UX Metrics & KPIs',
            'Conversion Rate Optimization',
            'User Retention Strategies',
            'Product Roadmap Creation',
            'Agile UX & Scrum',
            'Design Sprints'
          ]
        },
        {
          title: 'Portfolio & Professional Practice',
          topics: [
            'Case Study Development',
            'UX Portfolio Design',
            'Client Presentation Skills',
            'Design Documentation',
            'Style Guides',
            'Handoff to Developers',
            'Design QA',
            'Industry Best Practices'
          ]
        },
        {
          title: 'UI/UX Projects',
          topics: [
            'Mobile App Design',
            'SaaS Dashboard Design',
            'E-Commerce Website Redesign',
            'Healthcare App Design',
            'Fintech Application Design',
            'Social Media Platform Design',
            'End-to-End UI/UX Capstone Project'
          ]
        }
      ],
      faqs: [
        {
          question: 'What is the difference between UI and UX?',
          answer: 'UI (User Interface) focuses on the visual design and interactive elements of a product, while UX (User Experience) focuses on the overall experience, usability, and user journey. Both are essential for creating successful digital products.'
        },
        {
          question: 'Do I need coding skills for this program?',
          answer: 'No, this program focuses on design principles and tools. While understanding basic HTML/CSS is helpful, it is not required. You will learn industry-standard design and prototyping tools.'
        },
        {
          question: 'What tools will I learn in this program?',
          answer: 'You will gain hands-on experience with Figma, Adobe XD, Sketch, Framer, InVision, and other modern UI/UX design and prototyping tools.'
        },
        {
          question: 'Is UI/UX design a good career choice?',
          answer: 'Yes, UI/UX design is one of the fastest-growing fields in technology, with strong demand across startups, enterprises, SaaS companies, e-commerce platforms, and mobile app development.'
        },
        {
          question: 'Will I learn Figma in depth?',
          answer: 'Yes, Figma is a core part of the curriculum. You will learn wireframing, prototyping, design systems, component libraries, auto layout, collaboration workflows, and developer handoff.'
        },
        {
          question: 'What types of projects will I work on?',
          answer: 'You will design mobile apps, SaaS dashboards, e-commerce platforms, healthcare applications, fintech products, and complete end-to-end UX case studies.'
        },
        {
          question: 'How important is user research in UX design?',
          answer: 'User research is a critical part of UX design. It helps identify user needs, behaviors, pain points, and opportunities, leading to more effective and user-friendly products.'
        },
        {
          question: 'Will I learn responsive and mobile-first design?',
          answer: 'Yes, the program covers responsive design principles, mobile-first design strategies, adaptive layouts, and cross-device user experiences.'
        },
        {
          question: 'What is a design system?',
          answer: 'A design system is a collection of reusable components, guidelines, patterns, and standards that ensure consistency across products and teams.'
        },
        {
          question: 'Do you cover accessibility in UI/UX design?',
          answer: 'Yes, accessibility is a major focus. You will learn WCAG guidelines, inclusive design principles, accessibility testing, and techniques for creating products usable by everyone.'
        },
        {
          question: 'Will I build a professional portfolio?',
          answer: 'Yes, you will create multiple case studies, design projects, and a professional portfolio that can be showcased to potential employers and clients.'
        },
        {
          question: 'How does UX design improve business results?',
          answer: 'Good UX design improves user satisfaction, increases engagement, reduces churn, boosts conversion rates, and helps businesses achieve better customer retention.'
        },
        {
          question: 'Can UI/UX designers work remotely?',
          answer: 'Yes, UI/UX design is one of the most remote-friendly professions. Designers frequently collaborate with global teams using tools such as Figma, Slack, and project management platforms.'
        },
        {
          question: 'What industries hire UI/UX designers?',
          answer: 'UI/UX designers are hired by technology companies, SaaS businesses, e-commerce brands, healthcare organizations, fintech companies, educational platforms, and digital agencies.'
        },
        {
          question: 'What career opportunities are available after learning UI/UX design?',
          answer: 'Career opportunities include UI Designer, UX Designer, Product Designer, Interaction Designer, UX Researcher, Information Architect, Design Consultant, and Design System Specialist.'
        }
      ]
    },
    'digital-marketing': {
      modules: [
        {
          title: 'Digital Marketing Fundamentals',
          topics: [
            'Introduction to Digital Marketing',
            'Digital Marketing Landscape',
            'Consumer Behavior Online',
            'Digital Marketing Strategy',
            'Marketing Funnel & Customer Journey',
            'Digital Marketing Channels',
            'Setting SMART Goals',
            'Budgeting & ROI Basics'
          ]
        },
        {
          title: 'Search Engine Optimization (SEO)',
          topics: [
            'SEO Fundamentals',
            'On-Page SEO',
            'Off-Page SEO',
            'Technical SEO',
            'Keyword Research & Analysis',
            'Content Optimization',
            'Link Building Strategies',
            'SEO Tools (Ahrefs, SEMrush, Google Search Console)',
            'Local SEO',
            'SEO Analytics & Reporting'
          ]
        },
        {
          title: 'Search Engine Marketing (SEM)',
          topics: [
            'Google Ads Fundamentals',
            'Search Campaigns',
            'Display Campaigns',
            'Shopping Campaigns',
            'Video Campaigns',
            'App Campaigns',
            'Keyword Bidding Strategies',
            'Quality Score Optimization',
            'Ad Copywriting',
            'Landing Page Optimization',
            'Google Ads Analytics'
          ]
        },
        {
          title: 'Social Media Marketing',
          topics: [
            'Social Media Strategy',
            'Facebook Marketing',
            'Instagram Marketing',
            'Twitter/X Marketing',
            'LinkedIn Marketing',
            'YouTube Marketing',
            'Social Media Content Creation',
            'Social Media Advertising',
            'Engagement Strategies',
            'Social Media Analytics',
            'Influencer Marketing'
          ]
        },
        {
          title: 'Content Marketing',
          topics: [
            'Content Strategy Development',
            'Blog Writing & Copywriting',
            'Video Content Creation',
            'Infographics & Visual Content',
            'Podcasting',
            'Content Distribution',
            'Content Syndication',
            'Storytelling in Marketing',
            'Content Repurposing',
            'Content Calendar Management'
          ]
        },
        {
          title: 'Email Marketing',
          topics: [
            'Email Marketing Fundamentals',
            'Building Email Lists',
            'Email Campaign Creation',
            'Email Automation',
            'Newsletter Design',
            'Personalization & Segmentation',
            'A/B Testing Emails',
            'Email Deliverability',
            'Email Analytics',
            'Mailchimp & Other Tools'
          ]
        },
        {
          title: 'Web Analytics & Data Analysis',
          topics: [
            'Google Analytics Fundamentals',
            'Setting Up Google Analytics',
            'Tracking Conversions',
            'Behavior Flow Analysis',
            'Audience Analysis',
            'Event Tracking',
            'Data Visualization',
            'Marketing Dashboards',
            'ROI Measurement',
            'Data-Driven Decision Making'
          ]
        },
        {
          title: 'Conversion Rate Optimization (CRO)',
          topics: [
            'CRO Fundamentals',
            'A/B Testing',
            'Multivariate Testing',
            'Landing Page Optimization',
            'Call-to-Action Optimization',
            'User Experience Optimization',
            'Form Optimization',
            'Checkout Optimization',
            'Heatmaps & User Recordings',
            'CRO Tools (Optimizely, VWO)'
          ]
        },
        {
          title: 'Digital Marketing Tools & Technologies',
          topics: [
            'Marketing Automation Tools',
            'HubSpot',
            'Salesforce Marketing Cloud',
            'Hootsuite',
            'Buffer',
            'Canva',
            'Adobe Creative Suite',
            'WordPress for Marketing',
            'CRM Integration',
            'Marketing Stack Strategy'
          ]
        },
        {
          title: 'Advanced Digital Marketing',
          topics: [
            'Influencer Marketing',
            'Affiliate Marketing',
            'Mobile Marketing',
            'Video Marketing',
            'Voice Search Optimization',
            'AI in Marketing',
            'Chatbots & Conversational Marketing',
            'Personalization Marketing',
            'Omnichannel Marketing',
            'Growth Hacking'
          ]
        },
        {
          title: 'Digital Marketing Campaign Management',
          topics: [
            'Campaign Planning',
            'Campaign Execution',
            'Campaign Monitoring',
            'Budget Management',
            'Team Coordination',
            'Vendor Management',
            'Performance Reporting',
            'Campaign Optimization',
            'Crisis Management'
          ]
        },
        {
          title: 'Digital Marketing Projects',
          topics: [
            'SEO Audit & Optimization Project',
            'Google Ads Campaign',
            'Social Media Campaign',
            'Email Marketing Campaign',
            'Content Marketing Strategy',
            'Full Digital Marketing Campaign',
            'End-to-End Digital Marketing Capstone Project'
          ]
        }
      ],
      faqs: [
        {
          question: 'What is the ROI of digital marketing?',
          answer: 'Digital marketing provides measurable ROI through analytics and tracking. On average, businesses see $5-10 return for every $1 invested in digital marketing, but results vary based on strategy, industry, and execution.'
        },
        {
          question: 'How long does it take to see results from SEO?',
          answer: 'SEO typically takes 3-6 months to show significant results. However, you may see initial improvements in rankings and traffic within 4-8 weeks. SEO is a long-term strategy that builds sustainable organic growth.'
        },
        {
          question: 'What platforms should I focus on?',
          answer: 'The choice depends on your target audience and business goals. We help you identify the most effective platforms through audience research and competitor analysis. A multi-channel approach often works best.'
        },
        {
          question: 'What is digital marketing?',
          answer: 'Digital marketing involves promoting products, services, or brands through online channels such as search engines, social media, email, websites, and paid advertising platforms.'
        },
        {
          question: 'Why is digital marketing important for businesses?',
          answer: 'Digital marketing helps businesses reach larger audiences, generate leads, increase brand awareness, improve customer engagement, and drive measurable business growth.'
        },
        {
          question: 'Which digital marketing channels are most effective?',
          answer: 'The most effective channels depend on your goals and audience. Common channels include SEO, Google Ads, social media marketing, email marketing, content marketing, and influencer marketing.'
        },
        {
          question: 'Do I need a website for digital marketing?',
          answer: 'While not mandatory, having a professional website significantly improves your digital marketing efforts by serving as a central hub for lead generation, conversions, and customer engagement.'
        },
        {
          question: 'What is the difference between SEO and SEM?',
          answer: 'SEO focuses on improving organic search rankings, while SEM involves paid advertising such as Google Ads to gain immediate visibility in search engine results.'
        },
        {
          question: 'How does social media marketing help businesses?',
          answer: 'Social media marketing increases brand awareness, improves customer engagement, generates leads, drives website traffic, and helps build strong customer relationships.'
        },
        {
          question: 'What is content marketing?',
          answer: 'Content marketing involves creating and distributing valuable content such as blogs, videos, infographics, and guides to attract, engage, and convert potential customers.'
        },
        {
          question: 'Is email marketing still effective?',
          answer: 'Yes, email marketing remains one of the highest ROI digital marketing channels, helping businesses nurture leads, increase customer retention, and drive repeat sales.'
        },
        {
          question: 'How do you measure digital marketing success?',
          answer: 'Success is measured using key performance indicators such as website traffic, conversion rates, lead generation, click-through rates, customer acquisition cost, and return on investment.'
        },
        {
          question: 'What tools are commonly used in digital marketing?',
          answer: 'Popular tools include Google Analytics, Google Ads, Search Console, SEMrush, Ahrefs, HubSpot, Mailchimp, Canva, Hootsuite, and Meta Business Suite.'
        },
        {
          question: 'Can digital marketing help small businesses?',
          answer: 'Absolutely. Digital marketing provides cost-effective strategies that allow small businesses to compete with larger companies and reach highly targeted audiences.'
        },
        {
          question: 'What industries benefit from digital marketing?',
          answer: 'Almost every industry benefits from digital marketing, including healthcare, education, real estate, e-commerce, finance, hospitality, technology, manufacturing, and professional services.'
        },
        {
          question: 'Do you provide complete digital marketing campaign management?',
          answer: 'Yes, we handle strategy, content creation, SEO, paid advertising, social media management, analytics, optimization, and reporting for end-to-end campaign success.'
        }
      ]
    }
  };

  // Get syllabus for this service or use default
  const syllabus = serviceSyllabus[slug] || {
    modules: [
      { title: 'Module 1: Foundation', topics: ['Core Concepts', 'Best Practices', 'Tools & Technologies'] },
      { title: 'Module 2: Advanced Topics', topics: ['Advanced Implementation', 'Optimization', 'Integration'] },
      { title: 'Module 3: Real-World Application', topics: ['Project Development', 'Testing', 'Deployment'] }
    ],
    faqs: [
      {
        question: 'What is the duration of this program?',
        answer: 'The duration varies by service but typically ranges from 8-16 weeks depending on the specific track and project complexity.'
      },
      {
        question: 'Do you offer customized solutions?',
        answer: 'Yes, we offer fully customized solutions tailored to your specific business requirements, industry, and goals.'
      },
      {
        question: 'What kind of support do you provide?',
        answer: 'We provide comprehensive support including project consultation, implementation, training, and post-launch maintenance.'
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

            {/* Rating Section */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
              flexWrap: 'wrap'
            }}>
              <StarRating rating={service.rating || 4.5} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-3)'
              }}>
                Based on {service.reviews || 0} reviews
              </span>
            </div>

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
                      {service.rating || '4.5'}
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
                      {service.reviews || 0}
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

          {/* Syllabus Section - Full Width */}
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
                  {service.tags.find(t => t.includes('Week')) || 'Flexible'}
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section - Full Width */}
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
              Find answers to common questions about our {service.title.toLowerCase()} service
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

            {/* FAQ Stats */}
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
                  Total FAQs
                </span>
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--accent)'
                }}>
                  {syllabus.faqs ? syllabus.faqs.length : 0}
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
                  Categories
                </span>
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--text)'
                }}>
                  Process & Implementation
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
                  Support
                </span>
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--text)'
                }}>
                  24/7 Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}