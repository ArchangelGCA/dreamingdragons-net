<script>
	import favicon from '$lib/assets/favicon.webp?enhanced';
	
	const currentYear = new Date().getFullYear();
	
	const socialLinks = [
		{ icon: 'fab fa-discord', url: 'https://discord.gg/u6qFjfDDy2', label: 'Discord' },
		{ icon: 'fab fa-deviantart', url: 'https://www.deviantart.com/dreamingdragons', label: 'DeviantArt' },
		{ icon: 'fas fa-dragon', url: 'https://tales.archangelgca.eu/', label: 'DreamingDragons Tales' }
	];

	const quickLinks = [
		{ text: 'About', href: '#about' },
		{ text: 'Platforms', href: '#platforms' },
		{ text: 'Community', href: '#community' }
	];
</script>

<footer class="footer">
	<div class="footer-content container">
		<div class="footer-grid">
			<div class="footer-section">
				<div class="footer-logo">
					<enhanced:img src={favicon} alt="DreamingDragons Logo" class="dragon-emoji rounded-circle" />
					<h3>DreamingDragons</h3>
				</div>
				<p class="footer-description">
					A thriving community of artists and writers passionate about dragons. 
					Join us and let your creativity soar!
				</p>
				<div class="social-links">
					{#each socialLinks as social (social.label)}
						<a 
							href={social.url} 
							target="_blank" 
							rel="noopener noreferrer"
							aria-label={social.label}
							class="social-link"
						>
							<i class={social.icon}></i>
						</a>
					{/each}
				</div>
			</div>
			
			<div class="footer-section">
				<h4>Quick Links</h4>
				<ul class="footer-links">
					{#each quickLinks as link (link.text)}
						<li>
							<a href={link.href}>
								<i class="fas fa-chevron-right"></i>
								{link.text}
							</a>
						</li>
					{/each}
				</ul>
			</div>
			
			<div class="footer-section">
				<h4>Our Socials</h4>
				<ul class="footer-links">
					<li>
						<a href="https://discord.gg/u6qFjfDDy2" target="_blank" rel="noopener noreferrer">
							<i class="fab fa-discord"></i>
							Discord
						</a>
					</li>
					<li>
						<a href="https://www.deviantart.com/dreamingdragons" target="_blank" rel="noopener noreferrer">
							<i class="fab fa-deviantart"></i>
							DeviantArt
						</a>
					</li>
					<li>
						<a href="https://tales.archangelgca.eu/" target="_blank" rel="noopener noreferrer">
							<i class="fas fa-dragon"></i>
							Tales
						</a>
					</li>
				</ul>
			</div>
			
			<div class="footer-section">
				<h4>Community Rules</h4>
				<ul class="footer-links">
					<li>
						<i class="fas fa-ban"></i>
						NO AI Art
					</li>
					<li>
						<i class="fas fa-ban"></i>
						NO NSFW Content
					</li>
					<li>
						<i class="fas fa-check"></i>
						Everyone Welcome
					</li>
				</ul>
			</div>
		</div>
		
		<div class="footer-divider"></div>
		
		<div class="footer-bottom">
			<p class="copyright">
				© {currentYear} DreamingDragons. Founded by 
				<a href="https://archangelgca.eu/" target="_blank" rel="noopener noreferrer">
					ArchangelGCA
				</a>
			</p>
			<p class="tagline">
				Breathing fire into our dreams since 2023
			</p>
		</div>
	</div>
	
	<div class="footer-decoration">
		<div class="decoration-line"></div>
	</div>
</footer>

<style>
	.footer {
		background: linear-gradient(180deg, var(--color-primary-dark) 0%, #0a0a1f 100%);
		position: relative;
		overflow: hidden;
		padding: 4rem 0 2rem;
	}

	.footer::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, transparent, var(--color-accent-light), transparent);
	}

	.footer-content {
		position: relative;
		z-index: 1;
	}

	.footer-grid {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr 1fr;
		gap: 2rem;
		margin-bottom: 3rem;
	}

	@media (max-width: 992px) {
		.footer-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 2.5rem;
		}
	}

	.footer-section h4 {
		color: var(--color-lightest);
		font-size: 1.3rem;
		margin-bottom: 1.5rem;
		position: relative;
		padding-bottom: 0.5rem;
	}

	.footer-section h4::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 50px;
		height: 2px;
		background: var(--gradient-dragon);
	}

	.footer-logo {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	:global(.dragon-emoji) {
		width: 2.5rem;
		height: 2.5rem;
		object-fit: contain;
		filter: drop-shadow(0 0 10px rgba(32, 221, 224, 0.5));
	}

	.footer-logo h3 {
		font-size: 1.75rem;
		background: linear-gradient(135deg, var(--color-lightest), var(--color-accent-light));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.footer-description {
		color: var(--color-light);
		line-height: 1.8;
		margin-bottom: 1.5rem;
	}

	.social-links {
		display: flex;
		gap: 1rem;
	}

	.social-link {
		width: 45px;
		height: 45px;
		background: linear-gradient(135deg, rgba(0, 165, 148, 0.2), rgba(32, 221, 224, 0.1));
		border: 1px solid rgba(32, 221, 224, 0.3);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-accent-light);
		font-size: 1.2rem;
		transition: all 0.3s ease;
	}

	.social-link:hover {
		background: var(--gradient-dragon);
		border-color: var(--color-accent-light);
		transform: translateY(-5px) rotate(10deg);
		box-shadow: 0 10px 20px rgba(32, 221, 224, 0.3);
		color: var(--color-lightest);
	}

	.footer-links {
		list-style: none;
	}

	.footer-links li {
		margin-bottom: 1rem;
	}

	.footer-links a,
	.footer-links li {
		color: var(--color-light);
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.footer-links a:hover {
		color: var(--color-accent-light);
		transform: translateX(5px);
	}

	.footer-links i {
		font-size: 0.9rem;
		color: var(--color-accent);
	}

	.footer-divider {
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(32, 221, 224, 0.3), transparent);
		margin: 2rem 0;
	}

	.footer-bottom {
		text-align: center;
		color: var(--color-light);
	}

	.copyright {
		margin-bottom: 0.5rem;
		font-size: 1rem;
	}

	.copyright a {
		color: var(--color-accent-light);
		font-weight: 600;
	}

	.copyright a:hover {
		color: var(--color-lightest);
		text-decoration: underline;
	}

	.tagline {
		font-style: italic;
		color: var(--color-accent-light);
		font-size: 0.95rem;
	}

	.footer-decoration {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 3px;
		overflow: hidden;
	}

	.decoration-line {
		height: 100%;
		background: var(--gradient-dragon);
		animation: slide 3s linear infinite;
	}

	@keyframes slide {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}

	@media (max-width: 768px) {
		.footer-grid {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}

		.footer-section {
			text-align: center;
		}

		.footer-section h4::after {
			left: 50%;
			transform: translateX(-50%);
		}

		.footer-logo {
			justify-content: center;
		}

		.social-links {
			justify-content: center;
		}

		.footer-links a {
			justify-content: center;
		}
	}

	@media (max-width: 576px) {
		.footer {
			padding: 3rem 0 1.5rem;
		}

		.footer-logo h3 {
			font-size: 1.5rem;
		}

		.footer-section h4 {
			font-size: 1.2rem;
		}
	}
</style>
