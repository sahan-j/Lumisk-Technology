import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal.js'
import { useMagnetic } from '../hooks/useMagnetic.js'
import { useCardTilt } from '../hooks/useCardTilt.js'
import Galaxy from '../components/Galaxy.jsx'
import Seo from '../components/Seo.jsx'
import { pageMeta, webPageSchema, serviceSchema, faqSchema, faqs } from '../data/siteMeta.js'

export default function Services() {
  useReveal()
  useMagnetic()
  useCardTilt()

  // Let CSS layout settle before Galaxy measures its container
  useEffect(() => {
    const t = setTimeout(() => window.dispatchEvent(new Event('resize')), 120)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <Seo
        title={pageMeta['/services'].title}
        description={pageMeta['/services'].description}
        path="/services"
        jsonLd={[
          webPageSchema('/services', pageMeta['/services'].title, pageMeta['/services'].description),
          serviceSchema(),
          faqSchema(),
        ]}
      />
      {/* Full-width Galaxy hero header — breaks out of the page container */}
      <div className="page-hero reveal">
        <div className="page-hero-bg">
          <Galaxy
            transparent={true}
            density={3}
            glowIntensity={0.8}
            saturation={1}
            hueShift={180}
            twinkleIntensity={0.2}
            repulsionStrength={5.5}
            starSpeed={0.3}
            speed={0.6}
            mouseInteraction={true}
            mouseRepulsion={true}
          />
        </div>
        <div className="page-hero-content">
          <p className="eyebrow">Services</p>
          <h1>Everything you need<br />to <em>ship</em> online</h1>
          <p className="lead">From custom web apps to AI features and immersive 3D — one developer, full ownership, no hand-offs.</p>
        </div>
      </div>

      <div className="page reveal" style={{ paddingTop: '90px' }}>
        <p className="section-lead" style={{ marginTop: 0, maxWidth: '720px' }}>
          Lumisk Technology offers a comprehensive range of web development services in Sri Lanka.
          Whether you're a startup in Colombo or an established business across Sri Lanka, we deliver
          professional, modern and affordable digital solutions tailored to your needs. Based in
          Colombo, we serve clients across Sri Lanka — from Colombo and Gampaha to Kandy, Galle,
          Matara and beyond.
        </p>
        <div className="services-grid">
          <div className="service-card"><div className="si">/ 01</div><span className="s-arrow" aria-hidden="true">↗</span><h3>Web Applications</h3><p>End-to-end product builds — from interface to API to deployment. Fast, scalable, maintainable systems on React, FastAPI and Node.</p></div>
          <div className="service-card"><div className="si">/ 02</div><span className="s-arrow" aria-hidden="true">↗</span><h3>AI Integration</h3><p>Intelligent features for real products — RAG document search, chat assistants, automated workflows and data extraction powered by the Claude API.</p></div>
          <div className="service-card"><div className="si">/ 03</div><span className="s-arrow" aria-hidden="true">↗</span><h3>Interactive 3D &amp; WebGL</h3><p>Immersive Three.js experiences — particle systems, custom GLSL shaders, and scroll-driven storytelling that makes products genuinely memorable.</p></div>
          <div className="service-card"><div className="si">/ 04</div><span className="s-arrow" aria-hidden="true">↗</span><h3>Backend &amp; API Development</h3><p>Robust REST APIs, clean database architecture, and real-time data pipelines built with Python, FastAPI and Node.js.</p></div>
          <div className="service-card"><div className="si">/ 05</div><span className="s-arrow" aria-hidden="true">↗</span><h3>E-commerce Development</h3><p>Complete online stores — product catalog, cart, checkout, payment integration and admin panel. Optimized for the Sri Lankan market and beyond.</p></div>
          <div className="service-card"><div className="si">/ 06</div><span className="s-arrow" aria-hidden="true">↗</span><h3>Payment Gateway Integration</h3><p>Secure local and international payment flows — PayHere, iPay, Stripe — with order management and automated confirmations.</p></div>
          <div className="service-card"><div className="si">/ 07</div><span className="s-arrow" aria-hidden="true">↗</span><h3>WhatsApp Business Integration</h3><p>Automate customer conversations with WhatsApp Business API — chatbots, lead capture, order updates and CV intake integrated into your workflow.</p></div>
          <div className="service-card"><div className="si">/ 08</div><span className="s-arrow" aria-hidden="true">↗</span><h3>ERP &amp; Business Systems</h3><p>Custom ERP, CRM, inventory and HR systems — web-based, role-based access (RBAC), automated reports and PDF generation.</p></div>
          <div className="service-card"><div className="si">/ 09</div><span className="s-arrow" aria-hidden="true">↗</span><h3>UI / UX Design</h3><p>Modern, intuitive interfaces designed to convert — from wireframes to pixel-perfect implementation across all devices.</p></div>
          <div className="service-card"><div className="si">/ 10</div><span className="s-arrow" aria-hidden="true">↗</span><h3>Mobile-First Web Apps</h3><p>Progressive web apps and responsive builds that feel native on mobile — fast, installable, and offline-capable.</p></div>
          <div className="service-card"><div className="si">/ 11</div><span className="s-arrow" aria-hidden="true">↗</span><h3>Cloud &amp; VPS Deployment</h3><p>Production deployment on VPS and shared hosting — Nginx, SSL, CI/CD pipelines, domain setup and ongoing server management.</p></div>
          <div className="service-card"><div className="si">/ 12</div><span className="s-arrow" aria-hidden="true">↗</span><h3>Maintenance &amp; SEO</h3><p>Performance tuning, Core Web Vitals optimization, technical SEO, security updates and monthly maintenance to keep everything running fast and ranking well.</p></div>
        </div>
      </div>

      <section className="section reveal">
        <div className="section-head"><span className="section-num">01</span><span className="section-title">Tech stack</span></div>
        <div className="tech-grid">
          <div className="tech-cell"><div className="tdot">R</div><span>React</span></div>
          <div className="tech-cell"><div className="tdot">TW</div><span>Tailwind</span></div>
          <div className="tech-cell"><div className="tdot">Py</div><span>Python</span></div>
          <div className="tech-cell"><div className="tdot">FA</div><span>FastAPI</span></div>
          <div className="tech-cell"><div className="tdot">N</div><span>Node.js</span></div>
          <div className="tech-cell"><div className="tdot">3D</div><span>Three.js</span></div>
          <div className="tech-cell"><div className="tdot">AI</div><span>Claude API</span></div>
          <div className="tech-cell"><div className="tdot">DB</div><span>SQL</span></div>
          <div className="tech-cell"><div className="tdot">La</div><span>Laravel</span></div>
          <div className="tech-cell"><div className="tdot">My</div><span>MySQL</span></div>
          <div className="tech-cell"><div className="tdot">WA</div><span>WA API</span></div>
          <div className="tech-cell"><div className="tdot">PH</div><span>PayHere</span></div>
        </div>
      </section>

      <section className="section reveal">
        <div className="section-head"><span className="section-num">02</span><span className="section-title">Kind words</span></div>
        <div className="test-grid">
          <div className="test-card">
            <p className="quote">Delivered exactly what we needed, faster than we expected. The attention to detail on both design and code was remarkable.</p>
            <div className="test-author"><div className="test-avatar">AP</div><div><div className="an">Alex Perera</div><div className="ar">Founder, TechStart</div></div></div>
          </div>
          <div className="test-card">
            <p className="quote">One of the few developers who truly understands the full picture — from UX down to infrastructure. A rare find.</p>
            <div className="test-author"><div className="test-avatar">SF</div><div><div className="an">Sara Fernando</div><div className="ar">Product Lead, Nova</div></div></div>
          </div>
          <div className="test-card">
            <p className="quote">The 3D experience built for us blew the team away. Smooth, performant, genuinely memorable.</p>
            <div className="test-author"><div className="test-avatar">MR</div><div><div className="an">Michael Roy</div><div className="ar">Creative Director</div></div></div>
          </div>
          <div className="test-card">
            <p className="quote">Communicative, reliable, seriously skilled. The AI features saved our team hours every week.</p>
            <div className="test-author"><div className="test-avatar">DK</div><div><div className="an">Dilini Kumari</div><div className="ar">Ops Manager</div></div></div>
          </div>
        </div>
      </section>

      <section className="section reveal">
        <div className="section-head"><span className="section-num">03</span><span className="section-title">Pricing</span></div>
        <p className="section-lead">Transparent, fixed-scope pricing — no surprise invoices. Domain and hosting fees are not included.</p>
        <div className="pricing-grid">

          <div className="pricing-card">
            <div className="pricing-tier">Lite</div>
            <h3 className="pricing-name">Quick Start</h3>
            <div className="pricing-amount">
              <small>from</small>
              <strong>LKR 25,000</strong>
            </div>
            <ul className="pricing-features">
              <li>Up to 2 pages</li>
              <li>Mobile responsive design</li>
              <li>Basic SEO setup</li>
              <li>Contact form</li>
              <li>3 months free support</li>
            </ul>
            <a
              href="https://wa.me/94773243784?text=Hi%20Lumisk%20Technology%2C%20I%27m%20interested%20in%20the%20Lite%20package%20(LKR%2025%2C000).%20Can%20you%20send%20me%20a%20quote%3F"
              className="btn ghost btn-full"
              target="_blank"
              rel="noopener noreferrer"
            >Get a quote →</a>
          </div>

          <div className="pricing-card">
            <div className="pricing-tier">Starter</div>
            <h3 className="pricing-name">Web Presence</h3>
            <div className="pricing-amount">
              <small>from</small>
              <strong>LKR 50,000</strong>
            </div>
            <ul className="pricing-features">
              <li>Up to 5 pages</li>
              <li>Mobile responsive design</li>
              <li>SEO optimised</li>
              <li>Contact form</li>
              <li>1 year free maintenance</li>
            </ul>
            <a
              href="https://wa.me/94773243784?text=Hi%20Lumisk%20Technology%2C%20I%27m%20interested%20in%20the%20Starter%20package%20(LKR%2050%2C000).%20Can%20you%20send%20me%20a%20quote%3F"
              className="btn ghost btn-full"
              target="_blank"
              rel="noopener noreferrer"
            >Get a quote →</a>
          </div>

          <div className="pricing-card featured">
            <div className="pricing-popular"><span></span>Most Popular</div>
            <div className="pricing-tier">Business</div>
            <h3 className="pricing-name">Full Web App</h3>
            <div className="pricing-amount">
              <small>from</small>
              <strong>LKR 120,000</strong>
            </div>
            <ul className="pricing-features">
              <li>React frontend</li>
              <li>FastAPI backend</li>
              <li>Database integration</li>
              <li>Auth system</li>
              <li>Admin panel / Backend</li>
              <li>1 year free maintenance</li>
            </ul>
            <a
              href="https://wa.me/94773243784?text=Hi%20Lumisk%20Technology%2C%20I%27m%20interested%20in%20the%20Business%20package%20(LKR%20120%2C000).%20Can%20you%20send%20me%20a%20quote%3F"
              className="btn btn-full"
              target="_blank"
              rel="noopener noreferrer"
            >Get a quote →</a>
          </div>

          <div className="pricing-card">
            <div className="pricing-tier">Enterprise</div>
            <h3 className="pricing-name">AI + Custom</h3>
            <div className="pricing-amount">
              <small>scoped per project</small>
              <strong>Custom</strong>
            </div>
            <ul className="pricing-features">
              <li>AI / Claude API integration</li>
              <li>3D / WebGL experiences</li>
              <li>Role-based access control</li>
              <li>PDF generation</li>
              <li>Everything in Business</li>
              <li>1 year free maintenance</li>
            </ul>
            <a
              href="https://wa.me/94773243784?text=Hi%20Lumisk%20Technology%2C%20I%27m%20interested%20in%20a%20custom%20Enterprise%20solution.%20Can%20we%20discuss%20my%20project%3F"
              className="btn ghost btn-full"
              target="_blank"
              rel="noopener noreferrer"
            >Let's talk →</a>
          </div>

        </div>
      </section>

      <section className="section reveal">
        <div className="section-head"><span className="section-num">04</span><span className="section-title">Terms &amp; Conditions</span></div>
        <p className="section-lead">These terms apply to all projects. Clear expectations from day one — no ambiguity.</p>
        <div className="terms-grid">

          <div className="term-item">
            <div className="term-n">01</div>
            <div className="term-body"><h4>Maintenance &amp; Updates</h4><p>1 year free maintenance from delivery — covers bugs and minor updates. New features are not included and will be quoted separately.</p></div>
          </div>

          <div className="term-item">
            <div className="term-n">02</div>
            <div className="term-body"><h4>Free Implementations</h4><p>The first 2 feature implementations are included at no extra cost. Additional features are quoted based on complexity.</p></div>
          </div>

          <div className="term-item">
            <div className="term-n">03</div>
            <div className="term-body"><h4>Payment Terms</h4><p>50% advance required to begin work; remaining balance due on delivery. Source files are released only after full payment is received.</p></div>
          </div>

          <div className="term-item">
            <div className="term-n">04</div>
            <div className="term-body"><h4>Revisions</h4><p>2 revision rounds per deliverable are included in every project. Additional rounds beyond that are billed at an hourly rate.</p></div>
          </div>

          <div className="term-item">
            <div className="term-n">05</div>
            <div className="term-body"><h4>Client Responsibilities</h4><p>All content, copy, and assets must be provided on schedule. Delays caused by the client do not extend the free maintenance period.</p></div>
          </div>

          <div className="term-item">
            <div className="term-n">06</div>
            <div className="term-body"><h4>Hosting &amp; Domain</h4><p>Hosting and domain registration are the client's responsibility. Setup and configuration assistance is included at no additional cost.</p></div>
          </div>

          <div className="term-item">
            <div className="term-n">07</div>
            <div className="term-body"><h4>Intellectual Property</h4><p>Full ownership of all deliverables — code, designs, and assets — transfers to the client upon receipt of final payment.</p></div>
          </div>

          <div className="term-item">
            <div className="term-n">08</div>
            <div className="term-body"><h4>Confidentiality</h4><p>All client data, business logic, and project details are kept strictly confidential and will never be shared with third parties.</p></div>
          </div>

          <div className="term-item">
            <div className="term-n">09</div>
            <div className="term-body"><h4>Cancellation</h4><p>The advance payment is non-refundable if the project is cancelled after work has started. Work completed to date may be delivered on request.</p></div>
          </div>

          <div className="term-item">
            <div className="term-n">10</div>
            <div className="term-body"><h4>Scope Changes</h4><p>Features or pages added beyond the agreed scope require a separate quote and timeline confirmation before any additional work begins.</p></div>
          </div>

        </div>
      </section>

      <section className="section reveal">
        <div className="section-head"><span className="section-num">05</span><span className="section-title">Frequently Asked Questions</span></div>
        <p className="section-lead">Common questions about web development in Sri Lanka — pricing, timelines, hosting and more.</p>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <details className="faq-item" key={i}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta-band reveal">
        <p className="pre">Have a project in mind?</p>
        <h2><Link to="/contact">Start a project ↗</Link></h2>
      </section>
    </>
  )
}
