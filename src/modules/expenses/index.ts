import ExpenseRepository from "../../repository/ExpensesRepository";
import CreateExpenseController from "./controllers/CreateExpenseController";
import CreateExpenseUseCase from "./use-cases/CreateExpenseUseCase";

const expenseRepository = new ExpenseRepository();

const createExpenseUseCase = new CreateExpenseUseCase(expenseRepository);
export const createExpenseController = new CreateExpenseController(
  createExpenseUseCase,
);
