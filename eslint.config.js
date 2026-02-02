import eslint from "@eslint/js";
import json from "@eslint/json";
import pluginQuery from "@tanstack/eslint-plugin-query";
import prettier from "eslint-config-prettier";
import tailwindPlugin from "eslint-plugin-better-tailwindcss";
import importPlugin from "eslint-plugin-import";
import importZod from "eslint-plugin-import-zod";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
	globalIgnores(["node_modules", "dist", "package-lock.json"]),
	{
		name: "Main options",
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: "module",
		},
		linterOptions: { reportUnusedDisableDirectives: true },
	},
	{ name: "ESlint recommended rules", ...eslint.configs.recommended },
	{
		name: "ESlint rules",
		rules: {
			/* Enforce camelCase */
			camelcase: ["error", { allow: ["required_error"] }],
			/* Avoid console.log */
			"no-console": "error",
			/* Allow void for async functions */
			"no-void": ["error", { allowAsStatement: true }],
			/* Disabled this rule since it doesn't allow re-exporting default from index files */
			"no-restricted-exports": "off",
			/* Restrict function syntax */
			"func-style": ["error", "declaration", { allowArrowFunctions: true }],
			/* Make sure that errors are always re-referenced */
			"preserve-caught-error": "error",
			/* Restrict function syntax in objects */
			"object-shorthand": "error",
			/* Restrict callbacks to arrow functions */
			"prefer-arrow-callback": "warn",
			/* Make arrow functions omit braces if not needed */
			"arrow-body-style": ["warn", "as-needed"],
			/* Make sure there are no spaces before and after comments */
			"spaced-comment": ["error", "always", { markers: ["/", "!", "?"] }],
		},
	},
	{
		name: "Import",
		files: ["**/*.{ts,tsx,mts,cts}", "**/*.{js,jsx,mjs,cjs}"],
		extends: [importPlugin.flatConfigs.recommended],
		rules: {
			/* TODO: Prevent cyclic imports */
			// "import/no-cycle": "error",
			/* Allow default export of anonymous objects */
			"import/no-anonymous-default-export": [
				"error",
				{ allowObject: true, allowArray: true },
			],
			/* Allow default naming be the same as exported variables */
			"import/no-named-as-default": "off",
		},
	},
	{
		files: ["**/*.json"],
		language: "json/json",
		plugins: { json },
		extends: ["json/recommended"],
		rules: { "no-irregular-whitespace": "off" },
	},
	{
		files: ["**/*.jsonc", ".vscode/*.json"],
		language: "json/jsonc",
		plugins: { json },
		extends: ["json/recommended"],
		rules: { "no-irregular-whitespace": "off" },
	},
	{ name: "Zod", extends: importZod.configs.recommended },
	{
		name: "Parser options for Typescript",
		languageOptions: {
			parserOptions: {
				projectService: {
					loadTypeScriptPlugins: true,
					allowDefaultProject: [
						"lint-staged.config.ts",
						"commitlint.config.ts",
						"vite.config.ts",
					],
				},
			},
		},
	},
	{
		name: "Typescript ESlint rules",
		files: ["**/*.{ts,tsx,mts,cts}"],
		extends: [tseslint.configs.strictTypeChecked],
		rules: {
			/* Allow hoisting for functions for better code readability */
			"@typescript-eslint/no-use-before-define": "off",
			/* This rule is too restrictive */
			"@typescript-eslint/return-await": "off",
			/* There are several cases that we need to use a promise as a callback */
			"@typescript-eslint/no-misused-promises": [
				"error",
				{
					checksVoidReturn: {
						attributes: false,
						arguments: false,
						properties: false,
					},
				},
			],
			/* Allow classes as function groups */
			"@typescript-eslint/no-extraneous-class": "off",
			/* Allows arrow function shorthand */
			"@typescript-eslint/no-confusing-void-expression": "off",
			/* Disable unused-vars error when need to omit a field from object, { omittedField, ...params } = obj */
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ ignoreRestSiblings: true },
			],
			/* Require only objects to convert to string */
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{
					allow: [{ name: ["Error", "URL", "URLSearchParams"], from: "lib" }],
					allowAny: false,
					allowBoolean: false,
					allowNever: false,
					allowNullish: false,
					allowNumber: true,
					allowRegExp: false,
				},
			],
			/* Allow leading underscore for apollo gql __typename and lodash - already is allowed */
			"@typescript-eslint/naming-convention": [
				"error",
				{
					leadingUnderscore: "allow",
					selector: "default",
					format: null,
				},
			],
			/* Prevent checking wrong entry of an object */
			"@typescript-eslint/no-unnecessary-condition": "warn",
			/* Require imports are needed in React Native */
			"@typescript-eslint/no-require-imports": "off",
			/* Restrict declaring types only as interfaces (types error) */
			"@typescript-eslint/consistent-type-definitions": ["error", "interface"],
		},
	},
	{
		name: "Import Typescript",
		files: ["**/*.{ts,tsx,mts,cts}", "**/*.{js,jsx,mjs,cjs}"],
		extends: [importPlugin.flatConfigs.typescript],
		rules: {
			/* Duplicate from typescript */
			"import/named": "off",
			/* Duplicate from typescript */
			"import/namespace": "off",
			/* Duplicate from typescript */
			"import/default": "off",
			/* Duplicate from typescript */
			"import/no-named-as-default-member": "off",
			/* Duplicate from typescript */
			"import/no-unresolved": "off",
		},
	},
	{
		files: ["**/*.{ts,tsx,mts,cts}", "**/*.{js,jsx,mjs,cjs}"],
		extends: [jsxA11yPlugin.flatConfigs["recommended"]],
		rules: { "jsx-a11y/lang": "warn" },
	},
	{
		name: "Tailwind",
		files: ["**/*.{ts,tsx,mts,cts}", "**/*.{js,jsx,mjs,cjs}"],
		extends: [tailwindPlugin.configs.recommended],
		rules: {
			"better-tailwindcss/enforce-consistent-line-wrapping": "off",
		},
	},
	{
		name: "Import React",
		files: ["**/*.{ts,tsx,mts,cts}", "**/*.{js,jsx,mjs,cjs}"],
		extends: [importPlugin.flatConfigs.react],
	},
	{
		name: "React",
		files: ["**/*.{ts,tsx,mts,cts}", "**/*.{js,jsx,mjs,cjs}"],
		plugins: { react },
		rules: {
			...react.configs.recommended.rules,
			...react.configs["jsx-runtime"].rules,
			/* Disable PropTypes */
			"react/prop-types": "off",
			/* Explicitly set filename if it includes jsx */
			"react/jsx-filename-extension": [
				"warn",
				{ extensions: [".jsx", ".tsx"] },
			],
			/* Make all components arrow functions */
			"react/function-component-definition": [
				"warn",
				{
					namedComponents: "arrow-function",
					unnamedComponents: "arrow-function",
				},
			],
			/* Prevent unescaped template characters */
			"react/no-unescaped-entities": ["error", { forbid: [">", "}"] }],
			/* Nesting components are a bad practice */
			"react/no-unstable-nested-components": ["error", { allowAsProps: true }],
			/* Prevent indices as keys */
			"react/no-array-index-key": "error",
			/* Prevent inconstant useState naming */
			"react/hook-use-state": ["warn", { allowDestructuredState: true }],
			/* Make components with no children a self-closing tag */
			"react/self-closing-comp": "warn",
			/* Prevent fragments as component syntax */
			"react/jsx-fragments": "error",
			/* Handle curly braces in JSX */
			"react/jsx-curly-brace-presence": [
				"warn",
				{ props: "never", children: "never", propElementValues: "always" },
			],
		},
		languageOptions: {
			parserOptions: {
				...react.configs.recommended.parserOptions,
				...react.configs["jsx-runtime"].parserOptions,
			},
			globals: {
				...globals.node,
				...globals.browser,
				...globals.es2021,
			},
		},
		settings: { react: { version: "detect" } },
	},
	{
		name: "React hooks",
		files: ["**/*.{ts,tsx,mts,cts}", "**/*.{js,jsx,mjs,cjs}"],
		extends: [reactHooks.configs.flat.recommended],
	},
	pluginQuery.configs["flat/recommended"],
	{ name: "Prettier", ...prettier },
);
