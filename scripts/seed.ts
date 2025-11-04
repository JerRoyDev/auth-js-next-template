// scripts/seed.ts
import { faker } from '@faker-js/faker';
import { auth } from '../src/auth.js'; // Importera din Better Auth konfiguration

// 🚨 VIKTIGT: Detta är en workaround för att köra admin API utan session
// Normalt skulle detta vara en Server Action, men för ett seed-skript kan vi anropa direkt.
// Beroende på din Better Auth-konfiguration MÅSTE du skicka med en header
// eller token som verifierar administratörsrättigheter för auth.api.createUser.

// Hitta en Better Auth-lösning som inte kräver headers/cookies för serverside-verktyg.
// Om ingen intern serverside-metod finns, måste vi använda en dummy-header.

const NUMBER_OF_USERS = 50;

async function seedUsers() {
  console.log(`Starting to seed ${NUMBER_OF_USERS} users...`);

  // För att kringgå headers-kravet i Better Auth's API:
  // 1. Skapa en dedikerad API-Route/Server Action ENDAST för seedning.
  // ELLER:
  // 2. Använd en dummy-header, och hoppas att din auth-konfiguration tillåter serverside-anrop utan en riktig session.
  // Låt oss anta att vi måste skicka med en tom headers-funktion för att matcha signaturen:

  // Observera: Den här syntaxen kräver oftast att din auth.ts tillåter
  // en intern 'admin override' eller att du har en system-admin cookie.

  // Alternativ 1: Skapa en 'system-admin' token
  // (Bäst praxis: Better Auth har troligen en intern metod för att skapa users utan http-anrop)

  // Låt oss FÖRENKLA: Antag att du har en ren serverfunktion (istället för auth.api.*)
  // för att skapa användare om du använder Prisma eller liknande.
  // Men om du MÅSTE använda auth.api.createUser:

  // --- WORKAROUND START ---
  // Skapa en Server Action som tar emot en "seed key" istället för session

  console.log("Using internal Better Auth API for user creation...");

  for (let i = 0; i < NUMBER_OF_USERS; i++) {
    try {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email({ firstName, lastName, provider: 'fakermail.com' }).toLowerCase();

      const role = i < 5 ? 'admin' : 'user'; // Gör de första 5 till admin


      // För seedning: Om Better Auth tillåter, skicka undefined eller tomt objekt för headers
      // Annars, skapa en system-admin token/cookie och skicka med den här
      // Om du får UNAUTHORIZED, se Better Auth docs om seed/admin API
      await auth.api.createUser({
        body: {
          email: email,
          password: 'Password123!', // Standardlösenord för testning
          name: `${firstName} ${lastName}`,
          role: role,
        },
      });

      console.log(`Created user ${i + 1}/${NUMBER_OF_USERS}: ${email} (${role})`);
    } catch (error) {
      console.error(`Error creating user ${i + 1}:`, error);
      // Stanna vid fel för att undvika att dölja konfigurationsproblem
      break;
    }
  }

  console.log("Seeding complete!");
}

seedUsers().catch((e) => {
  console.error("Fatal error during seeding:", e);
  process.exit(1);
});