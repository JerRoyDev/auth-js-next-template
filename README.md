# Next.js Better Auth Starter

> A modern, production-ready Next.js starter template with Better Auth authentication, Prisma ORM, and shadcn/ui components

[![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?style=flat-square&logo=next.js)](https://nextjs.org/) [![Better Auth](https://img.shields.io/badge/Better_Auth-1.3-blue?style=flat-square)](https://www.better-auth.com/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/) [![Prisma](https://img.shields.io/badge/Prisma-6.18-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)

## ✨ Features

### 🔐 Authentication with Better Auth

- **Email/Password Authentication** with email verification
- **OAuth Providers**: GitHub, Google (easily extensible)
- **Admin Plugin** for user management
- **Session Management** with device tracking
- **Role-Based Access Control** (User/Admin roles)
- **Server Actions** for secure authentication flows

### 🎨 UI/UX

- **shadcn/ui** components with Tailwind CSS
- **Dark Mode** support with next-themes
- **Responsive Design** with mobile-first approach
- **Modern Landing Page** with hero section
- **Protected Routes** with middleware
- **Admin Dashboard** for user management

### 🛠️ Developer Experience

- **TypeScript** for type safety
- **Prisma ORM** for database management
- **ESLint** for code quality
- **Turbopack** for fast development
- **Database Seeding** with Faker.js

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- PostgreSQL/MySQL/SQLite database (or use Prisma Postgres)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Jryolsn/next-betterauth-starter.git
   cd next-betterauth-starter
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your database URL and OAuth credentials:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
   BETTER_AUTH_SECRET="your-secret-key"
   BETTER_AUTH_URL="http://localhost:3000"

   # OAuth (optional)
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # Email (optional - for email verification)
   RESEND_API_KEY="your-resend-api-key"
   ```

4. **Set up the database**

   ```bash
   npx prisma migrate dev
   npm run seed  # Optional: seed with test data
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
.
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── src/
│   ├── app/
│   │   ├── (auth)/           # Authentication pages (signin, register, verify-email)
│   │   ├── (main)/           # Public pages (home, about, contact, faq)
│   │   ├── (protected)/      # Protected pages (dashboard, admin)
│   │   └── api/auth/         # Better Auth API routes
│   ├── components/
│   │   ├── auth/             # Auth-related components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── header/           # Header components
│   │   └── sidebar/          # Sidebar components
│   ├── lib/
│   │   ├── auth/             # Auth configuration and utilities
│   │   ├── email/            # Email provider setup
│   │   └── prisma.ts         # Prisma client
│   ├── auth.ts               # Better Auth configuration
│   └── middleware.ts         # Next.js middleware for auth
└── scripts/
    └── seed.ts               # Database seeding script
```

## 🔧 Configuration

### Database

This template uses Prisma with support for multiple databases. Switch between:

- PostgreSQL (default)
- MySQL
- SQLite
- MongoDB

See `prisma/templates/` for different schema templates.

### Authentication Providers

Add more OAuth providers in `src/auth.ts`:

```typescript
import { betterAuth } from 'better-auth';
import { twitter, discord, microsoft } from 'better-auth/providers';

export const auth = betterAuth({
  socialProviders: {
    github: {
      /* ... */
    },
    google: {
      /* ... */
    },
    twitter: {
      /* ... */
    }, // Add more providers
  },
});
```

## 🎯 Key Features Explained

### Better Auth vs Auth.js

This starter uses [Better Auth](https://www.better-auth.com/) instead of Auth.js because:

- **More flexible** plugin system
- **Better TypeScript** support
- **Simpler configuration**
- **Built-in admin features**
- **Active development** and modern architecture

### Admin Dashboard

The admin dashboard (`/admin`) includes:

- User management (view, edit, delete)
- Role management
- Session tracking
- User statistics

Only accessible to users with `admin` role.

### Protected Routes

Middleware handles authentication:

- Public routes: `/`, `/about`, `/contact`, `/faq`
- Auth routes: `/signin`, `/register`, `/verify-email`
- Protected routes: `/dashboard`, `/admin/*`
- API routes: `/api/auth/*`

## 📝 Scripts

```bash
npm run dev        # Start development server with Turbopack
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run seed       # Seed database with test data
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

Make sure to:

- Set `BETTER_AUTH_URL` to your production URL
- Update OAuth redirect URIs
- Set up a production database

### Other Platforms

This starter works on any platform that supports Next.js:

- Netlify
- Railway
- Render
- AWS
- DigitalOcean

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this starter for your projects!

## 🙏 Acknowledgments

- [Better Auth](https://www.better-auth.com/) for the authentication library
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Prisma](https://www.prisma.io/) for the database toolkit
- [Next.js](https://nextjs.org/) for the React framework

---

**Built with ❤️ by [Jryolsn](https://github.com/Jryolsn)**
