export const load = async ({ url }) => {
	const origin = 'https://dreamingdragons.net';

	return {
		title: 'Glitch - Minigame — DreamingDragons',
		description:
			'Play Glitch: a free 2D pixel web-RPG. Explore as Rafe, the Glitch-born dragon, collect elemental shards, and face the Shadow Lord Erebus.',
		keywords:
			'dreamingdragons game, dragon rpg, pixel rpg, browser game, rise of the glitch, free web game, dragon adventure',
		canonical: origin + url.pathname,
		url: origin + url.pathname
	};
};
