/** @type {import('tailwindcss').Config} */
export default {
	mode: 'jit',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
		colors: {
			mainColor: '#0073CF',
			branco: '#fff',
			preto: '#000',
			cinza: '#A0AFB7',
			transparent: 'transparent',
		},
	},
	plugins: [],
};
