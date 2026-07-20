import { DIR, KEY, TILE, keyMatches } from './constants.js';
import { WORLDS, getTile, isSolid } from './maps.js';
import { DIALOGUES, getQuestText } from './story.js';

/**
 * Create a fresh game state for a new playthrough.
 */
export function createState() {
	const world = WORLDS.nestvale;
	return {
		mode: 'title', // title | intro | play | dialogue | combat | victory | gameover
		mapId: 'nestvale',
		player: {
			x: world.spawn.x,
			y: world.spawn.y,
			px: world.spawn.x * TILE,
			py: world.spawn.y * TILE,
			dir: DIR.DOWN,
			moving: false,
			moveT: 0,
			fromX: world.spawn.x,
			fromY: world.spawn.y,
			toX: world.spawn.x,
			toY: world.spawn.y,
			hp: 30,
			maxHp: 30,
			atk: 6,
			level: 1,
			exp: 0,
			expToLevel: 20
		},
		flags: {
			talkedElder: false,
			metZeno: false,
			gotFire: false,
			gotWind: false,
			gotWater: false,
			shards: 0,
			victory: false,
			erebusIntro: false
		},
		/** @type {Record<string, Set<string>>} */
		defeated: {},
		/** @type {Record<string, Set<string>>} */
		talkedOnce: {},
		/** Live enemy copies per map */
		enemies: cloneEnemies('nestvale'),
		dialogue: {
			lines: /** @type {string[]} */ ([]),
			index: 0,
			npcId: null,
			onComplete: null
		},
		combat: {
			enemy: null,
			log: [],
			phase: 'player', // player | enemy | win | lose
			animT: 0
		},
		introIndex: 0,
		toast: '',
		toastT: 0,
		frame: 0,
		time: 0,
		keys: new Set(),
		justPressed: new Set(),
		moveCooldown: 0,
		questText: getQuestText({ talkedElder: false, metZeno: false, shards: 0, victory: false })
	};
}

function cloneEnemies(mapId) {
	const world = WORLDS[mapId];
	return world.enemies.map((e) => ({ ...e, hp: e.hp, maxHp: e.maxHp }));
}

export function ensureMapEnemies(state, mapId) {
	if (!state.enemies || state.mapId !== mapId) {
		// handled by switchMap
	}
	const defeated = state.defeated[mapId] ?? new Set();
	const base = WORLDS[mapId].enemies;
	state.enemies = base
		.filter((e) => !defeated.has(e.id))
		.map((e) => {
			const existing = state.enemies?.find((x) => x.id === e.id);
			return existing ? existing : { ...e };
		});
}

export function switchMap(state, mapId, x, y) {
	state.mapId = mapId;
	state.player.x = x;
	state.player.y = y;
	state.player.px = x * TILE;
	state.player.py = y * TILE;
	state.player.fromX = x;
	state.player.fromY = y;
	state.player.toX = x;
	state.player.toY = y;
	state.player.moving = false;
	const defeated = state.defeated[mapId] ?? new Set();
	state.enemies = WORLDS[mapId].enemies
		.filter((e) => !defeated.has(e.id))
		.map((e) => ({ ...e }));
}

export function updateQuest(state) {
	state.questText = getQuestText(state.flags);
}

export function showToast(state, msg, duration = 120) {
	state.toast = msg;
	state.toastT = duration;
}

/** Process one input frame for exploration. */
export function updatePlay(state, dt) {
	state.time += dt;
	state.frame = Math.floor(state.time / 200);

	if (state.toastT > 0) {
		state.toastT--;
		if (state.toastT <= 0) state.toast = '';
	}

	const p = state.player;

	if (p.moving) {
		p.moveT += dt / 180; // ~180ms per tile
		if (p.moveT >= 1) {
			p.moveT = 1;
			p.x = p.toX;
			p.y = p.toY;
			p.px = p.x * TILE;
			p.py = p.y * TILE;
			p.moving = false;
			onStep(state);
		} else {
			p.px = lerp(p.fromX, p.toX, p.moveT) * TILE;
			p.py = lerp(p.fromY, p.toY, p.moveT) * TILE;
		}
		return;
	}

	// Interaction
	if (pressed(state, KEY.ACTION)) {
		tryInteract(state);
		return;
	}

	// Movement
	let dx = 0;
	let dy = 0;
	if (held(state, KEY.UP)) {
		dy = -1;
		p.dir = DIR.UP;
	} else if (held(state, KEY.DOWN)) {
		dy = 1;
		p.dir = DIR.DOWN;
	} else if (held(state, KEY.LEFT)) {
		dx = -1;
		p.dir = DIR.LEFT;
	} else if (held(state, KEY.RIGHT)) {
		dx = 1;
		p.dir = DIR.RIGHT;
	}

	if (dx !== 0 || dy !== 0) {
		tryMove(state, dx, dy);
	}
}

