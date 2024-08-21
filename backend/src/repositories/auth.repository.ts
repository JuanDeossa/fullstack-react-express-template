import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CustomError } from "../utils/errorHandler";
import { CreateSessionType } from "../schemas/auth.schemas";

const prisma = new PrismaClient();

export const login = async (sessionData: CreateSessionType) => {
  try {
    // Crea el usuario en la base de datos
    const session = await prisma.session.create({
      data: {
        user_id: sessionData.userId,
        access_token: sessionData.accessToken,
        refresh_token: sessionData.refreshToken,
        expires_at: sessionData.expiresAt,
      },
    });

    return session;
    //
  } catch (error) {
    //
    console.error("Error from repository", error);
    if (error instanceof PrismaClientKnownRequestError) {
      // Error de Prisma
      // if (error.code === "P2002") {
      //   // Código de error específico de Prisma cuando un campo único es duplicado
      //   throw new CustomError(
      //     "El email ya está en uso",
      //     409,
      //     "EMAIL_ALREADY_EXISTS"
      //   );
      // }
    }
    // Lanza cualquier otro error no manejado
    throw new CustomError(
      "Error al crear la sesion",
      500,
      "USER_CREATION_ERROR"
    );
  }
};
