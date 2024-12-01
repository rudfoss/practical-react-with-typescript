const path = require("node:path")

const { composePlugins, withNx } = require("@nx/webpack")

// Nx plugins for webpack.
module.exports = composePlugins(
  withNx({
    target: "node"
  }),
  (config, context) => {
    config.module.rules.push({
      test: /\.md$/,
      type: "asset/source"
    })

    config.output.devtoolModuleFilenameTemplate = (info) => {
      const relative = path.relative(
        context.context.root,
        info.absoluteResourcePath
      )
      return `webpack:///./${relative}`
    }

    return config
  }
)
