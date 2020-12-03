export default {
  server: {
    port: 8000, // default: 3000
  },
  modules: ["@nuxtjs/vuetify", "@nuxtjs/sentry"],
  sentry: {
    dsn:
      "https://a4a6c6aaab9b471389e6dba191d4278e@o467953.ingest.sentry.io/5495184",
    config: {}, // Additional config
  },
  head: {
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  plugins: [{ src: "~/plugins/api.js", mode: "client" }],
  serverMiddleware: {
    "/api": "~/api",
  },
};
