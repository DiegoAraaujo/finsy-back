import { FastifyReply, FastifyRequest } from "fastify";
import CreateMonthUseCase from "../use-cases/CreateMonthUseCase";
import { monthMapper } from "../mappers/monthMapper";
import { CreateCategoryDTO } from "../../categories/dtos/CreateCategoryDTO";
import { createCategoriesSchema } from "../../../validators/categoryValidator";
import { categoryMapper } from "../../categories/mappers/CategoryMapper";

class CreateMonthController {
  private createMonthUseCase: CreateMonthUseCase;

  constructor(createMonthUseCase: CreateMonthUseCase) {
    this.createMonthUseCase = createMonthUseCase;
  }

  async execute(
    request: FastifyRequest<{
      Body: { salary: number; categories: CreateCategoryDTO[] };
    }>,
    reply: FastifyReply,
  ) {
    const { salary } = request.body;
    const userId = Number(request.userId);

    if (salary <= 0) {
      return reply.status(400).send();
    }

    const validation = createCategoriesSchema.safeParse(
      request.body.categories,
    );

    if (!validation.success) {
      return reply
        .status(400)
        .send({ message: validation.error.issues.map((e) => e.message) });
    }

    try {
      const { month, categories } = await this.createMonthUseCase.execute(
        userId,
        salary,
        validation.data,
      );
      return reply.status(201).send({
        month: monthMapper(month),
        categories: categories.map((c) => categoryMapper(c)),
      });
    } catch (error: any) {
      if ("errorType" in error) {
        if (error.errorType === "MONTH_ALREADY_EXISTS") {
          return reply.status(400).send({
            message: error.message,
            details: error.details,
          });
        }
      }
      reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export default CreateMonthController;
