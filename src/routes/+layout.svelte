<script>
	import '../global.css';
	import FooterNav from '../components/FooterNav.svelte';

</script>

<svelte:head>
	<title>TinaKing Workflow Tracking System</title>
</svelte:head>

<slot />

<footer>
	<FooterNav />
</footer>

<style>
	/* .navbar {
		background-color: rgb(0, 102, 153);
		padding: 2.5rem;
		color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
	}
	.navbar::after {
		content: '';
		position: absolute;
		height: 33px;
		min-width: 100%;
		background: url($lib/images/headerborder.png);
		opacity: 1;
		z-index: 2001;
		top: 107px;
		left: 0px;
	}

	.logo a {
		font-size: 2rem;
		font-weight: bold;
	}
	nav a {
		color: white;
		text-decoration: none;
		padding: 0.5rem;
		font-size: 1.2rem;
		font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
			Geneva, Verdana, sans-serif;
	} */
	footer {
		/* background-color: #006699; */
		color: #fff;
	}
</style>