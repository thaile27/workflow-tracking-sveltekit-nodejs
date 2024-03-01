<script>
	import NavBar from '$components/NavBar.svelte';
	let activeTab = 'current';
	import { faker } from '@faker-js/faker';
	import { onMount } from 'svelte';
	let packages = ['package1', 'package2', 'package3', 'package4', 'package5', 'package6', 'package7', 'package8', 'package9', 'package10', 'package11', 'package12', 'package13', 'package14', 'package15', 'package16', 'package17', 'package18', 'package19', 'package20'];
	let current_orders = [];
	let pending_orders = [];
	let past_orders = [];
	let currentPage = 1;
	const recordsPerPage = 5;
	let totalPages = Math.ceil(packages.length / recordsPerPage);
	$: totalPages = Math.ceil(current_orders.length / recordsPerPage);


	onMount(() => {
		current_orders = packages.map((packages, index) => {
				return {
					package_id: faker.number.int({min: 1234, max: 3000}),
					package_name: faker.lorem.words(2),
					priority_level: faker.number.int({min: 1, max: 5}),
					date_submitted: formatDate(faker.date.between({ from: '2021-01-01', to: '2023-12-31' })),
					date_due: formatDate(faker.date.future())
				}
			},
			pending_orders = packages.map((packages, index) => {
					return {
						package_id: faker.number.int({min: 1234, max: 3000}),
						package_name: faker.lorem.words(2),
						priority_level: faker.number.int({min: 1, max: 5}),
						date_submitted: formatDate(faker.date.between({ from: '2021-01-01', to: '2023-12-31' })),
						date_due: formatDate(faker.date.future())
					}
				}
			),
			past_orders = packages.map((packages, index) => {
				return {
					package_id: faker.number.int({min: 1234, max: 3000}),
					package_name: faker.lorem.words(2),
					priority_level: faker.number.int({min: 1, max: 5}),
					date_submitted: formatDate(faker.date.between({ from: '2021-01-01', to: '2023-12-31' })),
					date_due: formatDate(faker.date.future())
				}
			})
		);

		function formatDate(date) {
			return [
				date.getDate().toString().padStart(2, '0'),
				(date.getMonth() + 1).toString().padStart(2, '0'),
				date.getFullYear()
			].join('/');
		}
	})
	function showContent(tab) {
		activeTab = tab;
	}
</script>

<header>
	<NavBar
		pageH1="Review Management Dashboard"
		title="TinaKing"
		links={[
			{ path: '/landing/client-landing', name:'Client', class_style: ''},
			{ path: '/landing/admin-landing', name:'Admin', class_style: ''},
			{ path: '/landing/manager-landing', name:'Manager', class_style: ''},
			{ path: '/landing/reviewer-landing', name:'Reviewer', class_style: ''},
			{ path: '/', name:'Logout', class_style: 'text-danger'},
		]}
	/>

