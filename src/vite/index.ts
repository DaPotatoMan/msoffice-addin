import process from 'node:process'

import type { Plugin, UserConfig } from 'vite'
import type { ManifestEntry } from './types'
import { transformManifests } from './utils'

export interface Config {
  /** Input manifests */
  inputs: ManifestEntry[]
}

export default (params: Config): Plugin => {
  let mode: string
  let viteConfig: UserConfig

  function generate() {
    return transformManifests({
      mode,
      inputs: params.inputs,
      envDir: viteConfig.envDir ?? process.cwd(),
    })
  }

  /** Get a manifest by output path */
  function getManifest(route: string) {
    const outputs = generate()
    return outputs.find(entry => entry.route === route)
  }

  return {
    name: 'vite-plugin-office-addin',
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
      const paths = params.inputs.flatMap(i => i.route)

      server.middlewares.use((req, res, next) => {
        const { url } = req

        if (url && paths.includes(url)) {
          const manifest = getManifest(url)

          if (manifest) {
            res.setHeader('content-type', 'text/xml')
            return res.end(manifest)
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
          fileName: entry.route,
          source: entry.content,
        })
      }
    },
  }
}
