import * as sitemap from 'super-sitemap/sveltekit';

export const prerender = true;

export const GET = async ({ url }) => {
  return await sitemap.response({
    origin: 'https://dreamingdragons.net',
    excludeRoutePatterns: [
      /^\/admin.*/,
    ],
    defaultChangefreq: 'weekly',
    defaultPriority: 0.7,
    sort: 'alpha',
  });
};
