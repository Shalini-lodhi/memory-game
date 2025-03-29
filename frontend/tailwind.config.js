/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}", 
    ".src/pages/**/*.{js,jsx,ts,tsx}",
    ".src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gameBg: "#F6F0F0",
        cardFlipped: "#F2E2B1",
        cardDefault: "#D5C7A3",
        borderColor: "#BDB395",
      },
      transform: {
        'rotate-y-180': 'rotateY(180deg)',
      },
    },
  },
  plugins: [],
};
