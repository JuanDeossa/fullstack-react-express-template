import bcrypt from "bcrypt";
import { createUser } from "../repositories/user.repository";
import { CreateUserType } from "../schemas/user.schemas";
import { UserResponse } from "../types/user.interfaces";
import { CustomError } from "../utils/errorHandler";

const saltRounds = 10;

export const createUserService = async (
  userData: CreateUserType
): Promise<UserResponse> => {
  try {
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const user = await createUser({
      email: userData.email,
      password: hashedPassword,
    });

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };
    //
  } catch (error) {
    // console.error("Error from service", error);
    if (error instanceof CustomError) {
      throw new CustomError(error.message, error.statusCode, error.code);
    }

    // Lanza cualquier otro error no manejado
    throw new CustomError(
      "Internal server error",
      500,
      "INTERNAL_SERVER_ERROR"
    );
  }
};
