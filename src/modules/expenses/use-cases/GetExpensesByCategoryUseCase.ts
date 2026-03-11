import Expense from "../../../entities/Expense";
import { IExpenseRepository } from "../../../interfaces/IExpenseRepository";

class GetExpensesByCategoryUseCase {
  private expenseRepository: IExpenseRepository;

  constructor(expenseRepository: IExpenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  async execute(categoryId: number): Promise<Expense[]> {
    const expenses =
      await this.expenseRepository.findExpensesByCategoryId(categoryId);
    return expenses;
  }
}

export default GetExpensesByCategoryUseCase;
