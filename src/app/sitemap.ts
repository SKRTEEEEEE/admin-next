import { MetadataRoute } from 'next';
import { baseUrl } from '@/lib/seo/metadata';
import { routing } from '@/lib/i18n/routing';

/**
 * Generate sitemap.xml for SEO
 * Based on task 34505: Mejorar SEO y Accesibilidad
 * 
 * This file generates the sitemap.xml file dynamically for search engines
 * See: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * 
 * IMPORTANT: This helps search engines discover all pages and improves SEO
 * targeting "dev desarrollador tech" and "dev desarollador tech" searches
 */

// Single admin surface exposed publicly
const staticRoutes = [''];

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const currentDate = new Date();
  
  // Generate sitemap entries for all locales and routes
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      // Determine priority based on route importance
      let priority = 0.7;
      let changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'weekly';
      
      if (route === '') {
        // Home page has highest priority
        priority = 1.0;
        changefreq = 'weekly';
      } else if (route === '/proyectos' || route === '/portafolio') {
        // Main showcase pages have high priority
        priority = 0.9;
        changefreq = 'weekly';
      } else if (route === '/info' || route === '/estudios') {
        // Information pages have medium-high priority
        priority = 0.8;
        changefreq = 'monthly';
      } else {
        // Other pages have normal priority
        priority = 0.7;
        changefreq = 'monthly';
      }

      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: currentDate,
        changeFrequency: changefreq,
        priority: priority,
        alternates: {
          languages: locales.reduce((acc, lang) => {
            acc[lang] = `${baseUrl}/${lang}${route}`;
            return acc;
          }, {} as Record<string, string>),
        },
      });
    }
  }

  return sitemapEntries;
}
