import { FastifyReply, FastifyRequest } from "fastify";
import DeleteExpenseUseCase from "../use-cases/DeleteExpenseUseCase";

class DeleteExpenseController {
  private deleteExpenseUseCase: DeleteExpenseUseCase;

  constructor(deleteExpenseUseCase: DeleteExpenseUseCase) {
    this.deleteExpenseUseCase = deleteExpenseUseCase;
  }

  async execute(
    request: FastifyRequest<{
      Params: { expenseId: string };
    }>,
    reply: FastifyReply,
  ) {
    const expenseId = Number(request.params.expenseId);

    if (isNaN(expenseId)) {
      return reply.status(400).send({ message: "Invalid expenseId" });
    }

    try {
      await this.deleteExpenseUseCase.execute(expenseId);
      return reply.status(201).send({ success: true });
    } catch (error: any) {
      if ("errorType" in error) {
        if (error.errorType === "EXPENSE_NOT_FOUND") {
          return reply.status(400).send({
            message: error.message,
            details: error.details,
          });
        }
      }

      return reply.status(500).send({ message: "internal server error" });
    }
  }
}

export default DeleteExpenseController;
