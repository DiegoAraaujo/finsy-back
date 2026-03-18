import { FastifyReply, FastifyRequest } from "fastify";
import GetExpensesByMonthUseCase from "../use-cases/GetExpensesByMonthUseCase";

class GetExpensesByMonthController {
  private getExpensesByMonthUseCase: GetExpensesByMonthUseCase;

  constructor(getExpensesByMonthUseCase: GetExpensesByMonthUseCase) {
    this.getExpensesByMonthUseCase = getExpensesByMonthUseCase;
  }

  async execute(
    request: FastifyRequest<{
      Params: { monthId: string };
    }>,
    reply: FastifyReply,
  ) {
    const monthId = Number(request.params.monthId);

    if (isNaN(monthId)) {
      return reply.status(400).send({ message: "Invalid monthId" });
    }

    try {
      const expenses = await this.getExpensesByMonthUseCase.execute(monthId);
      return reply.status(201).send({ expenses });
    } catch (error) {
      return reply.status(500).send({ message: "internal server error" });
    }
  }
}

export default GetExpensesByMonthController;
