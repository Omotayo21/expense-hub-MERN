/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "360px",
        md: "760px",
        lg: "1024px",
      },
    },
  },
  plugins: [],
};

