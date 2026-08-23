<script>
	import {
		CANVAS_W,
		CANVAS_H,
		TILE,
		VIEW_W,
		VIEW_H,
		COLORS,
		KEY
	} from './constants.js';
	import { WORLDS } from './maps.js';
	import { drawTile, drawDragon, drawEnemy, drawNpcBubble, drawScreenFx } from './sprites.js';
	import { loadAssets, spriteKeyForNpc, spriteKeyForEnemy } from './assets.js';
	import {
		createState,
		updatePlay,
		advanceDialogue,
		combatAction,
		updateCombat,
		resolveCombatEnd,
		continueAfterDefeat,
		onKeyDown,
		onKeyUp,
		clearJustPressed,
		wasActionPressed
	} from './engine.js';
	import { GAME_TITLE, GAME_SUBTITLE, INTRO } from './story.js';

	let canvas = $state(/** @type {HTMLCanvasElement | null} */ (null));
	let state = $state(createState());
	let focused = $state(false);

	// Offscreen buffer at native tile resolution
	/** @type {HTMLCanvasElement | null} */
	let buffer = null;
	/** @type {CanvasRenderingContext2D | null} */
	let bctx = null;

	$effect(() => {
		loadAssets();
	});

	$effect(() => {
		if (!canvas) return;

		buffer = document.createElement('canvas');
		buffer.width = VIEW_W * TILE;
		buffer.height = VIEW_H * TILE;
		bctx = buffer.getContext('2d');
		if (bctx) {
			bctx.imageSmoothingEnabled = false;
		}

		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		ctx.imageSmoothingEnabled = false;

		let raf = 0;
		let last = performance.now();

		const loop = (now) => {
			const dt = Math.min(50, now - last);
			last = now;
			tick(dt);
			render(ctx);
			clearJustPressed(state);
			raf = requestAnimationFrame(loop);
		};

		raf = requestAnimationFrame(loop);

		return () => cancelAnimationFrame(raf);
	});

	function tick(dt) {
		const s = state;

		if (s.mode === 'title') {
			if (wasActionPressed(s)) {
				s.mode = 'intro';
				s.introIndex = 0;
			}
			return;
		}

		if (s.mode === 'intro') {
			if (wasActionPressed(s)) {
				if (s.introIndex < INTRO.length - 1) s.introIndex++;
				else {
					s.mode = 'play';
				}
			}
			return;
		}

		if (s.mode === 'dialogue') {
			if (wasActionPressed(s)) advanceDialogue(s);
			return;
		}

		if (s.mode === 'combat') {
			updateCombat(s);
			if (s.combat.phase === 'player' && wasActionPressed(s)) {
				// default attack on action if no menu selection — menu uses buttons
			}
			if (s.combat.phase === 'win' || s.combat.phase === 'lose') {
				if (wasActionPressed(s)) resolveCombatEnd(s);
			}
			return;
		}

		if (s.mode === 'victory') {
			if (wasActionPressed(s)) {
				state = createState();
			}
			return;
		}

		if (s.mode === 'gameover') {
			if (wasActionPressed(s)) {
				// Soft continue: keep progress, respawn in Nestvale
				continueAfterDefeat(s);
			}
			return;
		}

		if (s.mode === 'play') {
			updatePlay(s, dt);
		}
	}

	// Snapshot UI fields so Svelte re-renders overlays (HTML text stays sharp).
	// Canvas only paints the pixel world — never text.
	let ui = $state({
		mode: 'title',
		introIndex: 0,
		toast: '',
		questText: '',
		location: 'Nestvale',
		hp: 30,
		maxHp: 30,
		level: 1,
		shards: 0,
		gotFire: false,
		gotWind: false,
		gotWater: false,
		dialogueLine: '',
		combat: /** @type {null | { name: string, isBoss: boolean, hp: number, maxHp: number, log: string, phase: string, playerHp: number, playerMaxHp: number }} */ (
			null
		)
	});

	function syncUi() {
		const s = state;
		const loc = WORLDS[s.mapId]?.name ?? '';
		const dialogueLine = s.dialogue.lines[s.dialogue.index] ?? '';

		// Only write when values change to avoid thrashing Svelte every frame
		if (ui.mode !== s.mode) ui.mode = s.mode;
		if (ui.introIndex !== s.introIndex) ui.introIndex = s.introIndex;
		if (ui.toast !== s.toast) ui.toast = s.toast;
		if (ui.questText !== s.questText) ui.questText = s.questText;
		if (ui.location !== loc) ui.location = loc;
		if (ui.hp !== s.player.hp) ui.hp = s.player.hp;
		if (ui.maxHp !== s.player.maxHp) ui.maxHp = s.player.maxHp;
		if (ui.level !== s.player.level) ui.level = s.player.level;
		if (ui.shards !== s.flags.shards) ui.shards = s.flags.shards;
		if (ui.gotFire !== s.flags.gotFire) ui.gotFire = s.flags.gotFire;
		if (ui.gotWind !== s.flags.gotWind) ui.gotWind = s.flags.gotWind;
		if (ui.gotWater !== s.flags.gotWater) ui.gotWater = s.flags.gotWater;
		if (ui.dialogueLine !== dialogueLine) ui.dialogueLine = dialogueLine;

		if (s.mode === 'combat' && s.combat.enemy) {
			const e = s.combat.enemy;
			const log = s.combat.log[s.combat.log.length - 1] ?? '';
			const next = {
				name: e.name,
				isBoss: !!e.isBoss,
				hp: Math.max(0, e.hp),
				maxHp: e.maxHp,
				log,
				phase: s.combat.phase,
				playerHp: s.player.hp,
				playerMaxHp: s.player.maxHp
			};
			const prev = ui.combat;
			if (
				!prev ||
				prev.name !== next.name ||
				prev.isBoss !== next.isBoss ||
				prev.hp !== next.hp ||
				prev.maxHp !== next.maxHp ||
				prev.log !== next.log ||
				prev.phase !== next.phase ||
				prev.playerHp !== next.playerHp ||
				prev.playerMaxHp !== next.playerMaxHp
			) {
				ui.combat = next;
			}
		} else if (ui.combat !== null) {
			ui.combat = null;
		}
	}

	const hpPct = $derived(ui.maxHp > 0 ? Math.max(0, Math.min(100, (ui.hp / ui.maxHp) * 100)) : 0);
	const enemyHpPct = $derived(
		ui.combat && ui.combat.maxHp > 0
			? Math.max(0, Math.min(100, (ui.combat.hp / ui.combat.maxHp) * 100))
			: 0
	);
	const combatPlayerHpPct = $derived(
		ui.combat && ui.combat.playerMaxHp > 0
			? Math.max(0, Math.min(100, (ui.combat.playerHp / ui.combat.playerMaxHp) * 100))
			: 0
	);

	function render(ctx) {
		const s = state;
		if (!bctx || !buffer) return;

		// Pixel world only (no text — HTML overlays handle all readable UI)
		bctx.fillStyle = COLORS.bg;
		bctx.fillRect(0, 0, buffer.width, buffer.height);

		if (s.mode === 'title') {
			drawTitleScene(bctx);
		} else if (s.mode === 'intro') {
			bctx.fillStyle = COLORS.primaryDark;
			bctx.fillRect(0, 0, buffer.width, buffer.height);
		} else if (s.mode === 'victory' || s.mode === 'gameover') {
			drawEndScene(bctx, s.mode === 'victory');
		} else {
			drawWorld(bctx, s);
			if (s.mode === 'combat') drawCombatScene(bctx, s);
		}

		// Soft scanlines on pixel buffer only (before upscale)
		drawScreenFx(bctx, buffer.width, buffer.height);

		ctx.fillStyle = COLORS.bg;
		ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
		ctx.imageSmoothingEnabled = false;
		ctx.drawImage(buffer, 0, 0, CANVAS_W, CANVAS_H);

		syncUi();
	}

	function camera(s) {
		const world = WORLDS[s.mapId];
		const p = s.player;
		let cx = p.px / TILE + 0.5 - VIEW_W / 2;
		let cy = p.py / TILE + 0.5 - VIEW_H / 2;
		cx = Math.max(0, Math.min(world.map.w - VIEW_W, cx));
		cy = Math.max(0, Math.min(world.map.h - VIEW_H, cy));
		// If map smaller than view, center
		if (world.map.w < VIEW_W) cx = (world.map.w - VIEW_W) / 2;
		if (world.map.h < VIEW_H) cy = (world.map.h - VIEW_H) / 2;
		return { cx, cy };
	}

	function drawWorld(ctx, s) {
		const world = WORLDS[s.mapId];
		const { cx, cy } = camera(s);
		const startX = Math.floor(cx);
		const startY = Math.floor(cy);
		const offX = -(cx - startX) * TILE;
		const offY = -(cy - startY) * TILE;

		for (let ty = startY - 1; ty <= startY + VIEW_H + 1; ty++) {
			for (let tx = startX - 1; tx <= startX + VIEW_W + 1; tx++) {
				if (ty < 0 || tx < 0 || ty >= world.map.h || tx >= world.map.w) {
					// void
					ctx.fillStyle = COLORS.primaryDark;
					ctx.fillRect((tx - startX) * TILE + offX, (ty - startY) * TILE + offY, TILE, TILE);
					continue;
				}
			const dx = tx - startX;
			const dy = ty - startY;
			// drawTile draws at the origin; translate into place
			ctx.save();
			ctx.translate(dx * TILE + offX, dy * TILE + offY);
			drawTile(ctx, s.mapId, tx, ty, s.time);
			ctx.restore();
			}
		}

		// Exit path hints (subtle glow on exit tiles)
		for (const ex of world.exits) {
			const locked = ex.requireShards && s.flags.shards < ex.requireShards;
			const sx = (ex.x - cx) * TILE;
			const sy = (ex.y - cy) * TILE;
			if (sx < -TILE || sy < -TILE || sx > VIEW_W * TILE || sy > VIEW_H * TILE) continue;
			const pulse = Math.floor(s.time / 350) % 2;
			ctx.fillStyle = locked
				? 'rgba(120, 40, 80, 0.35)'
				: pulse
					? 'rgba(32, 221, 224, 0.45)'
					: 'rgba(32, 221, 224, 0.25)';
			ctx.fillRect(sx + 2, sy + 2, TILE - 4, TILE - 4);
		}

		// NPCs
		for (const npc of world.npcs) {
			const sx = (npc.x - cx) * TILE;
			const sy = (npc.y - cy) * TILE;
			drawDragon(ctx, sx, sy, {
				color: npc.color,
				dir: 0,
				frame: s.frame,
				belly: npc.face === 'zeno' ? '#60a0c0' : COLORS.light,
				spriteKey: spriteKeyForNpc(npc)
			});
			// proximity talk bubble
			const p = s.player;
			const dist = Math.abs(npc.x - p.x) + Math.abs(npc.y - p.y);
			if (dist <= 1) drawNpcBubble(ctx, sx, sy);
		}

		// Enemies
		for (const e of s.enemies) {
			if (e.hp <= 0) continue;
			const sx = (e.x - cx) * TILE;
			const sy = (e.y - cy) * TILE;
			drawEnemy(ctx, sx, sy, e.color, s.frame, e.isBoss, spriteKeyForEnemy(e));
		}

		// Player
		const psx = (s.player.px / TILE - cx) * TILE;
		const psy = (s.player.py / TILE - cy) * TILE;
		drawDragon(ctx, psx, psy, {
			color: COLORS.accent,
			dir: s.player.dir,
			frame: s.frame,
			moving: s.player.moving,
			walkFrame: Math.floor(s.player.moveT * 8),
			isPlayer: true,
			belly: COLORS.accentLight,
			spriteKey: 'rafe'
		});
	}

	// —— Low-res scenes (sprites only) ——

	function drawTitleScene(ctx) {
		for (let i = 0; i < 40; i++) {
			const x = (i * 47) % (VIEW_W * TILE);
			const y = (i * 31) % (VIEW_H * TILE);
			ctx.fillStyle = i % 3 === 0 ? COLORS.accentLight : COLORS.light;
			ctx.fillRect(x, y, 1, 1);
		}
		drawDragon(ctx, VIEW_W * TILE / 2 - 8, 48, {
			color: COLORS.accent,
			dir: 0,
			frame: Math.floor(Date.now() / 200),
			isPlayer: true,
			spriteKey: 'rafe'
		});
	}

	function drawEndScene(ctx, won) {
		ctx.fillStyle = COLORS.primaryDark;
		ctx.fillRect(0, 0, VIEW_W * TILE, VIEW_H * TILE);
		if (won) {
			drawDragon(ctx, VIEW_W * TILE / 2 - 8, 40, {
				color: COLORS.accent,
				dir: 0,
				frame: Math.floor(Date.now() / 200),
				isPlayer: true,
				spriteKey: 'rafe'
			});
		}
	}

	function drawCombatScene(ctx, s) {
		const e = s.combat.enemy;
		// dim world
		ctx.fillStyle = 'rgba(10, 10, 31, 0.55)';
		ctx.fillRect(0, 0, VIEW_W * TILE, VIEW_H * TILE);
		// panel
		ctx.fillStyle = COLORS.uiPanel;
		ctx.fillRect(16, 20, VIEW_W * TILE - 32, VIEW_H * TILE - 40);
		ctx.strokeStyle = COLORS.uiBorder;
		ctx.lineWidth = 1;
		ctx.strokeRect(16, 20, VIEW_W * TILE - 32, VIEW_H * TILE - 40);
		// sprites
		drawEnemy(ctx, VIEW_W * TILE - 80, 48, e.color, s.frame, e.isBoss, spriteKeyForEnemy(e));
		drawDragon(ctx, 40, 78, {
			color: COLORS.accent,
			dir: 2,
			frame: s.frame,
			isPlayer: true,
			spriteKey: 'rafe'
		});
	}

	function handleKeyDown(e) {
		// combat number keys
		if (state.mode === 'combat' && state.combat.phase === 'player') {
			if (e.key === '1') {
				e.preventDefault();
				combatAction(state, 'attack');
				return;
			}
			if (e.key === '2') {
				e.preventDefault();
				combatAction(state, 'breath');
				return;
			}
			if (e.key === '3') {
				e.preventDefault();
				combatAction(state, 'heal');
				return;
			}
			if (e.key === '4') {
				e.preventDefault();
				combatAction(state, 'flee');
				return;
			}
		}

		const movement = [...KEY.UP, ...KEY.DOWN, ...KEY.LEFT, ...KEY.RIGHT, ...KEY.ACTION, ...KEY.CANCEL];
		if (movement.includes(e.key)) {
			e.preventDefault();
		}
		onKeyDown(state, e.key);
	}

	function handleKeyUp(e) {
		onKeyUp(state, e.key);
	}

	function startGame() {
		if (state.mode === 'title') {
			state.mode = 'intro';
			state.introIndex = 0;
		}
	}

	function combatClick(action) {
		if (state.mode === 'combat' && state.combat.phase === 'player') {
			combatAction(state, action);
		}
	}

	function restart() {
		state = createState();
	}

	function continueRun() {
		if (state.mode === 'gameover') {
			continueAfterDefeat(state);
		}
	}

	function focusCanvas() {
		canvas?.focus();
	}

	/** @param {string} key */
	function padDown(key) {
		onKeyDown(state, key);
	}

	/** @param {string} key */
	function padUp(key) {
		onKeyUp(state, key);
	}

	function padAction() {
		onKeyDown(state, ' ');
		// Keep justPressed until the next frame, then release held key
		queueMicrotask(() => onKeyUp(state, ' '));
	}
