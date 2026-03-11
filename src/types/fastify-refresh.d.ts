import "fastify";

declare module "fastify" {
  interface FastifyReply {
    refreshJwtSign(payload: { userId: number }, options?: any): Promise<string>;
  }

  interface FastifyRequest {
    refreshJwtVerify(): Promise<{ userId: number }>;
  }
}