import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errorHandler";
import { Role } from "../modules/users/user.interfaces";

export const validateRole = (roles: Role[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      //
      const { role } = req.body.payload.sub;

      if (!roles.includes(role)) {
        throw new CustomError("Unauthorized role", 403, "UNAUTHORIZED_ROLE");
      }

      next(); // Si la validación es exitosa, pasa al siguiente middleware
    } catch (error) {
      throw error;
    }
  };
};
