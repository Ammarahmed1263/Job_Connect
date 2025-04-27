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
    },
  },
  plugins: [],
  darkMode: "class",
};
