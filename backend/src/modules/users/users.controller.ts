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
  const { email, password, name } = req.body;

  try {
    const user = await createUserService({ email, password, name });

    const publicUser: PublicUser = {
      id: user.id,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
      deleted_at: user.deleted_at,
      name: user.name,
    };

    res.status(201).json({
      status: "success",
      code: "CREATED",
      message: "User created successfully",
      data: publicUser,
    });
    //
  } catch (error) {
    next(error);
  }
};

export const getUsersController = async (
  _req: Request,
  res: Response,
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

    res.status(200).json({
      status: "success",
      code: "OK",
      message: "Users retrieved successfully",
      data: publicUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //
  try {
    const { id } = req.params;

    await deleteUserService(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
