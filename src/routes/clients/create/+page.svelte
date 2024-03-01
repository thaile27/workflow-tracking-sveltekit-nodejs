<script>
	// importing the Document and Package clases
	import { convertDate } from '$lib/utils/dateFormatter';
	import { beforeUpdate, onMount } from 'svelte';
	import axios from 'axios';
	import { priorityLevels } from '$lib/data/priorityLevels.js';
	import { packageStates } from '$lib/data/packageStates.js';
	import { Select, Label, Button, Modal, Input, Datepicker } from 'flowbite-svelte';

	export let data;
	const { currentUser, serviceTypes } = data;
	let files = [];
	let isDragOver = false;
	let droppedFiles = [];

	// convert database data to service type select view
	let serviceTypesSelectView = serviceTypes.map((type) => {
		return {
			value: type.ServiceID,
			name: type.ServiceDescription
		};
	});

	function getServiceTypeDescription(typeNumber) {
		const found = serviceTypes.find((type) => {
			return type.ServiceID === typeNumber;
		});

		return found.ServiceDescription;
	}

	function handleServiceTypeChange() {
		if (serviceID === 1 || serviceID === 5) {
			showPackageNumberOnly = true;
			isHidden = true;
		} else {
			showPackageNumberOnly = false;
			isHidden = false;
		}
	}

	function handleFileSelect(event) {
		const files = Array.from(event.target.files);
		// Handle the files here, you can upload them via fetch, axios, etc.
		// Process selected files
		files.forEach((file) => {
			droppedFiles.push({
				name: file.name,
				size: file.size,
				type: file.type
			});
		});

		droppedFiles = droppedFiles;
		console.log(droppedFiles);
	}

	function handleFileDrop(event) {
		event.preventDefault();
		isDragOver = false;

		// Get dropped files
		const files = Array.from(event.dataTransfer.files);

		// Process dropped files
		files.forEach((file) => {
			droppedFiles.push({
				name: file.name,
				size: file.size,
				type: file.type
			});
		});

		droppedFiles = droppedFiles;
		console.log(droppedFiles);
	}

	// Function to handle file input change (when users select files using the file input)
	function handleFileInputChange(event) {
		const files = Array.from(event.target.files);

		// Process selected files
		files.forEach((file) => {
			droppedFiles.push({
				name: file.name,
				size: file.size,
				type: file.type
			});
		});

		droppedFiles = droppedFiles;
		console.log(droppedFiles);
	}

	// get the currentUser from the module context block
	const clientNumber = currentUser.ClientNumber;
	let packageNumber;
	let packageState = packageStates[0].name;
	let dueDate;
	let serviceID; // service type
	let priorityLevel; // pririty level
	let externalComment; // capture comments from comment box
	let dateSubmitted = convertDate(new Date());
	let isHidden = true;
	let showPackageNumberOnly = false;
	let defaultModal = false;
	let modalTitle = '';
	let modalContent = '';

	let staffId;
	let staffAssigned;
	let documentName;
	let reviewerNote;
	let dateCompleted;
	let internalComment;

	const handleSubmit = () => {
		// console.log('clientNumber', clientNumber);
		// console.log('packageNumber', packageNumber);
		// console.log('due date', dueDate);
		// console.log('service ID', serviceID);
		// console.log('priority', priorityLevel);
		// console.log('external comment', externalComment);
		// console.log('date submitted', dateSubmitted);

		// TODO: Validation goes here
		if (dueDate < dateSubmitted) {
			alert('due date cannot be today or in the past, form was not submitted');
			return;
		}

		// Prepare data for POST request
		const packageData = {
			clientNumber,
			packageNumber,
			packageState,
			dueDate,
			serviceID, // service type ID
			priorityLevel,
			externalComment
		};

		// Make POST request
		axios
			.post(`http://localhost:3000/clients/packages/create`, {
				packageData
			})
			.then(function (response) {
				const { success, message, result } = response.data;
				console.log(success, message, result);
				defaultModal = true;
				modalTitle = message;
				modalContent = `Package number ${packageNumber} was successfully placed at ${dateSubmitted}`;
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	onMount(() => {});
</script>

<!--Width container-->

<div class="max-w-[80rem] mx-10 xl:mx-auto">
	<div class="text-center px-4 sm:px-6 lg:px-8">
		<h1 class="block text-2xl font-bold text-white sm:text-4xl">User Input</h1>

		<!-- <div class="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
			<a
				class="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-white text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
				href="./../"
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
					<path d="m15 18-6-6 6-6" />
				</svg>
				Back to home
			</a>
		</div> -->
	</div>

	<div class="flex justify-end">
		<p class="font-bold text-white">
			{#if currentUser.FirstName.length > 0}
				Welcome, {currentUser.FirstName}
				{currentUser.LastName}
			{:else}
				Welcome, user
			{/if}
		</p>
	</div>

	<div class="lg:mx-20">
		<div class="mt-10">
			<form on:submit|preventDefault={handleSubmit}>
				<div class="space-y-12">
					<div class="text-white">
						<h2 class="text-base font-semibold leading-7">Required Information</h2>
						<ul class="mt-1 text-sm text-gray-300 leading-6">
							<li>Some of these fields might be unavailable depending on the type of uers.</li>
							<li>If all the fields are empty, this is a new file submission.</li>
							<li>If some fields are filled, this is an update to an existing file.</li>
						</ul>
					</div>
					<div class="grid grid-cols-2 gap-x-8 gap-y-5 text-white">
						<div>
							<Label for="firstName" class="mb-2 text-white">First Name</Label>
							<Input
								type="text"
								id="firstName"
								bind:value={currentUser.FirstName}
								required
								readonly
							/>
						</div>

						<div>
							<Label for="lastName" class="mb-2 text-white">Last Name</Label>
							<Input
								type="text"
								id="lastName"
								bind:value={currentUser.LastName}
								required
								readonly
							/>
						</div>

						<div>
							<Label for="email" class="mb-2 text-white">Email</Label>
							<Input type="email" id="email" bind:value={currentUser.Email} required readonly />
						</div>

						<div>
							<Label for="phone" class="mb-2 text-white">Phone Number</Label>
							<Input type="tel" id="phone" bind:value={currentUser.PhoneNumber} required readonly />
						</div>

						<div class="col-span-2">
							<Label>
								<p class="text-white">Service Type</p>
								<Select
									class="mt-2"
									items={serviceTypesSelectView}
									bind:value={serviceID}
									on:change={handleServiceTypeChange}
								/>
							</Label>
						</div>

						{#if showPackageNumberOnly}
							<div class="col-span-2">
								<Label for="packageNumber" class="mb-2 text-white">Package Number</Label>
								<Input
									type="number"
									id="packageNumber"
									placeholder="Enter a package number"
									bind:value={packageNumber}
									required
								/>
							</div>
						{/if}

						{#if !isHidden}
							<div class="col-span-2">
								<Label for="packageNumber" class="mb-2 text-white">Package Number</Label>
								<Input
									type="number"
									id="packageNumber"
									placeholder="Enter a package number"
									bind:value={packageNumber}
									required
								/>
							</div>

							<div>
								<Label for="dueDate" class="mb-2 text-white">Due Date</Label>
								<Input type="date" id="dueDate" bind:value={dueDate} required />
							</div>

							<div>
								<Label>
									<p class="text-white">Priority Level</p>
									<Select class="mt-2" items={priorityLevels} bind:value={priorityLevel} />
								</Label>
							</div>
						{/if}
					</div>
					{#if !isHidden}
						<!-- Document upload starts-->
						<div class="flex flex-wrap items-center justify-center w-full">
							<h3 class="text-base font-semibold text-white w-100 mb-3">Documents</h3>
							<label
								for="dropzone-file"
								class="flex flex-col items-center justify-center w-full min-h-64 border-3 border-solid border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 {isDragOver
									? 'drag-over'
									: 'drop-box'}"
								on:drop|preventDefault={handleFileDrop}
								on:dragover|preventDefault={() => {
									isDragOver = true;
								}}
								on:dragenter|preventDefault={() => {
									isDragOver = true;
								}}
								on:dragleave|preventDefault={() => {
									isDragOver = false;
								}}
							>
								<div class="flex flex-col items-center justify-center pt-5 pb-6">
									{#if droppedFiles.length === 0}
										<svg
											class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 20 16"
										>
											<path
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
											/>
										</svg>
										<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
											<span class="font-semibold text-blue-500">Click to upload</span> or drag and drop
										</p>
										<p class="text-xs text-gray-500 dark:text-gray-400">
											SVG, PNG, JPG or GIF (MAX. 800x400px)
										</p>
									{:else}
										<ul class="text-gray-500 text-left">
											{#each droppedFiles as file, index}
												<li>{index + 1}: {file.name} ({file.size} bytes) - {file.type}</li>
											{/each}
										</ul>
									{/if}
								</div>
								<input
									multiple
									id="dropzone-file"
									type="file"
									class="sr-only"
									on:change={handleFileSelect}
								/>
							</label>
						</div>

						<!-- Document upload ends-->

						<!-- Comment sections starts -->
						<div class="col-span-full border-b border-gray-900/10">
							<label for="comments" class="text-base font-semibold leading-7 text-white"
								>Comments</label
							>
							<textarea
								id="comments"
								class="py-3 px-4 mt-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
								rows="7"
								placeholder="Please leave your comments here."
								aria-describedby="hs-textarea-helper-text"
								bind:value={externalComment}
							/>
							<p class="text-xs text-gray-300 mt-2" id="hs-textarea-helper-text">
								We'll get back to you soon.
							</p>
						</div>
						<!-- Comment sections ends -->
					{/if}
				</div>

				<!-- Modal -->

				<!-- Button section starts -->
				<div class="mt-10 flex items-center justify-end gap-x-6">
					<Button color="purple">Cancel</Button>
					<Button color="purple" type={'submit'}>Submit</Button>
				</div>
				<!-- Button section ends -->
			</form>
		</div>
	</div>
</div>

<Modal open={defaultModal} title={modalTitle} classDialog={modalContent} />

<style>
	.drag-over {
		border-color: #4caf50; /* Change border color when dragging over */
	}
	.drop-box {
		min-height: 256px; /* Set a minimum height for the drop box */
		height: auto; /* Allow the height to grow dynamically */
		overflow-y: auto; /* Add vertical scrollbar when content exceeds height */
	}
</style>
