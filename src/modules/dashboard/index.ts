import CategoryRepository from "../../repository/CategoryRepository";
import ExpenseRepository from "../../repository/ExpensesRepository";
import MonthRepository from "../../repository/MonthRepository";
import GetDashboardController from "./controllers/GetDashboardController";
import GetDashboardUseCase from "./use-cases/GetDashboardUseCase";

const expenseRepository = new ExpenseRepository();
const categoryRepository = new CategoryRepository();
const monthRepository = new MonthRepository();

const getDashboardUseCase = new GetDashboardUseCase(
  expenseRepository,
  categoryRepository,
  monthRepository,
);

export const getDashboardController = new GetDashboardController(getDashboardUseCase);
