import { FastifyRequest, FastifyReply } from "fastify";
import UpdateUserUseCase from "../use-cases/UpdateUserUseCase";
import { userMapper } from "../mappers/userMapper";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";

class UpdateUserController {
  private updateUserUseCase: UpdateUserUseCase;

  constructor(updateUserUseCase: UpdateUserUseCase) {
    this.updateUserUseCase = updateUserUseCase;
  }

  async execute(
    request: FastifyRequest<{ Body: UpdateUserDTO }>,
    reply: FastifyReply,
  ) {
    const userId = request.userId;
    const { name, email } = request.body;

    try {
      const newUser = await this.updateUserUseCase.execute(userId, name, email);

      return reply.status(201).send(userMapper(newUser));
    } catch (error: any) {
      if ("errorType" in error) {
        switch (error.errorType) {
          case "VALIDATION_ERROR":
            return reply.status(400).send({
              message: error.message,
              details: error.details,
            });

          case "EMAIL_DUPLICATED":
            return reply.status(409).send({
              message: error.message,
            });
        }
      }
      return reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export default UpdateUserController;
