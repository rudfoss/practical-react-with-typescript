/// <reference types='vitest' />
import path from "node:path"
import url from "node:url"

import { nxCopyAssetsPlugin } from "@nx/vite/plugins/nx-copy-assets.plugin"
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

export default defineConfig({
  root: path.dirname(url.fileURLToPath(import.meta.url)),
  cacheDir: "../../node_modules/.vite/userdb/app",

  server: {
    port: 4010,
    host: "localhost"
  },

  preview: {
    port: 4011,
    host: "localhost"
  },

  plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(["*.md"])],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: "../../dist/userdb/app",
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },

  test: {
    watch: false,
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],

    reporters: ["default"],
    coverage: {
      reportsDirectory: "../../coverage/userdb/app",
      provider: "v8"
    }
  }
})
