// src/middleware/errorMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { CustomError } from "../utils/errorHandler";

interface ErrorResponse {
  status: string;
  message: string;
  errors: { field: string | number; message: string }[];
  code: string;
}

export const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response<ErrorResponse>,
  _next: NextFunction
) => {
  console.error(err);

  // Default response structure
  let response: ErrorResponse = {
    status: "error",
    message: "Internal server error",
    code: "INTERNAL_SERVER_ERROR",
    errors: [],
  };

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    response = {
      status: "error",
      message: "Validation failed",
      errors: err.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
      code: "VALIDATION_ERROR",
    };
    return res.status(400).json(response);
  }

  // Custom Application Errors
  if (err instanceof CustomError) {
    response = {
      status: "error",
      message: err.message,
      code: err.code || "APPLICATION_ERROR",
      errors: [],
    };
    return res.status(err.statusCode).json(response);
  }

  // Validar error de verificacion de token
  if (err.name === "JsonWebTokenError") {
    response = {
      status: "error",
      message: "invalid token",
      code: "INVALID_TOKEN",
      errors: [],
    };
    return res.status(401).json(response);
  }
  // Validar error de token expirado de jwt
  if (err.name === "TokenExpiredError") {
    response = {
      status: "error",
      message: "Token expired",
      code: "TOKEN_EXPIRED",
      errors: [],
    };
    return res.status(401).json(response);
  }

  // Default to 500 Server Error
  return res.status(500).json(response);
};
