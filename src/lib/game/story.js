/**
 * Story content for "Rise of the Glitch" — a dragons-only adaptation
 * inspired by Rise and Fall of Raphael: The Glitch.
 *
 * No humans: the player is Rafe, a young dragon born of a cosmic fracture.
 */

export const GAME_TITLE = 'Minigame - Glitch';
export const GAME_SUBTITLE = 'A DreamingDragons Tale';

export const INTRO = [
	'In this world, only dragons soar beneath teal skies.',
	'One night the firmament cracked — a Glitch in the stars.',
	'From that fracture, a hatchling was born who should not exist:',
	'Rafe — the Glitch-born.',
	'Shadow Lord Erebus drinks from the sky-scar, and darkness spreads…',
	'Only the Glitch can seal what the Glitch began.'
];

/** Dialogue scripts keyed by NPC dialogueKey. */
export const DIALOGUES = {
	elder_pyra: {
		default: [
			'Elder Pyra: Welcome home, little Glitch.',
			'Elder Pyra: The scar in the sky grows darker each night.',
			'Elder Pyra: Seek sage Zeno in the Glowing Forest — east of Nestvale.',
			'Elder Pyra: Follow the path out of the village. He foresaw your hatching.'
		],
		after_zeno: [
			'Elder Pyra: Zeno has spoken. Good.',
			'Elder Pyra: Bright City lies beyond the forest — fire and wind await there.',
			'Elder Pyra: The shore further east holds water. Three shards open the dark gate.'
		],
		after_shards: [
			'Elder Pyra: Three shards… the seal is almost ready.',
			'Elder Pyra: The dark gate is south of Bright City’s plaza.',
			'Elder Pyra: Face Erebus with courage, Rafe. Nestvale believes in you.'
		]
	},
	zeno: {
		default: [
			'Zeno: Ah. I knew your arrival was imminent.',
			'Zeno: I am Zeno — black scales, blue belly, old eyes.',
			'Zeno: You are Rafe, the Glitch-born. Fear not the name.',
			'Zeno: Our world is peaceful… for now.',
			'Zeno: Erebus, the Shadow Lord, drinks power from the sky-scar.',
			'Zeno: Gather three Elemental Shards to seal it: Fire, Wind, and Water.',
			'Zeno: East to Bright City for Fire and Wind. Further east, the shore for Water.',
			'Zeno: With all three, the dark gate south of the city will open.',
			'Zeno: Save the world, little Glitch. I believe in you.'
		],
		after: [
			'Zeno: Fire with Nala. Wind with Razel. Water with the Tidekeeper.',
			'Zeno: Rest at fountains. Fight shades for strength before the Scar.',
			'Zeno: Remember: dark or light — each path has a price. Choose well.'
		]
	},
	nala: {
		default: [
			'Nala: Good day! I’m Nala — fire dragon of the Sunflare line.',
			'Nala: You’re the Glitch hatchling? Scales look shiny!',
			'Nala: Take this Fire Shard. Warm your core with it.',
			'Nala: If you meet Razel, tell him I still outfly him. East wing of the city!'
		],
		after: [
			'Nala: Keep that Fire Shard close. Erebus hates bright flame.',
			'Nala: Need a boost? The city fountain heals free — merchant’s orders.'
		]
	},
	razel: {
		default: [
			'Razel: Hi! I’m Razel, wind dragon of Whispering Wind.',
			'Razel: Queen Freya sends her regards… sort of.',
			'Razel: You’re not an… uh… wait. You’re a dragon. Good!',
			'Razel: Here’s the Wind Shard. It sings when you hold it.',
			'Razel: The Water Shard rests on the Eastern Shore — take the road east.',
			'Razel: Then head south through the dark gate once you have all three.'
		],
		after: [
			'Razel: The wind is with you, Rafe.',
			'Razel: Whispering Wind never forgets a friend. Go seal that scar!'
		]
	},
	tidekeeper: {
		default: [
			'Tidekeeper: The sea remembers every Glitch in history.',
			'Tidekeeper: You are another ancient anomaly — rise, don’t fall.',
			'Tidekeeper: Walk the pier. Take the Water Shard. Cool your breath for battle.',
			'Tidekeeper: Seal the scar, and the tides will calm again.'
		],
		after: [
			'Tidekeeper: Three elements bound as one…',
			'Tidekeeper: Return west to Bright City. The Scar Warden waits by the dark gate.'
		]
	},
	guard: {
		default: [
			'Guard: Bright City stands. Forest west, shore east, scar south.',
			'Guard: Nala and Razel keep shards in the northern houses.',
			'Guard: The Tidekeeper’s pier is on the Eastern Shore.',
			'Guard: Without three shards, the dark gate will not open.'
		]
	},
	gatekeeper: {
		default: [
			'Scar Warden: Beyond this gate lies the Shadow Scar.',
			'Scar Warden: Three Elemental Shards are required. No exceptions.',
			'Scar Warden: Fire. Wind. Water. Then you may pass south.',
			'Scar Warden: Erebus waits in the lair at the scar’s western end.'
		],
		after_shards: [
			'Scar Warden: The shards hum… the gate answers.',
			'Scar Warden: South into darkness, Glitch-born. May your fire hold.'
		]
	},
	merchant: {
		default: [
			'Merchant: Rest free at the fountain, traveler — best deal in the city.',
			'Merchant: Shiny scales sell better than gold here… almost.',
			'Merchant: Heard the shore pier was rebuilt. You can walk to the Tidekeeper now!'
		]
	},
	villager: {
		default: [
			'Nestling: Rafe! The elder’s looking for you near the stone plaza.',
			'Nestling: The only road out is east — don’t wander into the trees.',
			'Nestling: I saw weird purple lights past the forest… be careful.'
		],
		after: [
			'Nestling: Bring us stories from Bright City!',
			'Nestling: And maybe a shell from the shore… pretty please?'
		]
	},
	healer: {
		default: [
			'Dreamspring: Drink deep. Your wounds fade in teal light.',
			'…There. Feel the skies of Nestvale in your scales?'
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
			'Fire, wind, and water braid across the sky-scar…',
			'…and the fracture stitches shut.',
			'Zeno’s voice echoes: “Nothing is fixed… except your courage.”',
			'You — Rafe, the Glitch — saved our world.',
			'The end is only the beginning.',
			'Thank you for playing. — DreamingDragons'
		]
	}
};

