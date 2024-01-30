const path = require("node:path")

const { composePlugins, withNx } = require("@nx/webpack")

// Nx plugins for webpack.
module.exports = composePlugins(
	withNx({
		target: "node",
		sourceMap: true
	}),
	(config, ctx) => {
		config.module.rules.push({
			test: /\.md$/,
			type: "asset/source"
		})

		config.output.devtoolModuleFilenameTemplate = function (info) {
			const rel = path.relative(ctx.context.root, info.absoluteResourcePath)
			return `webpack:///./${rel}`
		}

		return config
	}
)
