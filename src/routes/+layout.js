export const prerender = true;

export const load = async ({url}) => {

    return {
        title: 'DreamingDragons - A Community of Dragon Artists and Writers',
        twitter: true,
        openGraph: true,
        schemaOrg: true,
        description: 'Join DreamingDragons, a thriving community of 2.7K+ artists and writers passionate about dragon art and literature. Connect on Discord, DeviantArt, and our Tales platform. NO AI - NO NSFW.',
        siteName: 'DreamingDragons',
        imageURL: `${url.origin}/favicon-192.webp`,
        logo: `${url.origin}/favicon.svg`,
        author: 'ArchangelGCA',
        name: 'ArchangelGCA',
        canonical: 'https://dreamingdragons.net' + url.pathname,
        keywords: 'dragons, dragon art, dragon community, artists, writers, fantasy art, DeviantArt, Discord, Tales, DreamingDragons, original art, creative community'
    }

}