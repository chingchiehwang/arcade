<script>
	import { findShipAt, isShipSunk, isValidShot, Shot } from '@chingchiehwang/arcade-core';

	let { grid, canFire = false } = $props();

	const BlockState = Object.freeze({
		EMPTY: 'empty',
		SHIP: 'ship',
		HIT: 'hit',
		SUNK: 'sunk',
		MISS: 'miss'
	});

	function blockState(x, y) {
		const ship = findShipAt(grid, x, y);
		const shot = grid.shots[y][x];
		if (shot === Shot.HIT && ship && isShipSunk(grid, ship)) return BlockState.SUNK;
		if (shot === Shot.HIT) return BlockState.HIT;
		if (shot === Shot.MISS) return BlockState.MISS;
		if (ship) return BlockState.SHIP;
		return BlockState.EMPTY;
	}
</script>

<div class="grid">
	{#each grid.shots as row, y (y)}
		{#each row as shot, x (x)}
			{@const state = blockState(x, y)}
			<button
				class="block {state}"
				name="block"
				value="{x},{y}"
				aria-label="{x},{y} {state}"
				disabled={!canFire || !isValidShot(grid, x, y)}
			>
				{#if shot !== Shot.NONE}
					<img src="/icons/{state}.svg" alt="" />
				{/if}
			</button>
		{/each}
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		width: 300px;
		max-width: 100%;
		border: 1px solid var(--black);
	}

	.block {
		display: flex;
		align-items: center;
		justify-content: center;
		aspect-ratio: 1;
		border: 1px solid var(--black);
		background: white;
	}

	.ship {
		background: var(--black);
	}

	.hit {
		background: var(--orange);
	}

	.sunk {
		background: var(--black);
	}

	img {
		width: 70%;
	}
</style>