</script>

<svelte:window onkeydown={handleKeyDown} onkeyup={handleKeyUp} />

<div class="game-shell">
	<div class="game-frame" class:focused>
		<canvas
			bind:this={canvas}
			width={CANVAS_W}
			height={CANVAS_H}
			class="game-canvas"
			tabindex="0"
			aria-label="Minigame - Glitch. Pixel RPG. Use WASD to move, Space to talk."
			onfocus={() => (focused = true)}
			onblur={() => (focused = false)}
			onclick={focusCanvas}
		></canvas>

		<!-- HTML overlays: browser-rendered text (always sharp) -->
		<div class="ui-layer" aria-live="polite">
			{#if ui.mode === 'title'}
				<div class="panel panel-center title-panel">
					<h2 class="ui-title">{GAME_TITLE}</h2>
					<p class="ui-subtitle">{GAME_SUBTITLE}</p>
					<p class="ui-prompt">Press Space / Enter to begin</p>
					<p class="ui-hint">WASD / Arrows move · E / Space talk · 1–4 combat</p>
					<button type="button" class="overlay-btn" onclick={startGame}>Start Adventure</button>
				</div>
			{:else if ui.mode === 'intro'}
				<div class="panel panel-story">
					<p class="ui-kicker">Prologue</p>
					<p class="ui-body">{INTRO[ui.introIndex]}</p>
					<p class="ui-prompt">
						{ui.introIndex + 1} / {INTRO.length} · Space to continue
					</p>
				</div>
			{:else if ui.mode === 'victory' || ui.mode === 'gameover'}
				<div class="panel panel-center end-panel">
					<h2 class="ui-title" class:danger={ui.mode === 'gameover'}>
						{ui.mode === 'victory' ? 'Victory' : 'Defeated'}
					</h2>
					<p class="ui-body">
						{ui.mode === 'victory'
							? 'The Glitch is sealed. The world dreams on.'
							: 'Your shards and levels remain. Wake in Nestvale and try again.'}
					</p>
					<p class="ui-prompt">
						{ui.mode === 'victory'
							? 'Press Space to return to title'
							: 'Press Space to continue · button for new game'}
					</p>
					{#if ui.mode === 'gameover'}
						<button type="button" class="overlay-btn" onclick={continueRun}>Continue</button>
					{/if}
					<button type="button" class="overlay-btn" onclick={restart}>
						{ui.mode === 'victory' ? 'Play Again' : 'New Game'}
					</button>
				</div>
			{:else}
				<!-- In-game HUD -->
				<div class="hud-top">
					<div class="hud-left">
						<div class="hp-wrap" title="Health">
							<div class="hp-bar">
								<div class="hp-fill" style:width="{hpPct}%"></div>
							</div>
							<span class="hud-label">HP {ui.hp}/{ui.maxHp}</span>
						</div>
						<span class="hud-chip gold">Lv {ui.level}</span>
						<span class="hud-chip teal" title="Elemental shards">
							<span class:on={ui.gotFire} class="shard fire" title="Fire">F</span>
							<span class:on={ui.gotWind} class="shard wind" title="Wind">W</span>
							<span class:on={ui.gotWater} class="shard water" title="Water">H</span>
							<span class="shard-count">{ui.shards}/3</span>
						</span>
					</div>
					<span class="hud-location">{ui.location}</span>
				</div>

				{#if ui.mode === 'play' || ui.mode === 'dialogue'}
					<div class="hud-quest">
						<span class="quest-label">Quest</span>
						<span class="quest-text">{ui.questText}</span>
					</div>
				{/if}

				{#if ui.toast}
					<div class="toast">{ui.toast}</div>
				{/if}

				{#if ui.mode === 'dialogue'}
					<div class="panel dialogue-panel">
						<p class="ui-body dialogue-text">{ui.dialogueLine}</p>
						<p class="ui-prompt dialogue-prompt">Space / Enter · continue</p>
					</div>
				{/if}

				{#if ui.mode === 'combat' && ui.combat}
					<div class="combat-panel">
						<p class="combat-title">{ui.combat.isBoss ? 'Erebus' : 'Battle'}</p>
						<div class="combat-rows">
							<div class="combat-side">
								<span class="combat-name">Rafe</span>
								<div class="hp-bar">
									<div class="hp-fill" style:width="{combatPlayerHpPct}%"></div>
								</div>
								<span class="hud-label"
									>{ui.combat.playerHp}/{ui.combat.playerMaxHp}</span
								>
							</div>
							<div class="combat-side enemy">
								<span class="combat-name">{ui.combat.name}</span>
								<div class="hp-bar">
									<div class="hp-fill" style:width="{enemyHpPct}%"></div>
								</div>
								<span class="hud-label">{ui.combat.hp}/{ui.combat.maxHp}</span>
							</div>
						</div>
						<p class="combat-log">{ui.combat.log}</p>
						{#if ui.combat.phase === 'player'}
							<div class="combat-controls">
								<button type="button" onclick={() => combatClick('attack')}
									>1 Attack</button
								>
								<button type="button" onclick={() => combatClick('breath')}
									>2 Breath</button
								>
								<button type="button" onclick={() => combatClick('heal')}
									>3 Heal</button
								>
								<button type="button" onclick={() => combatClick('flee')}
									>4 Flee</button
								>
							</div>
						{:else if ui.combat.phase === 'win' || ui.combat.phase === 'lose'}
							<p class="ui-prompt">Press Space / Enter…</p>
						{/if}
					</div>
				{/if}
			{/if}
		</div>
	</div>

	<div class="touch-pad" aria-label="Touch controls">
		<div class="dpad">
			<button
				type="button"
				class="pad-btn"
				aria-label="Up"
				onpointerdown={(e) => {
					e.preventDefault();
					padDown('ArrowUp');
				}}
				onpointerup={() => padUp('ArrowUp')}
				onpointerleave={() => padUp('ArrowUp')}
			>▲</button>
			<div class="dpad-mid">
				<button
					type="button"
					class="pad-btn"
					aria-label="Left"
					onpointerdown={(e) => {
						e.preventDefault();
						padDown('ArrowLeft');
					}}
					onpointerup={() => padUp('ArrowLeft')}
					onpointerleave={() => padUp('ArrowLeft')}
				>◀</button>
				<button
					type="button"
					class="pad-btn"
					aria-label="Right"
					onpointerdown={(e) => {
						e.preventDefault();
						padDown('ArrowRight');
					}}
					onpointerup={() => padUp('ArrowRight')}
					onpointerleave={() => padUp('ArrowRight')}
				>▶</button>
			</div>
			<button
				type="button"
				class="pad-btn"
				aria-label="Down"
				onpointerdown={(e) => {
					e.preventDefault();
					padDown('ArrowDown');
				}}
				onpointerup={() => padUp('ArrowDown')}
				onpointerleave={() => padUp('ArrowDown')}
			>▼</button>
		</div>
		<button type="button" class="pad-btn action-pad" onclick={padAction}>A · Talk</button>
	</div>

	<div class="game-help">
		<p>
			<strong>Move</strong> WASD / Arrows ·
			<strong>Talk / Confirm</strong> E · Space · Enter ·
			<strong>Combat</strong> 1–4
		</p>
		<p class="hint">
			Talk to NPCs · Fire &amp; Wind in Bright City · Water on the shore pier · dark gate south of the city
		</p>
	</div>
</div>

<style>
	.game-shell {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		width: 100%;
	}

	.game-frame {
		position: relative;
		border: 2px solid rgba(32, 221, 224, 0.35);
		border-radius: 12px;
		overflow: hidden;
		box-shadow:
			0 0 0 1px rgba(0, 165, 148, 0.2),
			0 12px 40px rgba(0, 0, 0, 0.45),
			0 0 60px rgba(32, 221, 224, 0.12);
		background: #0a0a1f;
		outline: none;
		max-width: 100%;
	}

	.game-frame.focused {
		border-color: var(--color-accent-light, #20dde0);
		box-shadow:
			0 0 0 1px rgba(32, 221, 224, 0.4),
			0 12px 40px rgba(0, 0, 0, 0.5),
			0 0 80px rgba(32, 221, 224, 0.2);
	}

	.game-canvas {
		display: block;
		width: min(960px, 100vw - 2rem);
		height: auto;
		image-rendering: pixelated;
		image-rendering: crisp-edges;
		cursor: crosshair;
		vertical-align: top;
	}

	/* HTML UI sits on top of the pixel canvas — browser fonts stay sharp */
	.ui-layer {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 3;
		font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
		color: #f0f8ff;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-rendering: optimizeLegibility;
	}

	.ui-layer :global(button) {
		pointer-events: auto;
	}

	.panel {
		pointer-events: none;
		background: rgba(15, 44, 75, 0.94);
		border: 2px solid rgba(32, 221, 224, 0.55);
		border-radius: 12px;
		box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
		padding: 1rem 1.25rem;
	}

	.panel-center {
		position: absolute;
		left: 50%;
		top: 52%;
		transform: translate(-50%, -50%);
		width: min(92%, 28rem);
		text-align: center;
		pointer-events: auto;
	}

	.panel-story {
		position: absolute;
		left: 1rem;
		right: 1rem;
		top: 1rem;
		bottom: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1.25rem;
		padding: 1.5rem;
	}

	.title-panel .overlay-btn,
	.end-panel .overlay-btn {
		margin-top: 0.75rem;
	}

	.ui-title {
		margin: 0 0 0.35rem;
		font-size: clamp(1.6rem, 4.5vw, 2.25rem);
		font-weight: 700;
		line-height: 1.2;
		color: #20dde0;
		text-shadow: 0 2px 0 rgba(10, 10, 31, 0.9);
	}

	.ui-title.danger {
		color: #e05050;
	}

	.ui-subtitle {
		margin: 0 0 0.75rem;
		font-size: clamp(1rem, 2.5vw, 1.15rem);
		font-weight: 600;
		color: #cce0e5;
	}

	.ui-kicker {
		margin: 0;
		font-size: 0.95rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #20dde0;
	}

	.ui-body {
		margin: 0;
		font-size: clamp(1rem, 2.4vw, 1.15rem);
		font-weight: 500;
		line-height: 1.55;
		color: #f0f8ff;
	}

	.ui-prompt {
		margin: 0.5rem 0 0;
		font-size: 0.95rem;
		font-weight: 600;
		color: #f0c040;
	}

	.ui-hint {
		margin: 0.35rem 0 0;
		font-size: 0.85rem;
		font-weight: 500;
		color: #cce0e5;
		opacity: 0.9;
	}

	.hud-top {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0.55rem 0.75rem;
		background: rgba(10, 10, 31, 0.88);
		border-bottom: 2px solid rgba(32, 221, 224, 0.3);
		flex-wrap: wrap;
	}

	.hud-left {
		display: flex;
		align-items: center;
		gap: 0.55rem;
		flex-wrap: wrap;
	}

	.hp-wrap {
		display: flex;
		align-items: center;
		gap: 0.45rem;
	}

	.hp-bar {
		width: 7.5rem;
		height: 0.7rem;
		background: #401818;
		border: 1px solid rgba(240, 248, 255, 0.35);
		border-radius: 4px;
		overflow: hidden;
		flex-shrink: 0;
	}

	.hp-fill {
		height: 100%;
		background: linear-gradient(90deg, #c04040, #e05050);
		border-radius: 3px;
		transition: width 0.15s ease;
	}

	.hud-label {
		font-size: 0.9rem;
		font-weight: 700;
		color: #f0f8ff;
		white-space: nowrap;
	}

	.hud-chip {
		font-size: 0.85rem;
		font-weight: 700;
		padding: 0.2rem 0.55rem;
		border-radius: 999px;
		background: rgba(15, 44, 75, 0.9);
		border: 1px solid rgba(32, 221, 224, 0.35);
		white-space: nowrap;
	}

	.hud-chip.gold {
		color: #f0c040;
		border-color: rgba(240, 192, 64, 0.45);
	}

	.hud-chip.teal {
		color: #20dde0;
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
	}

	.shard {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.15rem;
		height: 1.15rem;
		border-radius: 4px;
		font-size: 0.7rem;
		font-weight: 800;
		opacity: 0.35;
		border: 1px solid rgba(240, 248, 255, 0.25);
		background: rgba(10, 10, 31, 0.6);
	}

	.shard.on {
		opacity: 1;
	}

	.shard.fire.on {
		color: #ff8060;
		border-color: rgba(255, 128, 96, 0.7);
		background: rgba(120, 40, 20, 0.85);
	}

	.shard.wind.on {
		color: #90e0ff;
		border-color: rgba(144, 224, 255, 0.7);
		background: rgba(20, 60, 100, 0.85);
	}

	.shard.water.on {
		color: #60c0ff;
		border-color: rgba(96, 192, 255, 0.7);
		background: rgba(20, 50, 110, 0.85);
	}

	.shard-count {
		margin-left: 0.15rem;
	}

	.hud-location {
		font-size: 0.95rem;
		font-weight: 700;
		color: #20dde0;
		white-space: nowrap;
	}

	.hud-quest {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.5rem 0.85rem;
		background: rgba(10, 10, 31, 0.9);
		border-top: 2px solid rgba(240, 192, 64, 0.4);
	}

	.quest-label {
		font-size: 0.75rem;
		font-weight: 800;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #f0c040;
		flex-shrink: 0;
	}

	.quest-text {
		font-size: 0.95rem;
		font-weight: 600;
		color: #f0f8ff;
		line-height: 1.3;
	}

	.toast {
		position: absolute;
		top: 3.4rem;
		left: 50%;
		transform: translateX(-50%);
		max-width: min(90%, 28rem);
		padding: 0.55rem 1rem;
		background: rgba(0, 74, 90, 0.96);
		border: 2px solid #20dde0;
		border-radius: 10px;
		font-size: 0.95rem;
		font-weight: 700;
		color: #f0f8ff;
		text-align: center;
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
		z-index: 5;
	}

	.dialogue-panel {
		position: absolute;
		left: 0.75rem;
		right: 0.75rem;
		bottom: 3rem;
		padding: 1rem 1.15rem 0.85rem;
		min-height: 5.5rem;
	}

	.dialogue-text {
		margin-bottom: 0.65rem;
	}

	.dialogue-prompt {
		margin: 0;
		text-align: right;
		font-size: 0.85rem;
	}

	.combat-panel {
		position: absolute;
		left: 0.75rem;
		right: 0.75rem;
		bottom: 0.75rem;
		padding: 0.85rem 1rem;
		background: rgba(15, 44, 75, 0.94);
		border: 2px solid rgba(32, 221, 224, 0.55);
		border-radius: 12px;
		box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
		pointer-events: auto;
	}

	.combat-title {
		margin: 0 0 0.55rem;
		font-size: 1.1rem;
		font-weight: 800;
		color: #20dde0;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.combat-rows {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
		margin-bottom: 0.65rem;
	}

	.combat-side {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.combat-side.enemy {
		align-items: flex-end;
		text-align: right;
	}

	.combat-name {
		font-size: 0.95rem;
		font-weight: 700;
		color: #cce0e5;
	}

	.combat-log {
		margin: 0 0 0.55rem;
		font-size: 1rem;
		font-weight: 600;
		line-height: 1.4;
		color: #20dde0;
		min-height: 1.4em;
	}

	.combat-controls {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		justify-content: flex-start;
	}

	.combat-controls button,
	.overlay-btn {
		background: linear-gradient(135deg, #0f2c4b 0%, #004a5a 50%, #00a594 100%);
		border: 1px solid rgba(32, 221, 224, 0.5);
		color: #f0f8ff;
		font-family: inherit;
		font-size: 0.9rem;
		font-weight: 700;
		padding: 0.5rem 0.95rem;
		border-radius: 999px;
		cursor: pointer;
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease;
	}

	.combat-controls button:hover,
	.overlay-btn:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 14px rgba(32, 221, 224, 0.35);
	}

	.overlay-btn {
		font-size: 1rem;
		padding: 0.65rem 1.4rem;
	}

	.game-help {
		text-align: center;
		color: var(--color-light, #cce0e5);
		font-size: 0.9rem;
		max-width: 40rem;
		padding: 0 1rem;
	}

	.game-help strong {
		color: var(--color-accent-light, #20dde0);
	}

	.hint {
		margin-top: 0.35rem;
		opacity: 0.8;
		font-size: 0.85rem;
	}

	.touch-pad {
		display: none;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		user-select: none;
		touch-action: none;
		width: 100%;
		max-width: 24rem;
		padding: 0.5rem 1rem;
	}

	.dpad {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.35rem;
	}

	.dpad-mid {
		display: flex;
		gap: 1.75rem;
	}

	.pad-btn {
		width: 3rem;
		height: 3rem;
		border-radius: 12px;
		border: 1px solid rgba(32, 221, 224, 0.4);
		background: rgba(15, 44, 75, 0.9);
		color: var(--color-accent-light, #20dde0);
		font-size: 1rem;
		font-weight: 700;
		cursor: pointer;
	}

	.pad-btn:active {
		background: rgba(0, 165, 148, 0.5);
	}

	.action-pad {
		width: auto;
		min-width: 5.5rem;
		padding: 0 0.75rem;
		border-radius: 999px;
		font-size: 0.85rem;
	}

	@media (max-width: 900px) {
		.touch-pad {
			display: flex;
		}
	}

	@media (max-width: 640px) {
		.hp-bar {
			width: 5rem;
		}

		.combat-rows {
			grid-template-columns: 1fr;
		}

		.combat-side.enemy {
			align-items: flex-start;
			text-align: left;
		}

		.combat-controls button {
			font-size: 0.8rem;
			padding: 0.4rem 0.7rem;
		}

		.hud-location {
			font-size: 0.85rem;
		}

		.dialogue-panel {
			bottom: 2.75rem;
		}
	}
</style>
