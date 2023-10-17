import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'main-backgorund': '#0b0d0f',
				'element-backgorund': '#141517',
				'element-hover-backgorund': 'rgba(39, 40, 41, 0.8)',
				'element-active-backgorund': '#4b4c4e',
				'border-color': '#2f3337',
				'btn-violet-color': '#5721f2',
				'btn-violet-color-hover': '#4719C1',
				'main-font-color': '#75777b',
				'error-color': '#e43d42',
			},

			boxShadow: {
				customNew: '-4px 2px 12px rgba(115, 70, 243, 0.54)',
				customGreen: '0 4px 6px rgba(0, 128, 0, 0.5)',
				customRed: '0 4px 6px rgba(255, 0, 0, 0.5)',
			},
		},
	},
	plugins: [],
}
export default config
