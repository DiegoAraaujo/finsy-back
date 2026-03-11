import { FastifyReply, FastifyRequest } from "fastify";

class LogoutController {
  async execute(request: FastifyRequest, reply: FastifyReply) {
    try {
      reply.clearCookie("finsy_refreshToken");
      return reply.send({ message: "Logout successful" });
    } catch (error) {
      return reply.status(500).send({ message: "Internal error" });
    }
  }
}

export default LogoutController;
