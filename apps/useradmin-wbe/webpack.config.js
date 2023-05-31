const path = require("node:path")

const { composePlugins, withNx } = require("@nx/webpack")

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
	config.module.rules.push({
		test: /\.md$/,
		type: "asset/source"
	})

	// Workaround for problem with source maps and attaching debugger.
	// https://github.com/nrwl/nx/issues/14708#issuecomment-1457996600
	config.output.devtoolModuleFilenameTemplate = (info) => {
		const rel = path.relative(process.cwd(), info.absoluteResourcePath)
		return `webpack:///./${rel}`
	}

	return config
})
