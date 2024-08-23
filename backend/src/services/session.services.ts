// import bcrypt from "bcrypt";
// import { createUser } from "../repositories/user.repository";
// import { CreateUserType } from "../schemas/user.schemas";
// import { UserResponse } from "../types/user.interfaces";
import { CustomError } from "../utils/errorHandler";
import { createSession } from "../repositories/session.repository";
import { SessionResponse } from "../types/session.interfaces";
import { envs } from "../config/envs";
import { generateAccessToken, generateRefreshToken } from "../utils/token";
import { AccessJwtPayload } from "../types/auth.interfaces";

// const saltRounds = 10;

export const createSessionService = async (
  user: AccessJwtPayload["sub"]
): Promise<SessionResponse> => {
  try {
    // Hash de la contraseña
    // const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

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

    return {
      id: session.id,
      expiresAt: session.expires_at,
      accessToken: session.access_token,
      isActive: session.is_active,
      refreshToken: session.refresh_token,
      createdAt: session.created_at,
      updatedAt: session.updated_at,
      user: session.user,
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
