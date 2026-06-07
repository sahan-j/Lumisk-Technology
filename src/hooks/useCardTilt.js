import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useCardTilt() {
  const location = useLocation()
  useEffect(() => {
    const MOBILE = window.matchMedia('(max-width:820px)').matches
    const REDUCED = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    if (MOBILE || REDUCED) return
    const cards = document.querySelectorAll('.test-card')
    const handlers = Array.from(cards).map(card => {
      const enter = () => { card.style.transition = 'transform .1s ease,background .4s,border-color .4s,box-shadow .4s' }
      const move = e => {
        const r = card.getBoundingClientRect()
        const x = (e.clientX-r.left)/r.width-.5
        const y = (e.clientY-r.top)/r.height-.5
        card.style.transform = `perspective(900px) rotateX(${-y*5}deg) rotateY(${x*5}deg) translateZ(6px)`
      }
      const leave = () => {
        card.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1),background .4s,border-color .4s,box-shadow .4s'
        card.style.transform = ''
      }
      card.addEventListener('mouseenter', enter)
      card.addEventListener('mousemove', move)
      card.addEventListener('mouseleave', leave)
      return { card, enter, move, leave }
    })
    return () => {
      handlers.forEach(({ card, enter, move, leave }) => {
        card.removeEventListener('mouseenter', enter)
        card.removeEventListener('mousemove', move)
        card.removeEventListener('mouseleave', leave)
      })
    }
  }, [location.pathname])
}
