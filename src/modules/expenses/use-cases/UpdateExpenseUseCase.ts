import { PaymentMethod } from "@prisma/client";
import { IExpenseRepository } from "../../../interfaces/IExpenseRepository";
import UseCaseError from "../../../interfaces/UseCaseError";
import Expense from "../../../entities/Expense";

class UpdateExpenseUseCase {
  private expenseRepository: IExpenseRepository;

  constructor(expenseRepository: IExpenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  async execute(
    expenseId: number,
    updates: {
      amount?: number;
      paymentMethod?: PaymentMethod;
      description?: string | null;
      createdAt?: Date;
    },
  ): Promise<Expense> {
    if (
      !updates.amount &&
      !updates.description &&
      !updates.paymentMethod &&
      !updates.createdAt
    ) {
      throw <UseCaseError>{
        message: "There is no data to update",
        errorType: "VALIDATION_ERROR",
      };
    }

    const existingExpense =
      await this.expenseRepository.findExpenseById(expenseId);

    if (!existingExpense) {
      throw <UseCaseError>{
        message: "This expense does not exist.",
        errorType: "EXPENSE_NOT_FOUND",
      };
    }

    if (updates.createdAt) {
      const today = new Date();
      const expenseDate = updates.createdAt;

      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();

      const updateMonth = expenseDate.getMonth() + 1;
      const updateYear = expenseDate.getFullYear();

      if (updateMonth !== currentMonth || updateYear !== currentYear) {
        throw <UseCaseError>{
          message: "The expense date must belong to the current month.",
          errorType: "INVALID_EXPENSE_DATE",
        };
      }

      if (expenseDate > today) {
        throw <UseCaseError>{
          message: "Future dates are not allowed for expense records.",
          errorType: "INVALID_EXPENSE_DATE",
        };
      }
    }

    const dataToUpdate: Partial<{
      amount?: number;
      paymentMethod?: PaymentMethod;
      description?: string;
      createdAt?: Date;
    }> = {};

    if (updates.amount) dataToUpdate.amount = updates.amount;
    if (updates.description) dataToUpdate.description = updates.description;
    if (updates.paymentMethod)
      dataToUpdate.paymentMethod = updates.paymentMethod;
    if (updates.createdAt) dataToUpdate.createdAt = updates.createdAt;

    const expense = await this.expenseRepository.updateExpense(
      expenseId,
      dataToUpdate,
    );
    return expense;
  }
}

export default UpdateExpenseUseCase;
