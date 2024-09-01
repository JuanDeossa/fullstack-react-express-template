import { CustomError } from "../../utils/errorHandler";
import { createSession } from "./session.repository";
import { SessionResponse } from "./session.interfaces";
import { envs } from "../../config/envs";
import { generateAccessToken, generateRefreshToken } from "../../utils/token";
import { AccessJwtPayload } from "../auth/auth.interfaces";

export const createSessionService = async (
  user: AccessJwtPayload["sub"]
): Promise<SessionResponse> => {
  try {
    //
    if (!envs.ACCESS_JWT_SECRET || !envs.REFRESH_JWT_SECRET) {
      throw new CustomError("Invalid credentials", 400, "VALIDATION_ERROR");
    }

    const accessTokenExpiration = envs.ACCESS_TOKEN_EXPIRES_IN;
    const refreshTokenExpiration = envs.REFRESH_TOKEN_EXPIRES_IN;

    // Crear tokens
    const accessToken = generateAccessToken(
      {
        sub: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      accessTokenExpiration / 1000
    );

    const refreshToken = generateRefreshToken(
      {
        sub: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      refreshTokenExpiration / 1000
    );

    // Calcular fechas de expiración
    const currentDate = new Date();

    const refreshTokenExpiresAt = new Date(
      currentDate.getTime() + refreshTokenExpiration
    );

    const session = await createSession({
      userId: user.id,
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiresAt: refreshTokenExpiresAt,
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
