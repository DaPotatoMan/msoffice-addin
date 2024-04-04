# Nuxt Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add msoffice-addin
```

#### Define manifest file

<https://github.com/DaPotatoMan/msoffice-addin/blob/f2d8b46cbf68873828e64cd176e445b344c4094a/manifest.xml#L1-L26>

#### Define .env file

<https://github.com/DaPotatoMan/msoffice-addin/blob/57892cc4e1c06f7dfe45685e53ede7207cf11ec2/.env.local#L1-L5>

#### Update config

```ts
export default defineNuxtConfig({
  modules: ['msoffice-addin'],

  msOfficeAddin: {
    manifests: [
      {
        src: 'manifest.xml',
        route: '/outlook/manifest.xml',
      },
    ],

    /** Office.js will be injected to index.html page */
    injectOfficeJS: ['/'],

    defineENV: env => ({
      VITE_OFFICE_HOST: new URL(env.VITE_OFFICE_DOMAIN).host,
    }),
  },
})
```

That's it! You can now use msoffice-addin in your Nuxt app ✨

[Learn more about configuration](./config.md)
