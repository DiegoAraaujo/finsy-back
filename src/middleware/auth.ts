import { FastifyRequest, FastifyReply } from "fastify";

const auth = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify();

    const { userId } = request.user;

    request.userId = userId;
  } catch {
    return reply.status(401).send({
      message: "Token is invalid or expired",
    });
  }
};

export default auth;
