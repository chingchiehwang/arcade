<script>
	import { enhance } from '$app/forms';
	import { isGameComplete } from '@chingchiehwang/arcade-core';
	import ShipGrid from '#lib/components/ShipGrid.svelte';

	let { data, form } = $props();
	let loading = $state(false);

	const game = $derived(data.game);
	const user = $derived(data.user);
	const myIndex = $derived(game.players.findIndex((p) => p.id === user?.id));
	const myGrid = $derived(game.grids[myIndex]);
	const otherGrids = $derived(game.grids.filter((g, i) => i !== myIndex));
	const myTurn = $derived(game.turn === myIndex);

	const message = $derived.by(() => {
		if (game.status === 'waiting') return 'Waiting for a second player to join.';
		if (game.status === 'finished') {
			if (!myGrid) return 'Game over.';
			return isGameComplete(myGrid.grid) ? 'You lost.' : 'You won!';
		}
		if (myTurn) return 'Your turn.';
		return "Opponent's turn.";
	});
</script>

<svelte:head>
	<title>Battleship game | ChingChieh Wang</title>
</svelte:head>

<h1>Battleship</h1>

<p>{message}</p>

{#if form?.error}
	<p>{form.error}</p>
{/if}
{#if loading}
	<p>Loading...</p>
{/if}

{#if myGrid}
	<h2>Your grid</h2>
	<ShipGrid grid={myGrid.grid} />
{/if}

{#each otherGrids as other (other.owner)}
	<h2>{myGrid ? 'Opponent grid' : other.owner + "'s grid"}</h2>
	{#if myGrid && game.status === 'active'}
		<form
			method="POST"
			action="?/fire"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					await update();
					loading = false;
				};
			}}
		>
			<ShipGrid grid={other.grid} canFire={myTurn && !loading} />
		</form>
	{:else}
		<ShipGrid grid={other.grid} />
	{/if}
{/each}
