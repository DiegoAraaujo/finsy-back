import { FastifyReply, FastifyRequest } from "fastify";
import GetCategoriesUseCase from "../use-cases/GetCategoriesUseCase";
import { categoryMapper } from "../mappers/CategoryMapper";

class GetCategoriesController {
  private getCategoriesUseCase: GetCategoriesUseCase;

  constructor(getCategoriesUseCase: GetCategoriesUseCase) {
    this.getCategoriesUseCase = getCategoriesUseCase;
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
      const categories = await this.getCategoriesUseCase.execute(monthId);
      return reply.status(200).send(categories.map((c) => categoryMapper(c)));
    } catch (error) {
      return reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export default GetCategoriesController;
