import { FastifyReply, FastifyRequest } from "fastify";

type JwtPayload = {
  userId: number;
  type: "access" | "refresh";
};

class RefreshTokenController {
  async execute(request: FastifyRequest, reply: FastifyReply) {
    try {
      const data = await request.jwtVerify<JwtPayload>({
        onlyCookie: true,
      });

      if (data.type !== "refresh") {
        return reply.status(401).send({ message: "Invalid token type" });
      }

      const accessToken = await reply.jwtSign(
        { userId: data.userId, type: "access" },
        { expiresIn: "5m" },
      );

      return reply.send( accessToken );
    } catch (error) {

      reply.clearCookie("finsy_refreshToken");

      return reply.status(401).send({
        message: "Invalid or expired refresh token",
      });
    }
  }
}

export default RefreshTokenController;
