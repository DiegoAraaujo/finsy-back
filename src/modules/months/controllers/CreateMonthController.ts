import { FastifyReply, FastifyRequest } from "fastify";
import CreateMonthUseCase from "../use-cases/CreateMonthUseCase";
import { monthMapper } from "../mappers/monthMapper";

class CreateMonthController {
  private createMonthUseCase: CreateMonthUseCase;

  constructor(createMonthUseCase: CreateMonthUseCase) {
    this.createMonthUseCase = createMonthUseCase;
  }

  async execute(
    request: FastifyRequest<{ Body: { salary: number } }>,
    reply: FastifyReply,
  ) {
    const { salary } = request.body;
    const userId = Number(request.userId);

    if (isNaN(userId)) {
      return reply.status(400).send({ message: "Invalid userId" });
    }

    if (salary <= 0) {
      return reply.status(400).send();
    }

    try {
      const month = await this.createMonthUseCase.execute(userId, salary);
      reply.status(201).send(monthMapper(month));
    } catch (error: any) {
      if ("errorType" in error) {
        if (error.errorType === "MONTH_ALREADY_EXISTS") {
          return reply.status(400).send({
            message: error.message,
            details: error.details,
          });
        }
      }

      reply.status(500).send({ message: "Internal error" });
    }
  }
}

export default CreateMonthController;
