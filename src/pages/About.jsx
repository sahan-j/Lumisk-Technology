import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal.js'
import { useMagnetic } from '../hooks/useMagnetic.js'
import { useStatCounter } from '../hooks/useStatCounter.js'
import ProfileCard from '../components/ProfileCard.jsx'
import FallingText from '../components/FallingText.jsx'
import Lightfall from '../components/Lightfall.jsx'

export default function About() {
  useReveal()
  useMagnetic()
  useStatCounter()

  useEffect(() => {
    const t = setTimeout(() => window.dispatchEvent(new Event('resize')), 150)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      {/* Full-width Lightfall hero header — breaks out of the page container */}
      <div className="page-hero reveal">
        <div className="page-hero-bg">
          <Lightfall
            colors={['#6d5cff', '#00d4ff', '#a78bfa', '#38bdf8']}
            backgroundColor="#0d0a2e"
            speed={0.2}
            streakCount={4}
            streakWidth={1.1}
            streakLength={1.3}
            glow={1.2}
            density={1}
            twinkle={0.8}
            zoom={2.4}
            backgroundGlow={0.18}
            opacity={1}
            mouseInteraction={true}
            mouseStrength={0.4}
            mouseRadius={0.6}
            mouseDampening={0.15}
          />
        </div>
        <div className="page-hero-content">
          <p className="eyebrow">About</p>
          <h1>A developer who cares<br />about <em>the whole stack</em></h1>
          <p className="lead">And the details most people never notice — from pixel-perfect interfaces down to the database schema.</p>
        </div>
      </div>

      <div className="page reveal" style={{ paddingTop: '90px' }}>
        <div className="about-grid">
          <p className="about-lead">I design and build <span className="hl">complete web applications</span>, end to end.</p>
          <div>
            <p className="about-body">My work sits at the intersection of clean engineering and considered design. I care as much about how a product feels as how it performs.</p>
            <p className="about-body">Lately I've been building AI-powered systems with the Claude API, real-time interfaces with Three.js, and scalable backends in Python and Node — shipping products that feel as good as they look.</p>
            <div className="about-stats">
              <div className="stat"><div className="n">5+</div><div className="l">Years</div></div>
              <div className="stat"><div className="n">40+</div><div className="l">Projects</div></div>
              <div className="stat"><div className="n">∞</div><div className="l">Curiosity</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* ProfileCard section — FallingText fills the space around the card */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center',
                    alignItems: 'center', padding: '80px 48px', minHeight: '760px',
                    margin: '20px 0', overflow: 'hidden', borderRadius: '4px' }}>
        {/* FallingText backdrop — words tumble with physics when scrolled into view */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <FallingText
            text="Full-stack developer building fast thoughtful digital products with React Python FastAPI PHP AI WebGL and All from interface to infrastructure"
            highlightWords={["React", "Python", "FastAPI", "AI", "WebGL", "PHP", "All", "Full-stack"]}
            highlightClass="highlighted"
            trigger="hover"
            backgroundColor="transparent"
            wireframes={false}
            gravity={0.9}
            fontSize="1.7rem"
            mouseConstraintStiffness={0.12}
          />
        </div>
        {/* ProfileCard sits above the falling text */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <ProfileCard
            name="S. Adithya"
            title="Full-stack Developer · Sri Lanka"
            handle="Lumiska"
            status="Online"
            contactText="Contact Me"
            avatarUrl="avatar.png"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => { window.location.hash = '/contact' }}
            innerGradient="linear-gradient(145deg,#6d5cff44 0%,#00d4ff33 100%)"
            behindGlowEnabled={true}
            behindGlowColor="rgba(109, 92, 255, 0.45)"
            behindGlowSize="55%"
          />
        </div>
      </div>

      <section className="section reveal">
        <div className="section-head"><span className="section-num">01</span><span className="section-title">How I work</span></div>
        <div>
          <div className="process-step"><div className="pn">01</div><div><h3>Discover</h3><p>We start with the problem, not the solution — understanding goals, users and constraints before any code is written.</p></div></div>
          <div className="process-step"><div className="pn">02</div><div><h3>Design</h3><p>Wireframes to high fidelity. Mapping data flows and interfaces so the build phase has zero guesswork.</p></div></div>
          <div className="process-step"><div className="pn">03</div><div><h3>Build</h3><p>Incremental, tested, shipped. Features built and verified one at a time — nothing moves forward until it works.</p></div></div>
          <div className="process-step"><div className="pn">04</div><div><h3>Launch &amp; iterate</h3><p>Deploy, monitor, refine. The first release is the start, not the finish line.</p></div></div>
        </div>
      </section>

      <section className="section reveal">
        <div className="section-head"><span className="section-num">02</span><span className="section-title">Skills</span></div>
        <div className="skill-list">
          <div className="skill-row" style={{'--w':'95%'}}><div className="skill-name">React + Tailwind</div><div className="skill-meta"><span className="skill-tag">Frontend</span><div className="skill-bar"><i></i></div></div></div>
          <div className="skill-row" style={{'--w':'92%'}}><div className="skill-name">Python / FastAPI</div><div className="skill-meta"><span className="skill-tag">Backend</span><div className="skill-bar"><i></i></div></div></div>
          <div className="skill-row" style={{'--w':'90%'}}><div className="skill-name">AI / Claude API</div><div className="skill-meta"><span className="skill-tag">Intelligence</span><div className="skill-bar"><i></i></div></div></div>
          <div className="skill-row" style={{'--w':'88%'}}><div className="skill-name">Node.js</div><div className="skill-meta"><span className="skill-tag">Backend</span><div className="skill-bar"><i></i></div></div></div>
          <div className="skill-row" style={{'--w':'85%'}}><div className="skill-name">Three.js / WebGL</div><div className="skill-meta"><span className="skill-tag">Graphics</span><div className="skill-bar"><i></i></div></div></div>
          <div className="skill-row" style={{'--w':'90%'}}><div className="skill-name">Database / SQL</div><div className="skill-meta"><span className="skill-tag">Data</span><div className="skill-bar"><i></i></div></div></div>
        </div>
      </section>

      <section className="section reveal">
        <div className="section-head"><span className="section-num">03</span><span className="section-title">Experience</span></div>
        <div>
          <div className="exp-item"><div className="exp-year">2023 — Now</div><div><h3>Independent Developer</h3><div className="role">Full-stack · Freelance</div><p>Building complete web products for clients — AI systems, dashboards and interactive sites. Owning everything from design to deployment.</p></div></div>
          <div className="exp-item"><div className="exp-year">2021 — 2023</div><div><h3>Software Engineer</h3><div className="role">Product Team</div><p>Shipped features across the stack on a growing SaaS platform. Frontend in React, backend in Python, focused on performance.</p></div></div>
          <div className="exp-item"><div className="exp-year">2019 — 2021</div><div><h3>Junior Developer</h3><div className="role">Web Studio</div><p>Where it started. Built websites and learned the craft — turning designs into clean, responsive code.</p></div></div>
        </div>
      </section>

      <section className="cta-band reveal">
        <p className="pre">Want to know more?</p>
        <h2><Link to="/contact">Let's talk ↗</Link></h2>
      </section>
    </>
  )
}
