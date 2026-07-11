import { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { API_BASE as API } from '../config/api';
import {
  ArrowLeft, Clock, Calendar, Share2, ExternalLink, Link2,
  MessageSquare, Send, ArrowUpRight, ThumbsUp, Check,
} from 'lucide-react';
import { Helmet } from 'react-helmet';

gsap.registerPlugin(ScrollTrigger);

async function fetchPost(id) {
  try {
    const res = await fetch(`${API}/blog/${id}/`, { credentials: 'include' });
    if (!res.ok) return null;
    const p = await res.json();
    return {
      id: String(p.id),
      slug: String(p.id),
      category: p.category || 'Engineering',
      title: p.title,
      subtitle: p.subtitle || '',
      date: p.published_at ? new Date(p.published_at).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : 'Apr 2026',
      read: p.read_time || '5 min',
      featured: p.is_featured || false,
      image: p.image_src || p.image_url || '',
      body: p.body || '',
    };
  } catch {
    return null;
  }
}

async function fetchAllPosts() {
  try {
    const res = await fetch(`${API}/blog/`, { credentials: 'include' });
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data.map(p => ({
      id: String(p.id),
      slug: String(p.id),
      category: p.category || 'Engineering',
      title: p.title,
      subtitle: p.subtitle || '',
      date: p.published_at ? new Date(p.published_at).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : 'Apr 2026',
      read: p.read_time || '5 min',
      featured: p.is_featured || false,
      image: p.image_src || p.image_url || '',
      body: p.body || '',
    }));
  } catch {
    return [];
  }
}

function getCSRFToken() {
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? match[1] : '';
}

function normalizeComment(c) {
  const dateSource = c.created_at || c.date;
  const displayDate = dateSource
    ? new Date(dateSource).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return {
    id: c.id,
    author: c.author_name || c.author || 'Anonymous',
    date: displayDate,
    text: c.content || c.text || '',
  };
}

async function fetchComments(postId) {
  try {
    const res = await fetch(`${API}/blog/${postId}/comments/`, { credentials: 'include' });
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data.map(normalizeComment);
  } catch {
    return null;
  }
}

async function submitComment(postId, payload) {
  const res = await fetch(`${API}/blog/${postId}/comments/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCSRFToken(),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Could not post comment' }));
    throw new Error(err.error || JSON.stringify(err));
  }
  const data = await res.json();
  return normalizeComment(data);
}

/* ─── Extended Blog Posts ─── */
export const POSTS = [
  // Original posts
  {
    id: '01',
    slug: '01',
    category: 'Engineering',
    title: 'Linear Algebra for Machine Learning',
    subtitle: 'The exact matrix operations that show up inside real model pipelines — not the textbook versions.',
    date: 'Apr 2026',
    read: '8 min',
    featured: true,
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1800&q=85',
    body: `...` // (keep your existing body content)
  },
  {
    id: '02',
    slug: '02',
    category: 'Training',
    title: 'From Training to Internship Readiness',
    subtitle: 'What to build before applying and how to present it so hiring managers actually stop scrolling.',
    date: 'Apr 2026',
    read: '6 min',
    featured: false,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    body: `...` // (keep your existing body content)
  },
  {
    id: '03',
    slug: '03',
    category: 'Engineering',
    title: 'Designing APIs Teams Can Maintain',
    subtitle: 'Patterns that survive handovers, scale, and the inevitable six-month junior-dev onboarding.',
    date: 'Mar 2026',
    read: '7 min',
    featured: false,
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=80',
    body: `...` // (keep your existing body content)
  },
  {
    id: '04',
    slug: '04',
    category: 'Training',
    title: 'Project Reviews That Actually Improve Work',
    subtitle: 'Simple review loops we use at the institute to close the gap between code written and code shipped.',
    date: 'Mar 2026',
    read: '5 min',
    featured: false,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    body: `...` // (keep your existing body content)
  },
  {
    id: '05',
    slug: '05',
    category: 'Internship',
    title: 'How We Mentor New Engineers',
    subtitle: 'A practical framework we have refined over eight years of running technical internships.',
    date: 'Feb 2026',
    read: '6 min',
    featured: false,
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    body: `...` // (keep your existing body content)
  },
  {
    id: '06',
    slug: '06',
    category: 'Internship',
    title: 'Building Portfolio Projects with Signal',
    subtitle: 'How to make your work stand out in technical interviews when everyone has the same course certificates.',
    date: 'Feb 2026',
    read: '4 min',
    featured: false,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    body: `...` // (keep your existing body content)
  },

  // NEW BLOG POSTS
  {
    id: '07',
    slug: '07',
    category: 'AI/ML',
    title: 'Building Production-Ready RAG Systems',
    subtitle: 'From simple retrieval to advanced pipelines with memory, routing, and evaluation.',
    date: 'Mar 2026',
    read: '10 min',
    featured: false,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    body: `## Introduction to RAG

Retrieval-Augmented Generation (RAG) has become the standard approach for building LLM applications that need access to external knowledge. The basic idea is simple: retrieve relevant documents from a knowledge base and use them as context for the LLM. But production RAG is much more complex.

## The Simple RAG Problem

A simple RAG pipeline looks like this:

1. User asks a question
2. Embed the question
3. Retrieve top-k documents from a vector database
4. Feed documents + question to LLM
5. Return response

This works for demos. It fails in production for several reasons:
- The retrieved documents often contain irrelevant information
- The LLM might ignore the documents entirely
- There's no way to handle ambiguous or multi-step questions

## Building Advanced RAG

At AstirMind, we build RAG systems that include:

**Hybrid Search**: Combine semantic search (vector) with keyword search (BM25) to improve retrieval quality.

**Re-ranking**: After retrieving candidates, use a cross-encoder to re-rank documents based on relevance to the question.

**Query Understanding**: Use the LLM to understand the user's intent and possibly reformulate the question before retrieval.

**Memory**: Store conversation history and use it to contextualize follow-up questions.

## Evaluation is Key

You cannot improve what you cannot measure. We build evaluation pipelines that test:

- **Retrieval Precision**: Are the retrieved documents relevant?
- **Generation Accuracy**: Does the response correctly answer the question?
- **Latency**: How fast is the end-to-end pipeline?

## Tools We Use

- **Vector Databases**: Pinecone, Weaviate, or PostgreSQL with pgvector
- **Embedding Models**: OpenAI ada-002, Cohere, or open-source models
- **LLMs**: GPT-4, Claude, or Llama 2
- **Orchestration**: LangChain, LlamaIndex, or custom pipelines

## When to Avoid RAG

RAG is not always the right solution. If your data fits in the context window and updates rarely, fine-tuning might be more appropriate. If your queries are simple lookups, a traditional search engine might be better.

The decision to use RAG should be driven by your specific use case, not by hype.

## What's Next

In our next post, we'll cover evaluating RAG systems in detail — with metrics, benchmarks, and real examples from our production pipelines.`
  },
  {
    id: '08',
    slug: '08',
    category: 'Web Development',
    title: 'Modern Authentication Patterns in 2026',
    subtitle: 'JWT, sessions, OAuth 2.1, and why your auth strategy needs to evolve.',
    date: 'Mar 2026',
    read: '9 min',
    featured: false,
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80',
    body: `## Authentication Has Changed

Authentication in 2026 looks very different from what it looked like five years ago. The threats have evolved, the standards have improved, and the expectations are higher.

## The Current Landscape

**Session-Based Auth** is still valid for traditional server-rendered applications. Redis-backed sessions are fast, reliable, and easy to invalidate.

**JWT** is the default for APIs and SPAs. But JWTs come with risks: they cannot be invalidated easily, and their size can become a problem with many claims.

**OAuth 2.1** simplified the OAuth flows and removed insecure patterns. If you are building a new application, use OAuth 2.1, not OAuth 2.0.

## Best Practices We Use

### 1. Short-lived Tokens

JWTs should have short expiry times (15 minutes). For long-lived sessions, use refresh tokens.

### 2. Token Storage

Store tokens in HTTP-only, secure cookies when possible. This prevents XSS attacks from accessing the token.

### 3. CSRF Protection

Even with JWTs, you need CSRF protection for state-changing requests. Use CSRF tokens or the SameSite cookie attribute.

### 4. Rate Limiting

Protect your auth endpoints with rate limiting. This prevents brute force attacks and credential stuffing.

### 5. Logging and Monitoring

Log authentication events and monitor for unusual patterns. Failed login attempts from multiple IPs, login attempts at unusual times — these are signals.

## The Future of Auth

**Passkeys** are becoming mainstream. They are more secure than passwords and more convenient for users.

**Decentralized Identity** is still early but promising. The idea that users control their own identity data is compelling.

## Recommended Stack

We typically use:
- **Authentication**: Auth0 or a custom JWT-based system
- **Database**: PostgreSQL or MongoDB
- **Session Store**: Redis
- **Rate Limiting**: Redis + a middleware
- **Security**: Helmet.js, CORS, CSRF protection

## Common Mistakes

1. Storing JWTs in localStorage
2. Not validating the JWT signature
3. Not handling token expiration
4. Using weak password hashing algorithms
5. Not implementing 2FA where required

Avoid these, and your authentication system will be solid.`
  },
  {
    id: '09',
    slug: '09',
    category: 'AI/ML',
    title: 'Deploying ML Models: From Notebook to Production',
    subtitle: 'The infrastructure, tools, and patterns that make ML models actually usable in production.',
    date: 'Feb 2026',
    read: '11 min',
    featured: false,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    body: `## The Gap Between Research and Production

Most ML models never make it to production. The gap between a Jupyter notebook and a deployed, monitored, and maintainable system is wide.

This article covers the infrastructure and patterns we use at AstirMind to deploy ML models reliably.

## Deployment Options

### 1. Model Serving APIs

The simplest approach: deploy the model as an API endpoint. Tools like FastAPI + PyTorch/TensorFlow work well.

\`\`\`python
from fastapi import FastAPI
import torch

app = FastAPI()
model = load_model()

@app.post("/predict")
def predict(input_data: dict):
    return {"prediction": model.predict(input_data)}
\`\`\`

### 2. Batch Inference

For offline use cases, run predictions in batches. This is cheaper and more reliable but adds latency.

### 3. On-Device Models

For mobile or edge applications, deploy models directly on the device using TensorFlow Lite or ONNX.

## MLOps Pipeline

Our standard ML deployment pipeline:

1. **Versioning**: Track data, code, and models together
2. **Testing**: Unit tests, integration tests, model performance tests
3. **Artifact Storage**: Store trained models with metadata
4. **Deployment**: Blue-green deployments or canary releases
5. **Monitoring**: Track predictions, drift, and system health

## Monitoring Is Not Optional

You must monitor:
- **Data Drift**: Is the input distribution changing?
- **Concept Drift**: Is the relationship between inputs and outputs changing?
- **Performance**: Latency, throughput, error rates
- **Business Metrics**: Are the predictions driving the expected outcomes?

## Cost Considerations

ML models are expensive to run. Consider:
- **Model Size**: Smaller models are cheaper and faster
- **Infrastructure**: Can you use spot instances for training?
- **Optimization**: Quantization, pruning, and distillation reduce costs

## Tools We Use

- **Training**: PyTorch, TensorFlow, scikit-learn
- **Serving**: FastAPI, Flask, or specialized serving tools
- **Orchestration**: Kubernetes, Docker, or serverless
- **Monitoring**: Prometheus, Grafana, or custom solutions

## The Future

The trend is toward smaller, more efficient models that can run on edge devices. **On-device AI** will become the norm for many applications.

The future of ML deployment is not about bigger models — it's about smarter deployment.`
  },
  {
    id: '10',
    slug: '10',
    category: 'Web Development',
    title: 'The State of Web Performance in 2026',
    subtitle: 'Core Web Vitals, the new metrics, and the techniques that actually move the needle.',
    date: 'Jan 2026',
    read: '8 min',
    featured: false,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    body: `## Performance Matters More Than Ever

Users expect pages to load instantly. Every 100ms of delay costs you conversions, user satisfaction, and engagement.

## Core Web Vitals Update

In 2026, the Core Web Vitals have evolved:

- **LCP (Largest Contentful Paint)**: Still important, but now measured with more nuance
- **INP (Interaction to Next Paint)**: Replaced FID as the responsiveness metric
- **CLS (Cumulative Layout Shift)**: Still important, but now measured in a more granular way

## What Actually Improves Performance

### 1. Image Optimization

The biggest win for most sites is image optimization. Use next-gen formats (WebP, AVIF), responsive images, lazy loading, and a CDN.

### 2. JavaScript Size

The amount of JavaScript you ship directly impacts performance. Bundle splitting, tree shaking, and code splitting reduce the initial payload.

### 3. Caching Strategy

A good caching strategy reduces server load and improves client performance. Use CDN caching, service workers, and HTTP caching.

### 4. Third-party Scripts

Third-party scripts are the second largest source of performance issues. Audit them regularly and defer non-critical ones.

## Our Performance Budget

At AstirMind, we set these budgets for all new projects:

- LCP < 2.5s (mobile)
- INP < 200ms
- CLS < 0.1
- Total JS payload < 200KB (initial)
- Total image payload < 1MB (initial)

## Tools We Use

- **Lighthouse**: For auditing
- **WebPageTest**: For advanced testing
- **Core Web Vitals**: For real-user monitoring
- **Sentry**: For error monitoring
- **Datadog**: For overall monitoring

## The Future of Performance

**Edge Computing** is shifting where code runs. More computation will happen at the edge, closer to users.

**AI-Powered Optimization** is emerging, where AI predicts which resources a user will need and preloads them.

## Practical Recommendations

1. Start measuring performance today
2. Set a performance budget
3. Optimize what you can measure
4. Measure again

Performance optimization is not a one-time effort. It's a continuous process of measuring, optimizing, and measuring again.`
  },
  {
    id: '11',
    slug: '11',
    category: 'Training',
    title: 'The Effective Way to Learn New Technologies',
    subtitle: 'A systematic approach to learning that moves you from tutorial hell to real project work.',
    date: 'Jan 2026',
    read: '7 min',
    featured: false,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    body: `## The Problem with Tutorial Hell

Most learners get stuck in tutorial hell. They watch video after video, follow tutorial after tutorial, but never build anything independently.

The solution is a systematic approach to learning that emphasizes project-based learning.

## Our Learning Framework

### Phase 1: The 15-Minute Overview

Don't start with a tutorial. Start with a 15-minute overview of the technology. Understand what problem it solves and what its core concepts are.

### Phase 2: The "Hello World" Tutorial

Now do a single, simple tutorial. Build a "Hello World" and run it. This validates that your environment works.

### Phase 3: The Project

Pick a real project that solves a real problem. It can be small, but it must be something you care about. Use the technology to solve it.

### Phase 4: The Refactor

Once the project works, refactor it. Apply what you've learned. This is where the learning happens.

## The Cognitive Science Behind It

This approach works because it uses spaced repetition, active recall, and project-based learning. Each phase builds on the previous one.

## Common Mistakes

1. **Skipping the overview**: Starting with a tutorial without understanding the big picture
2. **Staying in tutorial mode**: Never moving to independent projects
3. **Building too fast**: Skipping the refactor phase
4. **Not measuring progress**: No way to know if you're improving

## The 80/20 Rule

80% of the value comes from 20% of the concepts. Focus on understanding the core 20%. The rest can be learned on-demand.

## Our Interns' Experience

In our internship program, we use this framework. Interns learn faster, build better, and retain more. They leave with real projects in their portfolio.

## Practical Advice

1. Pick one technology at a time
2. Spend 20% of your time on learning, 80% on building
3. Keep a learning log
4. Build something every week
5. Share what you build

This approach works. It's how we learn at AstirMind.`
  }
];

/* ─── Simple markdown-ish renderer ─── */
function renderBody(text) {
  const lines = (text || '').split(/\r?\n/);
  const elements = [];
  let i = 0;

  const renderInline = (raw = '', keyPrefix = 'inline') => {
    const out = [];
    const regex = /(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|~~[^~]+~~|`[^`]+`)/g;
    let last = 0;
    let m;

    while ((m = regex.exec(raw)) !== null) {
      if (m.index > last) out.push(raw.slice(last, m.index));
      const token = m[0];

      if (token.startsWith('***') && token.endsWith('***')) {
        out.push(
          <strong key={`${keyPrefix}-${m.index}`} style={{ color: 'var(--text)', fontWeight: 700 }}>
            <em>{token.slice(3, -3)}</em>
          </strong>
        );
      } else if (token.startsWith('**') && token.endsWith('**')) {
        out.push(<strong key={`${keyPrefix}-${m.index}`} style={{ color: 'var(--text)', fontWeight: 600 }}>{token.slice(2, -2)}</strong>);
      } else if (token.startsWith('*') && token.endsWith('*')) {
        out.push(<em key={`${keyPrefix}-${m.index}`} style={{ color: '#ddd6ca' }}>{token.slice(1, -1)}</em>);
      } else if (token.startsWith('~~') && token.endsWith('~~')) {
        out.push(<del key={`${keyPrefix}-${m.index}`} style={{ color: '#a39a89' }}>{token.slice(2, -2)}</del>);
      } else if (token.startsWith('`') && token.endsWith('`')) {
        out.push(
          <code
            key={`${keyPrefix}-${m.index}`}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--line)',
              padding: '0.08rem 0.42rem',
              borderRadius: 4,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.86em',
              color: 'var(--accent)',
            }}
          >
            {token.slice(1, -1)}
          </code>
        );
      }

      last = regex.lastIndex;
    }

    if (last < raw.length) out.push(raw.slice(last));
    return out;
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trimStart();

    if (trimmed.startsWith('# ')) {
      elements.push(
        <h1 key={i} style={{
          fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
          fontWeight: 700, letterSpacing: '-0.035em', color: 'var(--text)',
          margin: '2.3rem 0 0.75rem',
        }}>{renderInline(trimmed.slice(2), `h1-${i}`)}</h1>
      );
    } else if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={i} style={{
          fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
          fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)',
          margin: '2.5rem 0 0.75rem', borderLeft: '3px solid var(--accent)', paddingLeft: '0.75rem',
        }}>{renderInline(trimmed.slice(3), `h2-${i}`)}</h2>
      );
    } else if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={i} style={{
          fontFamily: 'var(--font-sans)', fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
          fontWeight: 700, letterSpacing: '-0.02em', color: '#D9D1C4',
          margin: '1.75rem 0 0.65rem',
        }}>{renderInline(trimmed.slice(4), `h3-${i}`)}</h3>
      );
    } else if (trimmed.startsWith('#### ')) {
      elements.push(
        <h4 key={i} style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.95rem',
          fontWeight: 700, letterSpacing: '-0.01em', color: '#CFC6B8',
          margin: '1.35rem 0 0.55rem',
        }}>{renderInline(trimmed.slice(5), `h4-${i}`)}</h4>
      );
    } else if (trimmed.startsWith('```')) {
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={i} style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid var(--line)',
          padding: '1.25rem 1.5rem', margin: '1.5rem 0', overflowX: 'auto',
          fontFamily: 'var(--font-mono)', fontSize: '0.78rem', lineHeight: 1.65,
          color: 'var(--text)',
        }}>
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
    } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      elements.push(
        <p key={i} style={{
          fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1rem',
          color: '#E8E3DC', margin: '1.5rem 0 0.25rem',
        }}>{renderInline(trimmed.slice(2, -2), `boldline-${i}`)}</p>
      );
    } else if (trimmed === '') {
      // skip blank lines
    } else if (trimmed.match(/^\d+\.\s/)) {
      elements.push(
        <p key={i} style={{
          fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: 1.85,
          color: '#C5BFB0', margin: '0 0 0.85rem', paddingLeft: '1.5rem',
        }}><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>{trimmed.match(/^(\d+\.)\s/)[1]}</span>{renderInline(trimmed.replace(/^\d+\.\s/, ''), `ol-${i}`)}</p>
      );
    } else if (/^- \[ \] /.test(trimmed)) {
      elements.push(
        <p key={i} style={{
          fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: 1.85,
          color: '#C5BFB0', margin: '0 0 0.85rem', paddingLeft: '1.5rem',
        }}><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>☐</span>{renderInline(trimmed.replace(/^- \[ \] /, ''), `todo-${i}`)}</p>
      );
    } else if (/^- \[[xX]\] /.test(trimmed)) {
      elements.push(
        <p key={i} style={{
          fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: 1.85,
          color: '#C5BFB0', margin: '0 0 0.85rem', paddingLeft: '1.5rem',
        }}><span style={{ color: '#a0c878', marginRight: '0.5rem' }}>☑</span>{renderInline(trimmed.replace(/^- \[[xX]\] /, ''), `tododone-${i}`)}</p>
      );
    } else if (trimmed.startsWith('- ')) {
      elements.push(
        <p key={i} style={{
          fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: 1.85,
          color: '#C5BFB0', margin: '0 0 0.85rem', paddingLeft: '1.5rem',
        }}><span style={{ color: 'var(--accent)', marginRight: '0.5rem' }}>•</span>{renderInline(trimmed.slice(2), `ul-${i}`)}</p>
      );
    } else if (trimmed.startsWith('> ')) {
      elements.push(
        <blockquote key={i} style={{
          borderLeft: '3px solid var(--accent)',
          paddingLeft: '0.9rem',
          margin: '1rem 0 1.15rem',
          color: '#AFA496',
          fontStyle: 'italic',
          lineHeight: 1.75,
          maxWidth: '760px',
        }}>{renderInline(trimmed.slice(2), `quote-${i}`)}</blockquote>
      );
    } else {
      elements.push(
        <p key={i} style={{
          fontFamily: 'var(--font-sans)', fontSize: '1.0625rem', lineHeight: 1.85,
          color: '#C5BFB0', margin: '0 0 1.25rem', maxWidth: '720px',
        }}>
          {renderInline(trimmed, `p-${i}`)}
        </p>
      );
    }
    i++;
  }
  return elements;
}

