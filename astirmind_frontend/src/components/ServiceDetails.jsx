import { useParams } from 'react-router-dom';
import { agencyServices } from './Services';
import { Helmet } from 'react-helmet';

export default function ServiceDetails() {
  const { slug } = useParams();
  const service = agencyServices.find(item => item.slug === slug);

  if (!service) {
    return (
      <div style={{ padding: '6rem 2rem', minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
        <div className="container">
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Service Not Found</h1>
          <p style={{ color: 'var(--text-2)' }}>The service you're looking for doesn't exist or has been moved.</p>
        </div>
      </div>
    );
  }

  const Icon = service.Icon;

  return (
    <>
      <Helmet>
        <title>Service | AstirMind Software Solutions</title>
        <meta name="description" content={service.desc} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`Service| AstirMind Software Solutions`} />
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
              SERVICE
            </span>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              marginTop: '1rem',
              marginBottom: '1.5rem',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '-0.03em'
            }}>
              Service
            </h1>

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

          {/* Content */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem'
          }}>
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
            </div>

            <div>
              <h2 style={{ marginBottom: '1rem', fontFamily: 'var(--font-sans)' }}>
                Technologies
              </h2>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap'
              }}>
                {service.tags.map((tag, index) => (
                  <span key={index} className="badge-raw">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}