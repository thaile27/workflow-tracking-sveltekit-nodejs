<script>
	import { onMount } from 'svelte';
	export let dataSourceUrl;
	import TableHeader from './TableHeader.svelte';
	import { dataTable } from '../routes/masterpage/stores.js';

	export let filteredData;
	export let title = '';
	let data = [];
	let store = [];
	let headers = [
		'Package Number',
		'Client Name',
		'Date Received',
		'State',
		'Assigned',
		'Doc Names',
		'Comment',
		'Priority',
		'Reviewer Notes',
		'Time Spent',
		'Code',
		'Date Completed',
		'Subtotal',
		'Rate',
		'Total'
	];

	async function fetchData() {
		const response = await fetch(dataSourceUrl);
		data = await response.json();
	}
	function formatDate(dateString) {
		if (!dateString) return ''; // Handle null or undefined dates
		const date = new Date(dateString);
		return date.toLocaleDateString('en-CA'); // 'en-CA' locale gives the YYYY-MM-DD format
	}
	onMount(async () => {
		try {
			const response = await fetch('http://localhost:3000/masterpage');
			if (response.ok) {
				store = await response.json();
				dataTable.set(store);
			}
		} catch (error) {
			console.error('Network error:', error);
		}
		fetchData();
	});

	onMount(() => {});
</script>

<h2 class="table-title">{title}</h2>
<table>
	<TableHeader {headers} />
	<tbody>
		{#each data as item}
			<tr>
				<td>{item.PackageNumber}</td>
				<td>{item.ClientName}</td>
				<td>{formatDate(item.DateReceived)}</td>
				<td>{item.State}</td>
				<td>{item.AssignedTo}</td>
				<td>{item.DocNames}</td>
				<td>{item.ExternalComment}</td>
				<td>{item.Priority}</td>
				<td>{item.ReviewerNotes}</td>
				<td>{item.TimeSpent}</td>
				<td>{item.CodeStatus}</td>
				<td>{formatDate(item.DateCompleted)}</td>
				<td>{item.Subtotal}</td>
				<td>{item.Rate}</td>
				<td>{item.Total}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		margin-left: auto;
		margin-right: auto;
		border-collapse: collapse;
		font-family: var(--font-family);
		color: var(--primary-color);
		width: 100%;
		overflow-x: auto; /* Enables horizontal scrolling */
		display: block;
	}

	.table-title {
		font-size: 1.2em;
		margin-bottom: 0.5rem;
		color: white;
		text-align: center;
	}

	td {
		border: 1px solid var(--border-color);
		padding: 1rem;
		text-align: left;
	}

	tr:nth-child(odd) {
		background-color: var(--secondary-color);
		color: white;
	}
	tr:nth-child(even) {
		background-color: var(--tertiary-color);
	}
	
</style>
