import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CustomError } from "../../utils/errorHandler";
import { PrismaClient } from "@prisma/client";
import { CreateUserType } from "./users.schemas";
import { User, UserResponseWithPassword } from "./user.interfaces";
import { LoginType } from "../auth/auth.schemas";

const prisma = new PrismaClient();

export const createUser = async (userData: CreateUserType) => {
  try {
    // Crea el usuario en la base de datos
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: userData.password,
        name: userData.email.split("@")[0],
      },
    });

    return user;
    //
  } catch (error) {
    //
    // console.error("Error from repository", error);
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
    // Lanza cualquier otro error no manejado
    throw new CustomError(
      "Error al crear el usuario",
      500,
      "USER_CREATION_ERROR"
    );
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    // Busca todos los usuarios en la base de datos
    const users = await prisma.user.findMany();
    return users;
  } catch (error: any) {
    //
    console.error("Error from repository", error?.message || error);

    throw error;
  }
};

export const getUserByEmail = async (
  email: LoginType["email"]
): Promise<void | UserResponseWithPassword> => {
  try {
    // Busca el usuario en la base de datos
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      return {
        id: user.id,
        email: user.email,
        password: user.password,
        role: user.role,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
        deletedAt: user.deleted_at,
      };
    }
    //
  } catch (error) {
    //
    // console.error("Error from repository", error);
    throw new CustomError("Error al leer el usuario", 500, "USER_READ_ERROR");
  }
};

export const deleteUser = async (id: string) => {
  try {
    // Busca el usuario en la base de datos
    const user = await prisma.user.delete({ where: { id } });

    return user;
  } catch (error) {
    //
    // console.error("Error from repository", error);
    throw new CustomError(
      "Error al borrar el usuario",
      500,
      "USER_DELETE_ERROR"
    );
  }
};
