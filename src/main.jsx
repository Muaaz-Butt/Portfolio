import React, { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { profile, stats, projects, experience, skillGroups, featuredSkills, marquee } from './data.js'
import { HeroCanvas, Terminal, Counter, Magnetic, CursorRing, LocalTime, spotlight, useRevealOnScroll, useScrollProgress } from './effects.jsx'
import { visuals } from './visuals.jsx'

const HEADLINE = [['I', 'build', 'the'], ['systems', 'behind'], ['better', 'ideas.']]
const ACCENT_WORDS = new Set(['systems', 'ideas.'])

function Headline() {
  let index = 0
  return (
    <h1 className="headline" aria-label="I build the systems behind better ideas.">
      {HEADLINE.map((line, l) => (
        <span className="headline-line" key={l} aria-hidden="true">
          {line.map(word => (
            <span className="word-mask" key={word}>
              <span className={`word ${ACCENT_WORDS.has(word) ? 'accent' : ''}`} style={{ '--i': index++ }}>{word}</span>
            </span>
          ))}
        </span>
      ))}
    </h1>
  )
}

function Nav() {
  const [progress, scrolled] = useScrollProgress()
  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="wrap nav-inner">
          <a className="wordmark" href="#top" aria-label="Muaaz Butt home"><span>MB</span><i>●</i></a>
          <LocalTime />
          <nav className="nav-links" aria-label="Sections">
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#about">About</a>
            <a href={profile.resume} download className="nav-resume">Résumé <span>↓</span></a>
            <a href="#contact" className="nav-contact">Let's talk <span>↗</span></a>
          </nav>
        </div>
      </header>
    </>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <HeroCanvas />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow intro-in" style={{ '--d': '0s' }}>
            <span className="pulse"></span>{profile.role.toUpperCase()} <b>·</b> PYTHON &amp; BACKEND <b>·</b> LLM APPS
          </p>
          <Headline />
          <p className="hero-intro intro-in" style={{ '--d': '.75s' }}>
            I design REST APIs, authentication flows and real-time features, and at <strong>Educative</strong> I build
            Python LLM applications and test them until they're reliable.
          </p>
          <div className="hero-actions intro-in" style={{ '--d': '.9s' }}>
            <Magnetic><a className="button button-primary" href="#work">See selected work <span>↓</span></a></Magnetic>
            <Magnetic><a className="button button-ghost" href={profile.resume} download>Download résumé <span>↓</span></a></Magnetic>
            <Magnetic><a className="button button-ghost" href={profile.github} target="_blank" rel="noreferrer">GitHub <span>↗</span></a></Magnetic>
          </div>
        </div>
        <div className="hero-terminal intro-in" style={{ '--d': '.5s' }}>
          <Terminal />
          <div className="terminal-glow" aria-hidden="true" />
        </div>
      </div>
      <div className="wrap stats">
        {stats.map((s, i) => (
          <div className="stat reveal" style={{ '--d': `${i * 0.08}s` }} key={s.label}>
            <strong><Counter {...s} /></strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function Marquee() {
  const row = items => [...items, ...items].map((item, i) => <span key={i}>{item}<i>✳</i></span>)
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">{row(marquee)}</div>
      <div className="marquee-track reverse">{row([...marquee].reverse())}</div>
    </div>
  )
}

function SectionHeading({ index, label, title, note }) {
  return (
    <div className="section-heading reveal">
      <div>
        <p className="eyebrow"><span className="index">{index}</span>{label}</p>
        <h2 className="section-title">{title}</h2>
      </div>
      {note && <p className="section-note">{note}</p>}
    </div>
  )
}

function Project({ project }) {
  const Visual = visuals[project.visual]
  return (
    <article className={`project tone-${project.tone} reveal`} onPointerMove={spotlight}>
      <div className="project-info">
        <div className="project-meta"><span className="project-number">{project.number}</span><span>{project.kind}</span><span className="dot">/</span><span>{project.date}</span></div>
        <h3><a href={project.links[0].href} target="_blank" rel="noreferrer">{project.title}<span className="title-arrow">↗</span></a></h3>
        <p className="project-desc">{project.description}</p>
        <ul className="highlights">{project.highlights.map(h => <li key={h}>{h}</li>)}</ul>
        <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <div className="project-links">
          {project.links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} <span>↗</span></a>)}
        </div>
      </div>
      <div className="project-visual"><Visual /></div>
    </article>
  )
}

function Work() {
  return (
    <section className="work-section wrap" id="work">
      <SectionHeading index="01" label="SELECTED WORK" title={<>Things I've <em>built.</em></>} note={<>03 projects / 01 principle:<br /><strong>make it useful</strong></>} />
      <div className="project-list">{projects.map(p => <Project project={p} key={p.number} />)}</div>
    </section>
  )
}

function Experience() {
  return (
    <section className="experience-section wrap" id="experience">
      <SectionHeading index="02" label="EXPERIENCE" title={<>Where I've <em>shipped.</em></>} note={<>Backend first,<br /><strong>AI by practice</strong></>} />
      <ol className="timeline">
        {experience.map((job, i) => (
          <li className="job reveal" style={{ '--d': `${i * 0.1}s` }} key={job.company} onPointerMove={spotlight}>
            <div className="job-marker"><span className={job.current ? 'live' : ''}></span></div>
            <div className="job-side">
              <span className="job-date">{job.date}</span>
              <span className="job-place">{job.place}</span>
              {job.current && <span className="now-badge"><i></i>Now</span>}
            </div>
            <div className="job-body">
              <h3>{job.role} <span>@ {job.company}</span></h3>
              <ul>{job.points.map(p => <li key={p}>{p}</li>)}</ul>
              <div className="tags">{job.tags.map(t => <span key={t}>{t}</span>)}</div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function About() {
  return (
    <section className="about-section" id="about">
      <div className="wrap about-grid">
        <div className="reveal">
          <p className="eyebrow"><span className="index">03</span>A LITTLE CONTEXT</p>
          <h2>Curious by default.<br /><span>Precise by practice.</span></h2>
        </div>
        <div className="about-copy reveal" style={{ '--d': '.1s' }}>
          <p>I'm Muaaz, a Computer Science graduate from UET Lahore with a strong foundation in algorithms, data structures and object-oriented design.</p>
          <p>I like the parts of software most people never see: the API contract, the auth flow, the test that catches the edge case. Lately that means building and evaluating LLM applications, and I'm especially drawn to developer tooling, SDKs and reliable backend systems.</p>
          <div className="edu-card" onPointerMove={spotlight}>
            <div className="edu-top"><span>EDUCATION</span><span>Dec 2022 — Jun 2026</span></div>
            <h3>BS Computer Science</h3>
            <p>University of Engineering and Technology, Lahore</p>
            <div className="edu-facts">
              <div><strong>3.49</strong><span>CGPA</span></div>
              <div><strong>280+</strong><span>problems solved</span></div>
              <div><strong>Top 5</strong><span>UET programming competition</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section className="skills-section wrap">
      <SectionHeading index="04" label="THE TOOLBOX" title={<>What I <em>work with.</em></>} note={<>Always learning.<br /><strong>Never collecting.</strong></>} />
      <div className="skill-groups">
        {skillGroups.map((group, i) => (
          <div className="skill-group reveal" style={{ '--d': `${(i % 3) * 0.08}s` }} key={group.name} onPointerMove={spotlight}>
            <p className="skill-name"><span>0{i + 1}</span>{group.name}</p>
            <div className="skill-items">{group.items.map(item => <span className={featuredSkills.has(item) ? 'featured' : ''} key={item}>{item}</span>)}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 2200) }
    catch { window.location.href = `mailto:${profile.email}` }
  }
  return (
    <section className="contact-section" id="contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="wrap">
        <div className="contact-top reveal"><p className="eyebrow"><span className="index">05</span>HAVE A GOOD PROBLEM?</p><span className="contact-index">05 / 05</span></div>
        <h2 className="reveal">Let's make<br /><em>something solid.</em></h2>
        <div className="contact-actions reveal">
          <Magnetic strength={0.18}><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email} <span>↗</span></a></Magnetic>
          <button className="copy-button" type="button" onClick={copyEmail}>{copied ? 'Copied ✓' : 'Copy email'}</button>
          <a className="copy-button" href={profile.resume} download>Download résumé ↓</a>
        </div>
        <footer className="contact-bottom">
          <span>{profile.location}</span>
          <span>© 2026 {profile.name}</span>
          <div className="socials">
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="#top">Back to top ↑</a>
          </div>
        </footer>
      </div>
    </section>
  )
}

function App() {
  useRevealOnScroll()
  return (
    <>
      <CursorRing />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <Experience />
        <About />
        <Skills />
        <Contact />
      </main>
    </>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
