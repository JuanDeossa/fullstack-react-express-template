import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUsersController,
} from "./users.controller";
import { validateAccessMiddleware } from "../auth/auth.middleware";
import { validateSchema } from "../../middlewares/validateSchema.middleware";
import { createUserSchema } from "./users.schemas";

export const usersRouter = Router();

usersRouter.post(
  "/",
  [validateAccessMiddleware, validateSchema(createUserSchema)],
  createUserController
);

usersRouter.get("/", [validateAccessMiddleware], getUsersController);

usersRouter.delete("/:id", [validateAccessMiddleware], deleteUserController);
