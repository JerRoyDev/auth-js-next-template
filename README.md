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

Senast uppdaterad: 2025-09-09
