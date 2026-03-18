import { ICategoryRepository } from "../../../interfaces/ICategoryRepository";
import { ICategoryWithTotalExpenses } from "../../../interfaces/ICategoryWithTotalExpenses";

class GetCategoriesWithExpensesUseCase {
  private categoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(monthId: number): Promise<ICategoryWithTotalExpenses[]> {
    const categoriesWithTotalExpenses =
      await this.categoryRepository.findCategoriesWithTotalExpensesByMonth(
        monthId,
      );

    return categoriesWithTotalExpenses;
  }
}

export default GetCategoriesWithExpensesUseCase;
