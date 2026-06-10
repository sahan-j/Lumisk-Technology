import { useEffect, useRef } from 'react'

export default function WebGLBackground() {
  const ref = useRef(null)

  useEffect(() => {
    let cancelled = false
    let animId = null
    let renderer = null
    let mouseFn = null
    let resizeFn = null

    // Dynamic import — the three-*.js chunk (597 kB) is NOT in the initial
    // bundle. Its load + evaluation is scheduled in an idle period so the heavy
    // work yields to first paint / hydration and stays out of the interactive
    // window (TBT). The loader covers the canvas while this spins up, and the
    // idle timeout guarantees it still runs promptly if the tab stays busy.
    const run = async () => {
      if (cancelled) return
      const canvas = ref.current
      if (!canvas) return

      const THREE = await import('three')
      if (cancelled) return

      const REDUCED = window.matchMedia('(prefers-reduced-motion:reduce)').matches
      const MOBILE  = window.matchMedia('(max-width:820px)').matches

      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false })
      renderer.setPixelRatio(Math.min(devicePixelRatio, MOBILE ? 1 : 1.5))
      renderer.setSize(innerWidth, innerHeight)

      const scene   = new THREE.Scene()
      const camera  = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
      const uniforms = {
        uTime:  { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uRes:   { value: new THREE.Vector2(innerWidth, innerHeight) },
      }

      const vert = 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position,1.0); }'
      const frag = [
        'precision highp float;',
        'uniform float uTime; uniform vec2 uMouse; uniform vec2 uRes; varying vec2 vUv;',
        'float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
        'float noise(vec2 p){vec2 i=floor(p),f=fract(p);float a=hash(i),b=hash(i+vec2(1.,0.)),c=hash(i+vec2(0.,1.)),d=hash(i+vec2(1.,1.));vec2 u=f*f*(3.-2.*f);return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;}',
        'float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p*=2.;a*=.5;}return v;}',
        'void main(){vec2 uv=vUv;float ar=uRes.x/uRes.y;vec2 p=vec2(uv.x*ar,uv.y)*3.0;float t=uTime*0.04;',
        'vec2 q=vec2(fbm(p+t),fbm(p+vec2(5.2,1.3)-t));',
        'float n=fbm(p+q*1.6+t*0.5);',
        'float md=distance(vec2(uv.x*ar,uv.y),vec2(uMouse.x*ar,uMouse.y));',
        'n+=smoothstep(0.45,0.0,md)*0.28;',
        'vec3 c1=vec3(0.015,0.015,0.045);vec3 c2=vec3(0.17,0.10,0.42);vec3 c3=vec3(0.0,0.34,0.55);',
        'vec3 col=mix(c1,c2,smoothstep(0.2,0.72,n));',
        'col=mix(col,c3,smoothstep(0.62,0.96,n)*0.55);',
        'col*=0.62;',
        'gl_FragColor=vec4(col,1.0);}',
      ].join('\n')

      const quad = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms })
      )
      scene.add(quad)

      mouseFn  = e => uniforms.uMouse.value.set(e.clientX / innerWidth, 1 - e.clientY / innerHeight)
      resizeFn = () => { renderer.setSize(innerWidth, innerHeight); uniforms.uRes.value.set(innerWidth, innerHeight) }
      window.addEventListener('mousemove', mouseFn)
      window.addEventListener('resize', resizeFn)

      if (REDUCED) {
        renderer.render(scene, camera)
      } else {
        const loop = () => {
          if (cancelled) return
          animId = requestAnimationFrame(loop)
          uniforms.uTime.value += 1 / 60
          renderer.render(scene, camera)
        }
        loop()
      }
    }

    const ric = window.requestIdleCallback
    const handle = ric ? ric(run, { timeout: 2000 }) : setTimeout(run, 500)

    return () => {
      cancelled = true
      if (ric && window.cancelIdleCallback) window.cancelIdleCallback(handle)
      else clearTimeout(handle)
      if (animId)   cancelAnimationFrame(animId)
      if (mouseFn)  window.removeEventListener('mousemove', mouseFn)
      if (resizeFn) window.removeEventListener('resize', resizeFn)
      if (renderer) renderer.dispose()
    }
  }, [])

  return <canvas id="webgl" ref={ref} />
}
