import ExpenseRepository from "../../repository/ExpensesRepository";
import CreateExpenseController from "./controllers/CreateExpenseController";
import DeleteExpenseController from "./controllers/DeleteExpenseController";
import CreateExpenseUseCase from "./use-cases/CreateExpenseUseCase";
import DeleteExpenseUseCase from "./use-cases/DeleteExpenseUseCase";

const expenseRepository = new ExpenseRepository();

const createExpenseUseCase = new CreateExpenseUseCase(expenseRepository);
export const createExpenseController = new CreateExpenseController(
  createExpenseUseCase,
);

const deleteExpenseUseCase = new DeleteExpenseUseCase(expenseRepository);
export const deleteExpenseController = new DeleteExpenseController(
  deleteExpenseUseCase,
);