export const QUEST_LOG = {
	start: 'Speak with Elder Pyra in Nestvale (north plaza).',
	find_zeno: 'Go east to the Glowing Forest and find Zeno.',
	gather_shards: 'Collect Fire (Nala), Wind (Razel), and Water (Tidekeeper).',
	need_fire: 'Get the Fire Shard from Nala in Bright City (north houses).',
	need_wind: 'Get the Wind Shard from Razel in Bright City (north houses).',
	need_water: 'Get the Water Shard from the Tidekeeper on the Eastern Shore pier.',
	need_fire_wind: 'Still need Fire (Nala) and Wind (Razel) in Bright City.',
	need_fire_water: 'Still need Fire (Nala) and Water (Tidekeeper on the shore).',
	need_wind_water: 'Still need Wind (Razel) and Water (Tidekeeper on the shore).',
	shadow_scar: 'Enter the dark gate south of Bright City. Cross the Scar. Face Erebus.',
	done: 'The world is safe. The Glitch is sealed.'
};

/**
 * @param {{ talkedElder?: boolean, metZeno?: boolean, gotFire?: boolean, gotWind?: boolean, gotWater?: boolean, shards?: number, victory?: boolean }} flags
 */
export function getQuestText(flags) {
	if (flags.victory) return QUEST_LOG.done;
	if ((flags.shards ?? 0) >= 3) return QUEST_LOG.shadow_scar;
	if (flags.metZeno) {
		const f = !!flags.gotFire;
		const w = !!flags.gotWind;
		const a = !!flags.gotWater;
		if (!f && !w && !a) return QUEST_LOG.gather_shards;
		if (f && w && !a) return QUEST_LOG.need_water;
		if (f && !w && a) return QUEST_LOG.need_wind;
		if (!f && w && a) return QUEST_LOG.need_fire;
		if (f && !w && !a) return QUEST_LOG.need_wind_water;
		if (!f && w && !a) return QUEST_LOG.need_fire_water;
		if (!f && !w && a) return QUEST_LOG.need_fire_wind;
		return QUEST_LOG.gather_shards;
	}
	if (flags.talkedElder) return QUEST_LOG.find_zeno;
	return QUEST_LOG.start;
}
