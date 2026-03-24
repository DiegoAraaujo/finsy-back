import { FastifyReply, FastifyRequest } from "fastify";

import { categoryMapper } from "../mappers/CategoryMapper";
import GetCategoryByIdUseCase from "../use-cases/GetCategoryByIdUseCase";

class GetCategoryByIdController {
  private getCategoryByIdUseCase: GetCategoryByIdUseCase;

  constructor(getCategoryByIdUseCase: GetCategoryByIdUseCase) {
    this.getCategoryByIdUseCase = getCategoryByIdUseCase;
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
      const category = await this.getCategoryByIdUseCase.execute(categoryId);
      return reply.status(200).send(categoryMapper(category));
    } catch (error: any) {
      if ("errorType" in error) {
        if (error.errorType === "CATEGORY_NOT_FOUND") {
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

export default GetCategoryByIdController;
