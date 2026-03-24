import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      // Explicitly allow AI search crawlers for GEO
      {
        userAgent: ['GPTBot', 'Google-Extended', 'PerplexityBot', 'ChatGPT-User', 'Applebot-Extended', 'ClaudeBot', 'anthropic-ai'],
        allow: '/',
      },
    ],
    sitemap: 'https://justpeachome.ca/sitemap.xml',
  }
}
