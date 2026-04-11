import { FastifyRequest, FastifyReply } from "fastify";
import { userMapper } from "../mappers/userMapper";
import AutoLoginUseCase from "../use-cases/AutoLoginUseCase";

type JwtPayload = {
  userId: number;
  type: "access" | "refresh";
};

class AutoLoginController {
  private autoLoginUseCase: AutoLoginUseCase;

  constructor(autoLoginUseCase: AutoLoginUseCase) {
    this.autoLoginUseCase = autoLoginUseCase;
  }

  async execute(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId, type } = await request.jwtVerify<JwtPayload>({
        onlyCookie: true,
      });

      if (type !== "refresh") {
        return reply.status(401).send({ message: "Invalid token type" });
      }

      const user = await this.autoLoginUseCase.execute(userId);

      if (!user) {
        return reply.status(404).send({ message: "User not found" });
      }

      const accessToken = await reply.jwtSign(
        { userId, type: "access" },
        { expiresIn: "5m" }
      );

      return reply.status(200).send({
        user: userMapper(user),
        accessToken,
      });
    } catch (err) {
      reply.clearCookie("finsy_refreshToken");

      return reply.status(401).send({
        message: "Not authenticated",
      });
    }
  }
}

export default AutoLoginController;