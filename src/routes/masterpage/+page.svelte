<script>
	import Modal from '../../components/Modal.svelte';
	import MasterTable from '../../components/MasterTable.svelte';
	import { dataTable } from './stores';
	let invoiceNumber = '';
	let retrievedInvoice = null;
	let showModal = false;
	let packageNumberFilter = '';
	let documentNameFilter = '';
	let isFiltered = false;
	let monthFilter = '';
	let searchQuery = '';
	let searchResults = [];
	let showSearchModal = false;
	let filteredData = [];
	let showFilterError = false;
	const assignedToMeUrl = 'http://localhost:3000/api/packages/assigned-to-me';
	const assignedUrl = 'http://localhost:3000/api/packages/assigned';
	const unassignedUrl = 'http://localhost:3000/api/packages/unassigned';
	const pendingApprovalUrl = 'http://localhost:3000/api/packages/pending-approval';

	function searchDocuments() {
		const query = searchQuery.toLowerCase();
		searchResults = $dataTable.filter((document) => {
			const nameMatch = document.DocNames.toLowerCase().includes(query);
			const numberMatch = document.DocumentNumber.toString().includes(searchQuery);
			return nameMatch || numberMatch;
		});
		
		showSearchModal = true;
	}
	function applyFilters() {
		if (!packageNumberFilter && !documentNameFilter && !monthFilter) {
			showFilterError = true; // Show the filter error message
			return; // Exit the function early
		} else {
			showFilterError = false; // Ensure the error message is hidden if filters are set
		}
		isFiltered = true;
		filteredData = $dataTable.filter((item) => {
			// Check if any filter is applied, default to false if no filter is set
			const packageNumberMatch = packageNumberFilter
				? item.PackageNumber.toString().includes(packageNumberFilter)
				: false;
			const documentNameMatch = documentNameFilter
				? item.DocNames.toLowerCase().includes(documentNameFilter.toLowerCase())
				: false;
			const monthMatch = monthFilter
				? new Date(item.DateReceived).toISOString().substr(0, 7) === monthFilter
				: false;

			// If no filters are set, return true to include all items
			const noFiltersApplied = !packageNumberFilter && !documentNameFilter && !monthFilter;

			return noFiltersApplied || packageNumberMatch || documentNameMatch || monthMatch;
		});
	}
	function retrieveInvoice() {
		// Assuming invoiceNumber holds the user's search query
		retrievedInvoice = $dataTable.find((inv) => inv.InvoiceNumber === invoiceNumber.trim());

		if (retrievedInvoice) {
			// Invoice found, prepare to show it in the modal
			showSearchModal = true; // Make sure to use showSearchModal consistently
		} else {
			// Invoice not found, provide feedback
			alert('Invoice not found. Please check the invoice number and try again.');
			showSearchModal = false; // Consistently use showSearchModal
		}
	}
	function closeModal() {
		showModal = false;
	}
</script>

<div class="container">
	<div>
		<div class="topbar">
			<input type="text" bind:value={searchQuery} placeholder="Enter Document Name or Number" />
			<button on:click={searchDocuments}>Search</button>

			<Modal
				show={showSearchModal}
				onClose={() => {
					showSearchModal = false;
				}}
			>
				{#if searchResults.length > 0}
					<ul>
						{#each searchResults as document}
							<li>
								Document Name: {document.DocNames}, Document Number: {document.DocumentNumber}
							</li>
						{/each}
					</ul>
				{:else}
					<p>No documents found matching the query.</p>
				{/if}
			</Modal>

			<input type="text" bind:value={invoiceNumber} placeholder="Enter Invoice Number" />
			<button on:click={retrieveInvoice}>Retrieve Invoice</button>

			<Modal
				show={showSearchModal}
				onClose={() => {
					showSearchModal = false;
				}}
			>
				{#if retrievedInvoice}
					<div>
						<p>
							Invoice Number: {retrievedInvoice.InvoiceNumber}, Client Name: {retrievedInvoice.ClientName}
						</p>
						<!-- Display more details as needed -->
					</div>
				{:else}
					<p>No invoice found matching the query.</p>
				{/if}
			</Modal>
		</div>
		<div class="filter">
			<input type="text" bind:value={packageNumberFilter} placeholder="Filter by Package Number" />
			<input type="text" bind:value={documentNameFilter} placeholder="Filter by Document Name" />
			<input type="month" bind:value={monthFilter} />
			<button on:click={applyFilters}>Filter</button>
		</div>
		{#if showFilterError}
			<p class="filter-error">Please enter some filter criteria before applying filters.</p>
		{/if}

		{#if isFiltered}
			<div class="cards-container">
				{#each filteredData as item}
					<div class="card">
						<p>Package Number: {item.PackageNumber}</p>
						<p>Client Name: {item.ClientName}</p>
						<p>Date Received: {item.DateReceived}</p>
						<p>Status: {item.State}</p>
						<p>Assigned To: {item.AssignedTo}</p>
						<p>Doc Names: {item.DocNames}</p>
						<p>External Comment: {item.ExternalComment}</p>
						<p>Priority: {item.Priority}</p>
						<p>Reviewer Notes: {item.ReviewerNotes}</p>
						<p>Time Spent: {item.TimeSpent}</p>
						<p>Code Status: {item.CodeStatus}</p>
						<p>Date Completed: {item.DateCompleted}</p>
						<p>Subtotal: {item.Subtotal}</p>
						<p>Rate: {item.Rate}</p>
						<p>Total: {item.Total}</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<MasterTable title="All assigned to me packages info" dataSourceUrl={assignedToMeUrl} />
	<MasterTable title="All assigned packages info" dataSourceUrl={assignedUrl} />
	<MasterTable title="All unassigned Packages info" dataSourceUrl={unassignedUrl} />

	<!-- <MasterTable title="All pending approval packages info" dataSourceUrl={pendingApprovalUrl} /> -->
</div>

<style>
	.topbar {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin: 1rem 1rem;
		justify-content: center;
	}
	input,
	button {
		padding: 0.8rem;
		font-size: 1rem;
		border: 1px solid #ccc;
		border-radius: 5px;
		margin: 0.2rem;
	}
	input{
		background-color: var(--textboxcolor);
	}
	button {
		cursor: pointer;
		background-color: var(--buttoncolor);
		color: white;
		border: none;
		transition: background-color 0.3s ease;
	}

	button:hover {
		background-color: rgb(14, 25, 36);
	}

	.filter-error {
		color: red;
	}
	.container {
		max-width: 1600px;
		margin: auto;
	}
	.cards-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		gap: 20px;
		padding: 20px;
	}
	.filter {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin: 1rem 1rem;
		justify-content: center;
	}
	.card {
		background-color: var(--containercolor); /* Card background color */
		border: 1px solid #dddddd; /* Card border */
		border-radius: 10px; /* Rounded corners for the card */
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
		padding: 20px; /* Padding inside the card */
		display: flex;
		flex-direction: column; /* Stack card content vertically */
		justify-content: space-between; /* Space between content and footer */
	}

	.card p {
		color: #666666; /* Paragraph/text color */
		margin: 5px 0; /* Spacing between paragraphs */
	}
</style>
