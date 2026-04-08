import { FastifyReply, FastifyRequest } from "fastify";
import { monthMapper } from "../mappers/monthMapper";
import GetMonthByIdUseCase from "../use-cases/GetMonthByIdUseCase";

class GetMonthByIdController {
  private getMonthByIdUseCase: GetMonthByIdUseCase;

  constructor(getMonthByIdUseCase: GetMonthByIdUseCase) {
    this.getMonthByIdUseCase = getMonthByIdUseCase;
  }

  async execute(
    request: FastifyRequest<{
      Params: { id: string };
    }>,
    reply: FastifyReply,
  ) {
    const id = Number(request.params.id);

    if (isNaN(id)) {
      return reply.status(400).send({
        message: "Invalid month ID provided.",
      });
    }

    try {
      const month = await this.getMonthByIdUseCase.execute(id);
      return reply.status(200).send(monthMapper(month));
    } catch (error: any) {
      if ("errorType" in error) {
        if (error.errorType === "MONTH_NOT_FOUND") {
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

export default GetMonthByIdController;
