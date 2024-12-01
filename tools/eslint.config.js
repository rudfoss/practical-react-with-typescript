const baseConfig = require("../eslint.config.js")

module.exports = [
  ...baseConfig,
  {
    files: ["**/*.ts", "**/*.js"],
    rules: {
      "unicorn/prefer-module": "off",
      "unicorn/prefer-top-level-await": "off"
    }
  }
]
