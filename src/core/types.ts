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
}

export interface OfficeAddinVirtualContext {
  options: MSOfficeAddinConfig
  manifests: GeneratedManifest[]
}