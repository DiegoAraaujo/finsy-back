import { FastifyReply, FastifyRequest } from "fastify";

type JwtPayload = {
  userId: number;
  type: "access" | "refresh";
};

class RefreshTokenController {
  async execute(request: FastifyRequest, reply: FastifyReply) {
    try {
      const authHeader = request.headers.authorization;

      if (!authHeader?.startsWith("Bearer ")) {
        return reply.status(401).send({ message: "Missing refresh token" });
      }

      const token = authHeader.split(" ")[1];

      const data = await request.server.jwt.verify<JwtPayload>(token);

      if (data.type !== "refresh") {
        return reply.status(401).send({ message: "Invalid token type" });
      }

      const accessToken = await reply.jwtSign(
        { userId: data.userId, type: "access" },
        { expiresIn: "5m" },
      );

      return reply.send({ accessToken });
    } catch (error: any) {
      if (error.name === "JsonWebTokenError") {
        console.error(
          "❌ [REFRESH] Assinatura do JWT inválida. Verifique o JWT_SECRET.",
        );
      }

      return reply.status(401).send({
        message: "Invalid or expired refresh token",
      });
    }
  }
}

export default RefreshTokenController;
