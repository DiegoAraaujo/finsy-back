import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, "name is required"),
  spendingLimit: z.number().min(1, "spending limit is required"),
});

export const updateCategorySchema = z.object({
  name: z.string().trim().min(1).optional(),
  spendingLimit: z.number().min(1).optional(),
});
