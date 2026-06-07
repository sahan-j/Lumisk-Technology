import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal.js'
import { useMagnetic } from '../hooks/useMagnetic.js'
import HeroParticles from '../components/HeroParticles.jsx'
import WorkCardCanvas from '../components/WorkCardCanvas.jsx'

export default function Home() {
  useReveal()
  useMagnetic()

  useEffect(() => {
    const CH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*<>/'
    const run = (el) => {
      const text = el.getAttribute('data-text') || el.textContent
      el.setAttribute('data-text', text)
      const REDUCED = window.matchMedia('(prefers-reduced-motion:reduce)').matches
      if (REDUCED) { el.textContent = text; return }
      let frame = 0
      const dur = text.length * 2 + 20
      const tick = () => {
        let out = ''
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') { out += ' '; continue }
          if (frame > i*2+8) out += text[i]
          else out += CH[(Math.random()*CH.length)|0]
        }
        el.textContent = out; frame++
        if (frame < dur) requestAnimationFrame(tick)
        else el.textContent = text
      }
      tick()
    }
    const waitForLoad = setInterval(() => {
      if (document.body.classList.contains('loaded')) {
        clearInterval(waitForLoad)
        document.querySelectorAll('[data-scramble]').forEach((el, i) => {
          setTimeout(() => run(el), 150 * i)
        })
      }
    }, 80)
    return () => clearInterval(waitForLoad)
  }, [])

  return (
    <>
      <section className="hero">
        <HeroParticles />
        <p className="eyebrow"><span>Full-stack Developer · Sri Lanka</span></p>
        <h1>
          <span className="line"><span data-scramble>I build digital</span></span>
          <span className="line"><span><em>experiences</em> that work</span></span>
        </h1>
        <p>Crafting fast, thoughtful products end to end — from interface to infrastructure, blending design sensibility with engineering depth.</p>
        <div className="hero-cta">
          <Link to="/work" className="btn" data-magnetic>View Work</Link>
          <Link to="/contact" className="btn ghost" data-magnetic>Get in touch</Link>
        </div>
        <div className="scroll-cue"><span>Scroll</span><div className="scroll-line"></div></div>
      </section>

      <section className="section reveal">
        <div className="section-head"><span className="section-num">01</span><span className="section-title">What I do</span></div>
        <div className="services-grid">
          <div className="service-card"><div className="si">/ 01</div><h3>Web Applications</h3><p>End-to-end product builds on React, FastAPI and Node — fast, scalable, and maintainable.</p></div>
          <div className="service-card"><div className="si">/ 02</div><h3>AI Integration</h3><p>RAG document search, chat assistants and automated workflows powered by the Claude API.</p></div>
          <div className="service-card"><div className="si">/ 03</div><h3>Interactive 3D</h3><p>Immersive WebGL experiences with Three.js that make products unforgettable.</p></div>
          <div className="service-card"><div className="si">/ 04</div><h3>Backend &amp; Data</h3><p>Robust APIs, clean database design and real-time pipelines built to grow.</p></div>
        </div>
        <div style={{marginTop:'40px'}}><Link to="/services" className="btn ghost">All services</Link></div>
      </section>

      <section className="section reveal">
        <div className="section-head"><span className="section-num">02</span><span className="section-title">Selected work</span></div>
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
          <div className="work-card" data-scene="3">
            <WorkCardCanvas sceneIndex={3} />
            <div className="work-arrow">↗</div>
            <div className="work-overlay">
              <div className="wtag">WebGL · Interactive</div>
              <div className="wname">3D Showroom</div>
              <div className="wdesc">An immersive Three.js experience with real-time lighting and scroll choreography.</div>
            </div>
          </div>
          <div className="work-card" data-scene="5">
            <WorkCardCanvas sceneIndex={5} />
            <div className="work-arrow">↗</div>
            <div className="work-overlay">
              <div className="wtag">Data · Dashboard</div>
              <div className="wname">Analytics Platform</div>
              <div className="wdesc">Real-time data visualization on FastAPI and React with live streaming charts.</div>
            </div>
          </div>
        </div>
        <div style={{marginTop:'40px'}}><Link to="/work" className="btn ghost">View all work</Link></div>
      </section>

      <section className="cta-band reveal">
        <p className="pre">Let's work together</p>
        <h2><Link to="/contact">Say hello ↗</Link></h2>
      </section>
    </>
  )
}
