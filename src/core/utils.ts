import fs from 'node:fs'
import { resolve } from 'node:path'
import { loadEnv } from 'vite'
import type { GeneratedManifest, MSOfficeAddinConfig, ManifestEntry } from './types'

export const OFFICE_JS_URL = 'https://appsforoffice.microsoft.com/lib/1.1/hosted/office.js'
export const OFFICE_JS_LOADER_SNIPPET = `<script src="${OFFICE_JS_URL}" async defer></script>`

export function transformManifests(params: {
  inputs: ManifestEntry[]
  mode: string
  envDir: string
  defineENV?: MSOfficeAddinConfig['defineENV']
}) {
  const entries = <GeneratedManifest[]>[]
  const env = loadEnv(params.mode, params.envDir)

  // Configure env variables
  if (params.defineENV) {
    const data = params.defineENV({ ...env } as any)
    Object.assign(env, data)
  }

  for (const { src, route } of params.inputs) {
    const absoluteSrc = resolve(src)

    if (!fs.existsSync(src)) {
      console.warn(`Office manifest not found in: ${absoluteSrc}. Ignored entry.`)
      continue
    }

    /** Raw manifest content */
    const manifest = fs.readFileSync(src).toString('utf-8')

    /** Transformed manifest content */
    const content = manifest.replaceAll(/{(VITE|NUXT)_.*?}/gm, (pattern) => {
      const key = pattern.replace(/{|}/gm, '')

      if (key in env)
        return env[key]

      console.warn(`${key} not found in env variables but used in manifest: ${absoluteSrc}`)
      return pattern
    })

    entries.push({
      src,
      route,
      content,
    })
  }

  return entries
}
