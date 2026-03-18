import { FastifyReply, FastifyRequest } from "fastify";
import { PaymentMethod } from "@prisma/client";
import { updateExpenseSchema } from "../../../validators/ExpenseValidator";
import UpdateExpenseUseCase from "../use-cases/UpdateExpenseUseCase";
import { updateExpenseDTO } from "../dtos/UpdateExpenseDTO";

class UpdateExpenseController {
  private updateExpenseUseCase: UpdateExpenseUseCase;

  constructor(updateExpenseUseCase: UpdateExpenseUseCase) {
    this.updateExpenseUseCase = updateExpenseUseCase;
  }

  async execute(
    request: FastifyRequest<{
      Body: updateExpenseDTO;
      Params: { expenseId: string };
    }>,
    reply: FastifyReply,
  ) {
    const expenseId = Number(request.params.expenseId);

    if (isNaN(expenseId)) {
      return reply.status(400).send({ message: "Invalid expenseId" });
    }
    const { amount, paymentMethod, description } = request.body;

    if (
      paymentMethod &&
      !Object.values(PaymentMethod).includes(paymentMethod)
    ) {
      return reply.status(400).send({ message: "Invalid payment method" });
    }

    const validation = updateExpenseSchema.safeParse({ amount, description });

    if (!validation.success) {
      return reply
        .status(400)
        .send({ message: validation.error.issues.map((e) => e.message) });
    }
    try {
      const updates = {
        amount: validation.data.amount,
        paymentMethod,
        description: validation.data.description,
      };
      const expense = await this.updateExpenseUseCase.execute(
        expenseId,
        updates,
      );

      return reply.status(201).send({ expense });
    } catch (error) {
      return reply.status(500).send({ message: "internal error" });
    }
  }
}

export default UpdateExpenseController;
