# Vite Setup

Install the dependency:

```bash
pnpm add -D msoffice-addin
```

#### Define manifest file

https://github.com/DaPotatoMan/msoffice-addin/blob/145a4a7e66c66a46180cd0fdff77e3fa209ae768/manifest.xml#L1-L17

#### Define .env file

https://github.com/DaPotatoMan/msoffice-addin/blob/57892cc4e1c06f7dfe45685e53ede7207cf11ec2/.env.local#L1-L5

#### Update config

```ts
import MSOfficeAddin from 'msoffice-addin/vite'

export default defineConfig({
  plugins: [
    MSOfficeAddin({
      manifests: [
        {
          src: 'manifest.xml',
          route: '/outlook/manifest.xml',
        },
      ],

      /** Office.js will be injected to index.html page */
      injectOfficeJS: ['/index.html']
    }),
  ],
})
```

That's it! You can now use msoffice-addin in your Nuxt app ✨
