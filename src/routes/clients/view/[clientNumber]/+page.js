import axios from 'axios';

export async function load({ params }) {
	const { clientNumber } = params;

	const CLIENTS_URL = `http://localhost:3000/clients/${clientNumber}`;
	const res = await axios(CLIENTS_URL);
	// get the currentUser from the module context block
	const fetchedUserData = res.data;
	let currentUser = fetchedUserData[0];

	let allPackages = [];
	const PACKAGES_URL = `http://localhost:3000/clients/${clientNumber}/packages`;

	const res2 = await axios(PACKAGES_URL);
	allPackages = res2.data;

	return {
		props: {
			currentUser,
			allPackages
		}
	};
}
