import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useStatCounter() {
  const location = useLocation()
  useEffect(() => {
    const REDUCED = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    if (REDUCED) return
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (!e.isIntersecting) return
        const el = e.target
        const raw = el.getAttribute('data-val') || el.textContent.trim()
        el.setAttribute('data-val', raw)
        const num = parseFloat(raw)
        if (isNaN(num)) { io.unobserve(el); return }
        const suffix = raw.replace(num+'','')
        let t0 = null
        const dur = 1300
        const step = ts => {
          if (!t0) t0 = ts
          const p = Math.min((ts-t0)/dur, 1)
          const ease = 1 - Math.pow(1-p, 3)
          el.textContent = Math.round(ease*num) + suffix
          if (p < 1) requestAnimationFrame(step)
          else el.textContent = raw
        }
        requestAnimationFrame(step)
        io.unobserve(el)
      })
    }, { threshold: 0.5 })
    document.querySelectorAll('.stat .n').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [location.pathname])
}
