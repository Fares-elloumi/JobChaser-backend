[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/wxdOTRV0)

# u08-individuell-uppgift - Skapa backend för Jobchaser

## Om projektet
Det här API:t är skapat för JobChaser, en applikation för att hantera jobbtjänster. API:t är byggt enligt REST-principerna och använder en MySQL-databas via Prisma ORM. Det har stöd för autentisering med JWT, samt CRUD-operationer för jobb, roller och användare.

## Teknologier & Verktyg
* Backend: Node.js, Express.js
* Databas: MySQL
* ORM: Prisma
* Autentisering: JWT (JSON Web Token)
* Lösenordshantering: Bcrypt
* Testning: ThunderClient
* Miljövariabler: dotenv
* Middleware: CORS, authMiddleware, validateUser

## Databasstruktur
API:t innehåller tre tabeller: Job, Role och User, med relationer mellan Job och Role.
model Job {
  id        String  @id @default(uuid())  
  position  String
  företag   String
  plats     String
  kontract  String
  roleId    String
  role      Role    @relation(fields: [roleId], references: [id], onDelete: Cascade)
}

model Role {
  id    String  @id @default(uuid())  
  name  String  @unique
  jobs  Job[]
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

## API Routes
### Autentisering
* Post("/sign-up"); Registrera en ny användare.
* Post("/sign-in"); Logga in och få en JWT-token.
* Get("/dashboard"); Skyddad route (kräver JWT).

### Användare
* Get("/users"); Hämta alla användare.
* Get("/users/:id"); Hämta en specifik användare.
* Put("/users/:id"); Uppdatera en användare.
* Delete("/users/:id"); Radera en användare.

### Jobb
* Post("/jobs"); Skapa ett nytt jobb.
* Get("/jobs"); Hämta alla jobb.
* Get("jobs/:id"); Hämta ett specifikt jobb.
* Put("jobs/:id"); Uppdatera ett jobb.
* Delete("jobs/:id"); Radera ett jobb.

### Roller
* Post("/rols"); Skapa en ny roll.
* Get("/rols"); Hämta alla roller.
* Get("rols/:id"); Hämta en specifik roll.
* Put("rols/:id"); Uppdatera en roll.
* Delete("rols/:id"); Radera en roll.

## Autentisering och Säkerhet
* JWT används för att skydda vissa routes.
* Bcrypt krypterar lösenord innan de sparas i databasen.
* Middleware authMiddleware ser till att endast auktoriserade användare kan komma åt skyddade endpoints.
* Middleware-funktionen validateUser används för att validera användarens inmatning vid registrering eller uppdatering. Den kontrollerar:
1. Att email är en giltig e-postadress.
2. Att password är minst 6 tecken långt.
3. Att inga skadliga tecken skickas in (XSS-skydd).
