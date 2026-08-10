import { MetadataRoute } from 'next';
import { CAUSES_DATA } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://inamigosfoundation.org.in';

  const staticPages = [
    '',
    '/causes',
    '/transparency',
    '/volunteer',
    '/events',
    '/governance',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.9,
  }));

  const causePages = CAUSES_DATA.map((cause) => ({
    url: `${baseUrl}/causes/${cause.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...causePages];
}
