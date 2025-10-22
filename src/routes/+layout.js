export const load = async ({url}) => {

    return {
        title: 'DreamingDragons - Official',
        twitter: true,
        openGraph: true,
        schemaOrg: true,
        description: 'DreamingDragons - A community of passionate artists and writers of dragon fantasy.',
        siteName: 'DreamingDragons',
        imageURL: `https://tales.archangelgca.eu/_app/immutable/assets/favicon.Nz_DqUpe.webp`,
        logo: `https://tales.archangelgca.eu/_app/immutable/assets/favicon.Nz_DqUpe.webp`,
        author: 'ArchangelGCA',
        name: 'ArchangelGCA',
        canonical: 'https://dreamingdragons.net' + url.pathname,
        keywords: 'DreamingDragons, Dragon, Dragons, Fantasy, Art, Writing, Stories, Community'
    }

}