import { PaymentMethod } from "@prisma/client";
import Expense from "../entities/Expense";
import { prisma } from "../lib/prisma";
import { IExpenseRepository } from "../interfaces/IExpenseRepository";

class ExpenseRepository implements IExpenseRepository {
  async createExpense(expense: Expense) {
    const expenseCreated = await prisma.expense.create({
      data: expense.toPersistence(),
    });

    return new Expense(
      expenseCreated.monthId,
      expenseCreated.categoryId,
      expenseCreated.amount.toNumber(),
      expenseCreated.paymentMethod,
      expenseCreated.description,
      expenseCreated.createdAt,
      expenseCreated.id,
    );
  }

  async findExpensesByMonthId(monthId: number) {
    const expenses = await prisma.expense.findMany({
      where: { monthId, deletedAt: null },
    });

    return expenses.map(
      (e) =>
        new Expense(
          e.monthId,
          e.categoryId,
          e.amount.toNumber(),
          e.paymentMethod,
          e.description,
          e.createdAt,
          e.id,
        ),
    );
  }

  async updateExpense(
    expenseId: number,
    updates: {
      paymentMethod?: PaymentMethod;
      description?: string | null;
      amount?: number;
    },
  ) {
    const expense = await prisma.expense.update({
      where: { id: expenseId },
      data: updates,
    });

    return new Expense(
      expense.monthId,
      expense.categoryId,
      expense.amount.toNumber(),
      expense.paymentMethod,
      expense.description,
      expense.createdAt,
      expense.id,
    );
  }

  async findExpensesByCategoryId(categoryId: number) {
    const expenses = await prisma.expense.findMany({
      where: { categoryId, deletedAt: null },
    });

    return expenses.map(
      (e) =>
        new Expense(
          e.monthId,
          e.categoryId,
          e.amount.toNumber(),
          e.paymentMethod,
          e.description,
          e.createdAt,
          e.id,
        ),
    );
  }

  async getTotalExpensesByMonth(monthId: number): Promise<number> {
    const result = await prisma.expense.aggregate({
      where: {
        monthId,
        deletedAt: null,
      },
      _sum: {
        amount: true,
      },
    });

    return result._sum.amount?.toNumber() ?? 0;
  }
  
  async getExpensesGroupedByPaymentMethod(monthId: number) {
    const result = await prisma.expense.groupBy({
      by: ["paymentMethod"],
      where: {
        monthId,
        deletedAt: null,
      },
      _sum: {
        amount: true,
      },
    });

    return result.map((item) => ({
      paymentMethod: item.paymentMethod,
      total: item._sum.amount?.toNumber() ?? 0,
    }));
  }
  async findExpenseById(expenseId: number) {
    const expense = await prisma.expense.findFirst({
      where: { id: expenseId, deletedAt: null },
    });

    return expense
      ? new Expense(
          expense.monthId,
          expense.categoryId,
          expense.amount.toNumber(),
          expense.paymentMethod,
          expense.description,
          expense.createdAt,
          expense.id,
        )
      : null;
  }

  async deleteExpense(expenseId: number) {
    await prisma.expense.updateMany({
      where: { id: expenseId, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  }
}

export default ExpenseRepository;
