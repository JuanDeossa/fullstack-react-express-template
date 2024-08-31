import { envs } from "../config/envs";
import jwt from "jsonwebtoken";
import { AccessJwtPayload, RefreshJwtPayload } from "../modules/auth/auth.interfaces";

const { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET } = envs;

export const generateAccessToken = (
  payload: AccessJwtPayload,
  expiresIn = 3600000 // 1 hora
) => {
  const accessTokenPayload: AccessJwtPayload = {
    sub: {
      id: payload.sub.id,
      name: payload.sub.name,
      email: payload.sub.email,
      role: payload.sub.role,
    },
  };

  return jwt.sign(accessTokenPayload, ACCESS_JWT_SECRET, {
    expiresIn: expiresIn, // Expiración en minutos
  });
};

export const generateRefreshToken = (
  payload: RefreshJwtPayload,
  expiresIn = 2.592e9 // 30 dias
) => {
  const refreshTokenPayload: RefreshJwtPayload = {
    sub: {
      id: payload.sub.id,
      name: payload.sub.name,
      email: payload.sub.email,
      role: payload.sub.role,
    },
  };

  return jwt.sign(refreshTokenPayload, REFRESH_JWT_SECRET, {
    expiresIn: expiresIn, // Expiración en minutos
  });
};
