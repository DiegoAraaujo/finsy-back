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

    if (isNaN(userId)) {
      return reply.status(400).send({ message: "Invalid userId" });
    }

    try {
      const month = await this.getCurrentMonthUseCase.execute(userId);
      return reply
        .status(200)
        .send({ month: month ? monthMapper(month) : null });
    } catch (error) {
      return reply.status(500).send({ message: "Internal error" });
    }
  }
}

export default GetCurrentMonthController;
