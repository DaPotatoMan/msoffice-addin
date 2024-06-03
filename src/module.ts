import process from 'node:process'
import { addPrerenderRoutes, addServerPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { type MSOfficeAddinConfig, serialize, transformManifests } from './core'

export default defineNuxtModule<MSOfficeAddinConfig>({
  meta: {
    name: 'msoffice-addin',
    configKey: 'msOfficeAddin',
  },

  setup(options, nuxt) {
    const { vite } = nuxt.options
    const { resolve } = createResolver(import.meta.url)

    // Register nitro plugin
    addServerPlugin(resolve('./runtime/loader.server'))

    nuxt.hooks.hookOnce('nitro:config', async (nitro) => {
      const manifests = transformManifests({
        mode: vite.mode!,
        envDir: vite.envDir ?? process.cwd(),
        inputs: options.manifests,
        defineENV: options.defineENV,
      })

      // Set manifest routes to pre-rendering
      addPrerenderRoutes(
        manifests.flatMap(entry => entry.route),
      )

      // Add virtual file
      nitro.virtual ||= {}
      nitro.virtual['#office-addin-content'] = `export default ${serialize({ manifests, options })}`
    })
  },
})