</header>
<main>
	<div class="page-container">
		<div class="container">
			<div class="inner-container row">
				<ul class="nav nav-underline">
					<li class="nav-item">
						<a class="nav-link" href="#" on:click|preventDefault={() => showContent('current')}>Current Requests</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#" on:click|preventDefault={() => showContent('pending')}>New Requests</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#" on:click|preventDefault={() => showContent('past')}>Pending Requests</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#" on:click|preventDefault={() => showContent('new')}>Completed Requests</a>
					</li>
				</ul>
				<!-- Content Sections -->
				{#if activeTab === 'current'}
					<table class="data-table">
						<thead>
						<tr>
							<th>Package No.</th>
							<th>Package Name</th>
							<th>Priority Level</th>
							<th>Date Submitted</th>
							<th>Date Due</th>
						</tr>
						</thead>
						<tbody>
						{#each current_orders.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage) as item}
							<tr>
								<th>{item.package_id}</th>
								<td>{item.package_name}</td>
								<td>{item.priority_level}</td>
								<td>{item.date_submitted}</td>
								<td>{item.date_due}</td>
							</tr>
						{/each}
						</tbody>
					</table>
					<nav>
						<ul class="pagination">
							<li><a href="#" on:click|preventDefault={() => currentPage = Math.max(currentPage - 1, 1)}>&laquo;</a></li>
							{#each Array(totalPages) as _, i}
								<li>
									<a href="#" on:click|preventDefault={() => currentPage = i + 1}>
										{i + 1}
									</a>
								</li>

							{/each}
							<li><a href="#" on:click|preventDefault={() => currentPage = Math.min(currentPage + 1, totalPages)}>&raquo;</a></li>
						</ul>
					</nav>
				{/if}

				{#if activeTab === 'pending'}
					<table class="data-table">
						<thead>
						<tr>
							<th>Package No.</th>
							<th>Package Name</th>
							<th>Priority Level</th>
							<th>Date Submitted</th>
							<th>Date Due</th>
						</tr>
						</thead>
						<tbody>
						{#each pending_orders.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage) as item}
							<tr>
								<th>{item.package_id}</th>
								<td>{item.package_name}</td>
								<td>{item.priority_level}</td>
								<td>{item.date_submitted}</td>
								<td>{item.date_due}</td>
							</tr>
						{/each}
						</tbody>
					</table>
					<nav>
						<ul class="pagination">
							<li><a href="#" on:click|preventDefault={() => currentPage = Math.max(currentPage - 1, 1)}>&laquo;</a></li>
							{#each Array(totalPages) as _, i}
								<li>
									<a href="#" on:click|preventDefault={() => currentPage = i + 1}>
										{i + 1}
									</a>
								</li>

							{/each}
							<li><a href="#" on:click|preventDefault={() => currentPage = Math.min(currentPage + 1, totalPages)}>&raquo;</a></li>
						</ul>
					</nav>
				{/if}

				{#if activeTab === 'past'}
					<table class="data-table">
						<thead>
						<tr>
							<th>Package No.</th>
							<th>Package Name</th>
							<th>Priority Level</th>
							<th>Date Submitted</th>
							<th>Date Due</th>
						</tr>
						</thead>
						<tbody>
						{#each past_orders.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage) as item}
							<tr>
								<th>{item.package_id}</th>
								<td>{item.package_name}</td>
								<td>{item.priority_level}</td>
								<td>{item.date_submitted}</td>
								<td>{item.date_due}</td>
							</tr>
						{/each}
						</tbody>
					</table>
					<nav>
						<ul class="pagination">
							<li><a href="#" on:click|preventDefault={() => currentPage = Math.max(currentPage - 1, 1)}>&laquo;</a></li>
							{#each Array(totalPages) as _, i}
								<li>
									<a href="#" on:click|preventDefault={() => currentPage = i + 1}>
										{i + 1}
									</a>
								</li>

							{/each}
							<li><a href="#" on:click|preventDefault={() => currentPage = Math.min(currentPage + 1, totalPages)}>&raquo;</a></li>
						</ul>
					</nav>
				{/if}

				{#if activeTab === 'new'}
					<form></form>
				{/if}
			</div>
		</div>
	</div>
</main>

<style>
    header {
        position: relative;
    }

    .container {
        padding: 5rem 0;
    }

    .page-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 90vh;
        margin: 0;
        padding: 0;
        background-color: #ebf3f7;
    }

    .inner-container {
        padding: 0 0 2rem 0;
        background-color: #2C3034;
        text-align: center;
        border-radius: 2rem;
    }
    .nav .nav-link {
        color: #fff;
    }
    .inner-container > ul {
        display: flex;
        justify-content: space-around;
        padding: 1rem;
        background-color: #006699;
        border-radius: 20px 20px 0 0;
    }
    .inner-container > ul > li {
        font-size: 20px;
    }
    /* -- Table Styles -- */
    /* Basic Table Styling */
    .data-table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
        color: #fff; /* Text color */
        border-radius: 10px;
    }

    .data-table th, .data-table td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    /* -- Pagination Styles -- */
    .pagination {
        display: flex;
        list-style: none;
        padding: 0;
        justify-content: center;
        color: #fff;
        margin-top: 2rem;
        margin-bottom: 0;
    }

    .pagination li {
        margin: 0 5px;
    }

    .pagination a {
        color: #fff;
        padding: 5px 10px;
        text-decoration: none;
        background-color: #006699;
        border-radius: 5px;
    }

    .pagination a:hover {
        background-color: #0099cc;
    }

    /* Header Styling */
    .data-table thead th {
        background-color: #2C3034; /* Colors for odd rows */
    }

    /* Striped Rows */
    .data-table tbody tr:nth-child(odd) {
        background-color: #2C3034; /* Colors for odd rows */
    }

    .data-table tbody tr:nth-child(even) {
        background-color: #212529; /* Colors for even rows */
    }

    /* Fixed Column Widths (optional, adjust as needed) */
    .data-table th:nth-child(1), .data-table td:nth-child(1) {
        width: 20%;
    }

    .data-table th:nth-child(2), .data-table td:nth-child(2) {
        width: 20%;
    }

    .data-table th:nth-child(3), .data-table td:nth-child(3) {
        width: 10%;
    }

    .data-table th:nth-child(4), .data-table td:nth-child(4) {
        width: 25%;
    }
    .data-table th:nth-child(5), .data-table td:nth-child(5) {
        width: 25%;
    }
</style>