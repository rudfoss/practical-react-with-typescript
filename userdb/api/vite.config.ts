import { defineConfig } from "vitest/config"

import path from "node:path"

// https://vite.dev/config/
export default defineConfig({
	root: path.resolve("src"),

	test: {
		watch: false,
		passWithNoTests: true
	}
})
