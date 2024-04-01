import { resolve } from 'node:path'

export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },

  office: {
    inputs: [
      {
        src: resolve(__dirname, '../manifest.xml'),
        output: 'office-app/manifest.xml',
      },
    ],
  },
})
