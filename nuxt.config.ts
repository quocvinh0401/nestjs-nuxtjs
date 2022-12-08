const config = {
  srcDir: 'frontend/',
  rootDir: '.',
  buildDir: '.frontend',
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.BACKEND_LISTEN
    }
  },
  css: ['~/assets/css/tailwind.css'],
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      title: 'Social Media'
    }
  }
};

export default config
