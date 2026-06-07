import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal.js'
import { useMagnetic } from '../hooks/useMagnetic.js'
import WorkCardCanvas from '../components/WorkCardCanvas.jsx'
import ElectricBorder from '../components/ElectricBorder.jsx'
import LetterGlitch from '../components/LetterGlitch.jsx'
import { projects, CATEGORIES } from '../data/projects.js'

// Honor the OS "reduce motion" setting — freeze the electric border animation
// (speed 0 still draws the border, it just doesn't move).
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null)

  // Scroll lock + Escape to dismiss + initial focus on the close button.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    const id = setTimeout(() => closeRef.current && closeRef.current.focus(), 0)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      clearTimeout(id)
    }
  }, [onClose])

  const cs = project.caseStudy || {}

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pm-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          className="modal-close"
          aria-label="Close project details"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="modal-hero">
          {project.image ? (
            <img src={project.image} alt={`${project.name} screenshot`} />
          ) : (
            <WorkCardCanvas sceneIndex={project.sceneIndex} container=".modal-hero" />
          )}
          <div className="modal-hero-grad" />
          <div className="modal-hero-head">
            <span className="project-cat">{project.category}</span>
            <h2 id="pm-title">{project.name}</h2>
            <p className="modal-tagline">{project.tagline}</p>
          </div>
        </div>

        <div className="modal-body">
          {cs.problem && (
            <section className="cs-section">
              <h3>Problem</h3>
              <p>{cs.problem}</p>
            </section>
          )}
          {cs.solution && (
            <section className="cs-section">
              <h3>Solution</h3>
              <p>{cs.solution}</p>
            </section>
          )}

          <section className="cs-section">
            <h3>Tech stack</h3>
            <div className="project-tags">
              {project.tags.map((t) => (
                <span className="pill" key={t}>{t}</span>
              ))}
            </div>
          </section>

          {cs.results && (
            <section className="cs-section">
              <h3>Results</h3>
              <p>{cs.results}</p>
            </section>
          )}

          <div className="modal-actions">
            <a
              className="btn btn-sm"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              Live ↗
            </a>
            <a
              className="btn btn-sm ghost"
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  useReveal()
  useMagnetic()

  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null)
  const ebSpeed = prefersReducedMotion() ? 0 : 0.5

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  )

  // Nudge a resize so each R3F canvas measures its container after layout
  // settles — on mount and whenever the filtered set changes.
  useEffect(() => {
    const t = setTimeout(() => window.dispatchEvent(new Event('resize')), 150)
    return () => clearTimeout(t)
  }, [filter])

  return (
    <>
      {/* Full-width LetterGlitch hero header — breaks out of the page container */}
      <div className="page-hero reveal">
        <div className="page-hero-bg">
          <LetterGlitch
            glitchColors={['#221b4e', '#6d5cff', '#00d4ff']}
            glitchSpeed={45}
            smooth={true}
            outerVignette={true}
            centerVignette={true}
          />
        </div>
        <div className="page-hero-content">
          <p className="eyebrow">Portfolio</p>
          <h1>All <em>Projects</em></h1>
          <p className="lead">
            Full-stack, AI, interactive and e-commerce work — filter by type, or open any
            project for the full case study.
          </p>
        </div>
      </div>

      <div className="page reveal" style={{ paddingTop: '90px' }}>
        {/* Filter bar */}
        <div className="filter-bar" role="group" aria-label="Filter projects by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn${filter === cat ? ' active' : ''}`}
              aria-pressed={filter === cat}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {visible.length === 0 ? (
          <p className="projects-empty">No projects in this category yet.</p>
        ) : (
          <div className="projects-grid">
            {visible.map((p) => (
              <ElectricBorder
                key={p.id}
                className="project-eb"
                color="#6d5cff"
                speed={ebSpeed}
                chaos={0.1}
                borderRadius={12}
              >
                <article className="project-card">
                  <WorkCardCanvas sceneIndex={p.sceneIndex} container=".project-card" />
                  <span className="project-cat">{p.category}</span>
                  <div className="project-body">
                    <h3 className="project-name">{p.name}</h3>
                    <div className="project-tags">
                      {p.tags.map((t) => (
                        <span className="pill" key={t}>{t}</span>
                      ))}
                    </div>
                    <p className="project-desc">{p.description}</p>
                    <div className="project-actions">
                      <a
                        className="btn btn-sm"
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Live →
                      </a>
                      <button className="btn btn-sm ghost" onClick={() => setActive(p)}>
                        Details →
                      </button>
                    </div>
                  </div>
                </article>
              </ElectricBorder>
            ))}
          </div>
        )}
      </div>

      <section className="cta-band reveal">
        <p className="pre">Have a project in mind?</p>
        <h2><Link to="/contact">Let's build it ↗</Link></h2>
      </section>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </>
  )
}
