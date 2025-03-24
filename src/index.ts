import express from "express";
import cors from "cors";
import jobRoutes from "./routes/jobRoutes";
import rolRoutes from "./routes/rolRoutes";
import dotenv from "dotenv";
import { prisma } from "./config/db"
import userRoutes from "./routes/userRoutes";

dotenv.config();
console.log(process.env.DATABASE_URL)

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/jobs", jobRoutes);
app.use("/rols", rolRoutes );
app.use("/", userRoutes);

const main = async () => {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

