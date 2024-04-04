import { resolve } from 'node:path'
import { defineConfig } from 'vite'

import MonorepoENV from 'monorepo-env/vite'
import MSOfficeAddin from '../../src/vite'

export default defineConfig({
  envDir: resolve(__dirname, '..'),

  plugins: [
    MonorepoENV({
      dts: false,
    }),

    MSOfficeAddin({
      manifests: [
        {
          src: resolve(__dirname, '../../manifest.xml'),
          route: '/outlook/manifest.xml',
        },
      ],

      /** Office.js will be injected to index.html page */
      injectOfficeJS: ['/outlook.html'],

      defineENV: env => ({
        VITE_OFFICE_HOST: new URL(env.VITE_OFFICE_DOMAIN).host,
      }),
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
