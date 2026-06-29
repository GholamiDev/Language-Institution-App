import { colors } from "./src/themes/colors.ts";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: colors,
    },
  },
  plugins: [],
};

export default config;