function tryMove(state, dx, dy) {
	const p = state.player;
	const nx = p.x + dx;
	const ny = p.y + dy;
	const world = WORLDS[state.mapId];

	// Exit check first (even if "solid" edge)
	const exit = world.exits.find((e) => e.x === nx && e.y === ny);
	if (exit) {
		if (exit.requireShards && state.flags.shards < exit.requireShards) {
			const need = exit.requireShards - state.flags.shards;
			showToast(
				state,
				`Need ${exit.requireShards} shards (${state.flags.shards}/3). ${need} more!`
			);
			return;
		}
		// Allow stepping onto exit tile from current side
		if (canWalk(state.mapId, nx, ny) || exit) {
			// If exit tile is solid tree wall with exit on edge, still allow
			switchMap(state, exit.toMap, exit.toX, exit.toY);
			showToast(state, WORLDS[exit.toMap].name);
			return;
		}
	}

	// Also check if player is ON an exit and tries to leave that direction
	const hereExit = world.exits.find((e) => e.x === p.x && e.y === p.y);
	if (hereExit && (dx !== 0 || dy !== 0)) {
		// handled when stepping onto exit
	}

	if (!canWalk(state.mapId, nx, ny)) return;

	// Block NPC tiles
	if (world.npcs.some((n) => n.x === nx && n.y === ny)) return;

	// Enemy collision → combat
	const enemy = state.enemies.find((e) => e.x === nx && e.y === ny && e.hp > 0);
	if (enemy) {
		startCombat(state, enemy);
		return;
	}

	p.fromX = p.x;
	p.fromY = p.y;
	p.toX = nx;
	p.toY = ny;
	p.moving = true;
	p.moveT = 0;
}

function canWalk(mapId, x, y) {
	const world = WORLDS[mapId];
	if (y < 0 || x < 0 || y >= world.map.h || x >= world.map.w) {
		// Check exits that sit on the border outside or on edge
		return world.exits.some((e) => e.x === x && e.y === y);
	}
	const tile = getTile(mapId, x, y);
	if (isSolid(tile)) {
		// bridges over water are walkable; water is solid
		return false;
	}
	return true;
}

function onStep(state) {
	const p = state.player;
	const world = WORLDS[state.mapId];

	// Stepped on exit tile
	const exit = world.exits.find((e) => e.x === p.x && e.y === p.y);
	if (exit) {
		if (exit.requireShards && state.flags.shards < exit.requireShards) {
			showToast(state, `Need ${exit.requireShards} shards!`);
			// bounce back slightly not needed if they walked onto it from city
			return;
		}
		switchMap(state, exit.toMap, exit.toX, exit.toY);
		showToast(state, WORLDS[exit.toMap].name);
		return;
	}

	// Fountain heal
	const tile = getTile(state.mapId, p.x, p.y);
	if (tile === 9) {
		if (p.hp < p.maxHp) {
			p.hp = p.maxHp;
			showToast(state, 'Fully healed!');
		}
	}
}

function tryInteract(state) {
	const p = state.player;
	const fx = p.x + (p.dir === DIR.LEFT ? -1 : p.dir === DIR.RIGHT ? 1 : 0);
	const fy = p.y + (p.dir === DIR.UP ? -1 : p.dir === DIR.DOWN ? 1 : 0);
	const world = WORLDS[state.mapId];

	// NPC in front
	let npc = world.npcs.find((n) => n.x === fx && n.y === fy);
	// or same tile (fountain)
	if (!npc) npc = world.npcs.find((n) => n.x === p.x && n.y === p.y);

	if (npc) {
		startDialogue(state, npc);
		return;
	}

	// Check adjacent exit label
	const exit = world.exits.find((e) => e.x === fx && e.y === fy);
	if (exit) {
		showToast(state, exit.label ?? 'Path');
	}
}

