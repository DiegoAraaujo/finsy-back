import { FastifyInstance } from "fastify";
import {
  createExpenseController,
  deleteExpenseController,
  getExpensesByCategoryController,
  getExpensesByMonthController,
  updateExpenseController,
} from "../modules/expenses";
import auth from "../middleware/auth";
import { CreateExpenseDTO } from "../modules/expenses/dtos/CreateExpenseDTO";
import { updateExpenseDTO } from "../modules/expenses/dtos/UpdateExpenseDTO";

const expensesRoutes = async (router: FastifyInstance) => {
  router.get<{
    Params: { monthId: string };
  }>("/month/:monthId", { preHandler: [auth] }, (req, reply) =>
    getExpensesByMonthController.execute(req, reply),
  );

  router.get<{
    Params: { categoryId: string };
  }>("/category/:categoryId", { preHandler: [auth] }, (req, reply) =>
    getExpensesByCategoryController.execute(req, reply),
  );
  router.post<{
    Body: CreateExpenseDTO;
    Params: { categoryId: string };
  }>("/:categoryId", { preHandler: [auth] }, (req, reply) =>
    createExpenseController.execute(req, reply),
  );
  router.put<{
    Body: updateExpenseDTO;
    Params: { expenseId: string };
  }>("/:expenseId", { preHandler: [auth] }, (req, reply) =>
    updateExpenseController.execute(req, reply),
  );
  router.delete<{
    Params: { expenseId: string };
  }>("/:expenseId", { preHandler: [auth] }, (req, reply) =>
    deleteExpenseController.execute(req, reply),
  );
};

export default expensesRoutes;
