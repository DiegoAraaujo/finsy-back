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
      const month = await this.getLatestMonthUseCase.execute(userId);
      return reply
        .status(200)
        .send({ month: month ? monthMapper(month) : null });
    } catch (error) {
      return reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export default GetLatestMonthController;
