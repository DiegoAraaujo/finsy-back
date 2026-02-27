import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.string().email("invalid email"),
  password: z
    .string()
    .min(6, "The password must be at least 8 characters long."),
});

export const updateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  password: z
    .string()
    .min(6, "The password must be at least 8 characters long."),
});
