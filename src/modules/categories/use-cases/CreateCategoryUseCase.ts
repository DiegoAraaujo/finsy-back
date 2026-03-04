import Category from "../../../entities/Category";
import { ICategoryRepository } from "../../../interfaces/ICategoryRepository";
import UseCaseError from "../../../interfaces/UseCaseError";

class CreateCategoryUseCase {
  private categoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(monthId: number, name: string, spendingLimit: number) {
    const existingCategory = await this.categoryRepository.findCategoryByName(
      name,
      monthId,
    );

    if (existingCategory) {
      throw <UseCaseError>{
        message: "A category with this name already exists for this month",
        errorType: "CATEGORY_ALREADY_EXISTS",
      };
    }

    const category = new Category(monthId, name, spendingLimit);
    const newCategory = await this.categoryRepository.createCategory(category);

    return newCategory;
  }
}

export default CreateCategoryUseCase;
