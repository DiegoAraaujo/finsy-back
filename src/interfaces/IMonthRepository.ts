import Month from "../entities/Month";

export interface IMonthRepository {
  createMonth(month: Month): Promise<Month>;
  findCurrentMonth(
    userId: number,
    month: number,
    year: number,
  ): Promise<Month | null>;
  findAllMonths(userid: number): Promise<Month[]>;
  findLatestMonth(userId: number): Promise<Month | null>;
  existsMonth(userId: number, month: number, year: number): Promise<boolean>;
}
