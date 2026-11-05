import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../db.js";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "E-mail e senha são obrigatórios." });
      return;
    }

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado." });
      return;
    }

    const match = await bcrypt.compare(password, user?.password);

    if (!match) {
      res.status(401).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      cep: user.cep,
    });
  } catch (err) {
    res.status(500).json({ error: err });
    return;
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, cep } = req.body;

    if (!name || !email || !password || !cep) {
      res.status(400).json({ message: "Todos os campos são obrigatórios" });
      return;
    }

    const hash = await bcrypt.hash(password, 10);

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
      data: { name: name, email: email, password: hash, cep: cep },
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
