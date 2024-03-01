import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	server: {
		port: 3001
	},
	build: {
		target: 'esnext' // Make sure this is set to 'esnext' or another target that supports top-level await
	}
};

export default config;