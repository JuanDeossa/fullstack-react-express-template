import { envs } from "../config/envs";
import jwt from "jsonwebtoken";
import { AccessJwtPayload, RefreshJwtPayload } from "../types/auth.interfaces";

const { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET } = envs;

export const generateAccessToken = (
  payload: AccessJwtPayload,
  expiresIn = 3600000 // 1 hora
) => {
  const accessTokenPayload = {
    userId: payload.userId,
  };

  return jwt.sign(accessTokenPayload, ACCESS_JWT_SECRET, {
    expiresIn: expiresIn, // Expiración en minutos
  });
};

export const generateRefreshToken = (
  payload: RefreshJwtPayload,
  expiresIn = 2.592e+9 // 30 dias
) => {
  const refreshTokenPayload = {
    userId: payload.userId,
  };

  return jwt.sign(refreshTokenPayload, REFRESH_JWT_SECRET, {
    expiresIn: expiresIn, // Expiración en minutos
  });
};
