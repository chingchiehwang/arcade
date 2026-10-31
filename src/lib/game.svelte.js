import { move, movePoints, spawn, canMove, hasMoves } from '@chingchiehwang/arcade-core';

const WIN_BLOCK = 2048;
const STORAGE_KEY = 'arcade-2048';

const emptyBoard = () => [
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]
];
const freshBoard = () => spawn(spawn(emptyBoard()));

class Game {
	board = $state(emptyBoard());
	score = $state(0);
	best = $state(0);
	initialized = $state(false);

	over = $derived(this.initialized && !hasMoves(this.board));
	won = $derived(this.initialized && this.board.flat().some((value) => value >= WIN_BLOCK));
	announcement = $derived(
		!this.initialized
			? ''
			: this.over
				? `Game over. Score ${this.score}.`
				: this.won
					? `You win! Score ${this.score}.`
					: `Score ${this.score}.`
	);

	initialize() {
		try {
			const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
			this.board = saved.board;
			this.score = saved.score;
			this.best = saved.best;
		} catch {
			this.board = freshBoard();
			this.save();
		}
		this.initialized = true;
	}

	save() {
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({ board: this.board, score: this.score, best: this.best })
		);
	}

	play(direction) {
		if (!this.initialized || this.over || !canMove(this.board, direction)) return;

		this.score += movePoints(this.board, direction);
		this.board = spawn(move(this.board, direction));
		this.best = Math.max(this.best, this.score);
		this.save();
	}

	reset() {
		this.board = freshBoard();
		this.score = 0;
		this.save();
	}
}

export const game = new Game();
