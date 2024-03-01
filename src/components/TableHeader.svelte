<script>
	export let headers = [];
</script>

<thead>
	<tr>
		{#each headers as header}
			<th>{header}</th>
		{/each}
	</tr>
</thead>

<style>
	th {
		border: 1px solid var(--border-color);
		padding: 1rem;
		background-color: var(--primary-color);
		color: white;
		font-size: 1.1em;
	}
</style>
