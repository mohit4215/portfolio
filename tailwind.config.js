/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./script.js"
  ],
  safelist: [
    'inline-block',
    'snappy-transition',
    'absolute',
    'text-2xl',
    'text-gray-600',
    'pointer-events-none',
    'select-none',
    'z-[1000]',
    'sm:text-6xl',
    'md:text-8xl',
    'w-4',
    'h-4'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
