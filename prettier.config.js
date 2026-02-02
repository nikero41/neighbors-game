/** @type {import('prettier').Config} */
export default {
	plugins: [
		"@ianvs/prettier-plugin-sort-imports",
		"prettier-plugin-tailwindcss",
	],
	arrowParens: "avoid",
	bracketSameLine: false,
	bracketSpacing: true,
	singleQuote: false,
	trailingComma: "all",
	printWidth: 80,
	endOfLine: "lf",
	semi: true,
	useTabs: true,
	tabWidth: 2,
	proseWrap: "preserve",
	htmlWhitespaceSensitivity: "css",
	importOrder: [
		"^(react/(.*)$)|^(react$)",
		"^(react/(.*)$)|^(react-native$)",
		"<THIRD_PARTY_MODULES>",
		"",
		"^types$",
		"^@/(.*)$",
		"^[.]",
	],
	tailwindFunctions: ["clsx", "cn", "cva"],
};
