import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, "name is required"),
  spendingLimit: z.number().positive("spending limit must be greater than 0"),
});

export const updateCategorySchema = z.object({
  name: z.string().trim().min(1).optional(),
  spendingLimit: z.number().positive().optional(),
});
