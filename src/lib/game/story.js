/**
 * Story content for "Rise of the Glitch" — a dragons-only adaptation
 * inspired by Rise and Fall of Raphael: The Glitch.
 *
 * No humans: the player is Rafe, a young dragon born of a cosmic fracture.
 */

export const GAME_TITLE = 'Minigame - Glitch';
export const GAME_SUBTITLE = 'A DreamingDragons Tale';

export const INTRO = [
	'In this beautiful world, only dragons soar.',
	'One night, the sky cracked — a Glitch.',
	'From that fracture, a hatchling was born:',
	'Rafe — a dragon who should not exist.',
	'Now the Shadow Lord Erebus is scheming evil things,',
	'and only the Glitch-born can stop it…'
];

/** Dialogue scripts keyed by NPC id. */
export const DIALOGUES = {
	elder_pyra: {
		default: [
			'Elder Pyra: Welcome back, little Glitch.',
			'Elder Pyra: The scar in the sky grows darker each night.',
			'Elder Pyra: Seek Zeno in the Glowing Forest.',
			'Elder Pyra: He foresaw your hatching long ago.'
		],
		after_zeno: [
			'Elder Pyra: Zeno has spoken to you. Good.',
			'Elder Pyra: The Bright City needs allies like you.',
			'Elder Pyra: Trust the wind — and your own fire.'
		],
		after_shards: [
			'Elder Pyra: Three shards… the seal is almost ready.',
			'Elder Pyra: Face Erebus with courage, Rafe.'
		]
	},
	zeno: {
		default: [
			'Zeno: Ah. I knew your arrival was imminent.',
			'Zeno: I am Zeno — black scales, blue belly, old eyes.',
			'Zeno: You are Rafe, the Glitch-born. Fear not.',
			'Zeno: Our world is peaceful… for now.',
			'Zeno: Erebus, the Shadow Lord, drinks from the sky-scar.',
			'Zeno: Gather three Elemental Shards to seal it.',
			'Zeno: Fire, Wind, and Water. Then enter the Shadow Scar.',
			'Zeno: When you are ready… make your legacy.',
			'Zeno: Save the world, little Glitch. I believe in you.'
		],
		after: [
			'Zeno: The shards await in Bright City, the cliffs, and the shore.',
			'Zeno: Remember: dark or light — each path has a price.',
			'Zeno: Choose well. The Glitch chose you for a reason.'
		]
	},
	nala: {
		default: [
			'Nala: Good day! I’m Nala — fire dragon of the Sunflare line.',
			'Nala: You’re the Glitch hatchling? Scales look shiny!',
			'Nala: Take this Fire Shard. Warm your core with it.',
			'Nala: If you meet Razel, tell him I slapped sense into him once.'
		],
		after: [
			'Nala: Keep that Fire Shard close. Erebus hates bright flame.',
			'Nala: Fly high, little one — or walk tall if wings tire.'
		]
	},
	razel: {
		default: [
			'Razel: Hi! I’m Razel, wind dragon of Whispering Wind.',
			'Razel: Queen Freya sends her regards… sort of.',
			'Razel: You’re not an… uh… wait. You’re a dragon. Good!',
			'Razel: Here’s the Wind Shard. It sings when you hold it.',
			'Razel: The Water Shard rests by the eastern shore.',
			'Razel: Then head west into the Shadow Scar. Be careful.'
		],
		after: [
			'Razel: The wind is with you, Rafe.',
			'Razel: Whispering Wind never forgets a friend.'
		]
	},
	tidekeeper: {
		default: [
			'Tidekeeper: The sea remembers every Glitch in history.',
			'Tidekeeper: You are another ancient anomaly — rise, don’t fall.',
			'Tidekeeper: Take the Water Shard. Cool your breath for battle.',
			'Tidekeeper: Seal the scar, and the tides will calm again.'
		],
		after: [
			'Tidekeeper: Three elements bound as one…',
			'Tidekeeper: Now the Shadow Scar may open for you.'
		]
	},
	guard: {
		default: [
			'Guard: Bright City stands. Shadow Scar looms west.',
			'Guard: If you carry the three shards, you may pass the dark gate.'
		]
	},
	merchant: {
		default: [
			'Merchant: Rest free at the fountain, traveler.',
			'Merchant: Shiny scales sell better than gold here… almost.'
		]
	},
	healer: {
		default: [
			'Healer: Drink from the Dreamspring. Your wounds fade.',
			'Healer: …There. Feel the teal light of our skies?'
		]
	},
	erebus_intro: {
		default: [
			'Erebus: So the little Glitch crawls into my scar…',
			'Erebus: You are a fracture. I am the dark that fills it.',
			'Erebus: Join me, and we unmake this world together.',
			'…You refuse. Fire answers in your throat.',
			'Erebus: Then burn — and be forgotten!'
		]
	},
	victory: {
		default: [
			'The Shadow Lord collapses into smoke and starlight.',
			'The sky-scar stitches shut with fire, wind, and water.',
			'Zeno’s voice echoes: “Nothing is fixed… except your courage.”',
			'You — Rafe, the Glitch — saved our world.',
			'The end is only the beginning.',
			'Thank you for playing. — DreamingDragons'
		]
	}
};

export const QUEST_LOG = {
	start: 'Speak with Elder Pyra in Nestvale.',
	find_zeno: 'Find Zeno in the Glowing Forest.',
	gather_shards: 'Collect Fire, Wind, and Water Shards.',
	shadow_scar: 'Enter the Shadow Scar and face Erebus.',
	done: 'The world is safe. The Glitch is sealed.'
};

export function getQuestText(flags) {
	if (flags.victory) return QUEST_LOG.done;
	if (flags.shards >= 3) return QUEST_LOG.shadow_scar;
	if (flags.metZeno) return QUEST_LOG.gather_shards;
	if (flags.talkedElder) return QUEST_LOG.find_zeno;
	return QUEST_LOG.start;
}
