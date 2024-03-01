<script>
	// State variables for form inputs
	let userName = '';
	let email = '';
	let firstName = '';
	let lastName = '';
	let phoneNumber = '';
	let role = '';
	let password = '';
	let confirmPassword = '';

	// Function to validate and submit the form
	function submitForm() {
		// Validate phone number
		if (!phoneNumber.match(/^\d{3}-\d{3}-\d{4}$/)) {
			alert('Please enter a valid phone number format: 123-456-7891');
			return;
		}

		// Validate passwords
		if (password !== confirmPassword) {
			alert('Passwords do not match. Please try again.');
			return;
		}

		// Handle form submission (e.g., send data to a server)
		alert('Form submitted successfully!');
	}
</script>


<main class="page-container">	
	<div class="container">
		<h1>Create a new Employee Account</h1>
		<form on:submit|preventDefault={submitForm}>
			<label for="userName">User Name</label>
			<input type="text" id="userName" bind:value={userName} required />

			<label for="email">Email</label>
			<input type="email" id="email" bind:value={email} required />

			<label for="firstName">First Name</label>
			<input type="text" id="firstName" bind:value={firstName} required />

			<label for="lastName">Last Name</label>
			<input type="text" id="lastName" bind:value={lastName} required />

			<label for="phoneNumber">Phone Number</label>
			<input type="tel" id="phoneNumber" bind:value={phoneNumber} required />

			<label for="role">Role</label>
			<select id="role" bind:value={role} required>
				<option value="admin">Admin</option>
				<option value="manager">Manager</option>
				<option value="reviewer">Reviewer</option>
			</select>

			<label for="password">Password</label>
			<input type="password" id="password" bind:value={password} required />

			<label for="confirmPassword">Confirm Password</label>
			<input type="password" id="confirmPassword" bind:value={confirmPassword} required />

			<button type="submit">Sign Up</button>
		</form>
	</div>
</main>

<style>
	.page-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.container {
		min-width: 30%;
		background-color: #0d6e97;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		padding: 2rem;
	}

	h1 {
		color: var(--primary-color);
		text-align: center;
		margin-bottom: 2rem;
		font-family: var(--font-family);
	}

	form {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	label {
		color: var(--primary-color);
		font-weight: 600;
		margin-bottom: .5rem;
		font-family: var(--font-family);
	}

	input, select {
		padding: 10px;
		margin-bottom: 1rem;
		border: 1px solid var(--primary-color);
		border-radius: 4px;
		font-family: var(--font-family);
	}

	button {
    padding: 1rem;
    border: none;
    background-color: var(--secondary-color);
    color: white;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
    font-family: var(--font-family);
    font-weight: 600;
    transition: background-color 0.3s, transform 0.2s;
	}

	button:hover {
		background-color: #000508; /* Darker shade of the button color */
		transform: translateY(-2px); /* Optional: subtle lift effect */
	}

	button:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
</style>
