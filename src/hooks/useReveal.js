import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useReveal() {
  const location = useLocation()
  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') }),
      { threshold: 0.15 }
    )
    document.querySelectorAll('.reveal, .skill-row').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [location.pathname])
}
