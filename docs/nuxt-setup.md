# Nuxt Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add msoffice-addin
```

#### Define manifest file

https://github.com/DaPotatoMan/msoffice-addin/blob/145a4a7e66c66a46180cd0fdff77e3fa209ae768/manifest.xml#L1-L17

#### Define .env file

```env
VITE_OFFICE_ID=c6890c26-5bbb-40ed-a321-37f07909a2f0
VITE_OFFICE_DOMAIN=https://www.contoso.com
VITE_OFFICE_PROVIDER_NAME=Contoso, Ltd
VITE_OFFICE_DISPLAY_NAME=Contoso App
VITE_OFFICE_DESCRIPTION=Office add-in for Contoso App
```

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
  },
})
```

That's it! You can now use msoffice-addin in your Nuxt app ✨
