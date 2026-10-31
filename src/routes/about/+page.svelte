<svelte:head>
	<title>About | ChingChieh Wang</title>
</svelte:head>

<section>
	<h1>About me</h1>

	<div class="info-grid">
		<article class="profile">
			<img src="/images/profile.png" alt="Illustration of a person wearing a suit and tie" />
			<h2>ChingChieh Wang</h2>
			<p>He/Him</p>
		</article>

		<section>
			<h2>Education and experience</h2>
			<h3>Experience</h3>
			<h4>Bear Robotics Inc.</h4>
			<h5>Software Engineer Intern</h5>
			<h3>Education</h3>
			<h4>Northeastern University</h4>
			<h5>M.S. Computer Science Align</h5>
			<h6>Third-year student</h6>
		</section>
	</div>
</section>

<style>
	.info-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-large);
	}

	.profile img {
		width: 180px;
		margin-bottom: var(--space-large);
	}

	@media (max-width: 760px) {
		.info-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
