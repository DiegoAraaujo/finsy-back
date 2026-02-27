import "dotenv/config";
import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import usersRoutes from "./routes/user";

const app = fastify();

app.register(fastifyJwt, {
  secret: process.env.JWT_ACCESS_SECRET as string,
});

app.register(usersRoutes, { prefix: "/api/users" });

export default app;
