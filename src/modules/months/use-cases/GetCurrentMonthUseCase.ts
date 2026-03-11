import Month from "../../../entities/Month";
import { IMonthRepository } from "../../../interfaces/IMonthRepository";

class GetCurrentMonthUseCase {
  private monthRepository: IMonthRepository;

  constructor(monthRepository: IMonthRepository) {
    this.monthRepository = monthRepository;
  }

  async execute(userId: number): Promise<Month | null> {
    const today = new Date();

    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const currentMonth = await this.monthRepository.findCurrentMonth(
      userId,
      month,
      year,
    );
    return currentMonth;
  }
}

export default GetCurrentMonthUseCase;
