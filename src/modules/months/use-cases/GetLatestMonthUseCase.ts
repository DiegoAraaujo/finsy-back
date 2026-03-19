import Category from "../../../entities/Category";
import Month from "../../../entities/Month";
import { ICategoryRepository } from "../../../interfaces/ICategoryRepository";
import { IMonthRepository } from "../../../interfaces/IMonthRepository";
import UseCaseError from "../../../interfaces/UseCaseError";

class GetLatestMonthUseCase {
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
  ): Promise<{ month: Month; categories: Category[] }> {
    const latestMonth = await this.monthRepository.findLatestMonth(userId);

    if (!latestMonth) {
      throw <UseCaseError>{
        message: "Latest month not found for this user.",
        errorType: "MONTH_DOES_NOT_EXISTS",
      };
    }

    const categories = await this.categoryRepository.findCategoriesByMonthId(
      latestMonth.getId(),
    );

    return { month: latestMonth, categories };
  }
}

export default GetLatestMonthUseCase;
