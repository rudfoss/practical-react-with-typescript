/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
export default {
	displayName: "userdb-api",
	preset: "../../jest.preset.js",
	testEnvironment: "node",
	transform: {
		"^.+\\.[tj]s$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.spec.json" }]
	},
	moduleFileExtensions: ["ts", "js", "html"],
	coverageDirectory: "../../coverage/apis/userdb-api"
}
