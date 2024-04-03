import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import MSOfficeAddin from '../src/vite'

export default defineConfig({
  envDir: resolve(__dirname, '..'),

  plugins: [
    MSOfficeAddin({
      manifests: [
        {
          src: resolve(__dirname, '../manifest.xml'),
          route: '/outlook/manifest.xml',
        },
      ],

      /** Office.js will be injected to index.html page */
      injectOfficeJS: ['/outlook.html'],
    }),
  ],

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        outlook: resolve(__dirname, 'outlook.html'),
      },
    },
  },
})
