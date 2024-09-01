import { CreateUserType } from "./users.schemas";
import { CustomError } from "../../utils/errorHandler";
import { createUser, deleteUser, getUsers } from "./users.repository";
import bcrypt from "bcrypt";
import { User } from "./user.interfaces";

export const createUserService = async (
  userData: CreateUserType
): Promise<User> => {
  try {
    // Hash de la contraseña
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const user = await createUser({
      email: userData.email,
      password: hashedPassword,
      name: userData.name,
    });

    return user;
    //
  } catch (error: any) {
    //
    if (error instanceof CustomError) {
      throw error;
    }

    console.error("Error from service", error?.message || error);

    // Lanza cualquier otro error no manejado
    throw new CustomError(
      "Internal server error",
      500,
      "INTERNAL_SERVER_ERROR"
    );
  }
};

export const getUsersService = async (): Promise<User[]> => {
  try {
    //
    const users = await getUsers();
    return users;
  } catch (error: any) {
    //
    if (error instanceof CustomError) {
      throw error;
    }

    console.error("Error from service", error?.message || error);

    // Lanza cualquier otro error no manejado
    throw new CustomError(
      "Internal server error",
      500,
      "INTERNAL_SERVER_ERROR"
    );
  }
};

export const deleteUserService = async (id: string) => {
  try {
    await deleteUser(id);
    return true;
  } catch (error: any) {
    //
    if (error instanceof CustomError) {
      throw error;
    }

    console.error("Error from service", error?.message || error);

    // Lanza cualquier otro error no manejado
    throw new CustomError(
      "Internal server error",
      500,
      "INTERNAL_SERVER_ERROR"
    );
  }
};
