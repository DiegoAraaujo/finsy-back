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
  ): Promise< Month > {
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

    const totalAllocatedLimit = categories.reduce(
      (sum, category) => sum + category.spendingLimit,
      0,
    );

    if (totalAllocatedLimit > salary) {
      throw <UseCaseError>{
        message: "Total allocated limit exceeds the monthly salary",
        errorType: "MONTHLY_LIMIT_EXCEEDED",
      };
    }

    const monthEntity = new Month(userId, year, month, salary);

    const newMonth = await this.monthRepository.createMonthWithCategories(
      monthEntity,
      categories,
    );

    return newMonth;
  }
}

export default CreateMonthUseCase;
