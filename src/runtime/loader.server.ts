import { defineNitroPlugin } from 'nitropack/runtime'
import type { OfficeAddinVirtualContext } from '../core'

// @ts-expect-error virtual import
import context from '#office-addin-content'

export default defineNitroPlugin(async (nitro) => {
  const { manifests, options } = context as OfficeAddinVirtualContext

  if (!options || !options.manifests.length)
    return

  // Render manifest routes
  nitro.hooks.hook('request', (event) => {
    const manifest = manifests.find(i => i.route === event.path)

    if (manifest) {
      const headers = {
        'content-type': 'text/xml',
      }

      event.respondWith(
        new Response(manifest.content, { headers }),
      )
    }
  })

  // Inject office.js script
  nitro.hooks.hook('render:html', (html, context) => {
    const { injectOfficeJS = [] } = options
    const currentPath = context.event.path

    if (!injectOfficeJS.length)
      return

    const matches = injectOfficeJS.some(entry =>
      entry instanceof RegExp
        ? entry.test(currentPath)
        : entry === currentPath,
    )

    if (matches) {
      html.head.push(
        `<script src="https://appsforoffice.microsoft.com/lib/1/hosted/office.js"></script>`,
      )
    }
  })
})
