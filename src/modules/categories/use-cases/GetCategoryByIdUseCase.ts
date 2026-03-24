import Category from "../../../entities/Category";
import UseCaseError from "../../../interfaces/UseCaseError";
import CategoryRepository from "../../../repository/CategoryRepository";

class GetCategoryByIdUseCase {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(monthId: number): Promise<Category> {
    const category = await this.categoryRepository.findCategoryById(monthId);

    if (!category) {
      throw <UseCaseError>{
        message: "Category not found for the given id",
        errorType: "CATEGORY_NOT_FOUND",
      };
    }
    return category;
  }
}

export default GetCategoryByIdUseCase;
