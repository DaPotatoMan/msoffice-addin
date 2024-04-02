import process from 'node:process'

import { addPrerenderRoutes, addServerPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'

import { transformManifests } from './vite/utils'
import type { MSOfficeAddinConfig } from './vite/types'

export default defineNuxtModule<MSOfficeAddinConfig>({
  meta: {
    name: 'msoffice-addin',
    configKey: 'msOfficeAddin',
  },

  setup(options, nuxt) {
    const { vite } = nuxt.options
    const { resolve } = createResolver(import.meta.url)

    const manifests = transformManifests({
      mode: vite.mode!,
      envDir: vite.envDir ?? process.cwd(),
      inputs: options.manifests,
    })

    const contextImportKey = '#office-addin-content'
    const context = `export default ${JSON.stringify({ manifests, options })}`

    // Set manifest routes to pre-rendering
    addPrerenderRoutes(
      manifests.flatMap(entry => entry.route),
    )

    // Register nitro plugin
    addServerPlugin(resolve('./runtime/loader.server'))

    nuxt.hook('nitro:config', async (nitro) => {
      nitro.virtual ||= {}
      nitro.virtual[contextImportKey] = context
    })
  },
})
