import { FastifyRequest, FastifyReply } from "fastify";
import { userMapper } from "../mappers/userMapper";
import { LoginDTO } from "../dtos/LoginDTO";
import LoginUseCase from "../use-cases/LoginUseCase";

class LoginController {
  private loginUseCase: LoginUseCase;

  constructor(loginUseCase: LoginUseCase) {
    this.loginUseCase = loginUseCase;
  }

  async execute(
    request: FastifyRequest<{ Body: LoginDTO }>,
    reply: FastifyReply,
  ) {
    const { email, password } = request.body;

    try {
      const user = await this.loginUseCase.execute(email, password);
      const accessToken = await reply.jwtSign(
        { userId: user.getId() },
        { expiresIn: "1d" },
      );
      return reply.status(200).send({ user: userMapper(user), accessToken });
    } catch (error: any) {
      if ("errorType" in error) {
        switch (error.errorType) {
          case "VALIDATION_ERROR":
            return reply.status(400).send({
              message: error.message,
              details: error.details,
            });

          case "AUTH_ERROR":
            return reply.status(401).send({
              message: error.message,
            });
        }
      }
      return reply.status(500).send({ message: "Internal server error" });
    }
  }
}

export default LoginController;
