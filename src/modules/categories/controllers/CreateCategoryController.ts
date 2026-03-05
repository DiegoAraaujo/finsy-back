import { FastifyReply, FastifyRequest } from "fastify";
import CreateCategoryUseCase from "../use-cases/CreateCategoryUseCase";
import { CreateCategoryDTO } from "../dtos/CreateCategoryDTO";
import { createCategorySchema } from "../../../validators/categoryValidator";
import { categoryMapper } from "../mappers/CategoryMapper";

class createCategoryController {
  private createCategoryUseCase: CreateCategoryUseCase;

  constructor(createCategoryUseCase: CreateCategoryUseCase) {
    this.createCategoryUseCase = createCategoryUseCase;
  }

  async execute(
    request: FastifyRequest<{
      Body: CreateCategoryDTO;
      Params: { monthId: string };
    }>,
    reply: FastifyReply,
  ) {
    const monthId = Number(request.params.monthId);

    if (isNaN(monthId)) {
      return reply.status(400).send({ message: "Invalid monthId" });
    }

    const validation = createCategorySchema.safeParse(request.body);

    if (!validation.success) {
      return reply
        .status(400)
        .send({ message: validation.error.issues.map((e) => e.message) });
    }

    const { name, spendingLimit } = validation.data;

    try {
      const category = await this.createCategoryUseCase.execute(
        monthId,
        name,
        spendingLimit,
      );
      return reply.status(201).send(categoryMapper(category));
    } catch (error: any) {
      if ("errorType" in error) {
        if (error.errorType === "CATEGORY_ALREADY_EXISTS") {
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

export default createCategoryController;
