<script>
	const platforms = [
		{
			name: 'Discord',
			icon: 'fab fa-discord',
			color: '#5865F2',
			link: 'https://discord.gg/u6qFjfDDy2',
			stats: 'Community',
			features: ['Chat', 'Art sharing', 'Events', 'Voice channels']
		},
		{
			name: 'DeviantArt',
			icon: 'fab fa-deviantart',
			color: '#05CC47',
			link: 'https://www.deviantart.com/dreamingdragons',
			stats: '3.0K+ Members',
			features: ['Galleries', 'Contests', 'Features', 'Community']
		},
		{
			name: 'Tales',
			icon: 'fas fa-dragon',
			color: '#00a594',
			link: 'https://tales.archangelgca.eu/',
			stats: 'Our Platform',
			features: ['NO AI', 'NO NSFW', 'Original', 'Stories']
		}
	];
</script>

<section id="socials" class="platforms section">
	<div class="container">
		<div class="platforms-header">
			<h2 class="section-title pb-1">Socials</h2>
			<div class="title-underline"></div>
		</div>
		
		<div class="platforms-grid">
			{#each platforms as platform (platform.name)}
				<div class="platform-card" style="--platform-color: {platform.color}">
					<div class="platform-header">
						<div class="platform-icon">
							<i class={platform.icon}></i>
						</div>
						<h3>{platform.name}</h3>
						<span class="platform-badge">{platform.stats}</span>
					</div>

					<!--
					<ul class="platform-features">
						{#each platform.features as feature (feature)}
							<li>
								<i class="fas fa-check-circle"></i>
								{feature}
							</li>
						{/each}
					</ul>-->
					
					<a 
						href={platform.link} 
						target="_blank" 
						rel="noopener noreferrer" 
						class="platform-button"
					>
						<span>Visit {platform.name}</span>
						<i class="fas fa-arrow-right"></i>
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.platforms {
		background: var(--color-primary);
		position: relative;
		overflow: hidden;
	}

	.platforms::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--color-accent-light), transparent);
	}

	.platforms-header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.platforms-header .section-title {
		margin-bottom: 0.5rem;
	}

	.section-title {
		font-size: 3rem;
		margin-bottom: 1rem;
		background: linear-gradient(135deg, var(--color-lightest), var(--color-accent-light));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.title-underline {
		width: 100px;
		height: 4px;
		background: var(--gradient-dragon);
		margin: 0 auto 1.5rem;
		border-radius: 2px;
	}

	.platforms-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 2rem;
		margin-bottom: 4rem;
	}

	.platform-card {
		--platform-color: #00a594;
		background: var(--color-primary);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 1rem;
		padding: 2rem;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		overflow: hidden;
	}

	.platform-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: var(--platform-color);
		opacity: 0.6;
		transition: opacity 0.4s ease;
	}

	.platform-card::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: radial-gradient(ellipse at top center, color-mix(in srgb, var(--platform-color) 8%, transparent), transparent 60%);
		pointer-events: none;
	}

	.platform-card:hover {
		transform: translateY(-8px);
		border-color: color-mix(in srgb, var(--platform-color) 40%, transparent);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px color-mix(in srgb, var(--platform-color) 15%, transparent);
	}

	.platform-card:hover::before {
		opacity: 1;
	}

	.platform-header {
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.platform-icon {
		width: 4rem;
		height: 4rem;
		border-radius: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 1rem;
		font-size: 1.5rem;
		color: var(--platform-color);
		background: color-mix(in srgb, var(--platform-color) 12%, transparent);
		border: 1px solid color-mix(in srgb, var(--platform-color) 25%, transparent);
		transition: all 0.4s ease;
	}

	.platform-card:hover .platform-icon {
		background: color-mix(in srgb, var(--platform-color) 20%, transparent);
		border-color: color-mix(in srgb, var(--platform-color) 50%, transparent);
		transform: scale(1.1);
		box-shadow: 0 0 20px color-mix(in srgb, var(--platform-color) 25%, transparent);
	}

	.platform-header h3 {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-lightest);
		margin-bottom: 0.5rem;
	}

	.platform-badge {
		display: inline-block;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--platform-color);
		background: color-mix(in srgb, var(--platform-color) 10%, transparent);
		padding: 0.25rem 0.75rem;
		border-radius: 2rem;
		border: 1px solid color-mix(in srgb, var(--platform-color) 20%, transparent);
	}

	.platform-features {
		list-style: none;
		padding: 0;
		margin: 0 0 1.5rem;
	}

	/* .platform-features li {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0;
		font-size: 0.9rem;
		color: var(--color-light);
	}

	.platform-features li i {
		color: var(--platform-color);
		font-size: 0.75rem;
	}*/

	.platform-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		width: 100%;
		padding: 1rem;
		background: linear-gradient(135deg, var(--platform-color), color-mix(in srgb, var(--platform-color) 70%, white));
		color: white;
		border: none;
		border-radius: 50px;
		font-size: 1.1rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
		box-shadow: 0 4px 15px color-mix(in srgb, var(--platform-color) 30%, transparent);
	}

	.platform-button:hover {
		transform: scale(1.05);
		box-shadow: 0 6px 25px color-mix(in srgb, var(--platform-color) 50%, transparent);
		color: white;
	}

	.platform-button i {
		transition: transform 0.3s ease;
	}

	.platform-button:hover i {
		transform: translateX(5px);
	}

	@media (max-width: 992px) {
		.section-title {
			font-size: 2.5rem;
		}

		.platforms-grid {
			grid-template-columns: 1fr;
			max-width: 500px;
			margin-left: auto;
			margin-right: auto;
		}
	}

	@media (max-width: 576px) {
		.section-title {
			font-size: 2rem;
		}

		.platform-card {
			padding: 2rem 1.5rem;
		}

		.platform-icon {
			width: 80px;
			height: 80px;
			font-size: 2.5rem;
		}

		.platform-header h3 {
			font-size: 1.75rem;
		}
	}
</style>
