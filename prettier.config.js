module.exports = {
	semi: false,
	singleQuote: true,
	jsxSingleQuote: true,
	trailingComma: 'all',
	singleQuote: true,
	printWidth: 120,
	tabWidth: 2,
	arrowParens: 'always', //dodaje nawaisy przy paramtrach w funkcjach strzałkowych
	useTabs: true,
	tailwindConfig: './tailwind.config.ts',
	plugins: ['prettier-plugin-tailwindcss'],
}
