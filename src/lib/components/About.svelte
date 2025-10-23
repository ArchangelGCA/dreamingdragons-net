<section id="about" class="about section">
	<div class="container">
		<div class="about-content">
			<div class="about-header">
				<h2 class="section-title">About DreamingDragons</h2>
				<div class="title-underline"></div>
			</div>
			
			<div class="about-grid">
				<div class="about-text">
					<p class="lead">
						Welcome to <strong>DreamingDragons</strong>, where creativity takes flight and imagination knows no bounds!
					</p>
					<p>
						Founded by <a href="https://archangelgca.eu/" target="_blank" rel="noopener noreferrer">ArchangelGCA</a>,
						DreamingDragons is a thriving community of artists who share a deep passion for dragons and fantasy.
					</p>
					<p>
						Whether you're a seasoned artist, an aspiring one, or simply someone who loves dragon art,
						you'll find a welcoming home here among thousands of like-minded creators.
					</p>
					
					<div class="features-list">
						<div class="feature-item">
							<i class="fas fa-palette"></i>
							<div>
								<h4>Share Your Art</h4>
								<p>Showcase your artworks with us</p>
							</div>
						</div>
						<div class="feature-item">
							<i class="fas fa-book"></i>
							<div>
								<h4>Write Stories</h4>
								<p>Share your dragon tales and literature with our community</p>
							</div>
						</div>
						<div class="feature-item">
							<i class="fas fa-users"></i>
							<div>
								<h4>Connect & Collaborate</h4>
								<p>Meet fellow artists, get feedback, and collaborate on projects</p>
							</div>
						</div>
						<div class="feature-item">
							<i class="fas fa-trophy"></i>
							<div>
								<h4>Join Contests</h4>
								<p>Participate in art contests and showcase your skills</p>
							</div>
						</div>
					</div>
				</div>
				
				<div class="about-highlights">
					<div class="highlight-card">
						<div class="highlight-icon">
							<i class="fas fa-fire"></i>
						</div>
						<h3>No Requirements</h3>
						<p>Everyone is welcome! Members are automatically accepted with no barriers to entry.</p>
					</div>
					
					<div class="highlight-card">
						<div class="highlight-icon">
							<i class="fas fa-shield-alt"></i>
						</div>
						<h3>NO AI - NO NSFW</h3>
						<p>We maintain a creative, original, and family-friendly environment for all members.</p>
					</div>
					
					<div class="highlight-card">
						<div class="highlight-icon">
							<i class="fas fa-globe"></i>
						</div>
						<h3>Socials</h3>
						<p>Connect with us on DeviantArt, Discord, and our own platform.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.about {
		background: linear-gradient(180deg, var(--color-primary-dark) 0%, var(--color-primary) 100%);
		position: relative;
	}

	.about::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--color-accent-light), transparent);
	}

	.about-header {
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
		margin: 0 auto;
		border-radius: 2px;
	}

	.about-grid {
		display: grid;
		grid-template-columns: 1.5fr 1fr;
		gap: 4rem;
		align-items: start;
	}

	.about-text {
		color: var(--color-light);
	}

	.lead {
		font-size: 1.3rem;
		line-height: 1.8;
		margin-bottom: 1.5rem;
		color: var(--color-lightest);
	}

	.about-text p {
		margin-bottom: 1.5rem;
		font-size: 1.1rem;
		line-height: 1.8;
	}

	.about-text a {
		color: var(--color-accent-light);
		font-weight: 600;
		text-decoration: underline;
	}

	.about-text a:hover {
		color: var(--color-lightest);
	}

	.features-list {
		margin-top: 3rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.feature-item {
		display: flex;
		gap: 1.5rem;
		align-items: start;
		padding: 1.5rem;
		background: rgba(15, 44, 75, 0.3);
		border-radius: 12px;
		border-left: 4px solid var(--color-accent);
		transition: all 0.3s ease;
	}

	.feature-item:hover {
		background: rgba(15, 44, 75, 0.5);
		transform: translateX(10px);
		border-left-color: var(--color-accent-light);
	}

	.feature-item i {
		font-size: 2rem;
		color: var(--color-accent-light);
		min-width: 2rem;
	}

	.feature-item h4 {
		margin-bottom: 0.5rem;
		color: var(--color-lightest);
		font-size: 1.2rem;
	}

	.feature-item p {
		margin: 0;
		color: var(--color-light);
		font-size: 1rem;
	}

	.about-highlights {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.highlight-card {
		background: linear-gradient(135deg, rgba(0, 165, 148, 0.1), rgba(15, 44, 75, 0.3));
		padding: 2rem;
		border-radius: 16px;
		border: 1px solid rgba(32, 221, 224, 0.2);
		text-align: center;
		transition: all 0.3s ease;
	}

	.highlight-card:hover {
		transform: translateY(-5px);
		border-color: var(--color-accent-light);
		box-shadow: 0 10px 30px rgba(32, 221, 224, 0.2);
	}

	.highlight-icon {
		width: 80px;
		height: 80px;
		margin: 0 auto 1.5rem;
		background: var(--gradient-dragon);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		color: var(--color-lightest);
		box-shadow: 0 5px 20px rgba(32, 221, 224, 0.3);
	}

	.highlight-card h3 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		color: var(--color-lightest);
	}

	.highlight-card p {
		color: var(--color-light);
		line-height: 1.6;
	}

	@media (max-width: 992px) {
		.about-grid {
			grid-template-columns: 1fr;
			gap: 3rem;
		}

		.section-title {
			font-size: 2.5rem;
		}
	}

	@media (max-width: 576px) {
		.section-title {
			font-size: 2rem;
		}

		.lead {
			font-size: 1.1rem;
		}

		.feature-item {
			flex-direction: column;
			text-align: center;
		}

		.feature-item i {
			font-size: 2.5rem;
		}
	}
</style>
