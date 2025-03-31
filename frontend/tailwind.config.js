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
      animation: {
        fadeUp: "fadeUp 0.7s ease-out",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 1, transform: "translateY(0px)" },
          "100%": { opacity: 0, transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
