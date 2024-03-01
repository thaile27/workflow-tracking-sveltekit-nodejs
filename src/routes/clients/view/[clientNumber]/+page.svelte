<script>
	import { Button, Modal } from 'flowbite-svelte';
	import { formatStringToDateTime, formatStringToDateOnly } from '$lib/utils/dateFormatter.js';
	export let data;
	let clickOutsideModal = false;
	let modalTitle = ' ';
	let modalContent = ' ';
	let packageNumberToSearch;
	let foundPackage;

	let { currentUser, allPackages } = data.props;

	let packagesToRender = allPackages;
	function handleSearchInput() {
		console.log(packageNumberToSearch);
		if (packageNumberToSearch) {
			foundPackage = allPackages.filter(
				(item) => item.PackageNumber === parseInt(packageNumberToSearch)
			);
			packagesToRender = foundPackage;
		} else {
			packagesToRender = allPackages;
		}
	}
</script>

<h2 class="text-3xl text-white text-center font-bold p-3">Order History</h2>

<div class="flex justify-end px-5">
	<p class="font-bold text-white">
		Welcome, {currentUser.FirstName}
		{currentUser.LastName}
	</p>
</div>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg p-3">
	<!-- SEARCH BAR starts -->
	<div class="pb-4 dark:bg-gray-900">
		<label for="table-search" class="sr-only">Search</label>
		<div class="relative mt-1">
			<div
				class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
			>
				<svg
					class="w-4 h-4 text-white dark:text-gray-400"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 20"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
					/>
				</svg>
			</div>
			<input
				type="text"
				id="table-search"
				class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="Search by Package Number"
				bind:value={packageNumberToSearch}
				on:input={handleSearchInput}
			/>
		</div>
	</div>
	<!-- SEARCH BAR ends -->

	<!-- DATA TABLE STARTS -->
	<table class="w-full text-sm text-left rtl:text-right text-white dark:text-gray-400">
		<thead class="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
			<tr>
				<th scope="col" class="px-6 py-3"> Package Number </th>
				<th scope="col" class="px-6 py-3"> Date Received </th>
				<th scope="col" class="px-6 py-3"> Due Date </th>
				<th scope="col" class="px-6 py-3"> Request </th>
				<th scope="col" class="px-6 py-3"> Priority Level </th>
				<th scope="col" class="px-6 py-3"> Comment </th>
				<th scope="col" class="px-6 py-3"> Action </th>
			</tr>
		</thead>
		<tbody>
			{#each packagesToRender as item, index}
				<tr class="bg-gray-600 dark:bg-gray-800 dark:border-gray-700">
					<th scope="row" class="px-6 py-4 font-bold text-white whitespace-nowrap dark:text-white">
						{item.PackageNumber}
					</th>
					<td class="px-6 py-4 font-bold"> {formatStringToDateTime(item.DateReceived)} </td>
					<td class="px-6 py-4 font-bold"> {formatStringToDateOnly(item.DueDate)} </td>
					<td class="px-6 py-4 font-bold"> {item.RequestType} </td>
					<td class="px-6 py-4 font-bold"> {item.PriorityLevel} </td>
					<td class="px-6 py-4 font-bold">
						<button
							class="font-medium text-green-300 dark:text-blue-500 hover:text-green-400"
							on:click={() => {
								modalTitle = 'External Comment';
								modalContent = item.ExternalComment;
								clickOutsideModal = true;
							}}>View</button
						>
					</td>
					<td class="px-6 py-4 font-bold">
						<a
							href="/clients/view/{currentUser.ClientNumber}/{item.PackageNumber}"
							class="font-medium text-green-300 dark:text-blue-500 hover:text-green-400">Edit</a
						>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<Modal title={modalTitle} bind:open={clickOutsideModal} autoclose outsideclose>
		<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
			{modalContent}
		</p>
		<svelte:fragment slot="footer">
			<Button
				on:click={() => {
					alert('Thanks for confirming');
					clickOutsideModal = false;
				}}>I accept</Button
			>
		</svelte:fragment>
	</Modal>

	<!-- DATA TABLE ENDS -->
</div>
