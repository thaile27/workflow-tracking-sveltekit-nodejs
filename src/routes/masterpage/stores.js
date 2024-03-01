import { writable } from 'svelte/store';

// Define a writable store for holding the data table
export const dataTable = writable([]);

// You can define additional stores for other parts of your application
// For example, a store for user authentication status
export const isAuthenticated = writable(false);

// Any other global state you want to manage
