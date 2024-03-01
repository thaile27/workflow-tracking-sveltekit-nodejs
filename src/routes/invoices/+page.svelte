<script>
	import { onMount } from 'svelte';
	let invoices = [];

	async function fetchInvoices() {
		const response = await fetch('http://localhost:3000/api/invoices');
		invoices = await response.json();
	}

	onMount(() => {
		fetchInvoices();
	});
</script>

<div class="page">
	<div class="flex-1 w-full">
		<!-- Top of the page banner -->
		<div class="text-center px-4 sm:px-6 lg:px-8">
			<h1 class="block text-2xl font-bold text-white sm:text-4xl">Invoice landing page</h1>
		</div>

		<div class="min-w-[20rem] lg:max-w-[70rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
			<!-- Card -->
			<div class="flex flex-col">
				<div class="-m-1.5 overflow-x-auto">
					<div class="p-1.5 min-w-full inline-block align-middle">
						<div
							class="container border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:border-gray-700"
						>
							<!-- Header -->
							<div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-white">
								<!-- 	<div class="flex justify-between align-middle">
									<div>
										<h2 class="text-xl font-semibold dark:text-gray-200 w-full">Invoices</h2>
										<p class="text-sm dark:text-gray-400 w-full">
											Create invoices, edit, download and more.
										</p>
									</div>
									<!-- invoice status filter here -->
								<!-- <div class="inline-flex rounded-md shadow-sm h-10">
										<!-- TODO: add the onclick event listeners for the buttons -->
								<!--		<button
											aria-current="page"
											class="px-4 py-2 text-sm text-white font-semibold bg-black border border-gray-200 rounded-s-lg hover:text-green-700 hover:bg-gray-100 focus:text-green-700 focus:bg-gray-100 focus:z-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
										>
											Completed
										</button>
										<button
											class="px-4 py-2 text-sm text-white font-semibold bg-black border-t border-b border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:text-green-700 focus:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
										>
											Pending
										</button>
										<button
											class="px-4 py-2 text-sm text-white font-semibold bg-black rounded-e-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:text-green-700 focus:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
										>
											Draft
										</button>
									</div>
								</div> -->
							</div>

							<!-- card header ends -->

							<!-- Card Body starts -->
							<div class="flex">
								<div class="m-10 w-full text-black">
									<table class="min-w-full divide-y divide-white-800">
										<thead>
											<tr>
												<th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0">
													Invoice Number
												</th>
												<th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0">
													Date
												</th>
												<th class="px-3 py-3.5 text-left text-sm font-semibold">
													Number of Packages
												</th>
												<th class="px-3 py-3.5 text-left text-sm font-semibold">
													Number of Documents
												</th>
												<th class="px-3 py-3.5 text-left text-sm font-semibold"> Status </th>
												<th class="relative py-3.5 pl-3 pr-4 text-sm sm:pr-0">
													<span>Action</span>
												</th>
											</tr>
										</thead>
										<tbody>
											{#each invoices as invoice}
												<tr>
													<td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">
														Invoice #{invoice.InvoiceNumber}
													</td>
													<td class="whitespace-nowrap px-3 py-4 text-sm">
														{invoice.InvoiceDate}
													</td>
													<td class="whitespace-nowrap px-3 py-4 text-sm">
														{invoice.NumberOfPackages}
													</td>
													<td class="whitespace-nowrap px-3 py-4 text-sm">
														{invoice.NumberOfDocuments}
													</td>
													<td class="whitespace-nowrap px-3 py-4 text-sm">
														<span
															class="text-{invoice.Status === 'complete'
																? 'green'
																: invoice.Status === 'pending'
																? 'yellow'
																: 'black'}-600"
														>
															{invoice.Status}
														</span>
													</td>
													<td class="text-sm font-medium sm:pr-0 px-3">
														<a
															href="invoices/{invoice.InvoiceNumber}"
															class="text-indigo-400 hover:text-indigo-300 md:pr-2">View</a
														>
													</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							</div>

							<!-- card body ends -->
						</div>
					</div>
				</div>
			</div>
			<!-- Button section starts -->
			<div class="buttons flex justify-center gap-5">
				<div class="mt-5">
					<a
						class="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
						href="invoice-create-page.html"
					>
						<svg
							class="flex-shrink-0 w-4 h-4"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M5 12h14" />
							<path d="M12 5v14" />
						</svg>
						Settings
					</a>
				</div>
				<div class="mt-5">
					<a
						class="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
						href="invoices/invoice-create-page.html"
					>
						<svg
							class="flex-shrink-0 w-4 h-4"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M5 12h14" />
							<path d="M12 5v14" />
						</svg>
						Create a new invoice
					</a>
				</div>
			</div>

			<!-- Button section ends -->
		</div>
	</div>
</div>

<style>
	.page {
		background-color: var(--backgroundcolor);
	}
	.buttons a {
		background-color: var(--buttoncolor);
	}
	.container {
		background-color: var(--containercolor);
	}
</style>
