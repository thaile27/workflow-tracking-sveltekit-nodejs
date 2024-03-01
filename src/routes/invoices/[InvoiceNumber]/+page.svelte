<script>
	// async function sendInvoiceData() {
	//   try {
	// 	const response = await fetch('http://localhost:3000/generate-pdf', {
	// 	  method: 'POST',
	// 	  headers: {
	// 		'Content-Type': 'application/json',
	// 	  }
	// 	});

	// 	const result = await response.json();
	// 	if (result.success) {
	// 	  console.log('PDF generated');
	// 	} else {
	// 	  console.error('PDF generation failed:', result.message);
	// 	}
	//   } catch (error) {
	// 	console.error('Error sending invoice data:', error);
	//   }
	// }

	// sendInvoiceData(); // Call the function to send the data

	import { onMount } from 'svelte';
	import { page } from '$app/stores'; // To access URL parameters
	import { browser } from '$app/environment'; // Updated import path

	let invoiceData = [];
	let error = null;
	let editingInvoice = null;
	onMount(async () => {
		if (browser) {
			// Ensure this code runs only in the browser
			const { InvoiceNumber } = $page.params; // Accessing dynamic parameter
			const url = `http://localhost:3000/invoices/${InvoiceNumber}`;
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`Failed to fetch: ${response.statusText}`);
				}
				invoiceData = await response.json();
			} catch (e) {
				error = e.message;
				console.error('Failed to fetch:', e.message);
			}
		}
	});

	function toggleEdit(invoiceNumber) {
		editingInvoice = editingInvoice === invoiceNumber ? null : invoiceNumber;
	}

	async function saveInvoice(item) {
		const { InvoiceNumber } = $page.params;
		const response = await fetch(`http://localhost:3000/invoices/${InvoiceNumber}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(item)
		});

		if (!response.ok) {
			const message = `An error occurred: ${response.statusText}`;
			window.alert(message);
			return;
		}

		const result = await response.json();
		console.log(result.message);
		editingInvoice = null;
	}
</script>

<div class="flex-container flex flex-col min-h-screen bg-slate-900">
	<!-- Main section -->
	<main class="flex-1 w-full">
		<div class="w-full px-4 py-10 m:px-6 lg:px-8 lg:py-14 mx-auto">
			<div class="shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
				<div class="px-6 py-4 dark:border-gray-700 text-white flex justify-between">
					<div class="mr-10">
						<h2 class="text-xl font-semibold dark:text-gray-200">Invoices</h2>
						<p class="text-sm dark:text-gray-400">Invoice number:</p>
						<p class="text-sm dark:text-gray-400">
							Status: <span class="text-green-500" />
						</p>
					</div>
					<div class="flex justify-end">
						<div>
							<button
								type="button"
								class="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mr-5"
							>
								Company info
							</button>
						</div>
						<div>
							<button
								type="button"
								class="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
							>
								Project info
							</button>
						</div>
					</div>
				</div>
				<!-- Invoice Table -->
				<div class="mx-auto px-6 py-4 text-white">
					<table class="min-w-full divide-y divide-white">
						<thead>
							<tr>
								<th
									scope="col"
									class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
								>
									Date
								</th>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">
									Service types
								</th>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">
									Project name/ Location
								</th>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">
									Regular hours
								</th>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">
									OT hours
								</th>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">
									Regular rate
								</th>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">
									OT rate
								</th>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-white">
									Total
								</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-white-800">
							{#each invoiceData as item (item.InvoiceNumber)}
								<tr>
									<td
										class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0"
									>
										{#if editingInvoice === item.InvoiceNumber}
											<input
												class="input-class text-black"
												type="text"
												bind:value={item.DateCompleted}
											/>
										{:else}
											{item.DateCompleted}
										{/if}
									</td>
									<td class="whitespace-nowrap px-3 py-4 text-sm text-white">
										{#if editingInvoice === item.InvoiceNumber}
											<input
												class="input-class text-black"
												type="text"
												bind:value={item.ServicesRendered}
											/>
										{:else}
											{item.ServicesRendered}
										{/if}
									</td>
									<td class="whitespace-nowrap px-3 py-4 text-sm text-white">
										{#if editingInvoice === item.InvoiceNumber}
											<input
												class="input-class text-black"
												type="text"
												bind:value={item.ProjectNameLocation}
											/>
										{:else}
											{item.ProjectNameLocation}
										{/if}
									</td>
									<td class="whitespace-nowrap px-3 py-4 text-sm text-white">
										{#if editingInvoice === item.InvoiceNumber}
											<input
												class="input-class text-black"
												type="text"
												bind:value={item.HoursWorked}
											/>
										{:else}
											{item.HoursWorked}
										{/if}
									</td>
									<td class="whitespace-nowrap px-3 py-4 text-sm text-white">
										{#if editingInvoice === item.InvoiceNumber}
											<input
												class="input-class text-black"
												type="text"
												bind:value={item.OvertimeHours}
											/>
										{:else}
											{item.OvertimeHours}
										{/if}
									</td>
									<td class="whitespace-nowrap px-3 py-4 text-sm text-white">
										{#if editingInvoice === item.InvoiceNumber}
											<input
												class="input-class text-black"
												type="text"
												bind:value={item.RegularRate}
											/>
										{:else}
											{item.RegularRate}
										{/if}
									</td>
									<td class="whitespace-nowrap px-3 py-4 text-sm text-white">
										{#if editingInvoice === item.InvoiceNumber}
											<input
												class="input-class text-black"
												type="text"
												bind:value={item.OvertimeRate}
											/>
										{:else}
											{item.OvertimeRate}
										{/if}
									</td>
									<td class="whitespace-nowrap px-3 py-4 text-sm text-white">
										{#if editingInvoice === item.InvoiceNumber}
											<input
												class="input-class text-black"
												type="text"
												bind:value={item.Subtotal}
											/>
										{:else}
											${item.Subtotal}
										{/if}
									</td>
									<td class="text-sm font-medium sm:pr-0">
										{#if editingInvoice === item.InvoiceNumber}
											<button on:click={() => saveInvoice(item)}> Save </button>
										{:else}
											<button on:click={() => toggleEdit(item.InvoiceNumber)}> Edit </button>
										{/if}
									</td>
								</tr>
							{/each}
							<!-- Horizontal divider line between each row -->
							<tr /></tbody
						>
					</table>
				</div>
				<!-- Invoice Table ends -->

				<!--Width container-->
				<!-- <div class="mt-10 flex justify-around">
					<!-- Signature section -->
				<!-- 	<div class="signature-container">
						<canvas
							id="signatureCanvas"
							width="300"
							height="200"
							class="border border-neutral-100 bg-neutral-200"
						/>
						<div class="mt-5">
							<button
								id="clearButton"
								type="button"
								class="rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Clear Signature
							</button>
							<button
								id="uploadButton"
								type="button"
								class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Upload Signature
							</button>
						</div>
					</div> 
					<!-- End of signature section -->
				<!-- Subtotal section -->
				<div class="w-1/4">
					<dl class="space-y-6 p-4 text-white max-w-30">
						<div class="flex items-center justify-between">
							<dt class="text-sm">Subtotal</dt>
							<dd class="text-sm font-medium">$64.00</dd>
						</div>
						<div class="flex items-center justify-between">
							<dt class="text-sm">Taxes</dt>
							<dd class="text-sm font-medium">$5.52</dd>
						</div>
						<div class="flex items-center justify-between border-t border-gray-200 pt-6">
							<dt class="text-base font-medium">Total</dt>
							<dd class="text-base font-medium">$75.52</dd>
						</div>
					</dl>
				</div>
				<!-- End of subtotal section -->
			</div>
			<!-- Submit buttons -->
			<div class="mt-10 flex items-center justify-end gap-x-6">
				<button type="button" class="text-sm font-semibold leading-6 text-white"> Cancel </button>
				<button
					type="submit"
					class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Submit
				</button>
			</div>
		</div>
	</main>
</div>
