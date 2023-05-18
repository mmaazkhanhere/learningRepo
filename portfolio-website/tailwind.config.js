/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      montserrat: "Montserrat, sans-serif",
    },
    screens: {
      xs: { max: "479px" },
      sm: { max: "639px" },
      md: { max: "767px" },
      lg: { max: "1024px" },
      xl: { max: "1279px" },
      "2xl": { max: "1353px" },
    },
    extend: {
      animation: {
        "spin-slow": "spin 8s linear infinite",
      },
      colors: {
        dark: "#1b1b1b",
        light: "#f5f5f5",
        primary: "#B63E96",
        primaryDark: "#58E6D9",
      },
      backgroundImage: {
        circularLight:
          "repeating-radial-gradient(rgba(0,0,0,0.4) 2px,#f5f5f5 5px,#f5f5f5 100px);",
        circularDark:
          "repeating-radial-gradient(rgba(255,255,255,0.5) 2px,#1b1b1b 8px,#1b1b1b 100px);",
      },
    },
  },
  plugins: [],
};
