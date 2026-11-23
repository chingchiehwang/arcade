<script>
	import { enhance } from '$app/forms';

	let { form } = $props();
	let loading = $state(false);
</script>

<svelte:head>
	<title>Log in | ChingChieh Wang</title>
</svelte:head>

<h1>Log in</h1>

<form
	method="POST"
	use:enhance={() => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	}}
>
	{#if form?.error}
		<p>{form.error}</p>
	{/if}

	<div>
		<label for="email">Email</label>
		<input id="email" name="email" type="text" />
	</div>
	<div>
		<label for="password">Password</label>
		<input id="password" name="password" type="password" />
	</div>
	<button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Log in'}</button>
</form>
