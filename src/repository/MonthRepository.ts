import Month from "../entities/Month";
import { IMonthRepository } from "../interfaces/IMonthRepository";
import { prisma } from "../lib/prisma";

class MonthRepository implements IMonthRepository {
  async createMonthWithCategories(
    month: Month,
    categories: { name: string; spendingLimit: number }[],
  ) {
    return await prisma.$transaction(async (tx) => {
      const monthCreated = await tx.month.create({
        data: month.toPersistence(),
      });

      await tx.category.createMany({
        data: categories.map((category) => ({
          name: category.name,
          spendingLimit: category.spendingLimit,
          monthId: monthCreated.id,
        })),
      });

      return new Month(
        monthCreated.userId,
        monthCreated.year,
        monthCreated.month,
        monthCreated.salary.toNumber(),
        monthCreated.id,
      );
    });
  }

  async findCurrentMonth(userId: number, month: number, year: number) {
    const currentMonth = await prisma.month.findUnique({
      where: {
        userId_month_year: {
          userId,
          month,
          year,
        },
      },
    });

    return currentMonth
      ? new Month(
          currentMonth.userId,
          currentMonth.year,
          currentMonth.month,
          currentMonth.salary.toNumber(),
          currentMonth.id,
        )
      : null;
  }

  async findAllMonths(userId: number) {
    const months = await prisma.month.findMany({
      where: { userId },
      orderBy: [{ year: "desc" }, { month: "desc" }],
    });

    return months.map(
      (m) => new Month(m.userId, m.year, m.month, m.salary.toNumber(), m.id),
    );
  }

  async findLatestMonth(userId: number) {
    const month = await prisma.month.findFirst({
      where: { userId },
      orderBy: [{ year: "desc" }, { month: "desc" }],
    });

    return month
      ? new Month(
          month.userId,
          month.year,
          month.month,
          month.salary.toNumber(),
          month.id,
        )
      : null;
  }

  async existsMonth(userId: number, month: number, year: number) {
    const existingMonth = await prisma.month.findUnique({
      where: {
        userId_month_year: {
          userId,
          month,
          year,
        },
      },
    });

    return existingMonth ? true : false;
  }
}

export default MonthRepository;
