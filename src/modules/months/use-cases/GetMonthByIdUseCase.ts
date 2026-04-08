import Month from "../../../entities/Month";
import { IMonthRepository } from "../../../interfaces/IMonthRepository";
import UseCaseError from "../../../interfaces/UseCaseError";

class GetMonthByIdUseCase {
  private monthRepository: IMonthRepository;

  constructor(monthRepository: IMonthRepository) {
    this.monthRepository = monthRepository;
  }

  async execute(monthId: number): Promise<Month> {
    const month = await this.monthRepository.findMonthById(monthId);

    if (!month) {
      throw <UseCaseError>{
        message: "The requested month could not be found.",
        errorType: "MONTH_NOT_FOUND",
      };
    }

    return month;
  }
}

export default GetMonthByIdUseCase;
