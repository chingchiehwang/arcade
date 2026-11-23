<script>
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let loading = $state(false);

	function submit() {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	}
</script>

<svelte:head>
	<title>Battleship | ChingChieh Wang</title>
</svelte:head>

<h1>Battleship</h1>

{#if form?.error}
	<p>{form.error}</p>
{/if}
{#if loading}
	<p>Loading...</p>
{/if}

<form method="POST" action="?/create" use:enhance={submit}>
	<button type="submit" disabled={loading}>New game</button>
</form>

<h2>My games</h2>
{#if data.mine.length === 0}
	<p>You have no games yet.</p>
{:else}
	<ul>
		{#each data.mine as game (game.id)}
			<li>
				<a href="/games/battleship/{game.id}">
					{game.players.map((p) => p.email).join(' vs ')}
				</a>
			</li>
		{/each}
	</ul>
{/if}

<h2>Open games</h2>
{#if data.waiting.length === 0}
	<p>No games are waiting right now.</p>
{:else}
	<ul>
		{#each data.waiting as game (game.id)}
			<li>
				{game.players[0].email}
				<form method="POST" action="?/join" use:enhance={submit}>
					<input type="hidden" name="id" value={game.id} />
					<button type="submit" disabled={loading}>Join</button>
				</form>
			</li>
		{/each}
	</ul>
{/if}
