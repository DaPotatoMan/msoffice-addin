import fs from 'node:fs'
import { resolve } from 'node:path'
import { loadEnv, normalizePath } from 'vite'
import type { ManifestEntry } from './types'

export function getPath(paths: string[]) {
  return normalizePath(resolve(...paths))
}

interface ManifestEntryContent extends ManifestEntry {
  content: string
}

export function transformManifests(params: {
  inputs: ManifestEntry[]
  mode: string
  envDir: string
}) {
  const entries = <ManifestEntryContent[]>[]
  const env = loadEnv(params.mode, params.envDir)

  for (const { src, output } of params.inputs) {
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
      output,
      content,
    })
  }

  return entries
}
