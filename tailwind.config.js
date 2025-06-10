/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/contexts/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat-Regular"],
        "montserrat-light": ["Montserrat-Light"],
        "montserrat-medium": ["Montserrat-Medium"],
        "montserrat-semibold": ["Montserrat-SemiBold"],
        "montserrat-bold": ["Montserrat-Bold"],
      },
      colors: {
        'app-bg': 'rgb(var(--bg-color) / <alpha-value>)',
        'app-card': 'rgb(var(--card-color) / <alpha-value>)',
        'app-border': 'rgb(var(--border-color) / <alpha-value>)',
        'app-text-primary': 'rgb(var(--text-primary) / <alpha-value>)',
        'app-text-secondary': 'rgb(var(--text-secondary) / <alpha-value>)',
        'app-text-muted': 'rgb(var(--text-muted) / <alpha-value>)',

        'app-primary-50': 'rgb(var(--primary-50) / <alpha-value>)',
        'app-primary-100': 'rgb(var(--primary-100) / <alpha-value>)',
        'app-primary-200': 'rgb(var(--primary-200) / <alpha-value>)',
        'app-primary-300': 'rgb(var(--primary-300) / <alpha-value>)',
        'app-primary-400': 'rgb(var(--primary-400) / <alpha-value>)',
        'app-primary-500': 'rgb(var(--primary-500) / <alpha-value>)',

        'app-accent': 'rgb(var(--accent-color) / <alpha-value>)',

        'app-success': 'rgb(var(--success-color) / <alpha-value>)',
        'app-error': 'rgb(var(--error-color) / <alpha-value>)',
        'app-warning': 'rgb(var(--warning-color) / <alpha-value>)',
        'app-info': 'rgb(var(--info-color) / <alpha-value>)',
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
