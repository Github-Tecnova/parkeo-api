import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

/* async function main() {
  const newUser = await prisma.user.create({
    data: {
      email: "maelclou11@hotmail.com",
      name: "Mael",
      password: "qwerty",
    },
  });

  console.log("New user created:", newUser);
}

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); */

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "Success",
    message: "Bonjour depuis le serveur",
  });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
