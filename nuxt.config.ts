// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/image",
    "nuxt-icon",
    "@pinia/nuxt",
    "@nuxtjs/supabase",
    "@vee-validate/nuxt",
    "@nuxtjs/google-fonts",
    "@formkit/auto-animate/nuxt",
    "nuxt-swiper",
    "nuxt-aos",
  ],
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: "Form",
      Field: "Field",
      FieldArray: "FieldArray",
      ErrorMessage: "ErrorMessage",
    },
  },
  pinia: {
    storesDirs: ["./store/**"],
  },

  css: ["@/assets/scss/global.scss", "@/assets/scss/animations.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/variables.scss" as *;',
        },
      },
    },
  },
  supabase: {
    url: process.env.EXPO_TECH_JUNIOR_SUPABASE_URL,
    key: process.env.EXPO_TECH_JUNIOR_SUPABASE_ANON_KEY,
    redirectOptions: {
      login: "/",
      callback: "/",
      exclude: [
        "/schedule",
        "/projects",
        "/recover-password",
        "/registration-expert",
        "/projects/*",
      ],
    },
  },
  googleFonts: {
    families: {
      "Nunito Sans": [400, 500, 600, 700, 800, 900],
    },
  },
});
