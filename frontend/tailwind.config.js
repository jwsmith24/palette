/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Include all source files
  ],
  theme: {
    extend: {},
  },
  safelist: ["bg-gray-200", "opacity-0 scale-75", "opacity-100 scale-100"],
  plugins: [],
};
