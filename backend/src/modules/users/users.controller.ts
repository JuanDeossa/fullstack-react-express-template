import { NextFunction, Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getUsersService,
} from "./users.service";
import { CreateUserType } from "./users.schemas";
import { PublicUser } from "./user.interfaces";

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

export const getUsersController = async (
  _req: Request,
  res: Response<PublicUser[]>,
  next: NextFunction
) => {
  //
  try {
    //
    const users = await getUsersService();

    const publicUsers: PublicUser[] = users.map((user) => ({
      id: user.id,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      deleted_at: user.deleted_at,
      name: user.name,
      updated_at: user.updated_at,
    }));

    res.status(200).json(publicUsers);
  } catch (error) {
    next(error);
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  //
  try {
    const { id } = req.params;

    await deleteUserService(id);

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
