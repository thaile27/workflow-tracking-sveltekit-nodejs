<script>
    export let data = [];
    export let columns = 3; // Default number of columns

    // Calculate grid layout
    $: gridTemplateColumns = `repeat(${columns}, 1fr)`;
</script>

<div class="grid-container" style="grid-template-columns: {gridTemplateColumns};">
    {#each data as item}
        <div class="grid-item">
			<div class="item-title">{item.package_number}</div>
			<div class="item-detail"><strong>Client:</strong> {item.client_name}</div>
			<div class="item-detail"><strong>Date Received:</strong> {item.date_received}</div>
			<div class="item-detail"><strong>Status:</strong> {item.state}</div>
			<div class="item-detail"><strong>Assigned To:</strong> {item.assigned_to}</div>
			<!-- Add more item fields or a button for detailed view as needed -->
		</div>
	{/each}
</div>

<style>
    .grid-container {
        display: grid;
        grid-gap: 20px;
        /* Remove the grid-template-columns rule from here */
    }
    .grid-item {
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 10px;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .item-title {
        font-size: 1.2em;
        margin-bottom: 10px;
    }
    .item-detail {
        margin-bottom: 5px;
    }
</style>
