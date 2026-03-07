import z from "zod";

export const createExpenseSchema = z.object({
  amount: z.number().min(1, "Amount must be at least 1"),
  description: z.string().nullable().default(null),
});
