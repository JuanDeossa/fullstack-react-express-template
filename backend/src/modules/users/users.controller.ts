import { NextFunction, Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getUsersService,
} from "./users.service";
import { CreateUserTypeWithSub } from "./users.schemas";
import { PublicUser } from "./user.interfaces";

export const createUserController = async (
  req: Request<{}, {}, CreateUserTypeWithSub>,
  res: Response,
  next: NextFunction
) => {
  const { email, password, name, role, payload } = req.body;

  const subRole: string = payload.sub.role;

  try {
    const user = await createUserService(
      { email, password, name, role },
      subRole
    );

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
    const { payload } = req.body;

    const subRole: string = payload.sub.role;

    await deleteUserService(id, subRole);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
