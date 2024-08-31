import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUsersController,
} from "./users.controller";

export const usersRouter = Router();

usersRouter.post("/", createUserController);

usersRouter.get("/", getUsersController);

usersRouter.delete("/:id", deleteUserController);
