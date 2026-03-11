import { FastifyReply, FastifyRequest } from "fastify";

import { updateCategorySchema } from "../../../validators/categoryValidator";
import UpdateCategoryUseCase from "../use-cases/UpdateCategoryUseCase";
import { UpdateCategoryDTO } from "../dtos/UpdateCategoryDTO";
import { categoryMapper } from "../mappers/CategoryMapper";

class UpdateCategoryController {
  private updateCategoryUseCase: UpdateCategoryUseCase;

  constructor(updateCategoryUseCase: UpdateCategoryUseCase) {
    this.updateCategoryUseCase = updateCategoryUseCase;
  }

  async execute(
    request: FastifyRequest<{
      Body: UpdateCategoryDTO;
      Params: { categoryId: string };
    }>,
    reply: FastifyReply,
  ) {
    const categoryId = Number(request.params.categoryId);

    if (isNaN(categoryId)) {
      return reply.status(400).send({ message: "Invalid categoryId" });
    }

    const validation = updateCategorySchema.safeParse(request.body);

    if (!validation.success) {
      return reply
        .status(400)
        .send({ message: validation.error.issues.map((e) => e.message) });
    }

    const { name, spendingLimit } = validation.data;

    try {
      const category = await this.updateCategoryUseCase.execute(categoryId, {
        name,
        spendingLimit,
      });
      return reply.status(201).send(categoryMapper(category));
    } catch (error: any) {
      if ("errorType" in error) {
        if (error.errorType === "CATEGORY_DOES_NOT_EXISTS") {
          return reply.status(404).send({
            message: error.message,
            details: error.details,
          });
        } else if (error.errorType === "VALIDATION_ERROR") {
          return reply.status(400).send({
            message: error.message,
            details: error.details,
          });
        }
      }

      return reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export default UpdateCategoryController;
