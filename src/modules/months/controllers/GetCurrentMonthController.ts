import { FastifyReply, FastifyRequest } from "fastify";
import { monthMapper } from "../mappers/monthMapper";
import GetCurrentMonthUseCase from "../use-cases/GetCurrentMonthUseCase";

class GetCurrentMonthController {
  private getCurrentMonthUseCase: GetCurrentMonthUseCase;

  constructor(getCurrentMonthUseCase: GetCurrentMonthUseCase) {
    this.getCurrentMonthUseCase = getCurrentMonthUseCase;
  }

  async execute(request: FastifyRequest, reply: FastifyReply) {
    const userId = Number(request.userId);

    try {
      const { month, categories } =
        await this.getCurrentMonthUseCase.execute(userId);
      return reply.status(200).send({ month: monthMapper(month), categories });
    } catch (error: any) {
      if ("errorType" in error) {
        if (error.errorType === "MONTH_DOES_NOT_EXISTS") {
          return reply.status(404).send({
            message: error.message,
            details: error.details,
          });
        }
      }
      return reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export default GetCurrentMonthController;
