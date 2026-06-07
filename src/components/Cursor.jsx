import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const MOBILE = window.matchMedia('(max-width:820px)').matches
    const REDUCED = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    if (MOBILE || REDUCED) return

    const cur = document.getElementById('cursor')
    const ring = document.getElementById('cursor-ring')
    if (!cur || !ring) return

    let cx = 0, cy = 0, rx = 0, ry = 0
    const onMove = (e) => {
      cx = e.clientX; cy = e.clientY
      cur.style.left = cx + 'px'; cur.style.top = cy + 'px'
    }
    window.addEventListener('mousemove', onMove)

    let rafId
    const follow = () => {
      rafId = requestAnimationFrame(follow)
      rx += (cx - rx) * 0.18; ry += (cy - ry) * 0.18
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px'
    }
    follow()

    const onOver = (e) => { if (e.target.closest('a,button,[data-hover]')) document.body.classList.add('hovering') }
    const onOut = (e) => { if (e.target.closest('a,button,[data-hover]')) document.body.classList.remove('hovering') }
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div id="cursor" />
      <div id="cursor-ring" />
    </>
  )
}
