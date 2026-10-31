<script>
	import '#lib/styles/tokens.css';
	import NavBar from '#lib/components/NavBar.svelte';

	let { children } = $props();
</script>

<header>
	<div class="nav-wrap">
		<span class="brand">ChingChieh Wang</span>
		<NavBar />
	</div>
</header>

<main>
	{@render children()}
</main>

<footer>
	<p>Have a nice day~~</p>
</footer>

<style>
	:global(body) {
		display: flex;
		min-height: 100vh;
		flex-direction: column;
		margin: 0;
		background: var(--page-bg);
		color: var(--black);
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		line-height: 1.6;
	}

	:global(a) {
		color: var(--black);
	}

	:global(:focus-visible) {
		outline: 2px solid var(--black);
		outline-offset: 3px;
	}

	:global(img) {
		display: block;
		max-width: 100%;
	}

	header {
		background: var(--black);
	}

	.nav-wrap,
	main,
	footer p {
		max-width: var(--page-width);
		margin: 0 auto;
		padding: 0 var(--space-large);
	}

	.nav-wrap {
		display: flex;
		min-height: 74px;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-medium);
	}

	.brand {
		color: #fff;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	main {
		flex: 1;
		width: 100%;
		padding-top: var(--space-large);
		padding-bottom: 3rem;
	}

	footer {
		padding: var(--space-large) 0;
	}

	@media (max-width: 760px) {
		.nav-wrap {
			flex-direction: column;
			justify-content: center;
		}
	}
</style>
