import { User as PrismaUser, Role as PrismaRole } from "@prisma/client";

export type User = PrismaUser;

export type Role = PrismaRole;

export interface PublicUser
  extends Omit<User, "password" | "deleted_at" | "deleted_by"> {}

export interface BaseUser {
  email: string;
  role: string;
  deletedAt?: Date | null;
  name?: string;
}

// src/types/user.ts

export interface CreateUserRequest
  extends Omit<BaseUser, "role" | "deletedAt"> {
  password: string;
}

export interface UpdateUserRequest extends Partial<BaseUser> {
  password?: string;
}

export interface UserResponse extends BaseUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponseWithPassword extends UserResponse {
  password: string;
}
