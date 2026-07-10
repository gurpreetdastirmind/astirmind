import { useParams } from 'react-router-dom';
import { agencyServices } from './Services';
import { Helmet } from 'react-helmet';
import { Star } from 'lucide-react';

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

export default function ServiceDetails() {
  const { slug } = useParams();
  const service = agencyServices.find(item => item.slug === slug);

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
        </div>
      </section>
    </>
  );
}