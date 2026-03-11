import { FastifyRequest, FastifyReply } from "fastify";
import { userMapper } from "../mappers/userMapper";
import AutoLoginUseCase from "../use-cases/AutoLoginUseCase";

class AutoLoginController {
  private autoLoginUseCase: AutoLoginUseCase;

  constructor(autoLoginUseCase: AutoLoginUseCase) {
    this.autoLoginUseCase = autoLoginUseCase;
  }
  async execute(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId } = await request.refreshJwtVerify();
      const user = await this.autoLoginUseCase.execute(userId);

      if (!user) {
        return reply.status(404).send({ message: "User not found" });
      }
      
      const accessToken = await reply.jwtSign({ userId }, { expiresIn: "5m" });

      return reply.send({ user: userMapper(user), accessToken });
    } catch (err) {
      reply.clearCookie("finsy_refreshToken");
      return reply.status(401).send({ message: "Not authenticated" });
    }
  }
}

export default AutoLoginController;
