import { ICategoryRepository } from "../../../interfaces/ICategoryRepository";
import { IExpenseRepository } from "../../../interfaces/IExpenseRepository";
import { IMonthRepository } from "../../../interfaces/IMonthRepository";
import UseCaseError from "../../../interfaces/UseCaseError";

class GetDashboardUseCase {
  constructor(
    private expenseRepository: IExpenseRepository,
    private categoryRepository: ICategoryRepository,
    private monthRepository: IMonthRepository,
  ) {}

  async execute(userId: number) {
    const now = new Date();

    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const currentMonth = await this.monthRepository.findCurrentMonth(
      userId,
      month,
      year,
    );

    if (!currentMonth) {
      throw <UseCaseError>{
        message: "Month not found for current period",
        errorType: "MONTH_NOT_FOUND",
      };
    }

    const categories =
      await this.categoryRepository.findCategoriesWithTotalExpensesByMonth(
        currentMonth.getId(),
      );

    const currentTotal = await this.expenseRepository.getTotalExpensesByMonth(
      currentMonth.getId(),
    );

    const previousMonth = await this.monthRepository.findPreviousMonth(
      userId,
      month,
      year,
    );

    let previousTotal = 0;

    if (previousMonth) {
      previousTotal = await this.expenseRepository.getTotalExpensesByMonth(
        previousMonth.getId(),
      );
    }

    let variation = 0;

    if (previousTotal > 0) {
      variation = ((currentTotal - previousTotal) / previousTotal) * 100;
    } else if (currentTotal > 0) {
      variation = 100;
    }

    const userMonths = await this.monthRepository.findAllMonths(userId);

    const evolution = await Promise.all(
      userMonths.slice(0, 6).map(async (m) => {
        const total = await this.expenseRepository.getTotalExpensesByMonth(
          m.getId(),
        );

        return {
          month: m.getMonth(),
          year: m.getYear(),
          total,
        };
      }),
    );

    evolution.reverse();

    const paymentMethods =
      await this.expenseRepository.getExpensesGroupedByPaymentMethod(
        currentMonth.getId(),
      );

    return {
      categories,
      comparison: {
        current: currentTotal,
        previous: previousTotal,
        variation,
      },
      evolution,
      paymentMethods,
    };
  }
}

export default GetDashboardUseCase;