/* ─── Category badge colour ─── */
const catColour = { Engineering: '#4a9eff', Training: '#D94F2C', Internship: '#a0c878', 'AI/ML': '#7c3aed', 'Web Development': '#f59e0b' };

export default function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pageRef = useRef(null);

  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState(POSTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchPost(id), fetchAllPosts()])
      .then(([fetched, fetchedAll]) => {
        if (fetched) {
          setPost(fetched);
        } else {
          const fromFetchedList = fetchedAll.find(p => String(p.id) === String(id) || String(p.slug) === String(id));
          const fromStatic = POSTS.find(p => String(p.id) === String(id) || String(p.slug) === String(id));
          setPost(fromFetchedList || fromStatic || null);
        }
        if (fetchedAll.length > 0) {
          setAllPosts(fetchedAll);
        }
        setLoading(false);
      })
      .catch(() => {
        const fallback = POSTS.find(p => p.id === id || p.slug === id);
        setPost(fallback || null);
        setLoading(false);
      });
  }, [id]);

  const related = allPosts.filter(p => p.id !== id).slice(0, 3);

  const [likes, setLikes] = useState(Math.floor(Math.random() * 30) + 5);
  const [liked, setLiked] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const [comments, setComments] = useState([]);
  const [commentBusy, setCommentBusy] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentError, setCommentError] = useState('');
  const [form, setForm] = useState({ name: '', text: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let alive = true;
    setCommentsLoading(true);
    setCommentError('');

    fetchComments(id).then((apiComments) => {
      if (!alive) return;
      if (apiComments) {
        setComments(apiComments);
      } else {
        setComments((post?.comments || []).map(normalizeComment));
      }
      setCommentsLoading(false);
    }).catch(() => {
      if (!alive) return;
      setComments((post?.comments || []).map(normalizeComment));
      setCommentsLoading(false);
    });

    return () => { alive = false; };
  }, [id, post]);

  useEffect(() => {
    if (!post) return;
    const ctx = gsap.context(() => {
      gsap.from('.bd-header', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' });
      gsap.from('.bd-hero-img', { opacity: 0, scale: 1.04, duration: 0.85, ease: 'power3.out', delay: 0.15 });
      gsap.from('.bd-body', {
        opacity: 0, y: 24, duration: 0.65, ease: 'power2.out', delay: 0.3,
        scrollTrigger: { trigger: '.bd-body', start: 'top 90%' },
      });
      gsap.from('.bd-sidebar > *', {
        opacity: 0, x: 20, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.4,
      });
      gsap.from('.bd-comments', {
        opacity: 0, y: 20, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: '.bd-comments', start: 'top 85%' },
      });
      gsap.from('.bd-related-card', {
        opacity: 0, y: 28, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.bd-related', start: 'top 85%' },
      });
    }, pageRef);
    return () => ctx.revert();
  }, [post]);

  if (loading) {
    return (
      <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 68, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-3)' }}>Loading post…</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 68, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-3)', marginBottom: '1.5rem' }}>Post not found.</p>
          <Link to="/blog" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <ArrowLeft size={13} /> Back to blog
          </Link>
        </div>
      </div>
    );
  }

  function handleLike() {
    if (!liked) { setLikes(l => l + 1); setLiked(true); }
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  }

  async function handleComment(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;

    setCommentBusy(true);
    setCommentError('');
    try {
      const created = await submitComment(id, {
        author_name: form.name.trim(),
        content: form.text.trim(),
      });
      setComments(prev => [...prev, created]);
      setForm({ name: '', text: '' });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setCommentError(err.message || 'Unable to post comment. Please try again.');
    } finally {
      setCommentBusy(false);
    }
  }

  return (
      <>
        <Helmet>
      <title>{post?.title || 'Blog Post'} | AstirMind Software Solutions</title>
      <meta
        name="description"
        content={post?.subtitle || post?.body?.substring(0, 160) || 'Read this detailed blog post from AstirMind about technology and software development.'}
      />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={`${post?.title || 'Blog Post'} | AstirMind Software Solutions`} />
      <meta property="og:description" content={post?.subtitle || post?.body?.substring(0, 160) || 'Read this detailed blog post from AstirMind.'} />
      <meta property="og:type" content="article" />
      {post?.image && <meta property="og:image" content={post.image} />}
      <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
    </Helmet>
      <div ref={pageRef} style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 68 }}>

        {/* ── Hero Image ── */}
        <div className="bd-hero-img" style={{ position: 'relative', height: 'clamp(260px, 38vw, 520px)', overflow: 'hidden', borderBottom: '1px solid var(--line)' }}>
          <img
            src={post.image}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6) contrast(1.08)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,5,3,0.15) 0%, rgba(6,5,3,0.75) 100%)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)' }} />

          {/* Back link overlaid on hero */}
          <div className="container" style={{ position: 'absolute', top: '1.5rem', left: 0, right: 0, margin: '0 auto' }}>
            <Link to="/blog" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.65)',
              textDecoration: 'none', background: 'rgba(6,5,3,0.5)', backdropFilter: 'blur(8px)',
              padding: '5px 10px', border: '1px solid rgba(255,255,255,0.12)',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
            >
              <ArrowLeft size={12} /> All Posts
            </Link>
          </div>
        </div>

        {/* ── Post Header ── */}
        <div className="bd-header container" style={{ padding: '3rem 0 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', textTransform: 'uppercase', letterSpacing: '0.1em',
              color: catColour[post.category] ?? 'var(--accent)',
              padding: '3px 8px', border: `1px solid ${catColour[post.category] ?? 'var(--accent)'}`,
            }}>
              {post.category}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-3)' }}>
              <Calendar size={11} strokeWidth={1.5} /> {post.date}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-3)' }}>
              <Clock size={11} strokeWidth={1.5} /> {post.read} read
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1,
            color: '#F5F0E8', maxWidth: 820, marginBottom: '1rem',
          }}>
            {post.title}
          </h1>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '1.125rem', lineHeight: 1.65,
            color: '#B8AFA0', maxWidth: 680,
          }}>
            {post.subtitle}
          </p>
        </div>

        {/* ── Body + Sidebar Layout ── */}
        <div className="container bd-layout" style={{ paddingTop: '3rem', paddingBottom: '5rem', display: 'grid', gridTemplateColumns: '1fr 280px', gap: '4rem', alignItems: 'start' }}>

          {/* ── Article Body ── */}
          <div>
            <div className="bd-body" style={{ maxWidth: 720 }}>
              {renderBody(post.body)}
            </div>

            {/* ── Social Share Strip ── */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap',
              margin: '3rem 0', padding: '1.5rem', background: 'var(--bg-alt)', border: '1px solid var(--line)',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: '0.5rem' }}>
                Share
              </span>

              {/* Like */}
              <button
                onClick={handleLike}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', border: `1px solid ${liked ? 'var(--accent)' : 'var(--line)'}`,
                  background: liked ? 'rgba(217,79,44,0.1)' : 'transparent',
                  color: liked ? 'var(--accent)' : 'var(--text-3)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.625rem', cursor: liked ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <ThumbsUp size={13} strokeWidth={1.8} /> {likes}
              </button>

              {/* Twitter */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', border: '1px solid var(--line)', background: 'transparent',
                  color: 'var(--text-3)', fontFamily: 'var(--font-mono)', fontSize: '0.625rem',
                  textDecoration: 'none', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#1d9bf0'; e.currentTarget.style.color = '#1d9bf0'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--text-3)'; }}
              >
                <Share2 size={13} strokeWidth={1.8} /> Twitter
              </a>

              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', border: '1px solid var(--line)', background: 'transparent',
                  color: 'var(--text-3)', fontFamily: 'var(--font-mono)', fontSize: '0.625rem',
                  textDecoration: 'none', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#0a66c2'; e.currentTarget.style.color = '#0a66c2'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--text-3)'; }}
              >
                <ExternalLink size={13} strokeWidth={1.8} /> LinkedIn
              </a>

              {/* Copy link */}
              <button
                onClick={handleCopyLink}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', border: `1px solid ${linkCopied ? 'var(--accent)' : 'var(--line)'}`,
                  background: linkCopied ? 'rgba(217,79,44,0.08)' : 'transparent',
                  color: linkCopied ? 'var(--accent)' : 'var(--text-3)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.625rem', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {linkCopied ? <Check size={13} strokeWidth={2} /> : <Link2 size={13} strokeWidth={1.8} />}
                {linkCopied ? 'Copied' : 'Copy link'}
              </button>
            </div>

            {/* ── Comments ── */}
            <div className="bd-comments">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <MessageSquare size={16} strokeWidth={1.5} style={{ color: '#9A9080' }} />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 600, color: '#E8E3DC' }}>
                  {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
                </span>
              </div>

              {commentsLoading && (
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-3)', marginBottom: '1rem' }}>
                  Loading comments…
                </p>
              )}

              {/* Comment list */}
              {comments.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', marginBottom: '2.5rem', border: '1px solid var(--line)' }}>
                  {comments.map(c => (
                    <div key={c.id} style={{ padding: '1.25rem 1.5rem', background: 'var(--bg-alt)', borderBottom: '1px solid var(--line)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.875rem', color: '#E8E3DC' }}>{c.author}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: '#9A9080' }}>{c.date}</span>
                      </div>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: 1.65, color: '#C5BFB0', margin: 0 }}>{c.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {!commentsLoading && comments.length === 0 && (
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-3)', marginBottom: '1.25rem' }}>
                  No comments yet. Be the first to comment.
                </p>
              )}

              {/* Add comment form */}
              <form onSubmit={handleComment} style={{ border: '1px solid var(--line)', background: 'var(--bg-alt)', padding: '1.75rem' }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 600, color: '#E8E3DC', marginBottom: '1.25rem' }}>
                  Leave a comment
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                    style={{
                      background: 'var(--bg)', border: '1px solid var(--line)', padding: '9px 12px',
                      fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--text)',
                      outline: 'none', width: '100%', boxSizing: 'border-box',
                    }}
                  />
                  <div /> {/* spacer */}
                </div>
                <textarea
                  placeholder="Write your comment…"
                  rows={4}
                  value={form.text}
                  onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                  required
                  style={{
                    background: 'var(--bg)', border: '1px solid var(--line)', padding: '9px 12px',
                    fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--text)',
                    outline: 'none', width: '100%', resize: 'vertical', marginBottom: '1rem', boxSizing: 'border-box',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    {submitted && (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#a0c878', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <Check size={12} /> Comment posted
                      </span>
                    )}
                    {commentError && (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#D94F2C' }}>
                        {commentError}
                      </span>
                    )}
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <button
                      type="submit"
                      disabled={commentBusy}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '9px 20px', background: 'var(--text)', color: 'var(--text-inv)',
                        border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)',
                        fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.06em',
                        transition: 'opacity 0.2s', opacity: commentBusy ? 0.65 : 1,
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      {commentBusy ? 'Posting…' : 'Post'} <Send size={12} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <aside className="bd-sidebar" style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* About block */}
            <div style={{ border: '1px solid var(--line)', padding: '1.5rem', background: 'var(--bg-alt)' }}>
              <div style={{ height: 3, background: 'var(--accent)', margin: '-1.5rem -1.5rem 1.25rem' }} />
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9A9080', marginBottom: '0.75rem' }}>
                AstirMind
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: 1.7, color: '#C5BFB0' }}>
                Software company and training institute in Pune. We build products and train engineers since 2016.
              </p>
              <div style={{ height: '1px', background: 'var(--line)', margin: '1rem 0' }} />
              <Link to="/about" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)', fontSize: '0.5875rem', color: 'var(--accent)',
                textDecoration: 'none',
              }}>
                About us <ArrowUpRight size={13} strokeWidth={2} />
              </Link>
            </div>

            {/* Programs CTA */}
            <div style={{ border: '1px solid var(--line)', padding: '1.5rem', background: 'var(--bg-alt)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9A9080', marginBottom: '0.75rem' }}>
                Training Programs
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', lineHeight: 1.6, color: '#C5BFB0', marginBottom: '1rem' }}>
                Structured programs with mentorship, project reviews, and internship pathways.
              </p>
              <Link to="/courses" style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 14px', background: 'var(--text)', color: 'var(--text-inv)',
                fontFamily: 'var(--font-mono)', fontSize: '0.5875rem', textTransform: 'uppercase', letterSpacing: '0.05em',
                textDecoration: 'none', width: 'fit-content',
              }}>
                View programs <ArrowUpRight size={12} strokeWidth={2} />
              </Link>
            </div>

            {/* Related posts */}
            <div style={{ border: '1px solid var(--line)', background: 'var(--bg-alt)' }}>
              <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--line)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-3)' }}>More Posts</span>
              </div>
              {related.map(r => (
                <Link key={r.id} to={`/blog/${r.id}`}
                  className="bd-related-card"
                  style={{
                    display: 'block', padding: '1rem 1.25rem', borderBottom: '1px solid var(--line)',
                    textDecoration: 'none', transition: 'background 0.18s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: catColour[r.category] ?? 'var(--accent)' }}>
                    {r.category}
                  </span>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.35, margin: '0.35rem 0 0.3rem' }}>
                    {r.title}
                  </p>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-3)' }}>
                    {r.read} read
                  </span>
                </Link>
              ))}
            </div>
          </aside>
        </div>

        {/* ── Related Posts Full-Width ── */}
        <div className="bd-related" style={{ borderTop: '1px solid var(--line)', background: 'var(--bg-alt)' }}>
          <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Related</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--line)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: '1px', background: 'var(--line)', border: '1px solid var(--line)' }}>
              {related.map(r => (
                <Link key={r.id} to={`/blog/${r.id}`}
                  className="bd-related-card"
                  style={{
                    display: 'block', background: 'var(--bg)', textDecoration: 'none',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-alt)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}
                >
                  <div style={{ aspectRatio: '16/7', overflow: 'hidden' }}>
                    <img src={r.image} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75)', transition: 'transform 0.5s' }} />
                  </div>
                  <div style={{ padding: '1.25rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: catColour[r.category] ?? 'var(--accent)' }}>{r.category}</span>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.35, margin: '0.4rem 0 0.5rem' }}>{r.title}</p>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--text-3)' }}>{r.read} read</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
      </>
      );
}
