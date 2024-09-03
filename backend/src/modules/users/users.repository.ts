import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CustomError } from "../../utils/errorHandler";
import { PrismaClient } from "@prisma/client";
import { CreateUserType } from "./users.schemas";
import { User } from "./user.interfaces";
import { LoginType } from "../auth/auth.schemas";

const prisma = new PrismaClient();

export const createUser = async (userData: CreateUserType) => {
  try {
    //
    const data: CreateUserType = {
      email: userData.email,
      password: userData.password,
      name: userData.name,
      role: userData.role,
    };

    // Crea el usuario en la base de datos
    const user = await prisma.user.create({ data });

    return user;
    //
  } catch (error: any) {
    //
    if (error instanceof PrismaClientKnownRequestError) {
      // Error de Prisma
      if (error.code === "P2002") {
        // Código de error específico de Prisma cuando un campo único es duplicado
        throw new CustomError(
          "El email ya está en uso",
          409,
          "EMAIL_ALREADY_EXISTS"
        );
      }
    }

    console.error("Error from repository", error?.message || error);

    // Lanza cualquier otro error no manejado
    throw error;
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    // Busca todos los usuarios en la base de datos
    const users = await prisma.user.findMany({ where: { deleted_at: null } });
    return users;
  } catch (error: any) {
    //
    console.error("Error from repository", error?.message || error);

    throw error;
  }
};

export const getUserByEmail = async (
  email: LoginType["email"]
): Promise<User> => {
  try {
    // Busca el usuario en la base de datos
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new CustomError("User not found", 404, "USER_NOT_FOUND");
    }

    return user;
    //
  } catch (error) {
    //
    throw error;
  }
};

export const getUserById = async (id: string): Promise<User> => {
  try {
    // Busca el usuario en la base de datos
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new CustomError("User not found", 404, "USER_NOT_FOUND");
    }

    return user;
    //
  } catch (error) {
    //
    throw error;
  }
};

export const deleteUser = async (id: string, subEmail: string) => {
  try {
    // Elimina el usuario en la base de datos
    const user = await prisma.user.update({
      where: { id },
      data: { deleted_at: new Date(), deleted_by: subEmail, is_active: false },
    });

    return user;
  } catch (error: any) {
    //
    console.error("Error from repository", error?.message || error);

    throw error;
  }
};
