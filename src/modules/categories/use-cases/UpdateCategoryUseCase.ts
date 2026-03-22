import Category from "../../../entities/Category";
import { ICategoryRepository } from "../../../interfaces/ICategoryRepository";
import { IMonthRepository } from "../../../interfaces/IMonthRepository";
import UseCaseError from "../../../interfaces/UseCaseError";

class UpdateCategoryUseCase {
  private categoryRepository: ICategoryRepository;
  private monthRepository: IMonthRepository;

  constructor(
    categoryRepository: ICategoryRepository,
    monthRepository: IMonthRepository,
  ) {
    this.categoryRepository = categoryRepository;
    this.monthRepository = monthRepository;
  }

  async execute(
    userId: number,
    categoryId: number,
    updates: {
      name?: string;
      spendingLimit?: number;
    },
  ): Promise<Category> {
    if (updates.name === undefined && updates.spendingLimit === undefined) {
      throw <UseCaseError>{
        message: "There is no data to update",
        errorType: "VALIDATION_ERROR",
      };
    }

    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const currentMonth = await this.monthRepository.findCurrentMonth(
      userId,
      month,
      year,
    );

    if (!currentMonth) {
      throw <UseCaseError>{
        message:
          "No month found for the current period. Cannot update category.",
        errorType: "MONTH_NOT_FOUND",
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

    if (updates.name !== undefined) {
      if (!updates.name.trim()) {
        throw <UseCaseError>{
          message: "Name cannot be empty",
          errorType: "VALIDATION_ERROR",
        };
      }
      const existingCategoryWithName =
        await this.categoryRepository.findCategoryByName(
          updates.name,
          currentMonth.getId(),
        );

      if (
        existingCategoryWithName &&
        existingCategoryWithName.getId() !== categoryId
      ) {
        throw <UseCaseError>{
          message: "A category with this name already exists for this month",
          errorType: "CATEGORY_ALREADY_EXISTS",
        };
      }
    }

    if (updates.spendingLimit !== undefined) {
      if (updates.spendingLimit <= 0) {
        throw <UseCaseError>{
          message: "Spending limit must be greater than 0",
          errorType: "VALIDATION_ERROR",
        };
      }

      const existingCategories =
        await this.categoryRepository.findCategoriesByMonthId(
          currentMonth.getId(),
        );
      const totalAllocatedLimit = existingCategories.reduce(
        (acc, c) => c.getSpendingLimit() + acc,
        0,
      );

      const oldLimit = existingCategory.getSpendingLimit();

      const newTotalAllocatedLimit =
        totalAllocatedLimit - oldLimit + updates.spendingLimit;
      const monthlySalary = currentMonth.getSalary();

      if (newTotalAllocatedLimit > monthlySalary) {
        throw <UseCaseError>{
          message: "Total category limits exceed the monthly salary",
          errorType: "MONTHLY_LIMIT_EXCEEDED",
        };
      }
    }

    const dataToUpdate: Partial<{ name?: string; spendingLimit?: number }> = {};

    if (updates.name !== undefined) dataToUpdate.name = updates.name;
    if (updates.spendingLimit !== undefined)
      dataToUpdate.spendingLimit = updates.spendingLimit;

    const updatedCategory = await this.categoryRepository.updateCategory(
      categoryId,
      dataToUpdate,
    );

    return updatedCategory;
  }
}

export default UpdateCategoryUseCase;
