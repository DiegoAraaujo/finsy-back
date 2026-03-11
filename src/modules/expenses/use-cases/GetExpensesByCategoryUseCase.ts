import { IExpenseRepository } from "../../../interfaces/IExpenseRepository";

class GetExpensesByCategoryUseCase {
  private expenseRepository: IExpenseRepository;

  constructor(expenseRepository: IExpenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  async execute(categoryId: number) {
    const expenses =
      await this.expenseRepository.findExpensesByCategoryId(categoryId);
    return expenses;
  }
}

export default GetExpensesByCategoryUseCase;
