import Category from "../../../entities/Category";
import Month from "../../../entities/Month";
import { ICategoryRepository } from "../../../interfaces/ICategoryRepository";
import { IMonthRepository } from "../../../interfaces/IMonthRepository";
import UseCaseError from "../../../interfaces/UseCaseError";

class CreateMonthUseCase {
  private monthRepository: IMonthRepository;
  private categoryRepository: ICategoryRepository;

  constructor(
    monthRepository: IMonthRepository,
    categoryRepository: ICategoryRepository,
  ) {
    this.monthRepository = monthRepository;
    this.categoryRepository = categoryRepository;
  }

  async execute(
    userId: number,
    salary: number,
    categories: { name: string; spendingLimit: number }[],
  ): Promise<{ month: Month; categories: Category[] }> {
    const today = new Date();

    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const existingMonth = await this.monthRepository.existsMonth(
      userId,
      month,
      year,
    );

    if (existingMonth) {
      throw <UseCaseError>{
        message: "This month is already registered.",
        errorType: "MONTH_ALREADY_EXISTS",
      };
    }

    const monthEntity = new Month(userId, year, month, salary);
    const newMonth = await this.monthRepository.createMonth(monthEntity);
    const categoriesEntity = categories.map(
      (c) => new Category(newMonth.getId(), c.name, c.spendingLimit),
    );

    const newCategories =
      await this.categoryRepository.createManyCategories(categoriesEntity);

    return { month: newMonth, categories: newCategories };
  }
}

export default CreateMonthUseCase;
