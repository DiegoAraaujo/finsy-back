import Category from "../../../entities/Category";
import CategoryRepository from "../../../repository/CategoryRepository";

class GetCategoriesUseCase {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(monthId: number): Promise<Category[]> {
    const categories =
      await this.categoryRepository.findCategoriesByMonthId(monthId);

    return categories;
  }
}

export default GetCategoriesUseCase;
