const { composePlugins, withNx } = require("@nx/webpack")
const path = require("node:path")

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
	config.module.rules.push({
		test: /\.md$/,
		type: "asset/source"
	})

	config.output.devtoolModuleFilenameTemplate = function (info) {
		const rel = path.relative(process.cwd(), info.absoluteResourcePath)
		return `webpack:///./${rel}`
	}

	return config
})
