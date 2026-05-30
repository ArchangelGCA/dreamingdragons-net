<script>
	const features = [
		{
			icon: 'fas fa-trophy',
			title: 'Contests',
			gradient: 'linear-gradient(135deg, #FFD700, #FFA500)'
		},
		{
			icon: 'fas fa-image',
			title: 'Art Galleries',
			gradient: 'linear-gradient(135deg, #00a594, #20dde0)'
		},
		{
			icon: 'fas fa-handshake',
			title: 'Collaborations',
			gradient: 'linear-gradient(135deg, #9333EA, #C084FC)'
		},
		{
			icon: 'fas fa-comments',
			title: 'Active Community',
			gradient: 'linear-gradient(135deg, #0f2c4b, #004a5a)'
		},
		{
			icon: 'fas fa-star',
			title: 'Featured Artists',
			gradient: 'linear-gradient(135deg, #DC2626, #F87171)'
		},
		{
			icon: 'fas fa-ban',
			title: 'Quality Standards',
			gradient: 'linear-gradient(135deg, #059669, #10B981)'
		}
	];

	const stats = [
		{ number: '3K+', label: 'Members', icon: 'fas fa-users' },
		{ number: '2.8K+', label: 'Watchers', icon: 'fas fa-eye' },
		{ number: '100+', label: 'Monthly Art', icon: 'fas fa-images' },
		{ number: '3+', label: 'Years Strong', icon: 'fas fa-calendar' }
	];
</script>

<section id="community" class="community section">
	<div class="container">
		<div class="community-header">
			<h2 class="section-title pb-1">Community</h2>
			<div class="title-underline"></div>
		</div>
		
		<div class="features-grid">
			{#each features as feature (feature.title)}
				<div class="feature-card">
					<div class="feature-icon-wrapper" style="background: {feature.gradient}">
						<i class={feature.icon}></i>
					</div>
					<h3>{feature.title}</h3>
				</div>
			{/each}
		</div>
		
		<div class="stats-section">
			<div class="stats-grid">
				{#each stats as stat (stat.label)}
					<div class="stat-card">
						<i class={stat.icon}></i>
						<div class="stat-number">{stat.number}</div>
						<div class="stat-label">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>
		
		<div class="cta-box">
			<h3>Ready to Join?</h3>
			<div class="cta-buttons">
				<a href="https://discord.gg/u6qFjfDDy2" target="_blank" rel="noopener noreferrer" class="btn-primary">
					<i class="fab fa-discord"></i> Discord
				</a>
				<a href="https://www.deviantart.com/dreamingdragons" target="_blank" rel="noopener noreferrer" class="btn-outline">
					<i class="fab fa-deviantart"></i> DeviantArt
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.community {
		background: linear-gradient(180deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
		position: relative;
	}

	.community::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--color-accent-light), transparent);
	}

	.community-header {
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

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		margin-bottom: 5rem;
	}

	.feature-card {
		background: linear-gradient(135deg, rgba(15, 44, 75, 0.6), rgba(0, 74, 90, 0.3));
		border: 1px solid rgba(32, 221, 224, 0.2);
		border-radius: 16px;
		padding: 2.5rem;
		text-align: center;
		transition: all 0.4s ease;
		position: relative;
		overflow: hidden;
	}

	.feature-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(32, 221, 224, 0.1), transparent);
		transition: left 0.6s ease;
	}

	.feature-card:hover {
		transform: translateY(-5px);
		border-color: var(--color-accent-light);
		box-shadow: 0 15px 35px rgba(32, 221, 224, 0.2);
	}

	.feature-card:hover::before {
		left: 100%;
	}

	.feature-icon-wrapper {
		width: 80px;
		height: 80px;
		margin: 0 auto 1.5rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		color: white;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
		transition: all 0.4s ease;
	}

	.feature-card:hover .feature-icon-wrapper {
		transform: scale(1.1) rotate(10deg);
	}

	.feature-card h3 {
		font-size: 1.5rem;
		color: var(--color-lightest);
	}

	.stats-section {
		margin: 5rem 0;
		text-align: center;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2rem;
	}

	.stat-card {
		background: linear-gradient(135deg, rgba(0, 165, 148, 0.2), rgba(15, 44, 75, 0.4));
		border: 1px solid rgba(32, 221, 224, 0.3);
		border-radius: 16px;
		padding: 2rem;
		transition: all 0.3s ease;
	}

	.stat-card:hover {
		transform: translateY(-5px);
		border-color: var(--color-accent-light);
		box-shadow: 0 10px 30px rgba(32, 221, 224, 0.3);
	}

	.stat-card i {
		font-size: 2.5rem;
		color: var(--color-accent-light);
		margin-bottom: 1rem;
	}

	.stat-number {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--color-lightest);
		margin-bottom: 0.5rem;
	}

	.stat-label {
		font-size: 1rem;
		color: var(--color-light);
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.cta-box {
		background: var(--gradient-dragon);
		border-radius: 20px;
		padding: 4rem 2rem;
		text-align: center;
		box-shadow: 0 20px 50px rgba(32, 221, 224, 0.3);
		position: relative;
		overflow: hidden;
	}

	.cta-box::before {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
		animation: rotate 10s linear infinite;
	}

	@keyframes rotate {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	.cta-box h3 {
		font-size: 2.5rem;
		margin-bottom: 2rem;
		color: var(--color-lightest);
		position: relative;
		z-index: 1;
	}

	.cta-buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
		position: relative;
		z-index: 1;
	}

	.cta-buttons a {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		background: var(--color-lightest);
		color: var(--color-primary);
		padding: 1rem 2.5rem;
		border-radius: 50px;
		font-size: 1.1rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
		box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
	}

	.cta-buttons a:hover {
		transform: translateY(-3px) scale(1.05);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
	}

	.cta-buttons .btn-outline {
		background: transparent;
		border: 2px solid var(--color-lightest);
		color: var(--color-lightest);
	}

	.cta-buttons .btn-outline:hover {
		background: var(--color-lightest);
		color: var(--color-primary);
	}

	@media (max-width: 992px) {
		.section-title {
			font-size: 2.5rem;
		}

		.features-grid {
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

		.cta-box {
			padding: 3rem 1.5rem;
		}

		.cta-box h3 {
			font-size: 2rem;
		}

		.cta-buttons {
			flex-direction: column;
			align-items: stretch;
		}

		.cta-buttons a {
			width: 100%;
			justify-content: center;
		}
	}
</style>
