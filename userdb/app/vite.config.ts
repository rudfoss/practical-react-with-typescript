import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import { workspaceRoot } from "@nx/devkit"
import path from "node:path"

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
		passWithNoTests: true
	}
})
