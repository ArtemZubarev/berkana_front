import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

export default {
  theme: {
    extend: {
      fontFamily: {
        // manrope: ["Manrope", defaultTheme.fontFamily.sans],
        sans: ["Manrope"],
        serif: ["Manrope"],
        // manrope: "Oswald, ui-serif",
        // custom: ["Manrope", "sans-serif"],
        // serif: ["Manrope"],
        // mono: ["Manrope"],
        // display: ["Manrope"],
        // body: ["Manrope"],
      },
      textColor: {
        primary: "#d13af4",
        secondary: "#d13af4",
        foreground: "#d13af4",
      },
    },
  },
};
