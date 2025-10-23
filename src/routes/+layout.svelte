<script>
    import Seo from "$lib/components/Seo.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import 'bootstrap/dist/css/bootstrap.min.css';
    import scriptSrc from 'bootstrap/dist/js/bootstrap.bundle.min.js?url';
    import '@fortawesome/fontawesome-free/css/all.min.css';
    import favicon from '$lib/assets/favicon.webp?url';

	let { children } = $props();
</script>

<svelte:head>
    <script rel="preload" src={scriptSrc}></script>
</svelte:head>

<Seo>
</Seo>

<Navbar />

{@render children?.()}

<style>

    :global {

        :root {
            --color-primary-dark: #1a142f;
            --color-primary: #0f2c4b;
            --color-secondary: #004a5a;
            --color-accent: #00a594;
            --color-accent-light: #20dde0;
            --color-light: #cce0e5;
            --color-lightest: #f0f8ff;
            --gradient-dragon: linear-gradient(135deg, #0f2c4b 0%, #004a5a 50%, #00a594 100%);
            --gradient-hero: linear-gradient(180deg, #1a142f 0%, #0f2c4b 100%);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            background: var(--color-primary-dark);
            color: var(--color-light);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            overflow-x: hidden;
        }

        h1, h2, h3, h4, h5, h6 {
            font-weight: 700;
            line-height: 1.2;
            color: var(--color-lightest);
        }

        a {
            color: var(--color-accent-light);
            text-decoration: none;
            transition: all 0.3s ease;
        }

        a:hover {
            color: var(--color-lightest);
            text-decoration: none;
        }

        .btn-primary {
            background: var(--gradient-dragon);
            border: none;
            color: var(--color-lightest);
            padding: 0.75rem 2rem;
            font-size: 1.1rem;
            font-weight: 600;
            border-radius: 50px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(32, 221, 224, 0.3);
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(32, 221, 224, 0.5);
            color: var(--color-lightest);
        }

        .btn-outline {
            background: transparent;
            border: 2px solid var(--color-accent-light);
            color: var(--color-accent-light);
            padding: 0.75rem 2rem;
            font-size: 1.1rem;
            font-weight: 600;
            border-radius: 50px;
            transition: all 0.3s ease;
        }

        .btn-outline:hover {
            background: var(--color-accent-light);
            color: var(--color-primary-dark);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(32, 221, 224, 0.4);
        }

        .section {
            padding: 5rem 0;
            position: relative;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.5rem;
        }

        @media (max-width: 768px) {
            .section {
                padding: 3rem 0;
            }
        }

        /* Scroll animations */

        .fade-in {
            animation: fadeIn 1s ease-in;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Custom scrollbar */

        ::-webkit-scrollbar {
            width: 12px;
        }

        ::-webkit-scrollbar-track {
            background: var(--color-primary-dark);
        }

        ::-webkit-scrollbar-thumb {
            background: var(--color-accent);
            border-radius: 6px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: var(--color-accent-light);
        }
    }
</style>
