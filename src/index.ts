import express, { Request, Response } from "express";
import webhookRoutes from "./routes/webhookRoutes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Route de test pour vérifier que le serveur fonctionne
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "Success",
    message: "Bonjour depuis le serveur",
  });
});

// Utiliser le router pour la route webhook
app.use("/", webhookRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
