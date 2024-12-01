const baseConfig = require("../../eslint.config.js")

module.exports = [
  ...baseConfig,
  {
    files: ["**/*.ts"],
    rules: {
      "unicorn/prefer-module": "off"
    }
  }
]
