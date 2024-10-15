// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["./assets/css/main.css"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts"],
  tailwindcss: {
    configPath: "./tailwind.config.ts",
  },
  googleFonts: {
    families: {
      Roboto: true,
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.API_URL,
    },
  },
});
