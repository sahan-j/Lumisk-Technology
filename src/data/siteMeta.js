// ═══════════════════════════════════════════════════════════
// Central SEO source of truth — base URL, per-page meta, FAQ,
// and JSON-LD schema builders. Reused by <Seo/> on every page.
// ═══════════════════════════════════════════════════════════

export const BASE_URL = 'https://lumisktechnology.com'
export const OG_IMAGE = `${BASE_URL}/og-image.png`
export const BUSINESS_ID = `${BASE_URL}/#business`
export const FOUNDER_ID = `${BASE_URL}/#founder`

// ── Per-route meta (titles/descriptions tuned for Sri Lanka) ──
export const pageMeta = {
  '/': {
    title: 'Web Development Company Sri Lanka | React, AI & 3D | Lumisk Technology',
    description:
      'Professional web development company in Colombo, Sri Lanka. Custom web apps, AI integration, e-commerce & 3D experiences. Starting from LKR 25,000. Free consultation.',
  },
  '/services': {
    title: 'Web Development Services Sri Lanka | AI, React, E-commerce | Lumisk Technology',
    description:
      'Professional web development services in Sri Lanka — web apps, AI integration, e-commerce, WhatsApp automation, ERP systems & 3D experiences. Packages from LKR 25,000.',
  },
  '/about': {
    title: 'About Us | Full-stack Web Developer Colombo Sri Lanka | Lumisk Technology',
    description:
      'Lumisk Technology — a full-stack web development studio in Colombo, Sri Lanka. Specializing in React, FastAPI, AI integration and Three.js 3D. 5+ years experience.',
  },
  '/work': {
    title: 'Portfolio | Web Development Projects Sri Lanka | Lumisk Technology',
    description:
      'View our portfolio of web applications, AI systems, e-commerce platforms and 3D interactive experiences built for clients across Sri Lanka.',
  },
  '/projects': {
    title: 'All Projects | Web Apps, AI & E-commerce | Lumisk Technology Sri Lanka',
    description:
      'Complete portfolio of web development projects — AI Office Assistants, e-commerce platforms, booking systems and interactive 3D experiences built in Sri Lanka.',
  },
  '/contact': {
    title: 'Contact | Hire a Web Developer in Sri Lanka | Free Consultation | Lumisk Technology',
    description:
      'Get in touch with Lumisk Technology — web development studio in Colombo, Sri Lanka. Free consultation available. WhatsApp: +94 77 324 3784. Fast response guaranteed.',
  },
}

// ── FAQ (Services page + FAQPage schema) ─────────────────────
export const faqs = [
  {
    q: 'How much does a website cost in Sri Lanka?',
    a: 'Website packages at Lumisk Technology start from LKR 25,000 for a basic web presence (up to 2 pages) and go up to LKR 120,000+ for full web applications with backend, database and admin panel. Enterprise AI projects are quoted based on scope.',
  },
  {
    q: 'How long does it take to build a website in Sri Lanka?',
    a: 'A basic website typically takes 1-2 weeks. A full web application with backend takes 3-6 weeks depending on complexity. We provide a timeline estimate before starting any project.',
  },
  {
    q: 'Do you provide web hosting in Sri Lanka?',
    a: 'We assist with hosting setup using premium providers (Hostinger, Namecheap). Hosting and domain costs are billed separately at actual rates — we handle the full setup process.',
  },
  {
    q: 'Can you build e-commerce websites in Sri Lanka?',
    a: 'Yes — we build complete e-commerce platforms with product catalog, shopping cart, checkout and payment integration including PayHere and international gateways.',
  },
  {
    q: 'Do you offer website maintenance?',
    a: 'All projects include 1 year of free maintenance covering bug fixes, minor content updates, security patches and hosting support. A detailed maintenance plan is provided with every project.',
  },
  {
    q: 'Do you integrate WhatsApp with websites?',
    a: 'Yes — we integrate WhatsApp Business API for automated customer replies, order confirmations, lead capture and appointment reminders directly connected to your website.',
  },
  {
    q: 'Do you serve clients outside Colombo?',
    a: 'Yes — while we are based in Colombo, we serve clients across Sri Lanka including Kandy, Galle, Gampaha, Matara and all other districts. We also work with international clients.',
  },
]

// ── JSON-LD builders ─────────────────────────────────────────

// A WebPage node tied to the business — added on every page.
export function webPageSchema(path, title, description) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_URL}${path}#webpage`,
    url: `${BASE_URL}${path === '/' ? '/' : path}`,
    name: title,
    description,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    about: { '@id': BUSINESS_ID },
    inLanguage: 'en-LK',
  }
}

export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function serviceSchema() {
  const items = [
    ['Web Application Development', 'Custom React + FastAPI web applications', '120000'],
    ['Website Design & Development', 'Professional business websites', '25000'],
    ['AI Integration', 'Claude API powered intelligent features', '75000'],
    ['E-commerce Development', 'Online stores with payment integration', null],
    ['WhatsApp Business Integration', 'WhatsApp Business API automation', null],
  ]
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Web Development',
    provider: { '@id': BUSINESS_ID },
    areaServed: { '@type': 'Country', name: 'Sri Lanka' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Services',
      itemListElement: items.map(([name, description, price]) => ({
        '@type': 'Offer',
        name,
        description,
        ...(price ? { price, priceCurrency: 'LKR' } : {}),
      })),
    },
  }
}

export function itemListSchema(projects) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Lumisk Technology Portfolio',
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      description: p.description,
    })),
  }
}
