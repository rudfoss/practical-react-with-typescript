import path from "node:path"
import { workspaceRoot } from "@nx/devkit"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

// https://vite.dev/config/
export default defineConfig({
	root: path.resolve("src"),

	server: {
		port: 4200
	},

	plugins: [react()],
	build: {
		outDir: path.resolve(workspaceRoot, "dist/userdb/app"),
		emptyOutDir: true,
		commonjsOptions: {
			transformMixedEsModules: true
		}
	},

	test: {
		watch: false,
		passWithNoTests: true,
		environment: "jsdom"
	}
})
