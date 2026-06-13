import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE } from '../config/api';
import {
  Brain,
  Globe,
  Database,
  Eye,
  Smartphone,
  Cpu,
  TerminalSquare,
  PenTool,
  ArrowUpRight,
  Loader2,
  AlertCircle
} from 'lucide-react';

const ICON_MAP = {
  Brain,
  Globe,
  Database,
  Eye,
  Smartphone,
  Cpu,
  TerminalSquare,
  PenTool,
};

function getIcon(name) {
  return ICON_MAP[name] || Brain;
}

export default function ProgramDetails() {

  const { slug } = useParams();

  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    fetch(`${API_BASE}/programs/`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to load program');
        }

        return res.json();
      })
      .then(data => {

        const found = data.find(
          p => p.slug === slug
        );

        setProgram(found);
        setLoading(false);

      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });

  }, [slug]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10
        }}
      >
        <Loader2
          size={20}
          style={{
            animation: 'spin 1s linear infinite'
          }}
        />
        Loading Program...
      </div>
    );
  }

  if (error || !program) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10
        }}
      >
        <AlertCircle size={20} />
        Program Not Found
      </div>
    );
  }

  const Icon = getIcon(program.icon_name);

  return (
    <section
      style={{
        background: 'var(--bg)',
        minHeight: '100vh',
        paddingTop: 68,
        color: 'var(--text)'
      }}
    >

      {/* HERO */}
      <div
        style={{
          borderBottom: '1px solid var(--line)',
          padding: '5rem 0'
        }}
      >

        <div className="container">

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: '1rem'
            }}
          >
            <Icon
              size={30}
              strokeWidth={1.5}
              color="var(--accent)"
            />

            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.08em',
                color: 'var(--accent)'
              }}
            >
              PROGRAM
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1,
              marginBottom: '1.5rem'
            }}
          >
            {program.title}
          </h1>

          <p
            style={{
              maxWidth: 760,
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: 'var(--text-2)',
              marginBottom: '2rem'
            }}
          >
            {program.overview}
          </p>

          {/* TAGS */}
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap'
            }}
          >

            <span className="badge-raw">
              {program.duration}
            </span>

            <span className="badge-raw">
              {program.format}
            </span>

            {program.has_certificate && (
              <span className="badge-raw">
                Certificate
              </span>
            )}

            {program.has_internship && (
              <span className="badge-raw">
                Internship
              </span>
            )}

          </div>

        </div>
      </div>

      {/* BODY */}
      <div
        className="container"
        style={{
          padding: '5rem 0'
        }}
      >

        {/* CURRICULUM */}
        <div
          style={{
            marginBottom: '5rem'
          }}
        >

          <h2
            style={{
              marginBottom: '2rem'
            }}
          >
            Curriculum
          </h2>

          <div
            style={{
              border: '1px solid var(--line)'
            }}
          >

            {program.modules.map((mod, i) => (

              <div
                key={i}
                style={{
                  padding: '1.5rem',
                  borderBottom:
                    i < program.modules.length - 1
                      ? '1px solid var(--line)'
                      : 'none'
                }}
              >

                <h3
                  style={{
                    marginBottom: '1rem',
                    fontSize: '1.1rem'
                  }}
                >
                  {mod.title}
                </h3>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns:
                      'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
                    gap: '0.75rem'
                  }}
                >

                  {mod.topics.map((topic, j) => (
                    <div
                      key={j}
                      style={{
                        color: 'var(--text-2)',
                        lineHeight: 1.6
                      }}
                    >
                      • {topic}
                    </div>
                  ))}

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* TOOLS */}
        <div
          style={{
            marginBottom: '5rem'
          }}
        >

          <h2
            style={{
              marginBottom: '2rem'
            }}
          >
            Tools & Technologies
          </h2>

          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap'
            }}
          >

            {program.tools.map((tool, i) => (
              <span
                key={i}
                className="badge-raw"
              >
                {tool}
              </span>
            ))}

          </div>

        </div>

        {/* CTA */}
        <div
          style={{
            borderTop: '1px solid var(--line)',
            paddingTop: '3rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >

<div>

  <h3
    style={{
      marginBottom: '0.5rem'
    }}
  >
    Request Full Curriculum
  </h3>

  <p
    style={{
      color: 'var(--text-2)',
      maxWidth: 520,
      lineHeight: 1.7
    }}
  >
    Get the complete syllabus, project roadmap,
    internship details, tools covered, and career guidance
    directly on WhatsApp.
  </p>

</div>

<a
  href={`https://wa.me/919815674608?text=${encodeURIComponent(
    `Hi AstirMind, please share the full curriculum and details for ${program.title}`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="btn-solid"
  style={{
    padding: '0.85rem 1.75rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8
  }}
>
  Request Curriculum
  <ArrowUpRight size={16} />
</a>

        </div>

      </div>

    </section>
  );
}