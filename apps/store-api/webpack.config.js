const webpack = require("webpack")
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

	config.plugins.push(
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1
		})
	)

	console.log(JSON.stringify(config, null, 1))

	return config
})
