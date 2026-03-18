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
  ): Promise<Expense> {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

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
    const expenseEntity = new Expense(
      currentMonth.getId(),
      categoryId,
      amount,
      paymentMethod,
      description,
    );

    const expense = await this.expenseRepository.createExpense(expenseEntity);
    return expense;
  }
}

export default CreateExpenseUseCase;
