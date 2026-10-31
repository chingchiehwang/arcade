<script>
	import { onMount } from 'svelte';
	import { Direction } from '@chingchiehwang/arcade-core';
	import { game } from '#lib/game.svelte.js';
	import Board from '#lib/components/Board.svelte';
	import Scorings from '#lib/components/Scorings.svelte';
	import Keypad from '#lib/components/Keypad.svelte';

	onMount(() => game.initialize());

	const arrowKeys = {
		ArrowUp: Direction.UP,
		ArrowDown: Direction.DOWN,
		ArrowLeft: Direction.LEFT,
		ArrowRight: Direction.RIGHT
	};

	function onkeydown(event) {
		const direction = arrowKeys[event.key];
		if (!direction || event.altKey || event.ctrlKey || event.metaKey) return;
		event.preventDefault();
		game.play(direction);
	}
</script>

<svelte:head>
	<title>2048 · Arcade</title>
</svelte:head>

<svelte:window {onkeydown} />

<h1>2048</h1>

<p class="status" aria-live="polite" role="status">{game.announcement}</p>

<Board board={game.board} />

<div class="bar">
	<Scorings score={game.score} best={game.best} />
	<button type="button" onclick={() => game.reset()}>New game</button>
</div>

<Keypad onmove={(direction) => game.play(direction)} />

<style>
	.bar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-medium);
		width: min(100%, 28rem);
		margin: var(--space-medium) auto 0;
	}

	.bar button {
		padding: var(--space-small) var(--space-medium);
		background: var(--orange);
		color: var(--black);
		border: 0;
		cursor: pointer;
	}

	.status {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
	}
</style>
