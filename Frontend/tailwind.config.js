/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#2179E1", // Replace with your blue color
        "custom-green": "#10b981", // Replace with your green color
      },
    },
  },
  plugins: [],
};
