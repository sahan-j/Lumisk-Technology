import { useEffect, useRef } from 'react'

// Three.js is loaded on demand (see below). The scene builders use this
// module-level binding, which is assigned once the dynamic import resolves —
// before any builder runs — so the `three` chunk stays out of the home
// page's critical path.
let THREE = null

function blobs(sc, pal) {
  var arr = []
  for (var i = 0; i < 5; i++) {
    var c = pal[i % pal.length]
    var m = new THREE.Mesh(
      new THREE.IcosahedronGeometry(.6 + Math.random() * .6, 2),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(c[0], c[1], c[2]), wireframe: true, transparent: true, opacity: .45 })
    )
    m.position.set((Math.random() - .5) * 3, (Math.random() - .5) * 2, (Math.random() - .5) * 2)
    m.userData.s = [(Math.random() - .5) * .012, (Math.random() - .5) * .012]
    sc.add(m); arr.push(m)
  }
  return function(t) { arr.forEach(function(b) { b.rotation.x += b.userData.s[0]; b.rotation.y += b.userData.s[1] }) }
}

function wave(sc, pal) {
  var SX = 26, SY = 26, N = SX * SY, pos = new Float32Array(N * 3), col = new Float32Array(N * 3), k = 0
  var c = pal[0]
  for (var x = 0; x < SX; x++) for (var y = 0; y < SY; y++) {
    pos[k*3] = (x/SX - .5) * 6; pos[k*3+1] = (y/SY - .5) * 6; pos[k*3+2] = 0
    col[k*3] = c[0]; col[k*3+1] = c[1]; col[k*3+2] = c[2]; k++
  }
  var g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  g.setAttribute('color', new THREE.BufferAttribute(col, 3))
  var pts = new THREE.Points(g, new THREE.PointsMaterial({ size: .07, vertexColors: true, transparent: true, opacity: .8, blending: THREE.AdditiveBlending, depthWrite: false }))
  pts.rotation.x = -1.0; sc.add(pts)
  return function(t) {
    var p = g.attributes.position.array
    for (var i = 0; i < N; i++) {
      var px = p[i*3], py = p[i*3+1]
      p[i*3+2] = Math.sin(px*1.1+t*2)*.5 + Math.cos(py*1.1+t*1.6)*.5
    }
    g.attributes.position.needsUpdate = true; pts.rotation.z = t * .15
  }
}

function plexus(sc, pal) {
  var N = 34, nodes = [], c = pal[0]
  var pos = new Float32Array(N * 3), col = new Float32Array(N * 3)
  for (var i = 0; i < N; i++) {
    var v = { p: new THREE.Vector3((Math.random()-.5)*5, (Math.random()-.5)*4, (Math.random()-.5)*3), v: new THREE.Vector3((Math.random()-.5)*.01, (Math.random()-.5)*.01, (Math.random()-.5)*.01) }
    nodes.push(v); col[i*3] = c[0]; col[i*3+1] = c[1]; col[i*3+2] = c[2]
  }
  var pg = new THREE.BufferGeometry()
  pg.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  pg.setAttribute('color', new THREE.BufferAttribute(col, 3))
  var dots = new THREE.Points(pg, new THREE.PointsMaterial({ size: .11, vertexColors: true, transparent: true, opacity: .9, blending: THREE.AdditiveBlending, depthWrite: false }))
  sc.add(dots)
  var lg = new THREE.BufferGeometry(), lpos = new Float32Array(N * N * 6)
  lg.setAttribute('position', new THREE.BufferAttribute(lpos, 3))
  var lines = new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: new THREE.Color(c[0], c[1], c[2]), transparent: true, opacity: .18 }))
  sc.add(lines)
  return function(t) {
    var p = pg.attributes.position.array
    for (var i = 0; i < N; i++) {
      var n = nodes[i]; n.p.add(n.v)
      ;['x','y','z'].forEach(function(ax, ai) { var lim = [2.6,2.1,1.6][ai]; if (n.p[ax] > lim || n.p[ax] < -lim) n.v[ax] *= -1 })
      p[i*3] = n.p.x; p[i*3+1] = n.p.y; p[i*3+2] = n.p.z
    }
    pg.attributes.position.needsUpdate = true
    var li = 0
    for (var a = 0; a < N; a++) for (var b = a+1; b < N; b++) {
      if (nodes[a].p.distanceTo(nodes[b].p) < 1.6) {
        lpos[li++] = nodes[a].p.x; lpos[li++] = nodes[a].p.y; lpos[li++] = nodes[a].p.z
        lpos[li++] = nodes[b].p.x; lpos[li++] = nodes[b].p.y; lpos[li++] = nodes[b].p.z
      }
    }
    for (var z = li; z < lpos.length; z++) lpos[z] = 0
    lg.attributes.position.needsUpdate = true; lg.setDrawRange(0, li/3)
    dots.rotation.y = lines.rotation.y = t * .18
  }
}

