import { PaymentMethod } from "@prisma/client";
import Expense from "../../../entities/Expense";
import { IExpenseRepository } from "../../../interfaces/IExpenseRepository";
import { IMonthRepository } from "../../../interfaces/IMonthRepository";
import UseCaseError from "../../../interfaces/UseCaseError";

class CreateExpenseUseCase {
  private expenseRepository: IExpenseRepository;
  private monthRepository: IMonthRepository;

  constructor(
    expenseRepository: IExpenseRepository,
    monthRepository: IMonthRepository,
  ) {
    this.expenseRepository = expenseRepository;
    this.monthRepository = monthRepository;
  }

  async execute(
    userId: number,
    categoryId: number,
    amount: number,
    paymentMethod: PaymentMethod,
    description: string | null,
    createdAtAt?: Date,
  ): Promise<Expense> {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const currentMonth = await this.monthRepository.findCurrentMonth(
      userId,
      month,
      year,
    );

    if (!currentMonth) {
      throw <UseCaseError>{
        message: "This month does not exist.",
        errorType: "MONTH_NOT_FOUND",
      };
    }

    if (createdAtAt) {
      const expenseMonth = createdAtAt.getMonth() + 1;
      const expenseYear = createdAtAt.getFullYear();

      if (
        expenseMonth !== currentMonth.getMonth() ||
        expenseYear !== currentMonth.getYear()
      ) {
        throw <UseCaseError>{
          message: "The expense date must belong to the current month.",
          errorType: "INVALID_EXPENSE_DATE",
        };
      }

      if (createdAtAt > today) {
        throw <UseCaseError>{
          message: "Future dates are not allowed for expense records.",
          errorType: "INVALID_EXPENSE_DATE",
        };
      }
    }

    const expenseEntity = new Expense(
      currentMonth.getId(),
      categoryId,
      amount,
      paymentMethod,
      description,
      createdAtAt,
    );

    const expense = await this.expenseRepository.createExpense(expenseEntity);
    return expense;
  }
}

export default CreateExpenseUseCase;
