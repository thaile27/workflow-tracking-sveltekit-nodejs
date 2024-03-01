import createAuth0Client from '@auth0/auth0-spa-js';
import { writable } from 'svelte/store';

// Store to hold the authentication state
const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

export const isAuthenticated = writable(false);
export const user = writable({});

async function createClient() {
	return await createAuth0Client({
		domain: auth0Domain,
		client_id: auth0ClientId,
		redirect_uri: window.location.origin
	});
}

const client = createClient();

export async function login() {
	const auth0 = await client;
	await auth0.loginWithRedirect();
}

export async function logout() {
	const auth0 = await client;
	await auth0.logout({
		returnTo: window.location.origin
	});
}

// Function to call on app load to handle authentication state
export async function handleAuth() {
	const auth0 = await client;
	try {
		await auth0.handleRedirectCallback();
		const isAuthenticatedValue = await auth0.isAuthenticated();
		isAuthenticated.set(isAuthenticatedValue);

		if (isAuthenticatedValue) {
			const userProfile = await auth0.getUser();
			user.set(userProfile);
		}
	} catch (error) {
		console.error(error);
	}
}