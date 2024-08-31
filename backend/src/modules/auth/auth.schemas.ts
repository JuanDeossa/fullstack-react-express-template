import { z } from "zod";

export const createSessionSchema = z.object({
  userId: z.string({ required_error: "User ID is required" }),
  accessToken: z.string({ required_error: "Access token is required" }),
  refreshToken: z.string({ required_error: "Refresh token is required" }),
  expiresAt: z.date({ required_error: "Expires at is required" }),
});

export const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" }),
  password: z.string({ required_error: "Password is required" }),
});

export type CreateSessionType = z.infer<typeof createSessionSchema>;
export type LoginType = z.infer<typeof loginSchema>;
