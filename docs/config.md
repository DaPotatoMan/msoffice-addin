## Configuration

### `manifests`

- **Type:** `ManifestEntry[]`
- **Description:** An array of manifest entries that define the input manifests for the Office Add-in.

### `injectOfficeJS`

- **Type:** `(string | RegExp)[]`
- **Description:** An array of strings or regular expressions that specify the routes where the `office.js` library should be injected.

### `defineENV`

- **Type:** `(env: Readonly<ImportMetaEnv & object>) => Record<EnvKey, string>`
- **Description:** An optional hook function that allows you to define additional environment variables for your application. The function takes an `env` parameter, which is an object containing the environment variables loaded from your environment. The function should return an object with environment variables, where the keys must be prefixed with either `NUXT_` or `VITE_`.

## Usage

To configure the Microsoft Office Add-in in your Nuxt.js application, you can create a `nuxt.config.ts` file in the root of your project and add the following configuration:

```ts
export default defineNuxtConfig({
  msOfficeAddin: {
    manifests: [
      // Add your manifest entries here
    ],
    injectOfficeJS: [
      // Add your routes where office.js should be injected
    ],
    // Optionally, define additional environment variables
    defineENV: env => ({
      VITE_VAR_DATA: 'my-value',
      VITE_DYNAMIC_DATA: env.VITE_VAR.replace('content', 'new content'),
    }),
  },
})
