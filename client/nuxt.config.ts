import { defineNuxtConfig } from 'nuxt/config'
import { resolve } from 'path'

export default defineNuxtConfig({
  typescript: {
    strict: true
  },

  css: ['~/assets/scss/main.scss'],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000',
      apiVersion: process.env.NUXT_PUBLIC_API_VERSION || 'v1',
    }
  },

  alias: {
    '@models': resolve(__dirname, 'models'),
    '@constants': resolve(__dirname, 'constants'),
    '@services': resolve(__dirname, 'services'),
    '@utils': resolve(__dirname, 'utils'),
  },

  nitro: {},

  app: {
    head: {
      title: 'Merkle Games App',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Browse, search, and filter games across genres and platforms.' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
      ],
    }
  },
})
