/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";
import tailwindcssAspectRatio from "tailwindcss-aspect-ratio";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        stone: {
          400: "#A8A29E",
        },
      },
    },
    aspectRatio: {
      "1/1": "100%",
    },
  },
  variants: {
    extend: {
      textColor: ["placeholder"],
    },
  },
  plugins: [forms, tailwindcssAspectRatio],
};
