import { ICategoryRepository } from "../../../interfaces/ICategoryRepository";
import UseCaseError from "../../../interfaces/UseCaseError";

class UpdateCategoryUseCase {
  private categoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(categoryId: number, name?: string, spendingLimit?: number) {
    if (!name && !spendingLimit) {
      throw <UseCaseError>{
        message: "There is no data to update",
        errorType: "VALIDATION_ERROR",
      };
    }

    const existingCategory =
      await this.categoryRepository.findCategoryById(categoryId);

    if (!existingCategory) {
      throw <UseCaseError>{
        message: "the category does not exist",
        errorType: "CATEGORY_DOES_NOT_EXISTS",
      };
    }
    const dataToUpdate: Partial<{ name?: string; spendingLimit?: number }> = {};

    if (name) dataToUpdate.name = name;
    if (spendingLimit) dataToUpdate.spendingLimit = spendingLimit;

    const updatedCategory = await this.categoryRepository.updateCategory(
      categoryId,
      dataToUpdate,
    );

    return updatedCategory;
  }
}

export default UpdateCategoryUseCase;
