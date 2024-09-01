import { PrismaClient } from "@prisma/client";
import { CustomError } from "../../utils/errorHandler";
import { CreateSessionType } from "../auth/auth.schemas";
import { SessionResponse, SessionWithUser } from "./session.interfaces";
import { sessionMapper } from "./session.mapper";

const prisma = new PrismaClient();

export const createSession = async (
  sessionData: CreateSessionType
): Promise<SessionResponse> => {
  try {
    // Crea la sesion en la base de datos
    const session: SessionWithUser = await prisma.session.create({
      data: {
        user_id: sessionData.userId,
        access_token: sessionData.accessToken,
        refresh_token: sessionData.refreshToken,
        expires_at: sessionData.expiresAt,
      },
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
      },
    });

    return sessionMapper(session);
  } catch (error: any) {
    //
    console.error("Error from repository", error?.message || error);

    throw error;
  }
};

export const getSessionByRefreshTokenAndUserId = async (
  refreshToken: string,
  userId: string
): Promise<SessionResponse> => {
  try {
    // Busca la sesion en la base de datos
    const session: SessionWithUser | null = await prisma.session.findUnique({
      where: { refresh_token: refreshToken, user_id: userId },
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
      },
    });

    if (!session) {
      throw new CustomError("Session not found", 404, "SESSION_NOT_FOUND");
    }

    return sessionMapper(session);
  } catch (error: any) {
    //
    console.error("Error from repository", error?.message || error);

    throw error;
  }
};

export const finishSession = async (
  sesionId: string
): Promise<SessionResponse> => {
  try {
    // cambia el estado de la sesion en la base de datos ( is_active: false )
    const session: SessionWithUser = await prisma.session.update({
      where: { id: sesionId },
      data: {
        is_active: false,
      },
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
      },
    });

    return sessionMapper(session);
  } catch (error: any) {
    //
    console.error("Error from repository", error?.message || error);

    throw error;
  }
};
