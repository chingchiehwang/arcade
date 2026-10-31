<script>
	import Block from './Block.svelte';

	let { board } = $props();
</script>

<div class="board" role="group" aria-label="2048 board">
	{#each board as row, rowIndex (rowIndex)}
		{#each row as value, colIndex (`${rowIndex}-${colIndex}`)}
			<div class="cell">
				{#if value}
					<Block {value} />
				{/if}
			</div>
		{/each}
	{/each}
</div>

<style>
	.board {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-small);
		padding: var(--space-small);
		width: min(100%, 28rem);
		aspect-ratio: 1;
		margin-inline: auto;
		background: var(--orange);
	}

	.cell {
		display: grid;
		aspect-ratio: 1;
		background: var(--black);
	}
</style>
