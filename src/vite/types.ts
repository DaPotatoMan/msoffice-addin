export interface ManifestEntry {
  src: string

  /**
   * Where manifest will be generated as `{domain}/{route}`
   */
  route: `/${string}.xml`
}

export interface ManifestEntryContent extends ManifestEntry {
  content: string
}

export interface MSOfficeAddinConfig {
  /** Input manifests */
  inputs: ManifestEntry[]

  /** Routes where office.js will be injected */
  injectRoutes: (string | RegExp)[]
}

export interface OfficeAddinVirtualContext {
  options: MSOfficeAddinConfig
  manifests: ManifestEntryContent[]
}
