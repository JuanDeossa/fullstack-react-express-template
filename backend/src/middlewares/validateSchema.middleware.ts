import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const validateSchema =
  (schema: any) => (req: Request, _res: Response, next: NextFunction) => {
    try {
      // Validar el cuerpo de la solicitud
      schema.parse(req.body);
      next(); // Si la validación es exitosa, pasa al siguiente middleware
    } catch (error) {
      if (error instanceof ZodError) {
        next(error);
      }
    }
  };
