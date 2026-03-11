import { IExpenseRepository } from "../../../interfaces/IExpenseRepository";

class DeleteExpenseUseCase {
  private expenseRepository: IExpenseRepository;

  constructor(expenseRepository: IExpenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  async execute(expenseId: number): Promise<void> {
    return await this.expenseRepository.deleteExpense(expenseId);
  }
}

export default DeleteExpenseUseCase;
