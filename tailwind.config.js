/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{html,js,ts,jsx,tsx}',
		'../../lib1/src/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				}
			},
			animation: {
				fadeIn: 'fadeIn .5s ease-in-out'
			}
		}
	},
	plugins: []
}
