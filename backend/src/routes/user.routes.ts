import { Router } from "express";
import { createUserController } from "../controllers/user.controllers";
import { createUserSchema } from "../schemas/user.schemas";
import { validateSchema } from "../middlewares/validateSchema.middleware";
// import { createUserController } from "../controllers/user.controllers.js";

const router = Router();

router
  .post("/", validateSchema(createUserSchema), createUserController)
  .get("/", (_req, res) => {
    res.send("Users List");
  })
  .get("/:id", (req, res) => {
    res.send(`User detail: ${req.params.id}`);
  });

export default router;
