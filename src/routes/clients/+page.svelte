<script>
	import Link from './components/Link.svelte';
</script>

<div class="min-h-screen">
	<h2 class="text-3xl text-white text-center font-bold p-3">This is the client landing page</h2>
	<div class="text-center">
		<Link label="Create Request" path="./clients/create" />
		<Link label="Order History" path="./clients/view" />
		<Link label="Account Management" path="./clients/edit" />
	</div>
</div>
