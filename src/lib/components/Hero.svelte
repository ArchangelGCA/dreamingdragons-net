<script>
	import favicon from '$lib/assets/favicon.webp?enhanced';
	
	let visible = $state(true);
</script>

<section class="hero">
	<div class="hero-background">
		<div class="stars"></div>
		<div class="dragon-silhouette"></div>
	</div>
	
	<div class="hero-content container">
		<div class="hero-text">
			<h1 class="hero-title">
				<span class="gradient-text">DreamingDragons</span>
			</h1>
			<p class="hero-subtitle">
				Breathing fire into our dreams
			</p>
			<p class="hero-description">
				A vibrant community of artists who share a passion for dragons.
				Join thousands of creators in celebrating dragon art and fantasy.
			</p>
			
			<div class="hero-buttons">
				<a href="https://discord.gg/u6qFjfDDy2" target="_blank" rel="noopener noreferrer" class="btn-primary">
					<i class="fab fa-discord"></i> Join Discord
				</a>
				<a href="#platforms" class="btn-outline">
					<i class="fas fa-compass"></i> Explore
				</a>
			</div>
			
			<div class="hero-stats">
				<div class="stat">
					<div class="stat-number">2.7K+</div>
					<div class="stat-label">Members</div>
				</div>
				<div class="stat">
					<div class="stat-number">2.6K+</div>
					<div class="stat-label">Watchers</div>
				</div>
				<div class="stat">
					<div class="stat-number">3+</div>
					<div class="stat-label">Socials</div>
				</div>
			</div>
		</div>
		
		<div class="hero-visual">
			<enhanced:img src={favicon} alt="DreamingDragons Dragon Logo" class="dragon-icon rounded-circle" />
		</div>
	</div>
	
	<div class="scroll-indicator">
		<a href="#about" aria-label="Scroll to About section">
			<i class="fas fa-chevron-down"></i>
		</a>
	</div>
</section>

<style>
	.hero {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
		background: var(--gradient-hero);
	}

	.hero-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: 0;
	}

	.stars {
		position: absolute;
		width: 100%;
		height: 100%;
		background-image: 
			radial-gradient(2px 2px at 20% 30%, white, transparent),
			radial-gradient(2px 2px at 60% 70%, white, transparent),
			radial-gradient(1px 1px at 50% 50%, white, transparent),
			radial-gradient(1px 1px at 80% 10%, white, transparent),
			radial-gradient(2px 2px at 90% 60%, white, transparent),
			radial-gradient(1px 1px at 33% 80%, white, transparent),
			radial-gradient(1px 1px at 15% 75%, white, transparent);
		background-size: 200% 200%;
		background-position: 0% 0%;
		opacity: 0.6;
		animation: twinkle 8s ease-in-out infinite;
	}

	@keyframes twinkle {
		0%, 100% { opacity: 0.6; }
		50% { opacity: 0.3; }
	}

	.dragon-silhouette {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 120%;
		height: 120%;
		background: radial-gradient(ellipse at center, rgba(0, 165, 148, 0.1) 0%, transparent 70%);
		animation: pulse 4s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
		50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.3; }
	}

	.hero-content {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
		animation: fadeIn 1s ease-in;
	}

	.hero-text {
		text-align: left;
	}

	.hero-title {
		font-size: 4rem;
		margin-bottom: 1rem;
		animation: slideInLeft 0.8s ease-out;
	}

	.gradient-text {
		background: linear-gradient(135deg, var(--color-accent-light), var(--color-lightest), var(--color-accent));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: shimmer 3s ease-in-out infinite;
		background-size: 200% auto;
	}

	@keyframes shimmer {
		0%, 100% { background-position: 0% center; }
		50% { background-position: 100% center; }
	}

	@keyframes slideInLeft {
		from {
			opacity: 0;
			transform: translateX(-50px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.hero-subtitle {
		font-size: 1.5rem;
		color: var(--color-accent-light);
		margin-bottom: 1.5rem;
		font-style: italic;
		animation: slideInLeft 0.8s ease-out 0.2s both;
	}

	.hero-description {
		font-size: 1.2rem;
		color: var(--color-light);
		margin-bottom: 2rem;
		line-height: 1.8;
		animation: slideInLeft 0.8s ease-out 0.4s both;
	}

	.hero-buttons {
		display: flex;
		gap: 1rem;
		margin-bottom: 3rem;
		flex-wrap: wrap;
		animation: slideInLeft 0.8s ease-out 0.6s both;
	}

	.hero-buttons a {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.hero-stats {
		display: flex;
		gap: 3rem;
		animation: slideInLeft 0.8s ease-out 0.8s both;
	}

	.stat {
		text-align: center;
	}

	.stat-number {
		font-size: 2rem;
		font-weight: 700;
		color: var(--color-accent-light);
		margin-bottom: 0.25rem;
	}

	.stat-label {
		font-size: 0.9rem;
		color: var(--color-light);
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.hero-visual {
		display: flex;
		align-items: center;
		justify-content: center;
		animation: slideInRight 0.8s ease-out;
	}

	@keyframes slideInRight {
		from {
			opacity: 0;
			transform: translateX(50px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	:global(.dragon-icon) {
		width: 20rem;
		height: 20rem;
		object-fit: contain;
		filter: drop-shadow(0 0 50px rgba(32, 221, 224, 0.6));
		animation: float 6s ease-in-out infinite;
	}

	@keyframes float {
		0%, 100% { transform: translateY(0px) rotate(-5deg); }
		50% { transform: translateY(-20px) rotate(5deg); }
	}

	.scroll-indicator {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;
		animation: bounce 2s infinite;
	}

	.scroll-indicator a {
		color: var(--color-accent-light);
		font-size: 2rem;
	}

	@keyframes bounce {
		0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
		40% { transform: translateX(-50%) translateY(-10px); }
		60% { transform: translateX(-50%) translateY(-5px); }
	}

	@media (max-width: 992px) {
		.hero-content {
			grid-template-columns: 1fr;
			text-align: center;
		}

		.hero-text {
			text-align: center;
		}

		.hero-title {
			font-size: 3rem;
		}

		:global(.dragon-icon) {
			width: 12rem;
			height: 12rem;
		}

		.hero-buttons {
			justify-content: center;
		}

		.hero-stats {
			justify-content: center;
		}
	}

	@media (max-width: 576px) {
		.hero-title {
			font-size: 2.5rem;
		}

		.hero-subtitle {
			font-size: 1.2rem;
		}

		.hero-description {
			font-size: 1rem;
		}

		:global(.dragon-icon) {
			width: 8rem;
			height: 8rem;
		}

		.hero-stats {
			gap: 1.5rem;
		}

		.stat-number {
			font-size: 1.5rem;
		}
	}
</style>
