/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/[**/*.{js,jsx,ts,tsx}",
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
        '[--bg-color]': 'rgb(var(--bg-color) / <alpha-value>)',
        '[--card-color]': 'rgb(var(--card-color) / <alpha-value>)',
        '[--border-color]': 'rgb(var(--border-color) / <alpha-value>)',
        '[--text-primary]': 'rgb(var(--text-primary) / <alpha-value>)',
        '[--text-secondary]': 'rgb(var(--text-secondary) / <alpha-value>)',
        '[--text-muted]': 'rgb(var(--text-muted) / <alpha-value>)',

        '[--primary-50]': 'rgb(var(--primary-50) / <alpha-value>)',
        '[--primary-100]': 'rgb(var(--primary-100) / <alpha-value>)',
        '[--primary-200]': 'rgb(var(--primary-200) / <alpha-value>)',
        '[--primary-300]': 'rgb(var(--primary-300) / <alpha-value>)',
        '[--primary-400]': 'rgb(var(--primary-400) / <alpha-value>)',
        '[--primary-500]': 'rgb(var(--primary-500) / <alpha-value>)',

        '[--accent-color]': 'rgb(var(--accent-color) / <alpha-value>)',

        '[--success-color]': 'rgb(var(--success-color) / <alpha-value>)',
        '[--error-color]': 'rgb(var(--error-color) / <alpha-value>)',
        '[--warning-color]': 'rgb(var(--warning-color) / <alpha-value>)',
        '[--info-color]': 'rgb(var(--info-color) / <alpha-value>)',
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
