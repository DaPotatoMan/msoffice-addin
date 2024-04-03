import process from 'node:process'

import type { Plugin, UserConfig } from 'vite'
import type { MSOfficeAddinConfig } from './types'
import { transformManifests } from './utils'

export default function MSOfficeAddin(params: MSOfficeAddinConfig): Plugin {
  let mode: string
  let viteConfig: UserConfig

  function generate() {
    return transformManifests({
      mode,
      inputs: params.manifests,
      envDir: viteConfig.envDir ?? process.cwd(),
    })
  }

  /** Get a manifest by output path */
  function getManifest(route: string) {
    const outputs = generate()
    return outputs.find(entry => entry.route === route)
  }

  return {
    name: 'msoffice-addin-vite',
    enforce: 'post',

    async config(config, env) {
      config.server = {
        ...config.server,

        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }

      mode = env.mode
      return viteConfig = config
    },

    configureServer(server) {
      const paths = params.manifests.flatMap(i => i.route)

      server.middlewares.use((req, res, next) => {
        const { url } = req

        if (url && paths.includes(url as any)) {
          const manifest = getManifest(url)

          if (manifest) {
            res.setHeader('content-type', 'text/xml')
            return res.end(manifest.content)
          }
        }

        next()
      })
    },

    generateBundle() {
      const manifests = generate()

      for (const entry of manifests) {
        this.emitFile({
          type: 'asset',
          fileName: entry.route.slice(1),
          source: entry.content,
        })
      }
    },
  }
}
