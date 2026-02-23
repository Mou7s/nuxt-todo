// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  ui: {
    icons: ['mdi'],
  },
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
});