function knot(sc, pal) {
  var c = pal[0]
  var m = new THREE.Mesh(new THREE.TorusKnotGeometry(1.7, .5, 90, 12, 2, 3), new THREE.MeshBasicMaterial({ color: new THREE.Color(c[0], c[1], c[2]), wireframe: true, transparent: true, opacity: .5 }))
  sc.add(m)
  var c2 = pal[1] || pal[0]
  var m2 = new THREE.Mesh(new THREE.TorusKnotGeometry(2.3, .12, 120, 8, 2, 3), new THREE.MeshBasicMaterial({ color: new THREE.Color(c2[0], c2[1], c2[2]), wireframe: true, transparent: true, opacity: .25 }))
  sc.add(m2)
  return function(t) { m.rotation.x = t*.4; m.rotation.y = t*.55; m2.rotation.x = -t*.3; m2.rotation.z = t*.4 }
}

function cubes(sc, pal) {
  var arr = []
  for (var i = 0; i < 14; i++) {
    var c = pal[i % pal.length]; var s = .4 + Math.random() * .7
    var m = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), new THREE.MeshBasicMaterial({ color: new THREE.Color(c[0], c[1], c[2]), wireframe: true, transparent: true, opacity: .5 }))
    m.position.set((Math.random()-.5)*5, (Math.random()-.5)*4, (Math.random()-.5)*3)
    m.userData = { s: [(Math.random()-.5)*.02, (Math.random()-.5)*.02], fy: Math.random()*6.28, fa: .3+Math.random()*.4, by: m.position.y }
    sc.add(m); arr.push(m)
  }
  return function(t) {
    arr.forEach(function(b) {
      b.rotation.x += b.userData.s[0]; b.rotation.y += b.userData.s[1]
      b.position.y = b.userData.by + Math.sin(t*1.2 + b.userData.fy) * b.userData.fa
    })
  }
}

function globe(sc, pal) {
  var N = 900, pos = new Float32Array(N*3), col = new Float32Array(N*3), c = pal[0], c2 = pal[1] || pal[0]
  for (var i = 0; i < N; i++) {
    var th = Math.random()*Math.PI*2, ph = Math.acos(2*Math.random()-1), R = 2.4
    pos[i*3] = R*Math.sin(ph)*Math.cos(th); pos[i*3+1] = R*Math.sin(ph)*Math.sin(th); pos[i*3+2] = R*Math.cos(ph)
    var cc = Math.random() < .5 ? c : c2; col[i*3] = cc[0]; col[i*3+1] = cc[1]; col[i*3+2] = cc[2]
  }
  var g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  g.setAttribute('color', new THREE.BufferAttribute(col, 3))
  var pts = new THREE.Points(g, new THREE.PointsMaterial({ size: .05, vertexColors: true, transparent: true, opacity: .9, blending: THREE.AdditiveBlending, depthWrite: false }))
  sc.add(pts)
  var ring = new THREE.Mesh(new THREE.TorusGeometry(3, .01, 2, 80), new THREE.MeshBasicMaterial({ color: new THREE.Color(c2[0], c2[1], c2[2]), transparent: true, opacity: .3 }))
  ring.rotation.x = 1.4; sc.add(ring)
  return function(t) { pts.rotation.y = t*.3; ring.rotation.z = t*.4 }
}

