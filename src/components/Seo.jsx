import { Helmet } from 'react-helmet-async'
import { BASE_URL, OG_IMAGE } from '../data/siteMeta.js'

/**
 * Reusable per-page SEO head. Emits title, description, canonical,
 * Open Graph, Twitter Card, and any JSON-LD passed via `jsonLd`
 * (a single object or an array of objects).
 *
 * Props:
 *   title       - page <title>
 *   description - meta description
 *   path        - route path, e.g. "/services" (used for canonical + og:url)
 *   image       - absolute og image URL (defaults to site OG image)
 *   jsonLd      - object | object[] of schema.org structured data
 */
export default function Seo({ title, description, path = '/', image = OG_IMAGE, jsonLd }) {
  const url = `${BASE_URL}${path === '/' ? '/' : path}`
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Lumisk Technology" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_LK" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured data */}
      {schemas.map((schema, i) => (
        <script type="application/ld+json" key={i}>
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}
