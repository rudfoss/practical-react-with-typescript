const nx = require("@nx/eslint-plugin")
const importPlugin = require("eslint-plugin-import")
const preferArrowPlugin = require("eslint-plugin-prefer-arrow-functions")
const unicornPlugin = require("eslint-plugin-unicorn")

module.exports = [
  ...nx.configs["flat/base"],
  ...nx.configs["flat/typescript"],
  ...nx.configs["flat/javascript"],
  unicornPlugin.configs["flat/recommended"],
  {
    ignores: ["**/dist"]
  },
  {
    files: ["**/*.config.js"],
    rules: {
      "unicorn/prefer-module": "off"
    }
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      "@nx/enforce-module-boundaries": [
        "error",
        {
          enforceBuildableLibDependency: true,
          allow: [String.raw`^.*/eslint(\.base)?\.config\.[cm]?js$`],
          depConstraints: [
            {
              sourceTag: "*",
              onlyDependOnLibsWithTags: ["*"]
            }
          ]
        }
      ]
    }
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    plugins: {
      import: importPlugin,
      "prefer-arrow-functions": preferArrowPlugin
    },
    // Override or add rules here
    rules: {
      "func-style": ["error", "expression"],
      "prefer-arrow-callback": "error",
      "prefer-arrow-functions/prefer-arrow-functions": [
        "error",
        { returnStyle: "implicit" }
      ],
      "unicorn/filename-case": [
        "error",
        { cases: { camelCase: true, pascalCase: true } }
      ],
      "unicorn/prevent-abbreviations": [
        "error",
        {
          allowList: {
            props: true,
            Props: true,
            ref: true,
            Env: true,
            env: true
          }
        }
      ],
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "parent",
            ["sibling", "index", "internal"]
          ],
          pathGroups: [
            {
              pattern: "@practical-react/**",
              group: "parent",
              position: "before"
            }
          ],
          pathGroupsExcludedImportTypes: [],
          alphabetize: { order: "asc", caseInsensitive: false },
          "newlines-between": "always"
        }
      ]
    }
  }
]
