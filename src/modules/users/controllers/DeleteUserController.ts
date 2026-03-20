import { FastifyRequest, FastifyReply } from "fastify";
import DeleteUserUseCase from "../use-cases/DeleteUserUseCase";

class DeleteUserController {
  private deleteUserUseCase: DeleteUserUseCase;

  constructor(deleteUserUseCase: DeleteUserUseCase) {
    this.deleteUserUseCase = deleteUserUseCase;
  }

  async execute(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.userId;

    try {
      await this.deleteUserUseCase.execute(userId);
      return reply.status(200).send({ success: true });
    } catch (error: any) {
      if ("errorType" in error) {
        if (error.errorType === "NOT_FOUND") {
          return reply.status(404).send({ message: error.message });
        }
      }
      return reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export default DeleteUserController;
