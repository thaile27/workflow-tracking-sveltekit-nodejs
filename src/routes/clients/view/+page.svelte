<script>
	import { Input, Label, Button, Modal } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	let clientNumber;
	let defaultModal = false;
	let modalTitle;
	let modalContent;

	const handleClick = () => {
		if (clientNumber) {
			goto(`/clients/view/${clientNumber}`);
		} else {
			defaultModal = true;
			modalTitle = 'Action Required';
			modalContent = 'Please enter the client number ';
		}
	};
</script>

<h2 class="text-3xl text-white text-center font-bold p-3">Order History</h2>

<div class="px-2">
	<Label for="client-number" class="mb-2 text-white font-bold">Client Number</Label>
	<Input
		type="text"
		id="client-number"
		placeholder="Enter the client number"
		bind:value={clientNumber}
		required
	/>
</div>
<div class="text-center">
	<Button class="mt-3" color="light" on:click={handleClick}
		>Go to order summary page for client {clientNumber === undefined ? ' ' : clientNumber}</Button
	>
</div>

<Modal title={modalTitle} bind:open={defaultModal} autoclose>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		{modalContent}
	</p>
	<svelte:fragment slot="footer">
		<Button color="purple" on:click={() => alert('Thank you"')}>I accept</Button>
	</svelte:fragment>
</Modal>
