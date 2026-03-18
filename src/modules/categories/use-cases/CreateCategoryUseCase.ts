import Category from "../../../entities/Category";
import { ICategoryRepository } from "../../../interfaces/ICategoryRepository";
import { IMonthRepository } from "../../../interfaces/IMonthRepository";
import UseCaseError from "../../../interfaces/UseCaseError";

class CreateCategoryUseCase {
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
    name: string,
    spendingLimit: number,
  ): Promise<Category> {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const currentMonth = await this.monthRepository.findCurrentMonth(
      userId,
      month,
      year,
    );

    if (!currentMonth) {
      throw <UseCaseError>{
        message: "This month does not exist.",
        errorType: "MONTH_NOT_FOUND",
      };
    }

    const existingCategory = await this.categoryRepository.findCategoryByName(
      name,
      currentMonth.getId(),
    );

    if (existingCategory) {
      throw <UseCaseError>{
        message: "A category with this name already exists for this month",
        errorType: "CATEGORY_ALREADY_EXISTS",
      };
    }

    const category = new Category(currentMonth.getId(), name, spendingLimit);
    const newCategory = await this.categoryRepository.createCategory(category);

    return newCategory;
  }
}

export default CreateCategoryUseCase;
