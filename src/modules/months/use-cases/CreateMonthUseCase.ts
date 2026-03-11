import Month from "../../../entities/Month";
import { IMonthRepository } from "../../../interfaces/IMonthRepository";
import UseCaseError from "../../../interfaces/UseCaseError";

class CreateMonthUseCase {
  private monthRepository: IMonthRepository;

  constructor(monthRepository: IMonthRepository) {
    this.monthRepository = monthRepository;
  }

  async execute(userId: number, salary: number): Promise<Month> {
    const today = new Date();

    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const existingMonth = await this.monthRepository.existsMonth(
      userId,
      month,
      year,
    );

    if (existingMonth) {
      throw <UseCaseError>{
        message: "This month is already registered.",
        errorType: "MONTH_ALREADY_EXISTS",
      };
    }

    const monthEntity = new Month(userId, year, month, salary);
    const newMonth = await this.monthRepository.createMonth(monthEntity);

    return newMonth;
  }
}

export default CreateMonthUseCase;
