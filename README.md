# Pratomaten

En AI-assistent för att lämna förslag, önskemål, feedback eller liknande, vid t.ex. evenemang.

## Frontend

React-app med Next.Js och TypeScript.

## Backend

Databas + API.

## Admin

Lägg till och hantera pratomater.

## Utveckling

### Krav

- Node 20.19
- Yarn

### Steg för steg

Klona ner repot till en ny mapp ""

Installera dependencies för både backend, frontend och admin.

```
Yarn install
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

Initiera eventuell databas för backend

```
yarn prisma:generate
yarn prisma:migrate
```
