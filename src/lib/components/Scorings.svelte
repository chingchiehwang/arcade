<script>
	let { score, best } = $props();
</script>

<div class="scores">
	<p class="box">Score: {score}</p>
	<p class="box">Best: {best}</p>
</div>

<style>
	.scores {
		gap: 1rem;
	}

</style>
