<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>Hyperbolic Pro Plus Max Ultra 7</title>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
