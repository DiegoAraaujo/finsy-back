import { FastifyReply, FastifyRequest } from "fastify";
import GetDashboardDataUseCase from "../use-cases/GetDashboardUseCase";

class GetDashboardController {
  constructor(private getDashboardDataUseCase: GetDashboardDataUseCase) {}

  async execute(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = request.userId;

      const data = await this.getDashboardDataUseCase.execute(userId);

      return reply.status(200).send(data);
    } catch (error: any) {
      if (error.errorType === "MONTH_NOT_FOUND") {
        return reply.status(404).send({
          message: error.message,
        });
      }

      return reply.status(500).send({
        message: "Internal server error",
      });
    }
  }
}

export default GetDashboardController;
