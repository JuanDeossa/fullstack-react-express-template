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
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { envs } from "../../config/envs";
import { RefreshJwtPayload } from "./auth.interfaces";
import { generateAccessToken } from "../../utils/token";
import { isRefreshJwtPayload } from "../../utils/verifyPayloadType";

export const loginService = async (
  userData: LoginType
): Promise<SessionResponse> => {
  try {
    const user = await getUserByEmail(userData.email);

    if (!user) {
      throw new CustomError("User not found", 404, "USER_NOT_FOUND");
    }

    const rigthPassword = await bcrypt.compare(
      userData.password,
      user.password
    );

    if (!rigthPassword) {
      throw new CustomError("Invalid credentials", 400, "VALIDATION_ERROR");
    }

    const session = await createSessionService({
      id: user.id,
      email: user.email,
      name: user.email,
      role: user.role,
    });

    return session;
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

    if (!session) {
      throw new CustomError("User not found", 404, "USER_NOT_FOUND");
    }

    const sessionClosed = await finishSession(session.id);

    if (!sessionClosed) {
      throw new CustomError("User not found", 404, "USER_NOT_FOUND");
    }

    return sessionClosed;
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

export const refreshTokenService = async (
  refreshToken: string
): Promise<{ accessToken: string; user: RefreshJwtPayload["sub"] }> => {
  //
  try {
    //
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
  } catch (error) {
    //
    console.error("Error from service", error);
    if (error instanceof CustomError) {
      throw new CustomError(error.message, error.statusCode, error.code);
    }

    if (
      error instanceof TokenExpiredError ||
      error instanceof JsonWebTokenError
    ) {
      // If the error is related to JWT verification, return a 401
      throw new CustomError(
        "Invalid or expired refresh token",
        401,
        "INVALID_REFRESH_TOKEN"
      );
    }

    // Lanza cualquier otro error no manejado
    throw error;
  }
};
