// src/types/user.ts
// src/types/user.ts

import { User, Session as PrismaSession } from "@prisma/client";

export type Session = PrismaSession;

export interface SessionWithUser extends Session {
  user: {
    id: User["id"];
    name: User["name"];
    email: User["email"];
    role: User["role"];
  };
}

export interface BaseSession {
  userId: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

export interface SessionResponse extends Omit<BaseSession, "userId"> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  isActive: boolean;
  user: {
    id: User["id"];
    name: User["name"];
    email: User["email"];
    role: User["role"];
  };
}
