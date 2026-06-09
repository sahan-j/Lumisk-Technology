import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import { useMagnetic } from '../hooks/useMagnetic.js'
import Hyperspeed from '../components/Hyperspeed.jsx'
import Seo from '../components/Seo.jsx'
import { pageMeta, webPageSchema } from '../data/siteMeta.js'

export default function Contact() {
  useReveal()
  useMagnetic()

  // Nudge a resize after mount so the Hyperspeed canvas measures the hero
  // once the full-width layout has resolved
  useEffect(() => {
    const t = setTimeout(() => window.dispatchEvent(new Event('resize')), 150)
    return () => clearTimeout(t)
  }, [])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  return (
    <>
      <Seo
        title={pageMeta['/contact'].title}
        description={pageMeta['/contact'].description}
        path="/contact"
        jsonLd={webPageSchema('/contact', pageMeta['/contact'].title, pageMeta['/contact'].description)}
      />
      {/* Full-width Hyperspeed hero header — breaks out of the page container */}
      <div className="page-hero reveal">
        <div className="page-hero-bg">
          <Hyperspeed />
        </div>
        <div className="page-hero-content">
          <p className="eyebrow">Contact</p>
          <h1>Let's build<br />something <em>good</em></h1>
          <p className="lead">Have a project, a question, or just want to say hi? Drop a message — I usually reply within a day.</p>
        </div>
      </div>

      <div className="page reveal" style={{ paddingTop: '90px' }}>
        <p className="section-lead" style={{ marginTop: 0, maxWidth: '620px' }}>
          Ready to build your website or web application? Lumisk Technology offers free initial
          consultations for businesses across Sri Lanka. Get in touch today and let's discuss your
          project.
        </p>
        <div className="contact-wrap">
          <div className="contact-info">
            <h3>Email</h3>
            <a href="mailto:hello@lumisktechnology.com">hello@lumisktechnology.com</a>
            <h3>Phone</h3>
            <a href="tel:+94773243784">+94 77 324 3784</a>
            <h3>Location</h3>
            <p>📍 Colombo, Sri Lanka — serving clients nationwide</p>
            <h3>Elsewhere</h3>
            <div className="contact-socials">
              <a href="https://github.com/sahan-j">Github</a>
              <a href="https://www.linkedin.com/in/sahan-j/">LinkedIn</a>
              <a href="https://www.facebook.com/sahanadithyajayalath">facebook</a>
            </div>
          </div>
          <div className="contact-form">
            <div className="field">
              <label htmlFor="cf-name">Name</label>
              <input
                type="text"
                id="cf-name"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="cf-email">Email</label>
              <input
                type="email"
                id="cf-email"
                placeholder="you@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="cf-msg">Message</label>
              <textarea
                id="cf-msg"
                placeholder="Tell me about your project"
                value={msg}
                onChange={e => setMsg(e.target.value)}
              />
            </div>
            <a
              className="btn"
              href="https://wa.me/94773243784"
              target="_blank"
              rel="noopener noreferrer"
            >Send message</a>
          </div>
        </div>
      </div>
    </>
  )
}
