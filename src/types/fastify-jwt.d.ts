import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      userId: number;
      type: "access" | "refresh";
    };
    user: {
      userId: number;
      type: "access" | "refresh";
    };
  }
}
