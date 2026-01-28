import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: process.env.NODE_ENV === "production" ? "/bosa-noga-store/" : "/",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@data": path.resolve(__dirname, "./src/data"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@hooks": path.resolve(__dirname, "./src/hooks"),
			"@hoc": path.resolve(__dirname, "./src/hoc"),
			"@shared": path.resolve(__dirname, "./src/shared"),
		},
	},
});
