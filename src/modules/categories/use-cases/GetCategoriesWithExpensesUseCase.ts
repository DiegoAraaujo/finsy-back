import { ICategoryRepository } from "../../../interfaces/ICategoryRepository";

class GetCategoriesWithExpensesUseCase {
  private categoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(monthId: number) {
    const categoriesWithTotalExpenses =
      await this.categoryRepository.findCategoriesWithTotalExpensesByMonth(
        monthId,
      );

    return categoriesWithTotalExpenses;
  }
}

export default GetCategoriesWithExpensesUseCase;
