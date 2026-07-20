<script>
	import { resolve } from '$app/paths';
	import GameCanvas from '$lib/game/GameCanvas.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<main class="game-page">
	<section class="game-hero">
		<div class="container">
			<p class="eyebrow">
				<a href={resolve('/')}>← DreamingDragons</a>
			</p>
			<h1 class="game-title">
				<span class="gradient-text">Minigame - Glitch</span>
			</h1>
			<p class="game-lead">
				A simple 2D pixel adventure inspired by the world of
				<em>RaFoR: The Glitch</em>.
			</p>
		</div>
	</section>

	<section class="game-stage section">
		<div class="container stage-inner">
			<GameCanvas />
		</div>
	</section>

	<section class="game-lore section">
		<div class="container lore-grid">
			<article class="lore-card">
				<h2>Your Quest</h2>
				<ol>
					<li>Speak with Elder Pyra in Nestvale</li>
					<li>Find sage Zeno east in the Glowing Forest</li>
					<li>Collect Fire &amp; Wind in Bright City, Water on the Eastern Shore pier</li>
					<li>Enter the dark gate <em>south</em> of Bright City and defeat Erebus</li>
				</ol>
			</article>
			<article class="lore-card">
				<h2>The Story</h2>
				<p>
					Inspired by <em>Rise and Fall of Raphael: The Glitch</em> — reimagined with only
					dragons. You are Rafe, born from a crack in the sky. Gather three elemental shards
					and seal the scar before Shadow Lord Erebus unmakes the world.
				</p>
			</article>
			<article class="lore-card">
				<h2>Tips</h2>
				<ul>
					<li>Rest at fountains (teal springs) to restore HP</li>
					<li>Defeat shade creatures for EXP and levels</li>
					<li>Walk the shore pier to reach the Tidekeeper</li>
					<li>Boss fights: Attack or Breath for damage, Heal on low HP</li>
				</ul>
			</article>
		</div>
	</section>
</main>

<Footer />

<style>
	.game-page {
		min-height: 100vh;
		padding-top: 5rem;
		background: var(--gradient-hero);
	}

	.game-hero {
		padding: 2rem 0 1rem;
		text-align: center;
	}

	.eyebrow {
		margin-bottom: 1rem;
		font-size: 0.95rem;
	}

	.eyebrow a {
		color: var(--color-accent-light);
		font-weight: 600;
	}

	.eyebrow a:hover {
		color: var(--color-lightest);
	}

	.game-title {
		font-size: clamp(2rem, 5vw, 3.25rem);
		margin-bottom: 1rem;
	}

	.gradient-text {
		background: linear-gradient(
			135deg,
			var(--color-accent-light),
			var(--color-lightest),
			var(--color-accent)
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		background-size: 200% auto;
	}

	.game-lead {
		max-width: 42rem;
		margin: 0 auto;
		color: var(--color-light);
		font-size: 1.1rem;
		line-height: 1.7;
	}

	.game-lead em {
		color: var(--color-accent-light);
		font-style: italic;
	}

	.game-stage {
		padding-top: 1.5rem;
		padding-bottom: 2rem;
	}

	.stage-inner {
		display: flex;
		justify-content: center;
	}

	.game-lore {
		padding-top: 1rem;
		padding-bottom: 3rem;
		background: linear-gradient(180deg, transparent, var(--color-primary-dark));
	}

	.lore-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	.lore-card {
		background: linear-gradient(135deg, rgba(0, 165, 148, 0.08), rgba(15, 44, 75, 0.35));
		border: 1px solid rgba(32, 221, 224, 0.2);
		border-radius: 16px;
		padding: 1.75rem;
		transition: border-color 0.3s ease, transform 0.3s ease;
	}

	.lore-card:hover {
		border-color: rgba(32, 221, 224, 0.45);
		transform: translateY(-3px);
	}

	.lore-card h2 {
		font-size: 1.25rem;
		margin-bottom: 1rem;
		color: var(--color-accent-light);
	}

	.lore-card p,
	.lore-card li {
		color: var(--color-light);
		line-height: 1.65;
		font-size: 0.98rem;
	}

	.lore-card ol,
	.lore-card ul {
		padding-left: 1.2rem;
		margin: 0;
	}

	.lore-card li {
		margin-bottom: 0.5rem;
	}

	.lore-card em {
		color: var(--color-accent-light);
		font-style: italic;
	}

	@media (max-width: 992px) {
		.lore-grid {
			grid-template-columns: 1fr;
		}

		.game-page {
			padding-top: 1.5rem;
		}
	}
</style>
