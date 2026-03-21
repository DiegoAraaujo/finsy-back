import { FastifyInstance } from "fastify";
import {
  createCategoryController,
  deleteCategoryController,
  updateCategoryController,
  getCategoriesController,
  getCategoriesWithExpensesController,
} from "../modules/categories";
import auth from "../middleware/auth";
import { CreateCategoryDTO } from "../modules/categories/dtos/CreateCategoryDTO";
import { UpdateCategoryDTO } from "../modules/categories/dtos/UpdateCategoryDTO";

const categoriesRoutes = async (router: FastifyInstance) => {
  router.get<{ Params: { monthId: string } }>(
    "/:monthId",
    { preHandler: [auth] },
    (req, reply) => getCategoriesController.execute(req, reply),
  );

  router.get<{ Params: { monthId: string } }>(
    "/:monthId/with-expenses",
    { preHandler: [auth] },
    (req, reply) => getCategoriesWithExpensesController.execute(req, reply),
  );

  router.post<{ Body: CreateCategoryDTO; Params: { monthId: string } }>(
    "/",
    { preHandler: [auth] },
    (req, reply) => createCategoryController.execute(req, reply),
  );

  router.delete<{ Params: { categoryId: string } }>(
    "/:categoryId",
    { preHandler: [auth] },
    (req, reply) => deleteCategoryController.execute(req, reply),
  );

  router.put<{ Body: UpdateCategoryDTO; Params: { categoryId: string } }>(
    "/:categoryId",
    { preHandler: [auth] },
    (req, reply) => updateCategoryController.execute(req, reply),
  );
};

export default categoriesRoutes;
