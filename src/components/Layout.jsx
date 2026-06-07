import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import WebGLBackground from './WebGLBackground.jsx'
import Loader from './Loader.jsx'
import Cursor from './Cursor.jsx'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import WhatsAppFloat from './WhatsAppFloat.jsx'

export default function Layout({ children }) {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])

  // Scroll progress bar
  useEffect(() => {
    let bar = document.getElementById('progress-bar')
    if (!bar) {
      bar = document.createElement('div')
      bar.id = 'progress-bar'
      document.body.insertBefore(bar, document.body.firstChild)
    }
    const onScroll = () => {
      const max = document.body.scrollHeight - innerHeight
      if (max <= 0) return
      bar.style.width = (window.scrollY / max * 100) + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  // Ambient orbs are rendered in JSX below — no DOM insertion needed

  return (
    <>
      <WebGLBackground />
      <div id="grain" />
      <div id="orbs"><span /><span /></div>
      <Cursor />
      <Loader />
      <Nav />
      <WhatsAppFloat />
      <div className="content">
        {children}
        <Footer />
      </div>
    </>
  )
}
