import axios from 'axios';

export async function load() {
	// hard coding the client number for now
	const clientNumber = 1;

	// get the client data from the server
	const BASE_URL = 'http://localhost:3000';
	const CLIENTS_URL = `${BASE_URL}/clients/${clientNumber}`;
	const SERVICES_URL = `${BASE_URL}/services`;
	const PACKAGES_URL = `${BASE_URL}/packages`;

	// Fetch data
	let res = await axios(CLIENTS_URL);
	const fetchedUserData = res.data;
	res = await axios(SERVICES_URL);
	const serviceTypes = res.data;
	res = await axios(PACKAGES_URL);
	const allPackages = res.data;

	// get the currentUser from the module context block
	let currentUser = fetchedUserData[0];

	return {
		currentUser,
		serviceTypes,
		allPackages
	};
}
