import Category from "../../../entities/Category";
import Month from "../../../entities/Month";
import { ICategoryRepository } from "../../../interfaces/ICategoryRepository";
import { ICategoryWithTotalExpenses } from "../../../interfaces/ICategoryWithTotalExpenses";
import { IMonthRepository } from "../../../interfaces/IMonthRepository";
import UseCaseError from "../../../interfaces/UseCaseError";

class GetCurrentMonthUseCase {
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
  ): Promise<{ month: Month; categories: ICategoryWithTotalExpenses[] }> {
    const today = new Date();

    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const currentMonth = await this.monthRepository.findCurrentMonth(
      userId,
      month,
      year,
    );

    if (!currentMonth) {
      throw <UseCaseError>{
        message: "Month does not exist.",
        errorType: "MONTH_DOES_NOT_EXISTS",
      };
    }

    const categories =
      await this.categoryRepository.findCategoriesWithTotalExpensesByMonth(
        currentMonth.getId(),
      );

    return { month: currentMonth, categories };
  }
}

export default GetCurrentMonthUseCase;
