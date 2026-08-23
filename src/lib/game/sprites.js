import { COLORS, TILE, DIR } from './constants.js';
import { T, WANG_MAPS, getTile } from './maps.js';
import {
	drawSprite,
	getSprite,
	getWangTile,
	getTilesetSheet,
	getDirectionalSprite,
	hasDirectionalSet,
	drawImageCentered
} from './assets.js';

/** Game DIR → PixelLab direction name. */
const DIR_NAMES = { [DIR.DOWN]: 'south', [DIR.LEFT]: 'west', [DIR.RIGHT]: 'east', [DIR.UP]: 'north' };

/**
 * Draw a single tile at drawing origin (caller has already translated).
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} mapId map the tile belongs to (for Wang corner sampling)
 * @param {number} tx tile x in map
 * @param {number} ty tile y in map
 * @param {number} [time] animation clock
 */
export function drawTile(ctx, mapId, tx, ty, time = 0) {
	const x = 0;
	const y = 0;
	const tile = getTile(mapId, tx, ty);
	const wang = WANG_MAPS.has(mapId) && !!getTilesetSheet();

	// Wang vertex helper: a corner is 'lower' (path) if any of the 4 cells
	// touching that vertex is path — paths keep their full footprint and
	// grass takes the transition tiles next to them.
	const corner = (dx, dy) => {
		// vertex at tile corner (tx+dx, ty+dy) touches cells
		// (tx+dx-1, ty+dy-1), (tx+dx, ty+dy-1), (tx+dx-1, ty+dy), (tx+dx, ty+dy)
		for (const [ox, oy] of [
			[-1, -1],
			[0, -1],
			[-1, 0],
			[0, 0]
		]) {
			if (getTile(mapId, tx + dx + ox, ty + dy + oy) === T.PATH) return 'l';
		}
		return 'u';
	};
	const wangGrass = () => {
		// blended tile for a GRASS-ish cell (corners depend on nearby path)
		const box = getWangTile(corner(0, 0), corner(1, 0), corner(0, 1), corner(1, 1));
		const sheet = getTilesetSheet();
		if (box && sheet) {
			ctx.imageSmoothingEnabled = false;
			ctx.drawImage(sheet, box.x, box.y, box.w, box.h, x, y, TILE, TILE);
			return true;
		}
		return false;
	};

	switch (tile) {
		case T.GRASS: {
			if (wang && wangGrass()) break;
			const grass = getSprite('grass');
			if (grass) {
				ctx.imageSmoothingEnabled = false;
				ctx.drawImage(grass, x, y, TILE, TILE);
			} else {
				fill(ctx, x, y, COLORS.grass);
				pxl(ctx, x + 3, y + 5, COLORS.grassLight);
				pxl(ctx, x + 10, y + 9, COLORS.grassLight);
				pxl(ctx, x + 7, y + 2, COLORS.grassLight);
			}
			break;
		}
		case T.PATH: {
			if (wang) {
				// path cells have all-lower corners (self touches every vertex)
				const box = getWangTile('l', 'l', 'l', 'l');
				const sheet = getTilesetSheet();
				if (box && sheet) {
					ctx.imageSmoothingEnabled = false;
					ctx.drawImage(sheet, box.x, box.y, box.w, box.h, x, y, TILE, TILE);
					break;
				}
			}
			const path = getSprite('path');
			if (path) {
				ctx.imageSmoothingEnabled = false;
				ctx.drawImage(path, x, y, TILE, TILE);
			} else {
				fill(ctx, x, y, COLORS.path);
				pxl(ctx, x + 4, y + 4, COLORS.pathLight);
				pxl(ctx, x + 11, y + 10, COLORS.pathLight);
			}
			break;
		}
		case T.WATER: {
			const wave = Math.floor(time / 400) % 2;
			fill(ctx, x, y, COLORS.water);
			for (let i = 0; i < 3; i++) {
				const wy = y + 4 + i * 4 + wave;
				hline(ctx, x + 2, wy, 12, COLORS.waterLight);
			}
			break;
		}
		case T.TREE:
			if (!(wang && wangGrass())) {
				const grass = getSprite('grass');
				if (grass) {
					ctx.imageSmoothingEnabled = false;
					ctx.drawImage(grass, x, y, TILE, TILE);
				} else {
					fill(ctx, x, y, COLORS.grass);
				}
			}
			// trunk
			rect(ctx, x + 6, y + 10, 4, 6, '#4a3020');
			// canopy
			rect(ctx, x + 2, y + 2, 12, 10, COLORS.treeCanopy);
			rect(ctx, x + 4, y + 0, 8, 4, COLORS.tree);
			break;
		case T.STONE:
			fill(ctx, x, y, COLORS.stone);
			pxl(ctx, x + 2, y + 2, COLORS.stoneLight);
			pxl(ctx, x + 12, y + 12, COLORS.stoneLight);
			hline(ctx, x, y + 15, 16, '#3a4558');
			break;
		case T.SAND:
			fill(ctx, x, y, COLORS.sand);
			pxl(ctx, x + 5, y + 6, '#b09060');
			pxl(ctx, x + 11, y + 3, '#b09060');
			break;
		case T.SHADOW: {
			const pulse = Math.floor(time / 500) % 2;
			fill(ctx, x, y, COLORS.darkGround);
			if (pulse) pxl(ctx, x + 8, y + 8, COLORS.darkGlow);
			pxl(ctx, x + 3, y + 12, '#301848');
			break;
		}
		case T.FLOWER:
			if (!(wang && wangGrass())) {
				const grass = getSprite('grass');
				if (grass) {
					ctx.imageSmoothingEnabled = false;
					ctx.drawImage(grass, x, y, TILE, TILE);
				} else {
					fill(ctx, x, y, COLORS.grass);
				}
			}
			pxl(ctx, x + 7, y + 8, COLORS.grassLight);
			// petals
			pxl(ctx, x + 7, y + 5, COLORS.accentLight);
			pxl(ctx, x + 5, y + 7, '#f080a0');
			pxl(ctx, x + 9, y + 7, '#f080a0');
			pxl(ctx, x + 7, y + 9, COLORS.gold);
			break;
		case T.SPECIAL:
			fill(ctx, x, y, COLORS.stone);
			// glowing rune
			rect(ctx, x + 4, y + 4, 8, 8, COLORS.primary);
			pxl(ctx, x + 7, y + 7, COLORS.accentLight);
			pxl(ctx, x + 6, y + 6, COLORS.accent);
			pxl(ctx, x + 8, y + 8, COLORS.accent);
			break;
		case T.FOUNTAIN: {
			const fountain = getSprite('fountain');
			if (fountain) {
				// stone base under the prop sprite
				fill(ctx, x, y, COLORS.stone);
				ctx.imageSmoothingEnabled = false;
				ctx.drawImage(fountain, x, y, TILE, TILE);
			} else {
				const splash = Math.floor(time / 300) % 3;
				fill(ctx, x, y, COLORS.stone);
				rect(ctx, x + 3, y + 3, 10, 10, COLORS.water);
				rect(ctx, x + 6, y + 1 + splash, 4, 6, COLORS.waterLight);
				rect(ctx, x + 5, y + 10, 6, 3, COLORS.stoneLight);
			}
			break;
		}
		case T.BRIDGE:
			fill(ctx, x, y, COLORS.water);
			rect(ctx, x, y + 4, 16, 8, '#6b4a28');
			hline(ctx, x, y + 4, 16, '#8a6a40');
			hline(ctx, x, y + 11, 16, '#4a3018');
			break;
		default:
			fill(ctx, x, y, COLORS.grass);
	}
}

