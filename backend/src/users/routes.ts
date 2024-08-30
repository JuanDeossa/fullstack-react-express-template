import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Router } from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
  //
  try {
    const { email, password, name } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(400).json({ error: "El usuario ya está registrado" });
      }
    }
    return res.status(500).json({ error: "Internal server error" });
  }
});

usersRouter.get("/", async (_req, res) => {
  //
  try {
    const users = await prisma.user.findMany();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

usersRouter.delete("/:id", async (req, res) => {
  //
  try {
    const { id } = req.params;

    await prisma.user.delete({ where: { id: id } });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});
