import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/dashboard/', '/auth/'],
      },
    ],
    sitemap: 'https://learningai-clone.vercel.app/sitemap.xml',
  };
}
