<script>
	import { fade } from 'svelte/transition';

	let { value } = $props();

	function blockColor(value) {
		const steps = Math.log2(value / 2);
		const lightness = 34 + 61 * 0.9 ** steps;
		return `hsl(37 100% ${lightness}%)`;
	}
</script>

<div
	class="block"
	style:background={blockColor(value)}
	in:fade={{ duration: 250 }}
>
	{value}
</div>

<style>
	.block {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
	}
</style>
