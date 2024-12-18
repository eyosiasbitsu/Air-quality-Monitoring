/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /toast-(success|error|info|warning)/, // Match your dynamic classes
    },
  ],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#4489b9", // Replace with your blue color
        "custom-green": "#699e97", // Replace with your green color
      },
    },
  },
  plugins: [],
};
