import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal.js'
import { useMagnetic } from '../hooks/useMagnetic.js'
import WorkCardCanvas from '../components/WorkCardCanvas.jsx'
import Antigravity from '../components/Antigravity.jsx'
import Seo from '../components/Seo.jsx'
import { pageMeta, webPageSchema, itemListSchema } from '../data/siteMeta.js'
import { projects } from '../data/projects.js'

export default function Work() {
  useReveal()
  useMagnetic()

  // Nudge a resize after mount so the R3F canvas measures its container
  // once the full-width hero's CSS layout has resolved
  useEffect(() => {
    const t = setTimeout(() => window.dispatchEvent(new Event('resize')), 150)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <Seo
        title={pageMeta['/work'].title}
        description={pageMeta['/work'].description}
        path="/work"
        jsonLd={[
          webPageSchema('/work', pageMeta['/work'].title, pageMeta['/work'].description),
          itemListSchema(projects),
        ]}
      />
      {/* Full-width Antigravity hero header — breaks out of the page container */}
      <div className="page-hero reveal">
        <div className="page-hero-bg">
          <Antigravity
            count={1100}
            magnetRadius={24}
            ringRadius={12}
            waveSpeed={1.5}
            waveAmplitude={1.6}
            particleSize={1.5}
            lerpSpeed={0.04}
            color="#6d5cff"
            autoAnimate={true}
            particleVariance={1}
            rotationSpeed={0.3}
            depthFactor={1.4}
          />
        </div>
        <div className="page-hero-content">
          <p className="eyebrow">Selected Work</p>
          <h1>Things I've<br /><em>built</em> recently</h1>
          <p className="lead">A selection of full-stack, AI and interactive projects — each one shipped end to end.</p>
        </div>
      </div>

      <div className="page reveal" style={{ paddingTop: '90px' }}>
        <div className="work-grid">
          <div className="work-card wide" data-scene="0">
            <WorkCardCanvas sceneIndex={0} />
            <div className="work-arrow">↗</div>
            <div className="work-overlay">
              <div className="wtag">Full-stack · AI</div>
              <div className="wname">AI Office Assistant</div>
              <div className="wdesc">A web-based AI system spanning HR, finance and operations — RAG search, automated workflows, and a polished React dashboard.</div>
            </div>
          </div>
          <div className="work-card" data-scene="1">
            <WorkCardCanvas sceneIndex={1} />
            <div className="work-arrow">↗</div>
            <div className="work-overlay">
              <div className="wtag">WebGL · Interactive</div>
              <div className="wname">3D Product Showroom</div>
              <div className="wdesc">An immersive Three.js experience with real-time lighting and smooth scroll choreography.</div>
            </div>
          </div>
          <div className="work-card" data-scene="2">
            <WorkCardCanvas sceneIndex={2} />
            <div className="work-arrow">↗</div>
            <div className="work-overlay">
              <div className="wtag">Data · Dashboard</div>
              <div className="wname">Analytics Platform</div>
              <div className="wdesc">Real-time data visualization built on FastAPI and React with live streaming charts.</div>
            </div>
          </div>
          <div className="work-card" data-scene="3">
            <WorkCardCanvas sceneIndex={3} />
            <div className="work-arrow">↗</div>
            <div className="work-overlay">
              <div className="wtag">Web · E-commerce</div>
              <div className="wname">Online Store</div>
              <div className="wdesc">A fast headless storefront with payment integration and a clean admin experience.</div>
            </div>
          </div>
          <div className="work-card" data-scene="4">
            <WorkCardCanvas sceneIndex={4} />
            <div className="work-arrow">↗</div>
            <div className="work-overlay">
              <div className="wtag">SaaS · Platform</div>
              <div className="wname">Booking System</div>
              <div className="wdesc">Multi-tenant scheduling with slot capacity, reminders and a self-serve dashboard.</div>
            </div>
          </div>
        </div>
      </div>

      <section className="cta-band reveal">
        <p className="pre">Like what you see?</p>
        <h2><Link to="/contact">Build with me ↗</Link></h2>
      </section>
    </>
  )
}
