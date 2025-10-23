<script>
	const platforms = [
		{
			name: 'Discord',
			icon: 'fab fa-discord',
			color: '#5865F2',
			description: 'Join our active Discord community with hundreds of members. Chat, share art, participate in events, and connect with fellow dragon enthusiasts.',
			link: 'https://discord.gg/u6qFjfDDy2',
			stats: 'Active Community',
			features: ['Friendly chat', 'Art sharing', 'Announcements', 'Voice channels']
		},
		{
			name: 'DeviantArt',
			icon: 'fab fa-deviantart',
			color: '#05CC47',
			description: 'Our main hub on DeviantArt with 2.7K+ members and 2.6K+ watchers. Submit your art to our galleries and join contests!',
			link: 'https://www.deviantart.com/dreamingdragons',
			stats: '2.7K+ Members',
			features: ['Gallery submissions', 'Contests', 'Featured artwork', 'Active Community']
		},
		{
			name: 'Tales',
			icon: 'fas fa-dragon',
			color: '#00a594',
			description: 'Our own platform dedicated to dragon art and stories. A NO AI - NO NSFW space where creativity thrives.',
			link: 'https://tales.archangelgca.eu/',
			stats: 'Our Own Platform',
			features: ['NO AI content', 'NO NSFW', 'Made by us', 'Story sharing']
		}
	];
</script>

<section id="socials" class="platforms section">
	<div class="container">
		<div class="platforms-header">
			<h2 class="section-title">Join Us Anywhere</h2>
			<div class="title-underline"></div>
			<p class="section-subtitle">
				Connect with DreamingDragons across multiple socials. Choose your favorite or join them all!
			</p>
		</div>
		
		<div class="platforms-grid">
			{#each platforms as platform (platform.name)}
				<div class="platform-card">
					<div class="platform-header">
						<div class="platform-icon" style="--platform-color: {platform.color}">
							<i class={platform.icon}></i>
						</div>
						<h3>{platform.name}</h3>
						<span class="platform-badge">{platform.stats}</span>
					</div>
					
					<p class="platform-description">{platform.description}</p>
					
					<ul class="platform-features">
						{#each platform.features as feature (feature)}
							<li>
								<i class="fas fa-check-circle"></i>
								{feature}
							</li>
						{/each}
					</ul>
					
					<a 
						href={platform.link} 
						target="_blank" 
						rel="noopener noreferrer" 
						class="platform-button"
						style="--platform-color: {platform.color}"
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
		margin-bottom: 4rem;
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

	.section-subtitle {
		font-size: 1.2rem;
		color: var(--color-light);
		max-width: 700px;
		margin: 0 auto;
	}

	.platforms-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 2rem;
		margin-bottom: 4rem;
	}

	.platform-card {
		background: linear-gradient(135deg, rgba(15, 44, 75, 0.6), rgba(0, 74, 90, 0.3));
		border: 1px solid rgba(32, 221, 224, 0.2);
		border-radius: 20px;
		padding: 2.5rem;
		transition: all 0.4s ease;
		position: relative;
		overflow: hidden;
	}

	.platform-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: var(--gradient-dragon);
		transform: scaleX(0);
		transition: transform 0.4s ease;
	}

	.platform-card:hover {
		transform: translateY(-10px);
		border-color: var(--color-accent-light);
		box-shadow: 0 20px 40px rgba(32, 221, 224, 0.3);
	}

	.platform-card:hover::before {
		transform: scaleX(1);
	}

	.platform-header {
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.platform-icon {
		width: 100px;
		height: 100px;
		margin: 0 auto 1rem;
		background: linear-gradient(135deg, var(--platform-color), rgba(255, 255, 255, 0.1));
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 3rem;
		color: white;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
		transition: all 0.4s ease;
	}

	.platform-card:hover .platform-icon {
		transform: scale(1.1) rotate(5deg);
		box-shadow: 0 15px 40px var(--platform-color);
	}

	.platform-header h3 {
		font-size: 2rem;
		margin-bottom: 0.5rem;
		color: var(--color-lightest);
	}

	.platform-badge {
		display: inline-block;
		background: rgba(32, 221, 224, 0.2);
		color: var(--color-accent-light);
		padding: 0.25rem 1rem;
		border-radius: 20px;
		font-size: 0.9rem;
		font-weight: 600;
	}

	.platform-description {
		color: var(--color-light);
		line-height: 1.8;
		margin-bottom: 1.5rem;
		text-align: center;
	}

	.platform-features {
		list-style: none;
		margin-bottom: 2rem;
	}

	.platform-features li {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		color: var(--color-light);
		padding: 0.75rem 0;
		border-bottom: 1px solid rgba(32, 221, 224, 0.1);
	}

	.platform-features li:last-child {
		border-bottom: none;
	}

	.platform-features i {
		color: var(--color-accent-light);
		font-size: 1.1rem;
	}

	.platform-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		width: 100%;
		padding: 1rem;
		background: linear-gradient(135deg, var(--platform-color), rgba(255, 255, 255, 0.1));
		color: white;
		border: none;
		border-radius: 50px;
		font-size: 1.1rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
	}

	.platform-button:hover {
		transform: scale(1.05);
		box-shadow: 0 6px 25px var(--platform-color);
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
