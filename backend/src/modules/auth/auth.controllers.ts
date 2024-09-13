import { NextFunction, Request, Response } from "express";
import { createUserService } from "../users/users.service";
import { LoginType } from "./auth.schemas";
import {
  loginService,
  logoutService,
  refreshTokenService,
} from "./auth.services";
import { envs } from "../../config/envs";
import { PublicUser } from "../users/user.interfaces";
import { CreateUserTypeWithSub } from "../users/users.schemas";

export const registerUserController = async (
  req: Request<{}, {}, CreateUserTypeWithSub>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name, role, payload } = req.body;

    const user = await createUserService(
      { email, password, name, role },
      payload.sub.role
    );

    const publicUser: PublicUser = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      created_at: user.created_at,
      updated_at: user.updated_at,
      is_active: user.is_active,
    };

    res.status(201).json({
      status: "success",
      code: "REGISTERED",
      message: "User registered successfully",
      data: publicUser,
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
  try {
    const { email, password } = req.body;

    const session = await loginService({ email, password });

    res.cookie("refreshToken", session.refreshToken, {
      httpOnly: true, // Evita el acceso desde JavaScript
      secure: process.env.NODE_ENV === "production", // Solo se envía sobre HTTPS
      sameSite: "none", // Previene ataques CSRF
      maxAge: envs.REFRESH_TOKEN_EXPIRES_IN,
    });

    res.status(201).json({
      success: true,
      code: "SUCCESS",
      message: "Login successful",
      data: {
        token: session.accessToken,
        user: session.user,
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
    const refreshToken: string = req.cookies.refreshToken;

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
  try {
    const refreshToken = req.cookies.refreshToken;

    const { accessToken, user } = await refreshTokenService(refreshToken);

    res.status(200).json({
      success: true,
      code: "SUCCESS",
      message: "refresh token successfully",
      data: {
        token: accessToken,
        user: user,
      },
      errors: [],
    });
    //
  } catch (error) {
    next(error);
  }
};
