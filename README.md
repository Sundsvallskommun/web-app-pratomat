# Pratomaten

En AI assistent för att lämna förslag, önskemål, feedback eller liknande, vid t.ex. evenemang.

## frontend

React-app.

## backend

Databas + api

## admin


Next.js med språkstöd. Här kan du lägga till och hantera pratomater.

## Utveckling

### Krav

- Node 20.19
- Yarn

### Steg för steg

Klona ner repot till en ny mapp ""

Installera dependencies för både 'backend', 'frontend' och 'admin'.

```
cd frontend
yarn install

cd backend
yarn install

cd admin
yarn install
```

Skapa .env-fil för backend

```
cp .env.example.local .env.development.local
```

Här behövs följande läggas in:

```
INTRIC_SALT=
SAML_ENTRY_SSO=
SAML_IDP_PUBLIC_CERT=
SAML_ISSUER=
SAML_PRIVATE_KEY=
SAML_PUBLIC_KEY=
SECRET_KEY=
```

Skapa .env-fil för frontend

```
cp .env-example .env
```

Här behöver man peka åt API-urlen:

```
VITE_INTRIC_API_BASE_URL=
```

Skapa .env-fil för admin

```
cp .env-example .env
```

Här behöver man peka åt backend med rätt port, tex:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Synka data-contracts i admin

```
yarn generate:contracts
```

Initiera eventuell databas för backend

```
yarn prisma:generate
yarn prisma:migrate
```

### Språkstöd

För språkstöd används [next-i18next](https://github.com/i18next/next-i18next).

Placera dina språkfiler i `frontend/public/locales/<locale>/<namespace>.json`.

För ytterligare information om språkstöd i `admin` se [Dokumentation om Admin](./admin/README.md)

För att det ska fungera med **Next.js** och **SSR** måste du skicka med språkdatat till ServerSideProps.
Det gör du genom att lägga till följande till dina page-komponenter (behövs ej i subkomponenter).

```
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [<namespaces>])),
  },
});
```

För att lägga till ett ytterligare spåk, skapa en mapp med språkets namn, och lägg sedan till språket i `next-i18next.config.js`.

**Exempel för tyska:**
Skapa `frontend/public/locales/de/common.json`.
Ändra next-i18next.config.js:

```
module.exports = {
  i18n: {
    defaultLocale: 'sv',
    locales: ['sv', 'de'],
  },
 ...
};
```

Som hjälp i VSCode rekommenderas [i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally).
