# Vite Setup

Install the dependency:

```bash
pnpm add -D msoffice-addin
```

#### Define manifest file

```xml
<!-- manifest.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<OfficeApp xmlns="http://schemas.microsoft.com/office/appforoffice/1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="TaskPaneApp">
  <Id>{VITE_OFFICE_ID}</Id>
  <Version>1.0</Version>
  <ProviderName>{VITE_OFFICE_PROVIDER_NAME}</ProviderName>
  <DefaultLocale>en-US</DefaultLocale>
  <DisplayName DefaultValue="{VITE_OFFICE_DISPLAY_NAME}" />
  <Description DefaultValue="{VITE_OFFICE_DESCRIPTION}"/>
  <SupportUrl DefaultValue="{VITE_OFFICE_DOMAIN}/support" />
  <AppDomains>
    <AppDomain>{VITE_OFFICE_DOMAIN}</AppDomain>
  </AppDomains>
  <DefaultSettings>
    <SourceLocation DefaultValue="https://www.contoso.com/search_app/Default.aspx" />
  </DefaultSettings>
  <Permissions>ReadWriteDocument</Permissions>
</OfficeApp>
```

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
      injectOfficeJS: true
    }),
  ],
})
```

That's it! You can now use msoffice-addin in your Nuxt app ✨
