/**
 * Tile maps and world exits for the RPG.
 *
 * World graph (one clear loop, no dead wrong-warps):
 *   Nestvale ──east──► Glowing Forest ──east──► Bright City ──east──► Eastern Shore
 *                                              │
 *                                    dark gate (3 shards)
 *                                              ▼
 *                                         Shadow Scar ──west──► Erebus' Lair
 *
 * Tile codes:
 *  0 grass | 1 path | 2 water | 3 tree/wall (solid)
 *  4 stone | 5 sand | 6 shadow | 7 flower | 8 special
 *  9 fountain (heal) | 10 bridge
 */

export const T = {
	GRASS: 0,
	PATH: 1,
	WATER: 2,
	TREE: 3,
	STONE: 4,
	SAND: 5,
	SHADOW: 6,
	FLOWER: 7,
	SPECIAL: 8,
	FOUNTAIN: 9,
	BRIDGE: 10
};

export const SOLID = new Set([T.WATER, T.TREE]);

/** @param {number[][]} rows */
function map(rows) {
	return {
		h: rows.length,
		w: rows[0].length,
		tiles: rows
	};
}

// Nestvale — starting village (only exit: east → forest)
const nestvale = map([
	// 0
	[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
	// 1
	[3, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 3],
	// 2
	[3, 0, 4, 4, 4, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 4, 4, 4, 0, 0, 0, 3],
	// 3 fountain + elder plaza
	[3, 0, 4, 9, 4, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 4, 8, 4, 0, 0, 0, 3],
	// 4
	[3, 0, 4, 4, 4, 0, 7, 0, 0, 1, 0, 0, 0, 1, 0, 7, 0, 4, 4, 4, 0, 0, 0, 3],
	// 5
	[3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
	// 6 main road east → forest
	[3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	// 7
	[3, 0, 7, 0, 0, 4, 4, 4, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
	// 8 dreamspring
	[3, 0, 0, 0, 0, 4, 8, 4, 0, 1, 0, 0, 7, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 3],
	// 9
	[3, 0, 0, 0, 0, 4, 4, 4, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
	// 10
	[3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
	// 11 grove
	[3, 0, 0, 7, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 7, 0, 0, 3],
	// 12
	[3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 3],
	// 13 south path loops back into village (no map exit)
	[3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 3],
	// 14 sealed border
	[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
]);

// Glowing Forest — west Nestvale, east Bright City
const forest = map([
	// 0
	[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
	// 1
	[3, 3, 0, 0, 3, 3, 0, 0, 0, 3, 3, 0, 0, 0, 3, 0, 0, 3, 3, 0, 0, 0, 3, 3, 3, 3],
	// 2
	[3, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 3],
	// 3
	[3, 0, 7, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 7, 0, 3],
	// 4 upper trail
	[3, 0, 0, 0, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 3, 0, 0, 3, 0, 0, 0, 3],
	// 5
	[3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0, 0, 0, 3],
	// 6 main road (west ↔ east) + Zeno glade
	[1, 1, 1, 1, 1, 1, 1, 1, 0, 3, 3, 0, 8, 0, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	// 7
	[3, 0, 0, 0, 0, 0, 0, 1, 0, 3, 3, 0, 0, 0, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3],
	// 8
	[3, 0, 7, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 7, 0, 0, 3],
	// 9 lower trail
	[3, 0, 0, 0, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 0, 0, 0, 0, 0, 3],
	// 10
	[3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 7, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
	// 11
	[3, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 3, 3],
	// 12
	[3, 3, 3, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 3, 3, 3, 3],
	// 13 sealed (no south warp)
	[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
]);

// Bright City — west forest, east shore, south dark gate (3 shards)
const city = map([
	// 0
	[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
	// 1
	[3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3],
	// 2 main north avenue
	[3, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 3],
	// 3 fountain row
	[3, 4, 1, 4, 4, 4, 1, 4, 4, 4, 1, 4, 9, 4, 1, 4, 4, 4, 1, 4, 4, 4, 1, 4, 4, 1, 4, 3],
	// 4 Nala (left) + Razel (right) homes
	[3, 4, 1, 4, 8, 4, 1, 4, 8, 4, 1, 4, 4, 4, 1, 4, 8, 4, 1, 4, 8, 4, 1, 4, 4, 1, 4, 3],
	// 5
	[3, 4, 1, 4, 4, 4, 1, 4, 4, 4, 1, 1, 1, 1, 1, 4, 4, 4, 1, 4, 4, 4, 1, 4, 4, 1, 4, 3],
	// 6
	[3, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 3],
	// 7 east–west road (forest ↔ shore)
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 8, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	// 8
	[3, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 3],
	// 9 market + path south to dark gate
	[3, 4, 1, 4, 4, 4, 1, 4, 4, 4, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 1, 5, 5, 1, 4, 3],
	// 10
	[3, 4, 1, 4, 8, 4, 1, 4, 8, 4, 1, 4, 4, 4, 1, 4, 8, 4, 1, 1, 6, 1, 1, 5, 5, 1, 4, 3],
	// 11 approach to scar gate
	[3, 4, 1, 4, 4, 4, 1, 4, 4, 4, 1, 4, 4, 4, 1, 4, 4, 4, 1, 1, 6, 1, 1, 5, 5, 1, 4, 3],
	// 12 south avenue
	[3, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 1, 1, 1, 1, 1, 4, 3],
	// 13 dark gate threshold (exit south when 3 shards)
	[3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 4, 4, 4, 4, 4, 4, 3],
	// 14 sealed except gate column
	[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3]
]);

// Eastern Shore — pier reaches Tidekeeper (Water Shard)
const shore = map([
	// 0
	[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
	// 1
	[3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
	// 2 ring path top
	[3, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 3],
	// 3
	[3, 5, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 5, 3],
	// 4 lagoon
	[3, 5, 1, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 1, 5, 3],
	// 5
	[3, 5, 1, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 1, 5, 3],
	// 6 entry from city + pier out to shrine
	[1, 1, 1, 1, 1, 10, 10, 10, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 1, 5, 3],
	// 7 Tidekeeper shrine (reachable via pier)
	[3, 5, 1, 5, 5, 10, 10, 8, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 1, 5, 3],
	// 8 pier south edge
	[3, 5, 1, 5, 2, 10, 10, 10, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 1, 5, 3],
	// 9
	[3, 5, 1, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 1, 5, 3],
	// 10
	[3, 5, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 5, 3],
	// 11 ring path bottom
	[3, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 3],
	// 12
	[3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
	// 13
	[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
]);

// Shadow Scar — enter from east (city gate), lair to the west
const shadow = map([
	// 0
	[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
	// 1
	[3, 6, 6, 6, 6, 6, 6, 3, 3, 6, 6, 6, 6, 6, 6, 3, 3, 6, 6, 6, 6, 6, 6, 3],
	// 2
	[3, 6, 1, 1, 1, 1, 6, 3, 3, 6, 1, 1, 1, 1, 6, 3, 3, 6, 1, 1, 1, 1, 6, 3],
	// 3
	[3, 6, 1, 6, 6, 1, 6, 6, 6, 6, 1, 6, 6, 1, 6, 6, 6, 6, 1, 6, 6, 1, 6, 3],
	// 4
	[3, 6, 1, 6, 6, 1, 1, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 6, 6, 1, 6, 3],
	// 5
	[3, 6, 1, 1, 1, 1, 6, 6, 6, 6, 1, 6, 6, 1, 6, 6, 6, 6, 1, 1, 1, 1, 6, 3],
	// 6 main scar road (lair west ↔ city east)
	[1, 1, 1, 6, 6, 1, 6, 3, 3, 6, 1, 1, 1, 1, 6, 3, 3, 6, 1, 6, 6, 1, 1, 1],
	// 7 rune marker (not an exit — landmark only)
	[3, 6, 1, 6, 6, 1, 6, 3, 3, 6, 1, 6, 8, 1, 6, 3, 3, 6, 1, 6, 6, 1, 6, 3],
	// 8
	[3, 6, 1, 1, 1, 1, 6, 6, 6, 6, 1, 6, 6, 1, 6, 6, 6, 6, 1, 1, 1, 1, 6, 3],
	// 9
	[3, 6, 1, 6, 6, 1, 1, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 6, 6, 1, 6, 3],
	// 10
	[3, 6, 1, 6, 6, 1, 6, 6, 6, 6, 1, 6, 6, 1, 6, 6, 6, 6, 1, 6, 6, 1, 6, 3],
	// 11
	[3, 6, 1, 1, 1, 1, 6, 3, 3, 6, 1, 1, 1, 1, 6, 3, 3, 6, 1, 1, 1, 1, 6, 3],
	// 12
	[3, 6, 6, 6, 6, 6, 6, 3, 3, 6, 6, 6, 6, 6, 6, 3, 3, 6, 6, 6, 6, 6, 6, 3],
	// 13
	[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
]);

// Erebus Lair — enter from north of scar road
const lair = map([
	// 0
	[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
	// 1
	[3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3],
	// 2
	[3, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 3],
	// 3
	[3, 6, 1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 6, 3],
	// 4
	[3, 6, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 1, 6, 3],
	// 5 boss platform
	[3, 6, 1, 6, 6, 1, 6, 6, 8, 6, 6, 6, 1, 6, 6, 1, 6, 3],
	// 6
	[3, 6, 1, 1, 1, 1, 6, 6, 6, 6, 6, 6, 1, 1, 1, 1, 6, 3],
	// 7
	[3, 6, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 1, 6, 3],
	// 8
	[3, 6, 1, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 6, 1, 6, 3],
	// 9
	[3, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 3],
	// 10
	[3, 6, 6, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 6, 6, 6, 3],
	// 11 exit south back to scar
	[3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3]
]);

/**
 * @typedef {{ id: string, x: number, y: number, name: string, color: string, dialogueKey: string, face?: string }} NpcDef
 * @typedef {{ id: string, x: number, y: number, name: string, hp: number, maxHp: number, atk: number, exp: number, color: string, isBoss?: boolean }} EnemyDef
 * @typedef {{ map: string, x: number, y: number, toMap: string, toX: number, toY: number, requireShards?: number, label?: string }} ExitDef
 */

/** @type {Record<string, { map: ReturnType<typeof map>, name: string, spawn: {x:number,y:number}, npcs: NpcDef[], enemies: EnemyDef[], exits: ExitDef[] }>} */
export const WORLDS = {
	nestvale: {
		map: nestvale,
		name: 'Nestvale',
		spawn: { x: 10, y: 8 },
		npcs: [
			{
				id: 'elder_pyra',
				x: 18,
				y: 3,
				name: 'Elder Pyra',
				color: '#e07030',
				dialogueKey: 'elder_pyra',
				face: 'elder'
			},
			{
				id: 'healer_nest',
				x: 6,
				y: 8,
				name: 'Dreamspring',
				color: '#20dde0',
				dialogueKey: 'healer',
				face: 'healer'
			},
			{
				id: 'villager',
				x: 12,
				y: 10,
				name: 'Nestling',
				color: '#80c070',
				dialogueKey: 'villager',
				face: 'merchant'
			}
		],
		enemies: [],
		exits: [
			// Only east exit — south path is a scenic loop inside Nestvale
			{ map: 'nestvale', x: 23, y: 6, toMap: 'forest', toX: 1, toY: 6, label: 'Glowing Forest →' }
		]
	},
	forest: {
		map: forest,
		name: 'Glowing Forest',
		spawn: { x: 2, y: 6 },
		npcs: [
			{
				id: 'zeno',
				x: 12,
				y: 6,
				name: 'Zeno',
				color: '#1a1a2e',
				dialogueKey: 'zeno',
				face: 'zeno'
			}
		],
		enemies: [
			{ id: 'shade1', x: 5, y: 3, name: 'Shade Whelp', hp: 12, maxHp: 12, atk: 3, exp: 8, color: '#5a3080' },
			{ id: 'shade2', x: 18, y: 8, name: 'Shade Whelp', hp: 12, maxHp: 12, atk: 3, exp: 8, color: '#5a3080' },
			{ id: 'shade3', x: 20, y: 3, name: 'Nightling', hp: 18, maxHp: 18, atk: 4, exp: 12, color: '#3a2060' },
			{ id: 'shade4', x: 10, y: 9, name: 'Shade Whelp', hp: 12, maxHp: 12, atk: 3, exp: 8, color: '#5a3080' }
		],
		exits: [
			{ map: 'forest', x: 0, y: 6, toMap: 'nestvale', toX: 22, toY: 6, label: '← Nestvale' },
			{ map: 'forest', x: 25, y: 6, toMap: 'city', toX: 1, toY: 7, label: 'Bright City →' }
		]
	},
	city: {
		map: city,
		name: 'Bright City',
		spawn: { x: 2, y: 7 },
		npcs: [
			{
				id: 'nala',
				x: 4,
				y: 4,
				name: 'Nala',
				color: '#e05030',
				dialogueKey: 'nala',
				face: 'fire'
			},
			{
				id: 'razel',
				x: 16,
				y: 4,
				name: 'Razel',
				color: '#50c0e0',
				dialogueKey: 'razel',
				face: 'wind'
			},
			{
				id: 'guard',
				x: 12,
				y: 7,
				name: 'City Guard',
				color: '#708090',
				dialogueKey: 'guard',
				face: 'guard'
			},
			{
				id: 'merchant',
				x: 8,
				y: 10,
				name: 'Merchant',
				color: '#d0a040',
				dialogueKey: 'merchant',
				face: 'merchant'
			},
			{
				id: 'healer_city',
				x: 12,
				y: 3,
				name: 'Fountain',
				color: '#20dde0',
				dialogueKey: 'healer',
				face: 'healer'
			},
			{
				id: 'gatekeeper',
				x: 20,
				y: 12,
				name: 'Scar Warden',
				color: '#604080',
				dialogueKey: 'gatekeeper',
				face: 'guard'
			}
		],
		enemies: [],
		exits: [
			{ map: 'city', x: 0, y: 7, toMap: 'forest', toX: 24, toY: 6, label: '← Glowing Forest' },
			{ map: 'city', x: 27, y: 7, toMap: 'shore', toX: 1, toY: 6, label: 'Eastern Shore →' },
			{
				map: 'city',
				x: 20,
				y: 14,
				toMap: 'shadow',
				toX: 22,
				toY: 6,
				requireShards: 3,
				label: 'Shadow Scar (needs 3 shards) ↓'
			}
		]
	},
	shore: {
		map: shore,
		name: 'Eastern Shore',
		spawn: { x: 2, y: 6 },
		npcs: [
			{
				id: 'tidekeeper',
				x: 7,
				y: 7,
				name: 'Tidekeeper',
				color: '#3080c0',
				dialogueKey: 'tidekeeper',
				face: 'water'
			}
		],
		enemies: [
			{ id: 'reef1', x: 14, y: 3, name: 'Reef Shade', hp: 16, maxHp: 16, atk: 4, exp: 10, color: '#306080' },
			{ id: 'reef2', x: 16, y: 10, name: 'Reef Shade', hp: 16, maxHp: 16, atk: 4, exp: 10, color: '#306080' },
			{ id: 'reef3', x: 10, y: 11, name: 'Salt Wisp', hp: 14, maxHp: 14, atk: 4, exp: 9, color: '#4080a0' }
		],
		exits: [{ map: 'shore', x: 0, y: 6, toMap: 'city', toX: 26, toY: 7, label: '← Bright City' }]
	},
	shadow: {
		map: shadow,
		name: 'Shadow Scar',
		spawn: { x: 22, y: 6 },
		npcs: [],
		enemies: [
			{ id: 'void1', x: 4, y: 4, name: 'Void Drake', hp: 22, maxHp: 22, atk: 5, exp: 15, color: '#401060' },
			{ id: 'void2', x: 10, y: 8, name: 'Void Drake', hp: 22, maxHp: 22, atk: 5, exp: 15, color: '#401060' },
			{ id: 'void3', x: 18, y: 4, name: 'Scar Hound', hp: 20, maxHp: 20, atk: 6, exp: 18, color: '#602040' },
			{ id: 'void4', x: 16, y: 9, name: 'Scar Hound', hp: 20, maxHp: 20, atk: 6, exp: 18, color: '#602040' },
			{ id: 'void5', x: 12, y: 4, name: 'Nightling', hp: 18, maxHp: 18, atk: 5, exp: 14, color: '#3a2060' }
		],
		exits: [
			// Back to city dark gate approach
			{ map: 'shadow', x: 23, y: 6, toMap: 'city', toX: 20, toY: 12, label: '← Bright City' },
			// Only west road leads into the lair
			{ map: 'shadow', x: 0, y: 6, toMap: 'lair', toX: 8, toY: 10, label: "Erebus' Lair →" }
		]
	},
	lair: {
		map: lair,
		name: "Erebus' Lair",
		spawn: { x: 8, y: 10 },
		npcs: [],
		enemies: [
			{
				id: 'erebus',
				x: 8,
				y: 5,
				name: 'Erebus',
				hp: 60,
				maxHp: 60,
				atk: 8,
				exp: 100,
				color: '#1a0828',
				isBoss: true
			}
		],
		exits: [{ map: 'lair', x: 8, y: 11, toMap: 'shadow', toX: 1, toY: 6, label: '← Shadow Scar' }]
	}
};

export function isSolid(tile) {
	return SOLID.has(tile);
}

export function getTile(worldId, tx, ty) {
	const world = WORLDS[worldId];
	if (!world) return T.TREE;
	if (ty < 0 || tx < 0 || ty >= world.map.h || tx >= world.map.w) return T.TREE;
	return world.map.tiles[ty][tx];
}

/**
 * BFS reachability helper for tests / tooling.
 * @param {string} mapId
 * @param {{x:number,y:number}} from
 * @param {{x:number,y:number}} to
 */
export function canReach(mapId, from, to) {
	const world = WORLDS[mapId];
	if (!world) return false;
	const key = (x, y) => `${x},${y}`;
	const walkable = (x, y) => {
		if (y < 0 || x < 0 || y >= world.map.h || x >= world.map.w) {
			return world.exits.some((e) => e.x === x && e.y === y);
		}
		const tile = world.map.tiles[y][x];
		if (SOLID.has(tile)) return false;
		return true;
	};
	if (!walkable(from.x, from.y) || !walkable(to.x, to.y)) return false;
	const q = [{ x: from.x, y: from.y }];
	const seen = new Set([key(from.x, from.y)]);
	const dirs = [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0]
	];
	while (q.length) {
		const cur = q.shift();
		if (!cur) break;
		if (cur.x === to.x && cur.y === to.y) return true;
		for (const [dx, dy] of dirs) {
			const nx = cur.x + dx;
			const ny = cur.y + dy;
			const k = key(nx, ny);
			if (seen.has(k)) continue;
			if (!walkable(nx, ny)) continue;
			// block NPC tiles as solid for pathing (except destination)
			if (world.npcs.some((n) => n.x === nx && n.y === ny) && !(nx === to.x && ny === to.y)) {
				continue;
			}
			seen.add(k);
			q.push({ x: nx, y: ny });
		}
	}
	return false;
}
