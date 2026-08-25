/**
 * Reachability + integrity checker for the /game RPG maps.
 *
 * Verifies, using the same walkability rules as the engine:
 *  - every map's spawn point is walkable
 *  - every exit is reachable from the map spawn and from the world spawn
 *  - every NPC can be talked to (a reachable adjacent cell exists)
 *  - every enemy can be engaged (a reachable adjacent cell exists)
 *  - every exit lands on a walkable, NPC-free tile in the target map
 *  - the full quest path is playable: nestvale → forest → city → shore →
 *    dark gate (3 shards) → shadow scar → lair → Erebus
 *
 * Run:  node scripts/check-game-maps.mjs
 */
import { WORLDS, SOLID } from '../src/lib/game/maps.js';

let failures = 0;
const fail = (msg) => {
	failures++;
	console.error(`  FAIL  ${msg}`);
};
const ok = (msg) => console.log(`  ok    ${msg}`);

const keyOf = (x, y) => `${x},${y}`;

function isWalkable(world, x, y) {
	if (y < 0 || x < 0 || y >= world.map.h || x >= world.map.w) {
		return world.exits.some((e) => e.x === x && e.y === y);
	}
	return !SOLID.has(world.map.tiles[y][x]);
}

/** BFS from `from` inside one map. NPC tiles blocked; enemy tiles passable. */
function reachableSet(world, from) {
	const seen = new Set();
	const q = [];
	if (isWalkable(world, from.x, from.y)) {
		seen.add(keyOf(from.x, from.y));
		q.push(from);
	}
	const dirs = [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0]
	];
	while (q.length) {
		const cur = q.shift();
		for (const [dx, dy] of dirs) {
			const nx = cur.x + dx;
			const ny = cur.y + dy;
			const k = keyOf(nx, ny);
			if (seen.has(k)) continue;
			if (!isWalkable(world, nx, ny)) continue;
			if (world.npcs.some((n) => n.x === nx && n.y === ny)) continue;
			seen.add(k);
			q.push({ x: nx, y: ny });
		}
	}
	return seen;
}

/** True if any 4-neighbor of (x,y) is reachable (or the cell itself, when walkable). */
function touches(reach, x, y) {
	if (reach.has(keyOf(x, y))) return true;
	return [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0]
	].some(([dx, dy]) => reach.has(keyOf(x + dx, y + dy)));
}

