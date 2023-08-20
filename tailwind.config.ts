import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
      },
    },
  },
  plugins: [require("tailwindcss-radix-colors")], // https://www.radix-ui.com/colors/docs/palette-composition/scales
} satisfies Config;
