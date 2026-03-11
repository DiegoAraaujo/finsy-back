import { PaymentMethod } from "@prisma/client";
import Expense from "../../../entities/Expense";
import { IExpenseRepository } from "../../../interfaces/IExpenseRepository";

class CreateExpenseUseCase {
  private expenseRepository: IExpenseRepository;

  constructor(expenseRepository: IExpenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  async execute(
    monthId: number,
    categoryId: number,
    amount: number,
    paymentMethod: PaymentMethod,
    description: string | null,
  ): Promise<Expense> {
    const expenseEntity = new Expense(
      monthId,
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
