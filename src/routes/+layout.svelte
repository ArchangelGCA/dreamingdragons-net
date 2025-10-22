<script>
    import Seo from "$lib/components/Seo.svelte";
    import 'bootstrap/dist/css/bootstrap.min.css';
    import scriptSrc from 'bootstrap/dist/js/bootstrap.bundle.min.js?url';
    import '@fortawesome/fontawesome-free/css/all.min.css';

	let { children } = $props();
</script>

<svelte:head>
    <script rel="preload" src={scriptSrc}></script>
</svelte:head>

<Seo>

</Seo>

{@render children?.()}
