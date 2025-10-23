<script>
	import { scrollY } from 'svelte/reactivity/window';
	import favicon from '$lib/assets/favicon.webp?enhanced';
	
	let lastScrollY = $state(0);
	
	// Derived states based on scroll position
	const isAtTop = $derived((scrollY.current ?? 0) < 50);
	
	const isVisible = $derived.by(() => {
		const currentScrollY = scrollY.current ?? 0;
		
		// Always show navbar near the top
		if (currentScrollY <= 100) {
			return true;
		}
		
		// Show navbar when scrolling up, hide when scrolling down
		return currentScrollY < lastScrollY;
	});
	
	// Update last scroll position
	$effect(() => {
		const currentScrollY = scrollY.current ?? 0;
		lastScrollY = currentScrollY;
	});
	
	const navLinks = [
		{ href: '#about', label: 'About', icon: 'fa-info-circle' },
		{ href: '#socials', label: 'Socials', icon: 'fa-share-alt' },
		{ href: '#community', label: 'Community', icon: 'fa-users' }
	];
</script>

<nav class={{ navbar: true, 'navbar-hidden': !isVisible, 'navbar-scrolled': !isAtTop }}>
	<div class="navbar-container container">
		<a href="/" class="navbar-brand">
			<enhanced:img src={favicon} alt="DreamingDragons Logo" class="navbar-logo rounded-circle" />
			<span>DreamingDragons</span>
		</a>
		
		<ul class="navbar-menu">
			{#each navLinks as link (link.href)}
				<li>
					<a href={link.href} class="navbar-link">
						<i class="fas {link.icon}"></i>
						<span>{link.label}</span>
					</a>
				</li>
			{/each}
		</ul>
		
		<a 
			href="https://discord.gg/u6qFjfDDy2" 
			target="_blank" 
			rel="noopener noreferrer" 
			class="navbar-cta"
		>
			<i class="fab fa-discord"></i>
			<span>Join Discord</span>
		</a>
	</div>
</nav>

<style>
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		background: rgba(26, 20, 47, 0.8);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(32, 221, 224, 0.1);
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
		            background-color 0.3s ease,
		            box-shadow 0.3s ease;
		transform: translateY(0);
	}
	
	.navbar-scrolled {
		background: rgba(26, 20, 47, 0.95);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
	}
	
	.navbar-hidden {
		transform: translateY(-100%);
	}
	
	.navbar-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.5rem;
		max-width: 1400px;
	}
	
	.navbar-brand {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-lightest);
		text-decoration: none;
		transition: all 0.3s ease;
	}
	
	.navbar-brand :global(.navbar-logo) {
		width: 2rem;
		height: 2rem;
		object-fit: contain;
		filter: drop-shadow(0 0 8px rgba(32, 221, 224, 0.5));
		transition: filter 0.3s ease;
	}
	
	.navbar-brand:hover {
		transform: translateY(-2px);
		color: var(--color-accent-light);
	}
	
	.navbar-brand:hover :global(.navbar-logo) {
		filter: drop-shadow(0 0 12px rgba(32, 221, 224, 0.8));
	}
	
	.navbar-menu {
		display: flex;
		align-items: center;
		gap: 2.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	
	.navbar-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--color-light);
		font-weight: 500;
		font-size: 1rem;
		padding: 0.5rem 0;
		position: relative;
		transition: all 0.3s ease;
	}
	
	.navbar-link::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 2px;
		background: var(--gradient-dragon);
		transition: width 0.3s ease;
	}
	
	.navbar-link:hover {
		color: var(--color-accent-light);
	}
	
	.navbar-link:hover::after {
		width: 100%;
	}
	
	.navbar-link i {
		font-size: 0.9rem;
	}
	
	.navbar-cta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: var(--gradient-dragon);
		color: var(--color-lightest);
		padding: 0.65rem 1.5rem;
		font-weight: 600;
		font-size: 0.95rem;
		border-radius: 50px;
		transition: all 0.3s ease;
		box-shadow: 0 4px 15px rgba(32, 221, 224, 0.2);
		text-decoration: none;
	}
	
	.navbar-cta:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 25px rgba(32, 221, 224, 0.4);
		color: var(--color-lightest);
	}
	
	.navbar-cta i {
		font-size: 1.1rem;
	}
	
	/* Responsive styles - hide navbar on mobile/tablet */
	@media (max-width: 1024px) {
		.navbar {
			display: none;
		}
	}
</style>
