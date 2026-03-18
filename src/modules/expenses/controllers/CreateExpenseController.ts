import { FastifyReply, FastifyRequest } from "fastify";
import { PaymentMethod } from "@prisma/client";
import CreateExpenseUseCase from "../use-cases/CreateExpenseUseCase";
import { CreateExpenseDTO } from "../dtos/CreateExpenseDTO";
import { createExpenseSchema } from "../../../validators/ExpenseValidator";

class CreateExpenseController {
  private createExpenseUseCase: CreateExpenseUseCase;

  constructor(createExpenseUseCase: CreateExpenseUseCase) {
    this.createExpenseUseCase = createExpenseUseCase;
  }

  async execute(
    request: FastifyRequest<{
      Body: CreateExpenseDTO;
      Params: { categoryId: string; monthId: string };
    }>,
    reply: FastifyReply,
  ) {
    const categoryId = Number(request.params.categoryId);
    const monthId = Number(request.params.monthId);

    if (isNaN(categoryId) || isNaN(monthId)) {
      return reply
        .status(400)
        .send({ message: "Invalid categoryId or monthId" });
    }
    const { amount, paymentMethod, description } = request.body;

    if (!Object.values(PaymentMethod).includes(paymentMethod)) {
      return reply.status(400).send({ message: "Invalid payment method" });
    }

    const validation = createExpenseSchema.safeParse({ amount, description });

    if (!validation.success) {
      return reply
        .status(400)
        .send({ message: validation.error.issues.map((e) => e.message) });
    }
    try {
      const expense = await this.createExpenseUseCase.execute(
        monthId,
        categoryId,
        validation.data.amount,
        paymentMethod,
        validation.data.description,
      );

      return reply.status(201).send({ expense });
    } catch (error: any) {
      if ("errorType" in error) {
        if (error.errorType === "MONTH_NOT_FOUND") {
          return reply.status(400).send({
            message: error.message,
            details: error.details,
          });
        }
      }

      return reply.status(500).send({ message: "internal error" });
    }
  }
}

export default CreateExpenseController;
