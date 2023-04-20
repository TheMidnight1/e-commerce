module.exports = {
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:svelte/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["*.cjs"],
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser"
      }
    }
  ],
  settings: {
    "svelte3/typescript": () => require("typescript")
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
    extraFileExtensions: [".svelte"]
  },
  rules: {
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }
    ]
  }
};
