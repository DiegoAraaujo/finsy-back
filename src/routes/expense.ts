import { FastifyInstance } from "fastify";
import {
  createExpenseController,
  deleteExpenseController,
} from "../modules/expenses";
import auth from "../middleware/auth";
import { CreateExpenseDTO } from "../modules/expenses/dtos/CreateExpenseDTO";

const expensesRoutes = async (router: FastifyInstance) => {
  router.post<{
    Body: CreateExpenseDTO;
    Params: { monthId: string; categoryId: string };
  }>("/:monthId/:categoryId", { preHandler: [auth] }, (req, reply) =>
    createExpenseController.execute(req, reply),
  );
  router.delete<{
    Params: { expenseId: string };
  }>("/:expenseId", { preHandler: [auth] }, (req, reply) =>
    deleteExpenseController.execute(req, reply),
  );
};

export default expensesRoutes;
