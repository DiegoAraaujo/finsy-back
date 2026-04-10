import { FastifyInstance } from "fastify";
import auth from "../middleware/auth";
import { getDashboardController } from "../modules/dashboard";

const dashboardRoutes = async (router: FastifyInstance) => {
  router.get(
    "/",
    { preHandler: [auth] },
    (req, reply) => getDashboardController.execute(req, reply),
  );
};

export default dashboardRoutes;
