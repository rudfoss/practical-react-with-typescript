const { composePlugins, withNx } = require("@nx/webpack")

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
	config.module.rules.push({
		test: /\.md$/,
		type: "asset/source"
	})

	// Update the webpack config as needed here.
	// e.g. `config.plugins.push(new MyPlugin())`
	return config
})
