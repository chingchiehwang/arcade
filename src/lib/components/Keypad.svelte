<script>
	import { Direction } from '@chingchiehwang/arcade-core';

	let { onmove } = $props();

	const buttons = [
		[
			null,
			{ direction: Direction.UP, label: 'Move up', arrow: '↑' },
			null
		],
		[
			{ direction: Direction.LEFT, label: 'Move left', arrow: '←' },
			{ direction: Direction.DOWN, label: 'Move down', arrow: '↓' },
			{ direction: Direction.RIGHT, label: 'Move right', arrow: '→' }
		]
	];
</script>

<div class="keypad">
	{#each buttons as row, rowIndex (rowIndex)}
		{#each row as button, colIndex (colIndex)}
			{#if button}
				<button
					type="button"
					aria-label={button.label}
					onclick={() => onmove(button.direction)}
				>{button.arrow}</button>
			{:else}
				<span aria-hidden="true"></span>
			{/if}
		{/each}
	{/each}
</div>

<style>
	.keypad {
		display: none;
		grid-template-columns: repeat(3, 4rem);
		gap: 0.5rem;
		justify-content: center;
		margin-top: 1.5rem;
	}

	@media (max-width: 640px), (pointer: coarse) {
		.keypad {
			display: grid;
		}
	}

	button {
		width: 4rem;
		font-size: 1.5rem;
		background: var(--orange);
		color: var(--black);
	}
</style>
