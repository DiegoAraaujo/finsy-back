import Month from "../../../entities/Month";
import { IMonthRepository } from "../../../interfaces/IMonthRepository";

class GetLatestMonthUseCase {
  private monthRepository: IMonthRepository;

  constructor(monthRepository: IMonthRepository) {
    this.monthRepository = monthRepository;
  }

  async execute(userId: number): Promise<Month | null> {
    const lastestMonth = await this.monthRepository.findLatestMonth(userId);
    return lastestMonth;
  }
}

export default GetLatestMonthUseCase;
