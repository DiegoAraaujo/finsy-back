import { FastifyReply, FastifyRequest } from "fastify";
import GetExpensesByCategoryUseCase from "../use-cases/GetExpensesByCategoryUseCase";

class GetExpensesByCategoryController {
  private getExpensesByCategoryUseCase: GetExpensesByCategoryUseCase;

  constructor(getExpensesByCategoryUseCase: GetExpensesByCategoryUseCase) {
    this.getExpensesByCategoryUseCase = getExpensesByCategoryUseCase;
  }

  async execute(
    request: FastifyRequest<{
      Params: { categoryId: string };
    }>,
    reply: FastifyReply,
  ) {
    const categoryId = Number(request.params.categoryId);

    if (isNaN(categoryId)) {
      return reply.status(400).send({ message: "Invalid categoryId" });
    }

    try {
      const expenses =
        await this.getExpensesByCategoryUseCase.execute(categoryId);
      return reply.status(201).send( expenses );
    } catch (error) {
      return reply.status(500).send({ message: "internal server error" });
    }
  }
}

export default GetExpensesByCategoryController;
