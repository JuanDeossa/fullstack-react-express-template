import { NextFunction, Request, Response } from "express";
import { CreateUserType } from "../schemas/user.schemas";
import { createUserService } from "../services/user.services";
import { LoginType } from "../schemas/auth.schemas";
import jwt from "jsonwebtoken";
import {
  loginService,
  logoutService,
  refreshTokenService,
} from "../services/auth.services";
import { envs } from "../config/envs";
import { AccessJwtPayload } from "../types/auth.interfaces";

export const registerUserController = async (
  req: Request<{}, {}, CreateUserType>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await createUserService({ email, password });

    res.status(201).json({
      status: "success",
      code: "CREATED",
      message: "User created successfully",
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
      },
    });
    //
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request<{}, {}, LoginType>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const session = await loginService({ email, password });

    res.cookie("refreshToken", session.refreshToken, {
      httpOnly: true, // Evita el acceso desde JavaScript
      secure: process.env.NODE_ENV === "production", // Solo se envía sobre HTTPS
      sameSite: "strict", // Previene ataques CSRF
      maxAge: envs.REFRESH_TOKEN_EXPIRES_IN,
    });

    res.status(201).json({
      success: true,
      code: "SUCCESS",
      message: "Login successful",
      data: {
        token: session.accessToken,
        user: {
          id: session.userId,
          email,
        },
      },
      errors: [],
    });
    //
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (
  req: Request<{}, {}, LoginType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    await logoutService(refreshToken);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      success: true,
      code: "LOGOUT_SUCCESS",
      message: "Logout successful",
      data: {},
      errors: [],
    });
    //
  } catch (error) {
    next(error);
  }
};

export const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //
  console.log("llegue al controller");
  //
  try {
    const refreshToken = req.cookies.refreshToken;

    const newAccessToken = await refreshTokenService(refreshToken);

    const newAccessTokenPayload = jwt.verify(
      newAccessToken,
      envs.ACCESS_JWT_SECRET
    ) as AccessJwtPayload;

    res.status(200).json({
      success: true,
      code: "SUCCESS",
      message: "refresh token successfully",
      data: {
        token: newAccessToken,
        user: {
          id: newAccessTokenPayload.userId,
        },
      },
      errors: [],
    });
    //
  } catch (error) {
    console.error("Error from auth controller: ", error);
    next(error);
  }
};