const SCENES = [
  { fn: blobs, pal: [[.43,.36,1],[.55,.3,1]] },
  { fn: wave,  pal: [[0,.83,1],[.2,.5,1]] },
  { fn: plexus,pal: [[1,.35,.7],[1,.5,.3]] },
  { fn: knot,  pal: [[.3,1,.85],[0,.7,.6]] },
  { fn: cubes, pal: [[1,.62,.15],[1,.4,.2]] },
  { fn: globe, pal: [[.43,.36,1],[0,.83,1]] },
]

export default function WorkCardCanvas({ sceneIndex = 0, container = '.work-card' }) {
  const ref = useRef(null)
  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const card = cv.closest(container) || cv

    let disposed = false
    let rn = null, sc, cam, update
    let running = false, t = 0, raf = 0, lastW = 0, lastH = 0
    let io = null, ro = null
    let visible = false, building = false

    // Sync renderer + camera to the canvas's *actual* box. Uses clientWidth/
    // clientHeight (the laid-out CSS box), never offsetWidth or fixed values.
    const syncSize = () => {
      if (!rn) return
      const w = cv.clientWidth, h = cv.clientHeight
      if (w > 0 && h > 0 && (w !== lastW || h !== lastH)) {
        lastW = w; lastH = h
        rn.setSize(w, h, false)            // false → keep our CSS 100% sizing
        cam.aspect = w / h                 // (4) keep aspect in sync on resize
        cam.updateProjectionMatrix()
      }
    }

    // Build the WebGL renderer. Deferred until the card is near the viewport,
    // so the three chunk + scene init never run on the home page's initial
    // load (the cards sit below the hero). Idempotent and only proceeds once
    // the canvas has real, non-zero dimensions.
    const build = async () => {
      if (disposed || rn || building) return
      const w0 = cv.clientWidth, h0 = cv.clientHeight
      if (w0 === 0 || h0 === 0) return     // wait for layout (ResizeObserver retriggers)
      building = true

      // Dynamic import — keeps `three` out of the initial bundle. Shared chunk,
      // so it's only fetched/evaluated once across the whole app.
      if (!THREE) THREE = await import('three')
      if (disposed) { building = false; return }

      const w = cv.clientWidth, h = cv.clientHeight
      if (w === 0 || h === 0) { building = false; return }

      let renderer
      try {
        renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true })
      } catch (e) {
        building = false                   // transient GL failure → let a later trigger retry
        return
      }
      rn = renderer
      if (ro) { ro.disconnect(); ro = null }
      rn.setPixelRatio(Math.min(devicePixelRatio, 1.5))
      const def = SCENES[sceneIndex % SCENES.length]
      sc = new THREE.Scene()
      cam = new THREE.PerspectiveCamera(55, w / h, 0.1, 100)
      cam.position.z = 6
      rn.setSize(w, h, false)              // size from real clientWidth/Height
      lastW = w; lastH = h
      update = def.fn(sc, def.pal)
      rn.render(sc, cam)                   // paint one frame now — no blank flash

      window.addEventListener('resize', syncSize)

      const loop = () => {
        raf = requestAnimationFrame(loop)
        if (!running) return
        syncSize()                          // also catches container-driven reflow
        t += 0.012
        update(t)
        rn.render(sc, cam)
      }
      raf = requestAnimationFrame(loop)
    }

    // Single observer: gates the (deferred) build the first time the card nears
    // the viewport, and pauses the render loop whenever it's fully offscreen.
    io = new IntersectionObserver(
      es => es.forEach(e => {
        running = e.isIntersecting
        if (e.isIntersecting) { visible = true; build() }
      }),
      { rootMargin: '300px 0px', threshold: 0 }
    )
    io.observe(card)

    // Fallback for the "0 dimensions on first mount" case: if the card is
    // already visible but had no box yet, build once it gains a real size.
    ro = new ResizeObserver(entries => {
      for (const e of entries) {
        if (visible && e.contentRect.width > 0 && e.contentRect.height > 0) { build(); break }
      }
    })
    ro.observe(cv)

    return () => {
      disposed = true
      if (io) io.disconnect()
      if (ro) ro.disconnect()
      window.removeEventListener('resize', syncSize)
      cancelAnimationFrame(raf)
      if (rn) { rn.dispose(); rn = null }
    }
  }, [sceneIndex, container])

  return <canvas ref={ref} style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} />
}
