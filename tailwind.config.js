/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      h1: ["1.5rem"],
      h2: ["0.875rem"],
      h3: ["0.7rem"],
      p: ["0.75rem"],
    },
    colors: {
      white: "#FFFFFF",
      gray: {
        100: "#F3F4F6",
        200: "#DCDFE4",
        300: "#8F98A9",
      },
      green: {
        100: "#DCFFF1",
        200: "#216E4E",
      },
      blue: {
        100: "#E9F2FF",
        200: "#0055CC",
        300: "#172B4D",
      },
      purple: {
        100: "#DCDAF8",
        200: "#5349DA",
      },
      red: {
        200: "#FCA5A5",
        300: "#DC2626",
      },
    },
    dropShadow: {
      "purple-200": "0 4px 5px rgba(83, 73, 218, 0.6)",
      md: "0 5px 5px rgba(0, 0, 0, 0.2)",
    },
    extend: {},
  },
  plugins: [],
};
