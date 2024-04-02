import type { OfficeAddinVirtualContext } from '../vite/types'

// @ts-expect-error virtual import
import context from '#office-addin-content'

export default defineNitroPlugin(async (nitroApp) => {
  const { manifests, options } = context as OfficeAddinVirtualContext
  const OFFICE_JS_URL = 'https://appsforoffice.microsoft.com/lib/1.1/hosted/office.js'

  if (!options || !options.manifests.length)
    return

  // Generate routes
  for (const entry of manifests) {
    nitroApp.router.get(entry.route, (event) => {
      event.node.res.setHeader('content-type', 'text/xml')
      return event.node.res.end(entry.content)
    })
  }

  // Inject office.js script
  nitroApp.hooks.hook('render:html', (html, context) => {
    const { injectRoutes = [] } = options
    const currentPath = context.event.path

    if (!injectRoutes.length)
      return

    const matches = injectRoutes.some(entry =>
      entry instanceof RegExp
        ? entry.test(currentPath)
        : entry === currentPath,
    )

    if (matches)
      html.head.push(`<script src="${OFFICE_JS_URL}" async defer></script>`)
  })
})
