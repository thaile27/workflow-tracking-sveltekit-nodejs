import axios from 'axios';

export async function load({ params }) {
	const CLIENTS_URL = 'http://localhost:3000/clients';
	const res = await axios(CLIENTS_URL);
	// get the currentUser from the module context block
	const fetchedUserData = res.data;
	let currentUser = fetchedUserData[0];

	const { packageNumber } = params;
	const PACKAGES_URL = `http://localhost:3000/clients/packages/${packageNumber}`;

	const res02 = await axios(PACKAGES_URL);

	return {
		props: {
			currentUser,
			currentPackage: res02.data[0]
		}
	};
}
