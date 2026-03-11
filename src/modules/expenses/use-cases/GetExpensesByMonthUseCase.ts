import Expense from "../../../entities/Expense";
import { IExpenseRepository } from "../../../interfaces/IExpenseRepository";

class GetExpensesByMonthUseCase {
  private expenseRepository: IExpenseRepository;

  constructor(expenseRepository: IExpenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  async execute(monthId: number): Promise<Expense[]> {
    const expenses =
      await this.expenseRepository.findExpensesByMonthId(monthId);
    return expenses;
  }
}

export default GetExpensesByMonthUseCase;
