import { ICategoryRepository } from "../../../interfaces/ICategoryRepository";
import UseCaseError from "../../../interfaces/UseCaseError";

class DeleteCategoryUseCase {
  private categoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(categoryId: number): Promise<void> {
    const existingCategory =
      await this.categoryRepository.findCategoryById(categoryId);

    if (!existingCategory) {
      throw <UseCaseError>{
        message: "the category does not exist",
        errorType: "CATEGORY_DOES_NOT_EXISTS",
      };
    }

    return await this.categoryRepository.deleteCategory(categoryId);
  }
}

export default DeleteCategoryUseCase;