// Exits gated behind shards are excluded from the pre-shard pass.
// Returns the set of map ids that are reachable in this pass.
function checkWorld({ shards, expectUnreachable = new Set() }) {
	console.log(`\n=== Pass with shards=${shards} ===`);
	const reachByMap = new Map();

	// Cross-map BFS: start at nestvale spawn, expand intra-map then follow exits w/o shard gate.
	const start = WORLDS.nestvale.spawn;
	const mapQueue = ['nestvale'];
	const visitedMaps = new Set();

	while (mapQueue.length) {
		const mapId = mapQueue.shift();
		if (visitedMaps.has(mapId)) continue;
		visitedMaps.add(mapId);
		const world = WORLDS[mapId];

		// A map's region starts from wherever we land in it. Merge reachability
		// from every already-known landing point (spawn for nestvale, exit targets otherwise).
		const entries =
			mapId === 'nestvale'
				? [start]
				: Object.values(WORLDS)
						.flatMap((w) => w.exits)
						.filter((e) => e.toMap === mapId && visitedMaps.has(e.map))
						.filter((e) => !(e.requireShards && e.requireShards > shards))
						.map((e) => ({ x: e.toX, y: e.toY }));
		if (mapId !== 'nestvale' && entries.length === 0) continue;

		// Union of BFS from each entry point (regions could be disjoint).
		const reach = new Set();
		for (const entry of entries) {
			for (const k of reachableSet(world, entry)) reach.add(k);
		}
		reachByMap.set(mapId, reach);

		// Follow usable exits
		for (const ex of world.exits) {
			if (ex.requireShards && ex.requireShards > shards) continue;
			if (touches(reach, ex.x, ex.y) && !visitedMaps.has(ex.toMap)) mapQueue.push(ex.toMap);
		}
	}

	for (const [mapId, world] of Object.entries(WORLDS)) {
		console.log(`\n${mapId} (${world.name})`);
		const reach = reachByMap.get(mapId);
		if (!reach) {
			if (expectUnreachable.has(mapId)) {
				ok(`${mapId}: unreachable here but reachable via shard gate (expected)`);
			} else {
				fail(`${mapId}: map not reachable in this pass`);
			}
			continue;
		}

		// spawn walkable
		if (isWalkable(world, world.spawn.x, world.spawn.y)) ok(`spawn (${world.spawn.x},${world.spawn.y}) walkable`);
		else fail(`${mapId}: spawn (${world.spawn.x},${world.spawn.y}) is NOT walkable`);

		// exits
		for (const ex of world.exits) {
			const label = `exit (${ex.x},${ex.y}) -> ${ex.toMap}(${ex.toX},${ex.toY})`;
			const gated = ex.requireShards && ex.requireShards > shards;
			if (!gated && !touches(reach, ex.x, ex.y)) fail(`${mapId}: ${label} not reachable`);
			else ok(`${label} reachable${gated ? ' (gated, expected)' : ''}`);

			// landing integrity
			const target = WORLDS[ex.toMap];
			if (!target) {
				fail(`${mapId}: ${label} targets unknown map`);
				continue;
			}
			if (!isWalkable(target, ex.toX, ex.toY)) {
				fail(`${mapId}: ${label} lands on non-walkable tile in ${ex.toMap}`);
			}
			if (target.npcs.some((n) => n.x === ex.toX && n.y === ex.toY)) {
				fail(`${mapId}: ${label} lands on NPC tile (${target.npcs.find((n) => n.x === ex.toX && n.y === ex.toY).id})`);
			}
		}

		// NPCs
		for (const npc of world.npcs) {
			if (touches(reach, npc.x, npc.y)) ok(`npc ${npc.id} (${npc.x},${npc.y}) talkable`);
			else fail(`${mapId}: npc ${npc.id} (${npc.x},${npc.y}) NOT reachable`);
		}

		// enemies
		for (const en of world.enemies) {
			if (touches(reach, en.x, en.y)) ok(`enemy ${en.id} (${en.x},${en.y}) engageable`);
			else fail(`${mapId}: enemy ${en.id} (${en.x},${en.y}) NOT reachable`);
		}
	}

	// quest-critical points
	const quest = [
		['nestvale', 'elder_pyra'],
		['forest', 'zeno'],
		['city', 'nala'],
		['city', 'razel'],
		['city', 'gatekeeper'],
		['shore', 'tidekeeper']
	];
	console.log('\nQuest NPC reachability:');
	for (const [mapId, npcId] of quest) {
		const world = WORLDS[mapId];
		const npc = world.npcs.find((n) => n.id === npcId);
		const reach = reachByMap.get(mapId);
		if (!npc || !reach || !touches(reach, npc.x, npc.y)) {
			fail(`quest npc ${npcId} on ${mapId} NOT reachable`);
		}
	}
	if (shards >= 3) {
		const reach = reachByMap.get('lair');
		const erebus = WORLDS.lair.enemies[0];
		if (!reach || !touches(reach, erebus.x, erebus.y)) fail('boss Erebus NOT reachable');
		else ok('boss Erebus reachable');
	}
	return reachByMap;
}

// First pass with the full game unlock (3 shards): every map must be reachable.
checkWorld({ shards: 3 });

// Second pass from a fresh run: maps only reachable once the shard gate opens
// are expected to be unreachable here. A map is "gate-only" if every entrance
// route goes through an exit carrying a shard requirement.
/**
 * @param {string} mapId
 * @returns {boolean}
 */
function reachableWithoutGates(mapId) {
	if (mapId === 'nestvale') return true;
	const seen = new Set(['nestvale']);
	const queue = ['nestvale'];
	while (queue.length) {
		const cur = queue.shift();
		for (const ex of WORLDS[cur].exits) {
			if (ex.requireShards) continue;
			if (!seen.has(ex.toMap)) {
				if (ex.toMap === mapId) return true;
				seen.add(ex.toMap);
				queue.push(ex.toMap);
			}
		}
	}
	return false;
}
const gateOnly = new Set(Object.keys(WORLDS).filter((id) => !reachableWithoutGates(id)));
checkWorld({ shards: 0, expectUnreachable: gateOnly });

console.log('');
if (failures) {
	console.error(`${failures} problem(s) found`);
	process.exit(1);
}
console.log('All map checks passed.');