function startDialogue(state, npc) {
	const key = npc.dialogueKey;
	const scripts = DIALOGUES[key];
	if (!scripts) return;

	const talked = state.talkedOnce[state.mapId] ?? new Set();
	const once = talked.has(npc.id);

	let lines;
	if (key === 'elder_pyra') {
		if (state.flags.shards >= 3) lines = scripts.after_shards;
		else if (state.flags.metZeno) lines = scripts.after_zeno;
		else lines = scripts.default;
	} else if (key === 'gatekeeper') {
		if (state.flags.shards >= 3 && scripts.after_shards) lines = scripts.after_shards;
		else lines = scripts.default;
	} else if (once && scripts.after) {
		lines = scripts.after;
	} else {
		lines = scripts.default;
	}

	// Healer always heals
	if (key === 'healer') {
		state.player.hp = state.player.maxHp;
		showToast(state, 'Fully healed!');
	}

	state.mode = 'dialogue';
	state.dialogue = {
		lines: [...lines],
		index: 0,
		npcId: npc.id,
		onComplete: () => finishDialogue(state, npc)
	};
}

function finishDialogue(state, npc) {
	const talked = state.talkedOnce[state.mapId] ?? new Set();
	talked.add(npc.id);
	state.talkedOnce[state.mapId] = talked;

	const key = npc.dialogueKey;

	if (key === 'elder_pyra') {
		state.flags.talkedElder = true;
	}
	if (key === 'zeno') {
		state.flags.metZeno = true;
	}
	let gotShard = false;
	if (key === 'nala' && !state.flags.gotFire) {
		state.flags.gotFire = true;
		state.flags.shards++;
		// Fire warms the core — small max HP boost
		state.player.maxHp += 4;
		state.player.hp = Math.min(state.player.maxHp, state.player.hp + 4);
		gotShard = true;
		showToast(state, 'Fire Shard! Core burns brighter (' + state.flags.shards + '/3)');
	}
	if (key === 'razel' && !state.flags.gotWind) {
		state.flags.gotWind = true;
		state.flags.shards++;
		// Wind sharpens strikes
		state.player.atk += 1;
		gotShard = true;
		showToast(state, 'Wind Shard! +1 ATK (' + state.flags.shards + '/3)');
	}
	if (key === 'tidekeeper' && !state.flags.gotWater) {
		state.flags.gotWater = true;
		state.flags.shards++;
		// Water cools and mends
		state.player.hp = state.player.maxHp;
		gotShard = true;
		showToast(state, 'Water Shard! Fully restored (' + state.flags.shards + '/3)');
	}

	if (gotShard && state.flags.shards >= 3) {
		showToast(state, 'All 3 shards! Dark gate south of Bright City opens!', 180);
	}

	updateQuest(state);
	state.mode = 'play';
}

export function advanceDialogue(state) {
	const d = state.dialogue;
	if (d.index < d.lines.length - 1) {
		d.index++;
	} else {
		const world = WORLDS[state.mapId];
		const npc = world.npcs.find((n) => n.id === d.npcId);
		if (d.onComplete) d.onComplete();
		else if (npc) finishDialogue(state, npc);
		else state.mode = 'play';
	}
}

// —— Combat ——

function startCombat(state, enemy) {
	if (enemy.isBoss && !state.flags.erebusIntro) {
		state.flags.erebusIntro = true;
		state.mode = 'dialogue';
		state.dialogue = {
			lines: [...DIALOGUES.erebus_intro.default],
			index: 0,
			npcId: null,
			onComplete: () => {
				beginFight(state, enemy);
			}
		};
		return;
	}
	beginFight(state, enemy);
}

function beginFight(state, enemy) {
	state.mode = 'combat';
	state.combat = {
		enemy: { ...enemy },
		log: [`A wild ${enemy.name} appears!`],
		phase: 'player',
		animT: 0
	};
}

