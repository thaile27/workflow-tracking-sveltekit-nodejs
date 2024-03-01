import { Client } from '$lib/classes/client';

// Assuming you have a function to generate random data for each field
function generateRandomClient() {
	// Generate random data for each field
	const clientNumber = generateRandomClientNumber();
	const firstName = generateRandomFirstName();
	const lastName = generateRandomLastName();
	const email = generateRandomEmail();
	const phoneNumber = generateRandomPhoneNumber();
	const roleId = generateRandomRoleId();
	const username = generateRandomUsername();
	const companyName = generateRandomCompanyName();
	const companyAddress = generateRandomCompanyAddress();
	const docControl = generateRandomDocControl();
	const password = generateRandomPassword();

	// Create a new Client object with the generated data
	const client = new Client(
		clientNumber,
		firstName,
		lastName,
		email,
		phoneNumber,
		roleId,
		username,
		companyName,
		companyAddress,
		docControl,
		password
	);

	return client;
}

// Function to generate a random client number
function generateRandomClientNumber() {
	return Math.floor(Math.random() * 1000000); // Generates a random number between 0 and 999999
}

// Function to generate a random first name
function generateRandomFirstName() {
	const firstNames = [
		'Alice',
		'Bob',
		'Charlie',
		'David',
		'Emma',
		'Frank',
		'Grace',
		'Henry',
		'Ivy',
		'Jack'
	];
	return firstNames[Math.floor(Math.random() * firstNames.length)];
}

// Function to generate a random last name
function generateRandomLastName() {
	const lastNames = [
		'Adams',
		'Brown',
		'Clark',
		'Davis',
		'Evans',
		'Fisher',
		'Garcia',
		'Harris',
		'Jones',
		'King'
	];
	return lastNames[Math.floor(Math.random() * lastNames.length)];
}

// Function to generate a random email
function generateRandomEmail() {
	const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'example.com'];
	const firstName = generateRandomFirstName().toLowerCase();
	const lastName = generateRandomLastName().toLowerCase();
	const domain = domains[Math.floor(Math.random() * domains.length)];
	return `${firstName}.${lastName}@${domain}`;
}

// Function to generate a random phone number
function generateRandomPhoneNumber() {
	const areaCode = Math.floor(Math.random() * (999 - 100 + 1) + 100); // Generates a random 3-digit area code
	const firstPart = Math.floor(Math.random() * 1000); // Generates a random 3-digit number
	const secondPart = Math.floor(Math.random() * 10000); // Generates a random 4-digit number
	return `(${areaCode}) ${firstPart}-${secondPart}`;
}

// Function to generate a random role ID
function generateRandomRoleId() {
	return Math.floor(Math.random() * 100); // Generates a random number between 0 and 99
}

// Function to generate a random username
function generateRandomUsername() {
	const usernames = ['user123', 'john_doe', 'jane_smith', 'cooluser', 'admin'];
	return usernames[Math.floor(Math.random() * usernames.length)];
}

// Function to generate a random company name
function generateRandomCompanyName() {
	const companyNames = [
		'ABC Corp',
		'XYZ Ltd',
		'Smith & Sons',
		'Johnson Enterprises',
		'Tech Solutions'
	];
	return companyNames[Math.floor(Math.random() * companyNames.length)];
}

// Function to generate a random company address
function generateRandomCompanyAddress() {
	const addresses = ['123 Main St', '456 Elm St', '789 Oak Ave', '10 Pine Rd', '25 Maple Ln'];
	const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
	const states = ['NY', 'CA', 'IL', 'TX', 'AZ'];
	const zipCodes = ['10001', '90001', '60601', '77001', '85001'];
	const randomAddress = addresses[Math.floor(Math.random() * addresses.length)];
	const randomCity = cities[Math.floor(Math.random() * cities.length)];
	const randomState = states[Math.floor(Math.random() * states.length)];
	const randomZipCode = zipCodes[Math.floor(Math.random() * zipCodes.length)];
	return `${randomAddress}, ${randomCity}, ${randomState} ${randomZipCode}`;
}

// Function to generate a random document control
function generateRandomDocControl() {
	return Math.random() >= 0.5; // Generates a random boolean value
}

// Function to generate a random password
function generateRandomPassword() {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let password = '';
	for (let i = 0; i < 8; i++) {
		password += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return password;
}

export { generateRandomClient };
