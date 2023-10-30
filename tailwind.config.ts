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
				'main-font-color': '#BBBCBF',
				'error-color': '#e43d42',
				correctAnswer: '#015501',
				'incorrect-answer-quiz': '#451717',
				'box-color': '#1b1c1f',
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
// colors: {
// 	'main-backgorund': '#F6F8FA',
// 	'element-backgorund': '#FFFFFF',
// 	'element-hover-backgorund': 'rgba(216, 220, 226, 0.8)',
// 	'element-active-backgorund': '#E2E6EC',
// 	'border-color': '#D8DCE2',
// 	'btn-violet-color': '#5721f2',
// 	'btn-violet-color-hover': '#4719C1',
// 	'main-font-color': '#333333',
// 	'error-color': '#e43d42',
// 	correctAnswer: '#017517',
// 	'incorrect-answer-quiz': '#7B1E1E',
// 	'box-color': '#FFFFFF',
//  },

//  boxShadow: {
// 	customNew: '4px 2px 12px rgba(87, 33, 242, 0.2)',
// 	customGreen: '0 4px 6px rgba(0, 128, 0, 0.2)',
// 	customRed: '0 4px 6px rgba(255, 0, 0, 0.2)',
//  }
