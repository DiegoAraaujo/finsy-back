import "dotenv/config";
import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import usersRoutes from "./routes/user";
import categoriesRoutes from "./routes/category";
import MonthsRoutes from "./routes/month";
import expensesRoutes from "./routes/expense";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
const app = fastify();

(async () => {
  await app.register(swagger, {
    openapi: {
      info: {
        title: "Finsy API",
        description: "API para controle financeiro",
        version: "1.0.0",
      },
    },
  });

  await app.register(swaggerUI, {
    routePrefix: "/docs",
  });
})();

app.register(fastifyJwt, {
  secret: process.env.JWT_ACCESS_SECRET as string,
});

app.register(fastifyCookie);

app.register(fastifyJwt, {
  secret: process.env.JWT_REFRESH_SECRET as string,
  namespace: "refresh",
  jwtVerify: "refreshJwtVerify",
  jwtSign: "refreshJwtSign",
});

app.register(usersRoutes, { prefix: "/api/users" });
app.register(categoriesRoutes, { prefix: "/api/categories" });
app.register(MonthsRoutes, { prefix: "/api/months" });
app.register(expensesRoutes, { prefix: "/api/expenses" });

export default app;
