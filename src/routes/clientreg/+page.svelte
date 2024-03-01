<script>
	let username = '';
	let email = '';
	let firstName = '';
	let lastName = '';
	let phoneNumber = '';
	let companyName = '';
	let companyAddress = '';
	let documentControl = '';
	let questionnaire = '';
	let role = '';
	let password = '';
	let confirmPassword = '';
	let agreeToTerms = false;

	const roles = ['Control 1', 'Control 2', 'Control 3']; // Add actual roles here

	function handleSubmit() {
		// Placeholder for form submission logic
		console.log('Form submitted', {
			username,
			email,
			firstName,
			lastName,
			phoneNumber,
			companyName,
			companyAddress,
			documentControl,
			questionnaire,
			role,
			password,
			confirmPassword,
			agreeToTerms
		});
	}
</script>

<div class="form-container">
	<h2>Create a new Client Account</h2>
	<form on:submit|preventDefault={handleSubmit}>
		<div class="form-section">
			<div class="form-section-header">Personal Information</div>
			<label for="username">User Name</label>
			<input id="username" bind:value={username} required />

			<label for="email">Email</label>
			<input id="email" bind:value={email} type="email" required />

			<label for="firstName">First Name</label>
			<input id="firstName" bind:value={firstName} required />

			<label for="lastName">Last Name</label>
			<input id="lastName" bind:value={lastName} required />
		</div>

		<div class="form-section">
			<div class="form-section-header">Company Information</div>
			<label for="companyName">Company Name</label>
			<input id="companyName" bind:value={companyName} required />

			<label for="companyAddress">Company Address</label>
			<input id="companyAddress" bind:value={companyAddress} required />
		</div>

		<div class="form-section">
			<div class="form-section-header">Additional Information</div>
			<label for="documentControl">Document Control</label>
			<textarea id="documentControl" bind:value={documentControl} />

			<label for="questionnaire">Questionnaire</label>
			<textarea id="questionnaire" bind:value={questionnaire} required />
		</div>

		<label for="role">Document Control</label>
		<select id="role" bind:value={role} required>
			<option value="" disabled selected>Select your control</option>
			{#each roles as roleOption}
				<option value={roleOption}>{roleOption}</option>
			{/each}
		</select>

		<label for="password">Password</label>
		<input id="password" bind:value={password} type="password" required />

		<label for="confirmPassword">Confirm Password</label>
		<input id="confirmPassword" bind:value={confirmPassword} type="password" required />

		<label class="checkbox" for="terms">
			<input id="terms" type="checkbox" bind:checked={agreeToTerms} />
			Agree to the Terms and Conditions?
		</label>

		<button type="submit" class="submit-button">Sign Up</button>
	</form>
</div>

<style>
	.form-container {
		max-width: 960px;
		margin: 40px auto;
		padding: 40px;
		background-color: #0d6e97;
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		font-family: var(--font-family);
	}

	h2 {
		color: var(--primary-color);
		text-align: center;
		margin-bottom: 2rem;
	}

	form {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 30px;
	}

	.form-section {
		background: var(--tertiary-color);
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
		margin-bottom: 20px;
		grid-column: span 2;
	}

	.form-section-header {
		font-size: 1.2rem;
		color: var(--primary-color);
		margin-bottom: 1.5rem;
		font-weight: 600;
	}

	label {
		color: var(--primary-color);
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	input,
	select,
	textarea {
		width: 100%;
		padding: 10px;
		border: 1px solid var(--border-color);
		border-radius: 4px;
		margin-bottom: 1rem;
		font-family: var(--font-family);
		box-sizing: border-box;
	}

	.checkbox {
		display: flex;
		align-items: center;
		grid-column: span 2;
		margin-top: 10px;
	}

	.checkbox input {
		margin-right: 10px;
	}

	.submit-button {
		width: 100%;
		padding: 15px;
		background-color: var(--secondary-color);
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		grid-column: span 2;
		font-size: 1.1rem;
		font-weight: 600;
		transition: background-color 0.3s;
	}

	.submit-button:hover {
		background-color: darken(var(--secondary-color), 10%);
	}
</style>
