import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'

// Route-level code splitting — each page (and its heavy WebGL deps)
// loads in its own chunk only when navigated to.
const Home = lazy(() => import('./pages/Home.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Services = lazy(() => import('./pages/Services.jsx'))
const Work = lazy(() => import('./pages/Work.jsx'))
const Projects = lazy(() => import('./pages/Projects.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))

export default function App() {
  return (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
