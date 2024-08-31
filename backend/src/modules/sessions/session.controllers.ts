import { NextFunction, Request, Response } from "express";
import { SessionResponse } from "./session.interfaces";

export const createSessionController = async (
  _req: Request,
  _res: Response,
  next: NextFunction
): Promise<SessionResponse | void> => {
  //
  try {
    next();
  } catch (error) {
    next(error);
  }
};
// pending
