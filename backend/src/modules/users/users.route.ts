import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUsersController,
} from "./users.controller";
import { validateAccessMiddleware } from "../auth/auth.middleware";

export const usersRouter = Router();

usersRouter.post("/", createUserController);

usersRouter.get("/", validateAccessMiddleware, getUsersController);

usersRouter.delete("/:id", deleteUserController);
