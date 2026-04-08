import Month from "../entities/Month";

export interface IMonthRepository {
  createMonthWithCategories(
    month: Month,
    categories: { name: string; spendingLimit: number }[],
  ): Promise<Month>;
  findCurrentMonth(
    userId: number,
    month: number,
    year: number,
  ): Promise<Month | null>;
  findAllMonths(userid: number): Promise<Month[]>;
  findMonthById(monthId: number): Promise<Month | null>;
  findLatestMonth(userId: number): Promise<Month | null>;
  existsMonth(userId: number, month: number, year: number): Promise<boolean>;
}
