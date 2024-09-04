import { CustomError } from "../../utils/errorHandler";
import { LoginType } from "./auth.schemas";
import { createSessionService } from "../sessions/session.services";
import bcrypt from "bcrypt";
import { SessionResponse } from "../sessions/session.interfaces";
import { getUserByEmail } from "../users/users.repository";
import {
  finishSession,
  getSessionByRefreshTokenAndUserId,
} from "../sessions/session.repository";
import jwt from "jsonwebtoken";
import { envs } from "../../config/envs";
import { RefreshJwtPayload } from "./auth.interfaces";
import { generateAccessToken } from "../../utils/token";
import { isRefreshJwtPayload } from "../../utils/verifyPayloadType";

export const loginService = async (
  userData: LoginType
): Promise<SessionResponse> => {
  try {
    const user = await getUserByEmail(userData.email);

    if (user.deleted_at !== null) {
      throw new CustomError(
        "credenciales incorrectas",
        404,
        "VALIDATION_ERROR"
      );
    }

    if (!user.is_active) {
      throw new CustomError(
        "Usuario inactivo, contacte al administrador",
        400,
        "USER_NOT_ACTIVE"
      );
    }

    const rigthPassword = await bcrypt.compare(
      userData.password,
      user.password
    );

    if (!rigthPassword) {
      throw new CustomError(
        "credenciales incorrectas",
        400,
        "VALIDATION_ERROR"
      );
    }

    const session = await createSessionService({
      id: user.id,
      email: user.email,
      name: user.email,
      role: user.role,
    });

    return session;
    //
  } catch (error: any) {
    //
    console.error("Error from service", error?.message || error);

    // Lanza cualquier otro error no manejado
    throw error;
  }
};

export const logoutService = async (
  refreshToken: string
): Promise<SessionResponse> => {
  try {
    const decodedToken = jwt.verify(refreshToken, envs.REFRESH_JWT_SECRET);

    if (!isRefreshJwtPayload(decodedToken)) {
      throw new CustomError("Invalid token", 401, "VALIDATION_ERROR");
    }

    const userId = decodedToken.sub.id;

    const session = await getSessionByRefreshTokenAndUserId(
      refreshToken,
      userId
    );

    const sessionClosed = await finishSession(session.id);

    return sessionClosed;
    //
  } catch (error: any) {
    //
    console.error("Error from service", error?.message || error);

    // Lanza cualquier otro error no manejado
    throw error;
  }
};

export const refreshTokenService = async (
  refreshToken: string
): Promise<{ accessToken: string; user: RefreshJwtPayload["sub"] }> => {
  try {
    const decodedToken = jwt.verify(refreshToken, envs.REFRESH_JWT_SECRET);

    if (!isRefreshJwtPayload(decodedToken)) {
      throw new CustomError("Invalid token", 401, "VALIDATION_ERROR");
    }

    const userId = decodedToken.sub.id;

    const session = await getSessionByRefreshTokenAndUserId(
      refreshToken,
      userId
    );

    if (!session || session.expiresAt < new Date() || !session.isActive) {
      throw new CustomError("Invalid or expired refresh tokenn", 401, "ERROR");
    }

    const newAccessToken = generateAccessToken(
      {
        sub: decodedToken.sub,
      },
      envs.ACCESS_TOKEN_EXPIRES_IN / 1000
    );

    return {
      accessToken: newAccessToken,
      user: decodedToken.sub,
    };
  } catch (error: any) {
    //
    console.error("Error from service: ", error?.message || error);

    // Lanza cualquier otro error no manejado
    throw error;
  }
};
