/**
 * Tile maps and world exits for the RPG.
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

// Nestvale — starting village
const nestvale = map([
	[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
	[3, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 3],
	[3, 0, 4, 4, 4, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 4, 4, 4, 0, 0, 0, 3],
	[3, 0, 4, 9, 4, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 4, 8, 4, 0, 0, 0, 3],
	[3, 0, 4, 4, 4, 0, 7, 0, 0, 1, 0, 0, 0, 1, 0, 7, 0, 4, 4, 4, 0, 0, 0, 3],
	[3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
	[3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[3, 0, 7, 0, 0, 4, 4, 4, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
	[3, 0, 0, 0, 0, 4, 8, 4, 0, 1, 0, 0, 7, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 3],
	[3, 0, 0, 0, 0, 4, 4, 4, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
	[3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
	[3, 0, 0, 7, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 7, 0, 0, 3],
	[3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 3],
	[3, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 3],
	[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3]
]);

// Glowing Forest
const forest = map([
	[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
	[3, 3, 0, 0, 3, 3, 0, 0, 0, 3, 3, 0, 0, 0, 3, 0, 0, 3, 3, 0, 0, 0, 3, 3, 3, 3],
	[3, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 3],
	[3, 0, 7, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 7, 0, 3],
	[3, 0, 0, 0, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 3, 0, 0, 3, 0, 0, 0, 3],
	[3, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0, 0, 0, 3],
	[1, 1, 1, 1, 1, 1, 1, 1, 0, 3, 3, 0, 8, 0, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[3, 0, 0, 0, 0, 0, 0, 1, 0, 3, 3, 0, 0, 0, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3],
	[3, 0, 7, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 7, 0, 0, 3],
	[3, 0, 0, 0, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 0, 0, 0, 0, 0, 3],
	[3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 7, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
	[3, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 3, 3],
	[3, 3, 3, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 3, 3, 3, 3],
	[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
]);

// Bright City
const city = map([
	[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
	[3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3],
	[3, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 3],
	[3, 4, 1, 4, 4, 4, 1, 4, 4, 4, 1, 4, 9, 4, 1, 4, 4, 4, 1, 4, 4, 4, 1, 4, 4, 1, 4, 3],
	[3, 4, 1, 4, 8, 4, 1, 4, 8, 4, 1, 4, 4, 4, 1, 4, 8, 4, 1, 4, 8, 4, 1, 4, 4, 1, 4, 3],
	[3, 4, 1, 4, 4, 4, 1, 4, 4, 4, 1, 1, 1, 1, 1, 4, 4, 4, 1, 4, 4, 4, 1, 4, 4, 1, 4, 3],
	[3, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 3],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 8, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[3, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 3],
	[3, 4, 1, 4, 4, 4, 1, 4, 4, 4, 1, 1, 1, 1, 1, 4, 4, 4, 1, 4, 6, 4, 1, 5, 5, 1, 4, 3],
	[3, 4, 1, 4, 8, 4, 1, 4, 8, 4, 1, 4, 4, 4, 1, 4, 8, 4, 1, 4, 6, 4, 1, 5, 5, 1, 4, 3],
	[3, 4, 1, 4, 4, 4, 1, 4, 4, 4, 1, 4, 4, 4, 1, 4, 4, 4, 1, 4, 6, 4, 1, 5, 5, 1, 4, 3],
	[3, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 3],
	[3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3],
	[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
]);

// Shore — water shard
const shore = map([
	[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
	[3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
	[3, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 3],
	[3, 5, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 5, 3],
	[3, 5, 1, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 1, 5, 3],
	[3, 5, 1, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 1, 5, 3],
	[1, 1, 1, 5, 2, 2, 10, 10, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 1, 5, 3],
	[3, 5, 1, 5, 2, 2, 10, 8, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 1, 5, 3],
	[3, 5, 1, 5, 2, 2, 10, 10, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 1, 5, 3],
	[3, 5, 1, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 1, 5, 3],
	[3, 5, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 5, 3],
	[3, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 3],
	[3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
	[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
]);

// Shadow Scar
const shadow = map([
	[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
	[3, 6, 6, 6, 6, 6, 6, 3, 3, 6, 6, 6, 6, 6, 6, 3, 3, 6, 6, 6, 6, 6, 6, 3],
	[3, 6, 1, 1, 1, 1, 6, 3, 3, 6, 1, 1, 1, 1, 6, 3, 3, 6, 1, 1, 1, 1, 6, 3],
	[3, 6, 1, 6, 6, 1, 6, 6, 6, 6, 1, 6, 6, 1, 6, 6, 6, 6, 1, 6, 6, 1, 6, 3],
	[3, 6, 1, 6, 6, 1, 1, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 6, 6, 1, 6, 3],
	[3, 6, 1, 1, 1, 1, 6, 6, 6, 6, 1, 6, 6, 1, 6, 6, 6, 6, 1, 1, 1, 1, 6, 3],
	[1, 1, 1, 6, 6, 1, 6, 3, 3, 6, 1, 1, 1, 1, 6, 3, 3, 6, 1, 6, 6, 1, 1, 1],
	[3, 6, 1, 6, 6, 1, 6, 3, 3, 6, 1, 6, 8, 1, 6, 3, 3, 6, 1, 6, 6, 1, 6, 3],
	[3, 6, 1, 1, 1, 1, 6, 6, 6, 6, 1, 6, 6, 1, 6, 6, 6, 6, 1, 1, 1, 1, 6, 3],
	[3, 6, 1, 6, 6, 1, 1, 1, 1, 1, 1, 6, 6, 1, 1, 1, 1, 1, 1, 6, 6, 1, 6, 3],
	[3, 6, 1, 6, 6, 1, 6, 6, 6, 6, 1, 6, 6, 1, 6, 6, 6, 6, 1, 6, 6, 1, 6, 3],
	[3, 6, 1, 1, 1, 1, 6, 3, 3, 6, 1, 1, 1, 1, 6, 3, 3, 6, 1, 1, 1, 1, 6, 3],
	[3, 6, 6, 6, 6, 6, 6, 3, 3, 6, 6, 6, 6, 6, 6, 3, 3, 6, 6, 6, 6, 6, 6, 3],
	[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
]);

// Erebus Lair
const lair = map([
	[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
	[3, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 3],
	[3, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 3],
	[3, 6, 1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1, 6, 3],
	[3, 6, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 1, 6, 3],
	[3, 6, 1, 6, 6, 1, 6, 6, 8, 6, 6, 6, 1, 6, 6, 1, 6, 3],
	[3, 6, 1, 1, 1, 1, 6, 6, 6, 6, 6, 6, 1, 1, 1, 1, 6, 3],
	[3, 6, 1, 6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6, 1, 6, 3],
	[3, 6, 1, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 6, 1, 6, 3],
	[3, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 3],
	[3, 6, 6, 6, 6, 6, 6, 6, 1, 6, 6, 6, 6, 6, 6, 6, 6, 3],
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
			}
		],
		enemies: [],
		exits: [
			{ map: 'nestvale', x: 23, y: 6, toMap: 'forest', toX: 1, toY: 6, label: 'Glowing Forest' },
			{ map: 'nestvale', x: 17, y: 14, toMap: 'forest', toX: 12, toY: 12, label: 'Forest Path' }
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
			{ id: 'shade3', x: 20, y: 3, name: 'Nightling', hp: 18, maxHp: 18, atk: 4, exp: 12, color: '#3a2060' }
		],
		exits: [
			{ map: 'forest', x: 0, y: 6, toMap: 'nestvale', toX: 22, toY: 6, label: 'Nestvale' },
			{ map: 'forest', x: 25, y: 6, toMap: 'city', toX: 1, toY: 7, label: 'Bright City' }
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
			}
		],
		enemies: [],
		exits: [
			{ map: 'city', x: 0, y: 7, toMap: 'forest', toX: 24, toY: 6, label: 'Glowing Forest' },
			{ map: 'city', x: 27, y: 7, toMap: 'shore', toX: 1, toY: 6, label: 'Eastern Shore' },
			{
				map: 'city',
				x: 20,
				y: 10,
				toMap: 'shadow',
				toX: 22,
				toY: 6,
				requireShards: 3,
				label: 'Shadow Scar (needs 3 shards)'
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
			{ id: 'reef2', x: 16, y: 9, name: 'Reef Shade', hp: 16, maxHp: 16, atk: 4, exp: 10, color: '#306080' }
		],
		exits: [{ map: 'shore', x: 0, y: 6, toMap: 'city', toX: 26, toY: 7, label: 'Bright City' }]
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
			{ id: 'void4', x: 16, y: 9, name: 'Scar Hound', hp: 20, maxHp: 20, atk: 6, exp: 18, color: '#602040' }
		],
		exits: [
			{ map: 'shadow', x: 23, y: 6, toMap: 'city', toX: 2, toY: 7, label: 'Bright City' },
			{ map: 'shadow', x: 0, y: 6, toMap: 'lair', toX: 8, toY: 10, label: "Erebus' Lair" },
			{ map: 'shadow', x: 12, y: 7, toMap: 'lair', toX: 8, toY: 10, label: "Erebus' Lair" }
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
		exits: [{ map: 'lair', x: 8, y: 11, toMap: 'shadow', toX: 12, toY: 8, label: 'Shadow Scar' }]
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
