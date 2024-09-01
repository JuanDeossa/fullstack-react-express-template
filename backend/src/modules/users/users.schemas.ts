import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(15, { message: "Password must be at most 15 characters long" }),
  name: z
    .string({ required_error: "Name is required" })
});

export type CreateUserType = z.infer<typeof createUserSchema>;
