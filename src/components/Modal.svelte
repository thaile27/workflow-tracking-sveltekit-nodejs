<script>
    export let show = false;
    export let onClose;
</script>

{#if show}
    <div class="modal-backdrop" on:click={onClose}>
        <div class="modal-content" on:click|stopPropagation>
            <button class="close-button" on:click={onClose}>×</button>
            <slot></slot> <!-- Use slot for custom content -->
        </div>
    </div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.modal-content {
		background: white;
		padding: 20px;
		border-radius: 5px;
		position: relative;
	}
	.close-button {
		position: absolute;
		top: 10px;
		right: 10px;
		border: none;
		background: none;
		font-size: 1.5rem;
	}
</style>
