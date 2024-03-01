<script>
	import InputText from '../../../components/InputText.svelte';
	import InputDate from '../../../components/InputDate.svelte';
	import InputSelect from '../../../components/InputSelect.svelte';
	import { convertDate } from '$lib/utils/dateFormatter';
	import { onMount } from 'svelte';
	import { Select, Label, Button } from 'flowbite-svelte';
	import { formatStringToDateOnly, formatStringToDateTime } from '$lib/utils/dateFormatter';
	import { serviceTypes } from '$lib/data/serviceTypes.js';
	import { priorityLevels } from '$lib/data/priorityLevels.js';

	export let data;
	const { currentUser, currentPackage } = data.props;

	// Variables
	const clientNumber = currentUser.ClientNumber;
	let packageNumber;
	let dueDate;
	let serviceType; // service type
	let priorityLevel; // priority level
	let externalComment; // capture comments from comment box
	let dateSubmitted = convertDate(new Date());

	let selected;
	let files = [];
	let isDragOver = false;
	let droppedFiles = [];

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

	const handleSubmit = async () => {
		// TODO: Validation goes here

		// Prepare data for POST request
		const packageData = {};

		// Make POST request
	};

	onMount(() => {
		console.log(currentPackage);
		console.log(currentUser);
	});
</script>

<h2 class="text-3xl text-white text-center font-bold p-3">
	This is the user document edit landing page for each page
</h2>

<div class="max-w-[80rem] mx-10 xl:mx-auto">
	<div class="flex justify-end px-5">
		<p class="font-bold text-white">
			Welcome, {currentUser.FirstName}
			{currentUser.LastName}
		</p>
	</div>

	<div class="lg:mx-20">
		<div class="mt-10">
			<form on:submit|preventDefault={handleSubmit}>
				<div class="space-y-12">
					<div class="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-3 text-white">
						<div>
							<h2 class="text-base font-semibold leading-7">Required Information</h2>
							<ul class="mt-1 text-sm text-gray-300 leading-6">
								<li>Some of these fields might be unavailable depending on the type of uers.</li>
								<li>If all the fields are empty, this is a new file submission.</li>
								<li>If some fields are filled, this is an update to an existing file.</li>
							</ul>
						</div>

						<div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
							<InputText
								name={'packageNumber'}
								label={'Package Number'}
								data={currentPackage.PackageNumber}
								isRequired
								isReadonly
								on:input={(e) => {
									packageNumber = e.detail;
								}}
							/>

							<InputText
								name={'dueDate'}
								label="Due Date"
								data={formatStringToDateOnly(currentPackage.DueDate)}
								isRequired
								isReadonly
							/>

							<InputText
								name="serviceType"
								label="Service Type"
								isRequired
								isReadonly
								data={currentPackage.ServiceType}
							/>
						</div>
					</div>

					<Label>
						<p class="text-white">Select a new Priority</p>
						<Select
							class="mt-2"
							items={priorityLevels}
							bind:value={currentPackage.priorityLevels}
						/>
					</Label>

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
				</div>

				<!-- Button section starts -->
				<div class="mt-10 flex items-center justify-end gap-x-6">
					<Button color="purple">Cancel</Button>
					<Button color="purple">Submit</Button>
				</div>
				<!-- Button section ends -->
			</form>
		</div>
	</div>
</div>

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
