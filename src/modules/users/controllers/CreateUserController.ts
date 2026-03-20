import { FastifyRequest, FastifyReply } from "fastify";
import CreateUserUseCase from "../use-cases/CreateUserUseCase";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { userMapper } from "../mappers/userMapper";
import { createUserSchema } from "../../../validators/userValidator";

class CreateUserController {
  private createUserUseCase: CreateUserUseCase;

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async execute(
    request: FastifyRequest<{ Body: CreateUserDTO }>,
    reply: FastifyReply,
  ) {
    const validation = createUserSchema.safeParse(request.body);

    if (!validation.success) {
      return reply
        .status(400)
        .send({ message: validation.error.issues.map((e) => e.message) });
    }

    const { name, email, password } = validation.data;

    try {
      const newUser = await this.createUserUseCase.execute(
        name,
        email,
        password,
      );
      return reply.status(201).send(userMapper(newUser));
    } catch (error: any) {
      if ("errorType" in error) {
        if (error.errorType === "EMAIL_DUPLICATED") {
          return reply.status(409).send({ message: error.message });
        }
      }

      return reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export default CreateUserController;
