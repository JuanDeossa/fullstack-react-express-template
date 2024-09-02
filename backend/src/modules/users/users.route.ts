import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUsersController,
} from "./users.controller";
import { validateAccessMiddleware } from "../auth/auth.middleware";
import { validateSchema } from "../../middlewares/validateSchema.middleware";
import { createUserSchema } from "./users.schemas";
import { validateRole } from "../../middlewares/validateRole.middleware";

export const usersRouter = Router();

usersRouter.post(
  "/",
  [
    validateAccessMiddleware,
    validateRole(["DEVELOPER", "SUPER_ADMIN", "ADMIN"]),
    validateSchema(createUserSchema),
  ],
  createUserController
);

usersRouter.get(
  "/",
  [
    validateAccessMiddleware,
    validateRole(["DEVELOPER", "SUPER_ADMIN", "ADMIN", "USER"]),
  ],
  getUsersController
);

usersRouter.delete(
  "/:id",
  [
    validateAccessMiddleware,
    validateRole(["DEVELOPER", "SUPER_ADMIN", "ADMIN"]),
  ],
  deleteUserController
);
