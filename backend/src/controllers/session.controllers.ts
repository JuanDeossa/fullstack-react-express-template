import { NextFunction, Request, Response } from "express";
import { createSessionService } from "../services/session.services";
import { CreateSessionType } from "../schemas/auth.schemas";
import { SessionResponse } from "../types/session.interfaces";

export const createSessionController = async (
  req: Request<{}, {}, CreateSessionType>,
  res: Response,
  next: NextFunction,
  context: string
): Promise<SessionResponse | void> => {
  //
  const { userId } = req.body;

  try {
    const session = await createSessionService(userId);

    if (context === "auth") {
      return session;
    }

    res.status(201).json({
      status: "success",
      code: "CREATED",
      message: "User created successfully",
      data: {
        id: session?.id,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
      },
    });

    //
  } catch (error) {
    next(error);
  }
};
// pending
