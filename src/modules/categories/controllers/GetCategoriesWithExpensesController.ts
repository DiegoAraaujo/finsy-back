import { FastifyReply, FastifyRequest } from "fastify";
import GetCategoriesWithExpensesUseCase from "../use-cases/GetCategoriesWithExpensesUseCase";

class GetCategoriesWithExpensesController {
  private getCategoriesWithExpensesUseCase: GetCategoriesWithExpensesUseCase;

  constructor(
    getCategoriesWithExpensesUseCase: GetCategoriesWithExpensesUseCase,
  ) {
    this.getCategoriesWithExpensesUseCase = getCategoriesWithExpensesUseCase;
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
      const categoriesWithTotalExpenses =
        await this.getCategoriesWithExpensesUseCase.execute(monthId);
      return reply
        .status(200)
        .send({ categories: categoriesWithTotalExpenses });
    } catch (error) {
      return reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export default GetCategoriesWithExpensesController;
