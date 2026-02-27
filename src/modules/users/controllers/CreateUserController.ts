import { FastifyRequest, FastifyReply } from "fastify";
import CreateUserUseCase from "../use-cases/CreateUserUseCase";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { userMapper } from "../mappers/userMapper";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async execute(
    request: FastifyRequest<{ Body: CreateUserDTO }>,
    reply: FastifyReply,
  ) {
    const { name, email, password } = request.body;

    try {
      const newUser = await this.createUserUseCase.execute(
        name,
        email,
        password,
      );
      return reply.status(201).send(userMapper(newUser));
    } catch (error: any) {
      if ("errorType" in error) {
        if (error.errorType === "VALIDATION_ERROR") {
          return reply.status(400).send({
            message: error.message,
            details: error.details,
          });
        } else if (error.errorType === "EMAIL_DUPLICATED") {
          return reply.status(409).send({ message: error.message });
        }
      }

      return reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export default CreateUserController;
