import { IExpenseRepository } from "../../../interfaces/IExpenseRepository";
import UseCaseError from "../../../interfaces/UseCaseError";

class DeleteExpenseUseCase {
  private expenseRepository: IExpenseRepository;

  constructor(expenseRepository: IExpenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  async execute(expenseId: number): Promise<void> {
    const existingExpense =
      await this.expenseRepository.findExpenseById(expenseId);

    if (!existingExpense) {
      throw <UseCaseError>{
        message: "This expense does not exist.",
        errorType: "EXPENSE_NOT_FOUND",
      };
    }

    return await this.expenseRepository.deleteExpense(expenseId);
  }
}

export default DeleteExpenseUseCase;
