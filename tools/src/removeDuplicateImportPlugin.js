const removeDuplicateImportPlugin = (config) => {
  for (const singleConfig of config) {
    if (singleConfig?.plugins?.["import"]) {
      console.log("eslint.config.js: Stripped import plugin")
      delete singleConfig.plugins["import"]
    }
  }
  return config
}

module.exports = { removeDuplicateImportPlugin }
