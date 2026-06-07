import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function WebGLBackground() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const REDUCED = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    const MOBILE = window.matchMedia('(max-width:820px)').matches
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false })
    renderer.setPixelRatio(Math.min(devicePixelRatio, MOBILE ? 1 : 1.5))
    renderer.setSize(innerWidth, innerHeight)
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: { value: new THREE.Vector2(innerWidth, innerHeight) }
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
      'gl_FragColor=vec4(col,1.0);}'
    ].join('\n')
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2,2), new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms }))
    scene.add(quad)
    const onMouse = e => uniforms.uMouse.value.set(e.clientX/innerWidth, 1-e.clientY/innerHeight)
    window.addEventListener('mousemove', onMouse)
    let animId
    if (REDUCED) {
      renderer.render(scene, camera)
    } else {
      const loop = () => { animId = requestAnimationFrame(loop); uniforms.uTime.value += 1/60; renderer.render(scene, camera) }
      loop()
    }
    const onResize = () => { renderer.setSize(innerWidth,innerHeight); uniforms.uRes.value.set(innerWidth,innerHeight) }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])
  return <canvas id="webgl" ref={ref} />
}