/**
 * Draw a dragon character (player or NPC).
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} px pixel x (tile * TILE + offset)
 * @param {number} py pixel y
 * @param {{ color: string, dir?: number, frame?: number, moving?: boolean, walkFrame?: number, isPlayer?: boolean, isBoss?: boolean, belly?: string, spriteKey?: string }} opts
 */
export function drawDragon(ctx, px, py, opts) {
	const {
		color,
		dir = 0,
		frame = 0,
		moving = false,
		walkFrame = 0,
		isPlayer = false,
		isBoss = false,
		belly = COLORS.accentLight,
		spriteKey = null
	} = opts;
	const bob = frame % 2 ? -1 : 0;

	// Directional sprite set (rotations + walk frames) — used by the player
	if (spriteKey && hasDirectionalSet(spriteKey)) {
		const dirName = DIR_NAMES[dir] ?? 'south';
		const img = getDirectionalSprite(spriteKey, dirName, moving, walkFrame);
		if (img) {
			const size = isBoss ? 30 : 26;
			ctx.fillStyle = 'rgba(0,0,0,0.28)';
			ctx.fillRect(px + 3, py + 13, 10, 3);
			drawImageCentered(ctx, img, px, py, { size, bob: moving ? 0 : bob });
			if (isPlayer) {
				ctx.fillStyle = 'rgba(32, 221, 224, 0.25)';
				ctx.fillRect(px + 4, py + 12, 8, 2);
			}
			return;
		}
	}

	// Single-image sprite: flip horizontally when facing left.
	// The source art faces left, so mirroring shows it facing right;
	// for LEFT we draw it unflipped.
	if (spriteKey) {
		const size = isBoss ? 24 : 18;
		// soft shadow under sprite
		ctx.fillStyle = 'rgba(0,0,0,0.28)';
		ctx.fillRect(px + 3, py + 13, 10, 3);
		const flipX = dir === DIR.RIGHT;
		if (drawSprite(ctx, spriteKey, px, py, { size, bob, flipX })) {
			if (isPlayer) {
				// teal glow accent
				ctx.fillStyle = 'rgba(32, 221, 224, 0.25)';
				ctx.fillRect(px + 4, py + 12, 8, 2);
			}
			return;
		}
	}

	const size = isBoss ? 1.4 : 1;
	const ox = px + (isBoss ? -3 : 0);
	const oy = py - Math.abs(bob) + (isBoss ? -4 : 0);

	// shadow
	ctx.fillStyle = 'rgba(0,0,0,0.3)';
	ctx.fillRect(ox + 3, oy + 13, 10 * size, 3);

	// body
	rect(ctx, ox + 4, oy + 6, 8, 7, color);
	// belly
	rect(ctx, ox + 6, oy + 8, 4, 4, belly);
	// head
	rect(ctx, ox + 5, oy + 2, 6, 5, color);
	// snout direction
	if (dir === 1) {
		// left
		rect(ctx, ox + 2, oy + 4, 3, 2, color);
		pxl(ctx, ox + 2, oy + 4, COLORS.lightest);
	} else if (dir === 2) {
		// right
		rect(ctx, ox + 11, oy + 4, 3, 2, color);
		pxl(ctx, ox + 13, oy + 4, COLORS.lightest);
	} else if (dir === 3) {
		// up
		rect(ctx, ox + 6, oy + 0, 4, 3, color);
	} else {
		// down
		rect(ctx, ox + 6, oy + 5, 4, 2, color);
		pxl(ctx, ox + 7, oy + 4, COLORS.lightest);
		pxl(ctx, ox + 9, oy + 4, COLORS.lightest);
	}

	// wings
	const wingColor = isPlayer ? COLORS.accent : shade(color, -30);
	if (dir !== 1) rect(ctx, ox + 11, oy + 5, 3, 5, wingColor);
	if (dir !== 2) rect(ctx, ox + 2, oy + 5, 3, 5, wingColor);

	// horns
	pxl(ctx, ox + 5, oy + 1, COLORS.gold);
	pxl(ctx, ox + 10, oy + 1, COLORS.gold);

	// tail
	if (dir === 1) rect(ctx, ox + 12, oy + 10, 3, 2, color);
	else if (dir === 2) rect(ctx, ox + 1, oy + 10, 3, 2, color);
	else rect(ctx, ox + 7, oy + 12, 2, 3, color);

	if (isBoss) {
		// extra bulk / eyes
		rect(ctx, ox + 3, oy + 3, 12, 10, color);
		rect(ctx, ox + 6, oy + 6, 6, 5, '#4a1080');
		pxl(ctx, ox + 7, oy + 5, COLORS.danger);
		pxl(ctx, ox + 11, oy + 5, COLORS.danger);
		// shadow aura
		ctx.fillStyle = 'rgba(80, 20, 120, 0.25)';
		ctx.fillRect(ox, oy, 18, 18);
	}

	if (isPlayer) {
		// teal glow
		pxl(ctx, ox + 7, oy + 9, COLORS.accentLight);
	}
}

