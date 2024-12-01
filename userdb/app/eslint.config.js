const nx = require("@nx/eslint-plugin")

const baseConfig = require("../../eslint.config.js")
const {
  removeDuplicateImportPlugin
} = require("../../tools/src/removeDuplicateImportPlugin.js")

module.exports = [
  ...baseConfig,
  ...removeDuplicateImportPlugin(nx.configs["flat/react"]),
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    // Override or add rules here
    rules: {
      "jsx-a11y/accessible-emoji": ["off"]
    }
  }
]
