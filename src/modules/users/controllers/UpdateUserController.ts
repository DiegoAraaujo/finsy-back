import { FastifyRequest, FastifyReply } from "fastify";
import UpdateUserUseCase from "../use-cases/UpdateUserUseCase";
import { userMapper } from "../mappers/userMapper";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import { updateUserSchema } from "../../../validators/userValidator";

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

    const validation = updateUserSchema.safeParse(request.body);

    if (!validation.success) {
      return reply
        .status(400)
        .send({ message: validation.error.issues.map((e) => e.message) });
    }

    const { name, email } = validation.data;

    try {
      const newUser = await this.updateUserUseCase.execute(userId, {
        name,
        email,
      });

      return reply.status(200).send(userMapper(newUser));
    } catch (error: any) {
      if ("errorType" in error) {
        switch (error.errorType) {
          case "VALIDATION_ERROR":
            return reply.status(400).send({
              message: error.message,
              details: error.details,
            });

          case "NOT_FOUND":
            return reply.status(404).send({
              message: error.message,
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
