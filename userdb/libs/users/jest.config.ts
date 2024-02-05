/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
export default {
	displayName: "userdb-libs-users",
	preset: "../../../jest.preset.js",
	transform: {
		"^.+\\.[tj]sx?$": [
			"@swc/jest",
			{
				jsc: {
					parser: { syntax: "typescript", tsx: true },
					transform: { react: { runtime: "automatic" } }
				}
			}
		]
	},
	moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
	coverageDirectory: "../../../coverage/userdb/libs/users"
}
