import { resolve } from 'node:path'

export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },

  msOfficeAddin: {
    manifests: [
      {
        src: resolve(__dirname, '../manifest.xml'),
        route: '/office-app/manifest.xml',
      },
      {
        src: resolve(__dirname, '../manifest.xml'),
        route: '/office-app-alt/manifest.xml',
      },
    ],

    injectOfficeJS: ['/'],
  },
})
