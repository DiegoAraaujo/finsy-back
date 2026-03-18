import { PaymentMethod } from "@prisma/client";
import Expense from "../entities/Expense";

export interface IExpenseRepository {
  createExpense(expense: Expense): Promise<Expense>;
  updateExpense(
    expenseId: number,
    updates: {
      paymentMethod?: PaymentMethod;
      description?: string | null;
      amount?: number;
    },
  ): Promise<Expense>;
  findExpensesByMonthId(monthId: number): Promise<Expense[]>;
  findExpenseById(expenseId: number): Promise<Expense | null>;
  findExpensesByCategoryId(categoryId: number): Promise<Expense[]>;
  deleteExpense(ExpenseId: number): Promise<void>;
}
