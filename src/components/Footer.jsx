import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="reveal">
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/" className="logo">Lumisk°</Link>
          <p>Full-stack developer building fast, thoughtful digital products end to end — from interface to infrastructure.</p>
        </div>
        <div className="footer-col">
          <h4>Navigate</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/work">Work</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-col">
          <h4>Get in touch</h4>
          <a href="mailto:hello@lumisktechnology.com">hello@lumisktechnology.com</a>
          <a href="tel:+94773243784">+94 77 324 3784</a>
          <a href="#" onClick={e => e.preventDefault()}>Based in Sri Lanka</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© 2026 Lumisktech — Crafted with code &amp; care.</span>
        <div className="footer-social">
          <a href="https://github.com/sahan-j">Github</a>
          <a href="https://www.linkedin.com/in/sahan-j/">LinkedIn</a>
          <a href="https://www.facebook.com/sahanadithyajayalath">facebook</a>
        </div>
      </div>
    </footer>
  )
}
