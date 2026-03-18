import { FastifyInstance } from "fastify";

import auth from "../middleware/auth";
import {
  createMonthController,
  getAllMonthsController,
  getCurrentMonthController,
  getLatestMonthController,
} from "../modules/months";
import { CreateCategoryDTO } from "../modules/categories/dtos/CreateCategoryDTO";

const MonthsRoutes = async (router: FastifyInstance) => {
  router.post<{ Body: { salary: number; categories: CreateCategoryDTO[] } }>(
    "/",
    { preHandler: [auth] },
    (req, reply) => createMonthController.execute(req, reply),
  );

  router.get("/", { preHandler: [auth] }, (req, reply) =>
    getAllMonthsController.execute(req, reply),
  );

  router.get("/current", { preHandler: [auth] }, (req, reply) =>
    getCurrentMonthController.execute(req, reply),
  );

  router.get("/latest", { preHandler: [auth] }, (req, reply) =>
    getLatestMonthController.execute(req, reply),
  );
};

export default MonthsRoutes;
