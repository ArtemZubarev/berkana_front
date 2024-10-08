const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", defaultTheme.fontFamily.sans],
        // custom: ["Manrope", "sans-serif"],
        // serif: ["Manrope"],
        // mono: ["Manrope"],
        // display: ["Manrope"],
        // body: ["Manrope"],
      },
    },
  },
};
