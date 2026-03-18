import { FastifyReply, FastifyRequest } from "fastify";
import DeleteCategoryUseCase from "../use-cases/DeleteCategoryUseCase";

class DeleteCategoryController {
  private deleteCategoryUseCase: DeleteCategoryUseCase;

  constructor(deleteCategoryUseCase: DeleteCategoryUseCase) {
    this.deleteCategoryUseCase = deleteCategoryUseCase;
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
      await this.deleteCategoryUseCase.execute(categoryId);

      return reply.status(201).send({ success: true });
    } catch (error: any) {
      if ("errorType" in error) {
        if (error.errorType === "CATEGORY_DOES_NOT_EXISTS") {
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

export default DeleteCategoryController;
