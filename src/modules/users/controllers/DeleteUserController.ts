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
      return reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export default DeleteUserController;
