import Category from "../entities/Category";
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
  findLatestMonth(userId: number): Promise<Month | null>;
  existsMonth(userId: number, month: number, year: number): Promise<boolean>;
}
