type EnvKey = `VITE_${string}` | `NUXT_${string}`

export interface ManifestEntry {
  src: string

  /**
   * Where manifest will be generated as `{domain}/{route}`
   */
  route: `/${string}.xml`
}

/** Generated manifest */
export interface GeneratedManifest extends ManifestEntry {
  content: string
}

export interface MSOfficeAddinConfig {
  /** Input manifests */
  manifests: ManifestEntry[]

  /** Routes where office.js will be injected */
  injectOfficeJS: (string | RegExp)[]

  /**
   * Use this hook to define additional env variables.
   * Variables must be prefixed with `NUXT_` or `VITE_`
   * @param env ENV variables loaded from your environment
   */
  defineENV?: (env: Readonly<ImportMetaEnv & object>) => Record<EnvKey, string>
}

export interface OfficeAddinVirtualContext {
  options: MSOfficeAddinConfig
  manifests: GeneratedManifest[]
}
