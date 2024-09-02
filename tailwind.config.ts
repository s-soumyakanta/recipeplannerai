import type { Config } from "tailwindcss";

const config: Config = {
  darkMode:"class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation:{
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes:{
        "infinit-scroll":{
          from:{transrom:"translateX(0)"},
          to:{transform:"translateX(-100%)"}
        }
      }
    },
  },
  plugins: [],
};
export default config;