/**
 * Draw a simple enemy blob-dragon.
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} px
 * @param {number} py
 * @param {string} color
 * @param {number} [frame]
 * @param {boolean} [isBoss]
 * @param {string | null} [spriteKey]
 */
export function drawEnemy(ctx, px, py, color, frame = 0, isBoss = false, spriteKey = null) {
	drawDragon(ctx, px, py, {
		color,
		dir: 0,
		frame,
		isBoss,
		belly: isBoss ? '#4a1080' : shade(color, 40),
		spriteKey: spriteKey ?? (isBoss ? 'erebus' : 'shade')
	});
}

export function drawNpcBubble(ctx, px, py) {
	const t = Math.floor(Date.now() / 400) % 2;
	rect(ctx, px + 4, py - 6 - t, 8, 6, COLORS.lightest);
	pxl(ctx, px + 6, py - 4 - t, COLORS.primaryDark);
	pxl(ctx, px + 9, py - 4 - t, COLORS.primaryDark);
	pxl(ctx, px + 7, py - 2 - t, COLORS.primaryDark);
}

// —— primitives ——

function fill(ctx, x, y, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, TILE, TILE);
}

function rect(ctx, x, y, w, h, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, w, h);
}

function pxl(ctx, x, y, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, 1, 1);
}

function hline(ctx, x, y, w, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, w, 1);
}

function shade(hex, amount) {
	const n = parseInt(hex.replace('#', ''), 16);
	let r = (n >> 16) + amount;
	let g = ((n >> 8) & 0xff) + amount;
	let b = (n & 0xff) + amount;
	r = Math.max(0, Math.min(255, r));
	g = Math.max(0, Math.min(255, g));
	b = Math.max(0, Math.min(255, b));
	return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

/** Draw scanline / vignette overlay for retro feel (in screen space after scale). */
export function drawScreenFx(ctx, w, h) {
	ctx.fillStyle = 'rgba(0,0,0,0.08)';
	for (let y = 0; y < h; y += 4) {
		ctx.fillRect(0, y, w, 1);
	}
}
