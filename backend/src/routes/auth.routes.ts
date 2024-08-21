import express from "express";
import {
  loginController,
  logoutController,
  refreshTokenController,
  registerUserController,
} from "../controllers/auth.controllers";
import { createUserSchema } from "../schemas/user.schemas";
import { validateSchema } from "../middlewares/validateSchema.middleware";
import { loginSchema } from "../schemas/auth.schemas";
import { validateRefreshMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

// Ruta pública para registrar un usuario
router.post(
  "/register",
  validateSchema(createUserSchema),
  registerUserController
);

// Ruta pública para iniciar sesión
router.post("/login", validateSchema(loginSchema), loginController);

// Ruta privada para cerrar sesión
router.post("/logout", validateRefreshMiddleware, logoutController);

// Ruta privada para renovar el access token usando el refresh token
router.post(
  "/refresh-token",
  validateRefreshMiddleware,
  refreshTokenController
);

export default router;
