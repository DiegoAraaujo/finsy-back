import z from "zod";

export const createExpenseSchema = z.object({
  amount: z.number().gt(0, "Amount must be greater than 0"),
  description: z.string().nullable().default(null),
  createdAt: z.coerce.date().optional(),
});

export const updateExpenseSchema = z.object({
  amount: z.number().gt(0).optional(),
  description: z.string().nullable().optional(),
  createdAt: z.coerce.date().optional(),
});
