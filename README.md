# Next.js Auth.js Template

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It is a flexible authentication template using Auth.js and Prisma, supporting multiple authentication methods and database providers.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

---

## Auth.js & Prisma – Usage & Configuration

### Google OAuth (Aktuell standard i denna mall)

Den här mallen är nu konfigurerad för Google OAuth via Auth.js v5 och Prisma-adaptern.

1. Skapa OAuth‑uppgifter i Google Cloud Console:
   - Gå till: https://console.cloud.google.com/apis/credentials
   - Skapa OAuth Consent Screen (External) och lägg till din e‑post.
   - Skapa Credentials → OAuth Client ID → Web Application.
   - Authorized redirect URI (dev): `http://localhost:3000/api/auth/callback/google`
2. Kopiera Client ID & Secret till `.env.local`:
   ```env
   AUTH_GOOGLE_ID=xxxx.apps.googleusercontent.com
   AUTH_GOOGLE_SECRET=xxxx
   AUTH_SECRET= # generera: openssl rand -base64 32
   DATABASE_URL="file:./dev.db"
   ```
3. Starta om dev-servern.
4. Besök `/signin` och klicka på "Fortsätt med Google".

Credentials (e‑post + lösenord) är avvecklad i denna version. Den tidigare koden är markerad som deprecated och kan tas bort helt om du inte avser återinföra den.

### Lägga till fler OAuth Providers

- Importera t.ex. `import GitHub from "next-auth/providers/github";`
- Lägg till i `providers` i `auth.config.ts`.
- Lägg motsvarande `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` i `.env.local`.

### Session Strategy

Vi använder `database` strategy (PrismaAdapter) → sessioner lagras i tabellen `Session` (se `prisma/schema.prisma`). För enklare drift kan du byta till `jwt`, men databas-strategin underlättar spårning av aktiva sessioner och multi-device logout.

### Utökning (förslag)

- Rollfält på `User` (ex: `role String @default("USER")`).
- Migration: gör `email` obligatorisk (ta bort `?`).
- Multi-provider linking (kräver att email är verifierad/konsistent).
- Audit logging av inloggningar.
- Rate limiting i edge/middleware.

---

### How to use the auth template

1. **Choose your database:**

   - Go to `prisma/templates/` and select the schema template for your database:
     - PostgreSQL: `schema-postgres.prisma.template`
     - MySQL: `schema-mysql.prisma.template`
     - SQLite: `schema-sqlite.prisma.template`
     - MongoDB: `schema-mongodb.prisma.template`
   - Copy the template to `prisma/schema.prisma`:
     ```bash
     cp prisma/templates/schema-postgres.prisma.template prisma/schema.prisma
     ```
   - Update your `.env` file with the correct `DATABASE_URL` for your database.

2. **Run Prisma migration:**

   ```bash
   npx prisma migrate dev --name init
   ```

3. **Configure Auth.js providers:**

   - Edit `src/auth.ts` and add the providers you want to use (Google, GitHub, Credentials, etc).

4. **Environment variables:**

   - Place sensitive keys (OAuth secrets, etc) in `.env.local`.

5. **Start the development server:**
   ```bash
   npm run dev
   ```

### Tips

- You can easily switch database by copying a different schema template to `schema.prisma` and updating `.env`.
- All schema templates are kept up-to-date with Auth.js requirements.
- Update this README as you add new features or providers to the template.

---

## Prisma Schema Templates

Detta projekt innehåller färdiga Prisma-scheman för olika databaser (PostgreSQL, MySQL, SQLite, MongoDB) anpassade för Auth.js.

### Så här byter du databas

1. Välj önskad mall från `prisma/templates/`:

   - För PostgreSQL: `schema-postgres.prisma.template`
   - För MySQL: `schema-mysql.prisma.template`
   - För SQLite: `schema-sqlite.prisma.template`
   - För MongoDB: `schema-mongodb.prisma.template`

2. Kopiera mallen till `prisma/schema.prisma`:

   ```bash
   cp prisma/templates/schema-postgres.prisma.template prisma/schema.prisma
   ```

3. Kontrollera att din `DATABASE_URL` i `.env` matchar vald databas.

4. Kör migration:
   ```bash
   npx prisma migrate dev --name init
   ```

### Om Auth.js-modeller

Alla mallar innehåller de modeller som krävs för Auth.js och dess Prisma-adapter. Du kan lägga till egna fält eller modeller efter behov.

### Tips

- Uppdatera denna README när du lägger till nya mallar eller funktioner.
- Lägg till instruktioner för eventuella automatiseringsscript om du skapar sådana.

---

Senast uppdaterad: 2025-09-12
