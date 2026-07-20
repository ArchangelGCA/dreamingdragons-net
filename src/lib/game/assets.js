/**
 * Loads PixelLab sprites for the RPG.
 * Falls back to procedural drawing when an image is missing.
 */

/** @type {Record<string, CanvasImageSource>} */
const images = {};

/** @type {Promise<void> | null} */
let loadPromise = null;

const SPRITE_URLS = {
	rafe: '/game/rafe.png',
	zeno: '/game/zeno.png',
	erebus: '/game/erebus.png',
	nala: '/game/nala.png',
	razel: '/game/razel.png',
	tidekeeper: '/game/tidekeeper.png',
	shade: '/game/shade.png',
	fountain: '/game/fountain.png',
	tileset: '/game/tileset.png'
};

/**
 * Wang tileset crop boxes (from tileset.json bounding_box).
 * lower = pure path, upper = pure grass.
 */
const TILE_CROPS = {
	path: { x: 32, y: 16 }, // all-lower corners
	grass: { x: 0, y: 48 } // all-upper corners
};

/**
 * Start loading all known sprites (idempotent).
 * @returns {Promise<void>}
 */
export function loadAssets() {
	if (loadPromise) return loadPromise;

	if (typeof Image === 'undefined') {
		loadPromise = Promise.resolve();
		return loadPromise;
	}

	const entries = Object.entries(SPRITE_URLS);
	loadPromise = Promise.all(
		entries.map(
			([key, url]) =>
				new Promise((resolve) => {
					const img = new Image();
					img.decoding = 'async';
					img.onload = () => {
						images[key] = img;
						resolve();
					};
					img.onerror = () => resolve();
					img.src = url;
				})
		)
	).then(() => {
		// Slice solid grass/path tiles from the Wang sheet
		const sheet = images.tileset;
		if (sheet && typeof document !== 'undefined') {
			for (const [name, box] of Object.entries(TILE_CROPS)) {
				const tile = cropTile(/** @type {HTMLImageElement} */ (sheet), box.x, box.y, 16, 16);
				if (tile) images[name] = tile;
			}
		}
	});

	return loadPromise;
}

/**
 * @param {HTMLImageElement} sheet
 * @param {number} sx
 * @param {number} sy
 * @param {number} w
 * @param {number} h
 * @returns {HTMLCanvasElement | null}
 */
function cropTile(sheet, sx, sy, w, h) {
	try {
		const c = document.createElement('canvas');
		c.width = w;
		c.height = h;
		const ctx = c.getContext('2d');
		if (!ctx) return null;
		ctx.imageSmoothingEnabled = false;
		ctx.drawImage(sheet, sx, sy, w, h, 0, 0, w, h);
		return c;
	} catch {
		return null;
	}
}

/**
 * @param {string} key
 * @returns {CanvasImageSource | null}
 */
export function getSprite(key) {
	return images[key] ?? null;
}

/**
 * Draw a sprite centered on a 16×16 tile footprint (may be larger than tile).
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} key
 * @param {number} px left of tile in buffer pixels
 * @param {number} py top of tile in buffer pixels
 * @param {{ size?: number, bob?: number }} [opts]
 * @returns {boolean} true if drawn
 */
export function drawSprite(ctx, key, px, py, opts = {}) {
	const img = images[key];
	if (!img) return false;

	const size = opts.size ?? 16;
	const bob = opts.bob ?? 0;
	const ox = px + (16 - size) / 2;
	const oy = py + (16 - size) / 2 + bob - Math.max(0, (size - 16) * 0.35);

	ctx.imageSmoothingEnabled = false;
	ctx.drawImage(img, ox, oy, size, size);
	return true;
}

/**
 * Map NPC face / id to sprite key.
 * @param {{ id?: string, face?: string, dialogueKey?: string, name?: string }} npc
 */
export function spriteKeyForNpc(npc) {
	const id = npc.id ?? '';
	const face = npc.face ?? '';
	const key = npc.dialogueKey ?? '';

	if (id === 'zeno' || face === 'zeno' || key === 'zeno') return 'zeno';
	if (id === 'nala' || face === 'fire' || key === 'nala') return 'nala';
	if (id === 'razel' || face === 'wind' || key === 'razel') return 'razel';
	if (id === 'tidekeeper' || face === 'water' || key === 'tidekeeper') return 'tidekeeper';
	if (face === 'healer' || key === 'healer' || id.includes('healer')) return 'fountain';
	if (face === 'elder' || key === 'elder_pyra') return 'nala';
	if (face === 'guard' || key === 'guard') return 'zeno';
	if (face === 'merchant' || key === 'merchant') return 'razel';
	return 'rafe';
}

/**
 * Map enemy to sprite key.
 * @param {{ id?: string, isBoss?: boolean, name?: string }} enemy
 */
export function spriteKeyForEnemy(enemy) {
	if (enemy.isBoss || enemy.id === 'erebus' || (enemy.name ?? '').includes('Erebus')) {
		return 'erebus';
	}
	return 'shade';
}
