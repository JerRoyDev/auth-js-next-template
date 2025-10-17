# GitHub Copilot Huvudinstruktioner: Better Auth (Komplett Referens)

Du är en expertutvecklare som använder Better Auth (BA). Den officiella källan till dokumentation är lokalt tillgänglig i mappen `docs/content/docs` i projektets arbetsyta.

## BÄSTA PRAXIS FÖR AI:

1. Prioritera svar baserade på de länkade `better-auth.com/docs/` URL:erna.
2. För djupgående kodexempel, be användaren att referera till den lokala filen via `#docs/...`.
3. BA är ramverksagnostisk (React, Next.js, Hono, etc.). Ange alltid lösningar för det ramverk som användaren arbetar med (om möjligt).

---

## 1. GRUNDLÄGGANDE (GET STARTED)

- **Introduktion & Funktioner:** Översikt över vad BA är och dess kärnfunktioner (t.ex. 2FA, Multi-tenancy).
  - URL: https://www.better-auth.com/docs/introduction
- **Installation:** Steg för att installera paketet och dess beroenden (t.ex. Drizzle ORM).
  - URL: https://www.better-auth.com/docs/installation
- **Grundläggande Användning:** Hur man skapar `auth` och `authClient` instanser.
  - URL: https://www.better-auth.com/docs/basic-usage

## 2. KONCEPT (CONCEPTS)

- **Databasstruktur:** Beskriver de nödvändiga tabellerna (`User`, `Account`, `Session`, `Verification`).
  - URL: https://www.better-auth.com/docs/concepts/database
  - _Lokal fil:_ `#docs/concepts/database.mdx`
- **CLI (Command Line Interface):** Användning av CLI för schemagenerering, initiering och diagnostik.
  - URL: https://www.better-auth.com/docs/concepts/cli
  - _Lokal fil:_ `#docs/concepts/cli.mdx`
- **Sessionshantering:** Hur tokens och sessionsdata lagras och valideras.
  - URL: https://www.better-auth.com/docs/concepts/session
  - _Lokal fil:_ `#docs/concepts/session-management.mdx`

## 3. AUTENTISERING & FLÖDEN (AUTH FLOW)

- **Login med E-post & Lösenord:** Implementering av inloggningsformulär och `signIn`-metoden.
  - URL: https://www.better-auth.com/docs/auth-flow/login
  - _Lokal fil:_ `#docs/authentication/email-password.mdx`
- **Registrering (Signup):** Skapa nya användare med `signUp`-metoden.
  - URL: https://www.better-auth.com/docs/auth-flow/register
  - _Lokal fil:_ `#docs/authentication/email-password.mdx` (registrering hanteras ofta i samma fil)
- **Social Inloggning (OAuth):** Konfiguration och hantering av externa providers (Google, GitHub, etc.).
  - URL: https://www.better-auth.com/docs/auth-flow/social-login
  - _Lokal fil:_ `#docs/authentication/google.mdx`, `#docs/authentication/github.mdx` etc.
- **Magic Link (Lösenordslös):** Flöde för inloggning via e-postlänk.
  - URL: https://www.better-auth.com/docs/auth-flow/magic-link
  - _Lokal fil:_ `#docs/plugins/magic-link.mdx`
- **Tvåfaktorsautentisering (2FA):** Aktivering och verifiering.
  - URL: https://www.better-auth.com/docs/auth-flow/2fa
  - _Lokal fil:_ `#docs/plugins/2fa.mdx`

## 4. ANVÄNDARHANTERING (USER MANAGEMENT)

- **Hämta Användardata:** Användning av `useSession` (klient) och `auth.api.getSession` (server).
  - URL: https://www.better-auth.com/docs/user-management/data
  - _Lokal fil:_ `#docs/concepts/users-accounts.mdx`
- **Uppdatera Profil:** Metoder för att ändra användarinformation (namn, e-post, lösenord).
  - URL: https://www.better-auth.com/docs/user-management/update-profile
  - _Lokal fil:_ `#docs/concepts/users-accounts.mdx`
- **Återställning av Lösenord:** Detaljer om `resetPassword` och tokenhantering.
  - URL: https://www.better-auth.com/docs/user-management/reset-password
  - _Lokal fil:_ `#docs/plugins/email-otp.mdx` (eller relevant plugin för återställning)
- **E-postverifiering:** Verifiering av användarens e-postadress.
  - URL: https://www.better-auth.com/docs/user-management/email-verification
  - _Lokal fil:_ `#docs/concepts/email.mdx`

## 5. AVANCERAT & INTEGRATION

- **Errorhantering (Felsökning):** Detaljer om hur man fångar upp och hanterar fel från API:et (t.ex. vid inloggning).
  - URL: https://www.better-auth.com/docs/error-handling
  - _Lokal fil:_ `#docs/reference/faq.mdx` (eller relevant felsökningssektion)
- **Auktorisation (Authorization):** Hantering av roller och behörigheter (RBAC).
  - URL: https://www.better-auth.com/docs/authorization
  - _Lokal fil:_ `#docs/concepts/plugins.mdx` (eller relevant RBAC-dokumentation)
- **Säkerhet:** Konfigurationsalternativ för headers, CORS och rate limiting.
  - URL: https://www.better-auth.com/docs/security
  - _Lokal fil:_ `#docs/concepts/rate-limit.mdx`

### 6. PLUGINS & GUIDER (Plugins & Guides)

- **Organization Plugin:** Hantering av Multi-tenancy, organisationer och inbjudningar.
  - URL: https://www.better-auth.com/docs/plugins/organization
  - _Lokal fil:_ `#docs/plugins/organization.mdx`
- **Migrationsguider (t.ex. NextAuth.js):** Specifika guider för att byta från andra ramverk.
  - URL: https://www.better-auth.com/docs/guides/next-auth-migration-guide
  - _Lokal fil:_ `#docs/guides/next-auth-migration-guide.mdx`
- **Ramverksspecifika Handlers (Adapters):** Dokumentation för Next.js, SvelteKit, Hono, etc.
  - URL: Se sektioner under `Installation` och `Basic Usage`.

---

**ANVÄND SÅ HÄR:**

När du ställer en fråga till Copilot i VS Code, använd alltid **`#`** för att peka på filen i din lokala Better Auth-mapp.

_Exempel:_

> "Jag vill lägga till ett anpassat fält i användarschemat. Hur gör jag det enligt filen \#docs/concepts/database.mdx?"
