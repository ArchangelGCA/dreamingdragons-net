export const prerender = true;

export const load = async ({url}) => {
    const origin = 'https://dreamingdragons.net';
    
    return {
        title: 'DreamingDragons - A Community of Dragon Artists and Writers',
        twitter: true,
        openGraph: true,
        schemaOrg: true,
        description: 'Join DreamingDragons, a thriving community of 2.7K+ artists and writers passionate about dragon art and literature. Connect on Discord, DeviantArt, and our Tales platform. NO AI - NO NSFW.',
        siteName: 'DreamingDragons',
        imageURL: `${origin}/favicon-192.webp`,
        logo: `${origin}/favicon.svg`,
        author: 'ArchangelGCA',
        name: 'ArchangelGCA',
        canonical: origin + url.pathname,
        url: origin + url.pathname,
        hostname: 'dreamingdragons.net',
        keywords: 'dragons, dragon art, dragon community, artists, writers, fantasy art, DeviantArt, Discord, Tales, DreamingDragons, original art, creative community'
    }

}