import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'hybrid',
  adapter: vercel({
    analytics: true,
    webAnalytics: true,
    speedInsights: true,
    buildCache: false,      // Just added this to clear cache
    maxDuration: 60        // Just added this to clear cache
  }),
  server: {
    port: 3000,
  },
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: 'css-variables'
    }
  },
  shikiConfig: {
    wrap: true,
    skipInline: false,
    drafts: true
  },
  site: 'https://www.bestelectricianjobs.com',
  trailingSlash: 'never', // Enforce no trailing slash
  integrations: [tailwind(), sitemap(), mdx()]
});