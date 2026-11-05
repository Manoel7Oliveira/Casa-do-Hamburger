import express, { type Request, type Response } from "express";
import { connectToDatabase } from "./src/db.js";
import { prisma } from "./src/db.js";
import cors from "cors";
import e from "express";

const app = express();
app.use(express.json());
app.use(cors());
connectToDatabase();

app.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "E-mail e senha são obrigatórios." });
      return;
    }
    const user = await prisma.user.findFirst({
      where: { email, password },
    });

    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado." });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
    return;
  }
});

app.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password, cep } = req.body;

    if (!name || !email || !password || !cep) {
      res.status(400).json({ message: "Todos os campos são obrigatórios" });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (user?.email) {
      res.status(409).json({ message: "E-mail já cadastrado" });
      return;
    }

    const newUser = await prisma.user.create({
      data: { name: name, email: email, password: password, cep: cep },
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.listen(4000, () => {
  console.log("Rodando na porta 4000");
});
