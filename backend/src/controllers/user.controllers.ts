import { NextFunction, Request, Response } from "express";
import { CreateUserType } from "../schemas/user.schemas";
import { createUserService } from "../services/user.services";

export const createUserController = async (
  req: Request<{}, {}, CreateUserType>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await createUserService({ email, password });

    res.status(201).json({
      status: "success",
      code: "CREATED",
      message: "User created successfully",
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
      },
    });
    //
  } catch (error) {
    next(error);
  }
};
