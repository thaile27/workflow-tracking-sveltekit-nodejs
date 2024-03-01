<script>
	let activeTab = 'Staff'; // This will help to toggle between Staff and Client
	let username = '';
	let password = '';
	let loginMessage = '';

	async function signIn(event) {
		event.preventDefault();

		try {
			const response = await fetch('http://localhost:3000/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, password })
			});

			const result = await response.json();

			if (result.success) {
				// Handle successful login
				loginMessage = 'Login Successful';
			} else {
				// Handle login failure
				loginMessage = 'Login Failed: ' + result.message;
			}
		} catch (error) {
			console.error('Error during login', error);
			loginMessage = 'An error occurred during login';
		}
	}
</script>

<div class="page-container">
	<div class="container">
		<h2>Welcome</h2>
		<div class="tabs">
			<button
				on:click={() => (activeTab = 'Staff')}
				class={activeTab === 'Staff' ? 'active' : 'Staff'}>Staff</button
			>
			<button
				on:click={() => (activeTab = 'Client')}
				class={activeTab === 'Client' ? 'active' : 'Client'}>Client</button
			>
		</div>
		<form on:submit={signIn}>
			<input type="text" bind:value={username} placeholder="username" />
			<input type="password" bind:value={password} placeholder="password" />
			<button class="sign-in" type="submit">Sign In</button>
		</form>
		{#if loginMessage}
			<p>{loginMessage}</p>
		{/if}
	</div>
</div>

<style>
	h2,
	.tabs {
		text-align: center;
		font-family: 'Roboto', sans-serif;
		margin-bottom: 2rem;
		font-size: 1rem;
		display: flex;
		justify-content: space-around;
	}
	.tabs button {
		background-color: transparent;
		border: 2px solid #113249;
		padding: 0.5rem 1rem;
		margin-right: 0.5rem;
		cursor: pointer;
		border-radius: 5px;
	}

	.tabs button.active {
		background-color: var(--buttoncolor); /* #113249; */
		color: white;
		border-color: #113249;
		min-width: 77px;
	}

	.Staff {
		min-width: 77px;
	}

	.page-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		margin: 0;
		padding: 0;
		background-color: var(--backgroundcolor);
	}

	.container {
		background-color: var(--containercolor); 
		padding: 4rem 2rem;
		width: 20%;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		margin-top: 2rem;
	}

	input[type='text'],
	input[type='password'] {
		display: block;
		width: calc(100% - 1rem);
		margin: 0.5rem 0;
		padding: 0.5rem;
		border-radius: 5px;
		border: 1px solid #d1d5db;
	}

	button.sign-in {
		background-color: var(--buttoncolor);
		border: none;
		padding: 0.5rem 1rem;
		color: white;
		cursor: pointer;
		width: 100%;
		border-radius: 5px;
		border: 1px solid #d1d5db;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	input{
		background-color: var(--textboxcolor);
	}
</style>
