<script>
	const cells = [
		{ id: 'r1c1', letter: 'B', number: 1, label: 'Row 1, column 1, 1 Across and 1 Down' },
		{ id: 'r1c2', letter: 'E', label: 'Row 1, column 2, 1 Across' },
		{ id: 'r1c3', letter: 'A', number: 2, label: 'Row 1, column 3, 1 Across and 2 Down' },
		{ id: 'r1c4', letter: 'C', label: 'Row 1, column 4, 1 Across' },
		{ id: 'r1c5', letter: 'H', number: 3, label: 'Row 1, column 5, 1 Across and 3 Down' },
		{ id: 'r2c1', letter: 'U', label: 'Row 2, column 1, 1 Down' },
		{ id: 'r2c2', blocked: true },
		{ id: 'r2c3', letter: 'G', label: 'Row 2, column 3, 2 Down' },
		{ id: 'r2c4', blocked: true },
		{ id: 'r2c5', letter: 'O', label: 'Row 2, column 5, 3 Down' },
		{ id: 'r3c1', letter: 'S', number: 4, label: 'Row 3, column 1, 4 Across and 1 Down' },
		{ id: 'r3c2', letter: 'T', label: 'Row 3, column 2, 4 Across' },
		{ id: 'r3c3', letter: 'A', label: 'Row 3, column 3, 4 Across and 2 Down' },
		{ id: 'r3c4', letter: 'I', label: 'Row 3, column 4, 4 Across' },
		{ id: 'r3c5', letter: 'R', label: 'Row 3, column 5, 4 Across and 3 Down' },
		{ id: 'r4c1', blocked: true },
		{ id: 'r4c2', blocked: true },
		{ id: 'r4c3', letter: 'I', label: 'Row 4, column 3, 2 Down' },
		{ id: 'r4c4', blocked: true },
		{ id: 'r4c5', letter: 'S', label: 'Row 4, column 5, 3 Down' },
		{ id: 'r5c1', letter: 'D', number: 5, label: 'Row 5, column 1, 5 Across' },
		{ id: 'r5c2', letter: 'A', label: 'Row 5, column 2, 5 Across' },
		{ id: 'r5c3', letter: 'N', label: 'Row 5, column 3, 5 Across and 2 Down' },
		{ id: 'r5c4', letter: 'C', label: 'Row 5, column 4, 5 Across' },
		{ id: 'r5c5', letter: 'E', label: 'Row 5, column 5, 5 Across and 3 Down' }
	];

	const clues = {
		across: [
			{ number: 1, text: 'A sandy place by the sea.' },
			{ number: 4, text: 'One step on a staircase.' },
			{ number: 5, text: 'Move your body to music.' }
		],
		down: [
			{ number: 1, text: 'Big vehicle that takes you to school.' },
			{ number: 2, text: 'One more time.' },
			{ number: 3, text: 'An animal you can ride.' }
		]
	};

	const solutionLabel =
		'Solved crossword: BEACH, STAIR, and DANCE across; BUS, AGAIN, and HORSE down';
</script>

<svelte:head>
	<title>Crossword | ChingChieh Wang</title>
</svelte:head>

<section>
	<h1>Mini crossword</h1>
	<p>
		Type one letter in each open square. Use the clues to fill the grid, or open the solution to
		check your answers.
	</p>

	<div class="game-shell">
		<div>
			<div class="game-board">
				{#each cells as cell (cell.id)}
					{#if cell.blocked}
						<div class="cell blocked" aria-hidden="true"></div>
					{:else}
						<div class="cell">
							{#if cell.number}
								<span class="number">{cell.number}</span>
							{/if}
							<label class="visually-hidden" for={cell.id}>{cell.label}</label>
							<input id={cell.id} type="text" maxlength="1" autocomplete="off" />
						</div>
					{/if}
				{/each}
			</div>

			<details>
				<summary>Reveal the solution</summary>
				<div class="solution">
					<p>Here is the finished grid:</p>
					<div class="solution-board" role="img" aria-label={solutionLabel}>
						{#each cells as cell (cell.id)}
							{#if cell.blocked}
								<span class="block"></span>
							{:else}
								<span class="letter">{cell.letter}</span>
							{/if}
						{/each}
					</div>
				</div>
			</details>
		</div>

		<aside>
			<h2>Clues</h2>
			<div class="clues">
				<div>
					<h3>Across</h3>
					<ol>
						{#each clues.across as clue (clue.number)}
							<li value={clue.number}>{clue.text}</li>
						{/each}
					</ol>
				</div>
				<div>
					<h3>Down</h3>
					<ol>
						{#each clues.down as clue (clue.number)}
							<li value={clue.number}>{clue.text}</li>
						{/each}
					</ol>
				</div>
			</div>
		</aside>
	</div>
</section>

<style>
	.game-shell {
		display: grid;
		grid-template-columns: 1.1fr 0.9fr;
		gap: var(--space-large);
		align-items: start;
	}

	details {
		margin-top: var(--space-large);
		border: 1px solid var(--line);
	}

	summary {
		padding: var(--space-medium);
		cursor: pointer;
		font-weight: 700;
	}

	.solution {
		padding: 0 var(--space-medium) var(--space-medium);
		color: var(--muted);
	}

	.clues {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-large);
	}

	.clues ol {
		margin: 0;
	}

	.game-board,
	.solution-board {
		display: grid;
		max-width: 420px;
		grid-template-columns: repeat(5, 1fr);
		gap: 0.35rem;
		margin: 0 auto;
	}

	.cell {
		position: relative;
		aspect-ratio: 1;
		border: 1px solid var(--line);
		background: #eef3ff;
	}

	.blocked {
		border-color: var(--black);
		background: var(--black);
	}

	input {
		width: 100%;
		height: 100%;
		padding: 0;
		border: 0;
		background: transparent;
		color: var(--black);
		font-size: var(--text-h2);
		font-weight: 700;
		text-align: center;
		text-transform: uppercase;
	}

	input:focus {
		background: var(--orange);
		outline: 3px solid var(--black);
		outline-offset: 0;
	}

	.number {
		position: absolute;
		top: 2px;
		left: 4px;
		font-size: 0.7rem;
		font-weight: 700;
		pointer-events: none;
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
	}

	.letter,
	.block {
		aspect-ratio: 1;
		border: 1px solid var(--line);
	}

	.letter {
		display: grid;
		place-items: center;
		background: #eef3ff;
		font-size: var(--text-h2);
		font-weight: 700;
	}

	.block {
		border-color: var(--black);
		background: var(--black);
	}

	@media (max-width: 760px) {
		.game-shell,
		.clues {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 420px) {
		.game-board,
		.solution-board {
			gap: 0.25rem;
		}
	}
</style>
