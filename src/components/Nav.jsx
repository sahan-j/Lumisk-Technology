import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => { setOpen(false) }, [location.pathname])

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname === path
  }

  // Scramble effect on nav link hover
  const CH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*<>/'
  const scramble = (el) => {
    const text = el.getAttribute('data-text') || el.textContent
    el.setAttribute('data-text', text)
    let frame = 0
    const dur = text.length * 2 + 20
    const tick = () => {
      let out = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') { out += ' '; continue }
        if (frame > i * 2 + 8) out += text[i]
        else out += CH[(Math.random() * CH.length) | 0]
      }
      el.textContent = out
      frame++
      if (frame < dur) requestAnimationFrame(tick)
      else el.textContent = text
    }
    tick()
  }

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/work', label: 'Work' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <nav>
      <Link to="/" className="logo">Lumisk°</Link>
      <button className="menu-btn" aria-label="Toggle menu" onClick={() => setOpen(o => !o)}>
        {open ? 'Close' : 'Menu'}
      </button>
      <div className={`nav-links${open ? ' open' : ''}`}>
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={isActive(to) ? 'active' : ''}
            onMouseEnter={e => scramble(e.currentTarget)}
          >
            {label}
          </Link>
        ))}
        <a
          href="https://wa.me/94773243784"
          className="nav-cta"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
        >Hire Me</a>
      </div>
    </nav>
  )
}
