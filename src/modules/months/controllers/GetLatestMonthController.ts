import { FastifyReply, FastifyRequest } from "fastify";
import { monthMapper } from "../mappers/monthMapper";
import GetLatestMonthUseCase from "../use-cases/GetLatestMonthUseCase";

class GetLatestMonthController {
  private getLatestMonthUseCase: GetLatestMonthUseCase;

  constructor(getLatestMonthUseCase: GetLatestMonthUseCase) {
    this.getLatestMonthUseCase = getLatestMonthUseCase;
  }

  async execute(request: FastifyRequest, reply: FastifyReply) {
    const userId = Number(request.userId);

    try {
      const { month, categories } =
        await this.getLatestMonthUseCase.execute(userId);
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

export default GetLatestMonthController;
