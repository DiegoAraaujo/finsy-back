import { IMonthRepository } from "../../../interfaces/IMonthRepository";

class GetAllMonthsUseCase {
  private monthRepository: IMonthRepository;

  constructor(monthRepository: IMonthRepository) {
    this.monthRepository = monthRepository;
  }

  async execute(userId: number) {
    const months = await this.monthRepository.findAllMonths(userId);
    return months;
  }
}

export default GetAllMonthsUseCase;
