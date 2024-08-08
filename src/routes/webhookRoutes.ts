import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

const MY_AUTH_TOKEN = process.env.MY_AUTH_TOKEN;
const CLIENT_AUTH_TOKEN = process.env.CLIENT_AUTH_TOKEN;

router.post("/change", async (req: Request, res: Response) => {
  const token = req.headers["authorization"];

  // Vérifiez le jeton d'authentification
  if (
    token !== `Bearer ${MY_AUTH_TOKEN}` &&
    token !== `Bearer ${CLIENT_AUTH_TOKEN}`
  ) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Récupérer le payload complet de la requête
  const payload = req.body;

  try {
    // Sauvegarder le payload complet dans la base de données
    const webhookEvent = await prisma.payload.create({
      data: {
        data: payload,
      },
    });

    res.status(200).json(webhookEvent);
  } catch (error) {
    // Affirmer que `error` est de type `Error`
    const errorMessage = (error as Error).message;
    res.status(400).json({ error: errorMessage });
  }
});

export default router;
