/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Include all source files
  ],
  theme: {
    extend: {},
  },
  safelist: [
    'bg-red-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-gray-200',
    'opacity-0 scale-75',
    'opacity-100 scale-100',
  ],
  plugins: [],
};
