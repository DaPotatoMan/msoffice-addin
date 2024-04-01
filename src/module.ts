import process from 'node:process'
import path from 'node:path'
import fs from 'fs-extra'

import { createResolver, defineNuxtModule } from '@nuxt/kit'
import { transformManifests } from './vite/utils'
import type { Config } from './vite'

export default defineNuxtModule<Config>({
  meta: {
    name: 'msoffice-addin',
    configKey: 'office',
  },
  setup(options, nuxt) {
    const { vite } = nuxt.options
    const { resolve } = createResolver(import.meta.url)
    const publicDir = resolve('./runtime/public')

    const manifests = transformManifests({
      mode: vite.mode!,
      envDir: vite.envDir ?? process.cwd(),
      inputs: options.inputs,
    })

    nuxt.hook('nitro:config', async (nitro) => {
      // Cleanup dir
      fs.ensureDirSync(publicDir)
      fs.emptyDir(publicDir)

      // Generate files
      manifests.forEach((entry) => {
        fs.outputFileSync(
          path.resolve(publicDir, entry.output),
          entry.content,
        )
      })

      nitro.publicAssets ||= []
      nitro.publicAssets.push({
        dir: publicDir,
        maxAge: 60 * 60 * 24 * 365, // 1 year
      })
    })

    nuxt.hook('close', () => {
      fs.emptyDir(publicDir)
    })
  },
})
