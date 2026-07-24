import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Blocks, GraduationCap } from 'lucide-react';
import { useMode } from '../context/ModeContext';
import { OrganizationSchema, LocalBusinessSchema } from './Schema';
import { Helmet } from 'react-helmet'; 
gsap.registerPlugin(ScrollTrigger);

const MARQUEE = ['React', 'Python', 'TensorFlow', 'Node.js', 'AWS', 'Android', 'Angular', 'FastAPI', 'PostgreSQL', 'Docker', 'Next.js', 'Kubernetes', 'MongoDB'];

// Calculate years of experience dynamically
const getYearsExperience = () => {
  const startYear = 2016; // Company founding year
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
};

// Get stats with dynamic years
const getStats = (type) => {
  const baseStats = {
    Xperience: [
      { v: 200, suffix: '+', l: 'Projects Shipped' },
      { v: getYearsExperience(), suffix: '', l: 'Years Experience' },
      { v: 100, suffix: '%', l: 'Independent' }
    ],
    Training: [
      { v: 200, suffix: '+', l: 'Students Trained' },
      { v: 9, suffix: '', l: 'Active Programs' },
      { v: 80, suffix: '%', l: 'Placement Rate' }
    ]
  };
  return baseStats[type];
};

const ABOUT = {
  Xperience: {
    headline: 'Software crafted with care. We partner with you to solve real human problems.',
    body: `Welcome to AstirMind Software Solutions. We are a premier, technology-driven development agency dedicated to delivering smart, scalable, and business-oriented digital solutions. In today's fast-paced digital landscape, we bridge the gap between complex operational challenges and cutting-edge engineering.

We specialize in custom software development, advanced automation systems, AI-powered platforms, and web applications. From intelligent data processing and scraping systems to OCR solutions and CRM automation, we build cloud-based architecture designed to solve real-world problems. Our goal is simple: to help companies streamline their operations, maximize productivity, and build a highly reliable digital infrastructure.

At AstirMind, we believe in building technology that is not just technically robust, but perfectly aligned with your business objectives. By combining innovation with performance, scalability, and long-term maintainability, we ensure every product we develop delivers measurable value. Whether you are a startup looking to launch your first product, or an enterprise aiming to optimize workflows, AstirMind Software Solutions is your trusted technology partner to scale with confidence.`,
    stats: getStats('Xperience'),
  },
  Training: {
    headline: 'We train engineers on real projects, with real mentors, to build real careers.',
    body: `Welcome to the AstirMind Software Solutions Training and Internship Hub. We believe that the best way to master modern technology is by building it in the real world. Beyond being a technology-driven development agency, AstirMind is a launchpad for the next generation of tech talent.

Our training and internship programs are carefully designed to bridge the gap between academic learning and actual industry demands. Because our core agency specializes in custom software development, AI integrations, CRM automation, and cloud-based applications, our interns don't just learn theory—they get hands-on experience in a live, professional environment.

During your time with us, you will work with modern technologies and practical engineering solutions, learning how to streamline operations, process data, and build scalable digital products. We teach you how to write code that is technically strong, highly performant, and aligned with real business objectives.

With a strong focus on quality, communication, and execution, AstirMind is here to mentor you, transform your ideas into practical skills, and kickstart your career in the tech industry with confidence.`,
    stats: getStats('Training'),
  },
};

function StatCounter({ stat, index }) {
  const numRef = useRef(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: stat.v, duration: 2, ease: 'power2.out', delay: index * 0.2,
      onUpdate() { el.textContent = Math.round(obj.val) + stat.suffix; },
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  }, [stat, index]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '1rem 0', borderBottom: '1px solid var(--line)' }}>
      <span className="t-mono" style={{ fontSize: '0.6875rem', color: 'var(--text-3)' }}>{stat.l}</span>
      <span ref={numRef} style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.25rem, 2.5vw, 2rem)', fontWeight: 700, color: 'var(--accent)', letterSpacing: '-0.02em' }}>0</span>
    </div>
  );
}

export default function About({ isPage = false }) {
  const { mode } = useMode();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        opacity: 0, y: 30, duration: 0.65, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [mode]);

  const c = ABOUT[mode];

  return (
    <>
    {isPage && (
      <Helmet>
        <title>About | AstirMind Software Solutions</title>
        <meta
          name="description"
          content="Learn about AstirMind Software Solutions, our custom software development, AI solutions, and IT training programs in Ludhiana."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="About | AstirMind Software Solutions" />
        <meta property="og:description" content="Learn about AstirMind Software Solutions, our custom software development, AI solutions, and IT training programs." />
        <meta property="og:type" content="website" />
      </Helmet>
        )}
      <OrganizationSchema />
      <LocalBusinessSchema />
    <section ref={sectionRef} id="about" style={{ background: 'var(--bg)', borderBottom: '1px solid var(--line)' }}>

      {/* Marquee */}
      <div className="marquee-raw">
        {[...MARQUEE, ...MARQUEE].map((item, i) => (
          <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginRight: '3rem', flexShrink: 0 }}>{item}</span>
        ))}
      </div>

      <div className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className="grid-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '3rem', alignItems: 'start' }}>

          {/* Left */}
          <div className="about-reveal" style={{ gridColumn: '1 / 7' }}>
            <span className="section-label">About</span>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.2, color: 'var(--text)' }}>
              {c.headline}
            </h2>
            <div style={{ marginTop: '1.5rem', border: '1px solid var(--line)', boxShadow: 'var(--shadow-soft)', overflow: 'hidden' }}>
              <div style={{ position: 'relative', minHeight: 290 }}>
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=90"
                  alt="Team collaboration"
                  style={{ width: '100%', height: 290, objectFit: 'cover', display: 'block', filter: 'grayscale(0%) contrast(1.05) brightness(0.88)' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(6,5,3,0.05) 0%, rgba(6,5,3,0.55) 100%)' }} />
                {/* orange accent slash */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: 'var(--accent)' }} />
                <div style={{ position: 'absolute', left: 20, right: 16, bottom: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {[
                    { l: 'Internships', I: GraduationCap },
                    { l: 'Engineering Foundation', I: Blocks },
                  ].map((item) => {
                    const Icon = item.I;
                    return (
                      <div key={item.l} style={{ border: '1px solid rgba(255,255,255,0.22)', background: 'rgba(6,5,3,0.68)', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, backdropFilter: 'blur(4px)' }}>
                        <Icon size={17} strokeWidth={1.7} color="var(--accent)" />
                        <span className="t-mono" style={{ fontSize: '0.5625rem', color: 'var(--text)' }}>{item.l}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* second image — smaller, offset */}
            <div style={{ marginTop: '0.75rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div style={{ border: '1px solid var(--line)', overflow: 'hidden', height: 120 }}>
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=85"
                  alt="Coding session"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0%) brightness(0.82) contrast(1.1)' }}
                />
              </div>
              <div style={{ border: '1px solid var(--line)', overflow: 'hidden', height: 120, background: 'var(--bg-elevated)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Est. 2016</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>Built in India.<br/>Used worldwide.</div>
                <div style={{ marginTop: 8, width: 32, height: 2, background: 'var(--accent)' }} />
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="about-reveal" style={{ gridColumn: '8 / 13', paddingLeft: '2rem', borderLeft: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <p
              className="t-body-lg"
              style={{
                fontSize: '1rem',
                whiteSpace: 'pre-line'
              }}
            >
              {c.body}
            </p>
            <div>
              {c.stats.map((stat, i) => <StatCounter key={i} stat={stat} index={i} />)}
            </div>
          </div>

        </div>
      </div>
    </section>
    </>
  );
}