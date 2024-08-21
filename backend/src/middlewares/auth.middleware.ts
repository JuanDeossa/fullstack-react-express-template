import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { CustomError } from "../utils/errorHandler";
import { envs } from "../config/envs";

export const validateAccessMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      throw new CustomError(
        "No access token provided",
        401,
        "NO_TOKEN_PROVIDED"
      );
    }

    jwt.verify(token, envs.ACCESS_JWT_SECRET);
    // Continúa con el siguiente middleware o la ruta
    next();
  } catch (error) {
    // console.error("Error from auth middleware ( access token ): ", error);
    next(error);
  }
};

export const validateRefreshMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new CustomError(
        "Invalid or expired refresh token",
        401,
        "INVALID_REFRESH_TOKEN"
      );
    }

    jwt.verify(refreshToken, envs.REFRESH_JWT_SECRET);
    // Continúa con el siguiente middleware o la ruta
    next();
    //
  } catch (error) {
    if (
      error instanceof TokenExpiredError ||
      error instanceof JsonWebTokenError
    ) {
      // clear cookie
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      // If the error is related to JWT verification, return a 401
      throw new CustomError(
        "Invalid or expired refresh token",
        401,
        "INVALID_REFRESH_TOKEN"
      );
    }
    next(error);
  }
};
