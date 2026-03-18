import ExpenseRepository from "../../repository/ExpensesRepository";
import MonthRepository from "../../repository/MonthRepository";
import CreateExpenseController from "./controllers/CreateExpenseController";
import DeleteExpenseController from "./controllers/DeleteExpenseController";
import GetExpensesByCategoryController from "./controllers/GetExpensesByCategoryController";
import GetExpensesByMonthController from "./controllers/GetExpensesByMonthController";
import UpdateExpenseController from "./controllers/UpdateExpenseController";
import CreateExpenseUseCase from "./use-cases/CreateExpenseUseCase";
import DeleteExpenseUseCase from "./use-cases/DeleteExpenseUseCase";
import GetExpensesByCategoryUseCase from "./use-cases/GetExpensesByCategoryUseCase";
import GetExpensesByMonthUseCase from "./use-cases/GetExpensesByMonthUseCase";
import UpdateExpenseUseCase from "./use-cases/UpdateExpenseUseCase";

const expenseRepository = new ExpenseRepository();
const monthRepository = new MonthRepository();

const createExpenseUseCase = new CreateExpenseUseCase(
  expenseRepository,
  monthRepository,
);
export const createExpenseController = new CreateExpenseController(
  createExpenseUseCase,
);

const deleteExpenseUseCase = new DeleteExpenseUseCase(expenseRepository);
export const deleteExpenseController = new DeleteExpenseController(
  deleteExpenseUseCase,
);

const updateExpenseUseCase = new UpdateExpenseUseCase(expenseRepository);
export const updateExpenseController = new UpdateExpenseController(
  updateExpenseUseCase,
);

const getExpensesByMonthUseCase = new GetExpensesByMonthUseCase(
  expenseRepository,
);
export const getExpensesByMonthController = new GetExpensesByMonthController(
  getExpensesByMonthUseCase,
);

const getExpensesByCategoryUseCase = new GetExpensesByCategoryUseCase(
  expenseRepository,
);
export const getExpensesByCategoryController =
  new GetExpensesByCategoryController(getExpensesByCategoryUseCase);
