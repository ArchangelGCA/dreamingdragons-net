/** Shared constants for the DreamingDragons pixel RPG. */

export const TILE = 16;
export const SCALE = 3;
export const VIEW_W = 20; // tiles
export const VIEW_H = 14; // tiles
export const CANVAS_W = VIEW_W * TILE * SCALE;
export const CANVAS_H = VIEW_H * TILE * SCALE;

/** Brand-aligned palette (matches site CSS vars). */
export const COLORS = {
	bg: '#0a0a1f',
	primaryDark: '#1a142f',
	primary: '#0f2c4b',
	secondary: '#004a5a',
	accent: '#00a594',
	accentLight: '#20dde0',
	light: '#cce0e5',
	lightest: '#f0f8ff',
	gold: '#f0c040',
	danger: '#e05050',
	shadow: '#2a1040',
	grass: '#1a5c4a',
	grassLight: '#2a7a5e',
	path: '#6b5a3e',
	pathLight: '#8a7550',
	water: '#1a4a7a',
	waterLight: '#2a6aaa',
	tree: '#0d3d2a',
	treeCanopy: '#1a6b45',
	stone: '#4a5568',
	stoneLight: '#6a7588',
	sand: '#a08050',
	darkGround: '#1a1028',
	darkGlow: '#4a2060',
	uiPanel: 'rgba(15, 44, 75, 0.92)',
	uiBorder: '#20dde0',
	hp: '#e05050',
	hpBg: '#401818',
	mp: '#40a0e0',
	mpBg: '#182848'
};

export const DIR = {
	DOWN: 0,
	LEFT: 1,
	RIGHT: 2,
	UP: 3
};

export const KEY = {
	UP: ['ArrowUp', 'w', 'W'],
	DOWN: ['ArrowDown', 's', 'S'],
	LEFT: ['ArrowLeft', 'a', 'A'],
	RIGHT: ['ArrowRight', 'd', 'D'],
	ACTION: [' ', 'Enter', 'e', 'E'],
	CANCEL: ['Escape', 'Backspace'],
	ATTACK: [' ', 'Enter', 'z', 'Z']
};

export function keyMatches(code, group) {
	return group.includes(code);
}
