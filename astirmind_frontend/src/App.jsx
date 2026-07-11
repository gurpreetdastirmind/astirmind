import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogPage from './components/BlogPage';
import ProgramsPage from './components/CoursesPage';
import HiringPage from './components/HiringPage';
import QuotePage from './components/QuotePage';
import VerifyPage from './components/VerifyPage';
import AboutPage from './components/AboutPage';
import BlogDetailPage from './components/BlogDetailPage';
import DashboardPage from './components/DashboardPage';
import ModeToggle from './components/ModeToggle';
import PageSwoosh from './components/PageSwoosh';
import Cursor from './components/Cursor';
import { ModeProvider } from './context/ModeContext';
import ServiceDetails from './components/ServiceDetails';
import CousesDetails from './components/CoursesDetails';

const INNER_PAGES = ['/blog', '/courses', '/hiring', '/quote', '/verify', '/about', '/services'];
const DASH_PAGES = ['/dash'];

const WHATSAPP_NUMBER = '919815674608';

function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 99999,
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 24px rgba(37,211,102,0.45)',
        textDecoration: 'none',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 6px 30px rgba(37,211,102,0.6)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(37,211,102,0.45)';
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </a>
  );
}

// ServicesPage component that renders just the Services section
function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Our Services | AstirMind Software Solutions</title>
        <meta
          name="description"
          content="Explore our comprehensive range of services including ML & AI, Automation, Web Development, and more."
        />
      </Helmet>
      <Services />
    </>
  );
}

function HomePage() {
  return (
    <>
      <Helmet>
        <title>AstirMind Software Solutions</title>
        <meta
          name="description"
          content="AstirMind Software Solutions provides web development, software development, mobile app development, UI/UX design, and digital solutions for businesses."
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="AstirMind Software Solutions | Web & Software Development"
        />
        <meta
          property="og:description"
          content="AstirMind Software Solutions provides web development, software development, mobile app development, UI/UX design, and digital solutions for businesses."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <Contact />
    </>
  );
}

function AppShell() {
  const location = useLocation();
  const isInnerPage = INNER_PAGES.some(p => location.pathname.startsWith(p));
  const isDash = DASH_PAGES.some(p => location.pathname.startsWith(p));

  useEffect(() => {
    // Handle hash scrolling (for #services, #contact, etc.)
    if (location.hash) {
      const timer = setTimeout(() => {
        const targetId = location.hash.slice(1);
        const el = document.getElementById(targetId);
        if (el) {
          const navbarHeight = 68;
          const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          window.scrollTo(0, 0);
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      // For all other routes, scroll to top
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (isDash) {
      document.body.classList.remove('with-custom-cursor');
      document.body.classList.add('no-custom-cursor');
      return;
    }

    document.body.classList.remove('no-custom-cursor');
    document.body.classList.add('with-custom-cursor');
  }, [isDash]);

  // Dashboard renders without Navbar / Footer, uses normal cursor
  if (isDash) {
    return (
      <Routes location={location}>
        <Route path="/dash/*" element={<DashboardPage />} />
      </Routes>
    );
  }

  const transition = isInnerPage
    ? {
      initial: { opacity: 0, clipPath: 'inset(0 0 6% 0)' },
      animate: { opacity: 1, clipPath: 'inset(0 0 0 0)' },
      exit: { opacity: 0, y: 10 },
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    }
    : {
      initial: { opacity: 0, y: 18 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -12 },
      transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] },
    };

  return (
    <>
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={transition.initial}
          animate={transition.animate}
          exit={transition.exit}
          transition={transition.transition}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/courses" element={<ProgramsPage />} />
            <Route path="/hiring" element={<HiringPage />} />
            <Route path="/quote" element={<QuotePage />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/services/:slug" element={<ServiceDetails />} />
            <Route path="/courses/:slug" element={<CousesDetails />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      
      <WhatsAppFloat />
      <Footer />
      {!isInnerPage && <ModeToggle />}
      {!isInnerPage && <PageSwoosh />}
      <Cursor />
    </>
  );
}

export default function App() {
  return (
    <ModeProvider>
      <AppShell />
    </ModeProvider>
  );
}