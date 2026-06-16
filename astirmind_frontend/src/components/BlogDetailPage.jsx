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

/* ─── Shared post data (same as BlogPage) ─── */
export const POSTS = [
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
    body: `
Most people learn linear algebra from a textbook that shows you how to multiply matrices by hand and leaves it there. Useful for passing exams. Not useful for reading a transformer paper.

This article covers the specific operations you will encounter when you start building or fine-tuning neural networks: dot products, matrix multiplication, eigendecomposition, and the singular value decomposition. I will explain each one in context — what the operation is, why it exists inside a model, and what goes wrong if you get it wrong.

## Dot Products and Attention

Every attention mechanism in a transformer is a scaled dot-product attention. You are computing a similarity score between two vectors: the query and each key. The dot product gives you a single number that represents how much attention one token pays to another.

\`\`\`python
import numpy as np

query = np.array([0.1, 0.8, 0.3])
key   = np.array([0.4, 0.7, 0.2])
score = np.dot(query, key)   # 0.66
\`\`\`

The scaling by √d_k prevents the scores from growing too large when the dimension is high, which would push softmax into near-zero gradient regions.

## Matrix Multiplication as Learned Transformations

Every linear layer is a matrix multiplication: output = input @ W + b. The weight matrix W defines a linear transformation from input space to output space. When you stack layers, you are composing transformations.

Understanding this helps you reason about shapes. A common mistake is confusing (batch, seq, hidden) with (batch, hidden, seq) and getting a silent wrong answer because numpy broadcasts instead of raising.

## Eigendecomposition and PCA

If you have ever used PCA for dimensionality reduction, you have used eigendecomposition. The eigenvectors of the covariance matrix are the principal components; the eigenvalues tell you how much variance each component explains.

In practice, you will rarely compute eigendecomposition directly. SVD is more numerically stable and handles non-square matrices. But knowing why PCA works helps you choose how many components to keep.

## SVD and Low-Rank Approximations

SVD decomposes any matrix A into U Σ V^T. The singular values in Σ, sorted in descending order, tell you how much each component contributes. If you truncate to the top k singular values, you get the best rank-k approximation of A.

This is exactly what LoRA does. Instead of fine-tuning the full weight matrix, LoRA adds a low-rank update: ΔW = A B, where A and B are small matrices. SVD gives you the mathematical justification for why this works — most of the information in a pre-trained weight matrix sits in the top singular values, and fine-tuning task-specific behaviour only requires updating a low-rank subspace.

## What to Do Next

If the theory is new to you, work through the 3Blue1Brown "Essence of Linear Algebra" series. Then read the Attention Is All You Need paper while keeping a shapes notebook: every time a matrix operation appears, write down the shape of every tensor involved.

If you want to go further, read the LoRA paper. The core idea is three pages. The rest is experiments.
    `.trim(),
    comments: [
      { id: 1, author: 'Rahul M.', date: 'Apr 2026', text: 'Finally an explanation of LoRA that connects to the SVD. Thank you.' },
      { id: 2, author: 'Pooja S.', date: 'Apr 2026', text: 'The shapes notebook tip is excellent. Saved me hours of debugging.' },
    ],
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
    body: `
Most trainees finish a course and immediately start applying for internships with an empty GitHub and a list of course certificates. That rarely works. This article tells you what to build first and how to present it.

## The Problem With Certificates Alone

A certificate proves you sat through a course. It does not prove you can build things under real constraints — ambiguous requirements, time pressure, code that other people will read.

Hiring managers at technical companies know this. They scan for projects, not credentials.

## What to Build

Build three things before you apply:

**1. One complete project end to end.** Not a tutorial clone. Something with a real problem statement, even if it is a toy problem. A web app that does something specific, a data pipeline that processes real data, a bot that solves a small automation task. The goal is to have something you can demo and explain.

**2. One project that shows you can read someone else's code.** Fork an open source project, fix a real bug, or add a small feature. Even a documentation fix that required reading source code counts. This shows you can work in a codebase that predates you.

**3. One project that shows you can collaborate.** If you have done our training, you have done code reviews. Document that process. Show the before and after. Show the comments you gave and received.

## How to Present It

Your GitHub README is a job application. Treat it that way. Include: what the project does, why you built it, the tech stack, how to run it, and one screenshot or demo link.

Write your project descriptions in plain language. "Built a Django REST API that processes uploaded files and returns extracted metadata" beats "Leveraged modern backend frameworks to architect scalable microservices."

## The Internship Interview

In our internships, the technical interview is a code walkthrough of your own project. We ask: why did you make this decision? What would you change? What did you learn?

If you cannot answer those questions about your own code, the project will not help you. Build things you understand deeply.
    `.trim(),
    comments: [
      { id: 1, author: 'Aditi K.', date: 'Apr 2026', text: 'The three-project framework is exactly what I needed. Going to restructure my GitHub this week.' },
    ],
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
    body: `
An API that works is not the same as an API that a team can maintain. This article covers the practical patterns that keep an API readable and predictable after the person who wrote it has moved on.

## Naming Is Documentation

Every endpoint name is a decision about what the API communicates. \`/users/42/posts\` tells you something. \`/getPostsByUserId?uid=42\` does not tell you anything except that someone was not thinking about it.

Use nouns for resources, HTTP verbs for actions. Be consistent: if you pluralise \`users\`, pluralise everything. If you use camelCase in responses, use it everywhere.

## Version From the Start

If your API will be consumed by clients you do not fully control — a mobile app, a third-party integration, even a separate frontend team — version from day one. \`/api/v1/\` costs almost nothing to add and saves you enormous pain when you need to make a breaking change.

## Error Responses Are Part of the Contract

Most APIs are designed for the happy path. The error responses are added later, inconsistently. This is the single biggest thing that makes APIs hard to consume.

Define a standard error shape before you write your first endpoint. Include: a machine-readable code, a human-readable message, and a request ID for tracing.

\`\`\`json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "email field is required",
    "request_id": "req_8fk2j"
  }
}
\`\`\`

Stick to this shape for every error, including 500s.

## Write the README Before the Code

This sounds impractical. It is not. Writing usage examples before implementation forces you to think about the consumer's perspective. If the example is awkward to write, the endpoint design is awkward.

This is the API equivalent of test-driven development. You are describing the contract before the implementation.

## One Request, One Responsibility

The most maintainable APIs are those where each endpoint does one thing. When you add a query parameter that changes the fundamental shape of the response, you are creating two endpoints with shared code and different behaviour. That is hard to document, hard to test, and hard to debug.

If you need to support two different use cases, consider two endpoints.
    `.trim(),
    comments: [],
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
    body: `
Most training programmes end with a project demo. You show it, the mentor says good job, and you move on. That is not a review. It is a performance.

A review is a structured conversation about decisions: why you made them, what you would change, and what the reviewer would have done differently. This article describes the review loop we use at AstirMind Institute.

## The Three-Question Review

Every project review starts with three questions the trainee answers before the session:

1. What was the hardest decision you made?
2. What would you do differently if you started again?
3. What question are you most uncertain about?

These questions do two things. First, they force the trainee to reflect before the meeting, so the session is not spent watching them think. Second, they surface the uncertainty that is actually worth discussing.

## Code Walkthrough, Not Code Reading

The review is a walkthrough led by the trainee, not a reading session led by the reviewer. The trainee explains what each section does and why.

The reviewer's job is to ask one question per decision point: "Why this approach?" Not to list what they would have done instead.

## Written Feedback

After every review, the reviewer writes a short note: two or three things that were done well, two or three things to change. This note goes to the trainee and stays in the record.

Over time, this creates a history. You can see the same mistake appearing in three consecutive reviews, which tells you something needs to be addressed directly.

## The Gap Between Written and Shipped

The gap between code that works and code that is ready to ship is usually not technical. It is about documentation, error handling, and edge cases. The review loop is designed to surface that gap before the trainee thinks they are finished.

That is the goal: not to validate the work, but to make it better.
    `.trim(),
    comments: [
      { id: 1, author: 'Vikram R.', date: 'Mar 2026', text: 'The three-question framework changed how I run reviews. Simple and effective.' },
    ],
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
    body: `
Eight years of running internships has taught us one thing clearly: the most common failure mode is not technical ability. It is ambiguity.

New engineers fail not because they cannot write code but because they cannot work with unclear requirements, give feedback on someone else's decisions, or ask for help before they are completely stuck.

This article describes the mentoring framework we use at AstirMind.

## Week One: Context Before Code

The first week of an internship is deliberately slow. We do not assign feature work. We assign reading: the codebase README, the deployment documentation, three or four pull requests from the last month.

The goal is to give the intern enough context to ask intelligent questions. Most bad code is written by people who did not understand the problem they were solving.

## Structured Check-ins

Every intern has a 20-minute check-in with their mentor every two days. The format is fixed:

- What did you complete?
- What is blocked?
- What are you uncertain about?

Short, specific, consistent. The check-in is not a status report — it is an uncertainty surface. If an intern says they are not uncertain about anything, the mentor asks probing questions until something surfaces.

## The Pairing Session

Once a week, the intern and mentor work on the same task together. The intern drives; the mentor navigates. Roles switch halfway through.

This is where most technical learning happens. Not in lectures or code reviews, but in the back-and-forth of two people solving a problem in real time.

## Exiting the Internship

At the end of the internship, the intern writes a one-page technical retrospective: what they built, what they learned, and what they would do differently. This document becomes part of their record.

We read these retrospectives carefully. They tell us more about a person's trajectory than their code does.
    `.trim(),
    comments: [],
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
    body: `
When you are applying for your first technical role, you will be competing against people who took the same courses, watched the same tutorials, and built the same to-do app. The question is not whether you can build something — it is whether you can build something that stands out.

Signal is different from noise. Noise is a CRUD app that follows a tutorial. Signal is a project that solves a specific problem, was built under real constraints, and can be explained clearly in five minutes.

## Choose a Real Problem

The best portfolio projects start with a problem you actually have. Not a contrived exercise. A tool you built because you were annoyed by something, a dataset you explored because you were curious, an automation you wrote because a manual process was wasting your time.

Real problems produce specific solutions. Specific solutions are easier to explain and more interesting to talk about.

## Document the Decisions

Every technical decision you made is a potential interview question. Why this database? Why this architecture? Why this library and not that one?

Write a decision log. It does not have to be formal — a section in your README works. List the three or four biggest decisions you made and explain why you made them.

This serves two purposes: it helps you prepare for interviews, and it signals to reviewers that you think about trade-offs, not just implementation.

## Demonstrate the Process

Include the messy version in your history. A git log that shows one commit with a message "final" is a red flag. A git log that shows incremental progress, dead ends, and refinements is interesting.

You do not need to clean up your history. Leave it honest.

## Present It Well

A project that works but cannot be seen might as well not exist. Deploy it. Record a two-minute demo video. Write a clear README that tells someone what it does and how to run it in under three minutes.

The presentation is not separate from the project. It is part of the work.
    `.trim(),
    comments: [
      { id: 1, author: 'Sneha P.', date: 'Feb 2026', text: 'The decision log idea is gold. Adding this to my current project immediately.' },
      { id: 2, author: 'Karan D.', date: 'Feb 2026', text: 'Honest git history as a positive signal — never thought about it that way.' },
    ],
  },
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
      // collect code block
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
      // bold standalone line (used as sub-heading)
      elements.push(
        <p key={i} style={{
          fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1rem',
          color: '#E8E3DC', margin: '1.5rem 0 0.25rem',
        }}>{renderInline(trimmed.slice(2, -2), `boldline-${i}`)}</p>
      );
    } else if (trimmed === '') {
      // skip blank lines (paragraph spacing handled by p margin)
    } else if (trimmed.match(/^\d+\.\s/)) {
      // numbered list item
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
      // bullet list item
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
      // normal paragraph with inline markdown
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
const catColour = { Engineering: '#4a9eff', Training: '#D94F2C', Internship: '#a0c878' };

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
          // fallback priority: fetched list -> static posts
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
        <title>{blogData?.title || 'Blog Post'} | AstirMind Software Solutions</title>
        <meta
          name="description"
          content={blogData?.excerpt || blogData?.description || 'Read this detailed blog post from AstirMind about technology and software development.'}
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`${blogData?.title || 'Blog Post'} | AstirMind Software Solutions`} />
        <meta property="og:description" content={blogData?.excerpt || blogData?.description || 'Read this detailed blog post from AstirMind.'} />
        <meta property="og:type" content="article" />
        {blogData?.image && <meta property="og:image" content={blogData.image} />}
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
              <Link to="/programs" style={{
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
