<script>
	import { page } from '$app/state';

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/2048', label: '2048' },
		{ href: '/crossword', label: 'Crossword' },
		{ href: '/about', label: 'About' },
		{ href: '/contact', label: 'Contact' }
	];
</script>

<nav aria-label="Main">
	<ul>
		{#each links as link (link.href)}
			<li>
				<a href={link.href} aria-current={page.url.pathname === link.href ? 'page' : undefined}>
					{link.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	ul {
		display: flex;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: flex;
		margin: 0;
	}

	a {
		display: flex;
		min-height: 74px;
		align-items: center;
		padding: 0 0.9rem;
		border-right: 1px solid var(--orange);
		border-left: 1px solid var(--orange);
		background: var(--black);
		color: #fff;
		text-decoration: none;
		transition: background-color 0.2s ease;
	}

	a:hover,
	a:focus-visible,
	a[aria-current='page'] {
		background: var(--orange);
		color: var(--black);
	}

	@media (max-width: 760px) {
		ul {
			flex-wrap: wrap;
			justify-content: center;
		}

		a {
			min-height: 44px;
		}
	}

	@media (max-width: 420px) {
		a {
			padding: 0 0.7rem;
			font-size: 0.95rem;
		}
	}
</style>
