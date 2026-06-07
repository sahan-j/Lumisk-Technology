import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroParticles() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const REDUCED = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    const MOBILE = window.matchMedia('(max-width:820px)').matches
    const wrap = canvas.parentElement
    let W = wrap.clientWidth, H = wrap.clientHeight
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setSize(W, H)
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W/H, 0.1, 1000)
    camera.position.z = 7
    const N = MOBILE ? 1800 : 3800
    const targets = [[],[],[],[]]
    const palette = [[.43,.36,1],[0,.83,1],[1,.35,.7],[.3,1,.85]]
    for (let i = 0; i < N; i++) {
      const th=Math.random()*Math.PI*2, ph=Math.acos(2*Math.random()-1), R=2.5
      targets[0].push(R*Math.sin(ph)*Math.cos(th), R*Math.sin(ph)*Math.sin(th), R*Math.cos(ph))
      const u=Math.random()*Math.PI*2, v=Math.random()*Math.PI*2, rt=1.1, rr=2.4
      targets[1].push((rr+rt*Math.cos(v))*Math.cos(u),(rr+rt*Math.cos(v))*Math.sin(u),rt*Math.sin(v))
      const gx=(Math.random()-.5)*7.5, gz=(Math.random()-.5)*7.5
      targets[2].push(gx, Math.sin(gx*.9)*.6+Math.cos(gz*.9)*.6, gz)
      const arm=(i%3)*(Math.PI*2/3), rad=Math.pow(Math.random(),.6)*3.2, ang=rad*1.1+arm+Math.random()*.4
      targets[3].push(Math.cos(ang)*rad,(Math.random()-.5)*.5*(1-rad/3.6),Math.sin(ang)*rad)
    }
    const pos=new Float32Array(N*3), vel=new Float32Array(N*3), col=new Float32Array(N*3)
    for (let j=0;j<N;j++) {
      pos[j*3]=targets[0][j*3]; pos[j*3+1]=targets[0][j*3+1]; pos[j*3+2]=targets[0][j*3+2]
      const c=palette[j%palette.length]; col[j*3]=c[0]; col[j*3+1]=c[1]; col[j*3+2]=c[2]
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos,3))
    geo.setAttribute('color', new THREE.BufferAttribute(col,3))
    const mat = { transparent:true, vertexColors:true, depthWrite:false, blending:THREE.AdditiveBlending }
    const core = new THREE.Points(geo, new THREE.PointsMaterial({...mat, size:.04, opacity:.95}))
    const glow = new THREE.Points(geo, new THREE.PointsMaterial({...mat, size:.12, opacity:.22}))
    scene.add(glow); scene.add(core)
    let target = 0, intervalId
    if (!REDUCED) intervalId = setInterval(() => { target=(target+1)%4 }, 5200)
    const mouse = new THREE.Vector3(999,999,0)
    const raycaster = new THREE.Raycaster()
    const plane = new THREE.Plane(new THREE.Vector3(0,0,1),0)
    const onMouse = e => {
      const r=canvas.getBoundingClientRect()
      const nx=((e.clientX-r.left)/r.width)*2-1, ny=-((e.clientY-r.top)/r.height)*2+1
      raycaster.setFromCamera({x:nx,y:ny},camera)
      raycaster.ray.intersectPlane(plane,mouse)
    }
    if (!MOBILE) window.addEventListener('mousemove', onMouse)
    let t=0, animId
    const loop = () => {
      animId = requestAnimationFrame(loop); t+=.005
      const p=geo.attributes.position.array, tg=targets[target]
      for (let i=0;i<N;i++) {
        const ix=i*3,iy=ix+1,iz=ix+2
        p[ix]+=(tg[ix]-p[ix])*.05+vel[ix]; p[iy]+=(tg[iy]-p[iy])*.05+vel[iy]; p[iz]+=(tg[iz]-p[iz])*.05+vel[iz]
        vel[ix]*=.9; vel[iy]*=.9; vel[iz]*=.9
        if (mouse.x<900) {
          const dx=p[ix]-mouse.x,dy=p[iy]-mouse.y,dz=p[iz]-mouse.z,d2=dx*dx+dy*dy+dz*dz
          if (d2<2.2){const f=(2.2-d2)*.05,inv=1/Math.sqrt(d2+.001);vel[ix]+=dx*inv*f;vel[iy]+=dy*inv*f;vel[iz]+=dz*inv*f}
        }
      }
      geo.attributes.position.needsUpdate=true
      core.rotation.y=glow.rotation.y=t*.5
      core.rotation.x=glow.rotation.x=Math.sin(t*.4)*.12
      renderer.render(scene,camera)
    }
    loop()
    const onResize = () => {
      W=wrap.clientWidth; H=wrap.clientHeight
      camera.aspect=W/H; camera.updateProjectionMatrix(); renderer.setSize(W,H)
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animId); clearInterval(intervalId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])
  return <canvas ref={ref} style={{position:'absolute',inset:0,width:'100%',height:'100%',zIndex:-1}} />
}
