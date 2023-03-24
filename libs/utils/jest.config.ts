/* eslint-disable */
export default {
	displayName: "utils",
	preset: "../../jest.preset.js",
	transform: {
		"^.+\\.[tj]sx?$": ["@swc/jest", { jsc: { transform: { react: { runtime: "automatic" } } } }]
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
	coverageDirectory: "../../coverage/libs/utils"
}
