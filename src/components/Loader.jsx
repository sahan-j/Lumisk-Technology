import { useEffect, useRef, useState } from 'react'
import './Loader.css'

const GREETINGS = ['ආයුබෝවන්', 'Welcome', 'வணக்கம்', 'ようこそ', 'Bienvenue', '你好']
const BOOT = [
  '> npm run build',
  '> initializing webgl…',
  '> compiling shaders…',
  '> assembling scene…',
  '> Sahan J...',
  '>ready ✓',
]

const LOGO = 'Lumisk°'
const DUR = 2200            // ms — progress 0→100 (eased)
const LINE_GAP = 420        // ms between terminal lines
const WORD_GAP = 900        // ms between greetings

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
const lerp = (a, b, t) => a + (b - a) * t

// Decide which loader to show: the full cinematic version only on the first
// load of a browser session; a short logo-fade afterwards (and for reduced
// motion). sessionStorage clears when the tab/window closes.
const pickPhase = () => {
  if (typeof window === 'undefined') return 'full'
  const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches
  const seen = sessionStorage.getItem('loaderSeen') === '1'
  return reduced || seen ? 'short' : 'full'
}

export default function Loader() {
  const [phase] = useState(pickPhase)         // 'full' | 'short'
  const [done, setDone] = useState(false)

  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  const termRef = useRef(null)
  const counterRef = useRef(null)
  const numRef = useRef(null)
  const barRef = useRef(null)
  const wordRef = useRef(null)

  useEffect(() => {
    if (done) return
    const root = rootRef.current
    if (!root) {
      document.body.classList.add('loaded')
      return
    }

    let mounted = true
    let raf = 0
    const timers = []
    const T = (fn, ms) => {
      const id = setTimeout(fn, ms)
      timers.push(id)
      return id
    }
    const finish = () => {
      sessionStorage.setItem('loaderSeen', '1')
      setDone(true)
    }

    // ─────────────────────────────────────────────────────────
    // SHORT VERSION — returning visit (or reduced motion)
    // Quick logo fade-in + 2px bar, ~600ms, no particles/curtain.
    // ─────────────────────────────────────────────────────────
    if (phase === 'short') {
      // logo fades in via CSS animation; just drive the bar + exit
      T(() => { if (barRef.current) barRef.current.style.width = '100%' }, 40)
      T(() => {
        if (!mounted) return
        document.body.classList.add('loaded')
        root.classList.add('fade')
      }, 560)
      T(() => { if (mounted) finish() }, 820)
      return () => {
        mounted = false
        timers.forEach(clearTimeout)
        cancelAnimationFrame(raf)
      }
    }

    // ─────────────────────────────────────────────────────────
    // FULL VERSION — first load of the session
    // ─────────────────────────────────────────────────────────
    const canvas = canvasRef.current
    if (!canvas) {
      document.body.classList.add('loaded')
      finish()
      return
    }

    const REDUCED = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W = 0, H = 0
    let particles = []
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }

    const sizeCanvas = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = Math.floor(W * dpr)
      canvas.height = Math.floor(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const buildParticles = () => {
      const off = document.createElement('canvas')
      off.width = W
      off.height = H
      const octx = off.getContext('2d')
      const fs = Math.min(W * 0.16, 200)
      octx.fillStyle = '#fff'
      octx.font = `800 ${fs}px Syne, sans-serif`
      octx.textAlign = 'center'
      octx.textBaseline = 'middle'
      octx.fillText(LOGO, W / 2, H / 2)

      const data = octx.getImageData(0, 0, W, H).data
      const step = W < 700 ? 7 : 5
      const targets = []
      let minX = Infinity, maxX = -Infinity
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          if (data[(y * W + x) * 4 + 3] > 128) {
            targets.push([x, y])
            if (x < minX) minX = x
            if (x > maxX) maxX = x
          }
        }
      }
      const span = Math.max(1, maxX - minX)
      const c1 = [0x6d, 0x5c, 0xff]   // purple
      const c2 = [0x00, 0xd4, 0xff]   // cyan
      particles = targets.map(([tx, ty]) => {
        const t = (tx - minX) / span
        const r = Math.round(lerp(c1[0], c2[0], t))
        const g = Math.round(lerp(c1[1], c2[1], t))
        const b = Math.round(lerp(c1[2], c2[2], t))
        return {
          tx, ty,
          x: Math.random() * W,
          y: Math.random() * H,
          ph: Math.random() * Math.PI * 2,
          color: `rgb(${r},${g},${b})`,
        }
      })
    }

    const drawParticles = (assemble, now) => {
      ctx.clearRect(0, 0, W, H)
      mouse.x = lerp(mouse.x, mouse.tx, 0.06)
      mouse.y = lerp(mouse.y, mouse.ty, 0.06)
      const px = (mouse.x / W - 0.5) * 18
      const py = (mouse.y / H - 0.5) * 18
      const e = easeOutCubic(assemble)
      const k = 0.02 + 0.13 * e
      const amp = 8 * (1 - e) + 1.3 * e   // big drift before, gentle shimmer after

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const dx = Math.sin(now * 0.0012 + p.ph) * amp + px * e
        const dy = Math.cos(now * 0.0010 + p.ph) * amp + py * e
        p.x += (p.tx + dx - p.x) * k
        p.y += (p.ty + dy - p.y) * k

        ctx.fillStyle = p.color
        ctx.globalAlpha = 0.2                 // soft halo
        ctx.beginPath()
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1                   // sharp core
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, W, H)
      for (const p of particles) {
        ctx.fillStyle = p.color
        ctx.globalAlpha = 0.2
        ctx.beginPath(); ctx.arc(p.tx, p.ty, 6, 0, Math.PI * 2); ctx.fill()
        ctx.globalAlpha = 1
        ctx.beginPath(); ctx.arc(p.tx, p.ty, 2, 0, Math.PI * 2); ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    // counter (eased) with milestone tick
    let lastTen = 0
    const setProgress = (p) => {
      if (numRef.current) numRef.current.textContent = String(Math.round(p))
      if (barRef.current) barRef.current.style.width = p + '%'
      const ten = Math.floor(p / 10)
      if (ten > lastTen) {
        lastTen = ten
        const el = counterRef.current
        if (el) {
          el.style.transform = 'scale(1.07)'
          T(() => { if (el) el.style.transform = 'scale(1)' }, 130)
        }
      }
    }

    // terminal boot lines
    const stripCursor = () => {
      const old = termRef.current && termRef.current.querySelector('.cine-cur')
      if (old) old.remove()
    }
    let li = 0
    const addLine = () => {
      if (!mounted || !termRef.current) return
      stripCursor()
      const div = document.createElement('div')
      div.className = 'cine-ln'
      div.textContent = BOOT[li]
      const cur = document.createElement('span')
      cur.className = 'cine-cur'
      cur.textContent = '▋'
      div.appendChild(cur)
      termRef.current.appendChild(div)
      li++
      if (li < BOOT.length) T(addLine, LINE_GAP)
      else T(stripCursor, 700)
    }

    // word cycle
    let wi = 0
    const cycleWord = () => {
      if (!mounted || !wordRef.current) return
      wordRef.current.style.opacity = '0'
      T(() => {
        if (!mounted || !wordRef.current) return
        wi = (wi + 1) % GREETINGS.length
        wordRef.current.textContent = GREETINGS[wi]
        wordRef.current.style.opacity = '1'
      }, 340)
      T(cycleWord, WORD_GAP)
    }

    // exit sequence (curtain)
    let exited = false
    const startExit = () => {
      if (exited || !mounted) return
      exited = true
      T(() => {
        if (!mounted) return
        root.classList.add('fade')                 // fade stage overlays + canvas
        T(() => {
          if (!mounted) return
          document.body.classList.add('loaded')     // reveal site beneath curtain
          root.classList.add('open')                // panels split + "Welcome." fades in
          T(() => { if (mounted) finish() }, 1150)
        }, 520)
      }, 400)
    }

    // reduced motion path is handled by the short version above, but keep a
    // safe static fallback if a full render is ever forced under reduced motion
    if (REDUCED) {
      const drawWhenReady = () => { sizeCanvas(); buildParticles(); drawStatic() }
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => { if (mounted) drawWhenReady() })
      } else {
        drawWhenReady()
      }
      setProgress(100)
      document.body.classList.add('loaded')
      T(() => { if (mounted) finish() }, 600)
      return () => {
        mounted = false
        timers.forEach(clearTimeout)
        cancelAnimationFrame(raf)
      }
    }

    const onResize = () => { sizeCanvas(); buildParticles() }
    const onMouse = (e) => { mouse.tx = e.clientX; mouse.ty = e.clientY }
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouse)

    sizeCanvas()
    mouse.x = mouse.tx = W / 2
    mouse.y = mouse.ty = H / 2

    const begin = () => {
      if (!mounted) return
      buildParticles()
      const start = performance.now()
      const loop = (now) => {
        if (!mounted) return
        const t = Math.min(1, (now - start) / DUR)
        const progress = easeOutCubic(t) * 100
        const assemble = Math.min(1, progress / 85)
        drawParticles(assemble, now)
        setProgress(progress)
        if (t >= 1) {
          setProgress(100)
          startExit()
          return
        }
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }

    if (wordRef.current) wordRef.current.textContent = GREETINGS[0]
    T(addLine, 250)
    T(cycleWord, WORD_GAP)
    if (document.fonts && document.fonts.load) {
      Promise.race([
        document.fonts.load('800 100px Syne'),
        new Promise((res) => setTimeout(res, 600)),
      ]).then(begin)
    } else {
      begin()
    }

    return () => {
      mounted = false
      timers.forEach(clearTimeout)
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [phase, done])

  if (done) return null

  // ── SHORT render ──────────────────────────────────────────
  if (phase === 'short') {
    return (
      <div className="cine-loader short" ref={rootRef}>
        <div className="cine-glow" />
        <div className="cine-short-logo">{LOGO}</div>
        <div className="cine-bar"><i ref={barRef} /></div>
        <div className="cine-grain" />
      </div>
    )
  }

  // ── FULL render ───────────────────────────────────────────
  return (
    <div className="cine-loader" ref={rootRef}>
      <div className="cine-panel left" />
      <div className="cine-panel right" />
      <div className="cine-stage">
        <div className="cine-glow" />
        <canvas className="cine-canvas" ref={canvasRef} />
        <div className="cine-terminal" ref={termRef} />
        <div className="cine-counter" ref={counterRef}>
          <span className="cine-num" ref={numRef}>0</span>
          <span className="cine-pct">%</span>
        </div>
        <div className="cine-word" ref={wordRef}>{GREETINGS[0]}</div>
        <div className="cine-bar"><i ref={barRef} /></div>
        <div className="cine-grain" />
      </div>
      <div className="cine-welcome">Welcome.</div>
    </div>
  )
}
