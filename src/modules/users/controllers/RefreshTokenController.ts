import { FastifyReply, FastifyRequest } from "fastify";

class RefreshTokenController {
  async execute(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { userId } = await request.refreshJwtVerify();
      const accessToken = await reply.jwtSign({ userId }, { expiresIn: "5m" });
      return reply.send({ accessToken });
    } catch (error) {
      reply.clearCookie("finsy_refreshToken");
      return reply
        .status(401)
        .send({ message: "Invalid or expired refresh token" });
    }
  }
}

export default RefreshTokenController;
