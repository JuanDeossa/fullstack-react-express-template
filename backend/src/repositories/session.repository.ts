import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CustomError } from "../utils/errorHandler";
import { CreateSessionType } from "../schemas/auth.schemas";
import { SessionResponse } from "../types/session.interfaces";

const prisma = new PrismaClient();

export const createSession = async (sessionData: CreateSessionType) => {
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

export const getSessionByRefreshTokenAndUserId = async (
  refreshToken: string,
  userId: string
): Promise<void | SessionResponse> => {
  try {
    // Busca la sesion en la base de datos
    const session = await prisma.session.findUnique({
      where: { refresh_token: refreshToken, user_id: userId },
    });

    if (session) {
      return {
        id: session.id,
        userId: session.user_id,
        accessToken: session.access_token,
        refreshToken: session.refresh_token,
        expiresAt: session.expires_at,
        isActive: session.is_active,
        createdAt: session.created_at,
        updatedAt: session.updated_at,
      };
    }

    //
  } catch (error) {
    //
    // console.error("Error from repository", error);
    throw new CustomError("Error al leer la sesion", 500, "SESSION_READ_ERROR");
  }
};

export const finishSession = async (
  sesionId: string
): Promise<void | SessionResponse> => {
  try {
    // cambia el estado de la sesion en la base de datos ( is_active: false )
    const session = await prisma.session.update({
      where: { id: sesionId },
      data: {
        is_active: false,
      },
    });

    // console.log("sessionUpdated", session);

    return {
      id: session.id,
      userId: session.user_id,
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
      expiresAt: session.expires_at,
      isActive: session.is_active,
      createdAt: session.created_at,
      updatedAt: session.updated_at,
    };
    //
  } catch (error) {
    //
    // console.error("Error from repository", error);
    throw new CustomError(
      "Error al actualizar la sesion",
      500,
      "SESSION_UPDATE_ERROR"
    );
  }
};
