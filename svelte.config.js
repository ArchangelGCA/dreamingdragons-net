import adapter from "@sveltejs/adapter-cloudflare";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
        prerender: {
            handleMissingId: ({ path, id, referrers, message }) => {
                console.warn(`Warning: ${message} - ${id} in ${path} (referenced from ${referrers})`);
            },
            origin: 'https://dreamingdragons.net',
        }
    }
};

export default config;