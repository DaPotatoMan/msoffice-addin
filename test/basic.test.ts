import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils/e2e'
import { OFFICE_JS_URL } from '../src/core'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('../playground/nuxt', import.meta.url)),
  })

  it('renders office manifest', () => {
    expect($fetch('/office-app/manifest.xml'))
      .resolves.toMatchSnapshot()
  })

  it('injects office.js code', () => {
    expect($fetch('/'))
      .resolves
      .toContain(OFFICE_JS_URL)

    expect($fetch('/404.html'))
      .resolves
      .not.toContain(OFFICE_JS_URL)
  })
})
