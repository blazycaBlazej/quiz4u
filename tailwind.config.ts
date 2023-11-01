import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',

	theme: {
		extend: {
			colors: {
				'dark-text': '#BBBCBF',
				'light-text': '#333333',
				'main-bgn-dark': '#0b0d0f',
				'main-bgn-light': '#F6F8FA',
				'element-backgorund-dark': '#141517',
				'element-backgorund-light': '#FFFFFF',
				'element-hover-backgorund-dark': 'rgba(39, 40, 41, 0.8)',
				'element-hover-backgorund-light': 'rgba(216, 220, 226, 0.8)',
				'element-active-backgorund-dark': '#4b4c4e',
				'element-active-backgorund-light': '#E2E6EC',
				'border-color-dark': '#2f3337',
				'border-color-light': '#D8DCE2',
				'btn-violet-color': '#5721f2',
				'btn-violet-color-hover': '#4719C1',
				'error-color': '#e43d42',
				correctAnswerDark: '#015501',
				correctAnswerLight: '#017517',

				'incorrect-answer-quiz': '#7B1E1E',
				'box-color-dark': '#1b1c1f',
				'box-color-light': '#FFFFFF',
			},

			backgroundImage: {
				'colorful-gradient-dark':
					'linear-gradient(136.08deg, rgb(30, 20, 67) 0%, rgb(20, 21, 23) 100%), linear-gradient(160deg, #5721f2, #793ae0)',
				'colorful-gradient-light':
					'linear-gradient(136.08deg, rgb(230, 235, 250) 0%, rgb(240, 240, 235) 100%), linear-gradient(160deg, #91a1f5, #b1b3e3)',
				'dark-box': 'linear-gradient(308.65deg, #0b0d0f 0%, #1b1c1f 117.53%)',
				'light-box': 'linear-gradient(308.65deg, #f5f7fa 0%, #e2e6ea 117.53%)',
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
