import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../playground', import.meta.url)),
  })

  it('renders office manifest', () => {
    expect($fetch('/office-app/manifest.xml'))
      .resolves.toMatchSnapshot()
  })

  it('injects office.js code', () => {
    const SCRIPT_URL = 'https://appsforoffice.microsoft.com/lib/1.1/hosted/office.js'

    expect($fetch('/'))
      .resolves
      .toContain(SCRIPT_URL)

    expect($fetch('/404.html'))
      .resolves
      .not.toContain(SCRIPT_URL)
  })
})