export function combatAction(state, action) {
	const c = state.combat;
	if (c.phase !== 'player') return;
	const p = state.player;
	const e = c.enemy;

	// Shards empower combat slightly (finishable even if under-leveled)
	const shardBonus = state.flags.shards || 0;

	if (action === 'attack') {
		const dmg = Math.max(1, p.atk + shardBonus + rand(-1, 2));
		e.hp -= dmg;
		c.log = [`You strike for ${dmg} damage!`];
		if (e.hp <= 0) {
			e.hp = 0;
			c.phase = 'win';
			c.log = [`${e.name} is defeated!`];
			return;
		}
		c.phase = 'enemy';
		c.animT = 20;
	} else if (action === 'breath') {
		// Stronger attack; shards add elemental bite
		const dmg = Math.max(2, Math.floor(p.atk * 1.6) + shardBonus + rand(0, 2));
		e.hp -= dmg;
		const label =
			state.flags.gotFire && state.flags.gotWind && state.flags.gotWater
				? 'Tri-element breath!'
				: 'Dragon breath!';
		c.log = [`${label} ${dmg} damage!`];
		if (e.hp <= 0) {
			e.hp = 0;
			c.phase = 'win';
			c.log = [`${e.name} is defeated!`];
			return;
		}
		c.phase = 'enemy';
		c.animT = 20;
	} else if (action === 'heal') {
		const heal = 8 + rand(0, 4) + (state.flags.gotWater ? 3 : 0);
		p.hp = Math.min(p.maxHp, p.hp + heal);
		c.log = [`You mend scales (+${heal} HP).`];
		c.phase = 'enemy';
		c.animT = 20;
	} else if (action === 'flee') {
		if (e.isBoss) {
			c.log = ['Cannot flee from Erebus!'];
			return;
		}
		if (Math.random() < 0.65) {
			c.log = ['You fled!'];
			state.mode = 'play';
			// step back
			const p2 = state.player;
			p2.x = p2.fromX;
			p2.y = p2.fromY;
			p2.px = p2.x * TILE;
			p2.py = p2.y * TILE;
			return;
		}
		c.log = ['Could not escape!'];
		c.phase = 'enemy';
		c.animT = 20;
	}
}

export function updateCombat(state) {
	const c = state.combat;
	if (c.phase === 'enemy') {
		c.animT--;
		if (c.animT <= 0) {
			const p = state.player;
			const e = c.enemy;
			const dmg = Math.max(1, e.atk + rand(-1, 1));
			p.hp -= dmg;
			c.log = [`${e.name} hits for ${dmg}!`];
			if (p.hp <= 0) {
				p.hp = 0;
				c.phase = 'lose';
				c.log = ['You were defeated…'];
			} else {
				c.phase = 'player';
			}
		}
	}
}

export function resolveCombatEnd(state) {
	const c = state.combat;
	if (c.phase === 'win') {
		const e = c.enemy;
		const defeated = state.defeated[state.mapId] ?? new Set();
		defeated.add(e.id);
		state.defeated[state.mapId] = defeated;
		state.enemies = state.enemies.filter((x) => x.id !== e.id);

		// EXP
		const p = state.player;
		p.exp += e.exp;
		let leveled = false;
		while (p.exp >= p.expToLevel) {
			p.exp -= p.expToLevel;
			p.level++;
			p.maxHp += 5;
			p.hp = p.maxHp;
			p.atk += 2;
			p.expToLevel = Math.floor(p.expToLevel * 1.4);
			leveled = true;
		}

		if (e.isBoss) {
			state.flags.victory = true;
			updateQuest(state);
			state.mode = 'dialogue';
			state.dialogue = {
				lines: [...DIALOGUES.victory.default],
				index: 0,
				npcId: null,
				onComplete: () => {
					state.mode = 'victory';
				}
			};
			return;
		}

		showToast(state, leveled ? `Level up! Now Lv.${p.level}` : `+${e.exp} EXP`);
		state.mode = 'play';
	} else if (c.phase === 'lose') {
		state.mode = 'gameover';
	}
}

/**
 * Soft continue after defeat: keep shards, levels, and defeated foes;
 * respawn healed at Nestvale so the run stays finishable.
 */
export function continueAfterDefeat(state) {
	const p = state.player;
	p.hp = p.maxHp;
	switchMap(state, 'nestvale', WORLDS.nestvale.spawn.x, WORLDS.nestvale.spawn.y);
	state.mode = 'play';
	state.combat = {
		enemy: null,
		log: [],
		phase: 'player',
		animT: 0
	};
	showToast(state, 'You wake by the Dreamspring… try again.', 140);
	updateQuest(state);
}

// —— Input helpers ——

export function onKeyDown(state, key) {
	state.keys.add(key);
	state.justPressed.add(key);
}

export function onKeyUp(state, key) {
	state.keys.delete(key);
}

export function clearJustPressed(state) {
	state.justPressed.clear();
}

function held(state, group) {
	for (const k of group) if (state.keys.has(k)) return true;
	return false;
}

function pressed(state, group) {
	for (const k of group) if (state.justPressed.has(k)) return true;
	return false;
}

export function wasActionPressed(state) {
	return pressed(state, KEY.ACTION);
}

export function wasCancelPressed(state) {
	return pressed(state, KEY.CANCEL);
}

function lerp(a, b, t) {
	return a + (b - a) * t;
}

function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { keyMatches, KEY, DIR };
