export enum UserRole {
  DEVELOPER = "DEVELOPER",
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface CreateUser {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export interface UserResponse {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  is_active: boolean;
}
