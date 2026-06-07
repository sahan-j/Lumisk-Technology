import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useMagnetic() {
  const location = useLocation()
  useEffect(() => {
    const MOBILE = window.matchMedia('(max-width:820px)').matches
    const REDUCED = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    if (MOBILE || REDUCED) return
    const elements = document.querySelectorAll('[data-magnetic],.btn,.nav-cta')
    const handlers = Array.from(elements).map(el => {
      let rect
      const enter = () => { rect = el.getBoundingClientRect() }
      const move = e => {
        if (!rect) rect = el.getBoundingClientRect()
        const mx = e.clientX - (rect.left + rect.width/2)
        const my = e.clientY - (rect.top + rect.height/2)
        el.style.transform = `translate(${mx*.3}px,${my*.4}px)`
      }
      const leave = () => { el.style.transform = '' }
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mousemove', move)
      el.addEventListener('mouseleave', leave)
      return { el, enter, move, leave }
    })
    return () => {
      handlers.forEach(({ el, enter, move, leave }) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mousemove', move)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [location.pathname])
}
