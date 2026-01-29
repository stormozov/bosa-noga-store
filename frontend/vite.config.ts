import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from 'vite';
import { analyzer } from 'vite-bundle-analyzer'


// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		analyzer(),
	],
	base: process.env.NODE_ENV === "production" ? "/bosa-noga-store/" : "/",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
