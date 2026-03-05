import { FastifyReply, FastifyRequest } from "fastify";
import { monthMapper } from "../mappers/monthMapper";
import GetAllMonthsUseCase from "../use-cases/GetAllMonthsUseCase";

class GetAllMonthsController {
  private getAllMonthsUseCase: GetAllMonthsUseCase;

  constructor(getAllMonthsUseCase: GetAllMonthsUseCase) {
    this.getAllMonthsUseCase = getAllMonthsUseCase;
  }

  async execute(request: FastifyRequest, reply: FastifyReply) {
    const userId = Number(request.userId);

    if (isNaN(userId)) {
      return reply.status(400).send({ message: "Invalid userId" });
    }

    try {
      const months = await this.getAllMonthsUseCase.execute(userId);
      return reply
        .status(200)
        .send({ months: months.map((m) => monthMapper(m)) });
    } catch (error: any) {
      return reply.status(500).send({ message: "Internal error" });
    }
  }
}

export default GetAllMonthsController;
