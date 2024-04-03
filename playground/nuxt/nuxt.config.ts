import { resolve } from 'node:path'

const root = resolve(__dirname, '../..')

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'monorepo-env',
    resolve(root, 'src/module'),
  ],

  msOfficeAddin: {
    manifests: [
      {
        src: resolve(root, 'manifest.xml'),
        route: '/office-app/manifest.xml',
      },
      {
        src: resolve(root, 'manifest.xml'),
        route: '/office-app-alt/manifest.xml',
      },
    ],

    injectOfficeJS: ['/'],
  },
})
