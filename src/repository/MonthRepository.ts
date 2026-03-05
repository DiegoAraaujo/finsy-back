import Month from "../entities/Month";
import { IMonthRepository } from "../interfaces/IMonthRepository";
import { prisma } from "../lib/prisma";

class MonthRepository implements IMonthRepository {
  async createMonth(month: Month) {
    const monthCreated = await prisma.month.create({
      data: month.toPersistence(),
    });
    return new Month(
      monthCreated.userId,
      monthCreated.year,
      monthCreated.month,
      monthCreated.id,
    );
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
          currentMonth.id,
        )
      : null;
  }

  async findAllMonths(userId: number) {
    const months = await prisma.month.findMany({
      where: { userId },
      orderBy: [{ year: "desc" }, { month: "desc" }],
    });

    return months.map((m) => new Month(m.userId, m.year, m.month, m.id));
  }

  async findLatestMonth(userId: number) {
    const month = await prisma.month.findFirst({
      where: { userId },
      orderBy: [{ year: "desc" }, { month: "desc" }],
    });

    return month
      ? new Month(month.userId, month.year, month.month, month.id)
      : null;
  }

  async existsMonth(month: number, year: number, userId: number) {
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
