import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const projects = [
  {
    number: '01',
    type: 'AI SYSTEM / 2025—26',
    title: 'AIKAPPLY',
    description: 'An AI-powered admission platform for Pakistani students: one application form, Gemini-based university recommendations, a deadline tracker and chatbot, plus auto-apply that maps student data onto unfamiliar portals and submits them with Selenium. Live and deployed.',
    tags: ['Django', 'React', 'LangChain', 'Gemini', 'Selenium', 'Docker', 'PostgreSQL'],
    tone: 'lime',
    links: [
      { label: 'Live demo', href: 'https://aikapply.onrender.com' },
      { label: 'Source code', href: 'https://github.com/Muaaz-Butt/AikApply' },
    ],
  },
  {
    number: '02',
    type: 'BACKEND / 2026',
    title: 'TASKFLOW API',
    description: 'A production-minded task service with JWT security, PostgreSQL persistence, validation, and a lightweight connected frontend.',
    tags: ['Spring Boot', 'PostgreSQL', 'JWT'],
    tone: 'coral',
  },
  {
    number: '03',
    type: 'SOFTWARE DESIGN / 2023',
    title: 'CHESS GAME',
    description: 'A console chess game built with complete game logic, modular state management, inheritance, and polymorphism.',
    tags: ['Java', 'OOP', 'Game Logic'],
    tone: 'blue',
  },
]

const skills = ['Python', 'Java', 'C++', 'JavaScript', 'SQL', 'Rust', 'Django', 'Spring Boot', 'PostgreSQL', 'Docker', 'Redis', 'WebSockets', 'AWS', 'LangChain', 'LLM Agents', 'REST APIs']

function App() {
  return (
    <main>
      <nav className="nav wrap">
        <a className="wordmark" href="#top" aria-label="Muaaz Butt home"><span>MB</span><i>●</i></a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact" className="nav-contact">Let's talk <span>↗</span></a>
        </div>
      </nav>

      <section className="hero wrap" id="top">
        <div className="hero-copy">
          <p className="eyebrow reveal">TECHNICAL CONTENT ENGINEER <span>·</span> AI BUILDER <span>·</span> BACKEND ENGINEER</p>
          <h1 className="reveal delay-1">I build the <em>systems</em><br />behind better ideas.</h1>
          <p className="hero-intro reveal delay-2">Technical Content Engineer at Educative, building AI agents and tools while creating dependable software with Python, Django, and Next.js.</p>
          <div className="hero-actions reveal delay-3">
            <a className="button button-primary" href="#work">See selected work <span>↓</span></a>
            <a className="text-link" href="mailto:muaazbutt585@gmail.com">muaazbutt585@gmail.com <span>↗</span></a>
          </div>
        </div>
        <div className="hero-side reveal delay-2">
          <div className="signal-mark" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
          <p>Currently building<br /><strong>agents & tools</strong> @ Educative</p>
          <div className="status"><i></i> Available for interesting problems</div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true"><div>DESIGN WITH INTENT <span>✳</span> SHIP WITH CARE <span>✳</span> DESIGN WITH INTENT <span>✳</span> SHIP WITH CARE <span>✳</span></div></div>

      <section className="work-section wrap" id="work">
        <div className="section-heading"><p className="eyebrow">SELECTED WORK</p><p className="section-note">03 projects / 01 principle:<br /><strong>make it useful</strong></p></div>
        <div className="project-list">
          {projects.map((project) => (
            <article className={`project project-${project.tone}`} key={project.number}>
              <div className="project-number">{project.number}</div>
              <div className="project-main">
                <p className="project-type">{project.type}</p>
                <h2>{project.links ? <a href={project.links[0].href} target="_blank" rel="noreferrer">{project.title}</a> : project.title}</h2>
                <p>{project.description}</p>
                <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                {project.links && (
                  <div className="project-links">
                    {project.links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} <span>↗</span></a>)}
                  </div>
                )}
              </div>
              {project.links
                ? <a className="project-arrow" href={project.links[0].href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>↗</a>
                : <div className="project-arrow">↗</div>}
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="wrap about-grid">
          <div><p className="eyebrow">A LITTLE CONTEXT</p><h2>Curious by default.<br /><span>Precise by practice.</span></h2></div>
          <div className="about-copy"><p>I’m Muaaz, a Computer Science graduate from UET Lahore and a Technical Content Engineer at Educative.</p><p>I work across agents, tools, and AI: analyzing prompts, reviewing AI-generated content, and helping turn complex ideas into clear, reliable learning experiences. I also write maintainable software in Python, Django, and Next.js for Educative projects.</p><div className="fact-row"><div><strong>AI</strong><span>agents & tools</span></div><div><strong>3</strong><span>core technologies</span></div><div><strong>280+</strong><span>problems solved</span></div></div></div>
        </div>
      </section>

      <section className="skills-section wrap"><div className="section-heading"><p className="eyebrow">THE TOOLBOX</p><p className="section-note">Always learning.<br /><strong>Never collecting.</strong></p></div><div className="skills-cloud">{skills.map((skill, i) => <span className={i % 5 === 0 ? 'featured-skill' : ''} key={skill}>{skill}</span>)}</div></section>

      <section className="contact-section wrap" id="contact"><div className="contact-top"><p className="eyebrow">HAVE A GOOD PROBLEM?</p><span className="contact-index">04 / 04</span></div><h2>Let’s make<br /><em>something solid.</em></h2><a className="contact-email" href="mailto:muaazbutt585@gmail.com">muaazbutt585@gmail.com <span>↗</span></a><div className="contact-bottom"><span>Lahore, Pakistan</span><span>© 2026 Muaaz Butt</span><div className="socials"><a href="https://github.com/Muaaz-Butt" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://linkedin.com/in/muaaz-butt-192a45265" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div></section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
